import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = "Asauvia Blog";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Asauvia Blog",
    title: "Notes on building software, for growing companies.",
    subtitle: site.description,
  });
}
