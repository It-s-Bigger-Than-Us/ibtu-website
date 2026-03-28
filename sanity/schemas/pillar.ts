import { defineType, defineField } from "sanity";

export default defineType({
  name: "pillar",
  title: "Pillar",
  type: "document",
  fields: [
    defineField({ name: "pillarName", title: "Pillar Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 3 }),
    defineField({ name: "pageDescription", title: "Page Description", type: "text", rows: 4 }),
    defineField({ name: "headlineStat", title: "2025 Headline Stat", type: "string" }),
    defineField({ name: "keyMetric", title: "Key Metric", type: "string" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
  ],
});
