import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts, RECENT_POST_COUNT } from "@/lib/posts";
import { homeTitle, site, SITE_URL } from "@/lib/site";
import { GlyphSphere } from "@/components/canvas/GlyphSphere";
import { GridLines } from "@/components/GridLines";
import { JsonLd } from "@/components/JsonLd";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.description,
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": "/feed.xml" },
  },
  openGraph: {
    type: "website",
    siteName: site.blogName,
    locale: "en_US",
    title: homeTitle,
    description: site.description,
    url: SITE_URL,
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const recent = posts.slice(0, RECENT_POST_COUNT);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: site.blogName,
          url: SITE_URL,
          description: site.description,
          publisher: { "@type": "Organization", name: site.brandName, url: site.mainUrl },
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: `${SITE_URL}/${post.slug}`,
            datePublished: post.date,
          })),
        }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          name: site.blogName,
          url: SITE_URL,
          description: site.description,
          inLanguage: "en",
          publisher: { "@type": "Organization", name: site.brandName, url: site.mainUrl },
        }}
      />

      <section className="relative overflow-hidden border-b border-foreground/10 pt-32 pb-20 lg:pt-44 lg:pb-28">
        <GridLines />
        <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[640px] w-[640px] -translate-y-1/2 opacity-30 lg:block" aria-hidden="true">
          <GlyphSphere className="h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
          <span className="animate-fade-up mb-8 inline-flex items-center gap-3 font-mono text-sm text-muted-foreground">
            <span className="h-px w-8 bg-foreground/30" />
            Blog
          </span>
          <h1 className="animate-fade-up max-w-5xl font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-tight [animation-delay:100ms]">
            Notes on building software,
            <br />
            <span className="text-muted-foreground">for growing companies.</span>
          </h1>
          <p className="animate-fade-up mt-10 max-w-2xl text-xl leading-relaxed text-muted-foreground [animation-delay:200ms] lg:text-2xl">
            Practical writing from the Asauvia team on AI automation, custom software and how to work well with a
            delivery partner.
          </p>
        </div>
      </section>

      <section aria-labelledby="latest-heading" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-16 flex items-baseline justify-between gap-6 lg:mb-24">
            <h2 id="latest-heading" className="font-display text-4xl tracking-tight lg:text-5xl">
              Latest posts
            </h2>
            <span className="font-mono text-sm text-muted-foreground">
              {String(posts.length).padStart(2, "0")} {posts.length === 1 ? "post" : "posts"} in total
            </span>
          </div>

          {recent.length === 0 ? (
            <p className="border-t border-foreground/10 pt-10 text-lg text-muted-foreground">No posts yet. Check back soon.</p>
          ) : (
            <PostList posts={recent} />
          )}

          {posts.length > 0 ? (
            <div className="mt-16 flex justify-start lg:mt-20">
              <Link
                href="/posts"
                className="group inline-flex h-14 items-center justify-center rounded-full border border-foreground/20 px-8 text-base font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                See all posts
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
