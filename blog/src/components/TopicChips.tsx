import Link from "next/link";

/** Browse-by-topic chips. Each links to a page listing that topic's posts. */
export function TopicChips({ topics }: { topics: { name: string; slug: string; count: number }[] }) {
  if (topics.length === 0) return null;

  return (
    <nav aria-label="Browse by topic" className="mb-14">
      <p className="mb-5 font-mono text-sm text-muted-foreground">Browse by topic</p>
      <ul className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link
              href={`/topic/${topic.slug}`}
              className="inline-flex h-10 items-center gap-3 rounded-full border border-foreground/15 px-5 text-sm text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              {topic.name}
              <span className="font-mono text-xs text-muted-foreground">{topic.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
