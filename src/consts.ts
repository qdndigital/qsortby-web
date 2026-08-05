/** Shared site constants. */
export const SITE_NAME = 'QSortby';
export const TAGLINE = 'Every sort has to prove it made you money.';

// Live App Store listing. Every primary CTA on the site points here.
export const APP_STORE_URL = 'https://apps.shopify.com/qsortby';
// TODO: still a placeholder booking link — every "Book a demo" button 404s until
// this is replaced. Those are all SECONDARY CTAs (primary is install), so the
// funnel works meanwhile, but fix before running paid traffic.
export const DEMO_URL = 'https://cal.com/qsortby/demo';

// User guide — canonical page lives at /guide; also served on the guide.qsortby.com
// subdomain (same Netlify site, see netlify.toml). Point links at the subdomain.
export const GUIDE_URL = 'https://guide.qsortby.com';

export const SUPPORT_EMAIL = 'support@qsortby.com';

// Primary nav.
export const NAV = [
  ['/use-cases', 'Use cases'],
  ['/how-it-works', 'How it works'],
  ['/integrations', 'Integrations'],
  ['/pricing', 'Pricing'],
  [GUIDE_URL, 'Guide'],
] as const;
