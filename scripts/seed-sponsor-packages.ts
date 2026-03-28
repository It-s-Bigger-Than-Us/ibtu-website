/**
 * Seed program-specific sponsorship packages into Sanity.
 * Run: SANITY_TOKEN=xxx npx tsx scripts/seed-sponsor-packages.ts
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "0m4ngfcw",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const ref = (id: string) => ({ _type: "reference" as const, _ref: id });

async function seed() {
  console.log("Seeding sponsorship packages...\n");

  const packages = [
    // ═══ BACK 2 SCHOOL ═══
    // Tier 1 (Both Sites)
    { _id: "sp-b2s-01", program: ref("prog-back-2-school"), tierName: "Day One", tierGroup: "Tier 1", price: 50000, priceDisplay: "$50,000", boothSize: "20'x30' Prime", featured: true, sortOrder: 1, deliverables: ["Booth: Up to 20'x30' Prime location", "Logo prominent on all printed materials", "Logo with link on homepage", "Solo social post + 2 reshares", "3 solo story features", "Logo in email header", "2 solo on-site mentions", "Prominent logo in recap video closing", "Solo featured in post-event metrics report", "Name + quote in press release"] },
    { _id: "sp-b2s-02", program: ref("prog-back-2-school"), tierName: "Champion", tierGroup: "Tier 1", price: 25000, priceDisplay: "$25,000", boothSize: "20'x30'", sortOrder: 2, deliverables: ["Booth: Up to 20'x30'", "Logo included on most printed materials", "Logo in Tier 1 sponsor banner on website", "Solo social post", "2 solo story features", "Logo in email body", "1 solo on-site mention", "Logo in recap video closing", "Group feature in metrics report", "Name in press release"] },
    // Tier 2 (One Site)
    { _id: "sp-b2s-03", program: ref("prog-back-2-school"), tierName: "Catalyst", tierGroup: "Tier 2", price: 15000, priceDisplay: "$15,000", boothSize: "10'x20'", sortOrder: 3, deliverables: ["Booth: Up to 10'x20'", "Logo grouped on most printed materials", "Logo in Tier 2 banner on website", "Solo frame in social carousel", "1 story feature in group", "Logo in Tier 2 email group", "Group on-site acknowledgment", "Grouped logo in recap video", "Group feature in metrics report"] },
    { _id: "sp-b2s-04", program: ref("prog-back-2-school"), tierName: "Fam", tierGroup: "Tier 2", price: 10000, priceDisplay: "$10,000", boothSize: "10'x20'", sortOrder: 4, deliverables: ["Booth: Up to 10'x20'", "Logo grouped on some materials", "Logo in Tier 2 banner on website", "Solo frame in social carousel", "Grouped story slide", "Logo in Tier 2 email group", "Group on-site acknowledgment", "Grouped logo in recap video", "Included in metrics report"] },
    // Tier 3 (One Site)
    { _id: "sp-b2s-05", program: ref("prog-back-2-school"), tierName: "Ally", tierGroup: "Tier 3", price: 5000, priceDisplay: "$5,000", boothSize: "10'x10'", sortOrder: 5, deliverables: ["Booth: 10'x10'", "Logo grouped on banner", "Logo in Tier 3 on website", "Group carousel frame", "Logo in Tier 3 story group", "Logo in Tier 3 email group"] },
    { _id: "sp-b2s-06", program: ref("prog-back-2-school"), tierName: "Giver", tierGroup: "Tier 3", price: 2500, priceDisplay: "$2,500", boothSize: "10'x10'", sortOrder: 6, deliverables: ["Booth: 10'x10'", "Logo grouped on banner", "Logo in Tier 3 on website", "Group social post", "Logo in Tier 3 story group", "Logo in Tier 3 email group"] },
    { _id: "sp-b2s-07", program: ref("prog-back-2-school"), tierName: "Backer", tierGroup: "Tier 3", price: 1000, priceDisplay: "$1,000", boothSize: "10'x10'", sortOrder: 7, deliverables: ["Booth: 10'x10'", "Listed on materials", "Listed in Tier 3 on website", "Group social post", "Listed in story", "Listed in Tier 3 email"] },

    // ═══ COASTAL CARE ═══
    { _id: "sp-cc-01", program: ref("prog-coastal-care"), tierName: "Coastal Champion", tierGroup: "Title Sponsor", price: 15000, priceDisplay: "$15,000", featured: true, sortOrder: 1, deliverables: ["Title sponsor recognition for 1 event", "On-site branded signage at activation", "Solo social media spotlight post", "Logo on Coastal Care printed materials", "Logo + link on IBTU website", "Post-series impact report featuring brand"] },
    { _id: "sp-cc-02", program: ref("prog-coastal-care"), tierName: "The Bridge", tierGroup: "3-Month Package", price: 25000, priceDisplay: "$25,000", sortOrder: 2, deliverables: ["Co-sponsor for 3 months of clean-ups", "Logo on event materials & data cards", "Solo social media speaking feature", "Inclusion in post-series impact report", "Mentions & interviews in each recap"] },
    { _id: "sp-cc-03", program: ref("prog-coastal-care"), tierName: "Shoreline Partner", tierGroup: "3-Month Package", price: 10000, priceDisplay: "$10,000", sortOrder: 3, deliverables: ["Tier 1 co-sponsor for 3 months", "Logo on event materials & data cards", "Carousel social media feature", "Inclusion in post-series impact report"] },
    { _id: "sp-cc-04", program: ref("prog-coastal-care"), tierName: "Community Crew", tierGroup: "Tier 2", price: 5000, priceDisplay: "$5,000", sortOrder: 4, deliverables: ["Name on select materials", "Group social acknowledgment", "Hierarchy in order of contribution"] },
    { _id: "sp-cc-05", program: ref("prog-coastal-care"), tierName: "Shore Steward", tierGroup: "Tier 2", price: 2500, priceDisplay: "$2,500", sortOrder: 5, deliverables: ["Name on select materials", "Group social acknowledgment"] },
    { _id: "sp-cc-06", program: ref("prog-coastal-care"), tierName: "Beach Builder", tierGroup: "Tier 2", price: 1000, priceDisplay: "$1,000", sortOrder: 6, deliverables: ["Name on select materials", "Group social acknowledgment"] },
    { _id: "sp-cc-07", program: ref("prog-coastal-care"), tierName: "Coast Ally", tierGroup: "Tier 2", price: 500, priceDisplay: "$500", sortOrder: 7, deliverables: ["Name on select materials", "Group social acknowledgment"] },

    // ═══ YOGA AT THE HUB / WELLNESS ═══
    { _id: "sp-well-01", program: ref("prog-wellness"), tierName: "Community Wellness Champion", tierGroup: "Title Sponsor", price: 20000, priceDisplay: "$20,000", featured: true, sortOrder: 1, deliverables: ["Title recognition for full series", "Logo on all signage + step & repeat", "Speaking moment at Kick-Off", "Logo on volunteer shirts", "3 solo social media features", "Employee activation at all events", "Custom impact recap report", "On-site signage dominance"] },
    { _id: "sp-well-02", program: ref("prog-wellness"), tierName: "Series Presenting Sponsor", tierGroup: "3-Month Package", price: 12500, priceDisplay: "$12,500", sortOrder: 2, deliverables: ["Logo on all flyers + signage", "2 dedicated social posts", "Employee activation at 3 events", "Impact report inclusion", "On-site tabling priority"] },
    { _id: "sp-well-03", program: ref("prog-wellness"), tierName: "Wellness Impact Sponsor", tierGroup: "3-Month Package", price: 10000, priceDisplay: "$10,000", sortOrder: 3, deliverables: ["Logo on all series materials", "Verbal recognition at events", "1 social spotlight", "Tabling at 2 events", "Post-series recap inclusion"] },
    { _id: "sp-well-04", program: ref("prog-wellness"), tierName: "Community Builder Sponsor", tierGroup: "Tier 2", price: 5000, priceDisplay: "$5,000", sortOrder: 4, deliverables: ["Name on select materials", "Group social acknowledgment"] },
    { _id: "sp-well-05", program: ref("prog-wellness"), tierName: "Shore Steward", tierGroup: "Tier 2", price: 2500, priceDisplay: "$2,500", sortOrder: 5, deliverables: ["Name on select materials", "Group social acknowledgment"] },
    { _id: "sp-well-06", program: ref("prog-wellness"), tierName: "Beach Builder", tierGroup: "Tier 2", price: 1000, priceDisplay: "$1,000", sortOrder: 6, deliverables: ["Name on select materials", "Group social acknowledgment"] },
    { _id: "sp-well-07", program: ref("prog-wellness"), tierName: "Coast Ally", tierGroup: "Tier 2", price: 500, priceDisplay: "$500", sortOrder: 7, deliverables: ["Name on select materials", "Group social acknowledgment"] },

    // ═══ COMMUNITY HEALTH / FOOD DISTRIBUTION ═══
    { _id: "sp-ch-01", program: ref("prog-community-health"), tierName: "Bridge Builder Sponsorship", tierGroup: "Tier 1", price: 40000, priceDisplay: "$40,000+", featured: true, sortOrder: 1, deliverables: ["Logo on event materials", "Personalized shout-out on social media", "Logo placement on event website", "Opportunity to speak at the event", "Opportunity to have a booth at the event", "Opportunity to have your logo on event merchandise"] },
    { _id: "sp-ch-02", program: ref("prog-community-health"), tierName: "Advocate", tierGroup: "Tier 1", price: 30000, priceDisplay: "$30,000+", sortOrder: 2, deliverables: ["Logo placement on group event materials", "Shout-out on social media with other sponsors", "Logo placement on event website", "Opportunity to speak at the event", "Opportunity to have a booth at the event"] },
    { _id: "sp-ch-03", program: ref("prog-community-health"), tierName: "Ally", tierGroup: "Tier 1", price: 20000, priceDisplay: "$20,000+", sortOrder: 3, deliverables: ["Logo placement on event materials", "Shout-out on social media", "Logo placement on event website"] },

    // ═══ GIVING SEASON ═══
    { _id: "sp-gs-01", program: ref("prog-giving-season"), tierName: "Headline Sponsor", tierGroup: "Tier 1", price: 50000, priceDisplay: "$50,000", featured: true, sortOrder: 1, deliverables: ["Headline Sponsor designation", "Featured on event merch", "On-stage recognition", "Media mentions", "Logo on event materials", "Group social media post", "Listed on T-shirt"] },
    { _id: "sp-gs-02", program: ref("prog-giving-season"), tierName: "Presenting", tierGroup: "Tier 1", price: 25000, priceDisplay: "$25,000", sortOrder: 2, deliverables: ["Featured on event merch", "On-stage recognition", "Media mentions", "Logo on event materials", "Group social media post", "Listed on T-shirt"] },
    { _id: "sp-gs-03", program: ref("prog-giving-season"), tierName: "Gold", tierGroup: "Tier 2", price: 15000, priceDisplay: "$15,000", sortOrder: 3, deliverables: ["On-stage recognition", "Media mentions", "Logo on event materials", "Group social media post", "Listed on T-shirt"] },
    { _id: "sp-gs-04", program: ref("prog-giving-season"), tierName: "Silver", tierGroup: "Tier 2", price: 10000, priceDisplay: "$10,000", sortOrder: 4, deliverables: ["Logo on event materials", "Group social media post", "Listed on T-shirt"] },
    { _id: "sp-gs-05", program: ref("prog-giving-season"), tierName: "Bronze", tierGroup: "Tier 3", price: 5000, priceDisplay: "$5,000", sortOrder: 5, deliverables: ["Group social media post", "Listed on T-shirt"] },
    { _id: "sp-gs-06", program: ref("prog-giving-season"), tierName: "Supporter", tierGroup: "Tier 3", price: 2000, priceDisplay: "$2,000", sortOrder: 6, deliverables: ["Listed on T-shirt"] },
  ];

  const docs = packages.map((p) => ({ _type: "programSponsorPackage" as const, active: true, ...p }));
  for (const d of docs) await client.createOrReplace(d);

  console.log(`✅ ${docs.length} sponsorship packages seeded!`);
  console.log("   B2S: 7 | Coastal Care: 7 | Wellness: 7 | Community Health: 3 | Giving Season: 6");
  console.log("\n   ⚠️  bloomerangFormUrl is empty — Molly needs to create forms in Bloomerang dashboard and paste URLs into Sanity Studio.");
}

seed().catch(console.error);
