# Search engine and AI submissions for asauvia.com

What to upload, paste or submit on Google, Bing and the other platforms, and what each item does. Work through it top to bottom after the new site is live.

- **Already built into the site:** the files in §1. You don't create them; you point search engines at them.
- **Done by you, once, in each platform's dashboard:** everything in §2 onwards.
- **Related guides:** [SEO_OPERATIONS.md](./SEO_OPERATIONS.md) covers launch and monitoring in more depth. [AUTHORITY_PLAN.md](./AUTHORITY_PLAN.md) covers profiles and directories outside the site.

> **Do this first: the site must be live on `https://asauvia.com`.**
> Checked on 2026-10-06:
> - `https://asauvia.com` doesn't answer (it timed out; earlier it returned a Cloudflare 522 error).
> - `https://www.asauvia.com` still serves the old site.
>
> Every URL submitted below starts with `https://asauvia.com`, so submitting before the domain works sends Google and Bing to a broken page. Fix the domain first. The steps are in SEO_OPERATIONS.md §1.

---

## 1. The SEO files the site generates

Every one of these is produced automatically from the code and updates on each deploy. Open each link in a browser once the site is live to confirm it loads.

| File | Live URL | What it is | Who uses it |
|---|---|---|---|
| **Sitemap** | `https://asauvia.com/sitemap.xml` | The list of all 19 public pages with their last-updated dates. | You submit it to Google and Bing (§2, §3). The IndexNow script reads it (§4). |
| **Robots file** | `https://asauvia.com/robots.txt` | Tells crawlers what they may visit. It allows everything except `/styleguide` and `/api/`, names about 20 search and AI crawlers, and points to the sitemap. | All search engines and AI crawlers read it automatically. Nothing to submit. |
| **LLM summary** | `https://asauvia.com/llms.txt` | A short plain-text description of Asauvia with links to every page, written for AI tools. | AI assistants and agents that look for it. Nothing to submit. |
| **LLM full text** | `https://asauvia.com/llms-full.txt` | The whole site's content as one markdown file (about 43 KB). | Same as above: an easy, complete source for an AI to quote from. |
| **IndexNow key** | `https://asauvia.com/37bdb39371084661d6278813db9ceef4.txt` | Proves you own the domain when you ping IndexNow. | Bing, Yandex, Seznam, Naver and others (§4). |
| **Structured data (JSON-LD)** | Inside every page's HTML | Machine-readable facts: the organisation (name, logo, email, location, LinkedIn), the website, each page, each service, breadcrumbs and FAQs. | Google, Bing and AI engines use it to understand who you are. You test it (§6); you don't upload it. |
| **Link preview images** | e.g. `https://asauvia.com/opengraph-image` | The 1200×630 image, title and description shown when a page is shared on LinkedIn, WhatsApp, Slack or X. | Social platforms (§7). |
| **Icons and manifest** | `/favicon.ico`, `/icon.png`, `/apple-icon.png`, `/manifest.webmanifest` | The logo shown in browser tabs, on phone home screens and next to your result in Google. | Browsers and Google. Nothing to submit. |

---

## 2. Google

### 2.1 Google Search Console: the main thing to do

**What it is:** Google's free dashboard for site owners. It's where you prove you own the site, hand Google your sitemap, ask Google to index pages, and see which searches show your site.

**Where:** <https://search.google.com/search-console>

