import type { AssetSchema } from "./types";

import { socialSquareSchema } from "./assets/social-square";
import { socialStorySchema } from "./assets/social-story";
import { socialCarouselSlideSchema } from "./assets/social-carousel-slide";
import { flyer8x11Schema } from "./assets/flyer-8x11";
import { flyer11x17Schema } from "./assets/flyer-11x17";
import { emailHeaderSchema } from "./assets/email-header";
import { emailHeroSchema } from "./assets/email-hero";
import { emailCtaSchema } from "./assets/email-cta";
import { emailTextSchema } from "./assets/email-text";
import { emailStatStripSchema } from "./assets/email-stat-strip";
import { emailEventDetailsSchema } from "./assets/email-event-details";
import { emailTierTableSchema } from "./assets/email-tier-table";
import { emailQuoteBlockSchema } from "./assets/email-quote-block";
import { sponsorDeckSlideSchema } from "./assets/sponsor-deck-slide";
import { oneSheetSchema } from "./assets/one-sheet";
import { impactReportPageSchema } from "./assets/impact-report-page";
import { eventCardSchema } from "./assets/event-card";
import { programLandingHeroSchema } from "./assets/program-landing-hero";
import { programLandingCtaSchema } from "./assets/program-landing-cta";
import { newsArticleSchema } from "./assets/news-article";
import { boardMemberCardSchema } from "./assets/board-member-card";
import { awardCardSchema } from "./assets/award-card";
import { jobPostingCardSchema } from "./assets/job-posting-card";
import { vendorPortalStepSchema } from "./assets/vendor-portal-step";

export const ASSET_SCHEMAS: Record<string, AssetSchema> = {
  [socialSquareSchema.id]: socialSquareSchema,
  [socialStorySchema.id]: socialStorySchema,
  [socialCarouselSlideSchema.id]: socialCarouselSlideSchema,
  [flyer8x11Schema.id]: flyer8x11Schema,
  [flyer11x17Schema.id]: flyer11x17Schema,
  [emailHeaderSchema.id]: emailHeaderSchema,
  [emailHeroSchema.id]: emailHeroSchema,
  [emailCtaSchema.id]: emailCtaSchema,
  [emailTextSchema.id]: emailTextSchema,
  [emailStatStripSchema.id]: emailStatStripSchema,
  [emailEventDetailsSchema.id]: emailEventDetailsSchema,
  [emailTierTableSchema.id]: emailTierTableSchema,
  [emailQuoteBlockSchema.id]: emailQuoteBlockSchema,
  [sponsorDeckSlideSchema.id]: sponsorDeckSlideSchema,
  [oneSheetSchema.id]: oneSheetSchema,
  [impactReportPageSchema.id]: impactReportPageSchema,
  [eventCardSchema.id]: eventCardSchema,
  [programLandingHeroSchema.id]: programLandingHeroSchema,
  [programLandingCtaSchema.id]: programLandingCtaSchema,
  [newsArticleSchema.id]: newsArticleSchema,
  [boardMemberCardSchema.id]: boardMemberCardSchema,
  [awardCardSchema.id]: awardCardSchema,
  [jobPostingCardSchema.id]: jobPostingCardSchema,
  [vendorPortalStepSchema.id]: vendorPortalStepSchema,
};

export function getSchema(id: string): AssetSchema | undefined {
  return ASSET_SCHEMAS[id];
}

export function listSchemas(): AssetSchema[] {
  return Object.values(ASSET_SCHEMAS);
}

export { BRAND_RULES, GLOBAL_INHERITED_RULES } from "./brand-rules";
export * from "./types";
