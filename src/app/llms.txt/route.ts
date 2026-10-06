import company from "@/data/company";
import services from "@/data/services";
import { SITE_URL, ALTERNATE_NAMES } from "@/lib/schema";

export const dynamic = "force-static";


export async function GET() {
  const lines = [
    `# ${company.brandName}`,
    "",
    `> ${company.description}`,
    "",
    "## About",
    "",
    `- Name: ${company.brandName} (also written ${ALTERNATE_NAMES.join(", ")})`,
    `- Website: ${SITE_URL}`,
    "- Type: service-based software development and product engineering company (builds software for clients; sells no products of its own)",
    `- Headquarters: ${company.hqRegion}, ${company.hqCountry}`,
    "- Working hours: India Standard Time (IST), working with international clients across time zones",
    `- Contact: ${company.email} or ${SITE_URL}/contact`,
    ...company.sameAs.map((url) => `- LinkedIn: ${url}`),
    "",
    "## Services",
    "",
    ...services.map((s) => `- [${s.name}](${SITE_URL}/services/${s.slug}): ${s.outcome}`),
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): overview of Asauvia, its services, process and principles`,
    `- [Services](${SITE_URL}/services): all services in one place`,
    `- [How we work](${SITE_URL}/how-we-work): process, engagement models, working across time zones`,
    `- [Security](${SITE_URL}/security): confidentiality, access, IP and secure delivery practices`,
    `- [About](${SITE_URL}/about): who Asauvia is and how it operates`,
    `- [FAQ](${SITE_URL}/faq): answers on engagements, cost, time zones, IP, AI projects and services`,
    `- [Contact](${SITE_URL}/contact): start a project or ask a question`,
    "",
    "## Optional",
    "",
    `- [Full site content](${SITE_URL}/llms-full.txt): every service, FAQ, process stage and principle in one markdown file`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
