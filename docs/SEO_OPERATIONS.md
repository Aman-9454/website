# SEO_OPERATIONS — launch and ongoing checklist

For a platform-by-platform list of what to submit where (Google, Bing, IndexNow, AI assistants, social previews), see [SEARCH_SUBMISSIONS.md](./SEARCH_SUBMISSIONS.md).

This guide is for the Asauvia owner and for whoever deploys the site. It covers what to do at launch, what to check afterwards, and what to watch each week and month. These steps help Google, Bing and AI answer engines (ChatGPT, Claude, Perplexity, Gemini / AI Overviews, Copilot) find, understand and cite asauvia.com.

**What to expect.** No one can guarantee a ranking, and this site doesn't either. Here is what is realistic:

- **Brand searches** ("Asauvia", "ASAUViA", "Asauvia software"): ranking #1 for your own name is normal once Google and Bing have indexed the site. That depends on the site being crawlable, which it now is, and on no other well-known entity using the same name. Brand searches often start showing the site within **days to a few weeks** after indexing. This is typical, not promised.
- **Generic searches** ("AI software development company", "AI workflow automation services"): these depend on authority built over time. That means other sites mentioning and linking to Asauvia, plus useful content. Expect **months**, with real uncertainty. See [AUTHORITY_PLAN.md](./AUTHORITY_PLAN.md).
- **AI answer engines:** they summarize what they can crawl and what other sources say about you. A clear, crawlable site is needed but not enough on its own. Third-party mentions matter a lot here.

---

## 0. Why this launch matters

The current asauvia.com is a client-rendered single-page app built with Vite/React. Its HTML is an empty `<div id="root">` until JavaScript runs. A crawler or LLM that doesn't run JavaScript sees **almost nothing: a title, a meta description and an empty page.** The live site also has no `robots.txt` or `sitemap.xml` (both return 404 today).

The new site is the opposite. Every page is server-rendered HTML with real text, structured data (JSON-LD), a sitemap, a robots file and `llms.txt` / `llms-full.txt` files for LLMs. **Deploying it to asauvia.com replaces the old site.** Keep the same domain. Don't launch it on a new domain or subdomain, because that throws away whatever recognition the existing domain already has.

---

## 1. Domain, HTTPS and the one canonical host. Fix this first.

The site declares `https://asauvia.com` (no `www`) as its canonical address. This is `metadataBase` in `src/app/layout.tsx` and `SITE_URL` in `src/lib/schema.ts`. Every canonical tag, sitemap URL, Open Graph URL and JSON-LD `@id` uses that host. **The live domain setup must match it.**

> **Found on 2026-10-06, needs fixing before launch:**
> - `https://www.asauvia.com` works: Vercel serves the old SPA.
> - `https://asauvia.com`, the address the new site calls canonical, returns **HTTP 522** (a Cloudflare error meaning "couldn't reach the origin server").
> - `http://asauvia.com` redirects to `https://asauvia.com/`, which then fails.
>
> DNS is on Cloudflare. The apex `asauvia.com` record is proxied (orange cloud) to an origin that isn't answering. `www` is a CNAME straight to Vercel. If the new site went live as it stands, every canonical URL would point at a broken host.

Do the following:

- [ ] **In Vercel → Project → Settings → Domains, add both `asauvia.com` and `www.asauvia.com`.** Make **`asauvia.com` the primary domain.** Set `www.asauvia.com` to **redirect to `asauvia.com`** with a permanent redirect. Vercel's default permanent redirect is 308, which search engines treat the same as a 301.
- [ ] **In Cloudflare DNS, point the apex at Vercel using exactly the record Vercel's Domains page shows** (an A record or CNAME-flattened value). Set it to **DNS only (grey cloud)**, as `www` already is. If you need the Cloudflare proxy, set SSL/TLS mode to **Full (strict)** first, or you'll get redirect loops or 52x errors.
- [ ] If you'd rather make `www` the canonical host, that's fine. **Pick one host and use it everywhere.** In that case, change `company.domain` / `SITE_URL` to `www.asauvia.com` before deploying, so canonicals, the sitemap and schema all match the host that actually serves the pages. Never leave both hosts serving the site with a 200 response.
- [ ] HTTPS everywhere. `http://` should redirect permanently to `https://` (Vercel does this automatically).
- [ ] Check from a terminal after the DNS change:

  ```bash
  curl -sI https://asauvia.com         # expect 200
  curl -sI https://www.asauvia.com     # expect 301/308 → https://asauvia.com/
  curl -sI http://asauvia.com          # expect 301/308 → https://asauvia.com/
  curl -sI http://www.asauvia.com      # expect a redirect that ends at https://asauvia.com/
  ```

