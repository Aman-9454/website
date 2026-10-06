import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FAQList } from "@/components/ui/FAQList";
import process from "@/data/process";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema, pageGraph, type Crumb } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/validators";

const PATH = "/how-we-work";
const TITLE = "Software Development Process & Engagement Models";
const DESCRIPTION =
  "Asauvia's software development process: six stages from discovery to launch, three engagement models and visible progress across time zones for your team.";

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: TITLE,
  description: DESCRIPTION,
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "How we work", path: PATH },
];

const stages = [
  {
    title: "Discover",
    happens:
      "We start with a short call to understand the real problem, not just the requested feature. We ask about your users, existing systems, constraints and what success looks like. An NDA is signed before any confidential detail is shared.",
    deliverables: [
      "A written scope summary of the problem and constraints",
      "Open questions and assumptions, listed so you can correct them",
      "A recommended engagement model",
    ],
  },
  {
    title: "Design",
    happens:
      "We work out the architecture and the delivery plan, and document the key decisions up front. You review the plan before anything is built, so disagreements surface on paper rather than in code.",
    deliverables: [
      "An architecture document with the decisions and their reasons",
      "A delivery plan broken into backlog items",
      "Your review of the plan before build begins",
    ],
  },
  {
    title: "Build",
    happens:
      "We deliver in increments against a backlog you can see. Every change goes through code review, and dependencies are reviewed as they are added. You follow progress through the backlog and updates on the cadence agreed at kickoff.",
    deliverables: [
      "Working increments you can try as the build progresses",
      "A shared backlog showing what is done, in progress and next",
      "Code that has passed review, with dependencies checked",
    ],
  },
  {
    title: "Validate",
    happens:
      "Nothing ships without passing testing and review gates. For web work, Core Web Vitals budgets are enforced in CI, so a performance regression fails the build instead of reaching your users.",
    deliverables: [
      "Test and review results for the release",
      "A release that has passed those gates before it goes live",
    ],
  },
  {
    title: "Launch",
    happens:
      "We deploy with monitoring and a rollback path in place from the first release. If something behaves unexpectedly in production, there is a known way back.",
    deliverables: [
      "A deployed release with monitoring in place",
      "A documented rollback path",
    ],
  },
  {
    title: "Improve",
    happens:
      "After launch we measure the result against the goal agreed in discovery, then decide with you what to change next. Some engagements end here; others continue as ongoing product work.",
    deliverables: [
      "A review of the release against the original goal",
      "A ranked list of next improvements",
      "A recommendation on whether and how to continue",
    ],
  },
];

const models = [
  {
    name: "Fixed scope",
    fits: "Well-defined projects where requirements are clear before work starts.",
    change:
      "Scope is agreed in writing before build. Changes are discussed openly and handled as an agreed change to scope, not absorbed silently.",
    notFor: "Work where the requirements are still being discovered.",
  },
  {
    name: "Dedicated team",
    fits: "Ongoing product work where you need consistent capacity and people who know your system.",
    change:
      "Priorities are set through the shared backlog. You reorder work as your needs change, and the team picks up what matters most next.",
    notFor: "A one-off project with a clear end point.",
  },
  {
    name: "Time and materials or retainer",
    fits: "Work that evolves as you learn, such as early-stage products, integrations with unclear edges, or continued improvement after launch.",
    change:
      "Scope stays flexible by design. Work is planned in the backlog and reviewed with you, so you can change direction as you learn.",
    notFor: "Buyers who need a single fixed figure agreed before work begins.",
  },
];

const timezonePractices = [
  {
    title: "A head start for Western teams",
    body: "Our team works India Standard Time, which runs ahead of business hours in the US, UK and Europe and overlaps with much of Asia-Pacific. For Western teams, work started during our day is often ready before yours begins.",
  },
  {
    title: "Overlap and cadence agreed with you",
    body: "At kickoff we agree an overlap window for live conversation and a communication cadence that suits your team.",
  },
  {
    title: "A shared backlog",
    body: "The backlog is visible to your team, so you can see what is done, in progress and next at any time.",
  },
  {
    title: "A standing update cadence",
    body: "Updates arrive on the cadence agreed with you, so decisions and context do not depend on catching someone live.",
  },
];

