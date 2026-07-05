/** Shared site constants. Replace the placeholder URLs before public launch. */
export const SITE_NAME = 'QSortby';
export const TAGLINE = 'Higher conversion from the catalog you already have.';

// Placeholder App Store handle — site launches alongside the app; swap for the live listing URL.
export const APP_STORE_URL = 'https://apps.shopify.com/qsortby';
// Placeholder cal.com booking link — replace with the real demo URL when provided.
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
