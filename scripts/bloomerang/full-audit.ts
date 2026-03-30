/**
 * Bloomerang CRM — Full Database Audit (READ ONLY)
 * Pulls all constituents and exports a comprehensive audit report.
 * Does NOT modify, delete, or create anything in Bloomerang.
 * Does NOT touch transactions or financial data.
 *
 * Run: npx tsx scripts/bloomerang/full-audit.ts
 */

const API_KEY = "baf5b550-35cc-e1b9-3f81-a4cfd8299ee5";
const API_BASE = "https://api.bloomerang.co/v2";
const HEADERS = { "X-API-KEY": API_KEY };

interface Constituent {
  Id: number;
  Type: string;
  Status: string;
  FullName: string;
  FirstName?: string;
  LastName?: string;
  PrimaryEmail?: { Value: string };
  PrimaryPhone?: { Number: string };
  PrimaryAddress?: { Street: string; City: string; State: string; PostalCode: string };
  Website?: string;
  GroupsDetails?: Array<{ Id: number; Name: string }>;
  EngagementScore?: string;
  Employer?: string;
  JobTitle?: string;
  AuditTrail?: { CreatedDate: string; LastModifiedDate: string };
}

async function fetchAll(): Promise<Constituent[]> {
  const all: Constituent[] = [];
  let skip = 0;
  const take = 50;

  while (true) {
    const res = await fetch(`${API_BASE}/constituents?skip=${skip}&take=${take}&orderBy=Id&orderDirection=Desc`, {
      headers: HEADERS,
    });
    const data = await res.json();
    if (!data.Results || data.Results.length === 0) break;
    all.push(...data.Results);
    skip += take;
    if (skip % 500 === 0) process.stderr.write(`  Pulled ${skip}/${data.Total}...\n`);
    if (all.length >= data.Total) break;
  }

  return all;
}

