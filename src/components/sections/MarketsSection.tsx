"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useReveal } from "@/hooks/useReveal";

// Only commitments already made elsewhere on the site (FAQ, principles).
const practices = [
  { label: "Overlap window", value: "Agreed at kickoff" },
  { label: "Update cadence", value: "Agreed at kickoff" },
  { label: "Backlog", value: "Shared with your team" },
  { label: "Confidentiality", value: "NDA before scoping" },
];

const istFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export function MarketsSection() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const [istTime, setIstTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setIstTime(istFormatter.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const clock = window.setInterval(tick, 1000);
    const cycle = window.setInterval(() => setActive((prev) => (prev + 1) % practices.length), 2000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(clock);
      window.clearInterval(cycle);
    };
  }, []);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              label="International delivery"
              title="Built across"
              titleMuted="time zones."
              description="Our engineering team works India Standard Time — ahead of business hours in the US, UK and Europe, and overlapping with much of Asia-Pacific. For Western teams, work started during our day is often ready before yours begins."
            />
            <Link
              href="/how-we-work"
              className="mt-8 inline-flex text-sm text-foreground underline underline-offset-4 hover:no-underline"
            >
              How we work across time zones
            </Link>
          </div>

          <div
            ref={ref}
            className={`transition-all delay-200 duration-700 ${visible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}
          >
            <div className="border border-foreground/10">
              <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
                <span className="font-mono text-sm text-muted-foreground">India Standard Time</span>
                <span className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-signal" />
                  <span className="tabular-nums">{istTime ?? "--:--:--"}</span>
                </span>
              </div>

              {practices.map((practice, index) => (
                <div
                  key={practice.label}
                  className={`flex items-center justify-between border-b border-foreground/5 px-6 py-5 transition-all duration-300 last:border-b-0 ${
                    active === index ? "bg-foreground/[0.02]" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                        active === index ? "bg-foreground" : "bg-foreground/20"
                      }`}
                    />
                    <span className="font-medium">{practice.label}</span>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">{practice.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
