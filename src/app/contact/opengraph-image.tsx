import company from "@/data/company";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `Contact ${company.brandName}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Start with a short scoping call.",
    subtitle: `Tell us what you're building, improving or automating. ${company.email}`,
  });
}
