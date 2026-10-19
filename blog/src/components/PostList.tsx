import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, topicName, topicSlug, type Post } from "@/lib/posts";

/** Numbered list of posts, newest first. Used on the home page (recent posts) and the full archive. */
export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ol className="border-t border-foreground/10">
      {posts.map((post, index) => (
        <li key={post.slug} className="group relative border-b border-foreground/10">
          <div className="flex flex-col gap-6 py-10 lg:flex-row lg:items-start lg:gap-16 lg:py-14">
            <span className="shrink-0 font-mono text-sm text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>

            <div className="grid flex-1 gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true" className="text-foreground/30">/</span>
                  <Link href={`/topic/${topicSlug(topicName(post))}`} className="relative z-10 transition-colors hover:text-foreground">
                    {post.tag}
                  </Link>
                </div>
                <h3 className="mb-3 font-display text-3xl leading-tight tracking-tight lg:text-4xl">
                  {/* Stretched link: the overlay covers the whole row so the full row is clickable. */}
                  <Link href={`/${post.slug}`} className="after:absolute after:inset-0">
                    <span className="block transition-transform duration-500 group-hover:translate-x-2">{post.title}</span>
                  </Link>
                </h3>
              </div>

              <div className="flex items-start justify-between gap-8">
                <div>
                  <p className="leading-relaxed text-muted-foreground">{post.description}</p>
                  <p className="mt-4 font-mono text-xs text-muted-foreground">{post.readMinutes} min read</p>
                </div>
                <ArrowRight
                  aria-hidden="true"
                  className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
