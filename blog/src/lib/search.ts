export type SearchItem = {
  slug: string;
  title: string;
  description: string;
  summary: string;
  tag: string;
  hashtags: string[];
  date: string;
  readMinutes: number;
};

/** Lower-cased words from the query. Empty words are dropped. */
export function parseQuery(query: string): string[] {
  return query.toLowerCase().trim().split(/\s+/).filter(Boolean);
}

/** Posts whose title, description, summary, tag or hashtags contain every word in the query. */
export function filterSearchItems(items: SearchItem[], query: string): SearchItem[] {
  const terms = parseQuery(query);
  if (terms.length === 0) return items;
  return items.filter((item) => {
    const haystack = [item.title, item.description, item.summary, item.tag, ...item.hashtags].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
