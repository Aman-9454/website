import company from "@/data/company";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `Privacy policy, ${company.brandName}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: company.brandName,
    title: "Privacy policy",
    subtitle: "How Asauvia handles personal data sent through asauvia.com.",
  });
}
