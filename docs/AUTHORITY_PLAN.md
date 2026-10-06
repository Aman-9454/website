# AUTHORITY_PLAN — building Asauvia's entity and authority off-site

The website tells search engines and AI assistants *what Asauvia says about itself*. This plan covers the other half: **what the rest of the web says about Asauvia.** Google, Bing and AI answer engines use those outside signals for two things:

1. **Entity confidence.** "Asauvia" is a real, specific company, and these profiles all describe the same one. This is what makes brand searches and "What is Asauvia?" answers reliable.
2. **Authority.** Independent sites mention and link to you. This is what moves rankings for generic terms like "AI software development company" over months.

Nothing here guarantees a ranking. Everything here is legitimate and also useful to human buyers who check you out before getting in touch.

---

## 0. The canonical identity. Use it everywhere, exactly.

Inconsistent names and details are the most common reason engines are unsure whether two profiles are the same company. Copy these exactly into every profile.

| Field | Canonical value | Source |
|---|---|---|
| **Name** | **Asauvia** | Owner-confirmed brand name (`src/data/company.ts`) |
| Website | `https://asauvia.com` (no `www`; see SEO_OPERATIONS.md §1) | |
| Email | `info@asauvia.com` | |
| Location | Uttar Pradesh, India | Add the city/full address only once confirmed (CONTENT_GAPS.md) |
| LinkedIn | <https://www.linkedin.com/company/asauvia/> | |
| Short description (≤ 50 words) | "Asauvia is a software development and product engineering company based in Uttar Pradesh, India, building AI applications, workflow automation, custom software, web and mobile apps, and cloud and data systems for startups and enterprises worldwide." | Same text as the site, Organization schema and `llms.txt` (`company.description` in `src/data/company.ts`) |
| Services | AI Software Development · AI Workflow Automation · Custom Software Development · Product Engineering · Web & Mobile App Development · Cloud & DevOps · Data Engineering & Integration · HR & Operations Systems · SEO Optimization | `src/data/service-catalog.ts` |
| Logo | `public/logo.png` (full logo), `public/logo-mark.png` (square mark) | |

**Name variants in circulation.** Decide these once, then stay consistent:

- **"Asauvia"** is the canonical name in all body text, titles and profile names.
- **"ASAUViA"** is the stylized wordmark in the logo. Fine as the logo itself. In text, write "Asauvia".
- **"Asauvia Technologies"** appears in the old site's `<meta name="author">`, and **"ASAUViA Systems"** appears in its footer. If one of these is the **registered legal entity**, use it only where a legal name is required (contracts, invoices, Crunchbase "legal name", Google Business Profile verification documents), and keep "Asauvia" as the public brand. If neither is the legal name, stop using both. **Owner to confirm** (open in CONTENT_GAPS.md).

If you change the description later, change it **everywhere** in the same week: `src/data/company.ts` first, then each profile below.

---

## 1. Priority order

Work top to bottom. The first block is free, fast and has the biggest effect on brand searches and AI answers.

### Tier 1: do in the first two weeks after launch

**1. LinkedIn company page.** This is the profile most likely to be cross-checked, and it is already in the site's `sameAs`.
- [ ] Website field: `https://asauvia.com`.
- [ ] Tagline and "About": the canonical description above. Add a second paragraph listing the 9 services if you like.
- [ ] Logo, matching the site, and a cover image.
- [ ] Industry, company size and HQ (Uttar Pradesh, India), all accurate.
- [ ] **Specialties**: the 9 service names, worded exactly as on the site.
- [ ] Use LinkedIn's **Services** / showcase features if available for company pages.
- [ ] Post occasionally: real project write-ups (with client permission), technical notes, hiring. An active page is a stronger signal than an empty one.

**2. Leadership LinkedIn profiles.**
- [ ] Each founder or leader lists **Asauvia** as their current position, linked to the company page, not as plain text. Plain text creates an unlinked "Asauvia" that LinkedIn can't connect to the page.
- [ ] Headline and About mention what they do at Asauvia, in the same terms the site uses.
- [ ] Optional, later: once leadership bios are confirmed, they can go on `/about` with Person schema linking to these profiles. This is still open in CONTENT_GAPS.md.

