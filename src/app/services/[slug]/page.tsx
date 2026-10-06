import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQList } from "@/components/ui/FAQList";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL, faqPageSchema, pageGraph, serviceSchema, type Crumb } from "@/lib/schema";
import services, { getService } from "@/data/services";
import process from "@/data/process";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    path: `/services/${service.slug}`,
    title: service.metaTitle,
    description: service.metaDescription,
    absoluteTitle: true,
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];
  const related = service.related.map((s) => getService(s)).filter((s) => s !== undefined);

  const keyFacts = [
    { term: "What it is", detail: service.primaryKeyword.replace(/^./, (c) => c.toUpperCase()) },
    { term: "Engagement models", detail: "Fixed scope, dedicated team, or time and materials" },
    { term: "Typical stack", detail: service.stack.join(", ") },
    { term: "Delivered from", detail: "India, working India Standard Time for international teams" },
  ];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: service.metaTitle,
          description: service.metaDescription,
          crumbs,
          mainEntityId: `${SITE_URL}${path}#service`,
          extra: [
            serviceSchema({ path, name: service.name, description: service.answer, serviceType: service.primaryKeyword }),
            faqPageSchema(service.faqs),
          ],
        })}
      />

      <PageHero
        crumbs={crumbs}
        label="Service"
        title={service.name}
        titleMuted={service.outcome}
        description={service.answer}
      >
        <Button href="/contact" withArrow>
          Talk to an expert
        </Button>
        <Button href="/how-we-work" variant="secondary">
          See how we work
        </Button>
      </PageHero>

      {/* Key facts — a definition list answer engines can lift as-is. */}
      <section className="relative py-16 lg:py-20">
        <Container>
          <dl className="grid border-l border-t border-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {keyFacts.map((fact, i) => (
              <Reveal key={fact.term} delay={i * 80} className="border-b border-r border-foreground/10 p-6 lg:p-8">
                <dt className="mb-3 font-mono text-xs text-muted-foreground">{fact.term}</dt>
                <dd className="leading-relaxed">{fact.detail}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <SectionHeading label="The problem" title="When do teams need" titleMuted={`${service.name}?`} />
            <ul className="border-t border-foreground/10">
              {service.problems.map((problem, i) => (
                <li key={problem} className="border-b border-foreground/10">
                  <Reveal delay={i * 80} className="py-6 text-lg leading-relaxed text-muted-foreground">
                    {problem}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-foreground py-24 text-background lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)",
          }}
        />
        <Container className="relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <SectionHeading inverted label="What we deliver" title="What Asauvia delivers" titleMuted={`for ${service.name}.`} description={service.summary} />
            <ul className="border-t border-background/10">
              {service.deliverables.map((item, i) => (
                <li key={item} className="border-b border-background/10">
                  <Reveal delay={i * 80} className="flex gap-4 py-6 text-lg leading-relaxed">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-background/50" />
                    {item}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="relative py-24 lg:py-32">
        <Container>
          <SectionHeading label="Use cases" title={`Where ${service.name}`} titleMuted="makes a difference." />
          <div className="mt-16 grid border-l border-t border-foreground/10 md:grid-cols-2 lg:mt-24">
            {service.useCases.map((useCase, i) => (
              <Reveal key={useCase.title} delay={i * 100} className="group border-b border-r border-foreground/10 p-8 transition-colors duration-300 hover:bg-foreground/[0.02] lg:p-10">
                <h3 className="mb-3 font-display text-2xl transition-transform duration-300 group-hover:translate-x-1">
                  {useCase.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">{useCase.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 bg-foreground/[0.02] py-24 lg:py-32">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading label="Process" title="How the project" titleMuted="moves, stage by stage." />
            <Link href="/how-we-work" className="text-sm underline underline-offset-4 hover:no-underline">
              See each stage in detail
            </Link>
          </div>
          <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6">
            {process.map((step, i) => (
              <li key={step.index}>
                <Reveal delay={i * 80} className="border-t border-foreground pt-5">
                  <span className="font-mono text-sm text-muted-foreground">{String(step.index).padStart(2, "0")}</span>
                  <p className="mt-2 text-lg">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
            <SectionHeading label="Questions" title={`${service.name}:`} titleMuted="what buyers ask." />
            <FAQList faqs={service.faqs} />
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="relative border-t border-foreground/10 py-24 lg:py-32">
          <Container>
            <SectionHeading label="Related" title="Often paired" titleMuted={`with ${service.name}.`} />
            <div className="mt-16 grid border-l border-t border-foreground/10 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group flex flex-col justify-between gap-10 border-b border-r border-foreground/10 p-8 transition-colors duration-300 hover:bg-foreground/[0.02]"
                >
                  <div>
                    <h3 className="mb-3 font-display text-2xl">{r.name}</h3>
                    <p className="leading-relaxed text-muted-foreground">{r.outcome}</p>
                  </div>
                  <span className="flex items-center gap-2 text-sm">
                    Explore {r.name}
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTASection />
    </>
  );
}
