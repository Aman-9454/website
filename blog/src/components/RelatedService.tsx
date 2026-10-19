import { ArrowUpRight } from "lucide-react";
import { serviceHref, serviceName, type ServiceSlug } from "@/lib/services";

/** Links a post to the matching service page on the main site, so readers can move from reading to hiring. */
export function RelatedService({ slug }: { slug: ServiceSlug }) {
  return (
    <aside aria-labelledby="related-service-heading" className="mt-20 border-t border-foreground/10 pt-12">
      <p id="related-service-heading" className="mb-6 font-mono text-sm text-muted-foreground">
        Related service
      </p>
      <a
        href={serviceHref(slug)}
        data-cta="related-service"
        data-cta-location="post-related-service"
        className="group flex flex-col gap-6 border border-foreground/10 p-8 transition-colors hover:border-foreground/30 sm:flex-row sm:items-center sm:justify-between lg:p-10"
      >
        <div>
          <h2 className="mb-2 font-display text-3xl tracking-tight lg:text-4xl">{serviceName(slug)}</h2>
          <p className="text-lg text-muted-foreground">See how Asauvia delivers this on asauvia.com.</p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 text-foreground">
          View service
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </a>
    </aside>
  );
}
