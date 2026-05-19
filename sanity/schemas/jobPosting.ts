import { defineType, defineField } from "sanity";

export default defineType({
  name: "jobPosting",
  title: "Job Posting",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Role Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "employmentType", title: "Employment Type", type: "string", options: { list: [
      { title: "Full-time", value: "full_time" },
      { title: "Part-time", value: "part_time" },
      { title: "Contract", value: "contract" },
      { title: "Internship", value: "internship" },
      { title: "Volunteer Lead", value: "volunteer_lead" },
    ] }, validation: (r) => r.required() }),
    defineField({ name: "department", title: "Department", type: "string", options: { list: [
      { title: "Programs", value: "programs" },
      { title: "Development", value: "development" },
      { title: "Marketing", value: "marketing" },
      { title: "Operations", value: "operations" },
      { title: "Finance", value: "finance" },
      { title: "Volunteer", value: "volunteer" },
      { title: "Brand & Creative", value: "brand_creative" },
    ] }, validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string", initialValue: "Los Angeles, CA" }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }], validation: (r) => r.required() }),
    defineField({ name: "howToApply", title: "How to Apply", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: [
      { title: "Open", value: "open" },
      { title: "Closed", value: "closed" },
      { title: "Talent Pool", value: "talent_pool" },
    ] }, initialValue: "open" }),
    defineField({ name: "datePosted", title: "Date Posted", type: "date", validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Date Posted (newest)", name: "datePostedDesc", by: [{ field: "datePosted", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "department" } },
});
