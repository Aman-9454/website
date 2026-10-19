"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { formatDate } from "@/lib/dates";
import { filterSearchItems, type SearchItem } from "@/lib/search";

/** Search panel that covers the page. Results update as you type; Enter opens the first result; Escape closes it. */
export function SearchDialog({
  items,
  open,
  onClose,
}: {
  items: SearchItem[];
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const close = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const results = useMemo(() => filterSearchItems(items, query), [items, query]);
  const trimmed = query.trim();

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search posts"
      className="fixed inset-0 z-[60] overflow-y-auto bg-background/95 backdrop-blur-xl"
    >
      <div className="mx-auto max-w-[1000px] px-6 pb-16 pt-28 lg:px-12">
        <div className="flex items-center justify-between">
          <p className="font-mono text-sm text-muted-foreground">Search posts</p>
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-foreground/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>

        <form
          role="search"
          onSubmit={(event) => {
            event.preventDefault();
            const first = results[0];
            if (first) window.location.assign(`/${first.slug}`);
          }}
          className="mt-8"
        >
          <label htmlFor="site-search" className="sr-only">
            Search posts
          </label>
          <div className="flex items-center gap-4 border-b border-foreground/20 pb-4 focus-within:border-foreground">
            <Search aria-hidden="true" className="h-6 w-6 shrink-0 text-muted-foreground" />
            <input
              id="site-search"
              type="search"
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by topic, tool or problem"
              autoComplete="off"
              className="w-full bg-transparent text-2xl text-foreground placeholder:text-muted-foreground/70 focus:outline-none lg:text-3xl"
            />
          </div>
        </form>

        <p className="mt-6 font-mono text-sm text-muted-foreground" aria-live="polite">
          {trimmed
            ? `${results.length} ${results.length === 1 ? "result" : "results"} for "${trimmed}"`
            : `${items.length} posts. Start typing to filter them.`}
        </p>

        {results.length === 0 ? (
          <p className="mt-10 border-t border-foreground/10 pt-10 text-lg text-muted-foreground">
            No posts match that yet. Try a shorter word, or open <Link href="/posts" onClick={close} className="text-foreground underline underline-offset-4">all posts</Link>.
          </p>
        ) : (
          <ol className="mt-10 border-t border-foreground/10">
            {results.map((item) => (
              <li key={item.slug} className="border-b border-foreground/10">
                <Link href={`/${item.slug}`} onClick={close} className="group block py-7">
                  <span className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                    <time dateTime={item.date}>{formatDate(item.date)}</time>
                    <span aria-hidden="true" className="text-foreground/30">/</span>
                    <span>{item.tag}</span>
                  </span>
                  <span className="block font-display text-2xl leading-tight tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-1 lg:text-3xl">
                    {item.title}
                  </span>
                  <span className="mt-2 block max-w-3xl leading-relaxed text-muted-foreground">{item.description}</span>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
