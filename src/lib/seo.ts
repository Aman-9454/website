import type { Metadata } from "next";
import company from "@/data/company";

/**
 * Complete per-page metadata. Next.js merges metadata shallowly, so a page that
 * sets only part of openGraph/twitter silently loses the rest (and an inner page
 * that sets none inherits the homepage's og:url/title). Every page uses this.
 * og:image comes from each route's opengraph-image file, so it isn't set here.
 */
export function pageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
}: {
  path: string;
  /** Without the brand suffix — the layout template appends " | Asauvia" — unless absoluteTitle. */
  title: string;
  description: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${company.brandName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: company.brandName,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
