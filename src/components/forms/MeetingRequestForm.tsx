"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const TIME_WINDOWS = ["Morning (IST)", "Afternoon (IST)", "Evening (IST)", "Flexible"];

type Values = {
  name: string;
  email: string;
  company: string;
  product: string;
  preferredDate: string;
  preferredTime: string;
  timeZone: string;
  phone: string;
  message: string;
};
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "not_configured" | "rate_limited" | "error";

export type MeetingProduct = { slug: string; name: string };

const inputClass =
  "h-12 w-full rounded-none border border-foreground/15 bg-transparent px-4 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 hover:border-foreground/30 focus:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-[invalid=true]:border-red-600";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Sales works in India Standard Time, so "today" is the IST calendar date (matches the server check).
const todayInIst = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
const PHONE_PATTERN = /^[+0-9 ()-]*$/;

// Mirrors the server schema in src/app/api/product-meeting/route.ts. The server check stays authoritative.
function validate(raw: Values): { data: Values; errors: Errors } {
  const data = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, value.trim()])) as Values;
  const errors: Errors = {};
  if (!data.name) errors.name = "Enter your name";
  else if (data.name.length > 120) errors.name = "Keep this under 120 characters";
  if (!EMAIL_PATTERN.test(data.email) || data.email.length > 254) errors.email = "Enter a valid work email";
  if (data.company.length > 160) errors.company = "Keep this under 160 characters";
  if (!data.product) errors.product = "Choose a product";
  if (data.preferredDate && data.preferredDate < todayInIst()) {
    errors.preferredDate = "Choose today or a later date";
  }
  if (data.timeZone.length > 100) errors.timeZone = "Keep this under 100 characters";
  if (data.phone.length > 40 || !PHONE_PATTERN.test(data.phone)) errors.phone = "Use digits, spaces, + and brackets only";
  if (data.message.length > 1000) errors.message = "Keep this under 1,000 characters";
  return { data, errors };
}

