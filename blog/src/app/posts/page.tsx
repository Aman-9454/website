import type { Metadata } from "next";
import Link from "next/link";
import { TopicChips } from "@/components/TopicChips";
import { PostSearch } from "@/components/search/PostSearch";
import { getAllPosts, getSearchItems, getTopics } from "@/lib/posts";
import { site, SITE_URL } from "@/lib/site";

const description = "Every article from the Asauvia team on AI automation, custom software, billing, recruiting and working with a software partner.";

export const metadata: Metadata = {
  title: "All posts",
  description,
  alternates: {
    canonical: `${SITE_URL}/posts`,
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.blogName,
    locale: "en_US",
    title: `All posts | ${site.blogName}`,
    description,
    url: `${SITE_URL}/posts`,
  },
};

export default function AllPostsPage() {
  const posts = getAllPosts();
  const topics = getTopics();
  const items = getSearchItems();

  return (
    <>
      <section className="relative overflow-hidden border-b border-foreground/10 pt-32 pb-16 lg:pt-44 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <nav aria-label="Breadcrumb" className="mb-10 font-mono text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="text-foreground/30">
                /
              </li>
              <li aria-current="page" className="text-foreground">
                All posts
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[0.95] tracking-tight">All posts</h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {posts.length === 0 ? (
            <p className="border-t border-foreground/10 pt-10 text-lg text-muted-foreground">No posts yet. Check back soon.</p>
          ) : (
            <>
              <TopicChips topics={topics} />
              <PostSearch items={items} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
