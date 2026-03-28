import { defineType, defineField } from "sanity";

export default defineType({
  name: "programSponsorPackage",
  title: "Program Sponsor Package",
  type: "document",
  fields: [
    defineField({ name: "program", title: "Program", type: "reference", to: [{ type: "program" }], validation: (r) => r.required() }),
    defineField({ name: "tierName", title: "Tier Name", type: "string", validation: (r) => r.required(), description: 'e.g. "Day One", "Coastal Champion", "Bridge Builder"' }),
    defineField({ name: "tierGroup", title: "Tier Group", type: "string", options: { list: ["Title Sponsor", "Tier 1", "Tier 2", "Tier 3", "3-Month Package"] }, description: "Used for grouping on the page" }),
    defineField({ name: "price", title: "Price", type: "number", validation: (r) => r.required() }),
    defineField({ name: "priceDisplay", title: "Price Display", type: "string", description: 'How to show the price, e.g. "$50,000", "$40,000+"' }),
    defineField({ name: "deliverables", title: "Deliverables", type: "array", of: [{ type: "string" }], description: "One deliverable per line" }),
    defineField({ name: "boothSize", title: "Booth Size", type: "string", description: 'e.g. "20\'x30\' Prime", "10\'x10\'"' }),
    defineField({ name: "maxSponsors", title: "Max Sponsors (0 = unlimited)", type: "number", initialValue: 0 }),
    defineField({ name: "bloomerangFormUrl", title: "Bloomerang/Qgiv Form URL", type: "url", description: "Link to payment form. Set up in Bloomerang dashboard, paste URL here." }),
    defineField({ name: "sortOrder", title: "Sort Order", type: "number" }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
    defineField({ name: "featured", title: "Featured / Highlighted", type: "boolean", initialValue: false }),
  ],
  orderings: [
    { title: "Sort Order", name: "sortOrder", by: [{ field: "sortOrder", direction: "asc" }] },
  ],
  preview: {
    select: { title: "tierName", subtitle: "priceDisplay", programTitle: "program.title" },
    prepare({ title, subtitle, programTitle }) {
      return { title: `${title} — ${subtitle}`, subtitle: programTitle };
    },
  },
});
