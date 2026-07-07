import type { AssetSchema } from "../types";
import { GLOBAL_INHERITED_RULES } from "../brand-rules";

export const programLandingCtaSchema: AssetSchema = {
  id: "program-landing-cta",
  displayName: "Program Landing Audience CTA Section",
  category: "web",
  fluid: true,
  outputFormats: ["jsx"],
  inheritedRules: GLOBAL_INHERITED_RULES,
  notes:
    "One of 5 audience blocks on a program page (Partners, Sponsors, Donors, Volunteers, Attendees). Repeats five times per program.",
  fields: [
    {
      name: "audience",
      label: "Audience",
      type: "enum",
      required: true,
      position: "meta",
      enumValues: ["partners", "sponsors", "donors", "volunteers", "attendees"],
    },
    {
      name: "block_headline",
      label: "Block headline",
      type: "text",
      minChars: 8,
      maxChars: 60,
      required: true,
      position: "block_title",
      tokenRole: "display_large",
    },
    {
      name: "block_body",
      label: "Block body (1-2 sentences)",
      type: "richtext",
      minChars: 60,
      maxChars: 320,
      required: true,
      position: "block_body",
      tokenRole: "body_large",
    },
    {
      name: "cta_label",
      label: "CTA label",
      type: "text",
      minChars: 3,
      maxChars: 24,
      required: true,
      position: "cta",
      tokenRole: "label_chip",
    },
    {
      name: "cta_url",
      label: "CTA URL",
      type: "url",
      required: true,
      position: "cta_meta",
    },
  ],
  imageSlots: [
    {
      name: "audience_photo",
      role: "proof_photo",
      aspectRatio: "3:2",
      required: false,
      approvedSource: "program_photo_pool",
    },
  ],
};
