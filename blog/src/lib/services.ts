import { MAIN_URL } from "./site";

// Copied from the main site's canonical service list (src/data/service-catalog.ts in the root app).
// If a service is added or renamed there, update it here too.
export const services = [
  { slug: "ai-software-development", name: "AI Software Development" },
  { slug: "ai-workflow-automation", name: "AI Workflow Automation" },
  { slug: "custom-software-development", name: "Custom Software Development" },
  { slug: "product-engineering", name: "Product Engineering" },
  { slug: "web-mobile-applications", name: "Web & Mobile App Development" },
  { slug: "cloud-devops", name: "Cloud & DevOps" },
  { slug: "data-integrations", name: "Data Engineering & Integration" },
  { slug: "hr-operations-systems", name: "HR & Operations Systems" },
  { slug: "seo-optimization", name: "SEO Optimization" },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];

export function isServiceSlug(value: string): value is ServiceSlug {
  return services.some((service) => service.slug === value);
}

export function serviceHref(slug: ServiceSlug) {
  return `${MAIN_URL}/services/${slug}`;
}

export function serviceName(slug: ServiceSlug) {
  return services.find((service) => service.slug === slug)?.name ?? slug;
}
