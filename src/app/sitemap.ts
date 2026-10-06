import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";
import services from "@/data/services";

// Only routes that actually resolve. /styleguide is excluded (noindex).
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-we-work", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/security", priority: 0.6, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Evaluated once at build time; the site is statically generated, so this marks the deploy date.
  const lastModified = new Date();
  return [
    ...STATIC_ROUTES.map((r) => ({
      url: r.path === "/" ? SITE_URL : `${SITE_URL}${r.path}`,
      lastModified,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
