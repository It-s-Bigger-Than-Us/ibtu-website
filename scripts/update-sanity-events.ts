/**
 * Update all Sanity event records to match Molly's corrected formatting.
 * Run: npx tsx scripts/update-sanity-events.ts
 *
 * This script:
 * 1. Fetches all events from Sanity
 * 2. Compares against the corrected event list
 * 3. Updates titles, job numbers, categories, displayOnWebsite, status
 * 4. Reports changes made
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0m4ngfcw",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// Molly's corrected event data — canonical formatting
const correctedEvents: Record<string, {
  title: string;
  jobNumber: string;
  status: string;
  displayOnWebsite: boolean;
  category?: string;
  location?: string;
  proofStats?: string;
  dateStart?: string;
}> = {
  "ev-prop-umed-rf": {
    title: "Resource Fair at University Pathways Medical Magnet High School",
    jobNumber: "SCH-S26-PROP-UMED-HS-RF-041626",
    status: "Upcoming",
    displayOnWebsite: false,
    category: "Resource Fair",
  },
  "ev-22": {
    title: "LAUSD Admin (2026)",
    jobNumber: "SCH-S26-LAUSD-Admin",
    status: "Active",
    displayOnWebsite: false,
  },
  "ev-active-hub-phase2": {
    title: "The Hub: Weekly Appointments",
    jobNumber: "Hub-S26-010-IBTU-FireRelief-Phase2-Weekly",
    status: "Active",
    displayOnWebsite: true,
  },
  "ev-27": {
    title: "Fire Relief Job Fair",
    jobNumber: "PROG-F25-011-FireRelief-JobFair-12182025",
    status: "Upcoming",
    displayOnWebsite: false,
  },
  "ev-cc-20261212": {
    title: "Coastal Care Beach Clean-Up — December 2026 at Venice Beach Pier",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-20261212",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
    dateStart: "12/12/2026",
  },
  "ev-47": {
    title: "Oakwood Holiday 2026",
    jobNumber: "PROG-F25-GivingSeason-Oakwood-120726",
    status: "Upcoming",
    displayOnWebsite: false,
  },
  "ev-gala-2026": {
    title: "A City United — IBTU's Annual Gala at The Biltmore Hotel, Los Angeles",
    jobNumber: "DEV-FY26-015-IBTU-Luncheon-120126",
    status: "Upcoming",
    displayOnWebsite: true,
    location: "The Biltmore Hotel, Los Angeles",
    dateStart: "12/01/2026",
  },
  "ev-cc-20261114": {
    title: "November Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-111426",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-cc-20261010": {
    title: "October Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-101026",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-cc-20260912": {
    title: "September Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-091226",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-cc-20260808": {
    title: "August Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-080826",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-active-b2s-2026": {
    title: "The 7th Annual Back 2 School Festival — Stop #1",
    jobNumber: "B2S-26-001-BHCP-080126",
    status: "Active",
    displayOnWebsite: true,
  },
  "ev-cc-20260711": {
    title: "July Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-071126",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-cc-20260613": {
    title: "June Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-061326",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-prop-purche-rf": {
    title: "Resource Fair at Purche Avenue Elementary School",
    jobNumber: "SCH-S26-PROP-Purche-RF-062526",
    status: "Upcoming",
    displayOnWebsite: false,
    category: "Resource Fair",
  },
  "ev-prop-purche-lt": {
    title: "Lunchtime Takeover at Purche Avenue Elementary School",
    jobNumber: "SCH-S26-PROP-Purche-LT-052626",
    status: "Upcoming",
    displayOnWebsite: false,
    category: "Lunchtime Takeover",
  },
  "ev-cc-20260509": {
    title: "May Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-050926",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-prop-purche-pd": {
    title: "Professional Development Workshop at Purche Avenue Elementary School",
    jobNumber: "SCH-S26-PROP-Purche-PD-050826",
    status: "Upcoming",
    displayOnWebsite: false,
    category: "Professional Development",
  },
  "ev-active-yes-staff-s26": {
    title: "Professional Development Workshop at YES Academy Elementary School",
    jobNumber: "SCH-F25-118212-YESAcademy-ES-StaffApp",
    status: "Active",
    displayOnWebsite: true,
    category: "Staff Appreciation",
  },
  "ev-prop-towne-rf": {
    title: "Resource Fair at Towne Avenue Elementary School",
    jobNumber: "SCH-S26-PROP-Towne-ES-RF-042126",
    status: "Upcoming",
    displayOnWebsite: false,
    category: "Resource Fair",
  },
  "ev-active-yes-lt-s26": {
    title: "Lunchtime Takeover at YES Academy Elementary School",
    jobNumber: "SCH-S26-116283-YESAcademy-ES-LT",
    status: "Active",
    displayOnWebsite: true,
    category: "Lunchtime Takeover",
  },
  "ev-cc-20260411": {
    title: "April Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-041126",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-active-bhes-lt-0406": {
    title: "Lunchtime Takeover at Baldwin Hills Elementary School",
    jobNumber: "SCH-S26-PROP-BHES-040626",
    status: "Active",
    displayOnWebsite: true,
    category: "Lunchtime Takeover",
  },
  "ev-prop-purche-pw": {
    title: "Parent Empowerment Workshop at Purche Avenue Elementary School",
    jobNumber: "SCH-S26-PROP-Purche-PW-032326",
    status: "Upcoming",
    displayOnWebsite: false,
    category: "Parent Empowerment Workshop",
  },
  "ev-cc-20260314": {
    title: "March Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-20260314",
    status: "Active",
    displayOnWebsite: true,
    location: "Venice Beach Pier",
  },
  "ev-prop-alliance-retreat": {
    title: "Young Black Men's Empowerment Retreat at Alliance College-Ready Public Schools Central",
    jobNumber: "SCHA-S26-PROP001-AllianceCentral-BoysEmpRetreat",
    status: "Closed",
    displayOnWebsite: false,
    category: "Building Community Builders Workshop & Retreat",
  },
  "ev-active-bhes-lt-0306": {
    title: "Lunchtime Takeover at Baldwin Hills Elementary School",
    jobNumber: "SCH-S26-PROP-BHES-021226",
    status: "Closed",
    displayOnWebsite: true,
    category: "Lunchtime Takeover",
  },
  "ev-57": {
    title: "February Community Clean Up",
    jobNumber: "PROG-S26-002-IBTU-CoastalCare-021426",
    status: "Closed",
    displayOnWebsite: true,
    proofStats: "57 volunteers, 7,400+ pieces, 24.3 lbs",
  },
  // Remaining events from Molly's list (older events keep their formatting)
  "ev-09": { title: "Resource Fair at Wright Middle School", jobNumber: "SCH-F25-099705-Wright-MS-RF-092725", status: "Closed", displayOnWebsite: true, category: "Resource Fair", proofStats: "74 families, 17 partners, 18K+ social views" },
  "ev-15": { title: "Lunchtime Takeover & 75th Day Celebration at Purche Avenue Elementary School", jobNumber: "SCH-F25-099648-Purche-ES-LT-121025", status: "Closed", displayOnWebsite: true, category: "Lunchtime Takeover" },
  "ev-20": { title: "School Program Admin Hours", jobNumber: "SCH-F25-Admin-Hours", status: "Active", displayOnWebsite: false },
  "ev-12": { title: "Lunchtime Takeover Experience Package at Hillcrest Drive Elementary School", jobNumber: "SCH-F25-102867-Hillcrest-ES-LT-PKG", status: "Closed", displayOnWebsite: true, category: "Lunchtime Takeover" },
  "ev-19": { title: "Purche ES Compliance PD", jobNumber: "SCH-F25-099648-Purche-ES-COMP-PD-102125", status: "Closed", displayOnWebsite: false },
  "ev-48": { title: "PFGLAxHillcrest Holiday", jobNumber: "PROG-F25-GivingSeason-PFGLAxHillcrest-121925", status: "Closed", displayOnWebsite: true },
  "ev-16": { title: "Parent Empowerment Day at Purche Avenue Elementary School", jobNumber: "SCH-F25-099648-Purche-ES-ParentEmp-110825", status: "Closed", displayOnWebsite: true, category: "Parent Empowerment Workshop", proofStats: "25-50 parents" },
  "ev-02": { title: "Lunchtime Takeover Package at Hillcrest Drive Elementary School", jobNumber: "SCH-S25-019198-Hillcrest-ES-LT-PKG-1203-1212-121925", status: "Closed", displayOnWebsite: true, category: "Lunchtime Takeover" },
  "ev-31": { title: "CD11 Oakwood Event", jobNumber: "PROG-S25-012-IBTU-CD11-Oakwood-042625", status: "Closed", displayOnWebsite: true },
  "ev-13": { title: "Resource Fair at Towne Avenue Elementary School", jobNumber: "SCH-S25-051784-Towne-ES-RF-040825", status: "Closed", displayOnWebsite: true, category: "Resource Fair" },
  "ev-25": { title: "Disaster Relief and Recovery Hub Grand Opening at Baldwin Hills Crenshaw Plaza", jobNumber: "PROG-S25-010-IBTU-FireRelief-HubOpening-041225", status: "Closed", displayOnWebsite: false, proofStats: "324 active clients, 7,581 assistance instances, 23.4 avg visits" },
  "ev-26": { title: "Immigration Emergency Response — LAUSD Campus Resource Distribution", jobNumber: "FIRE-RELIEF-ImmigrationAid", status: "Closed", displayOnWebsite: true, proofStats: "350 families, 3 LAUSD campuses, UTLA + Baby2Baby + Khalsa Aid" },
  "ev-32": { title: "Fire Relief Warehouse Ops", jobNumber: "PROG-S25-013-IBTU-FireRelief-Warehouse", status: "Closed", displayOnWebsite: false },
  "ev-11": { title: "Resource Fair at Brentwood Science Magnet Elementary School", jobNumber: "SCH-S25-027520-Brentwood-ES-RF-040525", status: "Closed", displayOnWebsite: true, category: "Resource Fair" },
  "ev-10": { title: "Lunchtime Takeover Series at YES Academy Elementary School", jobNumber: "SCH-S25-042118-YESAcademy-ES-LT-042125", status: "Closed", displayOnWebsite: true, category: "Lunchtime Takeover" },
  "ev-04": { title: "Resource Fair at Purche Avenue Elementary School", jobNumber: "SCH-S25-099648-Purche-ES-RF-060625", status: "Closed", displayOnWebsite: true, category: "Resource Fair", proofStats: "800+ students, 400-500 families" },
  "ev-21": { title: "School Program Compliance", jobNumber: "SCH-F25-Compliance", status: "Active", displayOnWebsite: false },
  "ev-23": { title: "Fire Relief Operations", jobNumber: "FIRE-RELIEF-Operations", status: "Closed", displayOnWebsite: true },
  "ev-28": { title: "Phase 1A Emergency Response — 14-Day Citywide Relief Sprint", jobNumber: "PROG-S25-009-IBTU-FireRelief-Phase1A", status: "Closed", displayOnWebsite: true, proofStats: "3,500+ volunteers, 15,000+ meals, 5,000+ families" },
  "ev-05": { title: "Community Creators Program at Iovine & Young Center", jobNumber: "SCH-F24-S25-028024-IYC-MS-CC-Ongoing", status: "Closed", displayOnWebsite: true, category: "Young Community Builder Program Series" },
  "ev-30": { title: "Together We Rebuild — Community Recovery Event at SoLa Beehive", jobNumber: "PROG-S25-009-IBTU-FireRelief-Together We Rebuild-022025", status: "Closed", displayOnWebsite: true, proofStats: "2,500+ attendees, $1.75M+ distributed, 80+ partners" },
  "ev-24": { title: "Windsor Fire Relief", jobNumber: "PROG-S25-011-IBTU-FireRelief-Windsor-050225", status: "Closed", displayOnWebsite: true },
  "ev-01": { title: "Parent Empowerment Program (8-Week Series) at South Park Elementary School", jobNumber: "SCH-F25-099913-SouthPark-ES-PEP8-121725", status: "Closed", displayOnWebsite: true, category: "Parent Empowerment Series", proofStats: "4.7-5/5 rating, 8-week cycle, 3rd year" },
  "ev-17": { title: "Staff Appreciation & Wellness Day at Century Park Elementary School", jobNumber: "SCH-F25-107780-CenturyPark-ES-StaffApp-121625", status: "Closed", displayOnWebsite: true, category: "Staff Appreciation" },
  "ev-51": { title: "Giving Season 2025 Wrap", jobNumber: "PROG-F26-NEW-022-GivingSeason-2025", status: "Closed", displayOnWebsite: true },
  "ev-08": { title: "Resource Fair (Fall) at Purche Avenue Elementary School", jobNumber: "SCH-F25-099648-Purche-ES-RF-102425", status: "Closed", displayOnWebsite: true, category: "Resource Fair" },
  "ev-03": { title: "Resource Fair at UPMA Middle School", jobNumber: "SCH-S25-055027-UPMA-MS-RF-040325", status: "Closed", displayOnWebsite: true, category: "Resource Fair" },
  "ev-07": { title: "Lunchtime Takeover Series at Mar Vista Gardens Middle School", jobNumber: "SCH-S25-039743-MDRMS-MS-LT-021325-030625-041125-052325", status: "Closed", displayOnWebsite: true, category: "Lunchtime Takeover" },
  "ev-14": { title: "Resource Fair (Spring) at Wright Middle School", jobNumber: "SCH-S25-049142-Wright-MS-RF-031525", status: "Closed", displayOnWebsite: true, category: "Resource Fair" },
  "ev-42": { title: "ECOS Toy Giveaway", jobNumber: "PROG-F25-GivingSeason-BHCP-122325", status: "Closed", displayOnWebsite: true },
  "ev-50": { title: "Volunteer Hangout", jobNumber: "PROG-F25-Volunteer-Hangout-121525", status: "Closed", displayOnWebsite: true },
  "ev-44": { title: "Winter Wonderland", jobNumber: "PROG-F25-GivingSeason-BHCP-WW-121325", status: "Closed", displayOnWebsite: true },
  "ev-18": { title: "Lunchtime Takeover at YES Academy Elementary School", jobNumber: "SCH-F25-115580-YESAcademy-ES-LT-120425", status: "Closed", displayOnWebsite: true, category: "Lunchtime Takeover" },
  "ev-45": { title: "CD11 Holiday Event 2025", jobNumber: "PROG-F25-GivingSeason-CD11-112125", status: "Closed", displayOnWebsite: true },
  "ev-55": { title: "HealthNet Baby Shower", jobNumber: "PROG-S25-HealthNet-BabyShower-111025", status: "Closed", displayOnWebsite: true },
  "ev-36": { title: "It's Bigger Than Us 6th Annual Back 2 School — Crenshaw High School Basketball Court Dedication", jobNumber: "B2S-25-003-CRENSHAW-HS-090625", status: "Closed", displayOnWebsite: true, proofStats: "174 check-ins, 1,000 backpacks, 100 laptops, $174,567 in-kind" },
  "ev-35": { title: "It's Bigger Than Us 6th Annual Back 2 School Festival — Venice Beach", jobNumber: "B2S-25-002-VB-082625", status: "Closed", displayOnWebsite: true, proofStats: "1,500+ registered, 55 partners, 146 lbs coastal cleanup, 149 fire-impacted served" },
  "ev-34": { title: "It's Bigger Than Us 6th Annual Back 2 School Festival — Baldwin Hills Crenshaw Plaza", jobNumber: "B2S-25-001-BHCP-080125", status: "Closed", displayOnWebsite: true, proofStats: "~2,500 rolling crowd, 60+ partners, 150+ volunteers" },
  "ev-56": { title: "WHAA Return to Basics", jobNumber: "PROG-S25-WHAA-RTB-072725", status: "Closed", displayOnWebsite: true },
  "ev-53": { title: "Yoga + Beach Cleanup (Jul)", jobNumber: "PROG-S25-012-IBTU-Yoga-BeachCleanup-0725", status: "Closed", displayOnWebsite: true, proofStats: "100 volunteers, 2,059 pieces, 40 lbs" },
  "ev-52": { title: "Yoga + Beach Cleanup (Jun)", jobNumber: "PROG-S25-012-IBTU-Yoga-BeachCleanup-0625", status: "Closed", displayOnWebsite: true, proofStats: "100 volunteers, 2,011 pieces, 31 lbs" },
  "ev-40": { title: "Crenshaw Courts Project", jobNumber: "PROG-F24-CrenshawCourts-23-25", status: "Closed", displayOnWebsite: true },
  "ev-54": { title: "CD9 Inglewood Event", jobNumber: "PROG-S25-CD9-INELLWOODS-061425", status: "Closed", displayOnWebsite: true },
  "ev-37": { title: "Coastal Care Launch", jobNumber: "PROG-S25-001-IBTU-CoastalCare", status: "Closed", displayOnWebsite: true },
  "ev-39": { title: "lululemon Yoga", jobNumber: "PROG-25-YOGA-041925", status: "Closed", displayOnWebsite: true },
  "ev-29": { title: "Phase 1B — First Responder Support & Community Coordination", jobNumber: "PROG-S25-009-IBTU-FireRelief-Phase1B", status: "Closed", displayOnWebsite: true },
  "ev-41": { title: "Miami Operations", jobNumber: "PROG-F24-MISC-008-Miami", status: "Closed", displayOnWebsite: true, proofStats: "2,625+ individuals, 498,075 Baby2Baby items" },
  "ev-33": { title: "Giving Season (legacy)", jobNumber: "PROG-F24-GivingSeason", status: "Closed", displayOnWebsite: true },
  "ev-06": { title: "Lunchtime Takeover & Resource Fairs at 186th Street Elementary School", jobNumber: "SCH-S25-026132-186thSt-ES-LT111924-RF-020725-RF053025", status: "Closed", displayOnWebsite: true, category: "Lunchtime Takeover" },
};

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error("❌ SANITY_TOKEN required. Set it: export SANITY_TOKEN=your_token");
    process.exit(1);
  }

  console.log("📋 Fetching all events from Sanity...");
  const events = await client.fetch(`*[_type == "event"] { _id, title, jobNumber, status, displayOnWebsite, category, location, proofStats, dateStart }`);
  console.log(`   Found ${events.length} events in Sanity\n`);

  let updated = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const event of events) {
    const id = event._id;
    const correction = correctedEvents[id];

    if (!correction) {
      console.log(`⚠️  No correction found for: ${id} — "${event.title}"`);
      skipped++;
      continue;
    }

    // Build patch with only changed fields
    const patch: Record<string, any> = {};
    if (event.title !== correction.title) patch.title = correction.title;
    if (event.jobNumber !== correction.jobNumber) patch.jobNumber = correction.jobNumber;
    if (event.status !== correction.status) patch.status = correction.status;
    if (event.displayOnWebsite !== correction.displayOnWebsite) patch.displayOnWebsite = correction.displayOnWebsite;
    if (correction.category && event.category !== correction.category) patch.category = correction.category;
    if (correction.location && event.location !== correction.location) patch.location = correction.location;
    if (correction.proofStats && event.proofStats !== correction.proofStats) patch.proofStats = correction.proofStats;
    if (correction.dateStart && event.dateStart !== correction.dateStart) patch.dateStart = correction.dateStart;

    if (Object.keys(patch).length === 0) {
      skipped++;
      continue;
    }

    try {
      await client.patch(id).set(patch).commit();
      console.log(`✅ Updated: ${id} — ${correction.title}`);
      if (patch.title) console.log(`   title: "${event.title}" → "${patch.title}"`);
      if (patch.status) console.log(`   status: ${event.status} → ${patch.status}`);
      if (patch.displayOnWebsite !== undefined) console.log(`   displayOnWebsite: ${event.displayOnWebsite} → ${patch.displayOnWebsite}`);
      updated++;
    } catch (err: any) {
      console.error(`❌ Error updating ${id}: ${err.message}`);
      errors.push(`${id}: ${err.message}`);
    }
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (no changes): ${skipped}`);
  console.log(`Errors: ${errors.length}`);
  if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach((e) => console.log(`  - ${e}`));
  }
}

main().catch(console.error);
