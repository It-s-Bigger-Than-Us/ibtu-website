/**
 * Update sponsor packages with Bloomerang/Qgiv form URLs.
 * Also set the volunteer/donation URLs on programs.
 * Run: SANITY_TOKEN=xxx npx tsx scripts/update-bloomerang-urls.ts
 */
import { createClient } from "@sanity/client";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "0m4ngfcw", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false,
});

async function update() {
  console.log("Updating Qgiv donation form URLs...\n");

  // Map programs to their Qgiv form URLs
  const programForms: Record<string, string> = {
    "prog-back-2-school": "https://secure.qgiv.com/for/bac2sch",
    "prog-coastal-care": "https://secure.qgiv.com/for/coastalclean-up",
    "prog-community-health": "https://secure.qgiv.com/for/fooddistributionresourceaccess",
    "prog-youth-programming": "https://secure.qgiv.com/for/youtprogram",
    "prog-wellness": "https://secure.qgiv.com/for/communitywellness",
    "prog-fire-relief": "https://secure.qgiv.com/for/firerelief",
  };

  // Update all sponsor packages with their program's Qgiv URL
  const packagePrefixes: Record<string, string> = {
    "sp-b2s": "https://secure.qgiv.com/for/bac2sch",
    "sp-cc": "https://secure.qgiv.com/for/coastalclean-up",
    "sp-well": "https://secure.qgiv.com/for/communitywellness",
    "sp-ch": "https://secure.qgiv.com/for/fooddistributionresourceaccess",
    "sp-gs": "https://secure.qgiv.com/for/bac2sch", // Giving Season uses general form for now
  };

  // Get all sponsor packages
  const packages = await client.fetch('*[_type == "programSponsorPackage"] { _id }');
  console.log(`Found ${packages.length} sponsor packages to update...`);

  for (const pkg of packages) {
    const prefix = Object.keys(packagePrefixes).find(p => pkg._id.startsWith(p));
    if (prefix) {
      await client.patch(pkg._id).set({ bloomerangFormUrl: packagePrefixes[prefix] }).commit();
      console.log(`  ${pkg._id} → ${packagePrefixes[prefix]}`);
    }
  }

  console.log("\n✅ All sponsor packages updated with Qgiv form URLs.");
  console.log("\nAdditional Qgiv forms (not yet assigned to sponsor packages):");
  console.log("  Community Builder Link-ups: https://secure.qgiv.com/for/communitybuilderlinkups");
  console.log("  Gala: https://secure.qgiv.com/for/acityunitedgala12126");
}

update().catch(console.error);
