"use client";

import { Gauge, Layers, ListChecks, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import type { Principle } from "@/lib/validators";

const ICONS = [ShieldCheck, Gauge, Layers, ListChecks];

export function PrinciplesSection({ principles }: { principles: Principle[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-foreground/[0.02] py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              label="How we work"
              title="Four practices."
              titleMuted="Not four adjectives."
              description="Each principle below is something we actually do on every engagement, not a promise in a brochure."
            />
            <Link
              href="/security"
              className="mt-8 inline-flex text-sm text-foreground underline underline-offset-4 hover:no-underline"
            >
              How we protect your systems, data and IP
            </Link>
          </div>

          <div ref={ref} className="grid gap-6">
            {principles.map((principle, index) => {
              const Icon = ICONS[index % ICONS.length];
              return (
                <div
                  key={principle.title}
                  className={`group border border-foreground/10 p-6 transition-all duration-500 hover:border-foreground/20 ${
                    visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-foreground/10 transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-medium transition-transform duration-300 group-hover:translate-x-1">
                        {principle.title}
                      </h3>
                      <p className="text-muted-foreground">{principle.practice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
