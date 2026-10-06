import { cn } from "@/lib/utils";

/**
 * The visual brand wordmark, cased as in the logo ("ASAUViA"). Purely visual:
 * the enclosing link carries the accessible name (e.g. aria-label "Asauvia, home"),
 * so screen readers and text crawlers don't read the capitals as initials.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("font-wordmark font-semibold leading-none tracking-[0.02em]", className)}>
      ASAUV<span className="tracking-[0.01em]">i</span>A
    </span>
  );
}
