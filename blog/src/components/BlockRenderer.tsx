import type { Block } from "@/lib/posts";
import { headingId } from "@/lib/text";
import { Figure } from "./Figure";

/** Renders validated post blocks as React elements. No raw HTML is ever injected. */
export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={index}
                id={headingId(block.text)}
                className="scroll-mt-28 mt-16 mb-6 font-display text-3xl tracking-tight first:mt-0 lg:text-4xl"
              >
                {block.text}
              </h2>
            );
          case "ul":
            return (
              <ul key={index} className="mb-8 list-disc space-y-3 pl-6 text-lg leading-relaxed text-muted-foreground marker:text-foreground/40">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="my-14 border-l border-foreground pl-6 font-display text-2xl leading-snug tracking-tight text-foreground lg:text-3xl"
              >
                {block.text}
              </blockquote>
            );
          case "p":
            return (
              <p key={index} className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            );
          case "figure":
            return <Figure key={index} figure={block.figure} />;
        }
      })}
    </>
  );
}
