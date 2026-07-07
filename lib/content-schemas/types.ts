export type FieldType =
  | "text"
  | "richtext"
  | "url"
  | "email"
  | "date"
  | "number"
  | "enum"
  | "list";

export type TokenRole =
  | "display_xl"
  | "display_large"
  | "display_medium"
  | "display_small"
  | "body_large"
  | "body"
  | "body_small"
  | "caption"
  | "label_chip"
  | "stat_number"
  | "quote";

export type BrandRuleId =
  | "palette_gold_black_white_only"
  | "no_grey"
  | "no_opacity"
  | "lot_display_only"
  | "poppins_body"
  | "no_text_over_photos"
  | "no_stock_photos"
  | "sacred_phrases_verbatim"
  | "left_justify_default"
  | "iridescent_on_white_only"
  | "no_friends_salutation"
  | "verified_stats_only"
  | "no_real_names_in_templates";

export interface FieldSpec {
  name: string;
  label: string;
  type: FieldType;
  minChars?: number;
  maxChars?: number;
  required: boolean;
  example?: string;
  position: string;
  tokenRole?: TokenRole;
  rules?: BrandRuleId[];
  enumValues?: string[];
  listItemMax?: number;
}

export type ImageSlotRole =
  | "hero"
  | "background"
  | "icon"
  | "headshot"
  | "logo"
  | "pattern"
  | "proof_photo"
  | "gallery";

export interface ImageSlotSpec {
  name: string;
  role: ImageSlotRole;
  widthPx?: number;
  heightPx?: number;
  aspectRatio?: string;
  required: boolean;
  approvedSource: string;
  notes?: string;
}

export type AssetCategory =
  | "social"
  | "print"
  | "email"
  | "deck"
  | "web"
  | "portal"
  | "doc";

export type OutputFormat = "png" | "pdf" | "html" | "jsx" | "jpg";

export interface AssetSchema {
  id: string;
  displayName: string;
  category: AssetCategory;
  widthPx?: number;
  heightPx?: number;
  fluid?: boolean;
  outputFormats: OutputFormat[];
  fields: FieldSpec[];
  imageSlots: ImageSlotSpec[];
  inheritedRules: BrandRuleId[];
  notes?: string;
}
