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
    "Asauvia transforms operational chaos into clarity through AI-powered software solutions. We help growing companies and startups reduce complexity, accelerate digital transformation, and scale operations with custom software, AI automation, and digital products.",
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
