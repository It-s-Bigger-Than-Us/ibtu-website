import type { AssetSchema } from "../types";
import { GLOBAL_INHERITED_RULES } from "../brand-rules";

export const emailTextSchema: AssetSchema = {
  id: "email-text",
  displayName: "Email Text Block",
  category: "email",
  fluid: true,
  outputFormats: ["html"],
  inheritedRules: GLOBAL_INHERITED_RULES,
  fields: [
    {
      name: "section_heading",
      label: "Section heading",
      type: "text",
      minChars: 0,
      maxChars: 60,
      required: false,
      position: "heading",
      tokenRole: "display_small",
    },
    {
      name: "body",
      label: "Body copy (paragraphs)",
      type: "richtext",
      minChars: 40,
      maxChars: 800,
      required: true,
      position: "body",
      tokenRole: "body",
    },
    {
      name: "signoff",
      label: "Sign-off line",
      type: "text",
      minChars: 0,
      maxChars: 60,
      required: false,
      position: "signoff",
      tokenRole: "body",
      example: "With gratitude,\nThe IBTU Team",
    },
  ],
  imageSlots: [],
};
