/**
 * FAQ — SINGLE SOURCE for both the categorized <details> list on /faqs and
 * the FAQPage structured data in Base.astro.
 *
 * `a` is HTML (bold, links). Base.astro strips tags before writing the
 * schema, because FAQPage acceptedAnswer.text must be plain prose.
 */

export interface FaqItem {
  /** The question, exactly as a merchant would ask it. */
  q: string;
  /** The answer as HTML — kept short enough to read without expanding twice. */
  a: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: 'Getting Started',
    items: [
      {
        q: 'What does QSortby do?',
        a: 'QSortby is a Shopify app that uses data and algorithms to automatically reorder products inside your collections and personalizes product display per shopper. It pushes bestsellers to the front and demotes sold-out products automatically.',
      },
      {
        q: 'How does QSortby work?',
        a: 'You pick or create a collection, attach a sorting strategy (based on sales, inventory, shopper behavior...), and QSortby continuously updates product order and personalizes the display for each visitor.',
      },
      {
        q: 'Does QSortby require theme code changes?',
        a: 'No. QSortby writes the order directly via Shopify — no theme code needed.',
      },
      {
        q: 'What kind of store is QSortby for?',
        a: 'Stores that want their collection pages to stay aligned with real-time inventory, sales trends, and shopper behavior.',
      },
    ],
  },
  {
    title: 'Plans & Pricing',
    items: [
      {
        q: 'Does QSortby have a free plan?',
        a: "Yes, there's a free plan so you can try QSortby with a limited set of features. If you'd like to explore more, feel free to contact us.",
      },
      {
        q: 'How much do paid plans cost?',
        a: 'Check our <a href="/pricing">pricing page</a> for full details.',
      },
    ],
  },
  {
    title: 'Sorting & Personalization',
    items: [
      {
        q: 'How often does QSortby resort my collections?',
        a: 'Sorting runs in real time on every plan, including free. You can change your sorting logic anytime and it updates instantly.',
      },
      {
        q: 'What signals does QSortby sort on?',
        a: 'Sales, inventory, trending products, and shopper behavior — plus more.',
      },
      {
        q: 'What does per-shopper personalization mean?',
        a: 'Different visitors can see a different product order in the same collection, based on their browsing/purchase behavior — instead of one fixed order for everyone.',
      },
      {
        q: 'How does QSortby handle sold-out products?',
        a: "It automatically pushes sold-out or out-of-stock variants down so they don't occupy prime real estate shoppers can't actually buy.",
      },
      {
        q: 'Can I keep related products grouped together?',
        a: "Yes. QSortby can automatically keep related products grouped together while still following your collection's sorting rules.",
      },
    ],
  },
  {
    title: 'Analytics & Support',
    items: [
      {
        q: 'Does QSortby provide analytics?',
        a: 'Yes. The app gives you analytics to track the impact QSortby has on your store, along with insights into customer behavior.',
      },
      {
        q: 'How do I contact QSortby support?',
        a: 'You can reach us via live chat in the app or by emailing <a href="mailto:qdnapps@gmail.com">qdnapps@gmail.com</a>. Our team is available 24/7.',
      },
      {
        q: 'Can I change or cancel my plan anytime?',
        a: 'Billing is handled through Shopify — you can upgrade, downgrade, or cancel from your Shopify admin.',
      },
    ],
  },
];

// Flat list — what Base.astro's FAQPage structured data reads.
export const FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((c) => c.items);
