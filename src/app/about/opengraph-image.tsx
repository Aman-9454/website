import company from "@/data/company";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `About ${company.brandName}: an AI software development and product engineering company based in ${company.hqCountry}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: `About ${company.brandName}`,
    title: "A software engineering company, working across time zones.",
    subtitle: `AI software and product engineering, based in ${company.hqRegion}, ${company.hqCountry}.`,
  });
}