| Step | What to upload or paste | Why |
|---|---|---|
| 1. Add a **Domain** property | `asauvia.com` | Covers every version of the site (`http`, `https`, `www` and none) in one property. |
| 2. Verify ownership | A DNS TXT record in Cloudflare. **One already exists:** `google-site-verification=yU6DzvgS3VNAsKZAD3_h6fgvIukY8AiMYffCr1oTLzA`. If that record came from this Google account, the property may already be verified; open Search Console and check. | Google only shows data to the domain's owner. |
| 3. **Sitemaps** → add sitemap | `https://asauvia.com/sitemap.xml` (a Domain property needs the full URL) | Hands Google the full list of pages so none are missed. Expect "Success" and 19 discovered URLs. |
| 4. **URL Inspection** → Request indexing | One at a time: `/`, `/about`, `/services`, `/faq`, `/how-we-work`, then your most important service pages | Puts key pages in Google's queue sooner. There's a daily limit, so do the most important pages first. |
| 5. URL Inspection → **Test live URL** → View tested page | The homepage | Confirms Google sees the real text, not a blank page. |
| 6. **Settings → Users and permissions** | Add a second person's Google account | So access doesn't depend on one person. |

**If you can't use DNS:** add a **URL-prefix** property for `https://asauvia.com/` and choose **HTML tag**. Copy only the `content="…"` value into the hosting environment variable `GOOGLE_SITE_VERIFICATION`, redeploy, then click Verify. The site adds the tag to every page automatically.

### 2.2 Google Business Profile: only if you're eligible

**What it is:** your listing on Google Maps and in the business panel on the right of Google results.

**Where:** <https://business.google.com/>

**Eligibility:** Google only allows this for businesses that meet customers in person, either at a staffed address or by visiting them. A fully remote software company usually doesn't qualify. A virtual office or an unstaffed desk breaks the rules and can get the listing suspended.

**If you have a real office clients can visit:**
- Name: exactly "Asauvia", with no keywords added.
- Category: "Software company".
- Address: the real one.
- Website: `https://asauvia.com`.
- Description: the company description (§9).

**If you don't, skip it.** The structured data and LinkedIn already establish the company.

### 2.3 Google checks: nothing to upload

These are tests you run; nothing is submitted.

- **Rich Results Test:** <https://search.google.com/test/rich-results>. Paste the live URLs for `/`, `/about` and one service page. Expect no errors, with breadcrumbs detected.
- **Schema Markup Validator:** <https://validator.schema.org/>. Use this for `/faq`. Google stopped showing FAQ rich results in May 2026 and removed FAQ checks from the Rich Results Test in June 2026. The FAQ markup still helps Bing and AI assistants, so check that it's valid here.
- **PageSpeed Insights:** <https://pagespeed.web.dev/>. Shows load speed on mobile, which Google uses as a ranking signal.
- **Gemini and AI Overviews** use Google's own index, so once Search Console shows your pages as indexed, they can draw on them.

---

## 3. Bing, which also feeds ChatGPT, Copilot, DuckDuckGo and Yahoo

### 3.1 Bing Webmaster Tools

**What it is:** Bing's equivalent of Search Console. It matters more than Bing's market share suggests: Bing's index powers Yahoo, is one of DuckDuckGo's main sources, and is used by Microsoft Copilot and ChatGPT search.

**Where:** <https://www.bing.com/webmasters>

| Step | What to upload or paste | Why |
|---|---|---|
| 1. **Import from Google Search Console** (easiest) | Sign in with the same Google account and pick `asauvia.com` | Copies verification and your sitemap from Google in one go. |
| 1 (alternative). Verify manually | Bing's DNS record in Cloudflare, or the `msvalidate.01` meta tag value pasted into the environment variable `BING_SITE_VERIFICATION` | Proves ownership if you didn't import. |
| 2. **Sitemaps** → Submit | `https://asauvia.com/sitemap.xml` | Same reason as for Google. |
| 3. **URL Submission** | `https://asauvia.com/` and `https://asauvia.com/about` | Puts the most important pages in Bing's queue sooner. |
| 4. **IndexNow** section | Nothing to paste. The site's key file is already live (§1), and the script in §4 does the pinging. | Bing shows the URLs it received there. |

### 3.2 Bing Places for Business: only if you're eligible

**Where:** <https://www.bingplaces.com/>

