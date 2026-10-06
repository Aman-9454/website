"use client";

import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/useReveal";

export function SectionHeading({
  label,
  title,
  titleMuted,
  description,
  align = "left",
  inverted = false,
}: {
  label?: string;
  title: string;
  titleMuted?: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "max-w-3xl transition-all duration-700",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        align === "center" && "mx-auto text-center",
      )}
    >
      {label ? (
        <span
          className={cn(
            "mb-6 inline-flex items-center gap-3 font-mono text-sm",
            inverted ? "text-background/50" : "text-muted-foreground",
          )}
        >
          <span className={cn("h-px w-8", inverted ? "bg-background/30" : "bg-foreground/30")} />
          {label}
        </span>
      ) : null}
      <h2
        className={cn(
          "font-display text-4xl tracking-tight lg:text-6xl",
          inverted ? "text-background" : "text-foreground",
        )}
      >
        {title}
        {titleMuted ? (
          <>
            <br />
            <span className={inverted ? "text-background/50" : "text-muted-foreground"}>{titleMuted}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 text-xl leading-relaxed",
            inverted ? "text-background/60" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
