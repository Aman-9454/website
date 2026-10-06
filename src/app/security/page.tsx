import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  FileText,
  GitPullRequest,
  Gauge,
  Package,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQList } from "@/components/ui/FAQList";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, pageGraph, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/validators";

const PATH = "/security";
const title = "Software Development Security Practices";
const description =
  "Asauvia's software development security practices: NDA before scoping, access limited to your project team, code and dependency review, IP assigned to you.";
const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Security", path: PATH },
];

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title,
  description,
});

const beforeWork = [
  {
    title: "NDA before confidential scoping",
    body: "We sign an NDA before any conversation that covers confidential details of your business, systems or plans. If the first call needs to go there, the NDA comes first.",
  },
  {
    title: "IP assigned to you",
    body: "IP in the work product is assigned to you on delivery or payment, as defined in the engagement agreement. The code we write for you is yours.",
  },
];

const accessPractices = [
  "Access to your systems and data is scoped to the people actually working on your project.",
  "That access lasts for the duration of the engagement, not open-ended.",
  "Everyone with access is covered by the NDA signed before scoping began.",
];

const deliveryPractices = [
  {
    icon: FileText,
    title: "Architecture documented up front",
    body: "Architecture decisions are written down and reviewed with you before anything is built.",
  },
  {
    icon: GitPullRequest,
    title: "Code review",
    body: "Changes go through code review before they are merged.",
  },
  {
    icon: Package,
    title: "Dependency review",
    body: "Every project gets a review of the third-party packages it relies on.",
  },
  {
    icon: ShieldCheck,
    title: "Testing and review gates",
    body: "Nothing ships until it has passed the testing and review gates agreed for the project.",
  },
  {
    icon: Gauge,
    title: "Performance budgets in CI",
    body: "Core Web Vitals budgets are enforced in CI, so regressions are caught before release.",
  },
  {
    icon: Activity,
    title: "Monitoring and rollback",
    body: "Launches go out with monitoring and a rollback path in place from day one.",
  },
];

const faqs: Faq[] = [
  {
    question: "When is the NDA signed?",
    answer:
      "Before any confidential scoping conversation. If your first call needs to cover confidential details, say so when you get in touch and the NDA comes first.",
  },
  {
    question: "Who on your team can access our systems?",
    answer:
      "Only the people working on your project, for the duration of the engagement.",
  },
  {
    question:
      "We have our own security requirements. When should we raise them?",
    answer:
      "At the scoping call. If your organization has its own security policies or vendor questionnaires, bringing them up before work starts means they are part of the scope and proposal from the beginning.",
  },
  {
    question: "Who owns the code once the project is done?",
    answer:
      "You do. IP in the work product is assigned to you on delivery or payment, as defined in the engagement agreement.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: PATH,
          name: `${title} | Asauvia`,
          description,
          crumbs,
          extra: [faqPageSchema(faqs)],
        })}
      />
      <PageHero
        crumbs={crumbs}
        label="Security"
        title="Software development security practices"
        titleMuted="protecting your systems, data and IP."
        description="Asauvia signs an NDA before any confidential scoping, limits access to the people on your project, reviews every code change and dependency, and assigns IP in the work product to you on delivery or payment."
      >
        <Button href="/contact" withArrow>
          Discuss your requirements
        </Button>
        <Button href="/how-we-work" variant="secondary">
          See how we work
        </Button>
      </PageHero>

      <section className="relative py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <SectionHeading
              label="Before work starts"
              title="NDA and IP ownership,"
              titleMuted="agreed before work starts."
            />
            <div className="border-t border-foreground/10">
              {beforeWork.map((item, i) => (
                <Reveal
                  key={item.title}
                  from="right"
                  delay={200 + i * 100}
                  className="border-b border-foreground/10 py-8"
                >
                  <h3 className="mb-3 text-xl font-medium">{item.title}</h3>
                  <p className="max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 bg-foreground/[0.02] py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <SectionHeading
              label="Access and data"
              title="Access to your systems and data,"
              titleMuted="only as much as the work needs."
              description="Access to your systems follows the people and the engagement, not the company."
            />
            <ul className="border-t border-foreground/10">
              {accessPractices.map((practice, i) => (
                <li
                  key={practice}
                  className="border-b border-foreground/10 py-6 text-lg leading-relaxed text-muted-foreground"
                >
                  <Reveal delay={i * 80} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-px w-4 shrink-0 bg-foreground/40"
                    />
                    <span>{practice}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <SectionHeading
            label="Secure delivery"
            title="Secure software delivery,"
            titleMuted="built into the workflow, not bolted on."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliveryPractices.map(
              ({ icon: Icon, title: practiceTitle, body }, i) => (
                <Reveal key={practiceTitle} delay={Math.min(i * 100, 400)}>
                  <div className="group h-full border border-foreground/10 p-6 transition-colors duration-300 hover:border-foreground/20">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center border border-foreground/10 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium transition-transform duration-300 group-hover:translate-x-1">
                      {practiceTitle}
                    </h3>
                    <p className="text-muted-foreground">{body}</p>
                  </div>
                </Reveal>
              ),
            )}
          </div>
        </Container>
      </section>

      <section className="relative bg-foreground py-24 text-background lg:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
            <SectionHeading
              label="Your requirements"
              title="Have specific security requirements?"
              inverted
            />
            <Reveal
              from="right"
              delay={200}
              className="max-w-[60ch] text-lg leading-relaxed text-background/70"
            >
              <p>
                Your organization may have its own security policies or vendor
                questionnaires. Raise them at the scoping call, so they are part
                of the scope and the proposal before any work starts.
              </p>
              <p className="mt-6">
                <Link
                  href="/contact"
                  className="text-background underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
                >
                  Tell us about your security requirements
                </Link>
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            <div>
              <SectionHeading
                label="Security questions"
                title="Security questions"
                titleMuted="buyers usually ask."
              />
              <Link
                href="/faq#security-confidentiality-and-ip"
                className="mt-8 inline-flex text-sm text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                More security, confidentiality and IP questions
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
