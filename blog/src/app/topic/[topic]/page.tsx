import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostList } from "@/components/PostList";
import { getPostsByTopic, getTopics } from "@/lib/posts";
import { site, SITE_URL } from "@/lib/site";

type PageProps = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return getTopics().map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { topic } = await params;
  const name = getTopics().find((item) => item.slug === topic)?.name;
  if (!name) return { title: "Topic not found", robots: { index: false, follow: true } };

  const description = `Articles from the Asauvia team about ${name.toLowerCase()}.`;
  return {
    title: `${name} articles`,
    description,
    alternates: { canonical: `${SITE_URL}/topic/${topic}` },
    openGraph: {
      type: "website",
      siteName: site.blogName,
      locale: "en_US",
      title: `${name} articles | ${site.blogName}`,
      description,
      url: `${SITE_URL}/topic/${topic}`,
    },
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { topic } = await params;
  const name = getTopics().find((item) => item.slug === topic)?.name;
  if (!name) notFound();

  const posts = getPostsByTopic(topic);

  return (
    <>
      <section className="relative overflow-hidden border-b border-foreground/10 pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-10 font-mono text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">Blog</Link>
              </li>
              <li aria-hidden="true" className="text-foreground/30">/</li>
              <li>
                <Link href="/posts" className="transition-colors hover:text-foreground">All posts</Link>
              </li>
              <li aria-hidden="true" className="text-foreground/30">/</li>
              <li aria-current="page" className="text-foreground">{name}</li>
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] tracking-tight">{name}</h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {posts.length === 1 ? "One article" : `${posts.length} articles`} on {name.toLowerCase()}, newest first.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <PostList posts={posts} />
        </div>
      </section>
    </>
  );
}
