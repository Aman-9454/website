import { notFound } from "next/navigation";
import { postToMarkdown } from "@/lib/markdown";
import { getAllPosts, getPost } from "@/lib/posts";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

/** The same post as clean markdown, for LLMs and tools that prefer text over HTML. */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return new Response(postToMarkdown(post), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
