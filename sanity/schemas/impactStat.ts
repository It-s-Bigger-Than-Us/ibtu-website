import { defineType, defineField } from "sanity";

export default defineType({
  name: "impactStat",
  title: "Impact Stat",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Value", type: "string", validation: (r) => r.required(), description: 'e.g. "28,025" or "$4.5M+"' }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "year", title: "Year", type: "string", options: { list: ["2025", "Cumulative"] } }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
    defineField({ name: "displayOnWebsite", title: "Display on Website", type: "boolean", initialValue: true }),
    defineField({ name: "context", title: "Context / Notes", type: "text", rows: 2 }),
    defineField({ name: "source", title: "Source", type: "string", description: "Where this stat came from" }),
  ],
  orderings: [
    { title: "Sort Order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] },
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
