import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/forms/ContactForm";
import { CTASection } from "@/components/sections/CTASection";
import { Reveal } from "@/components/ui/Reveal";
import { pageGraph, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { serviceCatalog } from "@/data/service-catalog";
import company from "@/data/company";
import { websiteMailto } from "@/lib/utils";

const title = "Contact Asauvia: Start a Software or AI Project";
const description =
  "Contact Asauvia to start a software or AI project. Tell us what you are building and we follow up with a short scoping call, then a proposal.";

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

const linkClass =
  "text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

const linkedIn = company.sameAs.find((url) => url.includes("linkedin.com"));

const nextSteps = [
  "We read your message and look at what you're trying to solve.",
  "We set up a short scoping call to understand the problem and constraints.",
  "You get a proposal with a recommended engagement model.",
];

export const metadata: Metadata = pageMetadata({ path: "/contact", title, description, absoluteTitle: true });

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/contact",
          name: title,
          description,
          crumbs,
          type: "ContactPage",
        })}
      />
      <PageHero
        crumbs={crumbs}
        label="Contact"
        title="Contact Asauvia."
        titleMuted="Start with a short scoping call."
        description="Tell us what you're building, improving or automating. We follow up with a short scoping call, then a proposal with a recommended engagement model."
      />

      <section className="relative py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr] lg:gap-24">
            <div>
              <h2 className="mb-4 font-display text-3xl tracking-tight lg:text-4xl">
                Tell us about the project
              </h2>
              <p className="mb-10 leading-relaxed text-muted-foreground">
                Email{" "}
                <a href={websiteMailto(company.email)} className={linkClass}>
                  {company.email}
                </a>{" "}
                or use the form below.
              </p>
              <ContactForm
                services={serviceCatalog}
                contactEmail={company.email}
                nextSteps={nextSteps}
              />
            </div>

            <aside
              aria-label="Other ways to reach us"
              className="flex flex-col gap-12 lg:pt-2"
            >
              <dl className="border-t border-foreground/10">
                <Reveal
                  from="right"
                  delay={200}
                  className="border-b border-foreground/10 py-6"
                >
                  <dt className="mb-2 font-mono text-sm text-muted-foreground">
                    Email
                  </dt>
                  <dd>
                    <a
                      href={websiteMailto(company.email)}
                      className="text-xl underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                    >
                      {company.email}
                    </a>
                  </dd>
                </Reveal>
                <Reveal
                  from="right"
                  delay={280}
                  className="border-b border-foreground/10 py-6"
                >
                  <dt className="mb-2 font-mono text-sm text-muted-foreground">
                    Headquarters
                  </dt>
                  <dd className="text-xl">
                    {company.hqRegion}, {company.hqCountry}
                  </dd>
                </Reveal>
                {linkedIn ? (
                  <Reveal
                    from="right"
                    delay={360}
                    className="border-b border-foreground/10 py-6"
                  >
                    <dt className="mb-2 font-mono text-sm text-muted-foreground">
                      LinkedIn
                    </dt>
                    <dd>
                      <a
                        href={linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-xl underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                      >
                        Asauvia on LinkedIn
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </dd>
                  </Reveal>
                ) : null}
              </dl>

              <div>
                <h2 className="mb-6 font-display text-2xl tracking-tight">
                  What happens next
                </h2>
                <ol className="border-t border-foreground/10">
                  {nextSteps.map((step, index) => (
                    <li
                      key={step}
                      className="border-b border-foreground/10 py-5"
                    >
                      <Reveal delay={index * 80} className="flex gap-6">
                        <span className="font-mono text-sm text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </Reveal>
                    </li>
                  ))}
                </ol>
                <Reveal delay={240}>
                  <p className="mt-6 leading-relaxed text-muted-foreground">
                    Want the detail first? Read{" "}
                    <Link href="/how-we-work" className={linkClass}>
                      how we run engagements
                    </Link>{" "}
                    or the{" "}
                    <Link href="/faq" className={linkClass}>
                      questions buyers ask most
                    </Link>
                    .
                  </p>
                </Reveal>
              </div>

              <Reveal
                from="right"
                delay={200}
                className="border border-foreground/10 bg-foreground/[0.02] p-6"
              >
                <p className="font-mono text-sm text-foreground">
                  NDA before any confidential scoping conversation
                </p>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  Share sensitive details only once you&apos;re covered.{" "}
                  <Link href="/security" className={linkClass}>
                    See how we handle security and confidentiality
                  </Link>
                  .
                </p>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
