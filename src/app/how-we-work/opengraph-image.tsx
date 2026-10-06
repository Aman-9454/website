import company from "@/data/company";
import steps from "@/data/process";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `How ${company.brandName} works: delivery stages and engagement models`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "How we work",
    title: "From first message to shipped and improving.",
    subtitle: steps.map((step) => step.title).join(" · "),
  });
}
