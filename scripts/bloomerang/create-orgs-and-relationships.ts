/**
 * Bloomerang CRM — Create Org Records + Relationships
 * Uses SINGULAR endpoints: /v2/constituent and /v2/relationship
 *
 * Run: npx tsx scripts/bloomerang/create-orgs-and-relationships.ts
 */

const API_KEY = process.env.BLOOMERANG_API_KEY ?? "";
if (!API_KEY) {
  console.error("BLOOMERANG_API_KEY env var not set — export it before running this script.");
  process.exit(1);
}
const API_BASE = "https://api.bloomerang.co/v2";
const HEADERS: Record<string, string> = { "X-API-KEY": API_KEY, "Content-Type": "application/json" };

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { headers: HEADERS });
  return res.json();
}

async function createOrg(name: string, website?: string): Promise<number | null> {
  const body: any = { Type: "Organization", FullName: name, Status: "Active" };
  if (website) body.Website = website;
  const res = await fetch(`${API_BASE}/constituent`, {
    method: "POST", headers: HEADERS, body: JSON.stringify(body),
  });
  const data = await res.json();
  if (data.Id) return data.Id;
  if (data.Message?.includes("already exists") || data.Message?.includes("duplicate")) return null;
  console.log(`  ⚠️ Create org failed: ${name} — ${data.Message || JSON.stringify(data).substring(0, 100)}`);
  return null;
}

async function createRelationship(id1: number, roleId1: number, id2: number, roleId2: number): Promise<boolean> {
  const res = await fetch(`${API_BASE}/relationship`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ AccountId1: id1, AccountId2: id2, RelationshipRoleId1: roleId1, RelationshipRoleId2: roleId2 }),
  });
  const data = await res.json();
  if (data.Id) return true;
  // Already exists is fine
  if (data.Message?.includes("already") || data.ErrorCode === 409) return true;
  return false;
}

async function fetchAll(): Promise<any[]> {
  const all: any[] = [];
  let skip = 0;
  while (true) {
    const data = await apiGet(`/constituents?skip=${skip}&take=50&orderBy=Id`);
    if (!data.Results?.length) break;
    all.push(...data.Results);
    skip += 50;
    if (skip % 1000 === 0) console.log(`  Fetched ${skip}/${data.Total}...`);
    if (all.length >= data.Total) break;
  }
  return all;
}

// Role IDs (from API)
const ROLES = {
  DISTRICT: 107543553,
  SCHOOL: 105908225,
  EMPLOYEE: 19,
  EMPLOYER: 20,
  PRINCIPAL: 105860097,
  AP: 105859073,
  SUPERINTENDENT: 105865217,
};

