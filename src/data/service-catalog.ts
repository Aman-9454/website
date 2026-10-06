/**
 * Canonical service list — names, slugs and order. Content for each lives in
 * src/data/service-pages/<slug>.ts. Derived from the live asauvia.com
 * offering (AI & Automation, Web & App Dev, HR & Ops Systems, Custom
 * Software, Cloud, Data, API Monitoring → Cloud & DevOps, SEO Optimization).
 */
export const serviceCatalog = [
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

export type ServiceSlug = (typeof serviceCatalog)[number]["slug"];
