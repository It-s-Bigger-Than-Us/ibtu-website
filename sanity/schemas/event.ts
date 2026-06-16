import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "jobNumber", title: "Job Number", type: "string", description: "Format: DEPT-SEMESTER-PARTNER-TYPE-DATE" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, description: "URL path for the event detail page: /events/<slug>" }),
    defineField({ name: "program", title: "Program", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "pillar", title: "Pillar", type: "string", options: { list: ["Crisis & Disaster Stabilization", "School & Youth Stability", "Community Health & Resource Access"] } }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({ name: "dateStart", title: "Start Date", type: "string" }),
    defineField({ name: "dateEnd", title: "End Date", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "proofStats", title: "Proof Stats", type: "text", rows: 2 }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["Closed", "Active", "Upcoming", "Cancelled"] } }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "displayOnWebsite", title: "Display on Website", type: "boolean", initialValue: true }),
    defineField({ name: "shortDescription", title: "Short Description (gallery)", type: "text", rows: 2, description: "2-3 sentences for the gallery popup" }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [{ name: "caption", title: "Caption", type: "string" }],
      }],
    }),
    defineField({ name: "rsvpUrl", title: "RSVP / Get Involved URL", type: "url", description: "Fallback button link when no Eventbrite ID is set (or for non-Eventbrite registration like Bloomerang Volunteer / Qgiv)" }),
    // ── Eventbrite embedded checkout ──
    defineField({ name: "eventbriteId", title: "Eventbrite Event ID", type: "string", description: "Numeric ID from the Eventbrite checkout snippet (e.g. 1989189304758). Drives the embedded checkout widget on the event detail page." }),
    defineField({ name: "eventbriteWidgetHeight", title: "Eventbrite Widget Height (px)", type: "number", initialValue: 425, description: "From the snippet's iframeContainerHeight. Default 425; Coastal series uses 625." }),
    defineField({ name: "eventbriteBrandColor", title: "Eventbrite Brand Color", type: "string", description: "Optional themeSettings.brandColor hex (default gold #ffc700)" }),
    defineField({ name: "waysToGetInvolved", title: "Ways to Get Involved", type: "string", options: { list: ["Volunteer", "Donate", "Sponsor", "Attend", "Lunchtime Takeover", "Resource Fair", "Parent Empowerment Workshop", "Parent Empowerment Series", "Professional Development", "Staff Appreciation", "Young Community Builder Program Series", "Building Community Builders Workshop & Retreat"] } }),
    // ── Public calendar + signup filters ──
    defineField({ name: "vendorSignupOpen", title: "Vendor Signup Open", type: "boolean", initialValue: false, description: "Exposes this event in the vendor portal event picker" }),
    defineField({ name: "vendorSignupDeadline", title: "Vendor Signup Deadline", type: "date", description: "After this date, vendor RSVPs are closed for this event" }),
    defineField({ name: "volunteerSignupOpen", title: "Volunteer Signup Open", type: "boolean", initialValue: false, description: "Shows this event on the /volunteer page + calendar" }),
    defineField({ name: "volunteerSignupDeadline", title: "Volunteer Signup Deadline", type: "date" }),
    defineField({ name: "publicAttendance", title: "Public Attendance", type: "boolean", initialValue: true, description: "Community members can RSVP to attend" }),
    defineField({ name: "signupFilters", title: "Signup Filters (calendar chips)", type: "array", of: [{ type: "string" }], options: { list: [{ title: "Volunteer", value: "volunteer" }, { title: "Vendor", value: "vendor" }, { title: "Attendee", value: "attendee" }, { title: "Sponsor", value: "sponsor" }] }, description: "Drives which chip filters match this event on the /events calendar" }),
    // ── PRIVATE FIELDS — never exposed in website GROQ queries ──
    defineField({ name: "internalBudget", title: "INTERNAL: Budget", type: "number", description: "PRIVATE — never shown on website" }),
    defineField({ name: "internalNotes", title: "INTERNAL: Notes", type: "text", rows: 4, description: "PRIVATE — internal team notes" }),
    defineField({ name: "internalComms", title: "INTERNAL: Communications Log", type: "text", rows: 4, description: "PRIVATE — email/slack references" }),
    defineField({ name: "contractStatus", title: "INTERNAL: Contract Status", type: "string", description: "PRIVATE", options: { list: ["New", "Quote Sent", "Follow Up needed", "Invoiced", "PO Issued", "Accepted-In Procurement", "Complete / Archive", "Pass", "Evaluating", "Cancelled"] } }),
    defineField({ name: "poNumber", title: "INTERNAL: PO Number", type: "string", description: "PRIVATE — never shown on website" }),
    defineField({ name: "contractAmount", title: "INTERNAL: Contract Amount", type: "number", description: "PRIVATE — never shown on website" }),
  ],
  orderings: [
    { title: "Year (newest)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "jobNumber", media: "" },
  },
});
