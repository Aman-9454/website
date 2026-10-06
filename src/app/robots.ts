import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";

const DISALLOW = ["/styleguide", "/api/"];

// Owner decision: be visible in search and AI answers, so search, AI-search and
// AI-training crawlers are all allowed. A named group replaces "*" for that bot,
// so each one repeats the disallow list.
const NAMED_CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot",
  "DuckDuckBot",
  "YandexBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      ...NAMED_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/", disallow: DISALLOW })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
