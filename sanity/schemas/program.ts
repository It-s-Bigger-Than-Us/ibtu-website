import { defineType, defineField } from "sanity";

export default defineType({
  name: "program",
  title: "Program",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "pillar", title: "Pillar", type: "string", options: { list: ["Crisis & Disaster Stabilization", "School & Youth Stability", "Community Health & Resource Access"] } }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 3 }),
    defineField({ name: "description", title: "Description", type: "text", rows: 6 }),
    defineField({ name: "proofStats", title: "Proof Stats (pipe-separated)", type: "text", rows: 2 }),
    defineField({ name: "allTimeServed", title: "All-Time Served", type: "text", rows: 3 }),
    defineField({ name: "volunteerUrl", title: "Bloomerang Volunteer URL", type: "url" }),
    defineField({ name: "ctaText", title: "CTA Button Text", type: "string" }),
    defineField({ name: "schedule", title: "Schedule", type: "string" }),
    defineField({ name: "scheduleType", title: "Schedule Type", type: "string", options: { list: ["Annual", "Monthly", "Ongoing", "Weekly"] } }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["Active", "Upcoming"] } }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "cardImages", title: "Card Images", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "cardStat", title: "Card Stat (short)", type: "string" }),
    defineField({ name: "icon", title: "Icon Key", type: "string", options: { list: ["fire", "school", "youth", "beach", "gift", "wellness", "food"] } }),
    defineField({ name: "keyPartners", title: "Key Partners", type: "text", rows: 3 }),
    defineField({ name: "notableParticipants", title: "Notable Participants", type: "text", rows: 3 }),
  ],
  orderings: [{ title: "Sort Order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] }],
});
