import { notFound } from "next/navigation";
import company from "@/data/company";
import { getService } from "@/data/services";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  return [
    {
      id: "card",
      alt: service ? `${service.name} by ${company.brandName}: ${service.outcome}` : `${company.brandName} services`,
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return renderOgImage({
    eyebrow: `${company.brandName} services`,
    title: service.name,
    subtitle: service.outcome,
  });
}
