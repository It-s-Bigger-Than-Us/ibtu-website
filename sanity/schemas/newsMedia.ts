import { defineType, defineField } from "sanity";

export default defineType({
  name: "newsMedia",
  title: "News & Media",
  type: "document",
  fields: [
    defineField({ name: "outlet", title: "Outlet", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title / Headline", type: "string" }),
    defineField({ name: "date", title: "Date", type: "string" }),
    defineField({ name: "coverageType", title: "Coverage Type", type: "string", options: { list: ["TV", "Print", "Online", "Radio", "Social", "Podcast"] } }),
    defineField({ name: "topic", title: "Topic", type: "string" }),
    defineField({ name: "url", title: "Link", type: "url" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
});
