import company from "@/data/company";
import services from "@/data/services";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${company.brandName} software development services: AI, automation, custom software, product engineering and more`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Services",
    title: "Software, AI and automation, built end to end.",
    subtitle: `${services.length} engineering services, each owned from scoping to launch and beyond.`,
  });
}
