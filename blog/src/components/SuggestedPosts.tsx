import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type Post } from "@/lib/posts";

/** Suggested reading from Asauvia's own posts only. Each card shows the same details the index does. */
export function SuggestedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="suggested-heading" className="border-t border-foreground/10 py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="mb-14 flex items-baseline justify-between gap-6">
          <h2 id="suggested-heading" className="font-display text-3xl tracking-tight lg:text-4xl">
            Keep reading
          </h2>
          <Link href="/" className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground">
            All posts
          </Link>
        </div>

        <ul className="grid border-l border-t border-foreground/10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} className="group relative border-b border-r border-foreground/10 bg-background">
              <div className="flex h-full flex-col gap-5 p-8 lg:p-10">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true" className="text-foreground/30">/</span>
                  <span>{post.tag}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight tracking-tight">
                  {/* Stretched link: the whole card is clickable. */}
                  <Link href={`/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                  </Link>
                </h3>
                <p className="leading-relaxed text-muted-foreground">{post.description}</p>
                <div className="mt-auto flex items-center justify-between pt-2 font-mono text-xs text-muted-foreground">
                  <span>{post.readMinutes} min read</span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
