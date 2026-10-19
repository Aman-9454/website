import type { Metadata } from "next";
import Link from "next/link";
import { GridLines } from "@/components/GridLines";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b border-foreground/10 pt-32 pb-20 lg:pt-40 lg:pb-28">
      <GridLines />
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <span className="animate-fade-up mb-8 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
          <span className="h-px w-8 bg-foreground/30" />
          Error 404
        </span>
        <h1 className="animate-fade-up max-w-5xl font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-tight [animation-delay:100ms]">
          Page not found.
          <br />
          <span className="text-muted-foreground">The link may be out of date.</span>
        </h1>
        <div className="animate-fade-up mt-10 flex flex-col items-start gap-4 [animation-delay:300ms] sm:flex-row">
          <Link
            href="/posts"
            className="inline-flex h-14 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-foreground/90"
          >
            Back to all posts
          </Link>
          <a
            href={site.mainUrl}
            className="inline-flex h-14 items-center justify-center rounded-full border border-foreground/20 px-8 text-base font-medium text-foreground transition-colors hover:bg-foreground/5"
          >
            Visit asauvia.com
          </a>
        </div>
      </div>
    </section>
  );
}
