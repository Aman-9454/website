"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Ireland",
  "Singapore",
  "United Arab Emirates",
  "India",
  "Other",
];

const TIMELINES = ["As soon as possible", "Within 3 months", "3–6 months", "Just exploring"];

const OTHER_SERVICE = "Something else";

type Values = {
  name: string;
  email: string;
  company: string;
  country: string;
  service: string;
  message: string;
  timeline: string;
  budget: string;
};
type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "submitting" | "success" | "not_configured" | "rate_limited" | "error";

const initialValues: Values = {
  name: "",
  email: "",
  company: "",
  country: "",
  service: "",
  message: "",
  timeline: "",
  budget: "",
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: { sitekey: string; "response-field-name"?: string }) => string;
      reset: (id?: string) => void;
    };
  }
}

const inputClass =
  "h-12 w-full rounded-none border border-foreground/15 bg-transparent px-4 text-base text-foreground transition-colors placeholder:text-muted-foreground/60 hover:border-foreground/30 focus:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground aria-[invalid=true]:border-red-600";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors the server schema in src/app/api/contact/route.ts; zod stays server-side to keep it out of the client bundle.
function validate(raw: Values): { data: Values; errors: Errors } {
  const data = Object.fromEntries(Object.entries(raw).map(([key, value]) => [key, value.trim()])) as Values;
  const errors: Errors = {};
  if (!data.name) errors.name = "Enter your name";
  else if (data.name.length > 120) errors.name = "Keep this under 120 characters";
  if (!EMAIL_PATTERN.test(data.email) || data.email.length > 254) errors.email = "Enter a valid work email";
  if (data.company.length > 160) errors.company = "Keep this under 160 characters";
  if (!data.country) errors.country = "Choose your country";
  if (!data.service) errors.service = "Choose what you need help with";
  if (data.message.length < 20) errors.message = "Tell us a little more (at least 20 characters)";
  else if (data.message.length > 5000) errors.message = "Keep this under 5,000 characters";
  if (data.budget.length > 120) errors.budget = "Keep this under 120 characters";
  return { data, errors };
}

