"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { formatDate } from "@/lib/dates";
import { filterSearchItems, parseQuery, type SearchItem } from "@/lib/search";

/**
 * Live search over every post, on the archive page. The query is kept in the address bar (?q=),
 * so a search can be shared or bookmarked.
 */
export function PostSearch({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  // Read the query after the page loads, so the server and browser render the same HTML first.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    if (initial) setQuery(initial);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [query]);

  const results = useMemo(() => filterSearchItems(items, query), [items, query]);
  const trimmed = query.trim();

  return (
    <div>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="mb-14">
        <label htmlFor="post-search" className="mb-4 block font-mono text-sm text-muted-foreground">
          Search posts
        </label>
        <div className="flex items-center gap-4 border-b border-foreground/20 pb-3 focus-within:border-foreground">
          <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            id="post-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try invoices, recruiting, billing or onboarding"
            autoComplete="off"
            className="w-full bg-transparent text-xl text-foreground placeholder:text-muted-foreground/70 focus:outline-none lg:text-2xl"
          />
        </div>
      </form>

      <p className="mb-10 font-mono text-sm text-muted-foreground" aria-live="polite">
        {trimmed ? `${results.length} of ${items.length} posts match "${trimmed}"` : `${items.length} posts`}
      </p>

      {results.length === 0 ? (
        <p className="border-t border-foreground/10 pt-10 text-lg text-muted-foreground">
          No posts match that search yet. Try a shorter word, or browse the topics above.
        </p>
      ) : (
        <ol className="border-t border-foreground/10">
          {results.map((item) => (
            <li key={item.slug} className="group relative border-b border-foreground/10 py-8">
              <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-muted-foreground">
                <time dateTime={item.date}>{formatDate(item.date)}</time>
                <span aria-hidden="true" className="text-foreground/30">/</span>
                <span>{item.tag}</span>
                <span aria-hidden="true" className="text-foreground/30">/</span>
                <span>{item.readMinutes} min read</span>
              </div>
              <h3 className="mb-2 font-display text-2xl leading-tight tracking-tight lg:text-3xl">
                <Link href={`/${item.slug}`} className="after:absolute after:inset-0">
                  {item.title}
                </Link>
              </h3>
              <p className="max-w-3xl leading-relaxed text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