**3. Bing Places for Business** (<https://www.bingplaces.com/>) and **Google Business Profile** (<https://business.google.com/>). **Only if eligible.**
- Google Business Profile is for businesses that **meet customers in person**, either at a staffed location or by going to the customer (a "service-area business"). A fully remote software company with no staffed office customers can visit generally **doesn't qualify**. A virtual office or co-working desk you don't staff is against the guidelines and risks suspension.
- [ ] If Asauvia has a real office where clients can meet the team during stated hours, create the profile with the exact canonical name (no keywords added to the name), the real address, the category (e.g. "Software company"), the website and the description.
- [ ] If not, skip Google Business Profile. Bing Places has similar rules, so apply the same test. Skipping is fine: Organization schema, LinkedIn and the directories below still establish the entity.

**4. Crunchbase** (<https://www.crunchbase.com/>).
- [ ] Create or claim the organization profile with the canonical name, website, description, HQ, LinkedIn and the founders (linked to their own Crunchbase people profiles).
- [ ] Add only facts you can stand behind. Leave founding date, funding and headcount blank until confirmed.
- Crunchbase is widely crawled and often cited by AI assistants for "what is [company]" questions.

### Tier 2: the first 1–3 months

**5. B2B service directories**: **Clutch** (<https://clutch.co/>), **GoodFirms** (<https://www.goodfirms.co/>), **DesignRush** (<https://www.designrush.com/>).
- [ ] Create a profile on each with the canonical name, description, services and website.
- [ ] **Reviews: genuine only.** Ask real past or current clients for a review through each platform's own process. Clutch verifies reviews by interview. Never write reviews yourself, have staff or friends pose as clients, swap reviews with other agencies, or pay for reviews. These platforms detect it, and a removed or flagged profile does more damage than no profile.
- [ ] Don't buy "featured" or "top company" badges and present them as earned awards. If you pay for placement, it's advertising, and it can't be shown on the site as an award.
- Their pages rank well for "[service] company India" type searches, and AI assistants cite them when asked for vendor recommendations. A profile with a few verified reviews is worth far more than one with none.

**6. GitHub organization**, *only if there is real open-source or public work.*
- [ ] Create `github.com/asauvia` (or similar), with the website and description in the profile.
- [ ] Publish genuinely useful things: a library, a tool, example integrations, a well-documented template. An empty org, or forks with no changes, adds nothing.
- [ ] If there's nothing real to publish yet, skip this. Don't add GitHub to `sameAs` until the org exists and has content.

**7. Add every new profile to `sameAs`.**
- [ ] Each time a profile above goes live with complete, matching details, add its URL to `sameAs` in `src/data/company.ts` (currently LinkedIn only). This tells engines explicitly "these are all the same Asauvia." Only add profiles you control and keep up to date.

### Tier 3: ongoing, months 2+. This is what builds rankings for generic terms.

**8. Technical articles and guest posts with genuine expertise.**
- [ ] Write about real problems your team has solved, for example: what you learned building an AI workflow automation, how you approached an LLM integration, a migration checklist that worked. Specific, first-hand detail is what makes a piece citable, and what generic AI-written content lacks.
- [ ] Publish on reputable outlets that accept contributed technical articles: engineering publications, dev.to / Hashnode / Medium publications with real editorial standards, and industry blogs your buyers read. Include a short author bio linking to asauvia.com.
- [ ] When there's enough material, consider an `/insights` section on the site itself. It's deliberately not built yet, because it should only exist with real articles.

**9. Earn mentions: podcasts, communities, events.**
- [ ] Appear on podcasts or webinars relevant to your buyers (SaaS founders, operations leaders, AI adoption).
- [ ] Contribute genuinely in communities where buyers and engineers ask questions (relevant subreddits, Stack Overflow, Indie Hackers, local tech and startup groups, meetups). Answer helpfully. Mention Asauvia only where it actually answers the question. Spam gets removed and remembered.
- [ ] Speak at or sponsor local or virtual tech events. Sponsor pages and speaker bios usually link back.
- [ ] Startup ecosystems in India (e.g. state or national startup portals, incubator directories), where Asauvia is genuinely eligible to be listed.

**10. Partner listings, only where a real partnership exists.**
- [ ] If Asauvia is an actual registered partner of a cloud, AI or SaaS vendor (e.g. a formal partner program you've been accepted into), ask to be listed in that vendor's partner directory.
- [ ] Never claim a partnership, certification or "official partner" status you don't hold. The service pages list tools the team *uses*. That doesn't make Asauvia a partner of those vendors.

---

## 2. Wikidata and Wikipedia: don't create them yourself

- **Wikipedia** requires **independent notability**: significant coverage in multiple reliable, independent sources such as news outlets and books, not press releases or directory listings. Creating or paying for an article about your own company is a conflict of interest under Wikipedia's rules. Such articles are routinely deleted, and the deletion discussion becomes a permanent public record.
- **Wikidata** has a lower bar but still expects items to be notable and backed by references. A self-created item for a young company with no independent sources is likely to be deleted.
- **What to do instead:** build the independent coverage in §1. If Asauvia later earns real press coverage, an independent editor may create an entry. That's the only route that lasts.

---

## 3. What NOT to do

Every item below either breaks Google's spam policies, gets profiles removed, or misleads buyers and AI assistants. Each one can undo months of legitimate work.

- **Buying links** or "guest post packages" from link sellers, including "DA 50+ backlinks" offers. Paid links that pass ranking signals violate Google's spam policies.
- **PBNs (private blog networks)** and link farms: networks of sites that exist only to link to clients.
- **Link exchanges** at scale ("I'll link to you if you link to me") and footer links bought on unrelated sites.
- **Fake or incentivised reviews** on Clutch, GoodFirms, Google, anywhere. This includes reviews written by staff, friends or "review services", and paying or discounting in exchange for positive reviews.
- **AI-spun content farms**: mass-produced articles, rewritten competitors' posts, or dozens of near-identical "AI software development company in [city]" pages. Google's scaled-content-abuse policy targets exactly this.
- **Keyword-stuffed names**: listing the business as "Asauvia – Best AI Software Development Company India" on any profile. Use "Asauvia".
- **Invented facts**: client logos you don't have permission to use, certifications not held (e.g. SOC 2, unless actually certified), metrics, awards, years in business or team size you can't back up. AI assistants will repeat these back to prospects, and they're very hard to retract once they spread.
- **Self-promotional Wikipedia/Wikidata entries** (see §2).
- **Anyone promising "#1 on Google" or "guaranteed rankings"** for generic terms. No legitimate provider can guarantee that.

---

## 4. Tracking progress

Monthly, in about 15 minutes:

- [ ] GSC → **Links**: new external domains linking to asauvia.com.
- [ ] GSC → Performance: brand-query position, and which non-brand queries are starting to appear (SEO_OPERATIONS.md §4).
- [ ] The AI answer check from SEO_OPERATIONS.md §6. Are the answers getting more accurate and citing more sources?
- [ ] A short log of profiles created, reviews received (real ones), articles published and mentions earned, with links. This shows what's working and keeps the details consistent when something changes.
