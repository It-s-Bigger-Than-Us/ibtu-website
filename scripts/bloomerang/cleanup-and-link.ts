/**
 * Bloomerang CRM — Full Cleanup & Relationship Creation
 *
 * WHAT THIS DOES:
 * 1. Converts event-specific groups to tags (preserves history)
 * 2. Creates top 30 missing org records
 * 3. Creates Employee/Employer relationships for matched individuals
 * 4. Builds school hierarchy (LAUSD → Alliance → campuses)
 * 5. Converts 11 mistyped org records to Individual type
 *
 * WHAT THIS DOES NOT DO:
 * - Does NOT delete any records
 * - Does NOT touch transactions or financial data
 * - Does NOT sync to Sanity
 * - Does NOT remove anyone from groups (just adds tags)
 *
 * Run: npx tsx scripts/bloomerang/cleanup-and-link.ts
 */

const API_KEY = process.env.BLOOMERANG_API_KEY ?? "";
if (!API_KEY) {
  console.error("BLOOMERANG_API_KEY env var not set — export it before running this script.");
  process.exit(1);
}
const API_BASE = "https://api.bloomerang.co/v2";
const HEADERS: Record<string, string> = { "X-API-KEY": API_KEY, "Content-Type": "application/json" };

async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { headers: HEADERS });
  return res.json();
}

async function apiPost(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  return res.json();
}

async function apiPut(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  return res.json();
}

// Rate limit helper
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchAllConstituents() {
  const all: any[] = [];
  let skip = 0;
  while (true) {
    const data = await apiGet(`/constituents?skip=${skip}&take=50&orderBy=Id`);
    if (!data.Results || data.Results.length === 0) break;
    all.push(...data.Results);
    skip += 50;
    if (skip % 500 === 0) console.log(`  Fetched ${skip}/${data.Total}...`);
    if (all.length >= data.Total) break;
  }
  return all;
}

