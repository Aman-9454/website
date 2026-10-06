import Link from "next/link";
import type { Crumb } from "@/lib/schema";

/** Visible breadcrumb trail. Pair with breadcrumbSchema() in the page's JSON-LD. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10 font-mono text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {crumbs.map((crumb, index) => {
          const last = index === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-foreground">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="transition-colors hover:text-foreground">
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-foreground/30">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
