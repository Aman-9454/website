import { getAllPosts, getPost } from "@/lib/posts";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Asauvia Blog post";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage({
    eyebrow: `${site.blogName} · ${post?.tag ?? ""}`,
    title: post?.title ?? site.blogName,
    subtitle: post?.description ?? site.description,
  });
}
