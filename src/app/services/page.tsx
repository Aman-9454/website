import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, serviceSchema, type Crumb } from "@/lib/schema";
import services from "@/data/services";

const description =
  "Software development services from Asauvia: AI, automation, custom software, product engineering, web and mobile, cloud, data, HR systems and SEO.";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Software Development Services",
  description,
});

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={pageGraph({
          path: "/services",
          name: "Software Development Services",
          description,
          crumbs,
          type: "CollectionPage",
          extra: services.map((s) =>
            serviceSchema({
              path: `/services/${s.slug}`,
              name: s.name,
              description: s.answer,
              serviceType: s.primaryKeyword,
            }),
          ),
        })}
      />

      <PageHero
        crumbs={crumbs}
        label="Services"
        title="Software development services,"
        titleMuted="built end to end."
        description={`Asauvia designs, builds and runs software for teams across international markets. Below are the ${services.length} services we deliver — each one owned from scoping to launch and beyond.`}
      >
        <Button href="/contact" withArrow>
          Talk to an expert
        </Button>
        <Button href="/how-we-work" variant="secondary">
          See how we work
        </Button>
      </PageHero>

      <section className="relative py-24 lg:py-32">
        <Container>
          <SectionHeading label="What we deliver" title="Every service," titleMuted="in one place." />
          <div className="mt-16 border-t border-foreground/10 lg:mt-24">
            {services.map((service, index) => (
              <Reveal key={service.slug}>
              <div className="group relative flex flex-col gap-6 border-b border-foreground/10 py-10 lg:flex-row lg:items-start lg:gap-16 lg:py-14">
                <span className="shrink-0 font-mono text-sm text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="grid flex-1 gap-6 lg:grid-cols-2 lg:gap-16">
                  <div>
                    <h2 className="mb-3 font-display text-3xl lg:text-4xl">
                      {/* Stretched link: the ::after overlay covers the whole card. The hover shift
                          sits on an inner span so no ancestor of the overlay gets a transform. */}
                      <Link href={`/services/${service.slug}`} className="after:absolute after:inset-0">
                        <span className="block transition-transform duration-500 group-hover:translate-x-2">
                          {service.name}
                        </span>
                      </Link>
                    </h2>
                    <p className="text-lg text-muted-foreground">{service.outcome}</p>
                  </div>
                  <div className="flex items-start justify-between gap-8">
                    <p className="leading-relaxed text-muted-foreground">{service.summary}</p>
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                    />
                  </div>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
