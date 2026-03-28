import { defineType, defineField } from "sanity";

export default defineType({
  name: "orgTimeline",
  title: "Org Timeline",
  type: "document",
  fields: [
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "detail", title: "Detail", type: "text", rows: 4 }),
    defineField({ name: "pillar", title: "Pillar / Category", type: "string" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
  ],
  orderings: [
    { title: "Sort Order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
    prepare({ title, subtitle }) {
      return { title, subtitle: String(subtitle) };
    },
  },
});
