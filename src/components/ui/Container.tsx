import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 lg:px-12",
        narrow ? "max-w-[52rem]" : "max-w-[1400px]",
        className,
      )}
    >
      {children}
    </div>
  );
}
