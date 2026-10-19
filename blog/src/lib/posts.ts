import { z } from "zod";
import { posts as rawPosts } from "@/content/posts";
import { isServiceSlug } from "@/lib/services";
import { headingId } from "@/lib/text";
import type { SearchItem } from "@/lib/search";

export { formatDate } from "@/lib/dates";

// Every figure carries a title, a caption, and a note saying where its numbers come from.
// Use "Source: ..." for published data. Name the example in the title, e.g. "Example: ...".
const figureBase = {
  title: z.string().min(1),
  caption: z.string().min(1),
  note: z.string().min(1),
};

const figureSchema = z.discriminatedUnion("kind", [
  z.object({
    ...figureBase,
    kind: z.literal("bars"),
    // Upper end of the scale. Use 100 for percentages so bar length matches the share it shows.
    max: z.number().positive().optional(),
    // Bars always start at zero. Values are shown as labels, so readers never have to estimate them.
    items: z
      .array(z.object({ label: z.string().min(1), value: z.number().min(0), display: z.string().min(1) }))
      .min(2)
      .max(6),
  }),
  z.object({
    ...figureBase,
    kind: z.literal("steps"),
    steps: z.array(z.string().min(1)).min(3).max(6),
  }),
  z.object({
    ...figureBase,
    kind: z.literal("timeline"),
    // Times are in hours from the start of the window. Points are placed on a shared scale.
    hours: z.number().positive(),
    points: z
      .array(z.object({ label: z.string().min(1), at: z.number().min(0) }))
      .min(2)
      .max(5),
  }),
]);

const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("p"), text: z.string().min(1) }),
  z.object({ type: z.literal("h2"), text: z.string().min(1) }),
  z.object({ type: z.literal("quote"), text: z.string().min(1) }),
  z.object({ type: z.literal("ul"), items: z.array(z.string().min(1)).min(1) }),
  z.object({ type: z.literal("figure"), figure: figureSchema }),
]);

const hashtagSchema = z
  .string()
  .regex(/^#[A-Za-z][A-Za-z0-9]*$/, "hashtags look like #Example, with no spaces");

const faqSchema = z.object({
  question: z.string().min(1).endsWith("?", "FAQ questions should end with a question mark"),
  answer: z.string().min(1),
});

const sourceSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
});

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "dates must be YYYY-MM-DD");

const postSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, numbers and hyphens")
    .refine((slug) => slug !== "posts", "posts is reserved for the archive page"),
  title: z.string().min(1),
  // Meta description: one line for search results and link previews.
  description: z.string().min(1),
  // Answer-first summary: the direct answer to the post's main question, shown at the top of the page.
  summary: z.string().min(20, "summary should directly answer the post's question"),
  date: isoDate,
  updated: isoDate.optional(),
  tag: z.string().min(1),
  // Broader group shown on topic pages. Defaults to the tag when not set.
  topic: z.string().min(1).optional(),
  // Hashtags shown under the post and used as keywords. Pick the terms people search for and share under.
  hashtags: z.array(hashtagSchema).min(3).max(8),
  keyTakeaways: z.array(z.string().min(1)).max(6).optional(),
  body: z.array(blockSchema).min(1),
  faqs: z.array(faqSchema).max(10).optional(),
  // Published research behind the post's figures. Rendered as a Sources list and as citation data.
  sources: z.array(sourceSchema).max(12).optional(),
  // Service slug from src/lib/services.ts. Adds a "Related service" link to the main site.
  relatedService: z
    .string()
    .refine(isServiceSlug, "relatedService must match a slug in src/lib/services.ts")
    .optional(),
});

export type Block = z.infer<typeof blockSchema>;
export type Figure = z.infer<typeof figureSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type Source = z.infer<typeof sourceSchema>;
// What a post looks like when it is written in src/content/posts.ts.
export type PostInput = z.input<typeof postSchema>;
// What the site renders.
export type Post = z.infer<typeof postSchema> & { readMinutes: number };

// How many posts the home page shows before "See all posts".
export const RECENT_POST_COUNT = 3;

// Validated once at module load, so a malformed post fails the build instead of rendering badly.
// A post dated after today is validated like the rest, then left out until its date arrives.
// The site is static, so a post goes live on the first build made on or after its date.
const today = new Date().toISOString().slice(0, 10);
// On by default, so every post shows now. Set SHOW_SCHEDULED_POSTS=false at build time to release by date instead.
const showScheduled = process.env.SHOW_SCHEDULED_POSTS !== "false";
const posts: Post[] = rawPosts
  .map((post) => postSchema.parse(post))
  .filter((post) => showScheduled || post.date <= today)
  .sort((a, b) => b.date.localeCompare(a.date))
  .map((post) => ({ ...post, readMinutes: readingMinutes(post.body) }));

export function getAllPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Last meaningful change: the update date if set, otherwise the publish date. */
export function lastModified(post: Post): string {
  return post.updated ?? post.date;
}

/**
 * Suggestions for a post, drawn only from Asauvia's own posts. Same-tag posts come first,
 * then the rest, each group newest first.
 */
export function getSuggestedPosts(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  const others = posts.filter((post) => post.slug !== slug);
  const sameTag = others.filter((post) => post.tag === current?.tag);
  const rest = others.filter((post) => post.tag !== current?.tag);
  return [...sameTag, ...rest].slice(0, limit);
}


function readingMinutes(body: Block[]): number {
  const words = body.reduce((count, block) => {
    if (block.type === "figure") return count;
    if (block.type === "ul") return count + block.items.join(" ").split(/\s+/).length;
    return count + block.text.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

/** URL-safe name for a topic, e.g. "Managed services" -> "managed-services". */
export function topicSlug(tag: string): string {
  return headingId(tag);
}

/** The topic a post is filed under: its topic if set, otherwise its tag. */
export function topicName(post: Post): string {
  return post.topic ?? post.tag;
}

/** Every topic with its post count, most used first. */
export function getTopics(): { name: string; slug: string; count: number }[] {
  const topics = new Map<string, { name: string; slug: string; count: number }>();
  for (const post of posts) {
    const name = topicName(post);
    const slug = topicSlug(name);
    const existing = topics.get(slug);
    if (existing) existing.count += 1;
    else topics.set(slug, { name, slug, count: 1 });
  }
  return [...topics.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPostsByTopic(slug: string): Post[] {
  return posts.filter((post) => topicSlug(topicName(post)) === slug);
}

/** The posts published just before (older) and just after (newer) this one. */
export function getAdjacentPosts(slug: string): { newer: Post | null; older: Post | null } {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return { newer: null, older: null };
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

/** The fields the search needs, as plain data the browser can use. */
export function getSearchItems(): SearchItem[] {
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    summary: post.summary,
    tag: post.tag,
    hashtags: post.hashtags,
    date: post.date,
    readMinutes: post.readMinutes,
  }));
}
