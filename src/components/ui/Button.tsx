import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  withArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  withArrow = false,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full px-8 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
        variant === "primary"
          ? "bg-foreground text-background hover:bg-foreground/90"
          : "border border-foreground/20 text-foreground hover:bg-foreground/5",
        className,
      )}
    >
      {children}
      {withArrow ? (
        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      ) : null}
    </Link>
  );
}
