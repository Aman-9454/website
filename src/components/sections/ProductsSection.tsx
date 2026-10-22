import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectRow } from "@/components/products/ProjectRow";
import { getAllProducts } from "@/lib/products";

/**
 * Homepage project index. Shows Asauvia's own projects on the inverted band. Custom builds are client work,
 * so they get a single line underneath rather than a place in the list.
 */
export function ProductsSection() {
  const products = getAllProducts();
  const own = products.filter((product) => product.status !== "Custom build");
  const custom = products.find((product) => product.status === "Custom build");

  return (
    <section id="products" className="relative overflow-hidden bg-foreground py-24 text-background lg:py-32">
      <Container>
        <SectionHeading
          inverted
          label="Our products"
          title="Completed projects,"
          titleMuted="priced on a short call."
          description="Products Asauvia has built and taken to completion. Open one for its details, or request a meeting for pricing."
        />

        <ul className="mt-16 lg:mt-24">
          {own.map((product) => (
            <ProjectRow key={product.slug} product={product} />
          ))}
        </ul>

        {custom ? (
          <p className="mt-12 flex flex-col gap-3 text-lg text-background/70 sm:flex-row sm:items-baseline sm:justify-between">
            <span>Have a product in mind? We build custom projects to order.</span>
            <Link
              href={`/products/${custom.slug}`}
              className="text-background underline underline-offset-4 hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-background"
            >
              How custom projects work
            </Link>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
