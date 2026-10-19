import { FAQList } from "./FAQList";
import type { Faq } from "@/lib/posts";
import { site } from "@/lib/site";

/** Two-column FAQ block, laid out like the FAQ section on the main Asauvia site. */
export function FAQSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative border-t border-foreground/10 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div className="max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
              <span className="h-px w-8 bg-foreground/30" aria-hidden="true" />
              Before you ask
            </span>
            <h2 id="faq-heading" className="font-display text-4xl tracking-tight lg:text-6xl">
              Questions worth
              <br />
              <span className="text-muted-foreground">answering upfront.</span>
            </h2>
            <a
              href={`${site.mainUrl}/faq`}
              className="mt-8 inline-flex text-sm text-foreground underline underline-offset-4 hover:no-underline"
            >
              See every question we get asked
            </a>
          </div>
          <FAQList faqs={faqs} />
        </div>
      </div>
    </section>
  );
}
