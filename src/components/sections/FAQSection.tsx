import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQList } from "@/components/ui/FAQList";
import type { Faq } from "@/lib/validators";

export function FAQSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faq" className="relative border-t border-foreground/10 py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div>
            <SectionHeading label="Before you ask" title="Questions worth" titleMuted="answering upfront." />
            <Link
              href="/faq"
              className="mt-8 inline-flex text-sm text-foreground underline underline-offset-4 hover:no-underline"
            >
              See every question we get asked
            </Link>
          </div>
          <FAQList faqs={faqs} />
        </div>
      </Container>
    </section>
  );
}
