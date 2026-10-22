import Link from "next/link";
import { ProductStatus } from "@/components/products/ProductStatus";
import type { Product } from "@/lib/products";

/**
 * One line of the homepage project index. The name is the whole link (stretched over the row),
 * so the full row is clickable without nesting interactive elements.
 */
export function ProjectRow({ product }: { product: Product }) {
  return (
    <li className="group relative grid gap-6 border-t border-background/15 py-10 transition-colors duration-300 last:border-b hover:bg-background/[0.03] lg:grid-cols-12 lg:py-14">
      <h3 className="font-display text-[clamp(2.75rem,6.5vw,6rem)] leading-[0.92] tracking-tight lg:col-span-7">
        <Link
          href={`/products/${product.slug}`}
          className="after:absolute after:inset-0 underline-offset-[0.12em] decoration-background/40 group-hover:underline focus-visible:outline-none focus-visible:underline"
        >
          {product.name}
        </Link>
      </h3>

      <div className="flex flex-col gap-4 text-background/70 lg:col-span-5 lg:col-start-8 lg:pt-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-background">
          <ProductStatus status={product.status} />
          <span className="font-mono text-sm text-background/60">{product.category}</span>
        </div>
        <p className="text-lg leading-relaxed">{product.summary}</p>
      </div>
    </li>
  );
}
