"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import type { Service } from "@/lib/validators";

const COUNT_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <Container>
        <SectionHeading label="What we build" title={`${COUNT_WORDS[services.length] ?? services.length} things we do well.`} titleMuted="Not a long list of everything." />

        <div className="mt-16 lg:mt-24">
          {services.map((service, index) => (
            <ServiceRow key={service.slug} service={service} index={index} />
          ))}
        </div>

        <Link
          href="/services"
          className="mt-12 inline-flex text-sm text-foreground underline underline-offset-4 hover:no-underline"
        >
          See all services and how each one works
        </Link>
      </Container>
    </section>
  );
}

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`group transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
    >
      <div className="flex flex-col gap-8 border-b border-foreground/10 py-12 lg:flex-row lg:gap-16 lg:py-20">
        <span className="shrink-0 font-mono text-sm text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="grid flex-1 items-start gap-8 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 font-display text-3xl transition-transform duration-500 group-hover:translate-x-2 lg:text-4xl">
              <Link href={`/services/${service.slug}`} className="text-inherit no-underline underline-offset-4 hover:underline">
                {service.name}
              </Link>
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">{service.outcome}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground/90">{service.summary}</p>
          </div>

          <ul className="space-y-3 lg:pt-2">
            {service.deliverables.map((item) => (
              <li key={item} className="flex gap-3 text-muted-foreground">
                <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-foreground/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
