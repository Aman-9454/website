import company from "@/data/company";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `Terms of use, ${company.brandName}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: company.brandName,
    title: "Terms of use",
    subtitle: "The terms for using asauvia.com.",
  });
}
