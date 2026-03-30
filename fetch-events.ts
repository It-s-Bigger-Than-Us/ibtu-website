import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0m4ngfcw",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Fetch ALL events (not just displayOnWebsite) to get the full 54
const query = `*[_type == "event"] | order(year desc, dateStart desc) {
  _id, title, jobNumber, year, dateStart, dateEnd, status,
  "programTitle": program->title,
  "programSlug": program->slug.current
}`;

async function main() {
  const events = await client.fetch(query);
  console.log(`\nTotal events: ${events.length}\n`);
  console.log("-----------------------------------------------------------");
  console.log("# | Job Number | Year | Program | Title | Status");
  console.log("-----------------------------------------------------------");
  events.forEach((e: any, i: number) => {
    const jn = e.jobNumber || "(none)";
    const prog = e.programSlug || e.programTitle || "(no program)";
    console.log(`${i + 1} | ${jn} | ${e.year} | ${prog} | ${e.title} | ${e.status}`);
  });
  console.log("-----------------------------------------------------------");

  // Also output as a clean list for matching
  console.log("\n\n=== JOB NUMBER QUICK REFERENCE ===\n");
  const withJN = events.filter((e: any) => e.jobNumber);
  const withoutJN = events.filter((e: any) => !e.jobNumber);

  console.log(`Events WITH job numbers: ${withJN.length}`);
  console.log(`Events WITHOUT job numbers: ${withoutJN.length}\n`);

  if (withJN.length > 0) {
    console.log("--- Events with Job Numbers ---");
    withJN.forEach((e: any) => {
      console.log(`  ${e.jobNumber}  →  ${e.title} (${e.year}, ${e.programSlug || e.programTitle})`);
    });
  }

  if (withoutJN.length > 0) {
    console.log("\n--- Events WITHOUT Job Numbers ---");
    withoutJN.forEach((e: any) => {
      console.log(`  (none)  →  ${e.title} (${e.year}, ${e.programSlug || e.programTitle})`);
    });
  }
}

main().catch(console.error);
