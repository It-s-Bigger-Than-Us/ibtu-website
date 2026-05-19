import { defineType, defineField } from "sanity";

export default defineType({
  name: "vendorTier",
  title: "Vendor Tier",
  type: "document",
  description: "Pricing tiers for the vendor portal. Source of truth: Operations/VENDOR-BOOTH-PRICING-RESEARCH.md",
  fields: [
    defineField({ name: "name", title: "Tier Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: [
      { title: "Community Partner", value: "community_partner" },
      { title: "Nonprofit", value: "nonprofit" },
      { title: "Education", value: "education" },
      { title: "Health & Wellness", value: "health_wellness" },
      { title: "Small Business", value: "small_business" },
      { title: "Food Truck", value: "food_truck" },
      { title: "Corporate Activation", value: "corporate_activation" },
      { title: "Gala", value: "gala" },
    ] }, validation: (r) => r.required() }),
    defineField({ name: "priceMin", title: "Price Minimum (USD)", type: "number" }),
    defineField({ name: "priceMax", title: "Price Maximum (USD)", type: "number" }),
    defineField({ name: "nonprofitEligible", title: "Nonprofit Pricing Available", type: "boolean", initialValue: false }),
    defineField({ name: "boothSize", title: "Included Booth Size", type: "string", options: { list: ["6ft table", "10x10", "10x20", "Food Truck", "Custom"] } }),
    defineField({ name: "includes", title: "What's Included", type: "array", of: [{ type: "string" }], description: "Bullet list surfaced in the portal + tier comparison table" }),
    defineField({ name: "complianceRequirements", title: "Compliance Requirements", type: "array", of: [{ type: "string" }], description: "e.g. COI $1M/$2M, W-9, Business Tax Registration, Food Permit (TFF + LAFD Fire), Healthcare License" }),
    defineField({ name: "bloomerangFormUrl", title: "Payment Form URL", type: "url", description: "QuickBooks hosted invoice or Bloomerang Fundraising form — wired by Zapier on approval" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number", validation: (r) => r.required() }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrderAsc", by: [{ field: "sortOrder", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "category" } },
});
