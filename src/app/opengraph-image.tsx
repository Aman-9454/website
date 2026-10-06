import company from "@/data/company";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${company.brandName} — AI-driven software development & product engineering`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "AI software development & product engineering",
    title: "Build smarter systems. Ship what matters.",
    subtitle: "AI-driven software development & product engineering, startup to enterprise.",
  });
}
