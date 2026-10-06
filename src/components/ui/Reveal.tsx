"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

/**
 * Scroll-reveal wrapper so Server Components can use the homepage's
 * fade-and-rise entrance. `delay` (ms) staggers items in a list.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  from = "bottom",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "right";
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const hidden = from === "right" ? "translate-x-8 opacity-0" : "translate-y-8 opacity-0";

  return (
    <div
      ref={ref}
      className={cn("transition-all duration-700", visible ? "translate-x-0 translate-y-0 opacity-100" : hidden, className)}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
