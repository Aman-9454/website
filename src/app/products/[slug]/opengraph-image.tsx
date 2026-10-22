import { notFound } from "next/navigation";
import company from "@/data/company";
import { getProduct } from "@/lib/products";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return [
    {
      id: "card",
      alt: product ? `${product.name} by ${company.brandName}: ${product.category}` : `${company.brandName} products`,
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return renderOgImage({
    eyebrow: `${company.brandName} products`,
    title: product.name,
    subtitle: product.category,
  });
}
