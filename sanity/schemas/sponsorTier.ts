import { defineType, defineField } from "sanity";

export default defineType({
  name: "sponsorTier",
  title: "Sponsor Tier",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tier Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "amount", title: "Amount", type: "string" }),
    defineField({ name: "description", title: "Benefits Description", type: "text", rows: 3 }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
  ],
  orderings: [
    { title: "Sort Order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] },
  ],
});
