import { defineType, defineField } from "sanity";

export default defineType({
  name: "boardMember",
  title: "Board / Leadership",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "type", title: "Card Type", type: "string", options: { list: [
      { title: "Board Member", value: "board" },
      { title: "Staff Leadership", value: "staff_leadership" },
      { title: "Staff", value: "staff" },
    ] }, validation: (r) => r.required() }),
    defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "order", title: "Sort Order", type: "number", validation: (r) => r.required() }),
    defineField({ name: "headshot", title: "Headshot", type: "image", options: { hotspot: true }, description: "Square crop; approved from leadership headshots pool" }),
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
  ],
  orderings: [{ title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "role", media: "headshot" } },
});