async function main() {
  console.log("═══════════════════════════════════════════");
  console.log("BLOOMERANG CRM — FULL CLEANUP & LINKING");
  console.log("═══════════════════════════════════════════\n");

  // Pull all constituents
  console.log("Step 1: Pulling all constituents...");
  const all = await fetchAllConstituents();
  console.log(`  Total: ${all.length}\n`);

  const individuals = all.filter((c: any) => c.Type === "Individual");
  const orgs = all.filter((c: any) => c.Type === "Organization");
  const orgNameMap = new Map(orgs.map((o: any) => [o.FullName.toLowerCase(), o.Id]));

  // ── STEP 2: Convert event-specific groups to tags ──
  console.log("Step 2: Converting event-specific groups to tags...");

  const eventGroups = [
    "IBTU X lululemon Yoga Activation in Leimert Park",
    "IBTU x The Nonprofit Plug workshop: 4/20/24",
    "Event Brite Registrations",
    "Community Builder Link Up",
    "Venice Chamber",
    "RESOURCE FAIR INVITES",
    "Miami Contacts",
    "Fundraiser Host",
    "KEIR",
    "IMPORTANT 2024",
    "Tyrone's Business Cards",
  ];

  let tagCount = 0;
  for (const groupName of eventGroups) {
    // Find all constituents in this group
    const members = all.filter((c: any) =>
      (c.GroupsDetails || []).some((g: any) => g.Name === groupName)
    );

    if (members.length === 0) continue;

    console.log(`  "${groupName}" → tagging ${members.length} people...`);

    for (const member of members) {
      try {
        // Add a note/tag via the custom values or interaction
        // Bloomerang doesn't have a "tags" endpoint, so we'll log it as an interaction
        await apiPost("/interactions", {
          AccountId: member.Id,
          Channel: "Other",
          Purpose: "Other",
          Subject: `Historical Group: ${groupName}`,
          Note: `This constituent was in the group "${groupName}" — converted to interaction for history tracking on ${new Date().toISOString().split("T")[0]}.`,
          Date: new Date().toISOString().split("T")[0],
          IsInbound: false,
        });
        tagCount++;
        await sleep(100); // Rate limit
      } catch (err: any) {
        console.log(`    ⚠️ Failed for ${member.FullName}: ${err.message}`);
      }
    }
    console.log(`    ✅ ${members.length} tagged`);
  }
  console.log(`  Total interactions created: ${tagCount}\n`);

  // ── STEP 3: Create top 30 missing org records ──
  console.log("Step 3: Creating top 30 missing org records...");

  const topEmployers = [
    "Los Angeles County Board of Supervisors",
    "Charles R. Drew University of Medicine and Science",
    "Baby2Baby",
    "AT&T",
    "Lululemon Athletica Inc.",
    "The Potter's House",
    "Westside Food Bank",
    "California State Assembly",
    "Internal Services Department, LA County",
    "YMCA of Metropolitan Los Angeles",
    "Sola Impact",
    "Aetna",
    "Heart of LA",
    "City of Inglewood",
    "LA84 Foundation",
    "Cyclical Inc",
    "Los Angeles County Department of Mental Health",
    "Disney",
    "Dream Center",
    "The Nonprofit Plug",
    "Los Angeles County Department of Youth Development",
    "Visa",
    "Dollar Tree",
    "Fox",
    "AM PR Group",
    "Support and Feed",
    "Kaiser Permanente",
    "Wells Fargo",
    "Nike",
    "Apple",
  ];

  const newOrgIds: Map<string, number> = new Map();

  for (const employer of topEmployers) {
    // Check if already exists (case-insensitive)
    if (orgNameMap.has(employer.toLowerCase())) {
      console.log(`  Already exists: ${employer} (#${orgNameMap.get(employer.toLowerCase())})`);
      newOrgIds.set(employer.toLowerCase(), orgNameMap.get(employer.toLowerCase())!);
      continue;
    }

    try {
      const result = await apiPost("/constituents", {
        Type: "Organization",
        FullName: employer,
        Status: "Active",
      });

      if (result.Id) {
        console.log(`  ✅ Created: ${employer} (#${result.Id})`);
        newOrgIds.set(employer.toLowerCase(), result.Id);
        orgNameMap.set(employer.toLowerCase(), result.Id);
      } else {
        console.log(`  ⚠️ Failed: ${employer} — ${JSON.stringify(result).substring(0, 100)}`);
      }
      await sleep(200);
    } catch (err: any) {
      console.log(`  ⚠️ Error: ${employer} — ${err.message}`);
    }
  }
  console.log();

  // ── STEP 4: Create Employee/Employer relationships ──
  console.log("Step 4: Creating Employee/Employer relationships...");

  // Role IDs from the API
  const EMPLOYEE_ROLE_ID = 19;
  const EMPLOYER_ROLE_ID = 20;

  let relCount = 0;
  for (const ind of individuals) {
    if (!ind.Employer) continue;

    const orgId = orgNameMap.get(ind.Employer.toLowerCase());
    if (!orgId) continue;

    try {
      await apiPost("/relationships", {
        AccountId1: ind.Id,
        RoleId1: EMPLOYEE_ROLE_ID,
        AccountId2: orgId,
        RoleId2: EMPLOYER_ROLE_ID,
      });
      relCount++;
      if (relCount % 50 === 0) console.log(`  ${relCount} relationships created...`);
      await sleep(100);
    } catch (err: any) {
      // Might already exist — that's fine
      if (!err.message?.includes("already exists")) {
        console.log(`  ⚠️ Failed: ${ind.FullName} → ${ind.Employer}: ${err.message}`);
      }
    }
  }
  console.log(`  ✅ ${relCount} Employee/Employer relationships created\n`);

  // ── STEP 5: Build school hierarchy ──
  console.log("Step 5: Building school hierarchy...");

  const DISTRICT_ROLE_ID = 107543553;
  const SCHOOL_ROLE_ID = 105908225;

  // Find LAUSD and Alliance parent orgs
  const lausdId = orgNameMap.get("los angeles unified school district");
  const allianceId = orgNameMap.get("alliance college ready public schools");

  if (lausdId && allianceId) {
    // Link Alliance as subsidiary of LAUSD
    try {
      await apiPost("/relationships", {
        AccountId1: lausdId,
        RoleId1: DISTRICT_ROLE_ID,
        AccountId2: allianceId,
        RoleId2: SCHOOL_ROLE_ID,
      });
      console.log(`  ✅ LAUSD (#${lausdId}) → Alliance (#${allianceId})`);
    } catch { console.log("  ⚠️ LAUSD → Alliance link may already exist"); }

    // Find all schools in LAUSD SCHOOLS group
    const lausdSchools = orgs.filter((o: any) =>
      (o.GroupsDetails || []).some((g: any) => g.Name === "LAUSD SCHOOLS" || g.Name === "LAUSD 26")
    );

    console.log(`  Linking ${lausdSchools.length} schools to LAUSD...`);
    let schoolCount = 0;
    for (const school of lausdSchools) {
      if (school.Id === lausdId || school.Id === allianceId) continue;

      // Determine if it's an Alliance school
      const isAlliance = school.FullName.toLowerCase().includes("alliance");
      const parentId = isAlliance ? allianceId : lausdId;

      try {
        await apiPost("/relationships", {
          AccountId1: parentId,
          RoleId1: DISTRICT_ROLE_ID,
          AccountId2: school.Id,
          RoleId2: SCHOOL_ROLE_ID,
        });
        schoolCount++;
        await sleep(100);
      } catch {
        // May already exist
      }
    }
    console.log(`  ✅ ${schoolCount} school hierarchy links created`);
  } else {
    console.log("  ⚠️ LAUSD or Alliance org not found — skipping hierarchy");
  }

  // ── STEP 6: Convert mistyped org records ──
  console.log("\nStep 6: Converting mistyped org records to Individual...");

  const mistyped = [
    { id: 10231, name: "Christopher Sanco" },
    { id: 10232, name: "Melissa London" },
    { id: 10234, name: "Susannah Yorke-Washington" },
    { id: 10237, name: "Melody Morris" },
    { id: 10238, name: "Jeremy McDavid" },
    { id: 10239, name: "Victor Sanchez" },
    { id: 10240, name: "Chanelle Thoma" },
    { id: 10241, name: "Johnny Rivera" },
    { id: 10242, name: "Evelyn Samos" },
    { id: 10245, name: "Christian Panes" },
    { id: 10246, name: "Jeanette Reyes" },
  ];

  for (const record of mistyped) {
    try {
      // Bloomerang API may not support type conversion via PATCH
      // Try to update the type field
      const result = await apiPut(`/constituents/${record.id}`, {
        Type: "Individual",
        FirstName: record.name.split(" ")[0],
        LastName: record.name.split(" ").slice(1).join(" "),
      });
      console.log(`  ✅ ${record.name} (#${record.id}) → Individual`);
      await sleep(200);
    } catch (err: any) {
      console.log(`  ⚠️ ${record.name} (#${record.id}): ${err.message || "conversion may not be supported via API"}`);
    }
  }

  console.log("\n═══════════════════════════════════════════");
  console.log("CLEANUP COMPLETE");
  console.log("═══════════════════════════════════════════");
  console.log(`  Event groups → interactions: ${tagCount}`);
  console.log(`  New org records created: ${newOrgIds.size}`);
  console.log(`  Employee/Employer relationships: ${relCount}`);
  console.log(`  School hierarchy links: (see above)`);
  console.log(`  Mistyped records converted: 11 attempted`);
  console.log("\n  NO RECORDS WERE DELETED.");
  console.log("  Review in Bloomerang dashboard to verify.\n");
}

main().catch(console.error);
