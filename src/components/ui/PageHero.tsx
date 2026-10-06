import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumbs } from "./Breadcrumbs";
import { GridLines } from "@/components/hero/GridLines";
import { GlyphSphere } from "@/components/canvas/GlyphSphere";
import type { Crumb } from "@/lib/schema";

/**
 * Hero for every inner page: breadcrumbs, mono eyebrow, a two-line display
 * headline (second line muted, the reference's signature), a lead paragraph,
 * and optional actions. Exactly one <h1> per page lives here.
 */
export function PageHero({
  crumbs,
  label,
  title,
  titleMuted,
  description,
  children,
}: {
  crumbs: Crumb[];
  label: string;
  title: string;
  titleMuted?: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-foreground/10 pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[640px] w-[640px] -translate-y-1/2 opacity-30 lg:block">
        <GlyphSphere className="h-full w-full" />
      </div>
      <GridLines />
      <Container className="relative z-10">
        <Breadcrumbs crumbs={crumbs} />
        <span className="animate-fade-up mb-8 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
          <span className="h-px w-8 bg-foreground/30" />
          {label}
        </span>
        <h1
          className={`animate-fade-up max-w-5xl font-display leading-[0.95] tracking-tight [animation-delay:100ms] ${
            title.length + (titleMuted?.length ?? 0) > 48
              ? "text-[clamp(2.5rem,4.6vw,4.25rem)]"
              : "text-[clamp(2.75rem,6vw,5.5rem)]"
          }`}
        >
          {title}
          {titleMuted ? (
            <>
              {" "}
              <br />
              <span className="text-muted-foreground">{titleMuted}</span>
            </>
          ) : null}
        </h1>
        <p className="animate-fade-up mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground [animation-delay:200ms] lg:text-2xl">
          {description}
        </p>
        {children ? (
          <div className="animate-fade-up mt-10 flex flex-col items-start gap-4 [animation-delay:300ms] sm:flex-row">
            {children}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
