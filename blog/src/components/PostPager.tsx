import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/posts";

/** Links to the post published just before and just after this one. */
export function PostPager({ newer, older }: { newer: Post | null; older: Post | null }) {
  if (!newer && !older) return null;

  return (
    <nav aria-label="More posts" className="mt-20 flex flex-col gap-10 border-t border-foreground/10 pt-12 sm:flex-row sm:justify-between">
      {older ? (
        <Link href={`/${older.slug}`} className="group max-w-md">
          <span className="mb-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
            Previous post
          </span>
          <span className="font-display text-2xl leading-tight tracking-tight text-foreground underline-offset-4 group-hover:underline">
            {older.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {newer ? (
        <Link href={`/${newer.slug}`} className="group max-w-md sm:ml-auto sm:text-right">
          <span className="mb-3 flex items-center gap-2 font-mono text-xs text-muted-foreground sm:justify-end">
            Next post
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </span>
          <span className="font-display text-2xl leading-tight tracking-tight text-foreground underline-offset-4 group-hover:underline">
            {newer.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
