import { postToMarkdown } from "@/lib/markdown";
import { getAllPosts } from "@/lib/posts";
import { site, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const header = [`# ${site.blogName}`, "", `> ${site.description}`, "", `Source: ${SITE_URL}`, ""].join("\n");

  const posts = getAllPosts().map((post) => postToMarkdown(post));

  return new Response([header, ...posts].join("\n---\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
