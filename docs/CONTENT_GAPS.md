# CONTENT_GAPS — inputs required from the Asauvia owner before launch

Every item below will be entered into the typed data files as `"[[VERIFY: <this question>]]"`. A build-time check must fail production builds if any `[[VERIFY` or `[[TODO` string reaches a rendered page (to be implemented in the zod/build-guard step). Nothing here is fabricated — items marked *from live site* are what the current `asauvia.com` appears to claim today and need confirming or dropping; items marked *not yet determined* have no source at all yet.

## Identity & legal
- [x] Brand name confirmed by owner: **Asauvia** (not "Asauvia Technologies", which appears in the live site's `<meta name="author">` tag — that may still be the registered legal entity name used in contracts; doesn't need to match the brand name shown on the site).
- [ ] Founding year, legal entity type, full registered HQ address (live site and brief both say Uttar Pradesh, India — need exact city/address for schema + About page). *[[VERIFY]]*
- [ ] Official phone number (not currently published anywhere found).
- [x] Contact email: `info@asauvia.com` — published on the live asauvia.com (contact section + mailto links), now used site-wide.
- [ ] Logo (vector), brand colors, brand fonts if any exist beyond the live site's Plus Jakarta Sans/Inter pairing — confirm whether those two fonts are a locked brand choice or open to the new design direction proposed in DESIGN_PLAN.md.
- [ ] Official ≤50-word company description for reuse verbatim across footer/About/Organization schema/OG/`llms.txt` (live site's current meta description is a starting draft, not yet confirmed as final-copy).

## Services (resolves the live site's two overlapping capability sections)
- [ ] Confirm the 8-service taxonomy proposed in PLAN.md §2, or correct it.
- [x] **API Monitoring** — offered on the live site; folded into the Cloud & DevOps service page.
- [x] **SEO Optimization** — offered on the live site; now its own service page, rewritten honestly (technical SEO + AEO, no ranking guarantees).
- [x] **HR & Operations Systems** — offered on the live site; now its own service page.

## Products (status badges — Live / Beta / In development — must be accurate)
- [ ] **AI Chatbots** — real product today? What's it called externally, what does it do, is it sold or just delivered as custom work?
- [ ] **Slack Bots** — same questions.
- [ ] **Customized ADK** — same questions; also confirm this isn't a trademark conflict with Google's "Agent Development Kit" (ADK) naming.
- [ ] **Intelligent Systems** — same questions; name is very generic, confirm what it actually refers to.
- [ ] **Invoicera** *(excluded from this build — product, not a service)* — live site marks this "coming soon." Per content rules it cannot appear as a current service/product until it ships — confirm real target date or drop entirely from this build.
- [ ] **WhatsApp Bot** *(excluded from this build)* — live site marks this "in progress." Same rule — Beta badge only once it's genuinely usable by a prospect, otherwise omit.

## Trust claims (none of these can ship unless verified — currently would all render as `[[VERIFY]]` or be cut)
- [ ] Is Asauvia actually **SOC2 Type II certified**? If not yet, is any audit in progress worth describing honestly (e.g. "SOC2 readiness in progress")?
- [ ] Any reliability/uptime percentage actually measured (the live site's "100% reliability" and "0.042ms" style figures are not usable as-is — need a real number with a real source, or must be cut).
- [ ] Any other certifications (ISO, data-residency, etc.)?

## Proof content
- [ ] Real industries with genuine delivered experience (none assumed — no industry pages will be generated until this list exists).
- [x] Case studies — removed entirely at the owner's request (service-based company). No /case-studies route, nav item or homepage section.
- [ ] Any approved client testimonials (none will be fabricated; omit the section entirely if none exist at launch).
- [ ] Leadership names, bios, headshots, LinkedIn URLs for the About page's Person schema.

## Markets & engagement
- [ ] Which international markets are *actually* served today with real delivery experience (brief's working assumption: US, UK, Canada, Australia, Europe, Singapore) — confirm per-market, since `/locations/[country]` pages only generate where `justified: true`.
- [ ] Verified working-hours overlap between IST and each confirmed market (needed for the footer's "currently working hours in IST" indicator and the `GlobeMarkets` scene — both render nothing until this exists, rather than a guessed number).
- [ ] Engagement models actually offered (fixed-scope / dedicated team / time-and-materials-retainer) and what genuinely drives cost — no invented pricing tiers, ever.
- [ ] Verified response-time expectation for inbound enquiries (used in hero micro-line and contact page trust copy).

## Technical / operational
- [ ] AI-crawler training-bot policy: allow or block GPTBot, Google-Extended, CCBot, etc. for *training* (search/answer-engine bots like OAI-SearchBot, PerplexityBot default to allow per the brief; this is specifically about training use). Owner decision required.
- [ ] Analytics/Search Console/Bing Webmaster ownership — who verifies domain ownership, GA4 property access.
- [ ] CRM choice (HubSpot or none) and booking tool choice (Cal.com or none) — both currently optional/flagged off.
- [x] LinkedIn: https://www.linkedin.com/company/asauvia/ — found by rendering the live site in Playwright; in footer, About, contact and Organization `sameAs`. No other profiles are linked from the live site.
- [ ] Domain/hosting access for deployment, DNS, and the sitemap/robots fix noted in PLAN.md (the live site currently 404s on both `/robots.txt` and `/sitemap.xml`).

## Note on the live site's rendered content
`asauvia.com` is a client-rendered SPA — a plain fetch only returns `<title>`, meta tags, and an empty `#root` div, so the section-by-section copy (hero line "Transforming Business Through Intelligent Automation," the deploy-log terminal, the three trust pillars, etc.) could not be independently re-confirmed by this tool in this pass. It is taken from the handover brief's own description, which reads as a direct account of the live, rendered page. Treat every quoted phrase from the live site as **unconfirmed** until the owner (or a rendered screenshot/browser pass) confirms exact current wording — it may have changed since the brief was written.

## Added 2026-10-06 — confirm before launch (raised by the page builders/reviewers)

Everything below is on the site now, written only from the live asauvia.com + the brief's stated practices, but each is a capability or practice claim the owner should confirm is true:

- **Still deliberately NOT on the site:** "SOC2 Type II Certified", "100% reliability", "Optimization successful (0.042ms)" from the live site. Confirm with evidence before adding any certification or metric.
- **Service capabilities:** SaaS billing/subscriptions (Product Engineering); React Native for mobile (Web & Mobile); infrastructure as code, cloud cost reviews, and ongoing infrastructure management after setup (Cloud & DevOps); AI-assisted extraction of unstructured data (Data); ongoing maintenance/retainer after launch (all services); accessible, tested interfaces (Web & Mobile — no WCAG level claimed).
- **Stack lists** on each service page name mainstream tools (Python, TypeScript, Node.js, React, Next.js, React Native, PostgreSQL, Docker, AWS/Azure/GCP, Terraform, Kubernetes, Prometheus/Grafana, GitHub Actions, OpenAI/Anthropic APIs, Slack API, Google Search Console, Lighthouse, Screaming Frog). They're presented as tools used, not partnerships — trim to what the team actually uses.
- **Security practices** (/security): access removed when the engagement ends; working inside client-owned accounts/credentials where possible; secrets kept out of source code; separate dev/test/prod environments; willing to sign the client's NDA or provide ours; willing to complete client security questionnaires.
- **Process wording** (/how-we-work): a formal client sign-off on the Design stage before build; fixed-scope changes handled as an agreed change to scope; dedicated-team priorities reordered via the shared backlog.
- **Contact form email delivery:** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (e.g. info@asauvia.com) and ideally `CONTACT_FROM_EMAIL` (requires verifying asauvia.com in Resend). Until then the form validates and shows a pre-filled `mailto:info@asauvia.com` fallback instead of silently failing. Optional bot protection: `TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY`. See `.env.example`.
- **Industries / Insights:** removed from navigation — no content yet. Add only with real experience / real articles.

### Legal pages (/privacy, /terms, /cookies) — lawyer must confirm
Drafted to describe the website as built (contact form only, no analytics or ad cookies, fonts self-hosted, Turnstile only if enabled). Not legal advice. Before launch, counsel should confirm:
1. Governing law and jurisdiction for the terms (deliberately not stated).
2. Legal entity name and registered address shown as data controller/operator (pages say only "Asauvia, Uttar Pradesh, India"; the live site's footer says "ASAUViA Systems" and its meta says "Asauvia Technologies").
3. Whether India's Digital Personal Data Protection Act 2023 applies and needs specific wording (notice contents, grievance officer, Data Protection Board route).
4. Whether an EU/UK representative under GDPR Art. 27 / UK GDPR is needed (site targets EU/UK buyers).
5. The stated legal bases (pre-contract steps at the person's request; legitimate interests).
6. International transfer wording and which safeguard is relied on (e.g. SCCs, UK IDTA).
7. Retention wording, and whether a concrete period should be set.
8. Whether hosting and email-delivery providers must be named, and that DPAs are in place.
9. Whether Cloudflare Turnstile is strictly necessary (no consent under ePrivacy/PECR) and should be named in the cookie policy.
10. Data-subject rights list and identity verification; consider portability / consent withdrawal.
11. Children clause / age threshold.
12. Enforceability of "no warranty" and "limitation of liability", and any statutory/consumer carve-outs.
13. The IP clause allowing viewing and sharing for evaluation.
14. Whether "continued use means acceptance" of changed terms is acceptable.
15. That "client engagements are governed by separate written agreements" matches the real contracts.
16. Before launch, re-check that no analytics, ad cookies, pixels or third-party embeds have been added.
