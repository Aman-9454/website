import company from "@/data/company";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${company.brandName} security practices for client systems, data and IP`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Security",
    title: "Your systems, data and IP, handled with care.",
    subtitle: "The practices we follow from the first scoping call through launch.",
  });
}
