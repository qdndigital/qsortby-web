/**
 * Pricing — SINGLE SOURCE OF TRUTH for the marketing site.
 *
 * These four tiers must stay in sync with the app, which is the real authority:
 *   - prices          → apps/dashboard/app/shopify.server.ts (`billing`)
 *   - plan names      → apps/dashboard/app/lib/plans.ts
 *   - what's included → apps/api/src/lib/plan-features.ts (`DEFAULT_PLAN_FEATURES`)
 *   - spec + rationale → docs/PRICING.md  ← read this before changing anything here
 *
 * Two DIFFERENT trials exist; do not conflate them in copy:
 *   1. REVERSE_TRIAL_DAYS (10) — every new install runs on full Growth features,
 *      then auto-downgrades to Free. The app is never locked or turned off.
 *      This is the acquisition hook and belongs in the headline.
 *   2. Shopify's payment trial (7 days) — only applies once a merchant picks a
 *      PAID plan; it's the window before the first charge. Billing detail, not a hook.
 */

/** Full-access window on install, before auto-downgrade to Free. */
export const REVERSE_TRIAL_DAYS = 10;
/**
 * Shopify Billing API trial on paid plans, before the first charge.
 *
 * Deliberately the SAME number as the reverse trial: the app sets
 * `trialDays: 10` on all three paid plans (apps/dashboard/app/shopify.server.ts)
 * so every merchant-facing surface quotes one figure. They still stack —
 * subscribing on day 10 of the reverse trial means free through day 20 — which
 * is why the two are separate constants rather than one.
 */
export const PAYMENT_TRIAL_DAYS = 10;

export interface Plan {
  /** Plan name as shown to merchants — matches ALL_PLAN_NAMES in the app. */
  name: string;
  /** Display price, USD/month. Free is a real $0 tier, not a trial. */
  price: string;
  /** Who it's for — one line, sits under the price. */
  desc: string;
  /**
   * Bullets. Keep to 6 max; anything longer belongs in the matrix.
   *
   * ORDER MATTERS BEYOND READABILITY: the home-page teaser renders only the
   * first few (TEASER_BULLETS in pages/index.astro), so the leading bullets are
   * the ones most visitors ever see. Lead each tier with the thing that tier
   * adds, not with what it inherits.
   */
  features: string[];
  /** Ribbon text, or null. Only one plan should carry one. */
  badge?: string;
  /** true → render as the visually emphasised card. */
  feat?: boolean;
  /** CTA label. All four tiers are self-serve — the emotional layer completed
   *  end-to-end validation, so Growth no longer needs a sales conversation. */
  cta: 'install' | 'demo';
}

export const PLANS: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    desc: 'Real ranking, running forever. Not a trial.',
    features: [
      '1 managed collection',
      'Real-time best-sellers ranking',
      'Sold-out auto-demotion',
      // The AOV surfaces start on Free deliberately: a merchant has to see an
      // upsell working before a tier that adds more of them means anything.
      'Cart upsell + free-shipping bar',
      'A/B testing + revenue attribution',
      '7-day ranking window',
    ],
    cta: 'install',
  },
  {
    name: 'Starter',
    price: '$29',
    desc: 'For stores ready to sort by more than one signal.',
    features: [
      'Up to 5 managed collections',
      'Personalized “For You” feed',
      'Bought-together + thank-you upsells',
      'Per-category rankings',
      'Configurable window — 24h to 30 days',
      'Manual order, preview & CSV export',
    ],
    cta: 'install',
  },
  {
    name: 'Pro',
    price: '$99',
    desc: 'For growing brands that want the numbers behind every sort.',
    features: [
      'Everything in Starter, unlimited',
      'Popup upsells + AND/OR display rules',
      'Customer events & analytics',
      'AI authoring — taxonomy + sort logic',
      'Emotional preview (read-only)',
      'Priority refresh & throughput',
    ],
    badge: 'Most popular',
    feat: true,
    cta: 'install',
  },
  {
    name: 'Growth',
    price: '$199',
    desc: 'For stores that want a storefront tuned to each shopper.',
    features: [
      'Everything in Pro',
      'Live shopper personalization (Emotional AI)',
      // Says out loud that the AI reaches INTO the upsells. Without this line
      // Growth reads as "buy another AI feature" instead of "everything you
      // already run gets smarter".
      'Emotional re-rank inside every upsell',
      'In-checkout upsell (Shopify Plus)',
      'Emotional Insights dashboard',
      'Highest AI limits',
    ],
    badge: 'Most advanced',
    cta: 'install',
  },
];

/** Feature-comparison matrix. `cells` is [Free, Starter, Pro, Growth].
 *  '✓' / '—' render as yes/no marks; anything else renders as literal text. */
export const MATRIX: { label: string; cells: string[] }[] = [
  { label: 'Real-time best-sellers ranking', cells: ['✓', '✓', '✓', '✓'] },
  { label: 'Sold-out auto-demotion', cells: ['✓', '✓', '✓', '✓'] },
  { label: 'A/B testing + revenue attribution', cells: ['✓', '✓', '✓', '✓'] },
  { label: 'Klaviyo & Google Analytics', cells: ['✓', '✓', '✓', '✓'] },
  { label: 'Managed collections', cells: ['1', '5', 'Unlimited', 'Unlimited'] },
  { label: 'Ranking window', cells: ['7 days', '24h – 30d', 'Any', 'Any'] },
  { label: 'Personalized “For You” feed', cells: ['—', '✓', '✓', '✓'] },
  { label: 'Per-category rankings', cells: ['—', '✓', '✓', '✓'] },
  // AOV surfaces. One surface is added per tier; the cap is on how many of ONE
  // kind you can run (a different cart offer in the drawer than on the cart
  // page). Keep in sync with DEFAULT_PLAN_FEATURES `upsell` in the app.
  { label: 'Cart upsell + free-shipping bar', cells: ['✓', '✓', '✓', '✓'] },
  { label: 'Bought-together + thank-you upsells', cells: ['—', '✓', '✓', '✓'] },
  { label: 'Popup upsells (any page)', cells: ['—', '—', '✓', '✓'] },
  { label: 'Upsell display rules (AND/OR)', cells: ['—', '—', '✓', '✓'] },
  { label: 'In-checkout upsell (Shopify Plus)', cells: ['—', '—', '—', '✓'] },
  { label: 'Upsells per type', cells: ['1', '3', 'Unlimited', 'Unlimited'] },
  { label: 'Customer events & analytics', cells: ['—', '—', '✓', '✓'] },
  { label: 'AI authoring (taxonomy + logic)', cells: ['—', '—', '✓', '✓'] },
  { label: 'Emotional AI — preview only', cells: ['—', '—', '✓', '✓'] },
  { label: 'Emotional AI — live per shopper', cells: ['—', '—', '—', '✓'] },
  { label: 'Emotional re-rank inside upsells', cells: ['—', '—', '—', '✓'] },
  { label: 'Emotional Insights dashboard', cells: ['—', '—', '—', '✓'] },
  { label: 'Orders / month', cells: ['200*', '2,000*', 'Unlimited', 'Unlimited'] },
  { label: 'Support', cells: ['Docs', 'Email', 'Priority', 'Priority'] },
];