It has the same "real location customers can visit" rule as Google Business Profile (§2.2). If you do create a Google profile, Bing Places can import it.

---

## 4. IndexNow: instant notifications to Bing, Yandex, Seznam, Naver and others

**What it is:** a shared protocol for telling search engines "these pages changed" right away, instead of waiting for them to re-crawl. One ping reaches every participating engine. Google doesn't take part.

**What to do:** after each production deploy, run this from the project folder:

```bash
npm run indexnow            # sends all 19 URLs from the live sitemap
DRY_RUN=1 npm run indexnow  # shows what would be sent, sends nothing
```

The script reads the live sitemap and sends every URL with the site's key. A response of `HTTP 200` or `202` means it was accepted. The key is already in the site, so there's nothing to upload. Only change it if you set a new `INDEXNOW_KEY`, and then a matching `public/<key>.txt` must exist.

---

## 5. Other search engines (optional)

| Platform | Do it? | What to submit |
|---|---|---|
| **Yandex Webmaster** (<https://webmaster.yandex.com/>) | Optional; only worth it if you target Russia, Turkey or Central Asia. | Verify with its meta tag or DNS, then submit `sitemap.xml`. IndexNow already notifies Yandex. |
| **Naver Search Advisor** (<https://searchadvisor.naver.com/>) | Only if you target South Korea. | Verify, then submit the sitemap. |
| **Seznam** (Czech Republic) | No separate step. | IndexNow covers it. |
| **DuckDuckGo, Yahoo, Ecosia** | No separate step. | They draw largely on Bing (§3). |
| **Baidu** | Skip. | Ranking in mainland China generally needs Chinese hosting and an ICP licence. |
| **Apple Business** (<https://business.apple.com/>), which replaced Apple Business Connect in April 2026 | Only with a real physical location. | Shows the business in Apple Maps, Siri, Wallet and Mail. Apple's web crawler (Applebot) is already allowed in `robots.txt`. |

---

## 6. AI assistants: ChatGPT, Claude, Perplexity, Gemini and Copilot

**There is no "submit your site" form for any of these.** Nobody can upload a site to ChatGPT or Claude. They find you in two ways:

1. **Through search indexes they use.**
   - ChatGPT search and Copilot draw on Bing.
   - Gemini and AI Overviews draw on Google.
   - Perplexity, ChatGPT and Claude also run their own crawlers.

   So §2 and §3 are what put you in AI answers.
2. **Through their crawlers reading the site directly.** `robots.txt` already allows all of them. `llms.txt` and `llms-full.txt` give them a clean summary.
   - **Answer and search crawlers**, which put you in AI answers: OAI-SearchBot and ChatGPT-User (OpenAI), Claude-SearchBot and Claude-User (Anthropic), PerplexityBot and Perplexity-User.
   - **Training crawlers**, which help future models know about you: GPTBot (OpenAI) and ClaudeBot (Anthropic).
   - **Google-Extended and Applebot-Extended** aren't crawlers. They're `robots.txt` switches that let Google and Apple use pages they've already crawled for Gemini and Apple's AI models. Allowing them doesn't affect normal Google or Apple search.

**What you must check in Cloudflare:** open the asauvia.com dashboard and look at these settings (menu names can vary):
- **Security settings → Configure AI bot policies.** This replaced the old "Block AI bots" toggle in September 2026. Set all three categories (**Search**, **Agent** and **Training**) to allow.
- **AI Crawl Control** (formerly AI Audit). Make sure none of the AI crawlers listed above is set to block.
- **Bot Fight Mode.** Keep it off. It can challenge legitimate crawlers.
- **Managed robots.txt.** Keep it off. It doesn't block anything itself, but it adds Cloudflare's own "don't crawl" rules for AI bots to the top of your `robots.txt`, which cancels the site's own rules.

The first three block bots at Cloudflare before they ever reach the site, so they override `robots.txt` completely.

**How to see if it's working:** about 2–4 weeks after indexing, ask each assistant "What is Asauvia?" with web search on. Note whether it names the right company and cites asauvia.com. SEO_OPERATIONS.md §6 has a simple monthly log for this.

---

## 7. Link previews on social platforms

These tools refresh each platform's cached copy of your page, so shared links show the right image, title and description.

| Platform | Tool | What to paste |
|---|---|---|
| LinkedIn | Post Inspector: <https://www.linkedin.com/post-inspector/> | `https://asauvia.com`, then each page you plan to share |
| Facebook, Instagram, WhatsApp | Sharing Debugger: <https://developers.facebook.com/tools/debug/> | The same URLs. Click "Scrape again" after changes. |
| X (Twitter) | No public validator any more | Post or draft the link to see the card |

---

## 8. Environment variables for verification codes

Only needed if you verify with an HTML tag instead of DNS. Set them in the hosting dashboard (e.g. Vercel → Settings → Environment Variables → Production), then redeploy.

| Variable | Paste | Example of what to copy |
|---|---|---|
| `GOOGLE_SITE_VERIFICATION` | Only the content value from Google's HTML tag | From `<meta name="google-site-verification" content="abc123">`, paste `abc123` |
| `BING_SITE_VERIFICATION` | Only the content value from Bing's tag | From `<meta name="msvalidate.01" content="XYZ789">`, paste `XYZ789` |
| `INDEXNOW_KEY` | Leave empty to use the built-in key | — |

If a variable is empty, the site simply leaves that tag out.

---

## 9. Use the same company details everywhere

Search engines and AI tools trust a company more when every profile says the same thing. When a form asks for these, copy them exactly:

- **Name:** Asauvia
- **Website:** https://asauvia.com
- **Email:** info@asauvia.com
- **Location:** Uttar Pradesh, India
- **LinkedIn:** https://www.linkedin.com/company/asauvia/
- **Description:** Asauvia is a software development and product engineering company based in Uttar Pradesh, India, building AI applications, workflow automation, custom software, web and mobile apps, and cloud and data systems for startups and enterprises worldwide.
- **Logo:** `public/logo.png` (full) or `public/logo-mark.png` (square)

The site itself reads these details from `src/data/company.ts`. If you change them there, change every profile the same week.

---

## 10. Checklist

| # | Task | Where | When |
|---|---|---|---|
| 1 | `https://asauvia.com` loads the new site, and `www` redirects to it | Hosting + Cloudflare | Before everything else |
| 2 | Cloudflare isn't blocking AI or search bots | Cloudflare → AI bot policies, AI Crawl Control, Bot Fight Mode, managed robots.txt | Launch day |
| 3 | The files in §1 all open in a browser | Browser | Launch day |
| 4 | Domain property verified | Google Search Console | Launch day |
| 5 | `sitemap.xml` submitted | Google Search Console | Launch day |
| 6 | Key pages requested for indexing | Google Search Console → URL Inspection | Launch day, then a few each day |
| 7 | Imported from Google, sitemap submitted | Bing Webmaster Tools | Launch day |
| 8 | `npm run indexnow` returns 200 or 202 | Terminal | Launch day and after every deploy |
| 9 | Rich Results Test (`/`, `/about`, a service page) and Schema Markup Validator (`/faq`) show no errors | Google, schema.org | Launch week |
| 10 | Link previews refreshed | LinkedIn Post Inspector, Facebook Debugger | Launch week |
| 11 | Business profiles (Google Business Profile, Bing Places, Apple Business) | Each platform | Only if you have a real office clients can visit |
| 12 | "What is Asauvia?" checked in AI assistants | ChatGPT, Perplexity, Gemini, Copilot, Claude | 2–4 weeks after indexing, then monthly |

**After every deploy:**
1. Run `npm run indexnow`.
2. If you added or removed pages, resubmit the sitemap in Google Search Console. Bing picks it up on its own.
