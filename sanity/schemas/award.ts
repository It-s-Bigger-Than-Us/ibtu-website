import { defineType, defineField } from "sanity";

export default defineType({
  name: "award",
  title: "Award",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "presentedBy", title: "Presented By", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", title: "Year", type: "number", validation: (r) => r.required() }),
    defineField({ name: "date", title: "Exact Date", type: "string", description: "e.g. Dec 8, 2025" }),
    defineField({ name: "context", title: "Context", type: "string" }),
    defineField({ name: "notes", title: "Notes", type: "text", rows: 2 }),
    defineField({ name: "level", title: "Government Level", type: "string", options: { list: ["Federal", "State Assembly", "State Senate", "County", "City", "Institutional", "Nonprofit Partnership", "Media"] } }),
    defineField({ name: "program", title: "Related Program", type: "reference", to: [{ type: "program" }] }),
  ],
  orderings: [
    { title: "Year (newest)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
});
