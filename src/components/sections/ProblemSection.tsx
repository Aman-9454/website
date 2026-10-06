"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";

const problems = [
  "A system built five years ago is now the thing slowing every new feature down.",
  "Work that should be automatic — reconciling data, routing approvals, following up — still runs through a person.",
  "An AI pilot worked in a demo and never made it to production.",
  "A vendor across a time zone that only overlaps your evening, if at all.",
];

export function ProblemSection() {
  const { ref, visible } = useReveal<HTMLUListElement>();

  return (
    <section className="relative py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <SectionHeading label="The real problem" title="It rarely fails at the idea." titleMuted="It fails at delivery." />

          <ul ref={ref} className="border-t border-foreground/10">
            {problems.map((problem, index) => (
              <li
                key={problem}
                className={`border-b border-foreground/10 py-6 text-lg leading-relaxed text-muted-foreground transition-all duration-500 ${
                  visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {problem}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
