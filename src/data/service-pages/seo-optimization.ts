import { serviceDetailSchema, type ServiceDetail } from "@/lib/validators";

const service: ServiceDetail = {
  slug: "seo-optimization",
  name: "SEO Optimization",
  outcome: "Make your site easy for search engines and AI answer engines to crawl, understand and cite.",
  summary:
    "We fix the technical foundations that decide whether search engines can find, render and understand your pages — crawlability, indexation, site structure, Core Web Vitals and structured data — and shape content so it can be quoted by both search results and AI answer engines.",
  answer:
    "Technical SEO is the engineering work that lets search engines crawl, render and understand a website: clean indexation, a clear site structure, fast pages and accurate structured data. Asauvia provides it for teams whose sites or web apps are hard for search engines to read. No one can guarantee rankings, so we fix what is in your control and measure the results in Search Console.",
  metaTitle: "Technical SEO Services | Asauvia",
  metaDescription:
    "Technical SEO services for websites and web apps: crawlability, indexation, Core Web Vitals, structured data and answer-first content. Talk to our team.",
  primaryKeyword: "technical SEO services",
  problems: [
    "Important pages are not indexed, or the wrong versions of them are.",
    "A JavaScript-heavy site or web app renders content search engines struggle to see.",
    "Pages are slow on mobile and fail Core Web Vitals thresholds.",
    "Search results and AI answer engines describe your company vaguely or not at all.",
  ],
  deliverables: [
    "Technical audit of crawlability, indexation and rendering",
    "Site architecture and internal linking that reflect how buyers search",
    "Core Web Vitals fixes, with performance budgets enforced in CI",
    "Structured data (JSON-LD) that matches what each page actually shows",
    "Answer-first content structure for search results and AI answer engines",
  ],
  useCases: [
    {
      title: "Fixing indexation problems",
      description:
        "Finding why pages are excluded or duplicated, then correcting canonicals, sitemaps, robots rules and redirects.",
    },
    {
      title: "SEO for JavaScript sites and web apps",
      description:
        "Making sure content in React or Next.js applications is rendered and visible to crawlers, using server rendering where it matters.",
    },
    {
      title: "Improving Core Web Vitals",
      description:
        "Reducing load time, layout shift and input delay on the templates that carry the most traffic, and keeping them fast with CI budgets.",
    },
    {
      title: "Structured data and entity clarity",
      description:
        "Describing your organization, services and pages in JSON-LD so search engines and AI systems can tell clearly who you are and what you offer.",
    },
    {
      title: "Site migrations and redesigns",
      description:
        "Planning URL mapping and redirects before launch so a new site does not lose the search visibility the old one had.",
    },
  ],
  stack: ["Google Search Console", "Lighthouse", "PageSpeed Insights", "Schema.org JSON-LD", "Next.js", "XML sitemaps & robots.txt"],
  faqs: [
    {
      question: "Can you guarantee first-page rankings?",
      answer:
        "No, and no one honestly can. Rankings depend on search engine algorithms, competition and many factors outside any agency's control. We fix the technical and structural issues that are in your control and report what changes in Search Console.",
    },
    {
      question: "What is the difference between technical SEO and content SEO?",
      answer:
        "Technical SEO makes sure search engines can crawl, render and understand your pages. Content SEO is about what those pages say and which searches they answer. Our focus is the technical side, plus structuring content so it is clear and quotable.",
    },
    {
      question: "What does optimizing for AI answer engines involve?",
      answer:
        "Mostly the same foundations as good SEO: pages that answer a question directly near the top, clear headings, accurate structured data, and consistent facts about your company across the site. That makes your content easier for AI systems to understand and cite.",
    },
    {
      question: "How do you measure results?",
      answer:
        "We use Google Search Console for indexation, impressions, clicks and queries, and Core Web Vitals data for performance. We record a baseline before changes so you can see what moved afterwards.",
    },
    {
      question: "Can you work on a site we built elsewhere?",
      answer:
        "Yes. We start with an audit of the existing site, then either make the fixes in your codebase or hand your team a prioritized list with the reasoning behind each item.",
    },
  ],
  related: ["web-mobile-applications", "product-engineering", "cloud-devops"],
};

export default serviceDetailSchema.parse(service);
