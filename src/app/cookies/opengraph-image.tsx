import company from "@/data/company";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `Cookie policy, ${company.brandName}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: company.brandName,
    title: "Cookie policy",
    subtitle: "No analytics or advertising cookies on asauvia.com. The blog asks first.",
  });
}
