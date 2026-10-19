import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ArticleViewTracker } from "@/components/analytics/ArticleViewTracker";
import { PostPager } from "@/components/PostPager";
import { ReadingProgress } from "@/components/ReadingProgress";
import { BlockRenderer } from "@/components/BlockRenderer";
import { GlyphSphere } from "@/components/canvas/GlyphSphere";
import { GlyphTetrahedron } from "@/components/canvas/GlyphTetrahedron";
import { FAQSection } from "@/components/faq/FAQSection";
import { GridLines } from "@/components/GridLines";
import { JsonLd } from "@/components/JsonLd";
import { RelatedService } from "@/components/RelatedService";
import { ShareBar } from "@/components/ShareBar";
import { SuggestedPosts } from "@/components/SuggestedPosts";
import { TableOfContents } from "@/components/TableOfContents";
import { faqPageSchema } from "@/lib/faq";
import { formatDate, getAdjacentPosts, getAllPosts, getPost, getSuggestedPosts, lastModified } from "@/lib/posts";
import { site, SITE_URL } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found", robots: { index: false, follow: true } };

  const url = `${SITE_URL}/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.hashtags.map((tag) => tag.slice(1)),
    // Next.js replaces the whole openGraph object per page, so the site-wide fields are repeated here.
    alternates: {
      canonical: url,
      types: {
        "text/markdown": `/${post.slug}/md`,
        "application/rss+xml": "/feed.xml",
      },
    },
    openGraph: {
      type: "article",
      siteName: site.blogName,
      locale: "en_US",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      modifiedTime: lastModified(post),
      authors: [site.mainUrl],
      section: post.tag,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/${post.slug}`;
  const publisher = { "@type": "Organization", name: site.brandName, url: site.mainUrl };

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#post`,
          headline: post.title,
          description: post.description,
          abstract: post.summary,
          articleSection: post.tag,
          keywords: post.hashtags.map((tag) => tag.slice(1)),
          datePublished: post.date,
          dateModified: lastModified(post),
          url,
          mainEntityOfPage: url,
          inLanguage: "en",
          author: publisher,
          publisher,
          isPartOf: { "@type": "Blog", name: site.blogName, url: SITE_URL },
          ...(post.sources?.length ? { citation: post.sources.map((source) => source.url) } : {}),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Blog", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: post.title, item: url },
          ],
        }}
      />
      {post.faqs?.length ? <JsonLd data={faqPageSchema(post.faqs)} /> : null}

      <ReadingProgress />
      <ArticleViewTracker slug={post.slug} tag={post.tag} />

      <section className="relative overflow-hidden border-b border-foreground/10 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <GridLines />
        <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[640px] w-[640px] -translate-y-1/2 opacity-30 lg:block" aria-hidden="true">
          <GlyphSphere className="h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto max-w-[52rem] px-6 lg:px-12">
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
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="animate-fade-up mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-sm text-muted-foreground">
            <span className="h-px w-8 bg-foreground/30" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated ? (
              <>
                <span aria-hidden="true" className="text-foreground/30">/</span>
                <span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              </>
            ) : null}
            <span aria-hidden="true" className="text-foreground/30">/</span>
            <span>{post.readMinutes} min read</span>
          </div>

          <h1 className="animate-fade-up font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-tight [animation-delay:100ms]">
            {post.title}
          </h1>
          {/* The summary is the direct answer to the post's question, so it leads the page. */}
          <p className="animate-fade-up mt-10 text-xl leading-relaxed text-muted-foreground [animation-delay:200ms] lg:text-2xl">
            {post.summary}
          </p>
        </div>
      </section>

      <article className="py-20 lg:py-28">
        <div className="mx-auto max-w-[52rem] px-6 lg:px-12">
          {post.keyTakeaways?.length ? (
            <div className="mb-16 border-t border-foreground pt-8">
              <h2 className="mb-6 font-mono text-sm text-muted-foreground">Key takeaways</h2>
              <ul className="space-y-4 text-lg leading-relaxed text-foreground">
                {post.keyTakeaways.map((item) => (
                  <li key={item} className="flex gap-4">
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <TableOfContents headings={post.body.flatMap((block) => (block.type === "h2" ? [block.text] : []))} />

          <BlockRenderer blocks={post.body} />


          {post.relatedService ? <RelatedService slug={post.relatedService} /> : null}

          <div className="mt-20 flex flex-col gap-10 border-t border-foreground/10 pt-12">
            <ul className="flex flex-wrap gap-2" aria-label="Topics">
              {post.hashtags.map((tag) => (
                <li key={tag} className="rounded-full bg-foreground/[0.06] px-4 py-1.5 font-mono text-sm text-foreground">
                  {tag}
                </li>
              ))}
            </ul>
            <ShareBar url={`${SITE_URL}/${post.slug}`} title={post.title} hashtags={post.hashtags} />
          </div>

          {post.sources?.length ? (
            <section aria-labelledby="sources-heading" className="mt-20 border-t border-foreground/10 pt-12">
              <h2 id="sources-heading" className="mb-6 font-mono text-sm text-muted-foreground">
                Sources
              </h2>
              <ol className="list-decimal space-y-3 pl-6 text-base leading-relaxed text-muted-foreground marker:text-foreground/40">
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-4 transition-colors hover:no-underline"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <PostPager {...getAdjacentPosts(post.slug)} />

          <div className="mt-20 flex flex-col gap-6 border-t border-foreground/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/posts" className="group inline-flex items-center gap-2 text-foreground">
              <ArrowRight aria-hidden="true" className="h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
              All posts
            </Link>
            <a href={site.contactUrl} data-cta="talk-to-expert" data-cta-location="article-end" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Have a project in mind? Talk to an expert
            </a>
          </div>
        </div>
      </article>

      {post.faqs?.length ? <FAQSection faqs={post.faqs} /> : null}

      <SuggestedPosts posts={getSuggestedPosts(post.slug)} />

      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="relative border border-foreground">
            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24">
              <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
                <div className="flex-1">
                  <h2 className="mb-8 font-display text-4xl leading-[0.95] tracking-tight lg:text-7xl">
                    Let&apos;s solve
                    <br />
                    something together.
                  </h2>
                  <p className="mb-12 max-w-xl text-xl leading-relaxed text-muted-foreground">
                    Tell us what you&apos;re building, improving, or automating. We&apos;ll come back with a plan, not a
                    pitch.
                  </p>
                  <div className="flex flex-col items-start gap-4 sm:flex-row">
                    <a
                      href={site.contactUrl} data-cta="talk-to-expert" data-cta-location="post-cta"
                      className="group inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                    >
                      Talk to an expert
                      <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                    <a
                      href={`${site.mainUrl}/services`} data-cta="explore-services" data-cta-location="post-cta"
                      className="inline-flex h-14 items-center justify-center whitespace-nowrap rounded-full border border-foreground/20 px-8 text-base font-medium text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                    >
                      Explore services
                    </a>
                  </div>
                  <p className="mt-8 font-mono text-sm text-muted-foreground">NDA before any scoping conversation</p>
                </div>
                <div className="-mr-16 hidden h-[500px] w-[500px] items-center justify-center lg:flex" aria-hidden="true">
                  <GlyphTetrahedron className="h-full w-full" />
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 h-32 w-32 border-b border-l border-foreground/10" />
            <div className="absolute bottom-0 left-0 h-32 w-32 border-r border-t border-foreground/10" />
          </div>
        </div>
      </section>
    </>
  );
}
