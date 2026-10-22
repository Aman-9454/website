import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductStatus } from "@/components/products/ProductStatus";
import type { Product } from "@/lib/products";

/**
 * One project on the /products index: the name and summary lead, the highlights sit beside them as a ruled list,
 * and the two actions are the same ones the detail page offers.
 */
export function ProjectSheet({ product }: { product: Product }) {
  return (
    <article className="grid gap-12 border-t border-foreground/10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
      <div className="lg:col-span-6">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
          <ProductStatus status={product.status} />
          <span className="font-mono text-sm">{product.category}</span>
        </div>
        <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-tight">
          <Link href={`/products/${product.slug}`} className="underline-offset-[0.12em] decoration-foreground/30 hover:underline">
            {product.name}
          </Link>
        </h2>
        <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted-foreground">{product.summary}</p>
      </div>

      <div className="flex flex-col justify-between gap-12 lg:col-span-5 lg:col-start-8">
        <ul className="border-t border-foreground/10">
          {product.highlights.map((item) => (
            <li key={item} className="border-b border-foreground/10 py-4 text-lg leading-relaxed">
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6">
          <p className="text-muted-foreground">
            <span className="font-mono text-sm">Ideal for</span>
            <br />
            {product.idealFor}
          </p>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Button href={`/products/${product.slug}#schedule`} withArrow>
              Schedule a meeting
            </Button>
            <Link
              href={`/products/${product.slug}`}
              className="text-sm underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Project details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