async function main() {
  console.log("═══════════════════════════════════════════");
  console.log("BLOOMERANG — CREATE ORGS + RELATIONSHIPS");
  console.log("Using /v2/constituent and /v2/relationship (singular)");
  console.log("═══════════════════════════════════════════\n");

  // Pull all constituents
  console.log("Step 1: Pulling all constituents...");
  const all = await fetchAll();
  console.log(`  Total: ${all.length}\n`);

  const individuals = all.filter((c: any) => c.Type === "Individual");
  const orgs = all.filter((c: any) => c.Type === "Organization");
  const orgNameMap = new Map<string, number>();
  orgs.forEach((o: any) => orgNameMap.set(o.FullName.toLowerCase(), o.Id));

  // ── STEP 2: Create missing org records ──
  console.log("Step 2: Creating missing org records...");

  const orgsToCreate = [
    { name: "Los Angeles County Board of Supervisors", web: "bos.lacounty.gov" },
    { name: "Charles R. Drew University of Medicine and Science", web: "cdrewu.edu" },
    { name: "AT&T", web: "att.com" },
    { name: "Lululemon Athletica Inc.", web: "lululemon.com" },
    { name: "The Potter's House", web: "thepottershouse.org" },
    { name: "Westside Food Bank", web: "westsidefoodbankca.org" },
    { name: "California State Assembly", web: "assembly.ca.gov" },
    { name: "Internal Services Department, LA County" },
    { name: "YMCA of Metropolitan Los Angeles", web: "ymcala.org" },
    { name: "Sola Impact", web: "solaimpact.com" },
    { name: "Aetna", web: "aetna.com" },
    { name: "Heart of LA", web: "heartofla.org" },
    { name: "City of Inglewood", web: "cityofinglewood.org" },
    { name: "LA84 Foundation", web: "la84.org" },
    { name: "Cyclical Inc" },
    { name: "Los Angeles County Department of Mental Health", web: "dmh.lacounty.gov" },
    { name: "Disney", web: "disney.com" },
    { name: "Dream Center", web: "dreamcenter.org" },
    { name: "The Nonprofit Plug", web: "thenonprofitplug.com" },
    { name: "Los Angeles County Department of Youth Development" },
    { name: "Visa", web: "visa.com" },
    { name: "Dollar Tree", web: "dollartree.com" },
    { name: "Fox", web: "fox.com" },
    { name: "AM PR Group" },
    { name: "Support and Feed", web: "supportandfeed.org" },
    { name: "Wells Fargo", web: "wellsfargo.com" },
    { name: "Nike", web: "nike.com" },
    { name: "Apple", web: "apple.com" },
    { name: "Pepsi", web: "pepsico.com" },
    { name: "Target Corporation", web: "target.com" },
  ];

  let orgCount = 0;
  for (const org of orgsToCreate) {
    if (orgNameMap.has(org.name.toLowerCase())) {
      console.log(`  Already exists: ${org.name}`);
      continue;
    }
    const id = await createOrg(org.name, org.web);
    if (id) {
      orgNameMap.set(org.name.toLowerCase(), id);
      orgCount++;
      console.log(`  ✅ Created: ${org.name} (#${id})`);
    }
    await sleep(200);
  }
  console.log(`  ${orgCount} new org records created\n`);

  // ── STEP 3: Employee/Employer relationships ──
  console.log("Step 3: Creating Employee/Employer relationships...");

  let empRelCount = 0;
  let empSkipped = 0;
  for (const ind of individuals) {
    if (!ind.Employer) continue;
    const orgId = orgNameMap.get(ind.Employer.toLowerCase());
    if (!orgId) { empSkipped++; continue; }

    const ok = await createRelationship(ind.Id, ROLES.EMPLOYEE, orgId, ROLES.EMPLOYER);
    if (ok) empRelCount++;
    await sleep(100);
    if (empRelCount % 50 === 0 && empRelCount > 0) console.log(`  ${empRelCount} relationships created...`);
  }
  console.log(`  ✅ ${empRelCount} Employee/Employer relationships created (${empSkipped} skipped — no matching org)\n`);

  // ── STEP 4: School hierarchy ──
  console.log("Step 4: Building school hierarchy...");

  const lausdId = orgNameMap.get("los angeles unified school district");
  const allianceId = orgNameMap.get("alliance college ready public schools");

  if (!lausdId || !allianceId) {
    console.log("  ⚠️ LAUSD or Alliance not found — skipping hierarchy");
  } else {
    // Alliance → LAUSD
    const ok = await createRelationship(lausdId, ROLES.DISTRICT, allianceId, ROLES.SCHOOL);
    console.log(`  ${ok ? "✅" : "⚠️"} LAUSD (#${lausdId}) → Alliance (#${allianceId})`);
    await sleep(200);

    // All schools in LAUSD SCHOOLS or LAUSD 26 groups → LAUSD or Alliance
    let schoolRelCount = 0;
    for (const org of orgs) {
      if (org.Id === lausdId || org.Id === allianceId) continue;

      const groups = (org.GroupsDetails || []).map((g: any) => g.Name);
      const isSchool = groups.includes("LAUSD SCHOOLS") || groups.includes("LAUSD 26") || groups.includes("LAUSD");
      if (!isSchool && org.Type !== "Organization") continue;

      // Check if it's a school (has "school", "elementary", "middle", "high", "academy" in name)
      const nameLower = org.FullName.toLowerCase();
      const isSchoolName = nameLower.includes("school") || nameLower.includes("elementary") ||
        nameLower.includes("middle") || nameLower.includes("high") || nameLower.includes("academy") ||
        nameLower.includes("magnet") || nameLower.includes("preparatory");

      if (!isSchool && !isSchoolName) continue;

      // Determine parent
      const isAlliance = nameLower.includes("alliance");
      const parentId = isAlliance ? allianceId : lausdId;

      const ok = await createRelationship(parentId, ROLES.DISTRICT, org.Id, ROLES.SCHOOL);
      if (ok) schoolRelCount++;
      await sleep(100);
    }
    console.log(`  ✅ ${schoolRelCount} school hierarchy links created\n`);
  }

  // ── STEP 5: LAUSD staff from email — link to schools ──
  console.log("Step 5: Linking known LAUSD staff to schools...");

  // Staff identified from Gmail
  const staffLinks = [
    { email: "ureye5@lausd.net", name: "Urlette Reyes", school: "University Pathways Medical Magnet", role: ROLES.PRINCIPAL },
    { email: "mdb3644@lausd.net", name: "Michelle Brownridge Keller", school: "University Pathways Medical Magnet", role: ROLES.PRINCIPAL },
    { email: "tia.winston@lausd.net", name: "Tia Winston", school: "Purche", role: ROLES.EMPLOYEE },
    { email: "davita.mccauley@lausd.net", name: "Davita McCauley", school: "Century Park", role: ROLES.EMPLOYEE },
    { email: "adc4437@lausd.net", name: "Akilah Calhoun", school: "Iovine", role: ROLES.PRINCIPAL },
    { email: "reginald.sample@lausd.net", name: "Reginald Sample", school: "Los Angeles Unified School District", role: ROLES.EMPLOYEE },
    { email: "april.stafford@lausd.net", name: "April Stafford", school: "Barack Obama", role: ROLES.EMPLOYEE },
    { email: "mgp1243@lausd.net", name: "Monica Perry", school: "Crenshaw", role: ROLES.EMPLOYEE },
    { email: "levans@lausd.net", name: "Lakisha Clark", school: "Wright", role: ROLES.EMPLOYEE },
    { email: "travis.brandy@lausd.net", name: "Travis Brandy", school: "Los Angeles Unified School District", role: ROLES.EMPLOYEE },
    { email: "doramanda.higuchi@lausd.net", name: "Doramanda Higuchi", school: "South Park", role: ROLES.EMPLOYEE },
  ];

  let staffCount = 0;
  for (const staff of staffLinks) {
    // Find the person by searching
    const search = await apiGet(`/constituents?search=${encodeURIComponent(staff.email)}&skip=0&take=1`);
    if (!search.Results?.length) {
      console.log(`  ⚠️ Not found in CRM: ${staff.name} (${staff.email})`);
      continue;
    }
    const personId = search.Results[0].Id;

    // Find the school
    let schoolId: number | undefined;
    for (const [name, id] of orgNameMap) {
      if (name.includes(staff.school.toLowerCase())) {
        schoolId = id;
        break;
      }
    }

    if (!schoolId) {
      console.log(`  ⚠️ School not found: ${staff.school} for ${staff.name}`);
      continue;
    }

    const schoolRole = staff.role === ROLES.PRINCIPAL ? ROLES.PRINCIPAL : ROLES.EMPLOYEE;
    const orgRole = staff.role === ROLES.PRINCIPAL ? ROLES.SCHOOL : ROLES.EMPLOYER;

    const ok = await createRelationship(personId, schoolRole, schoolId, orgRole);
    if (ok) {
      staffCount++;
      console.log(`  ✅ ${staff.name} → ${staff.school}`);
    }
    await sleep(200);
  }
  console.log(`  ${staffCount} staff-to-school links created\n`);

  // ── STEP 6: Alliance staff from email ──
  console.log("Step 6: Linking Alliance staff...");

  const allianceStaff = [
    { email: "creynoso@laalliance.org", name: "Chris Reynoso-Soto" },
    { email: "jstewart@laalliance.org", name: "Jass Stewart" },
    { email: "lvelazquez@laalliance.org", name: "Leslye Velazquez" },
    { email: "wsalazar@laalliance.org", name: "Wendy Salazar-Leal" },
    { email: "dtramble@laalliance.org", name: "Dea Tramble" },
    { email: "brirodriguez@laalliance.org", name: "Brittney Rodriguez" },
    { email: "ymvega@laalliance.org", name: "Yvette Meza-Vega" },
  ];

  let allianceCount = 0;
  for (const staff of allianceStaff) {
    const search = await apiGet(`/constituents?search=${encodeURIComponent(staff.email)}&skip=0&take=1`);
    if (!search.Results?.length) {
      // Create the constituent if they don't exist
      const [firstName, ...lastParts] = staff.name.split(" ");
      const res = await fetch(`${API_BASE}/constituent`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({
          Type: "Individual",
          FirstName: firstName,
          LastName: lastParts.join(" "),
          Status: "Active",
          PrimaryEmail: { Type: "Work", Value: staff.email, IsPrimary: true },
        }),
      });
      const data = await res.json();
      if (data.Id && allianceId) {
        await createRelationship(data.Id, ROLES.EMPLOYEE, allianceId, ROLES.EMPLOYER);
        allianceCount++;
        console.log(`  ✅ Created + linked: ${staff.name} → Alliance`);
      }
    } else {
      const personId = search.Results[0].Id;
      if (allianceId) {
        const ok = await createRelationship(personId, ROLES.EMPLOYEE, allianceId, ROLES.EMPLOYER);
        if (ok) {
          allianceCount++;
          console.log(`  ✅ Linked: ${staff.name} → Alliance`);
        }
      }
    }
    await sleep(200);
  }
  console.log(`  ${allianceCount} Alliance staff linked\n`);

  // ── SUMMARY ──
  console.log("═══════════════════════════════════════════");
  console.log("COMPLETE");
  console.log("═══════════════════════════════════════════");
  console.log(`  New org records: ${orgCount}`);
  console.log(`  Employee/Employer relationships: ${empRelCount}`);
  console.log(`  School hierarchy links: (see above)`);
  console.log(`  LAUSD staff → school links: ${staffCount}`);
  console.log(`  Alliance staff links: ${allianceCount}`);
  console.log(`\n  No records deleted. Review in Bloomerang dashboard.`);
}

main().catch(console.error);
