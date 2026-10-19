import type { Faq } from "@/lib/posts";

/** Accessible FAQ accordion built on native <details>. Works without JavaScript. */
export function FAQList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t border-foreground/10">
      {faqs.map((faq) => (
        <details key={faq.question} className="group border-b border-foreground/10">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-left text-lg lg:text-xl [&::-webkit-details-marker]:hidden">
            <span className="transition-transform duration-300 group-hover:translate-x-1">{faq.question}</span>
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center border border-foreground/10 font-mono text-muted-foreground transition-all duration-300 group-open:rotate-45 group-open:bg-foreground group-open:text-background"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-7 leading-relaxed text-muted-foreground">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