function mailtoHref(contactEmail: string, values: Values) {
  const subject = `[Website form] ${values.service || "General"} — ${values.name}`;
  const body = [
    `Name: ${values.name}`,
    `Work email: ${values.email}`,
    values.company ? `Company: ${values.company}` : null,
    `Country: ${values.country}`,
    `Service: ${values.service}`,
    values.timeline ? `Timeline: ${values.timeline}` : null,
    values.budget ? `Budget: ${values.budget}` : null,
    "",
    values.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function FieldShell({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
        {optional ? <span className="ml-2 font-normal text-muted-foreground">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({
  services,
  contactEmail,
  nextSteps,
}: {
  services: readonly { slug: string; name: string }[];
  contactEmail: string;
  nextSteps: readonly string[];
}) {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileId = useRef<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const renderTurnstile = () => {
    if (!turnstileSiteKey || !turnstileRef.current || !window.turnstile) return;
    if (turnstileRef.current.childElementCount > 0) return;
    turnstileId.current = window.turnstile.render(turnstileRef.current, { sitekey: turnstileSiteKey });
  };

  const update =
    (field: Field) => (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

  const describedBy = (field: Field, hasHint = false) => {
    if (errors[field]) return `${field}-error`;
    return hasHint ? `${field}-hint` : undefined;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const { data, errors: next } = validate(values);
    if (Object.keys(next).length > 0) {
      setErrors(next);
      const first = Object.keys(initialValues).find((key) => next[key as Field]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");

    const params = new URLSearchParams(window.location.search);
    const turnstileToken =
      formRef.current?.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value ?? "";

    const payload = {
      ...data,
      website: honeypot,
      utm_source: params.get("utm_source") ?? "",
      utm_medium: params.get("utm_medium") ?? "",
      utm_campaign: params.get("utm_campaign") ?? "",
      landing_page: window.location.pathname,
      referrer: document.referrer,
      "cf-turnstile-response": turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("success");
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: Errors };
      if (res.status === 503 && data.error === "not_configured") {
        setStatus("not_configured");
        return;
      }
      if (res.status === 429) {
        setStatus("rate_limited");
        return;
      }
      if (res.status === 400 && data.error === "invalid" && data.fields) {
        setErrors(data.fields);
      }
      if (window.turnstile && turnstileId.current) window.turnstile.reset(turnstileId.current);
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
        <h2 className="font-display text-4xl tracking-tight lg:text-5xl">Message sent.</h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Thanks, {values.name.trim().split(/\s+/)[0]}. Here is what happens next:
        </p>
        <ol className="mt-8 border-t border-foreground/10">
          {nextSteps.map((step, index) => (
            <li key={step} className="flex gap-6 border-b border-foreground/10 py-5">
              <span className="font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const mailto = mailtoHref(contactEmail, values);

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-8">
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onReady={renderTurnstile}
        />
      ) : null}

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
            aria-describedby={describedBy("name")}
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
            aria-describedby={describedBy("email")}
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
            aria-describedby={describedBy("company")}
            className={inputClass}
          />
        </FieldShell>

        <FieldShell id="country" label="Country" error={errors.country}>
          <select
            id="country"
            name="country"
            autoComplete="country-name"
            required
            value={values.country}
            onChange={update("country")}
            aria-invalid={errors.country ? true : undefined}
            aria-describedby={describedBy("country")}
            className={inputClass}
          >
            <option value="" disabled>
              Select a country
            </option>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </FieldShell>
      </div>

      <FieldShell id="service" label="What do you need help with" error={errors.service}>
        <select
          id="service"
          name="service"
          required
          value={values.service}
          onChange={update("service")}
          aria-invalid={errors.service ? true : undefined}
          aria-describedby={describedBy("service")}
          className={inputClass}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value={OTHER_SERVICE}>{OTHER_SERVICE}</option>
        </select>
      </FieldShell>

      <FieldShell
        id="message"
        label="Message"
        error={errors.message}
        hint="What are you building, improving or automating? Any constraints we should know about?"
      >
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={update("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message", true)}
          className={cn(inputClass, "h-auto min-h-40 resize-y py-3 leading-relaxed")}
        />
      </FieldShell>

      <div className="grid gap-8 sm:grid-cols-2">
        <FieldShell id="timeline" label="Timeline" optional error={errors.timeline}>
          <select
            id="timeline"
            name="timeline"
            value={values.timeline}
            onChange={update("timeline")}
            aria-invalid={errors.timeline ? true : undefined}
            aria-describedby={describedBy("timeline")}
            className={inputClass}
          >
            <option value="">Not sure yet</option>
            {TIMELINES.map((timeline) => (
              <option key={timeline} value={timeline}>
                {timeline}
              </option>
            ))}
          </select>
        </FieldShell>

        <FieldShell id="budget" label="Budget" optional error={errors.budget}>
          <input
            id="budget"
            name="budget"
            type="text"
            value={values.budget}
            onChange={update("budget")}
            aria-invalid={errors.budget ? true : undefined}
            aria-describedby={describedBy("budget")}
            className={inputClass}
          />
        </FieldShell>
      </div>

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

      {turnstileSiteKey ? <div ref={turnstileRef} className="cf-turnstile" data-sitekey={turnstileSiteKey} /> : null}

      <div className="flex flex-col gap-6 border-t border-foreground/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          Fields marked optional can be left blank.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Start a conversation"}
          {status === "submitting" ? null : (
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </button>
      </div>

      <div aria-live="polite" role="status">
        {status === "not_configured" ? (
          <div className="border border-foreground/15 p-6 leading-relaxed">
            The form isn&apos;t connected to email yet. Please email us directly at{" "}
            <a href={mailto} className="font-medium underline underline-offset-4 hover:no-underline">
              {contactEmail}
            </a>
            . The link opens your email app with your message already filled in.
          </div>
        ) : null}
        {status === "rate_limited" ? (
          <div className="border border-red-600/40 p-6 leading-relaxed">
            Too many attempts from this connection. Wait a few minutes and try again, or email us at{" "}
            <a href={mailto} className="font-medium underline underline-offset-4 hover:no-underline">
              {contactEmail}
            </a>
            .
          </div>
        ) : null}
        {status === "error" ? (
          <div className="border border-red-600/40 p-6 leading-relaxed">
            Something went wrong sending your message. Check the fields above and try again, or email us at{" "}
            <a href={mailto} className="font-medium underline underline-offset-4 hover:no-underline">
              {contactEmail}
            </a>
            .
          </div>
        ) : null}
      </div>
    </form>
  );
}
