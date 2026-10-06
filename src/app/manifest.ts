import type { MetadataRoute } from "next";
import company from "@/data/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.brandName} — AI Software Development & Product Engineering`,
    short_name: company.brandName,
    description: company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf9",
    theme_color: "#fafaf9",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
