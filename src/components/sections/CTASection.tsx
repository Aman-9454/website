"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GlyphTetrahedron } from "@/components/canvas/GlyphTetrahedron";
import { useReveal } from "@/hooks/useReveal";

export function CTASection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          className={`relative border border-foreground transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(0,0,0,0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
            <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
              <div className="flex-1">
                <h2 className="mb-8 font-display text-4xl leading-[0.95] tracking-tight lg:text-7xl">
                  Let&apos;s solve
                  <br />
                  something together.
                </h2>

                <p className="mb-12 max-w-xl text-xl leading-relaxed text-muted-foreground">
                  Tell us what you&apos;re building, improving, or automating. We&apos;ll come back with a
                  plan, not a pitch.
                </p>

                <div className="flex flex-col items-start gap-4 sm:flex-row">
                  <Button href="/contact" withArrow>
                    Talk to an expert
                  </Button>
                  <Button href="/services" variant="secondary">
                    Explore services
                  </Button>
                </div>

                <p className="mt-8 font-mono text-sm text-muted-foreground">NDA before any scoping conversation</p>
              </div>

              <div className="-mr-16 hidden h-[500px] w-[500px] items-center justify-center lg:flex">
                <GlyphTetrahedron className="h-full w-full" />
              </div>
            </div>
          </div>

          <div className="absolute right-0 top-0 h-32 w-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 h-32 w-32 border-r border-t border-foreground/10" />
        </div>
      </Container>
    </section>
  );
}
