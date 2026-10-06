# DESIGN_PLAN — visual direction for the Asauvia international site

**Status: revised.** The first pass (an original "dawn-over-ink" dark palette, documented in git history/below-superseded) was rejected by the owner as "too worst design." The owner then dropped in the actual source of the Optimus reference (`optimus-the-ai-platform-to-build-and-ship/`, since removed from the repo — see PLAN.md) and asked for the same theme: a minimalist, premium look. This revision studies that real code (not the handover brief's paraphrase of it, which turned out to be wrong on at least one point — see below) and adopts its design system directly, applied to our own honest content.

## What the actual Optimus code is (correcting the brief's description)

The original handover brief described Optimus as a near-black dark theme. The real code (`app/globals.css`, `app/layout.tsx`) says otherwise: it's a **light, warm-neutral theme** — a warm off-white background (`oklch(0.985 0.002 90)`) with warm near-black text (`oklch(0.12 0.01 60)`), no dark-mode class ever applied. Its CSS declares three fonts — Instrument Sans, Instrument Serif, JetBrains Mono — but **measured in a browser, every headline actually renders in Instrument Sans**: its `font-display` utility reads a CSS variable that `@theme inline` never emits, so the serif never applies. The real look is Instrument Sans at very large sizes (160px hero, 60px section heads, weight 400, tight tracking) plus **JetBrains Mono** for eyebrow labels and technical micro-copy. (An earlier revision of this doc called the serif "the deliberate choice that makes it premium" — that was read from source, not from the rendered page, and was wrong.) Buttons are full pills (`rounded-full`), the header is a nav bar that condenses into a floating, blurred pill card on scroll, sections are separated by hairline borders rather than card shadows, and numbered feature rows (`01`, `02`...) pair a mono index with a serif headline and a small line-art visual.

## What we took, and what we didn't

**Took directly**, because the owner asked for this exact theme:
- The warm-paper / near-black palette, as real named tokens (not a "tinted black" standing in for neutral — it's a deliberate warm hue, confirmed in the compiled CSS: `--background:#fafaf9`, `--foreground:#0c0806`).
- The type system as it actually renders: Instrument Sans for everything including display, JetBrains Mono for eyebrows/technical labels.
- Pill buttons and the floating condensed nav-on-scroll behavior.
- Hairline-divided, numbered rows for the services list (rather than a card grid).
- A single orchestrated load-in moment on the hero (fade-up), done in pure CSS rather than JS state to avoid the `react-hooks/set-state-in-effect` lint error Optimus's own mount-triggered `useState`/`useEffect` pattern would hit under this project's stricter lint config.

**Did not take**, because the handover's own content rules (Phase 9) still apply even though the visual theme changed:
- Optimus's hero stats marquee cites fabricated client metrics (Netflix, Stripe, Linear, Notion). We kept the marquee *mechanic* for the trust strip but filled it with our real tech stack, not invented client results.
- No fake "all systems operational" status — the footer's status line is the one honestly verifiable thing we can say (the time-zone model), not a fabricated uptime claim.
- We didn't pull in Optimus's actual dependency stack (Radix UI, shadcn's CVA button, `@react-three/fiber`, `@vercel/analytics`) — we matched the *visual outcome* with our own lighter Tailwind components, since copying the implementation wasn't what was asked for and keeps our dependency surface smaller until the 3D/analytics phases are actually scoped.

## Token system (current)

| Token | Hex (compiled) | Role |
|---|---|---|
| `background` | `#fafaf9` | Page background — warm paper, not pure white |
| `foreground` | `#0c0806` | Primary text, primary button fill |
| `muted` | `#f1f0ed` | Raised panels (case-studies "coming soon" block) |
| `muted-foreground` | `#5c534d` | Secondary text |
| `border` | `#dcdbd6` | Hairlines everywhere; no card shadows |
| `signal` | `#2c965d` | Reserved for the one literal live/status indicator |

**Type:** Instrument Sans for body, UI, *and* display (`.font-display` points at `--font-sans`; hero `clamp(3rem, 8.75vw, 8rem)`, section H2 60px, row H3 36px, all weight 400 with tight tracking), JetBrains Mono (`--font-mono`) for eyebrows and numbered indices only.

**Layout:** full-bleed sections, hairline `border-t`/`border-b` dividers, numbered rows for services and the process steps, a floating pill nav that condenses on scroll, pill CTAs. Narrow (`~46rem`) centered columns for editorial text (problem statement, markets, FAQ, CTA); wider rows for services/process.

## Still true from the original anchor

The IST-ahead-of-every-market fact (see PLAN.md) remains the one ownable piece of content — it now shows up as plain copy (hero micro-line, markets section, footer status line) rather than as a bespoke color concept. The visual premium-ness now comes from the Optimus-derived type/palette/layout system instead.

## Open

Confirm with the owner whether Instrument Sans/Serif + JetBrains Mono should become the actual locked brand typefaces going forward, or are a placeholder until real brand fonts are supplied (see CONTENT_GAPS.md).