- [ ] **Check Cloudflare's bot settings.** Cloudflare can block AI crawlers before they ever reach the site.
  - In **Configure AI bot policies** (which replaced "Block AI bots" in September 2026), set Search, Agent and Training to allow.
  - In **AI Crawl Control**, make sure none of the crawlers you want is blocked.
  - Keep **Bot Fight Mode** off.
  - Keep **managed robots.txt** off. It adds Cloudflare's own disallow rules for AI bots to the top of the site's `robots.txt`.

  The site's own `robots.txt` deliberately allows OAI-SearchBot, GPTBot, Claude-SearchBot, ClaudeBot, PerplexityBot and others. The full list is in [SEARCH_SUBMISSIONS.md](./SEARCH_SUBMISSIONS.md) §6.

## 2. Environment variables at deploy

Set these in Vercel → Project → Settings → Environment Variables for Production. See `.env.example` for details.

| Variable | Purpose | Required? |
|---|---|---|
| `RESEND_API_KEY` | Sends contact-form emails. Without it, the form falls back to a pre-filled `mailto:` link. | Yes, for a working form |
| `CONTACT_TO_EMAIL` | Inbox that receives enquiries (`contact@asauvia.com`) | Yes |
| `CONTACT_FROM_EMAIL` | Sender address, e.g. `Asauvia Website <website@asauvia.com>`. Verify asauvia.com in Resend first. | Recommended |
| `TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile spam protection. Set both or neither. | Optional |
| `GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag token (content value only) | Only if you don't verify by DNS |
| `BING_SITE_VERIFICATION` | Bing `msvalidate.01` token (content value only) | Only if you don't import from GSC |
| `INDEXNOW_KEY` | Key used by `npm run indexnow`. Defaults to the committed `public/37bdb39371084661d6278813db9ceef4.txt`. | Optional |

After deploying, send a real test enquiry through `/contact` and confirm it arrives.

## 3. Launch-day checklist

Run through this in order once the new site is live on `https://asauvia.com`.

### 3.1 Check the public files

- [ ] `https://asauvia.com/robots.txt` should allow `/` for all crawlers, disallow only `/styleguide` and `/api/`, and end with `Sitemap: https://asauvia.com/sitemap.xml`.
- [ ] `https://asauvia.com/sitemap.xml` should list 19 URLs (home, the 9 service pages, the hubs and the legal pages), all on `https://asauvia.com`.
- [ ] `https://asauvia.com/llms.txt` should show a short entity description plus links.
- [ ] `https://asauvia.com/llms-full.txt` should show the full site content as one markdown file.
- [ ] `https://asauvia.com/37bdb39371084661d6278813db9ceef4.txt` should return the IndexNow key.
- [ ] `https://asauvia.com/opengraph-image` should return a PNG.
- [ ] Spot-check a few pages with "View source", not DevTools. The page text should be in the raw HTML, which is the whole point of this rebuild.

### 3.2 Google Search Console (GSC)

- [ ] Go to <https://search.google.com/search-console> and **add a Domain property** for `asauvia.com`. Verify it by adding the **DNS TXT record** Google gives you in Cloudflare DNS. A Domain property covers `http`/`https` and `www`/apex together, so it's the best option.
  - If you can't edit DNS, add a **URL-prefix** property for `https://asauvia.com/`. Choose "HTML tag", copy only the `content="…"` value into `GOOGLE_SITE_VERIFICATION`, redeploy, and click Verify.
- [ ] **Sitemaps → submit `sitemap.xml`.** Confirm the status reads "Success" and it discovered 19 URLs.
- [ ] **URL Inspection → Request indexing** for these pages, one at a time (there is a daily quota):
  1. `https://asauvia.com/`
  2. `https://asauvia.com/about`
  3. `https://asauvia.com/services`
  4. `https://asauvia.com/faq`
  5. `https://asauvia.com/how-we-work`
  6. The service pages you most want leads from, e.g. `/services/ai-software-development` and `/services/ai-workflow-automation`
