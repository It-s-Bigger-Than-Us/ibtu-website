/**
 * Seed partners (65) and events (56) into Sanity CMS.
 * Run: SANITY_TOKEN=xxx npx tsx scripts/seed-partners-events.ts
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

function pid(slug: string) {
  return { _type: "reference", _ref: `prog-${slug}` };
}

async function seed() {
  console.log("Seeding partners...");

  const partners = [
    // Financial & Foundation
    { _id: "p-001", title: "A-mark Foundation", category: "Financial & Foundation", partnerType: "Foundation", tier: "Major" },
    { _id: "p-002", title: "Brantley & Ashley Essary Charitable Fund", category: "Financial & Foundation", partnerType: "Foundation", tier: "Major" },
    { _id: "p-003", title: "Brothers Brother Foundation", category: "Financial & Foundation", partnerType: "Foundation", tier: "Major" },
    { _id: "p-004", title: "Disney Family Foundation", category: "Financial & Foundation", partnerType: "Foundation", tier: "Major" },
    { _id: "p-005", title: "Goldman Sachs", category: "Financial & Foundation", partnerType: "Corporate", tier: "Major" },
    { _id: "p-006", title: "Health Net", category: "Financial & Foundation", partnerType: "Corporate", tier: "Major" },
    { _id: "p-007", title: "JLH Foundation", category: "Financial & Foundation", partnerType: "Foundation", tier: "Major" },
    { _id: "p-008", title: "CORE", category: "Financial & Foundation", partnerType: "Organization", tier: "Major" },
    { _id: "p-009", title: "Robert L. Zangrillo Family Foundation", category: "Financial & Foundation", partnerType: "Foundation", tier: "Major" },
    { _id: "p-010", title: "Jessica Steans-Gail Giving Fund", category: "Financial & Foundation", partnerType: "Foundation", tier: "Major" },
    { _id: "p-011", title: "Lisa and John Drake Charitable Fund", category: "Financial & Foundation", partnerType: "Foundation", tier: "Major" },
    // Brand & In-Kind
    { _id: "p-012", title: "lululemon", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-013", title: "Baby2Baby", category: "Brand & In-Kind", partnerType: "Organization", tier: "Key" },
    { _id: "p-014", title: "Sol de Janeiro", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-015", title: "Supreme", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-016", title: "Nike", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-017", title: "Apple", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-018", title: "Google", category: "Brand & In-Kind", partnerType: "Corporate", tier: "Key" },
    { _id: "p-019", title: "Target", category: "Brand & In-Kind", partnerType: "Corporate", tier: "Key" },
    { _id: "p-020", title: "Adidas", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-021", title: "Bombas", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-022", title: "Pacsun", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-023", title: "Erewhon", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-024", title: "L'Occitane", category: "Brand & In-Kind", partnerType: "Brand", tier: "Key" },
    { _id: "p-025", title: "Pepsi", category: "Brand & In-Kind", partnerType: "Corporate", tier: "Key" },
    { _id: "p-026", title: "DoorDash", category: "Brand & In-Kind", partnerType: "Corporate", tier: "Key" },
    { _id: "p-027", title: "AT&T", category: "Brand & In-Kind", partnerType: "Corporate", tier: "Key" },
    { _id: "p-028", title: "United Healthcare", category: "Brand & In-Kind", partnerType: "Corporate", tier: "Key" },
    { _id: "p-029", title: "Shell", category: "Brand & In-Kind", partnerType: "Corporate", tier: "Key" },
    { _id: "p-030", title: "LA28", category: "Brand & In-Kind", partnerType: "Organization", tier: "Key" },
    { _id: "p-031", title: "FOX", category: "Brand & In-Kind", partnerType: "Media", tier: "Key" },
    { _id: "p-032", title: "BET+", category: "Brand & In-Kind", partnerType: "Media", tier: "Key" },
    { _id: "p-033", title: "TBWA\\Chiat\\Day", category: "Brand & In-Kind", partnerType: "Agency", tier: "Key" },
    { _id: "p-034", title: "LA Rams", category: "Brand & In-Kind", partnerType: "Sports", tier: "Key" },
    { _id: "p-035", title: "Aloha Collection", category: "Brand & In-Kind", partnerType: "Brand", tier: "Supporting" },
    { _id: "p-036", title: "Perfect Hydration", category: "Brand & In-Kind", partnerType: "Brand", tier: "Supporting" },
    // Government & Civic
    { _id: "p-037", title: "Congresswoman Sydney Kamlager-Dove", category: "Government & Civic", partnerType: "Federal" },
    { _id: "p-038", title: "Senator Lola Smallwood-Cuevas", category: "Government & Civic", partnerType: "State" },
    { _id: "p-039", title: "Assemblymember Isaac G. Bryan", category: "Government & Civic", partnerType: "State" },
    { _id: "p-040", title: "Supervisor Holly J. Mitchell", category: "Government & Civic", partnerType: "County" },
    { _id: "p-041", title: "Mayor Karen Bass", category: "Government & Civic", partnerType: "City" },
    { _id: "p-042", title: "CM Marqueece Harris-Dawson (CD8)", category: "Government & Civic", partnerType: "City" },
    { _id: "p-043", title: "CM Heather Hutt (CD10)", category: "Government & Civic", partnerType: "City" },
    { _id: "p-044", title: "CM Traci Park (CD11)", category: "Government & Civic", partnerType: "City" },
    { _id: "p-045", title: "LAUSD", category: "Government & Civic", partnerType: "School District" },
    { _id: "p-046", title: "UTLA", category: "Government & Civic", partnerType: "Union" },
    { _id: "p-047", title: "HACLA", category: "Government & Civic", partnerType: "Housing Authority" },
    // Education
    { _id: "p-048", title: "Alliance College-Ready Public Schools", category: "Education", partnerType: "School Network" },
    { _id: "p-049", title: "Inglewood USD", category: "Education", partnerType: "School District" },
    { _id: "p-050", title: "Heart of Los Angeles", category: "Education", partnerType: "Youth Organization" },
    { _id: "p-051", title: "LA84 Foundation", category: "Education", partnerType: "Foundation" },
    { _id: "p-052", title: "LA Promise Fund", category: "Education", partnerType: "Foundation" },
    { _id: "p-053", title: "Iovine & Young Center", category: "Education", partnerType: "Arts Organization" },
    { _id: "p-054", title: "Crenshaw High School Alumni Association", category: "Education", partnerType: "Alumni" },
    // Health & Wellness
    { _id: "p-055", title: "Charles Drew University", category: "Health & Wellness", partnerType: "Healthcare" },
    { _id: "p-056", title: "Liberty Dental", category: "Health & Wellness", partnerType: "Healthcare" },
    { _id: "p-057", title: "LA Care Health Plan", category: "Health & Wellness", partnerType: "Healthcare" },
    { _id: "p-058", title: "USC All of Us", category: "Health & Wellness", partnerType: "Research" },
    { _id: "p-059", title: "Keck School of Medicine USC", category: "Health & Wellness", partnerType: "Healthcare" },
    { _id: "p-060", title: "Black OM Wellness", category: "Health & Wellness", partnerType: "Wellness" },
    { _id: "p-061", title: "Peloton", category: "Health & Wellness", partnerType: "Wellness" },
    // Community & Crisis
    { _id: "p-062", title: "SoLa Impact", category: "Community & Crisis", partnerType: "Community" },
    { _id: "p-063", title: "One Church", category: "Community & Crisis", partnerType: "Faith-Based" },
    { _id: "p-064", title: "Khalsa Aid", category: "Community & Crisis", partnerType: "Humanitarian" },
    { _id: "p-065", title: "Westside Food Bank", category: "Community & Crisis", partnerType: "Food Bank" },
  ].map((p) => ({ _type: "partner" as const, ...p }));

  for (const p of partners) await client.createOrReplace(p);
  console.log(`  ✅ ${partners.length} partners created`);

  // ── EVENTS (56 job-numbered, excluding cancelled Digital Literacy) ──
  console.log("Seeding events...");

  const events = [
    // School & Youth Stability
    { _id: "ev-01", title: "South Park ES Parent Empowerment (8-week)", jobNumber: "SCH-F25-099913-SouthPark-ES-PEP8-121725", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Feb 2023", dateEnd: "Dec 2025", proofStats: "4.7-5/5 rating, 8-week cycle, 3rd year", status: "Closed", displayOnWebsite: true },
    { _id: "ev-02", title: "Hillcrest ES Lunchtime Takeover Package", jobNumber: "SCH-S25-019198-Hillcrest-ES-LT-PKG-1203-1212-121925", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Nov 2024", dateEnd: "Apr 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-03", title: "UPMA MS Resource Fair", jobNumber: "SCH-S25-055027-UPMA-MS-RF-040325", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Aug 2022", dateEnd: "Apr 2026", status: "Active", displayOnWebsite: true },
    { _id: "ev-04", title: "Purche ES Resource Fair", jobNumber: "SCH-S25-099648-Purche-ES-RF-060625", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Jan 2025", dateEnd: "Apr 2026", proofStats: "800+ students, 400-500 families", status: "Active", displayOnWebsite: true },
    { _id: "ev-05", title: "Community Creators (Iovine & Young)", jobNumber: "SCH-F24-S25-028024-IYC-MS-CC-Ongoing", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Feb 2025", dateEnd: "Mar 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-06", title: "186th St ES LT + Resource Fairs", jobNumber: "SCH-S25-026132-186thSt-ES-LT111924-RF-020725-RF053025", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2024, dateStart: "11/19/2024", status: "Active", displayOnWebsite: true },
    { _id: "ev-07", title: "Mar Vista Gardens MS Lunchtime Takeovers", jobNumber: "SCH-S25-039743-MDRMS-MS-LT-021325-030625-041125-052325", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Apr 2023", dateEnd: "Aug 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-08", title: "Purche ES Resource Fair (Fall)", jobNumber: "SCH-F25-099648-Purche-ES-RF-102425", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Aug 2025", dateEnd: "Dec 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-09", title: "Wright MS Resource Fair", jobNumber: "SCH-F25-099705-Wright-MS-RF-092725", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Sep 2025", dateEnd: "Nov 2025", proofStats: "74 families, 17 partners, 18K+ social views", status: "Closed", displayOnWebsite: true },
    { _id: "ev-10", title: "YES Academy ES Lunchtime Takeovers", jobNumber: "SCH-S25-042118-YESAcademy-ES-LT-042125", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Jul 2023", dateEnd: "Apr 2026", status: "Active", displayOnWebsite: true },
    { _id: "ev-11", title: "Brentwood ES Resource Fair", jobNumber: "SCH-S25-027520-Brentwood-ES-RF-040525", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Jun 2024", dateEnd: "Nov 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-12", title: "Hillcrest ES LT Package (multi-date)", jobNumber: "SCH-F25-102867-Hillcrest-ES-LT-PKG", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Oct 2025", dateEnd: "Dec 2026", status: "Active", displayOnWebsite: true },
    { _id: "ev-13", title: "Towne ES Resource Fair", jobNumber: "SCH-S25-051784-Towne-ES-RF-040825", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Mar 2025", dateEnd: "Nov 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-14", title: "Wright MS Resource Fair (Spring)", jobNumber: "SCH-S25-049142-Wright-MS-RF-031525", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Apr 2023", dateEnd: "Mar 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-15", title: "Purche ES Lunchtime Takeovers", jobNumber: "SCH-F25-099648-Purche-ES-LT-121025", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Sep 2025", dateEnd: "Dec 2026", status: "Active", displayOnWebsite: true },
    { _id: "ev-16", title: "Purche ES Parent Empowerment Day", jobNumber: "SCH-F25-099648-Purche-ES-ParentEmp-110825", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Nov 2025", proofStats: "25-50 parents", status: "Closed", displayOnWebsite: true },
    { _id: "ev-17", title: "Century Park ES Staff Appreciation", jobNumber: "SCH-F25-107780-CenturyPark-ES-StaffApp-121625", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Dec 2025", dateEnd: "Mar 2026", status: "Active", displayOnWebsite: true },
    { _id: "ev-18", title: "YES Academy ES LT (Dec)", jobNumber: "SCH-F25-115580-YESAcademy-ES-LT-120425", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "12/08/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-19", title: "Purche ES Compliance PD", jobNumber: "SCH-F25-099648-Purche-ES-COMP-PD-102125", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Oct 2025", dateEnd: "Nov 2025", status: "Closed", displayOnWebsite: false },
    { _id: "ev-20", title: "School Program Admin Hours", jobNumber: "SCH-F25-Admin-Hours", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Ongoing", status: "Active", displayOnWebsite: false },
    { _id: "ev-21", title: "School Program Compliance", jobNumber: "SCH-F25-Compliance", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2025, dateStart: "Jan 2025", dateEnd: "Dec 2025", status: "Active", displayOnWebsite: false },
    { _id: "ev-22", title: "LAUSD Admin (2026)", jobNumber: "SCH-S26-LAUSD-Admin", program: pid("youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "Jan 2025", dateEnd: "Feb 2026", status: "Active", displayOnWebsite: false },

    // Crisis & Disaster Stabilization
    { _id: "ev-23", title: "Fire Relief Operations", jobNumber: "FIRE-RELIEF-Operations", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "Jan 2025", dateEnd: "Sep 2025", status: "Active", displayOnWebsite: true },
    { _id: "ev-24", title: "Windsor Fire Relief", jobNumber: "PROG-S25-011-IBTU-FireRelief-Windsor-050225", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "Feb 2024", dateEnd: "Apr 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-25", title: "Hub Opening", jobNumber: "PROG-S25-010-IBTU-FireRelief-HubOpening-041225", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "Mar 2025", dateEnd: "Jan 2026", proofStats: "324 active clients, 7,581 assistance instances, 23.4 avg visits", status: "Active", displayOnWebsite: true, featured: true },
    { _id: "ev-26", title: "Immigration Aid", jobNumber: "FIRE-RELIEF-ImmigrationAid", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "Jun 2025", dateEnd: "Jul 2025", proofStats: "350 families, 3 LAUSD campuses, UTLA + Baby2Baby + Khalsa Aid", status: "Closed", displayOnWebsite: true },
    { _id: "ev-27", title: "Fire Relief Job Fair", jobNumber: "PROG-F25-011-FireRelief-JobFair-12182026", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2026, dateStart: "12/18/2026", status: "Upcoming", displayOnWebsite: true },
    { _id: "ev-28", title: "Phase 1A Emergency Response", jobNumber: "PROG-S25-009-IBTU-FireRelief-Phase1A", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "Jan 2025", dateEnd: "Feb 2025", proofStats: "3,500+ volunteers, 15,000+ meals, 5,000+ families", status: "Closed", displayOnWebsite: true, featured: true },
    { _id: "ev-29", title: "Phase 1B", jobNumber: "PROG-S25-009-IBTU-FireRelief-Phase1B", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "02/22/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-30", title: "Together We Rebuild", jobNumber: "PROG-S25-009-IBTU-FireRelief-Together We Rebuild-022025", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "Feb 2025", dateEnd: "Apr 2025", proofStats: "2,500+ attendees, $1.75M+ distributed, 80+ partners", status: "Closed", displayOnWebsite: true, featured: true },
    { _id: "ev-31", title: "CD11 Oakwood Event", jobNumber: "PROG-S25-012-IBTU-CD11-Oakwood-042625", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "May 2025", dateEnd: "Aug 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-32", title: "Fire Relief Warehouse Ops", jobNumber: "PROG-S25-013-IBTU-FireRelief-Warehouse", program: pid("fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2025, dateStart: "Jun 2025", dateEnd: "Oct 2025", status: "Closed", displayOnWebsite: false },

    // Community Health & Resource Access
    { _id: "ev-33", title: "Giving Season (legacy)", jobNumber: "PROG-F24-GivingSeason", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2024, dateStart: "2022", dateEnd: "2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-34", title: "B2S — BHC Plaza", jobNumber: "B2S-25-001-BHCP-080125", program: pid("back-2-school"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "08/01/2025", proofStats: "~2,500 rolling crowd, 60+ partners, 150+ volunteers", status: "Closed", displayOnWebsite: true, featured: true },
    { _id: "ev-35", title: "B2S — Venice Beach", jobNumber: "B2S-25-002-VB-082625", program: pid("back-2-school"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "08/26/2025", proofStats: "1,500+ registered, 55 partners, 146 lbs coastal cleanup, 149 fire-impacted served", status: "Closed", displayOnWebsite: true, featured: true },
    { _id: "ev-36", title: "B2S — Crenshaw HS Court Dedication", jobNumber: "B2S-25-003-CRENSHAW-HS-090625", program: pid("back-2-school"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "09/06/2025", proofStats: "174 check-ins, 1,000 backpacks, 100 laptops, $174,567 in-kind", status: "Closed", displayOnWebsite: true, featured: true },
    { _id: "ev-37", title: "Coastal Care Launch", jobNumber: "PROG-S25-001-IBTU-CoastalCare", program: pid("coastal-care"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "05/28/2025", status: "Active", displayOnWebsite: true },
    { _id: "ev-39", title: "lululemon Yoga", jobNumber: "PROG-25-YOGA-041925", program: pid("wellness"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "04/19/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-40", title: "Crenshaw Courts Project", jobNumber: "PROG-F24-CrenshawCourts-23-25", program: pid("back-2-school"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "06/18/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-41", title: "Miami Operations", jobNumber: "PROG-F24-MISC-008-Miami", program: pid("community-health"), pillar: "Community Health & Resource Access", year: 2024, dateStart: "Apr 2024", dateEnd: "Jun 2025", proofStats: "2,625+ individuals, 498,075 Baby2Baby items", status: "Closed", displayOnWebsite: true },
    { _id: "ev-42", title: "ECOS Toy Giveaway", jobNumber: "PROG-F25-GivingSeason-BHCP-122325", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "12/23/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-43", title: "MegaFeast 2026", jobNumber: "PROG-F25-GivingSeason-BHCP-Megafeast-110826", program: pid("community-health"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "11/08/2026", description: "Target: 3,000 families/month. Monthly mega food distribution.", status: "Upcoming", displayOnWebsite: true, featured: true },
    { _id: "ev-44", title: "Winter Wonderland", jobNumber: "PROG-F25-GivingSeason-BHCP-WW-121325", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "12/13/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-45", title: "CD11 Holiday Event 2025", jobNumber: "PROG-F25-GivingSeason-CD11-112125", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "11/21/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-46", title: "CD11 Holiday Event 2026", jobNumber: "PROG-F25-GivingSeason-CD11-112126", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "11/21/2026", status: "Upcoming", displayOnWebsite: true },
    { _id: "ev-47", title: "Oakwood Holiday 2026", jobNumber: "PROG-F25-GivingSeason-Oakwood-120726", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "12/07/2026", status: "Upcoming", displayOnWebsite: true },
    { _id: "ev-48", title: "PFGLAxHillcrest Holiday", jobNumber: "PROG-F25-GivingSeason-PFGLAxHillcrest-121925", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "Oct 2025", dateEnd: "Dec 2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-49", title: "WhyNot Holiday 2026", jobNumber: "PROG-F25-GivingSeason-WhyNot-112026", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "11/20/2026", status: "Upcoming", displayOnWebsite: true },
    { _id: "ev-50", title: "Volunteer Hangout", jobNumber: "PROG-F25-Volunteer-Hangout-121525", program: pid("wellness"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "12/15/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-51", title: "Giving Season 2025 Wrap", jobNumber: "PROG-F26-NEW-022-GivingSeason-2025", program: pid("giving-season"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "Dec 2025", dateEnd: "Jan 2026", status: "Closed", displayOnWebsite: true },
    { _id: "ev-52", title: "Yoga + Beach Cleanup (Jun)", jobNumber: "PROG-S25-012-IBTU-Yoga-BeachCleanup-0625", program: pid("coastal-care"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "06/2025", proofStats: "100 volunteers, 2,011 pieces, 31 lbs", status: "Closed", displayOnWebsite: true },
    { _id: "ev-53", title: "Yoga + Beach Cleanup (Jul)", jobNumber: "PROG-S25-012-IBTU-Yoga-BeachCleanup-0725", program: pid("coastal-care"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "07/2025", proofStats: "100 volunteers, 2,059 pieces, 40 lbs", status: "Closed", displayOnWebsite: true },
    { _id: "ev-54", title: "CD9 Inglewood Event", jobNumber: "PROG-S25-CD9-INELLWOODS-061425", program: pid("community-health"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "06/14/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-55", title: "HealthNet Baby Shower", jobNumber: "PROG-S25-HealthNet-BabyShower-111025", program: pid("community-health"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "11/10/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-56", title: "WHAA Return to Basics", jobNumber: "PROG-S25-WHAA-RTB-072725", program: pid("community-health"), pillar: "Community Health & Resource Access", year: 2025, dateStart: "07/27/2025", status: "Closed", displayOnWebsite: true },
    { _id: "ev-57", title: "Coastal Care Feb 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-021426", program: pid("coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "02/14/2026", proofStats: "57 volunteers, 7,400+ pieces, 24.3 lbs", status: "Closed", displayOnWebsite: true },
  ].map((e) => ({ _type: "event" as const, ...e }));

  for (const e of events) await client.createOrReplace(e);
  console.log(`  ✅ ${events.length} events created`);

  console.log("\n✅ Partners + Events seeded!");
  console.log(`   ${partners.length} partners | ${events.length} events (with job numbers)`);
}

seed().catch(console.error);
