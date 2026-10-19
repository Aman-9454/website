import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdPreview } from "@/components/ads/AdPreview";
import { BlockRenderer } from "@/components/BlockRenderer";
import { getPost } from "@/lib/posts";

// Local preview only: never served in production, and never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

/** First place with two paragraphs in a row, after the opening section. Mirrors the rule the real ad will use. */
function previewIndex(blocks: { type: string }[]) {
  for (let i = 2; i < blocks.length - 1; i++) {
    if (blocks[i].type === "p" && blocks[i + 1].type === "p") return i;
  }
  return -1;
}

export default function PreviewAdsPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const post = getPost("unbilled-microsoft-365-licenses-msp");
  if (!post) notFound();

  const at = previewIndex(post.body);

  return (
    <section className="pt-40 pb-24">
      <div className="mx-auto max-w-[52rem] px-6 lg:px-12">
        <p className="mb-6 border border-foreground/20 bg-foreground/[0.04] p-4 font-mono text-sm text-muted-foreground">
          Local preview only. The box marked Advertisement is a placeholder for the real ad. It is not an ad.
        </p>
        <h1 className="mb-10 font-display text-5xl leading-[1] tracking-tight">{post.title}</h1>
        <BlockRenderer blocks={post.body.slice(0, at + 1)} />
        <AdPreview />
        <BlockRenderer blocks={post.body.slice(at + 1)} />
      </div>
    </section>
  );
}