- [ ] In URL Inspection, click **"Test live URL" → "View tested page"** for the home page. Confirm the screenshot and HTML show the real content.
- [ ] Add the second person (the deployer or the owner) as a user on the property, so access doesn't rely on one account.

### 3.3 Bing Webmaster Tools

Bing's index also feeds ChatGPT search, Copilot and several other assistants, so it's worth doing.

- [ ] Go to <https://www.bing.com/webmasters>. The easiest route is **"Import from Google Search Console"**, which brings over verification and sitemaps. Otherwise, use the meta-tag method with `BING_SITE_VERIFICATION`, or Bing's DNS option.
- [ ] Submit `https://asauvia.com/sitemap.xml` under **Sitemaps**.
- [ ] Use **URL Submission** for the home page and `/about`.

### 3.4 IndexNow

- [ ] From the project folder, after each production deploy, run:

  ```bash
  npm run indexnow
  # preview without sending:
  DRY_RUN=1 npm run indexnow
  ```

  The script reads the live sitemap and pings IndexNow, which shares the update with Bing, Yandex, Seznam, Naver and others. Expect `HTTP 200` or `202`. Google doesn't use IndexNow; for Google, the sitemap and URL Inspection are enough.

### 3.5 Structured data

Each page carries JSON-LD: Organization, WebSite and WebPage everywhere, plus Service, FAQPage and BreadcrumbList where relevant.

- [ ] Google **Rich Results Test**: <https://search.google.com/test/rich-results>. Test the live URLs for `/`, `/about` and one `/services/...` page. FAQ checks were removed from this tool in June 2026, so validate `/faq` with the Schema Markup Validator below. Expect no errors. Warnings about optional fields are fine.
- [ ] **Schema Markup Validator**: <https://validator.schema.org/>. Test the same URLs and confirm Organization shows the name, url, logo, email and `sameAs` (LinkedIn).
- [ ] Be honest about what you'll see. Google stopped showing FAQ rich results entirely in May 2026, so **don't expect FAQ dropdowns in Google results.** The FAQ markup is still useful because it gives clean question-and-answer pairs to Bing and AI engines.

### 3.6 Social previews

- [ ] Paste `https://asauvia.com` into LinkedIn's Post Inspector (<https://www.linkedin.com/post-inspector/>). This refreshes LinkedIn's cache and checks the preview image, title and description.

---

## 4. Ongoing monitoring

### Weekly, for the first 6–8 weeks, then monthly

**GSC → Pages (indexing)**
- [ ] The "Indexed" count should climb toward 19. Open each "Not indexed" reason:
  - *Discovered/Crawled – currently not indexed* is normal for a new site and usually resolves over time. Re-request indexing only for important pages.
  - *Duplicate, Google chose different canonical than user*, or anything about `www`, usually means the host redirect from §1 isn't working.
  - *Page with redirect* is fine for old URLs (see §5).
  - *Not found (404)* covers old SPA URLs. See §5.

**GSC → Performance → Search results**
- [ ] Filter **Query contains "asauvia"**. You want impressions and clicks to appear, with an average position near 1. Also check spelling variants such as "asauvia technologies" and "asauvia systems".
- [ ] **CTR:** if a page gets impressions but almost no clicks, its title or meta description may not match what searchers want. Titles and descriptions live in `src/data/service-pages/*.ts` (`metaTitle` / `metaDescription`) and in each page's `metadata`.
- [ ] Note which **non-brand queries** start appearing, even at position 30+. Those are the topics to build content around later.

**Bing Webmaster Tools**
- [ ] Check "Search Performance" and "Site Explorer" for the same signals.

### Monthly

