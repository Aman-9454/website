import { getAllPosts } from "@/lib/posts";
import { site, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const lines = [
    `# ${site.blogName}`,
    "",
    `> ${site.description}`,
    "",
    "## About",
    "",
    `- Publisher: ${site.brandName}, a software development and product engineering company (${site.mainUrl})`,
    `- Blog: ${SITE_URL}`,
    `- Covers: AI automation, custom software, product engineering and how to work with a software partner`,
    `- Contact: ${site.email} or ${site.contactUrl}`,
    "",
    "## Posts",
    "",
    ...getAllPosts().map(
      (post) => `- [${post.title}](${SITE_URL}/${post.slug}): ${post.summary} Markdown: ${SITE_URL}/${post.slug}/md`,
    ),
    "",
    "## Optional",
    "",
    `- [Full blog content](${SITE_URL}/llms-full.txt): every post in one markdown file`,
    `- [RSS feed](${SITE_URL}/feed.xml): new posts as they are published`,
    `- [Sitemap](${SITE_URL}/sitemap.xml): every page on the blog, with last-modified dates`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
