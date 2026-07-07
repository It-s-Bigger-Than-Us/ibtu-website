import type { BrandRuleId } from "./types";

export const BRAND_RULES: Record<BrandRuleId, { title: string; detail: string }> = {
  palette_gold_black_white_only: {
    title: "Gold / Black / White only",
    detail: "#FFC700, #000, #FFF. No other colors, no tinted versions, no gradients between them.",
  },
  no_grey: {
    title: "No grey",
    detail: "Greys are not permitted, including on hover/disabled states. Use black, white, or gold only.",
  },
  no_opacity: {
    title: "No rgba opacity",
    detail: "Brand colors render at 100% opacity. No semi-transparent overlays.",
  },
  lot_display_only: {
    title: "LOT = display only",
    detail: "LOT Display is for headlines only, uppercase, 2-4px letter-spacing. Never for body copy.",
  },
  poppins_body: {
    title: "Poppins = body",
    detail: "Poppins for body, labels, numbers, nav. Fluid sizing via clamp().",
  },
  no_text_over_photos: {
    title: "No text over photos",
    detail: "Text sits on solid brand color blocks. Photos live in dedicated panels, not as background treatments.",
  },
  no_stock_photos: {
    title: "No stock photos",
    detail: "Only approved IBTU photography from the content library. Never use Getty, Unsplash, Pexels, or AI-generated imagery.",
  },
  sacred_phrases_verbatim: {
    title: "Sacred phrases verbatim",
    detail: "Approved taglines and mission statements are used word-for-word. No paraphrasing.",
  },
  left_justify_default: {
    title: "Left-justify default",
    detail: "All IBTU copy is left-justified unless the template explicitly calls for centered or other alignment.",
  },
  iridescent_on_white_only: {
    title: "Iridescent on white only",
    detail: "Iridescent pastel accents are permitted on white backgrounds only, never on black.",
  },
  no_friends_salutation: {
    title: "No 'Friends' salutation",
    detail: "Never open IBTU copy with 'Friends' as a salutation. Off-voice.",
  },
  verified_stats_only: {
    title: "Verified stats only",
    detail: "All statistics must match Reference/ibtu-stats-master.md. Do not invent, round, or estimate numbers.",
  },
  no_real_names_in_templates: {
    title: "No real names in templates",
    detail: "Template placeholders use generic names only. Real names are inserted per populated instance.",
  },
};

export const GLOBAL_INHERITED_RULES: BrandRuleId[] = [
  "palette_gold_black_white_only",
  "no_grey",
  "no_opacity",
  "lot_display_only",
  "poppins_body",
  "no_stock_photos",
  "sacred_phrases_verbatim",
  "left_justify_default",
  "verified_stats_only",
];
