import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { MeetingRequestForm } from "@/components/forms/MeetingRequestForm";
import { pageMetadata } from "@/lib/seo";
import { pageGraph, type Crumb } from "@/lib/schema";
import { getAllProducts, getProduct } from "@/lib/products";
import company from "@/data/company";
import { websiteMailto } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    path: `/products/${product.slug}`,
    title: `${product.name}: ${product.category}`,
    description: product.metaDescription,
    absoluteTitle: true,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const path = `/products/${product.slug}`;
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.name, path },
  ];

  const keyFacts = [
    { term: "Status", detail: product.status },
    { term: "Category", detail: product.category },
    { term: "Ideal for", detail: product.idealFor },
    { term: "Pricing", detail: "Shared on a call with our sales team" },
  ];

  return (
    <>
      <JsonLd
        data={pageGraph({
          path,
          name: `${product.name}: ${product.category} | ${company.brandName}`,
          description: product.metaDescription,
          crumbs,
        })}
      />

      <PageHero
        crumbs={crumbs}
        label="Product"
        title={product.name}
        titleMuted={product.category.toLowerCase()}
        description={product.summary}
      >
        <Button href="#schedule" withArrow>
          Schedule a meeting
        </Button>
        <Button href="/products" variant="secondary">
          All products
        </Button>
      </PageHero>

      <section className="relative py-16 lg:py-20">
        <Container>
          <dl className="grid border-l border-t border-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {keyFacts.map((fact, i) => (
              <Reveal key={fact.term} delay={i * 80} className="border-b border-r border-foreground/10 p-6 lg:p-8">
                <dt className="mb-3 font-mono text-xs text-muted-foreground">{fact.term}</dt>
                <dd className="leading-relaxed">{fact.detail}</dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      <section className="relative border-t border-foreground/10 py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <SectionHeading label="What it does" title={`${product.name}`} titleMuted="in brief." />
            <ul className="border-t border-foreground/10">
              {product.highlights.map((item, i) => (
                <li key={item} className="border-b border-foreground/10">
                  <Reveal delay={i * 80} className="flex gap-4 py-6 text-lg leading-relaxed text-muted-foreground">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
                    {item}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="schedule" className="relative scroll-mt-24 border-t border-foreground/10 bg-foreground/[0.02] py-24 lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
            <div className="flex flex-col gap-10">
              <SectionHeading
                label="Pricing and details"
                title="Schedule a meeting"
                titleMuted={`for ${product.name}.`}
                description="Tell us a time that suits you and we will confirm a meeting with our sales team. Pricing and the details that affect it are shared on that call."
              />
              <dl className="border-t border-foreground/10">
                <div className="border-b border-foreground/10 py-5">
                  <dt className="mb-2 font-mono text-sm text-muted-foreground">Sales email</dt>
                  <dd>
                    <a href={websiteMailto(company.salesEmail)} className="text-xl underline-offset-4 hover:underline">
                      {company.salesEmail}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-foreground/10 py-5">
                  <dt className="mb-2 font-mono text-sm text-muted-foreground">Working hours</dt>
                  <dd className="leading-relaxed">India Standard Time, with meeting slots across time zones on request.</dd>
                </div>
              </dl>
            </div>

            <MeetingRequestForm
              products={getAllProducts().map(({ slug, name }) => ({ slug, name }))}
              defaultProduct={product.slug}
              salesEmail={company.salesEmail}
            />
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