function mailtoHref(salesEmail: string, productName: string, values: Values) {
  const subject = `[Meeting request] ${productName} — ${values.name}`;
  const body = [
    `Product: ${productName}`,
    `Name: ${values.name}`,
    `Work email: ${values.email}`,
    values.company ? `Company: ${values.company}` : null,
    values.phone ? `Phone: ${values.phone}` : null,
    values.preferredDate ? `Preferred date: ${values.preferredDate}` : null,
    values.preferredTime ? `Preferred time: ${values.preferredTime}` : null,
    values.timeZone ? `Their time zone: ${values.timeZone}` : null,
    "",
    values.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
  return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function FieldShell({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {optional ? <span className="ml-2 font-normal text-muted-foreground">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function MeetingRequestForm({
  products,
  defaultProduct,
  salesEmail,
}: {
  products: readonly MeetingProduct[];
  defaultProduct: string;
  salesEmail: string;
}) {
  const [values, setValues] = useState<Values>({
    name: "",
    email: "",
    company: "",
    product: defaultProduct,
    preferredDate: "",
    preferredTime: "",
    timeZone: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const productName = products.find((product) => product.slug === values.product)?.name ?? "";

  const update =
    (field: Field) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const { data, errors: next } = validate(values);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      const first = (Object.keys(values) as Field[]).find((key) => next[key]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/product-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string; fields?: Errors };
      if (res.status === 503 && body.error === "not_configured") {
        setStatus("not_configured");
        return;
      }
      if (res.status === 429) {
        setStatus("rate_limited");
        return;
      }
      if (res.status === 400 && body.error === "invalid" && body.fields) {
        // Field problems are shown under their fields. Nothing was sent, so the send-failure message stays hidden.
        setErrors(body.fields);
        const first = (Object.keys(values) as Field[]).find((key) => body.fields?.[key]);
        if (first) document.getElementById(first)?.focus();
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="border border-foreground/10 p-8 focus:outline-none lg:p-12"
        role="status"
        aria-live="polite"
      >
        <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal" />
          Received
        </span>
        <h3 className="font-display text-4xl tracking-tight lg:text-5xl">Request sent.</h3>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Thanks, {values.name.trim().split(/\s+/)[0]}. The sales team will reply to {values.email} to confirm a meeting time
          for {productName}.
        </p>
      </div>
    );
  }

  const mailto = mailtoHref(salesEmail, productName, values);
  const emailLink = (
    <a href={mailto} className="font-medium underline underline-offset-4 hover:no-underline">
      {salesEmail}
    </a>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <FieldShell id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={update("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell id="email" label="Work email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            value={values.email}
            onChange={update("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell id="company" label="Company" optional error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={values.company}
            onChange={update("company")}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell id="phone" label="Phone" optional error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass}
          />
        </FieldShell>
      </div>

      <FieldShell id="product" label="Product" error={errors.product}>
        <select
          id="product"
          name="product"
          required
          value={values.product}
          onChange={update("product")}
          aria-invalid={errors.product ? true : undefined}
          aria-describedby={errors.product ? "product-error" : undefined}
          className={inputClass}
        >
          <option value="" disabled>
            Select a product
          </option>
          {products.map((product) => (
            <option key={product.slug} value={product.slug}>
              {product.name}
            </option>
          ))}
        </select>
      </FieldShell>

      <div className="grid gap-8 sm:grid-cols-2">
        <FieldShell id="preferredDate" label="Preferred date" optional error={errors.preferredDate}>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            value={values.preferredDate}
            onChange={update("preferredDate")}
            aria-invalid={errors.preferredDate ? true : undefined}
            aria-describedby={errors.preferredDate ? "preferredDate-error" : undefined}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell id="preferredTime" label="Preferred time" optional error={errors.preferredTime}>
          <select
            id="preferredTime"
            name="preferredTime"
            value={values.preferredTime}
            onChange={update("preferredTime")}
            className={inputClass}
          >
            <option value="">Not sure yet</option>
            {TIME_WINDOWS.map((window) => (
              <option key={window} value={window}>
                {window}
              </option>
            ))}
          </select>
        </FieldShell>
      </div>

      <FieldShell id="timeZone" label="Your time zone" optional error={errors.timeZone}>
        <input
          id="timeZone"
          name="timeZone"
          type="text"
          placeholder="For example, Dubai (GST) or London (BST)"
          value={values.timeZone}
          onChange={update("timeZone")}
          aria-invalid={errors.timeZone ? true : undefined}
          aria-describedby={errors.timeZone ? "timeZone-error" : undefined}
          className={inputClass}
        />
      </FieldShell>

      <FieldShell id="message" label="Notes" optional error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="What do you need priced, or what would you like to see in the meeting?"
          className={cn(inputClass, "h-auto min-h-32 resize-y py-3 leading-relaxed")}
        />
      </FieldShell>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <div className="flex flex-col gap-6 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Fields marked optional can be left blank. Pricing is shared on the call.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request a meeting"}
          {status === "submitting" ? null : (
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </button>
      </div>

      <div aria-live="polite" role="status">
        {status === "not_configured" ? (
          <div className="border border-foreground/15 p-6 leading-relaxed">
            The form isn&apos;t connected to email yet. Please email {emailLink}. The link opens your email app with your
            request already filled in.
          </div>
        ) : null}
        {status === "rate_limited" ? (
          <div className="border border-red-600/40 p-6 leading-relaxed">
            Too many attempts from this connection. Wait a few minutes and try again, or email {emailLink}.
          </div>
        ) : null}
        {status === "error" ? (
          <div className="border border-red-600/40 p-6 leading-relaxed">
            Something went wrong sending your request. Check the fields above and try again, or email {emailLink}.
          </div>
        ) : null}
      </div>
    </form>
  );
}
