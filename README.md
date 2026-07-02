# QSortby — Marketing Website

Public marketing site for the **QSortby** Shopify app (real-time best-sellers / sales-velocity ranking). Built with **Astro + Tailwind**, deploys as static HTML to **Netlify**, and uses **Netlify Forms** for the support contact form.

This folder is standalone — it is **not** part of the qsortby pnpm/Turborepo workspace and has its own `package.json`.

## Stack

- [Astro](https://astro.build) 4 — static output, zero client framework
- Tailwind CSS 3 (design tokens in `tailwind.config.mjs`)
- Self-hosted fonts in `public/fonts/`: **Inter** (UI + display), **JetBrains Mono** (numerals/labels)
- Netlify Forms (the `support` form on `/support`)

## Design — "Polaris Pro · Ink + Emerald"

50% Shopify Polaris · 30% Linear · 20% Apple. White ground, **near-black primary**
(`#111418` buttons/brand) with **emerald** (`#00a36b`) reserved for live/links/data —
high-contrast and ownable rather than generic "Shopify green". Inter, light borders,
minimal shadow, no decorative page gradients, quiet/quick motion.

The hero centerpiece is a large **dark-mode** Shopify-admin dashboard mockup
(`AppShot.astro`) floating over a soft emerald glow; its **Best sellers** table reorders
its rows live as sales arrive (`public/assets/app.js` → `#js-board`). The final CTA is a
matching dark panel with an emerald button. Tokens live in `tailwind.config.mjs`.

## Develop

```bash
cd website
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview
```

## Deploy to Netlify

1. New site → connect this repo.
2. Set **Base directory** to `website`, **Build command** to `npm run build`, **Publish directory** to `website/dist` (the included `netlify.toml` already sets command/publish relative to the base dir).
3. Deploy. Netlify auto-detects the static `support` form on `/support`; submissions appear under **Forms** in the Netlify dashboard. Configure email/Slack notifications there.

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Landing — hero w/ live board, trust bar, problem/solution, product mockup, bento features, steps, stat band, integrations, testimonials, pricing teaser, FAQ, CTA |
| `/features` | Feature breakdown + product mockup |
| `/integrations` | Shopify-native surfaces (Online Store, metafields, Flow, POS, Markets) + ecosystem |
| `/use-cases` | Industry rows — fashion, beauty, electronics, food, home & living |
| `/pricing` | Plans — Starter $29 / Pro $99, 7-day trial (matches the Billing API) + comparison matrix |
| `/support` | Contact form (Netlify) + support info |
| `/thank-you` | Post-submit page (no-JS form fallback target; `noindex`) |
| `/privacy` | Privacy Policy (required for App Store listing) |
| `/terms` | Terms of Service |

Shared components: `AppShot.astro` (CSS dashboard mockup), `StickyCta.astro` (mobile install bar), plus the live leaderboard on the home hero (`public/assets/app.js`).

> **Placeholder content:** the home-page testimonials are illustrative (marked with an HTML comment) — replace with real, attributable merchant quotes before public launch.

## ⚠️ Update before publishing

These are placeholders — search and replace as needed:

- **`src/consts.ts`** → `APP_STORE_URL` (currently `https://apps.shopify.com/qsortby`) — set to the live App Store listing URL once published. `SUPPORT_EMAIL` is set to `quang.dinh@scentiment.com`.
- **Domain** → `astro.config.mjs` `site`, plus `qsortby.com` references in `public/sitemap.xml`, `public/robots.txt`, and the JSON-LD in `src/layouts/Base.astro`. Set to your real domain.
- **Pricing / claims** kept in sync with the actual Billing API (`Starter $29`, `Pro $99`, `7-day trial`) and the shipped feature set — per `docs/APP_STORE_SUBMISSION.md`, listing content must match the installed app.
- An OG share image is intentionally omitted (Twitter card is `summary`). Add `public/assets/og.png` (1200×630) and wire `og:image` in `Base.astro` if you want rich link previews.
