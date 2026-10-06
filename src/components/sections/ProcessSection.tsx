"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/lib/validators";

const STEP_SECONDS = 4;

export function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  const [active, setActive] = useState(0);

  // Restarts on every change so a manual click gets a full STEP_SECONDS before advancing.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, STEP_SECONDS * 1000);
    return () => clearInterval(interval);
  }, [active, steps.length]);

  const activeStep = steps[active];
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 40px, currentColor 40px, currentColor 41px)",
        }}
      />

      <Container className="relative z-10">
        <SectionHeading inverted label="Process" title="Six stages." titleMuted="Always in this order." />
        <Link
          href="/how-we-work"
          className="mt-8 inline-flex text-sm text-background/70 underline underline-offset-4 hover:text-background hover:no-underline"
        >
          See each stage in detail
        </Link>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-2 lg:gap-24">
          <div>
            {steps.map((step, index) => (
              <button
                key={step.index}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={active === index}
                className={cn(
                  "group w-full border-b border-background/10 py-8 text-left transition-all duration-500",
                  active === index ? "opacity-100" : "opacity-40 hover:opacity-70",
                )}
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-3xl text-background/30">{pad(step.index)}</span>
                  <div className="flex-1">
                    <span className="mb-3 block font-display text-2xl transition-transform duration-300 group-hover:translate-x-2 lg:text-3xl">
                      {step.title}
                    </span>
                    <span className="block leading-relaxed text-background/60">{step.description}</span>
                    {active === index ? (
                      <div className="mt-4 h-px overflow-hidden bg-background/20">
                        <div key={active} className="progress-bar h-full bg-background" />
                      </div>
                    ) : null}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="self-start lg:sticky lg:top-32">
            <div className="overflow-hidden border border-background/10">
              <div className="flex items-center justify-between border-b border-background/10 px-6 py-4">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-background/20" />
                  <span className="h-3 w-3 rounded-full bg-background/20" />
                  <span className="h-3 w-3 rounded-full bg-background/20" />
                </div>
                <span className="font-mono text-xs text-background/40">stage-{pad(activeStep.index)}.md</span>
              </div>

              <div className="min-h-[280px] p-8">
                <span className="font-mono text-sm text-background/40">
                  {pad(activeStep.index)} / {pad(steps.length)}
                </span>
                <p key={active} className="mt-6 font-display text-4xl leading-tight lg:text-5xl">
                  {activeStep.title.split("").map((char, i) => (
                    <span key={i} className="reveal-char inline-block" style={{ animationDelay: `${i * 30}ms` }}>
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </p>
                <p key={`${active}-desc`} className="reveal-line mt-6 text-lg leading-relaxed text-background/70">
                  {activeStep.description}
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-background/10 px-6 py-4">
                <span className="h-2 w-2 rounded-full bg-background/50" />
                <span className="font-mono text-xs text-background/40">
                  Stage {pad(activeStep.index)} of {pad(steps.length)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
