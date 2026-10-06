import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GridLines } from "@/components/hero/GridLines";
import { GlyphSphere } from "@/components/canvas/GlyphSphere";
import { RotatingWords } from "@/components/hero/RotatingWords";

// What we ship, from the services list. The first is the server-rendered default.
const shipWords = ["what matters.", "AI software.", "automation.", "AI agents.", "mobile apps."];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/2 hidden h-[600px] w-[600px] -translate-y-1/2 opacity-40 lg:block lg:h-[800px] lg:w-[800px]">
        <GlyphSphere className="h-full w-full" />
      </div>

      <GridLines />

      <Container className="relative z-10 py-32 lg:py-40">
        {/* One h1 carries the brand + search term (small line) and the visual headline (large lines). */}
        <h1 className="mb-12">
          <span className="animate-fade-up mb-8 flex items-center gap-3 font-mono text-sm font-normal text-muted-foreground">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-foreground/30" />
            Asauvia: AI software development company
          </span>{" "}
          <span className="animate-fade-up block font-display text-[clamp(3rem,8.75vw,8rem)] leading-[0.9] tracking-tight text-foreground [animation-delay:100ms]">
            <span className="block">Build smarter systems.</span>{" "}
            <span className="block text-muted-foreground">
              Ship <RotatingWords words={shipWords} />
            </span>
          </span>
        </h1>

        <div className="grid items-end gap-12 lg:grid-cols-2 lg:gap-24">
          <p className="animate-fade-up max-w-xl text-xl leading-relaxed text-muted-foreground [animation-delay:200ms] lg:text-2xl">
            Asauvia is an AI software development and product engineering company. We design, build
            and modernize AI-powered software, digital products and automation for businesses across
            international markets.
          </p>

          <div className="animate-fade-up flex flex-col items-start gap-4 [animation-delay:300ms] sm:flex-row">
            <Button href="/contact" withArrow>
              Talk to an expert
            </Button>
            <Button href="/services" variant="secondary">
              Explore services
            </Button>
          </div>
        </div>

        <p className="animate-fade-up mt-10 font-mono text-sm text-muted-foreground [animation-delay:400ms]">
          Engineering team in India, working India Standard Time.
        </p>
      </Container>
    </section>
  );
}
