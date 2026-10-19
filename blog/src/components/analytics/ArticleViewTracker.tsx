"use client";

import { useEffect, useRef } from "react";
import { useConsent } from "@/components/consent/ConsentProvider";
import { track } from "@/lib/analytics";

/** Sends one blog_article_view per article, once analytics consent is granted. */
export function ArticleViewTracker({ slug, tag }: { slug: string; tag: string }) {
  const { consent } = useConsent();
  const sent = useRef(false);

  useEffect(() => {
    if (!consent?.analytics || sent.current) return;
    sent.current = true;
    track("blog_article_view", { post_slug: slug, post_tag: tag, ads_enabled: false });
  }, [consent?.analytics, slug, tag]);

  return null;
}
