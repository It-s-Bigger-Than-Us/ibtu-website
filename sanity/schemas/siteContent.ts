import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteContent",
  title: "Site Content",
  type: "document",
  fields: [
    defineField({ name: "page", title: "Page", type: "string", validation: (r) => r.required(), options: { list: ["homepage", "about", "programs", "impact", "awards", "partners", "get-involved", "contact", "fire-relief", "events"] } }),
    defineField({ name: "section", title: "Section", type: "string", validation: (r) => r.required() }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "subheadline", title: "Subheadline", type: "text", rows: 2 }),
    defineField({ name: "body", title: "Body Copy", type: "text", rows: 6 }),
    defineField({ name: "ctaText", title: "CTA Text", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
  ],
  preview: {
    select: { title: "page", subtitle: "section" },
    prepare({ title, subtitle }) {
      return { title: `${title} — ${subtitle}` };
    },
  },
});
