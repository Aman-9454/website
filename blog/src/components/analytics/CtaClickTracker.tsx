"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * One delegated listener for every element marked data-cta. Server components only need the attributes:
 * data-cta="<id>" and data-cta-location="<where it sits>".
 */
export function CtaClickTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const element = target?.closest?.<HTMLElement>("[data-cta]");
      if (!element) return;

      // Article pages are /<slug>; the index and other pages have no post slug.
      const parts = window.location.pathname.split("/").filter(Boolean);
      const postSlug = parts.length === 1 ? parts[0] : "";

      track("project_cta_click", {
        cta_id: element.dataset.cta ?? "",
        cta_location: element.dataset.ctaLocation ?? "",
        destination: element.getAttribute("href") ?? "",
        post_slug: postSlug,
        ads_enabled: false,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
