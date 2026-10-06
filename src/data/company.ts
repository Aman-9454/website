import { companySchema, type Company } from "@/lib/validators";

/**
 * Contact email, HQ region and LinkedIn are as published on the live
 * asauvia.com. Claims made there but not yet verified (SOC2 Type II,
 * "100% reliability", latency figures) are deliberately not carried over —
 * see docs/CONTENT_GAPS.md.
 */
const company: Company = {
  legalName: "Asauvia",
  brandName: "Asauvia",
  domain: "asauvia.com",
  description:
    "Asauvia is a software development and product engineering company based in Uttar Pradesh, India, building AI applications, workflow automation, custom software, web and mobile apps, and cloud and data systems for startups and enterprises worldwide.",
  hqRegion: "Uttar Pradesh",
  hqCountry: "India",
  email: "info@asauvia.com",
  markets: [
    { name: "United States", justified: false },
    { name: "United Kingdom", justified: false },
    { name: "Canada", justified: false },
    { name: "Australia", justified: false },
    { name: "Europe", justified: false },
    { name: "Singapore", justified: false },
  ],
  sameAs: ["https://www.linkedin.com/company/asauvia/"],
};

export default companySchema.parse(company);
