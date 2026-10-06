const stack = ["TypeScript", "React", "Next.js", "Python", "PostgreSQL", "AWS", "Docker", "LLM integration"];

const reversed = [...stack].reverse();

export function TrustStrip() {
  return (
    <div className="space-y-4 overflow-hidden border-y border-border py-6">
      {/* One real list for crawlers and screen readers; the moving rows below are decorative copies. */}
      <ul aria-label="Technologies we commonly use" className="sr-only">
        {stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div aria-hidden="true" className="marquee-track flex w-max gap-14">
        {[...stack, ...stack].map((item, i) => (
          <span key={`${item}-${i}`} className="font-mono text-sm text-muted-foreground">
            {item}
          </span>
        ))}
      </div>
      <div aria-hidden="true" className="marquee-track-reverse flex w-max gap-14">
        {[...reversed, ...reversed].map((item, i) => (
          <span key={`${item}-${i}`} className="font-mono text-sm text-muted-foreground">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