function escCsv(s: string | undefined | null): string {
  if (!s) return "";
  return '"' + String(s).replace(/"/g, '""') + '"';
}

async function main() {
  process.stderr.write("Bloomerang CRM Full Audit — READ ONLY\n\n");
  process.stderr.write("Pulling all constituents...\n");

  const all = await fetchAll();
  process.stderr.write(`\nTotal pulled: ${all.length}\n\n`);

  // Separate by type
  const individuals = all.filter(c => c.Type === "Individual");
  const orgs = all.filter(c => c.Type === "Organization");

  // ── ANALYSIS ──

  // 1. Employer analysis
  const employerCounts: Record<string, number> = {};
  const noEmployer: Constituent[] = [];
  for (const ind of individuals) {
    if (ind.Employer) {
      employerCounts[ind.Employer] = (employerCounts[ind.Employer] || 0) + 1;
    } else {
      noEmployer.push(ind);
    }
  }

  // Match employers to existing orgs
  const orgNames = new Set(orgs.map(o => o.FullName.toLowerCase()));
  const matchedEmployers: string[] = [];
  const unmatchedEmployers: Array<{ name: string; count: number }> = [];

  for (const [employer, count] of Object.entries(employerCounts)) {
    if (orgNames.has(employer.toLowerCase())) {
      matchedEmployers.push(employer);
    } else {
      unmatchedEmployers.push({ name: employer, count });
    }
  }
  unmatchedEmployers.sort((a, b) => b.count - a.count);

  // 2. Missing data analysis
  const noEmail = all.filter(c => !c.PrimaryEmail?.Value);
  const noPhone = all.filter(c => !c.PrimaryPhone?.Number);
  const noAddress = all.filter(c => !c.PrimaryAddress?.Street);

  // 3. Group analysis
  const groupCounts: Record<string, number> = {};
  for (const c of all) {
    for (const g of c.GroupsDetails || []) {
      groupCounts[g.Name] = (groupCounts[g.Name] || 0) + 1;
    }
  }

  // 4. Engagement score distribution
  const engagementDist: Record<string, number> = {};
  for (const c of all) {
    const score = c.EngagementScore || "None";
    engagementDist[score] = (engagementDist[score] || 0) + 1;
  }

  // ── OUTPUT CSV ──
  const csvHeader = "ID,Type,Status,Full Name,First Name,Last Name,Email,Phone,Street,City,State,Zip,Website,Employer,Job Title,Groups,Engagement Score,Created Date,Last Modified";

  const csvRows = all.map(c => {
    const groups = (c.GroupsDetails || []).map(g => g.Name).join("; ");
    return [
      c.Id,
      c.Type,
      c.Status,
      escCsv(c.FullName),
      escCsv(c.FirstName),
      escCsv(c.LastName),
      escCsv(c.PrimaryEmail?.Value),
      escCsv(c.PrimaryPhone?.Number),
      escCsv(c.PrimaryAddress?.Street),
      escCsv(c.PrimaryAddress?.City),
      escCsv(c.PrimaryAddress?.State),
      escCsv(c.PrimaryAddress?.PostalCode),
      escCsv(c.Website),
      escCsv(c.Employer),
      escCsv(c.JobTitle),
      escCsv(groups),
      escCsv(c.EngagementScore),
      escCsv(c.AuditTrail?.CreatedDate),
      escCsv(c.AuditTrail?.LastModifiedDate),
    ].join(",");
  });

  // Write main CSV
  const fs = require("fs");
  const mainCsv = [csvHeader, ...csvRows].join("\n");
  fs.writeFileSync("/Users/mollymorrow/Downloads/bloomerang-full-audit.csv", mainCsv);
  process.stderr.write("Exported: /Users/mollymorrow/Downloads/bloomerang-full-audit.csv\n");

  // Write unmatched employers CSV
  const empHeader = "Employer Name,People Count,Matched to Org";
  const empRows = unmatchedEmployers.map(e => `${escCsv(e.name)},${e.count},No`);
  const matchedRows = matchedEmployers.map(e => `${escCsv(e)},${employerCounts[e]},Yes`);
  const empCsv = [empHeader, ...matchedRows, ...empRows].join("\n");
  fs.writeFileSync("/Users/mollymorrow/Downloads/bloomerang-employer-audit.csv", empCsv);
  process.stderr.write("Exported: /Users/mollymorrow/Downloads/bloomerang-employer-audit.csv\n");

  // Write orgs-only CSV
  const orgHeader = "ID,Name,Status,Website,Groups,Email,Phone,Address,Engagement";
  const orgRows = orgs.map(o => [
    o.Id,
    escCsv(o.FullName),
    o.Status,
    escCsv(o.Website),
    escCsv((o.GroupsDetails || []).map(g => g.Name).join("; ")),
    escCsv(o.PrimaryEmail?.Value),
    escCsv(o.PrimaryPhone?.Number),
    escCsv(o.PrimaryAddress ? `${o.PrimaryAddress.Street}, ${o.PrimaryAddress.City} ${o.PrimaryAddress.State} ${o.PrimaryAddress.PostalCode}` : ""),
    escCsv(o.EngagementScore),
  ].join(","));
  const orgCsv = [orgHeader, ...orgRows].join("\n");
  fs.writeFileSync("/Users/mollymorrow/Downloads/bloomerang-orgs-audit.csv", orgCsv);
  process.stderr.write("Exported: /Users/mollymorrow/Downloads/bloomerang-orgs-audit.csv\n");

  // ── SUMMARY REPORT ──
  const report = `
BLOOMERANG CRM FULL AUDIT — ${new Date().toISOString().split("T")[0]}
READ ONLY — No changes made to the database.

═══════════════════════════════════════════
DATABASE OVERVIEW
═══════════════════════════════════════════
Total constituents: ${all.length}
  Individuals: ${individuals.length}
  Organizations: ${orgs.length}

═══════════════════════════════════════════
EMPLOYER ANALYSIS
═══════════════════════════════════════════
Individuals WITH employer: ${individuals.length - noEmployer.length}
Individuals WITHOUT employer: ${noEmployer.length}
Matched to existing org: ${matchedEmployers.length} employers (${matchedEmployers.reduce((s, e) => s + employerCounts[e], 0)} people)
Unmatched employers: ${unmatchedEmployers.length} unique names

TOP 30 UNMATCHED EMPLOYERS (proposed new org records):
${unmatchedEmployers.slice(0, 30).map((e, i) => `  ${i + 1}. ${e.name} (${e.count} people)`).join("\n")}

═══════════════════════════════════════════
MISSING DATA
═══════════════════════════════════════════
No email: ${noEmail.length} (${(noEmail.length / all.length * 100).toFixed(1)}%)
No phone: ${noPhone.length} (${(noPhone.length / all.length * 100).toFixed(1)}%)
No address: ${noAddress.length} (${(noAddress.length / all.length * 100).toFixed(1)}%)

═══════════════════════════════════════════
GROUP DISTRIBUTION
═══════════════════════════════════════════
${Object.entries(groupCounts).sort((a, b) => b[1] - a[1]).map(([name, count]) => `  ${name}: ${count}`).join("\n")}

═══════════════════════════════════════════
ENGAGEMENT SCORES
═══════════════════════════════════════════
${Object.entries(engagementDist).sort((a, b) => b[1] - a[1]).map(([score, count]) => `  ${score}: ${count}`).join("\n")}

═══════════════════════════════════════════
ORGANIZATIONS (${orgs.length} total)
═══════════════════════════════════════════
${orgs.map(o => `  #${o.Id} | ${o.FullName} | Groups: [${(o.GroupsDetails || []).map(g => g.Name).join(", ")}] | Web: ${o.Website || "none"}`).join("\n")}

═══════════════════════════════════════════
PROPOSED CHANGES (for Molly to review)
═══════════════════════════════════════════
1. CREATE ${Math.min(30, unmatchedEmployers.length)} new org records for top unmatched employers
2. LINK ${matchedEmployers.reduce((s, e) => s + employerCounts[e], 0)} individuals to their matched employer orgs
3. RESTRUCTURE groups into program-based segments
4. FIX 17 mistyped records (6 delete, 11 convert to Individual)
5. BUILD school hierarchy (LAUSD → Alliance → campuses)
6. ADD web/logo data to org records

ALL CHANGES REQUIRE MOLLY'S APPROVAL BEFORE EXECUTION.

═══════════════════════════════════════════
FILES EXPORTED
═══════════════════════════════════════════
1. /Users/mollymorrow/Downloads/bloomerang-full-audit.csv — All 9,248 records
2. /Users/mollymorrow/Downloads/bloomerang-employer-audit.csv — Employer matching analysis
3. /Users/mollymorrow/Downloads/bloomerang-orgs-audit.csv — All org records
`;

  fs.writeFileSync("/Users/mollymorrow/Downloads/bloomerang-audit-report.txt", report);
  process.stderr.write("Exported: /Users/mollymorrow/Downloads/bloomerang-audit-report.txt\n\n");
  process.stderr.write(report);
}

main().catch(console.error);
