/**
 * Fix ALL event statuses based on Slack Master Project Tracker export.
 * Also adds new events not yet in Sanity.
 * Run: SANITY_TOKEN=xxx npx tsx scripts/fix-event-statuses.ts
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "0m4ngfcw", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false,
});

const ref = (id: string) => ({ _type: "reference" as const, _ref: id });

async function fix() {
  console.log("Fixing event statuses from Slack Master Tracker...\n");

  // ── FIX EXISTING EVENTS ──
  const statusFixes = [
    // School events — ALL F25 Purche are Closed-25 per tracker
    { _id: "ev-01", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-04", status: "Closed", reason: "Tracker: SCH-F25-099648-Purche-ES-RF Closed-25" },
    { _id: "ev-08", status: "Closed", reason: "Tracker: SCH-F25-099648-Purche-ES-RF Closed-25" },
    { _id: "ev-15", status: "Closed", reason: "Tracker: SCH-F25-099648-Purche-ES-LT Closed-25" },
    { _id: "ev-16", status: "Closed", reason: "Tracker: SCH-F25-099648-Purche-ES-ParentEmp Closed-25" },

    // Hillcrest — Molly confirmed + tracker: Closed-25
    { _id: "ev-12", status: "Closed", reason: "Tracker: SCH-F25-102867 Closed-25, Molly confirmed" },

    // YES Academy old contracts — Closed
    { _id: "ev-10", status: "Closed", reason: "Tracker: SCH-F24-4500801970 Closed-25" },
    { _id: "ev-18", status: "Closed", reason: "Tracker: SCH-F25-115580 Closed-25" },

    // Other school events not in active tracker — Close them
    { _id: "ev-02", status: "Closed", reason: "Tracker: SCH-S25-4500807471 Closed-25" },
    { _id: "ev-03", status: "Closed", reason: "Not in current tracker — legacy" },
    { _id: "ev-05", status: "Closed", reason: "Tracker: SCH-F24-028024 Closed-24" },
    { _id: "ev-06", status: "Closed", reason: "Tracker: SCH-F24-8000026132 Closed-24" },
    { _id: "ev-07", status: "Closed", reason: "Not in current tracker — legacy" },
    { _id: "ev-09", status: "Closed", reason: "Not in current tracker — completed" },
    { _id: "ev-11", status: "Closed", reason: "Not in current tracker — completed" },
    { _id: "ev-13", status: "Closed", reason: "Not in current tracker — completed" },
    { _id: "ev-14", status: "Closed", reason: "Not in current tracker — completed" },
    { _id: "ev-17", status: "Closed", reason: "Not in current tracker — completed" },
    { _id: "ev-19", status: "Closed", reason: "Internal compliance PD — closed" },

    // Fire relief — Phase 1 ops are closed, Phase 2 Hub is active
    { _id: "ev-23", status: "Closed", reason: "Tracker: Fire Relief Operations closed" },
    { _id: "ev-37", status: "Closed", reason: "Coastal Care launch event done — recurring events are separate" },

    // Coastal Care Feb 2026 — Closed per tracker
    { _id: "ev-57", status: "Closed", reason: "Tracker: PROG-S26-002 20260214 Closed-26" },

    // Hub Opening — stays Active (Phase 2 ongoing)
    // ev-25 — Active ✓

    // B2S events — all 2025 are closed
    { _id: "ev-34", status: "Closed", reason: "Tracker: B2S-25-001 Closed-25" },
    { _id: "ev-35", status: "Closed", reason: "Tracker: B2S-25-002 Closed-25" },
    { _id: "ev-36", status: "Closed", reason: "Tracker: B2S-25-003 Closed-25" },

    // All 2025 giving season / yoga / wellness — closed
    { _id: "ev-39", status: "Closed", reason: "Tracker: PROG-25-YOGA-041925 Closed-25" },
    { _id: "ev-42", status: "Closed", reason: "Tracker: PROG-F26-NEW-022 Closed-25" },
    { _id: "ev-44", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-45", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-48", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-50", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-51", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-52", status: "Closed", reason: "Tracker: PROG-25-YOGA-062225 Closed-25" },
    { _id: "ev-53", status: "Closed", reason: "Tracker: PROG-25-YOGA-072025 Closed-25" },
    { _id: "ev-54", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-55", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-56", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-40", status: "Closed", reason: "Tracker: Closed-25" },
    { _id: "ev-33", status: "Closed", reason: "Tracker: Closed" },
    { _id: "ev-41", status: "Closed", reason: "Tracker: PROG-F24-MISC-008 Closed-24" },

    // Keep these as-is (already correct):
    // ev-24 Windsor — Closed ✓
    // ev-25 Hub Opening — Active ✓ (Phase 2 ongoing)
    // ev-26 Immigration Aid — Closed ✓
    // ev-28 Phase 1A — Closed ✓
    // ev-29 Phase 1B — Closed ✓
    // ev-30 Together We Rebuild — Closed ✓
    // ev-31 CD11 Oakwood — Closed ✓
    // ev-32 Warehouse Ops — Closed ✓
  ];

  console.log(`Fixing ${statusFixes.length} event statuses...`);
  for (const f of statusFixes) {
    await client.patch(f._id).set({ status: f.status }).commit();
    console.log(`  ${f._id} → ${f.status}`);
  }

  // ── ADD NEW ACTIVE/UPCOMING EVENTS FROM TRACKER ──
  console.log("\nAdding new events from tracker...");

  const newEvents = [
    // Active events with POs
    { _id: "ev-active-yes-lt-s26", _type: "event", title: "YES Academy ES Lunchtime Takeover", jobNumber: "SCH-S26-116283-YESAcademy-ES-LT", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "04/13/2026", status: "Active", displayOnWebsite: true, description: "" },
    { _id: "ev-active-yes-staff-s26", _type: "event", title: "YES Academy ES Staff Appreciation & Healing", jobNumber: "SCH-F25-118212-YESAcademy-ES-StaffApp", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "05/05/2026", status: "Active", displayOnWebsite: true, description: "" },
    { _id: "ev-active-bhes-lt-0306", _type: "event", title: "Baldwin Hills ES Lunchtime Takeover", jobNumber: "SCH-S26-PROP-BHES-021226", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "03/05/2026", status: "Active", displayOnWebsite: true, description: "" },
    { _id: "ev-active-bhes-lt-0406", _type: "event", title: "Baldwin Hills ES Lunchtime Takeover", jobNumber: "SCH-S26-PROP-BHES-040626", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "04/06/2026", status: "Active", displayOnWebsite: true, description: "PO Issued — $10,000" },
    { _id: "ev-active-hillcrest-pd", _type: "event", title: "Hillcrest ES Professional Development — Wellness & Resiliency", jobNumber: "SCH-S26-PROP-001-Hillcrest-ES-PD", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "Spring 2026", status: "Active", displayOnWebsite: true, description: "" },

    // B2S 2026 — Active (planning stage)
    { _id: "ev-active-b2s-2026", _type: "event", title: "7th Annual Back 2 School Festival", jobNumber: "B2S-26-001-BHCP-080126", program: ref("prog-back-2-school"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "08/01/2026", status: "Active", displayOnWebsite: true, featured: true },

    // Fire Relief Phase 2 — Active
    { _id: "ev-active-hub-phase2", _type: "event", title: "Fire Relief Hub Phase 2 — Weekly Appointments", jobNumber: "Hub-S26-010-IBTU-FireRelief-Phase2-Weekly Appointments", program: ref("prog-fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2026, dateStart: "2026", status: "Active", displayOnWebsite: true },
    { _id: "ev-active-hub-wfb", _type: "event", title: "Fire Relief Hub Phase 2 — Westside Food Bank", jobNumber: "Hub-S26-010-IBTU-FireRelief-Phase2-WFB", program: ref("prog-fire-relief"), pillar: "Crisis & Disaster Stabilization", year: 2026, dateStart: "2026", status: "Closed", displayOnWebsite: false },

    // Coastal Care 2026 — monthly Active events
    { _id: "ev-cc-20260314", _type: "event", title: "Coastal Care — March 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20260314", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "03/14/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20260411", _type: "event", title: "Coastal Care — April 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20260411", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "04/11/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20260509", _type: "event", title: "Coastal Care — May 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20260509", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "05/09/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20260613", _type: "event", title: "Coastal Care — June 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20260613", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "06/13/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20260711", _type: "event", title: "Coastal Care — July 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20260711", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "07/11/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20260808", _type: "event", title: "Coastal Care — August 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20260808", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "08/08/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20260912", _type: "event", title: "Coastal Care — September 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20260912", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "09/12/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20261010", _type: "event", title: "Coastal Care — October 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20261010", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "10/10/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20261114", _type: "event", title: "Coastal Care — November 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20261114", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "11/14/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },
    { _id: "ev-cc-20261212", _type: "event", title: "Coastal Care — December 2026", jobNumber: "PROG-S26-002-IBTU-CoastalCare-20261212", program: ref("prog-coastal-care"), pillar: "Community Health & Resource Access", year: 2026, dateStart: "12/12/2026", location: "Venice Beach Pier", status: "Active", displayOnWebsite: true },

    // Digital Literacy — CANCELLED per Molly. Removed from CMS entirely.
    // { _id: "ev-active-digital-lit" — DELETED },

    // New school proposals — internal only (displayOnWebsite: false)
    { _id: "ev-prop-purche-pw", _type: "event", title: "Purche ES — Parent Workshop", jobNumber: "SCH-S26-PROP-Purche-PW-032326", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "03/23/2026", status: "Upcoming", displayOnWebsite: false, description: "" },
    { _id: "ev-prop-purche-pd", _type: "event", title: "Purche ES — Professional Development", jobNumber: "SCH-S26-PROP-Purche-PD-050826", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "05/08/2026", status: "Upcoming", displayOnWebsite: false, description: "" },
    { _id: "ev-prop-purche-lt", _type: "event", title: "Purche ES — Lunchtime Takeover", jobNumber: "SCH-S26-PROP-Purche-LT-052626", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "05/26/2026", status: "Upcoming", displayOnWebsite: false, description: "" },
    { _id: "ev-prop-purche-rf", _type: "event", title: "Purche ES — Resource Fair", jobNumber: "SCH-S26-PROP-Purche-RF-062526", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "06/05/2026", status: "Upcoming", displayOnWebsite: false, description: "" },
    { _id: "ev-prop-towne-rf", _type: "event", title: "Towne Ave ES — Resource Fair", jobNumber: "SCH-S26-PROP-Towne-ES-RF-042126", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "04/21/2026", status: "Upcoming", displayOnWebsite: false, description: "" },
    { _id: "ev-prop-alliance-retreat", _type: "event", title: "Alliance Central — Young Black Men's Empowerment Retreat", jobNumber: "SCHA-S26-PROP001-AllianceCentral-BoysEmpRetreat", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "03/12/2026", status: "Upcoming", displayOnWebsite: false, description: "" },
    { _id: "ev-prop-umed-rf", _type: "event", title: "University Pathways Medical Magnet — Resource Fair", jobNumber: "SCH-S26-PROP-UMED-HS-RF-01", program: ref("prog-youth-programming"), pillar: "School & Youth Stability", year: 2026, dateStart: "Spring 2026", status: "Upcoming", displayOnWebsite: false, description: "" },
  ];

  for (const e of newEvents) {
    await client.createOrReplace(e);
    console.log(`  + ${e.title} (${e.status}${e.displayOnWebsite ? "" : " — internal"})`);
  }

  // Remove the old upcoming events that don't exist in tracker
  // ev-27 Fire Relief Job Fair 12/18/2026 — NOT in tracker, remove from website
  // ev-43 MegaFeast 2026 — NOT in tracker as active, keep but mark appropriately
  // ev-46 CD11 Holiday 2026 — NOT in tracker
  // ev-47 Oakwood Holiday 2026 — NOT in tracker
  // ev-49 WhyNot Holiday 2026 — NOT in tracker
  console.log("\nMarking unverified future events as not-on-website...");
  const unverified = ["ev-27", "ev-43", "ev-46", "ev-47", "ev-49"];
  for (const id of unverified) {
    await client.patch(id).set({ displayOnWebsite: false, description: "Not in current Slack tracker — needs verification" }).commit();
    console.log(`  ${id} → displayOnWebsite: false (not in tracker)`);
  }

  console.log("\n✅ All event statuses synced with Slack Master Tracker.");
  console.log("   Status fixes: " + statusFixes.length);
  console.log("   New events added: " + newEvents.length);
  console.log("   Unverified future events hidden: " + unverified.length);
}

fix().catch(console.error);
