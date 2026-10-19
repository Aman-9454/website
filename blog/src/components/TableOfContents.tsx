import { headingId } from "@/lib/text";

/** Jump links to each section. Readers skim first, so this keeps long posts from feeling long. */
export function TableOfContents({ headings }: { headings: string[] }) {
  if (headings.length < 3) return null;

  return (
    <nav aria-label="In this post" className="mb-16 border-t border-foreground pt-8">
      <p className="mb-6 font-mono text-sm text-muted-foreground">In this post</p>
      <ol className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
        {headings.map((heading, index) => (
          <li key={heading} className="flex gap-4">
            <span className="font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>
            <a
              href={`#${headingId(heading)}`}
              className="text-base text-foreground underline-offset-4 transition-colors hover:underline"
            >
              {heading}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
