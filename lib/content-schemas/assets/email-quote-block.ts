import type { AssetSchema } from "../types";
import { GLOBAL_INHERITED_RULES } from "../brand-rules";

export const emailQuoteBlockSchema: AssetSchema = {
  id: "email-quote-block",
  displayName: "Email Quote / Testimonial Block",
  category: "email",
  fluid: true,
  outputFormats: ["html"],
  inheritedRules: GLOBAL_INHERITED_RULES,
  notes:
    "Pull quote from attendee, partner, or press. Use sparingly — one per email maximum.",
  fields: [
    {
      name: "quote_body",
      label: "Quote body",
      type: "richtext",
      minChars: 40,
      maxChars: 280,
      required: true,
      position: "quote",
      tokenRole: "quote",
    },
    {
      name: "attribution_name",
      label: "Attribution — name",
      type: "text",
      minChars: 3,
      maxChars: 60,
      required: true,
      position: "attribution_line_1",
      tokenRole: "caption",
    },
    {
      name: "attribution_role",
      label: "Attribution — role / context",
      type: "text",
      minChars: 0,
      maxChars: 80,
      required: false,
      position: "attribution_line_2",
      tokenRole: "caption",
    },
  ],
  imageSlots: [],
};
