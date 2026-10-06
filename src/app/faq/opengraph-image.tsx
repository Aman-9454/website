import company from "@/data/company";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${company.brandName} frequently asked questions`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "FAQ",
    title: "Questions buyers ask before they hire us.",
    subtitle: "Engagement models, cost drivers, time zones, security and IP ownership.",
  });
}
