import company from "@/data/company";
import { getAllProducts } from "@/lib/products";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = `${company.brandName} products: software built by the Asauvia team`;
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Products",
    title: "Products we build.",
    subtitle: `${getAllProducts().length} products, with pricing shared on a short meeting.`,
  });
}
