import { defineType, defineField } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Financial & Foundation", "Brand & In-Kind", "Government & Civic", "Education", "Health & Wellness", "Community & Crisis", "Food & Resource", "Media & Entertainment", "Operations Support"] } }),
    defineField({ name: "partnerType", title: "Partner Type", type: "string" }),
    defineField({ name: "pillar", title: "Associated Pillar", type: "string" }),
    defineField({ name: "programsEvents", title: "Programs / Events", type: "string" }),
    defineField({ name: "tier", title: "Tier", type: "string", options: { list: ["Major", "Key", "Supporting", "Community"] } }),
    defineField({ name: "featuredOnWebsite", title: "Featured on Website", type: "boolean", initialValue: true, description: "Uncheck to hide this partner from the website" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "url", title: "Website URL", type: "url" }),
  ],
  orderings: [
    { title: "Name A-Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
});
