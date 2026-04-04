/**
 * Apply Molly's CSV edits to all events in Sanity.
 * Run: SANITY_TOKEN=xxx npx tsx scripts/apply-event-csv-changes.ts
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "0m4ngfcw", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false,
});

interface EventUpdate {
  _id: string;
  title?: string;
  jobNumber?: string;
  status?: string;
  category?: string;
  waysToGetInvolved?: string;
  displayOnWebsite?: boolean;
  year?: number;
  dateStart?: string;
  location?: string;
}

async function apply() {
  console.log("Applying Molly's CSV edits to Sanity events...\n");

  const updates: EventUpdate[] = [
    // ── Row-by-row from Molly's edited CSV (first 33 rows) ──
    { _id: "ev-prop-umed-rf", jobNumber: "SCH-S26-PROP-UMED-HS-RF-041626", category: "Resource Fair", waysToGetInvolved: "Volunteer", location: "On Campus" },
    { _id: "ev-active-hub-phase2", title: "The Hub: Weekly Appointments", jobNumber: "Hub-S26-010-IBTU-FireRelief-Phase2-Weekly" },
    { _id: "ev-27", jobNumber: "PROG-F25-011-FireRelief-JobFair-12182025", year: 2025, dateStart: "12/18/2025" },
    { _id: "ev-cc-20261114", title: "November Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-111426" },
    { _id: "ev-cc-20261010", title: "October Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-101026" },
    { _id: "ev-cc-20260912", title: "September Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-091226" },
    { _id: "ev-cc-20260808", title: "August Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-080826" },
    { _id: "ev-active-b2s-2026", title: "The 7th Annual Back 2 School Festival — Stop #1" },
    { _id: "ev-cc-20260711", title: "July Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-071126" },
    { _id: "ev-cc-20260613", title: "June Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-061326" },
    { _id: "ev-cc-20260509", title: "May Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-050926" },
    { _id: "ev-cc-20260411", title: "April Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-041126" },
    { _id: "ev-cc-20260314", title: "March Community Clean Up" },
    { _id: "ev-57", title: "February Community Clean Up" },
    { _id: "ev-12", title: "Lunchtime Takeover Experience Package at Hillcrest Drive Elementary School" },
    { _id: "ev-active-yes-staff-s26", title: "Professional Development Workshop at YES Academy Elementary School", category: "Staff Appreciation" },
    { _id: "ev-prop-alliance-retreat", status: "Closed" },
    { _id: "ev-active-bhes-lt-0306", status: "Closed" },

    // ── Apply same patterns to remaining events (rows 34+) ──
    // These events were NOT in Molly's edited rows but need the same pattern applied:

    // Remaining Coastal Care events — use "Month Community Clean Up" pattern
    { _id: "ev-cc-20261212", title: "December Community Clean Up", jobNumber: "PROG-S26-002-IBTU-CoastalCare-121226" },

    // Remaining school events — add waysToGetInvolved based on category
    { _id: "ev-09", waysToGetInvolved: "Resource Fair" },
    { _id: "ev-15", waysToGetInvolved: "Lunchtime Takeover" },
    { _id: "ev-08", waysToGetInvolved: "Resource Fair" },
    { _id: "ev-16", waysToGetInvolved: "Parent Empowerment Workshop" },
    { _id: "ev-02", waysToGetInvolved: "Lunchtime Takeover" },
    { _id: "ev-13", waysToGetInvolved: "Resource Fair" },
    { _id: "ev-05", waysToGetInvolved: "Young Community Builder Program Series" },
    { _id: "ev-01", waysToGetInvolved: "Parent Empowerment Series" },
    { _id: "ev-17", waysToGetInvolved: "Staff Appreciation" },
    { _id: "ev-07", waysToGetInvolved: "Lunchtime Takeover" },
    { _id: "ev-14", waysToGetInvolved: "Resource Fair" },
    { _id: "ev-18", waysToGetInvolved: "Lunchtime Takeover" },
    { _id: "ev-11", waysToGetInvolved: "Resource Fair" },
    { _id: "ev-10", waysToGetInvolved: "Lunchtime Takeover" },
    { _id: "ev-04", waysToGetInvolved: "Resource Fair" },
    { _id: "ev-03", waysToGetInvolved: "Resource Fair" },
    { _id: "ev-06", waysToGetInvolved: "Lunchtime Takeover" },

    // Giving Season / Wellness / Community Health — add waysToGetInvolved: "Volunteer"
    { _id: "ev-42", waysToGetInvolved: "Volunteer" },
    { _id: "ev-50", waysToGetInvolved: "Volunteer" },
    { _id: "ev-44", waysToGetInvolved: "Volunteer" },
    { _id: "ev-45", waysToGetInvolved: "Volunteer" },
    { _id: "ev-55", waysToGetInvolved: "Volunteer" },
    { _id: "ev-56", waysToGetInvolved: "Volunteer" },
    { _id: "ev-54", waysToGetInvolved: "Volunteer" },
    { _id: "ev-41", waysToGetInvolved: "Volunteer" },
    { _id: "ev-33", waysToGetInvolved: "Volunteer" },
    { _id: "ev-51", waysToGetInvolved: "Volunteer" },
    { _id: "ev-48", waysToGetInvolved: "Volunteer" },

    // B2S events — waysToGetInvolved: "Volunteer"
    { _id: "ev-36", waysToGetInvolved: "Volunteer" },
    { _id: "ev-35", waysToGetInvolved: "Volunteer" },
    { _id: "ev-34", waysToGetInvolved: "Volunteer" },
    { _id: "ev-40", waysToGetInvolved: "Volunteer" },

    // Coastal Care past events — waysToGetInvolved: "Volunteer"
    { _id: "ev-53", waysToGetInvolved: "Volunteer" },
    { _id: "ev-52", waysToGetInvolved: "Volunteer" },
    { _id: "ev-37", waysToGetInvolved: "Volunteer" },

    // Fire Relief — waysToGetInvolved: "Volunteer"
    { _id: "ev-28", waysToGetInvolved: "Volunteer" },
    { _id: "ev-30", waysToGetInvolved: "Volunteer" },
    { _id: "ev-25", waysToGetInvolved: "Volunteer" },
    { _id: "ev-26", waysToGetInvolved: "Volunteer" },
    { _id: "ev-31", waysToGetInvolved: "Volunteer" },
    { _id: "ev-24", waysToGetInvolved: "Volunteer" },
    { _id: "ev-29", waysToGetInvolved: "Volunteer" },
    { _id: "ev-23", waysToGetInvolved: "Volunteer" },

    // Wellness
    { _id: "ev-39", waysToGetInvolved: "Volunteer" },

    // Active events — waysToGetInvolved
    { _id: "ev-active-hub-wfb", waysToGetInvolved: "Volunteer" },
    // ev-active-digital-lit — CANCELLED, removed
    { _id: "ev-gala-2026", waysToGetInvolved: "Attend" },
    { _id: "ev-active-b2s-2026", waysToGetInvolved: "Volunteer" },
    { _id: "ev-active-yes-lt-s26", waysToGetInvolved: "Lunchtime Takeover" },
    { _id: "ev-active-bhes-lt-0406", waysToGetInvolved: "Lunchtime Takeover" },
    { _id: "ev-active-hillcrest-pd", waysToGetInvolved: "Professional Development" },

    // Coastal Care 2026 — all "Volunteer"
    { _id: "ev-cc-20260314", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20260411", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20260509", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20260613", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20260711", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20260808", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20260912", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20261010", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20261114", waysToGetInvolved: "Volunteer" },
    { _id: "ev-cc-20261212", waysToGetInvolved: "Volunteer" },
  ];

  let count = 0;
  for (const u of updates) {
    const { _id, ...fields } = u;
    const patch = client.patch(_id);
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) patch.set({ [key]: value });
    }
    await patch.commit();
    count++;
    if (count % 10 === 0) console.log(`  ${count}/${updates.length} updated...`);
  }

  console.log(`\n✅ ${count} events updated from Molly's CSV edits.`);
  console.log("   Patterns applied: simplified Coastal Care names, waysToGetInvolved field,");
  console.log("   corrected job numbers, status fixes, B2S renaming.");
}

apply().catch(console.error);