- [ ] **GSC → Core Web Vitals** (needs real traffic before data appears) and **PageSpeed Insights** (<https://pagespeed.web.dev/>) for `/` and one service page. Target "Good" for LCP, INP and CLS on mobile.
- [ ] **GSC → Enhancements** (e.g. Breadcrumbs): confirm there are no new structured-data errors.
- [ ] **GSC → Links**: watch which external sites link to you. This should grow as you work through AUTHORITY_PLAN.md.
- [ ] **The AI answer-engine check** (§6).
- [ ] Re-run `npm run indexnow` after any content change, and resubmit the sitemap in GSC if you add pages.

### Whenever content changes

- [ ] Keep facts in one place: `src/data/company.ts` holds the company description, email, HQ and LinkedIn, and the site, JSON-LD and `llms.txt` all read from it. Update it there, not page by page.
- [ ] Never add claims that aren't true: certifications, client logos, metrics, awards, prices. They're a trust problem, and AI engines will repeat them back to prospects.

---

## 5. Old URLs from the current site

The current site is one page of `#anchor` sections, so it probably has few or no other URLs that Google indexed. Check in GSC (Pages → Indexed) or with a `site:asauvia.com` search before launch. If old paths show up, other than `#` fragments, which never reach the server, add permanent redirects to the closest new page (for example in `next.config.ts` `redirects()`). Don't leave them returning 404.

---

## 6. How AI answer engines choose sources, and how to check

**How they decide**, in plain terms:

1. **Can they crawl it?** AI crawlers mostly don't run JavaScript. The new server-rendered HTML, the open `robots.txt` and `llms.txt` / `llms-full.txt` cover this, provided Cloudflare isn't blocking bots (§1).
2. **Is the entity clear?** One name ("Asauvia"), one description, one domain, plus `sameAs` links to profiles that describe the same company in the same words. Organization JSON-LD and a consistent LinkedIn page do this.
3. **Is the content answer-first?** Each service page opens with a direct answer to "what is this and who is it for", and FAQs are written as real questions with short answers. Engines quote passages like these.
4. **Do other sources agree?** This is the biggest factor you control off-site. Assistants that search the web (ChatGPT search, Perplexity, Copilot, Gemini) put weight on independent pages that mention you: directories, review sites, articles, LinkedIn. See AUTHORITY_PLAN.md.
5. **Freshness of their index.** Assistants that answer from training data won't know about the new site until their next model update, which can take months. Assistants that search the web can pick it up as soon as Bing or Google has indexed it.

**How to check**, monthly, starting about 2–4 weeks after indexing:

- [ ] Ask each of **ChatGPT (with search on), Perplexity, Gemini, Copilot and Claude**:
  - "What is Asauvia?"
  - "What does asauvia.com do?"
  - "Asauvia software development company India"
- [ ] For each answer, note: Does it identify the right company? Does it cite asauvia.com? Is the description accurate? Does it mix you up with anything else?
- [ ] Keep a simple log (date / engine / answer / cited sources). If an engine is wrong, the fix is almost always off-site: make the LinkedIn page, directory listings and other profiles say the same thing as the site. You can't edit an AI's answer directly.
- [ ] Also search Google and Bing for **"Asauvia"** in a private window, and check whether a knowledge panel or AI Overview appears and what it says.

---

## 7. Realistic timeline

These are typical ranges, not commitments. They vary with crawl rates, competition and how much off-site work gets done.

| Milestone | Typical range |
|---|---|
| Home page indexed after Request indexing | a few hours to a few days |
| Most of the 19 pages indexed | 1–4 weeks |
| Site ranks for "Asauvia" | days to a few weeks after indexing, if the domain issue in §1 is fixed and no other prominent entity shares the name |
| Web-search AI assistants (Perplexity, ChatGPT search, Copilot) describe Asauvia from the new site | weeks, once Bing/Google have indexed it |
| Assistants answering from training data reflect the new site | months; depends on their model update cycles |
| Visible movement on generic service terms | several months or longer; depends mostly on authority (AUTHORITY_PLAN.md) and on adding genuinely useful content |

## 8. Who owns what

| Task | Owner |
|---|---|
| DNS / Cloudflare / Vercel domains, env vars, `npm run indexnow` after deploys | Deployer |
| GSC and Bing accounts (both people should have access) | Owner + deployer |
| Weekly/monthly GSC review, AI answer check | Owner, or someone they delegate |
| LinkedIn, directories, reviews, articles (AUTHORITY_PLAN.md) | Owner / leadership |
| Confirming the open fact items in CONTENT_GAPS.md | Owner |
