/**
 * Seed Sanity CMS with approved IBTU data from content audit.
 * Run: npx tsx scripts/seed-sanity.ts
 * Requires SANITY_TOKEN env var with Editor permissions.
 */

import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error("Set SANITY_TOKEN env var");
  process.exit(1);
}

const client = createClient({
  projectId: "0m4ngfcw",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function seed() {
  console.log("Seeding Sanity CMS...\n");

  // ── PILLARS ──
  console.log("Creating pillars...");
  const pillars = [
    { _type: "pillar", _id: "pillar-crisis", pillarName: "Crisis & Disaster Stabilization", tagline: "When crisis hits, IBTU is already there. We stabilize families through rapid response, trusted relief, and long-term recovery — because emergencies don't end when the news cycle does.", headlineStat: "717 verified relief cases", keyMetric: "313 households stabilized", sortOrder: 1 },
    { _type: "pillar", _id: "pillar-school", pillarName: "School & Youth Stability", tagline: "When families face instability, students feel it first. IBTU works inside schools and communities to protect attendance, engagement, and opportunity for thousands of young people every year.", headlineStat: "28,025 students served", keyMetric: "34 school sites", sortOrder: 2 },
    { _type: "pillar", _id: "pillar-health", pillarName: "Community Health & Resource Access", tagline: "From food distributions and dental screenings to licensed mental health sessions and wellness activations — IBTU removes barriers to health and essentials in the places people already are.", headlineStat: "875,500+ lbs food", keyMetric: "389+ distribution events", sortOrder: 3 },
  ];
  for (const p of pillars) await client.createOrReplace(p);

  // ── PROGRAMS ──
  console.log("Creating programs...");
  const programs = [
    { _type: "program", _id: "prog-fire-relief", title: "Fire Relief & The Hub", slug: { _type: "slug", current: "fire-relief" }, pillar: "Crisis & Disaster Stabilization", tagline: "When the fires hit, IBTU was already here. Within 72 hours we mobilized. Within 90 days we built permanent infrastructure. We are still here — and we are not leaving.", description: "IBTU launched the largest community-led disaster response in Los Angeles nonprofit history. Phase 1 activated within 72 hours across 87+ locations. Phase 2 built the permanent Relief Resource Hub at Baldwin Hills Crenshaw Plaza. Phase 3 is converting the Hub into an all-crisis community center.", proofStats: "5,000+ families stabilized | 7,581 assistance instances | 324 active clients | 23.4 avg visits | 90+ zip codes | 15+ partner services | 350 immigrant families served", allTimeServed: "5,000+ families (Phase 1) | 2,500 at TWR | 7,581 Hub instances | 324 clients | 3,500+ volunteers | 15,000+ meals | 350 immigrant families | $1.75M+ distributed", volunteerUrl: "https://volunteer.bloomerang.co/JE/7haetjfrq5g190", ctaText: "Support the Hub", schedule: "Ongoing — Hub open weekly", scheduleType: "Ongoing", status: "Active", sortOrder: 1, cardStat: "324 active clients", icon: "fire", keyPartners: "SoLa Impact, One Church, HACLA, Baby2Baby, Khalsa Aid, UTLA, Liberty Dental, lululemon, Nike, Apple, Google, FOX, BET+, TBWA\\Chiat\\Day, Shell, L'OCCITANE, LA28, Target" },
    { _type: "program", _id: "prog-back-2-school", title: "Back 2 School Festival", slug: { _type: "slug", current: "back-2-school" }, pillar: "Community Health & Resource Access", tagline: "Every year, IBTU transforms community spaces into school-readiness hubs where thousands of families access backpacks, resources, and partner services — because every kid deserves to start the year ready.", description: "The Back 2 School Festival is IBTU's flagship annual event — a multi-city, multi-day community activation that distributes backpacks, school supplies, and partner services to thousands of Los Angeles families. Now in its 7th year.", proofStats: "22,550+ backpacks (6yr) | 20,396+ attendees (6yr) | 4 cities | 90+ schools | 190+ partners | 1,400+ volunteers", allTimeServed: "20,396+ attendees across 6 years | 22,550+ backpacks distributed | 1,400+ volunteers deployed | 4 cities | 123+ zip codes", volunteerUrl: "https://itsbiggerthanusla.org/volunteers", ctaText: "Sponsor B2S 2026", schedule: "Annual — August/September (3 stops)", scheduleType: "Annual", status: "Upcoming", sortOrder: 2, cardStat: "22,550+ backpacks", icon: "school", keyPartners: "lululemon, Baby2Baby, Supreme, Adidas, Bombas, Nike, Apple, Google, Target, LA Rams, Pepsi, LA84 Foundation, LAUSD" },
    { _type: "program", _id: "prog-youth-programming", title: "Youth Programming", slug: { _type: "slug", current: "youth-programming" }, pillar: "School & Youth Stability", tagline: "When families face instability, students feel it first. IBTU works inside schools to protect attendance, engagement, and opportunity — because showing up is how trust gets built.", description: "IBTU's school-based programs operate on 34 sites across Los Angeles, delivering lunchtime activations, parent empowerment workshops, resource fairs, staff appreciation days, and youth leadership programming. Now serving 28,025 students in 2025.", proofStats: "28,025 students (2025) | 34 school sites | $721,660 contracts (4yr) | 62,475+ since 2020 | 4.7-5/5 satisfaction", allTimeServed: "62,475+ students since 2020 | 28,025 in 2025 | 34 sites | $721,660 contracts | 50% YOY growth", volunteerUrl: "https://volunteer.bloomerang.co/JE/9bxg8o3ix6z1ih", ctaText: "Bring IBTU to Your Campus", schedule: "Year-round school calendar", scheduleType: "Ongoing", status: "Active", sortOrder: 3, cardStat: "28,025 students", icon: "youth", keyPartners: "Alliance College-Ready Public Schools (25 campuses), LAUSD, Inglewood USD, Sol de Janeiro ($1.9M), Iovine & Young Center" },
    { _type: "program", _id: "prog-coastal-care", title: "Coastal Care", slug: { _type: "slug", current: "coastal-care" }, pillar: "Community Health & Resource Access", tagline: "Community infrastructure includes the natural environment. We've spent five years showing up for schools, for food access, for crisis response — and we apply the same rigor to the beach.", description: "Coastal Care is IBTU's monthly environmental stewardship program. Every second Saturday, volunteers gather at Venice Beach to remove debris, track data across 27 categories, and build a community of environmental action.", proofStats: "366+ total volunteers | 5 events completed | 20,463+ items removed | ~297 lbs debris | 4,237 microplastics | 14 total activations planned", allTimeServed: "366+ volunteers | 20,463+ items removed | ~297 lbs debris | 5 events completed", volunteerUrl: "https://volunteer.bloomerang.co/JE/6qkd8xo7woun5v", ctaText: "Join a Beach Clean-Up", schedule: "Every 2nd Saturday — February through December 2026", scheduleType: "Monthly", status: "Active", sortOrder: 4, cardStat: "Monthly clean-ups", icon: "beach" },
    { _type: "program", _id: "prog-giving-season", title: "Giving Season", slug: { _type: "slug", current: "giving-season" }, pillar: "Community Health & Resource Access", tagline: "When the year ends, IBTU shows up one more time — because community infrastructure does not take holidays.", description: "Each December, IBTU closes the year the same way it runs it: by showing up. Giving Season distributes toys, warm meals, and wellness resources to thousands of Los Angeles families across multiple events.", proofStats: "6 consecutive years | Thousands of toys distributed | Warm meals served | 100+ volunteers annually", allTimeServed: "6,575+ individuals (2024 alone across 7 events) | 4,550+ toys distributed | 6 consecutive years", ctaText: "Support Giving Season", schedule: "Annual — December", scheduleType: "Annual", status: "Active", sortOrder: 5, cardStat: "6 years running", icon: "gift", keyPartners: "ECOS Group, Baby2Baby, Target" },
    { _type: "program", _id: "prog-wellness", title: "Wellness & Health Activations", slug: { _type: "slug", current: "wellness" }, pillar: "Community Health & Resource Access", tagline: "IBTU removes barriers to health and wellness in the places people already are — from public parks to school campuses to the coast.", description: "Wellness & Health Activations bring licensed fitness instructors, mental health providers, and wellness programming directly into community spaces — parks, school campuses, and IBTU events. Powered by the lululemon partnership.", proofStats: "206 participants (2024 yoga series) | lululemon partnership | Venice + Leimert Park | Staff wellness across 5+ campuses", allTimeServed: "206 participants (2024 yoga series) | Staff wellness days reaching 75+ educators per campus", ctaText: "Attend a Wellness Event", schedule: "Recurring — year-round", scheduleType: "Ongoing", status: "Active", sortOrder: 6, cardStat: "50+ health partners", icon: "wellness", keyPartners: "lululemon, Black OM Wellness, Peloton" },
    { _type: "program", _id: "prog-community-health", title: "Community Health & Resource Access", slug: { _type: "slug", current: "community-health" }, pillar: "Community Health & Resource Access", tagline: "IBTU removes barriers to health and essentials in the places people already are — because access alone doesn't create stability. Reliability and dignity do.", description: "Since 2020, IBTU has distributed 875,500+ lbs of food, hosted 1,000+ health screenings, and partnered with 50+ healthcare organizations to bring clinical services directly to community members — no appointments, no barriers.", proofStats: "875,500+ lbs food | 389+ events | ~2,500 served monthly | 94% reduced food stress | 50+ healthcare partners | 223 naloxone kits", allTimeServed: "875,500+ lbs food since 2020 | 389+ events | 144,000 (2023) | 67,500 lbs (2024) | 1,000+ health screenings | 94% food stress reduction", ctaText: "Support Health Access", schedule: "Weekly food distributions (relaunching 2026) | Health screenings at all events", scheduleType: "Weekly", status: "Active", sortOrder: 7, cardStat: "875,500+ lbs food", icon: "food", keyPartners: "LA Care Health Plan, Charles Drew University, USC All of Us, Liberty Dental, Keck School of Medicine USC, United MegaCare, Baby2Baby, LA Rams" },
  ];
  for (const p of programs) await client.createOrReplace(p);

  // ── AWARDS (23) ──
  console.log("Creating 23 awards...");
  const awards = [
    { _type: "award", _id: "award-01", title: "Inaugural Changemaker Award", presentedBy: "U.S. Congress — Congresswoman Sydney Kamlager-Dove (CA-37)", year: 2025, date: "Dec 8, 2025", context: "Wildfire Relief & Community-Centered Leadership", level: "Federal" },
    { _type: "award", _id: "award-02", title: "Assembly Resolution No. 834 — CA Nonprofit of the Year", presentedBy: "CA Legislature Assembly — 55th District (Asm. Isaac G. Bryan)", year: 2025, date: "May 21, 2025", context: "California Nonprofits Day", level: "State Assembly" },
    { _type: "award", _id: "award-03", title: "Certificate of Recognition — Hub Opening", presentedBy: "U.S. House of Representatives (Congresswoman Kamlager-Dove)", year: 2025, date: "Apr 12, 2025", context: "Hub Opening", level: "Federal" },
    { _type: "award", _id: "award-04", title: "Congratulatory Certificate — Hub Ribbon Cutting", presentedBy: "County of LA — 2nd District (Supervisor Holly J. Mitchell)", year: 2025, date: "Apr 12, 2025", context: "Hub Launch", level: "County" },
    { _type: "award", _id: "award-05", title: "Certificate of Recognition — Hub Opening", presentedBy: "CA State Senate — 28th District (Senator Smallwood-Cuevas)", year: 2025, date: "Mar 23, 2025", context: "Grand Opening", level: "State Senate" },
    { _type: "award", _id: "award-06", title: "SC CTSI Community Engagement Recognition", presentedBy: "Southern California CTSI (Dr. Nicole Wolfe)", year: 2025, date: "Mar 27, 2025", context: "Community Engagement", level: "Institutional" },
    { _type: "award", _id: "award-07", title: "African American Heritage Month 2025", presentedBy: "City of LA — CD9 (Mayor Bass + council members)", year: 2025, date: "Feb 2025", context: "Heritage Recognition", level: "City" },
    { _type: "award", _id: "award-08", title: "PowHERful Award 2025", presentedBy: "Councilmember Heather Hutt — CD10", year: 2025, date: "Mar 9, 2025", context: "Women's Empowerment", notes: "Presented to Molly Morrow / IBTU", level: "City" },
    { _type: "award", _id: "award-09", title: "Certificate of Recognition — 6th B2S Venice", presentedBy: "City of LA — Office of the Mayor (Karen Bass)", year: 2025, date: "Aug 23, 2025", context: "Back 2 School Recognition", level: "City" },
    { _type: "award", _id: "award-10", title: "Certificate of Recognition — 6th B2S", presentedBy: "CA State Senate — 28th District (Senator Smallwood-Cuevas)", year: 2025, date: "Aug 2, 2025", context: "1,500+ backpacks distributed", level: "State Senate" },
    { _type: "award", _id: "award-11", title: "Full City Council Recognition — CD11", presentedBy: "LA City Council (15 members, introduced by CM Traci Park)", year: 2025, date: "May 16, 2025", context: "Full Council Recognition", level: "City" },
    { _type: "award", _id: "award-12", title: "Certificate of Recognition — DEI Impact", presentedBy: "CA State Senate — 28th District (Senator Smallwood-Cuevas)", year: 2024, date: "Aug 24, 2024", context: "Social Impact & DEI", level: "State Senate" },
    { _type: "award", _id: "award-13", title: "Certificate of Recognition — 5th B2S", presentedBy: "U.S. House of Representatives (Congresswoman Kamlager-Dove)", year: 2024, date: "Aug 3, 2024", context: "Back 2 School", level: "Federal" },
    { _type: "award", _id: "award-14", title: "Top 100 California Nonprofit — 28th Senate District", presentedBy: "CA State Senate (Senator Smallwood-Cuevas)", year: 2024, context: "Top 100 CA Nonprofit", level: "State Senate" },
    { _type: "award", _id: "award-15", title: "L.A. REPAIR Participatory Budgeting Recognition", presentedBy: "City of LA — Mayor (Karen Bass)", year: 2024, date: "Jun 7, 2024", context: "L.A. REPAIR Celebration", level: "City" },
    { _type: "award", _id: "award-16", title: "Certificate of Recognition — CD8", presentedBy: "City of LA — CD8 (CM Marqueece Harris-Dawson)", year: 2024, date: "Dec 14, 2024", context: "To Molly Morrow", level: "City" },
    { _type: "award", _id: "award-17", title: "Health Equity Certificate — Yoga in the Park", presentedBy: "City of LA — CD10 (CM Heather Hutt)", year: 2024, date: "Nov 16, 2024", context: "lululemon + Black OM", level: "City" },
    { _type: "award", _id: "award-18", title: "Baby2Baby Partner Award", presentedBy: "Baby2Baby", year: 2024, context: "Partnership Recognition", level: "Institutional" },
    { _type: "award", _id: "award-19", title: "Special Commendation — City of Inglewood", presentedBy: "City of Inglewood (Mayor James T. Butts Jr.)", year: 2024, context: "B2S Inglewood", level: "City" },
    { _type: "award", _id: "award-20", title: "Full City Council Recognition — CD8", presentedBy: "LA City Council (introduced by CM Harris-Dawson)", year: 2023, context: "Community Service", level: "City" },
    { _type: "award", _id: "award-21", title: "African American History Recognition Plaque", presentedBy: "City of LA — CD9 (CM Curren D. Price Jr.)", year: 2023, date: "Feb 2023", context: "Heritage Recognition", level: "City" },
    { _type: "award", _id: "award-22", title: "Commendation — LA County Women's Empowerment", presentedBy: "County of LA (Supervisor Holly J. Mitchell)", year: 2022, date: "Mar 23, 2022", context: "Women's Empowerment", level: "County" },
    { _type: "award", _id: "award-23", title: "LA County Commendation", presentedBy: "County of LA — 2nd District", year: 2024, context: "Community Service", level: "County" },
  ];
  for (const a of awards) await client.createOrReplace(a);

  // ── IMPACT STATS ──
  console.log("Creating impact stats...");
  const stats = [
    { _type: "impactStat", _id: "stat-2025-01", value: "28,025", label: "Students Served", year: "2025", category: "Education", sortOrder: 1, displayOnWebsite: true, source: "SSOT v3" },
    { _type: "impactStat", _id: "stat-2025-02", value: "34", label: "School Sites", year: "2025", category: "Education", sortOrder: 2, displayOnWebsite: true, source: "SSOT v3" },
    { _type: "impactStat", _id: "stat-2025-03", value: "5,000+", label: "Fire Relief Families Stabilized", year: "2025", category: "Crisis Response", sortOrder: 3, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-2025-04", value: "717", label: "Verified Relief Cases", year: "2025", category: "Crisis Response", sortOrder: 4, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-2025-05", value: "324", label: "Hub Active Clients", year: "2025", category: "Crisis Response", sortOrder: 5, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-2025-06", value: "7,581", label: "Hub Assistance Instances", year: "2025", category: "Crisis Response", sortOrder: 6, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-2025-07", value: "$4.5M+", label: "In-Kind Value Mobilized", year: "2025", category: "Resources", sortOrder: 7, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-2025-08", value: "300+", label: "Partners Activated", year: "2025", category: "Partnerships", sortOrder: 8, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-2025-09", value: "15,000+", label: "First Responder Meals", year: "2025", category: "Crisis Response", sortOrder: 9, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-2025-10", value: "75+", label: "Media Placements", year: "2025", category: "Media", sortOrder: 10, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-01", value: "62,475+", label: "Students Served Since 2020", year: "Cumulative", category: "Education", sortOrder: 1, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-02", value: "150,000+", label: "Families Served", year: "Cumulative", category: "Impact", sortOrder: 2, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-03", value: "600,000+", label: "Individuals Reached", year: "Cumulative", category: "Impact", sortOrder: 3, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-04", value: "875,500+", label: "Pounds of Food Distributed", year: "Cumulative", category: "Community Health", sortOrder: 4, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-05", value: "300+", label: "Partners & Sponsors", year: "Cumulative", category: "Partnerships", sortOrder: 5, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-06", value: "10,000+", label: "Volunteers (Peak)", year: "Cumulative", category: "Community", sortOrder: 6, displayOnWebsite: true, context: "7,500+ active / 10,000+ peak database" },
    { _type: "impactStat", _id: "stat-cum-07", value: "23", label: "Awards & Recognitions", year: "Cumulative", category: "Recognition", sortOrder: 7, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-08", value: "6", label: "Consecutive Years of Service", year: "Cumulative", category: "Impact", sortOrder: 8, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-09", value: "22,550+", label: "B2S Backpacks (All-Time)", year: "Cumulative", category: "Events", sortOrder: 9, displayOnWebsite: true },
    { _type: "impactStat", _id: "stat-cum-10", value: "389+", label: "Food Distribution Events", year: "Cumulative", category: "Community Health", sortOrder: 10, displayOnWebsite: true },
  ];
  for (const s of stats) await client.createOrReplace(s);

  // ── ORG TIMELINE ──
  console.log("Creating org timeline...");
  const timeline = [
    { _type: "orgTimeline", _id: "tl-01", year: 2020, title: "It's Bigger Than Us is Founded", detail: "Founded during COVID-19 with 'How can I help you?' cards distributed in Los Angeles neighborhoods. Immediate responses: food, school supplies, health resources, someone who would listen.", pillar: "Foundation", sortOrder: 1 },
    { _type: "orgTimeline", _id: "tl-02", year: 2021, title: "Weekly Food Distribution Network Launched", detail: "Expanded to regular weekly food distributions serving Los Angeles. 33,000+ families served annually.", pillar: "Community Health & Resource Access", sortOrder: 2 },
    { _type: "orgTimeline", _id: "tl-03", year: 2022, title: "First LAUSD School Contracts Awarded", detail: "Secured initial school partnerships. 3rd Annual Back 2 School Festival. LA County Women's Empowerment Recognition.", pillar: "School & Youth Stability", sortOrder: 3 },
    { _type: "orgTimeline", _id: "tl-04", year: 2023, title: "School Program Network Expansion", detail: "Scaled to 8 school sites with formal programming. 9,800 students served. 4th Annual B2S at Leimert Park. Peak food year: 54,000 families, 410,000 lbs.", pillar: "School & Youth Stability", sortOrder: 4 },
    { _type: "orgTimeline", _id: "tl-05", year: 2023, title: "First Major Government Recognitions", detail: "Full City Council Recognition (CD8). First proclamations from elected officials. Bridge Builder Award from Supervisor Holly Mitchell.", pillar: "Recognition", sortOrder: 5 },
    { _type: "orgTimeline", _id: "tl-06", year: 2024, title: "Multistate Expansion & Program Diversification", detail: "Expanded to Miami with Baby2Baby (498,075 items). Launched Coastal Care. 14,150 students served. Top 100 CA Nonprofit.", pillar: "Community Health & Resource Access", sortOrder: 6 },
    { _type: "orgTimeline", _id: "tl-07", year: 2024, title: "Major Corporate Partnerships Secured", detail: "Deepened partnerships with lululemon, Baby2Baby, and brand sponsors. Institutional health partnerships with Charles Drew University and USC All of Us.", pillar: "Partnerships", sortOrder: 7 },
    { _type: "orgTimeline", _id: "tl-08", year: 2025, title: "LA Wildfire Response — Largest Operation", detail: "Mobilized in 72 hours. Within 90 days, established permanent Relief Hub at Baldwin Hills Crenshaw Plaza. 5,000+ families stabilized. 3,500+ volunteers. 15,000+ meals.", pillar: "Crisis & Disaster Stabilization", sortOrder: 8 },
    { _type: "orgTimeline", _id: "tl-09", year: 2025, title: "Hub Launch & Permanent Infrastructure", detail: "Opened Disaster Relief and Recovery Hub. 324 active clients, 7,581 assistance instances, 23.4 avg visits per client. Full government recognition ceremonies.", pillar: "Crisis & Disaster Stabilization", sortOrder: 9 },
    { _type: "orgTimeline", _id: "tl-10", year: 2025, title: "Record School & Youth Programming Scale", detail: "28,025 students across 34 school sites — more than all prior years combined. Alliance Charter partnership expanded to 25 campuses ($1.9M Sol de Janeiro distribution).", pillar: "School & Youth Stability", sortOrder: 10 },
    { _type: "orgTimeline", _id: "tl-11", year: 2025, title: "Congressional & National Recognition", detail: "Inaugural Changemaker Award from U.S. Congress. Featured on Jennifer Hudson Show. Good Morning America feature. 75+ media placements.", pillar: "Recognition", sortOrder: 11 },
    { _type: "orgTimeline", _id: "tl-12", year: 2026, title: "Sustained Impact & Community Infrastructure Vision", detail: "Continuing Hub operations, MegaFEAST relaunch, Coastal Care expansion. IBTU is no longer an emergency responder — it is permanent community infrastructure.", pillar: "Foundation", sortOrder: 12 },
  ];
  for (const t of timeline) await client.createOrReplace(t);

  // ── SPONSOR TIERS ──
  console.log("Creating sponsor tiers...");
  const tiers = [
    { _type: "sponsorTier", _id: "tier-01", title: "Day One", amount: "$50,000+", description: "Premier naming rights, event co-branding, executive partnership", sortOrder: 1 },
    { _type: "sponsorTier", _id: "tier-02", title: "Anchor", amount: "$25,000", description: "Program naming rights, major event presence, community recognition", sortOrder: 2 },
    { _type: "sponsorTier", _id: "tier-03", title: "Catalyst", amount: "$10,000", description: "Event sponsor, program partner, brand placement across all activations", sortOrder: 3 },
    { _type: "sponsorTier", _id: "tier-04", title: "Builder", amount: "$5,000", description: "Event presence, community recognition, IBTU partner listing", sortOrder: 4 },
    { _type: "sponsorTier", _id: "tier-05", title: "Supporter", amount: "$2,500", description: "Community recognition, IBTU partner listing", sortOrder: 5 },
    { _type: "sponsorTier", _id: "tier-06", title: "Contributor", amount: "$1,000", description: "Community recognition, in-kind partner listing", sortOrder: 6 },
    { _type: "sponsorTier", _id: "tier-07", title: "Backer", amount: "$500", description: "Community recognition", sortOrder: 7 },
  ];
  for (const t of tiers) await client.createOrReplace(t);

  console.log("\n✅ Sanity CMS seeded successfully!");
  console.log("   7 programs | 23 awards | 20 impact stats | 12 timeline entries | 3 pillars | 7 sponsor tiers");
  console.log("\n   Next: seed partners (65+ records) and events (57 records) separately if needed.");
  console.log("   Open Sanity Studio at ibtu.la/studio to review.");
}

seed().catch(console.error);
