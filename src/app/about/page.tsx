import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FAQList } from "@/components/ui/FAQList";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageGraph, faqPageSchema, SITE_URL, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/validators";
import company from "@/data/company";
import services from "@/data/services";
import { websiteMailto } from "@/lib/utils";

const PATH = "/about";
const TITLE = "About Asauvia: AI Software Development & Engineering Company";
const DESCRIPTION =
  "Asauvia is an AI software development and product engineering company in India, building scalable, secure systems for startups and international teams.";

export const metadata: Metadata = pageMetadata({ path: PATH, title: TITLE, description: DESCRIPTION, absoluteTitle: true });

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

const practices = [
  {
    title: "Architecture documented up front",
    body: "Architecture decisions are written down and reviewed with you before anything is built, so the reasoning outlives the first release.",
  },
  {
    title: "A shared backlog",
    body: "You see the same backlog we work from. Priorities are visible and changeable, not hidden in a status report.",
  },
  {
    title: "A standing update cadence",
    body: "Status is visible on a schedule agreed at kickoff, not reported on request.",
  },
  {
    title: "Code review and dependency review",
    body: "Every change is reviewed before it merges, and dependencies are reviewed on every project.",
  },
  {
    title: "Core Web Vitals budgets in CI",
    body: "Performance budgets are enforced in the pipeline, so regressions are caught before they ship.",
  },
];

const faqs: Faq[] = [
  {
    question: "Where is Asauvia based?",
    answer:
      "Asauvia is headquartered in Uttar Pradesh, India. The engineering team works India Standard Time (IST).",
  },
  {
    question: "Do you work with teams outside India?",
    answer:
      "Yes. We work with international clients across time zones. IST is ahead of the business hours of many of the markets we serve, so work started during our day is often ready before yours begins. The overlap window and communication cadence are agreed with each client at kickoff.",
  },
  {
    question: "Is Asauvia a product company or a service company?",
    answer:
      "Services come first. Asauvia is a service-based company: we design and build software for startups and enterprises, from AI software and workflow automation to custom software, web and mobile apps, cloud, data, HR and operations systems, and SEO work. We also build our own products, which are listed on the products page, and we can build a custom product for your team.",
  },
  {
    question: "How do we start working together?",
    answer:
      "Send us a note through the contact form. We follow up with a short scoping call, then send a proposal with a recommended engagement model: fixed-scope, dedicated team, or time-and-materials or retainer. An NDA is signed before any confidential scoping conversation.",
  },
];

const linkClass =
  "text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export default function AboutPage() {
  const schema = pageGraph({
    path: PATH,
    name: TITLE,
    description: DESCRIPTION,
    crumbs,
    type: "AboutPage",
    mainEntityId: `${SITE_URL}/#organization`,
    extra: [faqPageSchema(faqs)],
  });

  return (
    <>
      <JsonLd data={schema} />

      <PageHero
        crumbs={crumbs}
        label="About Asauvia"
        title="Asauvia is a software engineering company,"
        titleMuted="working across time zones."
        description={company.description}
      >
        <Button href="/contact" withArrow>
          Start a conversation
        </Button>
        <Button href="/how-we-work" variant="secondary">
          See how we work
        </Button>
      </PageHero>

      <section className="relative py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            <div>
              <SectionHeading
                label="What we do"
                title="Nine services."
                titleMuted="All of it engineering work."
                description="We are a service-based company. Everything we offer is engineering work done for and with your team."
              />
              <Link href="/services" className={`mt-8 inline-flex text-sm ${linkClass}`}>
                Compare all services side by side
              </Link>
            </div>

            <ul className="border-t border-foreground/10">
              {services.map((service, i) => (
                <li key={service.slug}>
                  <Reveal delay={Math.min(i * 80, 400)} className="border-b border-foreground/10">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex items-center justify-between gap-6 py-6 text-xl lg:text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                    >
                      <span className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-1">
                        <span className="font-display tracking-tight">{service.name}</span>
                        <span className="text-base leading-relaxed text-muted-foreground">{service.outcome}</span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                      />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 bg-foreground/[0.02] py-24 lg:py-32">
        <Container>
          <SectionHeading
            label="How we work"
            title="Practices you can check."
            titleMuted="Not promises you have to trust."
          />

          <div className="mt-16 grid border-l border-t border-foreground/10 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {practices.map((practice, i) => (
              <Reveal key={practice.title} delay={i * 100} className="border-b border-r border-foreground/10 p-8">
                <h3 className="mb-3 text-lg font-medium">{practice.title}</h3>
                <p className="leading-relaxed text-muted-foreground">{practice.body}</p>
              </Reveal>
            ))}
            <Reveal
              delay={Math.min(practices.length * 100, 400)}
              className="flex flex-col justify-end gap-3 border-b border-r border-foreground/10 p-8"
            >
              <Link href="/how-we-work" className={linkClass}>
                Our six-stage delivery process
              </Link>
              <Link href="/security" className={linkClass}>
                How we handle security and your data
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading label="Where we are" title="Based in India." titleMuted="Working across time zones." />
              <Reveal>
                <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
                  Our team works India Standard Time, which runs ahead of business hours in the US, UK and Europe
                  and overlaps with much of Asia-Pacific. For teams in the West, work started during our day is often
                  ready before yours begins. The overlap
                  window and communication cadence are agreed with each client at kickoff.
                </p>
              </Reveal>
            </div>

            <dl className="border-t border-foreground/10">
              <Fact term="Headquarters" delay={0}>
                {company.hqRegion}, {company.hqCountry}
              </Fact>
              <Fact term="Working hours" delay={80}>India Standard Time (IST)</Fact>
              <Fact term="Engagement models" delay={160}>Fixed-scope, dedicated team, time-and-materials or retainer</Fact>
              <Fact term="Contact" delay={240}>
                <a href={websiteMailto(company.email)} className={linkClass}>
                  {company.email}
                </a>
              </Fact>
              <Fact term="LinkedIn" delay={320}>
                <a href={company.sameAs[0]} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Asauvia on LinkedIn
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Fact>
            </dl>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            <div>
              <SectionHeading label="About the company" title="Common questions" titleMuted="about Asauvia." />
              <Link href="/faq" className={`mt-8 inline-flex text-sm ${linkClass}`}>
                Read answers on pricing, process and security
              </Link>
            </div>
            <FAQList faqs={faqs} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}

function Fact({ term, delay = 0, children }: { term: string; delay?: number; children: ReactNode }) {
  return (
    <Reveal delay={delay} className="grid gap-2 border-b border-foreground/10 py-6 sm:grid-cols-[12rem_1fr] sm:gap-8">
      <dt className="font-mono text-sm text-muted-foreground">{term}</dt>
      <dd className="text-lg">{children}</dd>
    </Reveal>
  );
}
