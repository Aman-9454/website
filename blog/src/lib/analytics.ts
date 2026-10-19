import { readConsent } from "./consent";

// Every event the blog sends. Add an event here first so its parameters are checked at compile time.
type EventMap = {
  blog_article_view: { post_slug: string; post_tag: string; ads_enabled: boolean };
  project_cta_click: {
    cta_id: string;
    cta_location: string;
    destination: string;
    post_slug: string;
    ads_enabled: boolean;
  };
};

/** Sends an event only when analytics consent is granted. Does nothing if Google's script is not loaded. */
export function track<K extends keyof EventMap>(name: K, params: EventMap[K]) {
  const consent = readConsent();
  if (!consent?.analytics || typeof window.gtag !== "function") return;
  // "beacon" lets the click finish sending when the visitor leaves for asauvia.com.
  window.gtag("event", name, { ...params, transport_type: "beacon" });
}
