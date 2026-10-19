# Asauvia Blog

Standalone Next.js app for the Asauvia blog, served from the `blog.asauvia.com` subdomain. It lives in this folder of the main repo but deploys on its own, separate from the marketing site in the parent folder.

## Run locally

```bash
cd blog
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build
```

## Writing posts

Posts are typed data in [src/content/posts.ts](src/content/posts.ts). The site is fully static: every post, feed and llms file is generated at build time, so a new post needs a rebuild and redeploy.

Each post has these fields:

| Field | Required | Purpose |
|---|---|---|
| `slug` | yes | Lowercase letters, numbers and hyphens. Becomes the URL. |
| `title` | yes | Page headline, `<title>` and link previews. |
| `description` | yes | One-line meta description for search results. |
| `summary` | yes | The direct answer to the post's main question, in 1–3 sentences. Shown first on the page and used by AI answer engines. |
| `date` | yes | Publish date, `YYYY-MM-DD`. Posts are listed newest first. |
| `updated` | no | Set when you revise a post. Shown on the page and in the sitemap. |
| `tag` | yes | Short topic label, e.g. "AI automation". |
| `hashtags` | yes | 3 to 8 hashtags such as `#MSP`, shown under the post and used as keywords. |
| `keyTakeaways` | no | Up to 6 bullet points, shown above the body. |
| `body` | yes | Blocks of type `p`, `h2`, `quote` (`text`), `ul` (`items`) or `figure` (see below). |
| `faqs` | no | Up to 10 `{ question, answer }` pairs. Each question ends with `?`. Shown on the page and marked up as FAQPage data. |
| `sources` | no | Up to 12 `{ label, url }` pairs for published data. Shown at the end of the post and listed as citations. |
| `relatedService` | no | A service slug from `src/lib/services.ts`. Adds a related-service card that links to the main site. |

[src/lib/posts.ts](src/lib/posts.ts) validates every post with zod when the app builds, so a bad field fails the build with a clear error.

### Figures

A `figure` block takes a `figure` object with a `kind`, a `title`, a `caption` and a `note`:

- `bars`: `items` of `{ label, value, display }`. Bars start at zero. Set `max: 100` for percentages.
- `steps`: `steps`, a list of 3 to 6 short strings, shown in order.
- `timeline`: `hours` and `points` of `{ label, at }`, with `at` in hours from the start.

Name an example in its title. Put the source of any published number in the `note` and in `sources`.

### What each post produces

- `/<slug>`: the readable page, with BlogPosting, BreadcrumbList and (if `faqs` is set) FAQPage structured data, a canonical URL and its own social preview image.
- `/<slug>/md`: the same post as clean markdown, linked from the page for tools that prefer text.
- `/llms.txt`: an index of all posts with their summaries, for LLM crawlers.
- `/llms-full.txt`: every post in full, as markdown.
- `/feed.xml`: RSS feed, auto-discovered by feed readers.
- `/sitemap.xml` and `/robots.txt`: sitemap with `updated` dates, and AI and search crawlers allowed (same policy as the main site).

### Writing for search and AI answers

- Put the answer first. The `summary` should answer the question the post's title asks, without preamble.
- Use question-style or specific `h2` headings, such as "What does a handover include?" rather than "Handover".
- Add `faqs` for the questions a buyer would really ask. Keep each answer self-contained, so it still makes sense when quoted on its own.
- Keep facts specific and checkable. Do not add client names, metrics or results that are not verified.
- Set `updated` when you change a post's substance. Do not bump it for typo fixes.

The two starter posts are general guidance, not client claims. Replace them before promoting the blog.

## Deploying to blog.asauvia.com

1. Create a new Vercel project from this repo and set **Root Directory** to `blog`.
2. Add `blog.asauvia.com` as the project's domain.
3. At the DNS provider for `asauvia.com`, add a `CNAME` record for `blog` pointing to the target Vercel gives you (usually `cname.vercel-dns.com`).

Theme tokens in [src/app/globals.css](src/app/globals.css) mirror the main site's `src/app/globals.css`. Change them in both places if the brand changes.

## Analytics, consent and ads

Nothing from Google loads until a visitor accepts the matching cookies in the banner.

| Variable | What it does |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Turns on Google Analytics 4, after analytics consent. Empty means no analytics. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Adds the AdSense verification tag and identifies the publisher. |
| `NEXT_PUBLIC_ADSENSE_SLOT` | Ad unit ID. Not used yet; ads wait for AdSense approval. |

- Consent is kept in the visitor's browser (`src/lib/consent.ts`). It expires after 12 months, or sooner when the policy version changes.
- Google Consent Mode defaults to denied before any tag loads (`src/app/layout.tsx`).
- Events are defined in `src/lib/analytics.ts`: `blog_article_view` and `project_cta_click`. Any element with `data-cta` and `data-cta-location` is tracked by one listener (`src/components/analytics/CtaClickTracker.tsx`).
- `public/ads.txt` lists the AdSense publisher line. Keep a copy at the main site's root as well, because Google checks the root domain first.
- Copy `.env.example` to `.env.local` for local work. Put the real values in the hosting provider's environment settings for production.
- Not yet wired: Google's own consent message (Privacy & messaging). It needs the snippet from the AdSense console, so the blog's own banner is the consent screen until then.

## Publishing schedule

- The home page shows the latest 3 published posts (`RECENT_POST_COUNT` in `src/lib/posts.ts`). "See all posts" opens `/posts`, which lists every published post.
- By default every post shows now, including posts with a future date. Set `SHOW_SCHEDULED_POSTS=false` at build time to hide posts until their date.
- A post's `date` decides when it goes live when that setting is off. Posts dated after today are validated but left out of the build, so they do not appear on the index, `/posts`, the sitemap, the feed or the llms files.
- The site is static, so a post goes live on the first build made on or after its date. To release weekly without someone pressing deploy, add a daily scheduled deploy (for example a Vercel deploy hook called by a cron job).
- Keep one date per post and space them weekly, so readers see a steady rhythm.
