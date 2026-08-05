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
/** Shopify Billing API trial on paid plans, before the first charge. */
export const PAYMENT_TRIAL_DAYS = 7;

export interface Plan {
  /** Plan name as shown to merchants — matches ALL_PLAN_NAMES in the app. */
  name: string;
  /** Display price, USD/month. Free is a real $0 tier, not a trial. */
  price: string;
  /** Who it's for — one line, sits under the price. */
  desc: string;
  /** Bullets. Keep to 6 max; anything longer belongs in the matrix. */
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
      'A/B testing + revenue attribution',
      '7-day ranking window',
      'Klaviyo & Google Analytics',
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
      'Per-category rankings',
      'Configurable window — 24h to 30 days',
      'Manual order, preview & CSV export',
      'Email support',
    ],
    cta: 'install',
  },
  {
    name: 'Pro',
    price: '$99',
    desc: 'For growing brands that want the numbers behind every sort.',
    features: [
      'Everything in Starter, unlimited',
      'Customer events & analytics',
      'AI authoring — taxonomy + sort logic',
      'Emotional preview (read-only)',
      'Priority refresh & throughput',
      'Priority support',
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
      'Emotional Insights dashboard',
      'Highest AI limits',
      'Onboarding & tuning support',
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
  { label: 'Customer events & analytics', cells: ['—', '—', '✓', '✓'] },
  { label: 'AI authoring (taxonomy + logic)', cells: ['—', '—', '✓', '✓'] },
  { label: 'Emotional AI — preview only', cells: ['—', '—', '✓', '✓'] },
  { label: 'Emotional AI — live per shopper', cells: ['—', '—', '—', '✓'] },
  { label: 'Emotional Insights dashboard', cells: ['—', '—', '—', '✓'] },
  { label: 'Orders / month', cells: ['200*', '2,000*', 'Unlimited', 'Unlimited'] },
  { label: 'Support', cells: ['Docs', 'Email', 'Priority', 'Priority'] },
];
