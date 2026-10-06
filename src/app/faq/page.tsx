import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQList } from "@/components/ui/FAQList";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, pageGraph, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { serviceCatalog } from "@/data/service-catalog";
import faqGroups from "@/data/faq-page";

const path = "/faq";
const title = "Asauvia FAQ: Working with us, cost, security and IP";
const description =
  "Asauvia FAQ: answers for teams hiring us on engagement models, what drives cost, time zones, security, IP ownership, AI projects and our services.";
const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: "/faq" },
];

export const metadata: Metadata = pageMetadata({ path, title, description, absoluteTitle: true });

const relatedLinks: Record<string, { href: string; label: string }[]> = {
  "working-with-us": [
    { href: "/how-we-work", label: "See how we work, stage by stage" },
    { href: "/contact", label: "Start with the contact form" },
  ],
  "security-confidentiality-and-ip": [{ href: "/security", label: "Read our security practices" }],
  "time-zones-and-communication": [{ href: "/contact", label: "Contact our team" }],
  "ai-projects": [
    { href: "/services/ai-software-development", label: "AI Software Development service" },
    { href: "/services/ai-workflow-automation", label: "AI Workflow Automation service" },
  ],
  services: serviceCatalog.map((service) => ({ href: `/services/${service.slug}`, label: service.name })),
};

export default function FaqPage() {
  const allFaqs = faqGroups.flatMap((group) => group.faqs);

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: title,
          description,
          crumbs,
          extra: [faqPageSchema(allFaqs)],
        })}
      />
      <PageHero
        crumbs={crumbs}
        label="FAQ"
        title="Asauvia FAQ:"
        titleMuted="what buyers ask before hiring us."
        description="Straight answers on how engagements work, what drives cost, how we handle time zones, and how we protect your code, data and IP."
      />

      <nav aria-label="FAQ topics" className="border-b border-foreground/10">
        <Container>
          <ul className="-mt-px grid sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
            {faqGroups.map((group, i) => (
              <li key={group.id} className="border-t border-foreground/10">
                <Reveal delay={Math.min(i * 80, 400)}>
                  <a
                    href={`#${group.id}`}
                    className="group flex items-baseline gap-4 py-6 pr-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  >
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                      {group.title}
                    </span>
                    <span className="ml-auto font-mono text-xs text-muted-foreground">
                      {group.faqs.length} questions
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      {faqGroups.map((group, index) => {
        const links = relatedLinks[group.id] ?? [];
        return (
          <section
            key={group.id}
            id={group.id}
            className={`relative scroll-mt-24 py-24 lg:py-32 ${index === 0 ? "" : "border-t border-foreground/10"}`}
          >
            <Container>
              <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
                <div>
                  <SectionHeading label={`${group.faqs.length} questions`} title={group.title} />
                  {links.length > 0 ? (
                    <ul className="mt-8 flex flex-col gap-3">
                      {links.map((link, i) => (
                        <li key={link.href}>
                          <Reveal delay={Math.min(i * 80, 400)}>
                            <Link
                              href={link.href}
                              className="text-sm text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                            >
                              {link.label}
                            </Link>
                          </Reveal>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <Reveal from="right" delay={200}>
                  <FAQList faqs={group.faqs} />
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      <CTASection />
    </>
  );
}
