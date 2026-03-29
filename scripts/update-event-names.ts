/**
 * Update event names to full public-facing format.
 * No abbreviations. Include program type, school name, etc.
 * Run: SANITY_TOKEN=xxx npx tsx scripts/update-event-names.ts
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "0m4ngfcw", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false,
});

async function update() {
  console.log("Updating event names to full public format...\n");

  const renames: Array<{ _id: string; title: string; category?: string }> = [
    // School programs — full format: "Program Type at School Name"
    { _id: "ev-01", title: "Parent Empowerment Program (8-Week Series) at South Park Elementary School", category: "Parent Empowerment Series" },
    { _id: "ev-02", title: "Lunchtime Takeover Package at Hillcrest Drive Elementary School", category: "Lunchtime Takeover" },
    { _id: "ev-03", title: "Resource Fair at UPMA Middle School", category: "Resource Fair" },
    { _id: "ev-04", title: "Resource Fair at Purche Avenue Elementary School", category: "Resource Fair" },
    { _id: "ev-05", title: "Community Creators Program at Iovine & Young Center", category: "Young Community Builder Program Series" },
    { _id: "ev-06", title: "Lunchtime Takeover & Resource Fairs at 186th Street Elementary School", category: "Lunchtime Takeover" },
    { _id: "ev-07", title: "Lunchtime Takeover Series at Mar Vista Gardens Middle School", category: "Lunchtime Takeover" },
    { _id: "ev-08", title: "Resource Fair (Fall) at Purche Avenue Elementary School", category: "Resource Fair" },
    { _id: "ev-09", title: "Resource Fair at Wright Middle School", category: "Resource Fair" },
    { _id: "ev-10", title: "Lunchtime Takeover Series at YES Academy Elementary School", category: "Lunchtime Takeover" },
    { _id: "ev-11", title: "Resource Fair at Brentwood Science Magnet Elementary School", category: "Resource Fair" },
    { _id: "ev-12", title: "Lunchtime Takeover Package at Hillcrest Drive Elementary School", category: "Lunchtime Takeover" },
    { _id: "ev-13", title: "Resource Fair at Towne Avenue Elementary School", category: "Resource Fair" },
    { _id: "ev-14", title: "Resource Fair (Spring) at Wright Middle School", category: "Resource Fair" },
    { _id: "ev-15", title: "Lunchtime Takeover & 75th Day Celebration at Purche Avenue Elementary School", category: "Lunchtime Takeover" },
    { _id: "ev-16", title: "Parent Empowerment Day at Purche Avenue Elementary School", category: "Parent Empowerment Workshop" },
    { _id: "ev-17", title: "Staff Appreciation & Wellness Day at Century Park Elementary School", category: "Staff Appreciation" },
    { _id: "ev-18", title: "Lunchtime Takeover at YES Academy Elementary School", category: "Lunchtime Takeover" },

    // Fire Relief — full names
    { _id: "ev-28", title: "Phase 1A Emergency Response — 14-Day Citywide Relief Sprint" },
    { _id: "ev-29", title: "Phase 1B — First Responder Support & Community Coordination" },
    { _id: "ev-30", title: "Together We Rebuild — Community Recovery Event at SoLa Beehive" },
    { _id: "ev-25", title: "Disaster Relief and Recovery Hub Grand Opening at Baldwin Hills Crenshaw Plaza" },
    { _id: "ev-26", title: "Immigration Emergency Response — LAUSD Campus Resource Distribution" },

    // B2S — full names
    { _id: "ev-34", title: "It's Bigger Than Us 6th Annual Back 2 School Festival — Baldwin Hills Crenshaw Plaza" },
    { _id: "ev-35", title: "It's Bigger Than Us 6th Annual Back 2 School Festival — Venice Beach" },
    { _id: "ev-36", title: "It's Bigger Than Us 6th Annual Back 2 School — Crenshaw High School Basketball Court Dedication" },

    // Active school events
    { _id: "ev-active-yes-lt-s26", title: "Lunchtime Takeover at YES Academy Elementary School (Spring 2026)", category: "Lunchtime Takeover" },
    { _id: "ev-active-yes-staff-s26", title: "Staff Appreciation & Healing Day at YES Academy Elementary School", category: "Staff Appreciation" },
    { _id: "ev-active-bhes-lt-0306", title: "Lunchtime Takeover at Baldwin Hills Elementary School (March 2026)", category: "Lunchtime Takeover" },
    { _id: "ev-active-bhes-lt-0406", title: "Lunchtime Takeover at Baldwin Hills Elementary School (April 2026)", category: "Lunchtime Takeover" },
    { _id: "ev-active-hillcrest-pd", title: "Professional Development — Wellness & Resiliency at Hillcrest Drive Elementary School", category: "Professional Development" },
    { _id: "ev-active-b2s-2026", title: "It's Bigger Than Us 7th Annual Back 2 School Festival — Baldwin Hills Crenshaw Plaza" },

    // Coastal Care — full names with location
    { _id: "ev-cc-20260314", title: "Coastal Care Beach Clean-Up — March 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20260411", title: "Coastal Care Beach Clean-Up — April 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20260509", title: "Coastal Care Beach Clean-Up — May 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20260613", title: "Coastal Care Beach Clean-Up — June 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20260711", title: "Coastal Care Beach Clean-Up — July 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20260808", title: "Coastal Care Beach Clean-Up — August 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20260912", title: "Coastal Care Beach Clean-Up — September 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20261010", title: "Coastal Care Beach Clean-Up — October 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20261114", title: "Coastal Care Beach Clean-Up — November 2026 at Venice Beach Pier" },
    { _id: "ev-cc-20261212", title: "Coastal Care Beach Clean-Up — December 2026 at Venice Beach Pier" },

    // Proposals — full names (internal only)
    { _id: "ev-prop-purche-pw", title: "Parent Empowerment Workshop at Purche Avenue Elementary School", category: "Parent Empowerment Workshop" },
    { _id: "ev-prop-purche-pd", title: "Professional Development Workshop at Purche Avenue Elementary School", category: "Professional Development" },
    { _id: "ev-prop-purche-lt", title: "Lunchtime Takeover at Purche Avenue Elementary School (Spring 2026)", category: "Lunchtime Takeover" },
    { _id: "ev-prop-purche-rf", title: "Resource Fair at Purche Avenue Elementary School (Spring 2026)", category: "Resource Fair" },
    { _id: "ev-prop-towne-rf", title: "Tier 3 Resource Fair at Towne Avenue Elementary School", category: "Resource Fair" },
    { _id: "ev-prop-alliance-retreat", title: "Young Black Men's Empowerment Retreat at Alliance College-Ready Public Schools Central", category: "Building Community Builders Workshop & Retreat" },
    { _id: "ev-prop-umed-rf", title: "Resource Fair at University Pathways Medical Magnet High School", category: "Resource Fair" },

    // Gala
    { _id: "ev-gala-2026", title: "A City United — IBTU's Annual Gala at The Biltmore Hotel, Los Angeles" },
  ];

  for (const r of renames) {
    const patch = client.patch(r._id).set({ title: r.title });
    if (r.category) patch.set({ category: r.category });
    await patch.commit();
    console.log(`  ${r._id} → ${r.title}`);
  }

  console.log(`\n✅ ${renames.length} event names updated to full public format.`);
}

update().catch(console.error);
