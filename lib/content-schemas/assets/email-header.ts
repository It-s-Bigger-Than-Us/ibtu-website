import type { AssetSchema } from "../types";
import { GLOBAL_INHERITED_RULES } from "../brand-rules";

export const emailHeaderSchema: AssetSchema = {
  id: "email-header",
  displayName: "Email Header (600×300)",
  category: "email",
  widthPx: 600,
  heightPx: 300,
  outputFormats: ["png"],
  inheritedRules: GLOBAL_INHERITED_RULES,
  fields: [
    {
      name: "program_tag",
      label: "Program tag",
      type: "text",
      minChars: 3,
      maxChars: 22,
      required: true,
      position: "top_left",
      tokenRole: "label_chip",
    },
    {
      name: "headline",
      label: "Headline",
      type: "text",
      minChars: 8,
      maxChars: 45,
      required: true,
      position: "center_left",
      tokenRole: "display_medium",
    },
    {
      name: "subhead",
      label: "Subhead",
      type: "text",
      minChars: 0,
      maxChars: 60,
      required: false,
      position: "below_headline",
      tokenRole: "body",
    },
  ],
  imageSlots: [
    {
      name: "logo_lockup",
      role: "logo",
      required: true,
      approvedSource: "brand_logo_lockups",
      notes: "Top-right corner, small.",
    },
  ],
};
