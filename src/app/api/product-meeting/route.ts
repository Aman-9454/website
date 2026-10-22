import { z } from "zod";
import company from "@/data/company";
import { getAllProducts } from "@/lib/products";

const products = getAllProducts();
const PRODUCT_SLUGS = products.map((product) => product.slug) as [string, ...string[]];

const TIME_WINDOWS = ["Morning (IST)", "Afternoon (IST)", "Evening (IST)", "Flexible"] as const;

// Sales works in India Standard Time, so "today" is the IST calendar date, not the UTC one.
const todayInIst = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

// Rejects impossible dates such as 2026-02-31, which a plain pattern check lets through.
const isRealDate = (value: string) => {
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const optionalText = (max: number) => z.string().trim().max(max).optional().default("");

const meetingSchema = z.object({
  name: z.string("Enter your name").trim().min(1, "Enter your name").max(120),
  email: z.string("Enter a valid work email").trim().max(254).pipe(z.email("Enter a valid work email")),
  company: optionalText(160),
  product: z.enum(PRODUCT_SLUGS, "Choose a product"),
  preferredDate: z
    .string()
    .trim()
    .max(10)
    .optional()
    .default("")
    .refine((value) => value === "" || /^\d{4}-\d{2}-\d{2}$/.test(value), "Choose a valid date")
    .refine((value) => value === "" || isRealDate(value), "Choose a valid date")
    .refine((value) => value === "" || value >= todayInIst(), "Choose today or a later date"),
  preferredTime: z.union([z.enum(TIME_WINDOWS), z.literal("")]).optional().default(""),
  timeZone: optionalText(100),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .default("")
    .refine((value) => /^[+0-9 ()-]*$/.test(value), "Use digits, spaces, + and brackets only"),
  message: optionalText(1000),
  website: z.string().max(200).optional().default(""),
});

type MeetingPayload = z.infer<typeof meetingSchema>;

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Every form email is marked so it can't be confused with someone writing to the sales inbox directly. */
const SOURCE = "Website product meeting form (asauvia.com/products)";

function emailBody(data: MeetingPayload, productName: string, receivedAt: Date) {
  // Newlines are removed so a submitted value cannot start a new line in the email body.
  const line = (label: string, value: string) => `${label}: ${(value || "—").replace(/[\r\n]+/g, " ")}`;
  const ist = receivedAt.toLocaleString("en-GB", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
  return [
    line("Source", SOURCE),
    line("Received", `${ist} IST`),
    "",
    line("Product", productName),
    line("Name", data.name),
    line("Work email", data.email),
    line("Company", data.company),
    line("Phone", data.phone),
    line("Preferred date", data.preferredDate),
    line("Preferred time", data.preferredTime),
    line("Their time zone", data.timeZone),
    "",
    "Notes:",
    data.message || "—",
  ].join("\n");
}

export async function POST(request: Request) {
  // Browsers can send a text/plain or form POST cross-site without a preflight. Requiring JSON blocks that.
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "unsupported_media_type" }, { status: 415 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json({ error: "invalid", fields: { form: "Request body must be JSON" } }, { status: 400 });
  }

  if (json && typeof json === "object" && "website" in json) {
    const honeypot = (json as { website?: unknown }).website;
    if (typeof honeypot === "string" && honeypot.trim() !== "") {
      return Response.json({ ok: true });
    }
  }

  const ip = clientIp(request);
  if (rateLimited(ip)) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  const parsed = meetingSchema.safeParse(json);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fields[key]) fields[key] = issue.message;
    }
    return Response.json({ error: "invalid", fields }, { status: 400 });
  }
  const data = parsed.data;
  const productName = products.find((product) => product.slug === data.product)?.name ?? data.product;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SALES_TO_EMAIL || company.salesEmail;
  if (!apiKey) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Asauvia Website <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `[Meeting request] ${productName} — ${data.name}`.replace(/[\r\n]+/g, " "),
        text: emailBody(data, productName, new Date()),
        headers: { "X-Asauvia-Source": "website-product-meeting-form" },
        tags: [{ name: "source", value: "website_product_meeting_form" }],
      }),
    });
    if (!res.ok) {
      console.error(`[product-meeting] email provider responded ${res.status}`);
      return Response.json({ error: "send_failed" }, { status: 502 });
    }
  } catch {
    console.error("[product-meeting] email provider request failed");
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
