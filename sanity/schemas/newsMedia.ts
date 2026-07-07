import { defineType, defineField } from "sanity";

export default defineType({
  name: "newsMedia",
  title: "News & Media",
  type: "document",
  fields: [
    defineField({ name: "kind", title: "Kind", type: "string", options: { list: [
      { title: "Press Mention", value: "press_mention" },
      { title: "Announcement", value: "announcement" },
      { title: "Impact Story", value: "impact_story" },
      { title: "Partnership", value: "partnership" },
      { title: "Award", value: "award" },
    ] }, initialValue: "press_mention", description: "Press mentions link out; announcements/impact stories render inline on /news" }),
    defineField({ name: "outlet", title: "Outlet / Source", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title / Headline", type: "string" }),
    defineField({ name: "slug", title: "Slug (for internal articles)", type: "slug", options: { source: "title" }, description: "Required for internal articles (kind = announcement / impact_story)" }),
    defineField({ name: "date", title: "Date", type: "string" }),
    defineField({ name: "coverageType", title: "Coverage Type (press mentions)", type: "string", options: { list: ["TV", "Print", "Online", "Radio", "Social", "Podcast"] } }),
    defineField({ name: "topic", title: "Topic", type: "string" }),
    defineField({ name: "url", title: "External Link", type: "url", description: "For press mentions, this is where the article lives externally" }),
    defineField({ name: "deck", title: "Deck / Excerpt", type: "text", rows: 2, description: "1-2 sentence teaser for the card" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body (for internal articles)", type: "array", of: [{ type: "block" }], description: "Required for kind = announcement / impact_story" }),
    defineField({ name: "program", title: "Related Program", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "featured", title: "Featured on News Index", type: "boolean", initialValue: false }),
  ],
  orderings: [{ title: "Date (newest)", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
});
