/**
 * Add 3 new programs: Gala, Community Builder Link-Ups, Incubation Academy
 * Run: SANITY_TOKEN=xxx npx tsx scripts/add-new-programs.ts
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "0m4ngfcw", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false,
});

async function seed() {
  console.log("Adding 3 new programs...\n");

  const programs = [
    {
      _type: "program",
      _id: "prog-gala",
      title: "A City United — Annual Gala",
      slug: { _type: "slug", current: "gala" },
      pillar: "Community Health & Resource Access",
      tagline: "One room. One Los Angeles. One Giving Tuesday. Civic leaders, creators, influencers, healthcare partners, first responders, educators, corporate champions, and neighbors gather under one roof — not for a gala as usual, but for a live, city-wide collaboration. It's glam with a purpose, fuel our impact.",
      description: "A City United is IBTU's flagship annual fundraising gala — a celebration of six years of community infrastructure, bringing together the people and partners who make the work possible. The evening features live performances, community impact presentations, partner recognition, and a call to action for the year ahead.",
      proofStats: "Celebrating 6 years | 300+ partners | 62,475+ students served | 150,000+ families reached",
      allTimeServed: "Six consecutive years of community-built infrastructure across Los Angeles and beyond.",
      ctaText: "Get Tickets",
      schedule: "Annual — December (Giving Tuesday)",
      scheduleType: "Annual",
      status: "Upcoming",
      sortOrder: 8,
      cardStat: "Giving Tuesday 2026",
      icon: "gift",
    },
    {
      _type: "program",
      _id: "prog-community-builder-linkups",
      title: "Community Builder Link-Ups",
      slug: { _type: "slug", current: "community-builder-linkups" },
      pillar: "Community Health & Resource Access",
      tagline: "Community Builders don't just show up for events — they show up for each other. Link-Ups bring together the people who power IBTU's work for connection, conversation, and collaboration outside of service hours.",
      description: "Community Builder Link-Ups are recurring gatherings for IBTU's volunteer network and community partners. From networking mixers and skill-shares to neighborhood walks and creative workshops, Link-Ups strengthen the bonds between the people who make community infrastructure possible.",
      proofStats: "10,000+ volunteers in database | 7,500+ active Community Builders | Recurring activations",
      allTimeServed: "Building deeper connections within IBTU's community of 10,000+ volunteers and partners.",
      ctaText: "Join a Link-Up",
      schedule: "Recurring — throughout the year",
      scheduleType: "Ongoing",
      status: "Active",
      sortOrder: 9,
      cardStat: "Recurring events",
      icon: "wellness",
    },
    {
      _type: "program",
      _id: "prog-incubation-academy",
      title: "IBTU Incubation Academy",
      slug: { _type: "slug", current: "incubation-academy" },
      pillar: "Community Health & Resource Access",
      tagline: "From the community, for the community. The IBTU Incubation Academy nurtures emerging leaders, small businesses, and community organizations with the tools, mentorship, and infrastructure to build lasting impact.",
      description: "The IBTU Incubation Academy is a new initiative designed to support community-based entrepreneurs, grassroots organizations, and emerging leaders with structured programming, mentorship, and access to IBTU's partner network. Details coming soon.",
      proofStats: "Coming Soon",
      allTimeServed: "Program in development — launching 2026-2027.",
      ctaText: "Learn More",
      schedule: "Coming Soon",
      scheduleType: "Ongoing",
      status: "Upcoming",
      sortOrder: 10,
      cardStat: "Coming Soon",
      icon: "youth",
    },
  ];

  for (const p of programs) await client.createOrReplace(p);
  console.log("✅ 3 new programs created:");
  console.log("  - A City United Gala (12/1/2026, Biltmore Hotel, Giving Tuesday)");
  console.log("  - Community Builder Link-Ups (recurring)");
  console.log("  - IBTU Incubation Academy (coming soon)");

  // Add gala event
  console.log("\nAdding gala event...");
  await client.createOrReplace({
    _type: "event",
    _id: "ev-gala-2026",
    title: "A City United — IBTU's Annual Gala",
    jobNumber: "DEV-FY26-015-IBTU-Luncheon-120126",
    program: { _type: "reference", _ref: "prog-gala" },
    pillar: "Community Health & Resource Access",
    year: 2026,
    dateStart: "12/01/2026",
    location: "The Biltmore Hotel, Los Angeles",
    description: "One room. One Los Angeles. One Giving Tuesday. Celebrating six years of community infrastructure. Dress code: LA Glam.",
    status: "Upcoming",
    featured: true,
    displayOnWebsite: true,
    rsvpUrl: "https://secure.qgiv.com/for/acityunitedgala12126",
  });
  console.log("  ✅ Gala event created (12/1/2026, Biltmore Hotel)");

  // Add sponsor packages for gala
  console.log("\nAdding gala sponsor packages...");
  const galaPkgs = [
    { _id: "sp-gala-01", tierName: "Presenting Sponsor", tierGroup: "Title Sponsor", price: 50000, priceDisplay: "$50,000", featured: true, sortOrder: 1, deliverables: ["Premier naming rights on all gala materials", "Keynote speaking opportunity", "Premium table seating (10 guests)", "Logo dominance on step & repeat, signage, and all print", "Solo social media campaign (3 posts + stories)", "Logo in email header for all gala communications", "Custom impact recap report", "Press release inclusion with quote"], bloomerangFormUrl: "https://secure.qgiv.com/for/acityunitedgala12126" },
    { _id: "sp-gala-02", tierName: "Gold Table", tierGroup: "Tier 1", price: 25000, priceDisplay: "$25,000", sortOrder: 2, deliverables: ["Table seating (10 guests)", "Logo on gala signage and program", "Solo social media post", "Logo in email body", "On-stage recognition", "Post-event metrics report"], bloomerangFormUrl: "https://secure.qgiv.com/for/acityunitedgala12126" },
    { _id: "sp-gala-03", tierName: "Silver Table", tierGroup: "Tier 2", price: 15000, priceDisplay: "$15,000", sortOrder: 3, deliverables: ["Table seating (10 guests)", "Logo grouped on gala program", "Carousel social media feature", "Group email recognition", "Post-event recap inclusion"], bloomerangFormUrl: "https://secure.qgiv.com/for/acityunitedgala12126" },
    { _id: "sp-gala-04", tierName: "Community Champion", tierGroup: "Tier 2", price: 10000, priceDisplay: "$10,000", sortOrder: 4, deliverables: ["Half table (5 guests)", "Logo on gala program", "Group social media post", "Community recognition"], bloomerangFormUrl: "https://secure.qgiv.com/for/acityunitedgala12126" },
    { _id: "sp-gala-05", tierName: "Supporter", tierGroup: "Tier 3", price: 5000, priceDisplay: "$5,000", sortOrder: 5, deliverables: ["2 tickets", "Listed on gala program", "Group social acknowledgment"], bloomerangFormUrl: "https://secure.qgiv.com/for/acityunitedgala12126" },
    { _id: "sp-gala-06", tierName: "Individual Ticket", tierGroup: "Tier 3", price: 500, priceDisplay: "$500", sortOrder: 6, deliverables: ["1 ticket to A City United", "Name listed on community wall"], bloomerangFormUrl: "https://secure.qgiv.com/for/acityunitedgala12126" },
  ];

  for (const pkg of galaPkgs) {
    await client.createOrReplace({
      _type: "programSponsorPackage",
      active: true,
      program: { _type: "reference", _ref: "prog-gala" },
      ...pkg,
    });
  }
  console.log(`  ✅ ${galaPkgs.length} gala sponsor packages created`);

  // Add community builder link-up sponsor packages
  console.log("\nAdding Community Builder Link-Up packages...");
  const linkupPkgs = [
    { _id: "sp-linkup-01", tierName: "Series Sponsor", tierGroup: "Title Sponsor", price: 10000, priceDisplay: "$10,000", featured: true, sortOrder: 1, deliverables: ["Naming rights for the full Link-Up series", "Logo on all event materials and signage", "3 solo social media features", "Employee activation at all events", "Custom impact recap report"], bloomerangFormUrl: "https://secure.qgiv.com/for/communitybuilderlinkups" },
    { _id: "sp-linkup-02", tierName: "Event Sponsor", tierGroup: "Tier 1", price: 5000, priceDisplay: "$5,000", sortOrder: 2, deliverables: ["Sponsor one Link-Up event", "Logo on event materials", "Solo social media post", "On-site tabling", "Impact recap inclusion"], bloomerangFormUrl: "https://secure.qgiv.com/for/communitybuilderlinkups" },
    { _id: "sp-linkup-03", tierName: "Community Sponsor", tierGroup: "Tier 2", price: 2500, priceDisplay: "$2,500", sortOrder: 3, deliverables: ["Logo on select materials", "Group social acknowledgment", "Community recognition"], bloomerangFormUrl: "https://secure.qgiv.com/for/communitybuilderlinkups" },
    { _id: "sp-linkup-04", tierName: "Supporter", tierGroup: "Tier 2", price: 1000, priceDisplay: "$1,000", sortOrder: 4, deliverables: ["Group social acknowledgment", "Listed on partner wall"], bloomerangFormUrl: "https://secure.qgiv.com/for/communitybuilderlinkups" },
  ];

  for (const pkg of linkupPkgs) {
    await client.createOrReplace({
      _type: "programSponsorPackage",
      active: true,
      program: { _type: "reference", _ref: "prog-community-builder-linkups" },
      ...pkg,
    });
  }
  console.log(`  ✅ ${linkupPkgs.length} Link-Up sponsor packages created`);

  console.log("\n✅ All done! 3 programs + 1 event + 10 sponsor packages added.");
}

seed().catch(console.error);
