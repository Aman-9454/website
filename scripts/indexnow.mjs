// Submits every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver, and others).
// Usage: npm run indexnow   |   SITE_URL=https://asauvia.com INDEXNOW_KEY=... DRY_RUN=1 npm run indexnow

const DEFAULT_KEY = "37bdb39371084661d6278813db9ceef4";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const siteUrl = (process.env.SITE_URL || "https://asauvia.com").replace(/\/+$/, "");
const key = process.env.INDEXNOW_KEY || DEFAULT_KEY;
const dryRun = process.env.DRY_RUN === "1" || process.env.DRY_RUN === "true";

async function main() {
  const sitemapUrl = `${siteUrl}/sitemap.xml`;
  const res = await fetch(sitemapUrl);
  if (!res.ok) throw new Error(`Failed to fetch ${sitemapUrl}: HTTP ${res.status}`);
  const xml = await res.text();

  const urlList = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
  if (urlList.length === 0) throw new Error(`No <loc> entries found in ${sitemapUrl}`);

  // IndexNow requires every URL to belong to `host`, so derive it from the sitemap URLs, not SITE_URL.
  const host = new URL(urlList[0]).host;
  const payload = {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList,
  };

  if (dryRun) {
    console.log(`[dry run] ${urlList.length} URLs from ${sitemapUrl}; would POST to ${ENDPOINT}:`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  const submit = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  console.log(`IndexNow responded HTTP ${submit.status} for ${urlList.length} URLs`);
  if (submit.status !== 200 && submit.status !== 202) {
    const body = await submit.text().catch(() => "");
    if (body) console.error(body);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
