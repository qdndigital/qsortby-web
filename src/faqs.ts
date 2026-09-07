/**
 * Home-page FAQ — SINGLE SOURCE for both the rendered <details> list and the
 * FAQPage structured data in Base.astro.
 *
 * They used to be inline markup only, which meant the page carried eleven real
 * merchant questions and search engines saw none of them. Rendering both from
 * this array is what makes the schema impossible to leave stale: edit an answer
 * here and the rich-result payload changes with it.
 *
 * `a` is HTML (bold, links). Base.astro strips tags before writing the schema,
 * because FAQPage acceptedAnswer.text must be plain prose.
 */
import { REVERSE_TRIAL_DAYS } from './plans';

export interface Faq {
  /** The question, exactly as a merchant would ask it. */
  q: string;
  /** The answer as HTML — kept short enough to read without expanding twice. */
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: 'Shopify already sorts by best selling — why do I need this?',
    a:
      'Because the built-in sort is one fixed rule with no window you control, no sold-out handling, no per-shopper variation, and — the part that matters — <b>no way to tell whether it earned you anything</b>. QSortby lets you choose the signal and the window, demotes sold-out products automatically, can give each shopper their own order, and A/B-tests the result against your current sort with attributed revenue behind it. Install the Free plan on one collection and compare for yourself.',
  },
  {
    q: 'Is there really a free plan, or is it a trial?',
    a:
      `A real plan. Every install starts with <b>${REVERSE_TRIAL_DAYS} days of full access</b> to every feature, then drops to <b>Free</b> — one managed collection with real-time ranking, sold-out demotion and revenue attribution, running indefinitely at $0 with no card. Paid plans add collections, personalization and analytics; they don't turn the core back on, because it was never off.`,
  },
  {
    q: 'What algorithm does QSortby use to maximize conversion value?',
    a:
      'There\'s no single black-box formula. You pick the ranking signal per collection — sales velocity, revenue, margin, <b>conversion rate</b>, trending momentum, selling-fast, repeat-purchase, engagement or newest — and QSortby scores your catalog in real time, keeping in-stock products first. The part that answers "maximum conversion value": you can <b>A/B-test any sort against your current order</b>, and QSortby measures the funnel it drove (clicks → add-to-cart → <b>influenced revenue</b>, via last-touch attribution) and reports <b>statistical significance</b> — so the winning sort is the one the data proves, not a guess.',
  },
  {
    q: 'What can QSortby sort by?',
    a:
      'Eleven live signals: sales velocity, revenue (GMV), margin, conversion rate, trending momentum, selling-fast (velocity vs. remaining stock), repeat-purchase rate, engagement (clicks / CTR / dwell / add-to-cart), <b>review score</b> — read straight from the review app you already run, with nothing to set up — or newest, over a rolling or fixed window you choose. Save any signal-and-window pair as a named preset and point other collections at it. Per-visitor "For You" ranking blends weighted signals per shopper. Or order any collection by hand.',
  },
  {
    q: 'How do I know it actually lifts sales?',
    a:
      'QSortby runs an A/B test between the new sort and your current order, then attributes downstream orders (last-touch) to the feed a shopper interacted with — reporting click-through, add-to-cart and influenced revenue per variant with a significance verdict. You see the lift on your own store, you\'re not taking it on faith.',
  },
  {
    q: 'Will QSortby change my collections without me seeing it first?',
    a:
      'Only if you want it to. Every collection has a <b>before/after preview</b> — the exact order the next run would produce, side by side with what\'s live, as product cards with added, removed and reordered counted. You can switch auto-publish off entirely, so a new order waits for your approval, or keep the collection <b>manual</b> and let QSortby decide only the order of products you picked yourself. Every published order is stored with the configuration behind it, so you can always see what changed and when. Preview, manual order and exclusions are on <b>every plan, including Free</b>.',
  },
  {
    q: 'How does the per-shopper feed decide what to show?',
    a:
      'Two halves, and you can inspect both. On the <b>product</b> side, QSortby drafts a mood tag for each item — comfort, gifting, reassurance, effortless, classic and so on — and <b>you approve or rewrite them</b>; you can open any product and check its tag. On the <b>session</b> side, it reads what this visit is actually doing — pace, dwell, revisits, comparisons, hesitation before the cart — and leans the feed toward the matching tags. You set the signals and their weights yourself, so the rule behind any order is one you can read and edit &mdash; never a black box. <b>Pro</b> gets the read as a report while your storefront stays untouched; <b>Growth</b> applies it live per shopper, behind the same A/B test and attribution as everything else. Cost is capped per store: reads are cached per behaviour pattern and there\'s a daily ceiling, past which the rule-based classifier answers instead — the feed never degrades.',
  },
  {
    q: 'Is this a sorting app or an upsell app?',
    a:
      'Both, and they run off the same engine — that\'s the point. The ranking decides which products a shopper meets; the upsell surfaces decide what else goes in the basket. Because the offers are fed by the same live signals, they suggest what\'s <b>actually selling and actually in stock</b> instead of a static list you have to keep updating. Six surfaces: cart drawer and cart page, a free-shipping progress bar, frequently-bought-together on the product page, a thank-you-page offer, popups with AND/OR rules, and an offer inside checkout itself. The first two are on the <b>Free</b> plan.',
  },
  {
    q: 'Will the upsells slow my storefront down?',
    a:
      'No. Suggestions come off a pre-ranked pool rather than a fresh catalog scan, the per-shopper step is a cheap reorder of that pool, and nothing is added to your theme\'s critical path — the widgets render after the cart, not before it. If a request fails, the section simply doesn\'t appear; a cart never blocks on an offer.',
  },
  {
    q: 'Do I need to edit my theme?',
    a:
      'No code. QSortby maintains standard Shopify collections — add them like any other. One step does happen in the theme editor: flip the QSortby embed on so we can read the behavioral signals that drive ranking and attribution, and drop in a block if you want the personalized or best-seller feeds rendered on a page. Toggles only — nothing to edit.',
  },
  {
    q: 'What happens when a product sells out?',
    a:
      'It drops to the bottom automatically, and returns to its earned spot once restocked.',
  },
  {
    q: 'Will the product feeds look like the rest of my store?',
    a:
      'Yes — because they are rendered by <b>your own theme</b>, not by us. The best-seller and For You blocks can hand Shopify your theme\'s product-card snippet, so the cards come out with your markup, your CSS and your badges: a QSortby feed is indistinguishable from a native collection grid. Nothing to restyle, and nothing to redo when you change theme. Most apps ship their own card markup, which is why they never quite match.',
  },
  {
    q: 'Can I keep products that belong together side by side?',
    a:
      'Yes. <b>Pairing rules</b> group products by vendor, product type, tag or a metafield you choose, and hold the group together when the collection re-sorts — in an order you set inside the group, so the shirt leads, then the trousers, then the shoes. You also choose what happens when one of them sells out: keep the group as it is, hide the missing item, demote it, or split the group. Write the rule once and point any collection at it.',
  },
  {
    q: 'Can I see what a sort did after the fact?',
    a:
      'Yes. Every published order is stored together with the configuration that produced it, and orders are attributed back to the feed a shopper actually interacted with. So “what did this collection look like on the 12th, which settings produced that, and what did that version earn” is a question with an answer — not a guess from memory.',
  },
];