const startSteps = [
  {
    title: "Send us a message",
    body: "Tell us what you are building, improving or automating through the contact form.",
  },
  {
    title: "Short scoping call",
    body: "We talk through the problem, constraints and goals. An NDA is signed first if you need to share anything confidential.",
  },
  {
    title: "Proposal",
    body: "You receive a written proposal covering the approach and a recommended engagement model.",
  },
];

const faqs: Faq[] = [
  {
    question: "Do you have a rate card or fixed price list?",
    answer:
      "No. Every engagement is scoped with you before work starts. Cost depends mainly on scope and uncertainty: how defined the requirements are, how much integration with existing systems is needed, and how much of the work is genuinely new.",
  },
  {
    question: "Which engagement model should we choose?",
    answer:
      "Fixed scope suits well-defined projects, a dedicated team suits ongoing product work, and time and materials or a retainer suits work that evolves. We recommend a model in the proposal after the scoping call, and you decide.",
  },
  {
    question: "How will we know what is happening during the build?",
    answer:
      "You get access to a shared backlog and updates on a cadence agreed at kickoff. Status is visible to you at any time rather than reported only when you ask.",
  },
  {
    question: "How do you handle working across time zones?",
    answer:
      "Our team works India Standard Time, which runs ahead of business hours in the US, UK and Europe and overlaps with much of Asia-Pacific. We agree an overlap window and a communication cadence with each client at kickoff.",
  },
  {
    question: "Who owns the code and other work product?",
    answer:
      "Intellectual property in the work product is assigned to you on delivery or payment. Access to your systems and data is limited to the people on the project for the duration of the engagement.",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

const linkClass =
  "text-foreground underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: PATH,
          name: `${TITLE} | Asauvia`,
          description: DESCRIPTION,
          crumbs,
          extra: [faqPageSchema(faqs)],
        })}
      />

      <PageHero
        crumbs={crumbs}
        label="How we work"
        title="Our software development process,"
        titleMuted="from first message to shipped."
        description="Every Asauvia engagement follows six stages — discover, design, build, validate, launch and improve — with an overlap window agreed at kickoff and progress visible in a shared backlog. You review the plan before we build and choose an engagement model: fixed scope, dedicated team, or time and materials (or a retainer)."
      >
        <Button href="/contact" withArrow>
          Start with a scoping call
        </Button>
        <Button href="/services" variant="secondary">
          See our services
        </Button>
      </PageHero>

      <ProcessSection steps={process} />

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <SectionHeading
            label="Each stage in detail"
            title="What happens at each process stage,"
            titleMuted="and what you get."
            description="Each stage ends with something concrete you can review, not just a status update."
          />

          <ol className="mt-16 border-t border-foreground/10 lg:mt-24">
            {stages.map((stage, index) => (
              <li key={stage.title}>
                <Reveal
                  delay={Math.min(index * 80, 400)}
                  className="grid gap-8 border-b border-foreground/10 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24"
                >
                  <div className="flex items-start gap-6">
                    <span className="font-mono text-sm text-muted-foreground">
                      {pad(index + 1)}
                    </span>
                    <div>
                      <h3 className="font-display text-3xl tracking-tight lg:text-4xl">
                        {stage.title}
                      </h3>
                      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">
                        {stage.happens}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="mb-4 font-mono text-xs text-muted-foreground">
                      What you get
                    </h4>
                    <ul className="border-t border-foreground/10">
                      {stage.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-4 border-b border-foreground/10 py-4 text-lg leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-3 h-px w-4 shrink-0 bg-foreground/40"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="relative overflow-x-clip border-t border-foreground/10 bg-foreground/[0.02] py-24 lg:py-32">
        <Container>
          <SectionHeading
            label="Engagement models"
            title="Three engagement models."
            titleMuted="Chosen to fit the work."
            description="We recommend a model after the scoping call, based on how defined the work is and how long it is likely to run."
          />

          <div className="mt-16 grid gap-px border border-foreground/10 bg-foreground/10 lg:mt-24 lg:grid-cols-3">
            {models.map((model, index) => (
              <Reveal
                key={model.name}
                delay={index * 100}
                className="flex flex-col bg-background"
              >
                <article className="flex flex-1 flex-col p-8 lg:p-10">
                  <h3 className="font-display text-2xl tracking-tight lg:text-3xl">
                    {model.name}
                  </h3>
                  <dl className="mt-8 space-y-6">
                    <div>
                      <dt className="font-mono text-xs text-muted-foreground">
                        When it fits
                      </dt>
                      <dd className="mt-2 leading-relaxed">{model.fits}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs text-muted-foreground">
                        Scope and change
                      </dt>
                      <dd className="mt-2 leading-relaxed text-muted-foreground">
                        {model.change}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-xs text-muted-foreground">
                        Not suited for
                      </dt>
                      <dd className="mt-2 leading-relaxed text-muted-foreground">
                        {model.notFor}
                      </dd>
                    </div>
                  </dl>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-foreground/10 pt-12 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
            <h3 className="font-display text-3xl tracking-tight lg:text-4xl">
              What affects cost
            </h3>
            <Reveal from="right" delay={200}>
              <p className="max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
                We do not publish a rate card because cost is driven by the work
                itself. The main factors are scope and uncertainty: how clearly
                the requirements are defined, how much integration with your
                existing systems is involved, and how much of the build is
                genuinely new rather than an established pattern. We scope this
                with you before any work starts, so the proposal reflects your
                project rather than a generic package. See the{" "}
                <Link
                  href="/services/product-engineering"
                  className={linkClass}
                >
                  product engineering
                </Link>
                ,{" "}
                <Link
                  href="/services/custom-software-development"
                  className={linkClass}
                >
                  custom software development
                </Link>{" "}
                and{" "}
                <Link
                  href="/services/ai-software-development"
                  className={linkClass}
                >
                  AI software development
                </Link>{" "}
                service pages for what each one covers.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative overflow-x-clip border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <SectionHeading
              label="Time zones and communication"
              title="Working across time zones,"
              titleMuted="with status you see without asking."
              description="Distance only becomes a problem when information is hard to get. We set up the working rhythm with you at kickoff and keep progress visible from there."
            />
            <Reveal
              from="right"
              delay={200}
              className="border-t border-foreground/10"
            >
              {timezonePractices.map((practice) => (
                <div
                  key={practice.title}
                  className="border-b border-foreground/10 py-8"
                >
                  <h3 className="text-lg font-medium">{practice.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {practice.body}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <SectionHeading
                label="How to start"
                title="Three steps to start a project,"
                titleMuted="from first message to proposal."
                description="The proposal recommends an engagement model. You decide whether and how to go ahead."
              />
              <div className="mt-10">
                <Button href="/contact" withArrow>
                  Contact us to start
                </Button>
              </div>
            </div>
            <ol className="border-t border-foreground/10">
              {startSteps.map((step, index) => (
                <li key={step.title}>
                  <Reveal
                    delay={index * 80}
                    className="flex items-start gap-6 border-b border-foreground/10 py-8"
                  >
                    <span className="font-mono text-sm text-muted-foreground">
                      {pad(index + 1)}
                    </span>
                    <div>
                      <h3 className="text-lg font-medium">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            <div>
              <SectionHeading
                label="Process questions"
                title="Questions about our process,"
                titleMuted="answered before you get in touch."
              />
              <div className="mt-8 flex flex-col items-start gap-3 text-sm">
                <Link href="/faq" className={linkClass}>
                  Read the full FAQ
                </Link>
                <Link href="/security" className={linkClass}>
                  How we handle security and confidentiality
                </Link>
              </div>
            </div>
            <FAQList faqs={faqs} />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
