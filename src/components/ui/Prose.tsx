import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Long-form reading styles (legal pages, policies): h2/h3/p/ul/a inside get type rhythm. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "max-w-[68ch] text-lg leading-relaxed text-muted-foreground",
        "[&_h2]:mt-16 [&_h2]:mb-6 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:tracking-tight [&_h2]:text-foreground [&_h2:first-child]:mt-0",
        "[&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:text-foreground",
        "[&_p]:mb-6 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6",
        "[&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:no-underline",
        "[&_strong]:font-medium [&_strong]:text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
