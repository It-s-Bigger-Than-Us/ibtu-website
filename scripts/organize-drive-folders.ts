/**
 * IBTU Google Drive Folder Organization System
 *
 * Creates the master folder structure, migrates existing folders to z-old,
 * and sets up COI, Invoice, and Planning Doc folders by event/year.
 *
 * Job Number Format: DEPT-YY-SEQ-MMDD
 *   DEPT = Department code (B2S, FR, YP, CC, WL, GS, CH, OPS)
 *   YY   = 2-digit year
 *   SEQ  = 3-digit sequence number
 *   MMDD = Event date (month + day)
 *
 * Usage: npx tsx scripts/organize-drive-folders.ts [--dry-run]
 */

import * as fs from "fs";
import * as path from "path";

/* ── Config ── */
const DRIVE_ROOT =
  "/Users/mollymorrow/Library/CloudStorage/GoogleDrive-molly@itsbiggerthanusla.org/My Drive";
const DRY_RUN = process.argv.includes("--dry-run");

/* ── Department Codes ── */
export const DEPT_CODES: Record<string, string> = {
  "back-2-school": "B2S",
  "fire-relief": "FR",
  "youth-programming": "YP",
  "coastal-care": "CC",
  wellness: "WL",
  "giving-season": "GS",
  "community-health": "CH",
  operations: "OPS",
  admin: "ADM",
  fundraising: "FND",
  communications: "COM",
};

/* ── Color System (Kanban / Obsidian tags) ── */
export const COLOR_SYSTEM: Record<
  string,
  { hex: string; label: string; emoji: string }
> = {
  insurance: { hex: "#FF4444", label: "Insurance / COI", emoji: "🔴" },
  invoice: { hex: "#FF8C00", label: "Invoice / Billing", emoji: "🟠" },
  planning: { hex: "#FFC700", label: "Planning / Logistics", emoji: "🟡" },
  sponsorship: { hex: "#4CAF50", label: "Sponsorship / Partnership", emoji: "🟢" },
  volunteer: { hex: "#2196F3", label: "Volunteer / Staffing", emoji: "🔵" },
  government: { hex: "#9C27B0", label: "Government / Permits", emoji: "🟣" },
  media: { hex: "#FF69B4", label: "Media / Press", emoji: "🩷" },
  vendor: { hex: "#795548", label: "Vendor / Supplier", emoji: "🟤" },
  internal: { hex: "#607D8B", label: "Internal / Team", emoji: "⚪" },
  urgent: { hex: "#000000", label: "Urgent / Action Required", emoji: "⚫" },
};

/* ── Email Categories (maps to folder destinations) ── */
export const EMAIL_CATEGORIES = [
  "insurance-coi",
  "invoices-billing",
  "planning-logistics",
  "sponsorship-partnership",
  "volunteer-coordination",
  "government-permits",
  "media-press",
  "vendor-supplier",
  "internal-team",
  "contracts-agreements",
  "donor-communications",
  "school-partnerships",
  "event-recaps",
  "general-correspondence",
] as const;

export type EmailCategory = (typeof EMAIL_CATEGORIES)[number];

/* ── Tag System (multi-tag support) ── */
export interface FolderTags {
  project?: string; // e.g., "B2S-26", "FR-25"
  year?: number; // e.g., 2025, 2026
  type?: string; // e.g., "COI", "Invoice", "Planning", "Media"
  department?: string; // e.g., "Programs", "Operations", "Finance"
  org?: string; // e.g., "lululemon", "LAUSD", "Baby2Baby"
  status?: "active" | "archived" | "pending";
}

/* ── Master Folder Structure ── */
const MASTER_STRUCTURE = {
  "IBTU-Operations": {
    // Top-level org folders
    "01-Insurance-COI": {
      // COI by event and year
      "2024": {},
      "2025": {
        "B2S-25-Crenshaw-0801": {},
        "B2S-25-Venice-0826": {},
        "B2S-25-CourtDedication-0906": {},
        "FR-25-EmergencyResponse-0108": {},
        "FR-25-TogetherWeRebuild-0222": {},
        "FR-25-ReliefHub-0401": {},
        "FR-25-Immigration-0716": {},
        "CC-25-001-0622": {},
        "CC-25-002-0720": {},
        "CC-25-003-0823": {},
        "GS-25-ECOSToyGiveaway-1223": {},
        "WL-25-VolunteerYoga-0419": {},
      },
      "2026": {
        "B2S-26-Miami-0725": {},
        "B2S-26-Crenshaw-0801": {},
        "B2S-26-Alliance-0808": {},
        "B2S-26-Venice-0822": {},
        "B2S-26-NewYork-0906": {},
        "CC-26-004-0214": {},
        "CC-26-005-0314": {},
        "CC-26-006-0411": {},
        "CC-26-007-0509": {},
        "CC-26-008-0613": {},
        "CC-26-009-0711": {},
        "CC-26-010-0808": {},
        "CC-26-011-0912": {},
        "CC-26-012-1010": {},
        "CC-26-013-1114": {},
        "CC-26-014-1212": {},
        "YP-26-BaldwinHills-0308": {},
        "YP-26-CenturyPark-0310": {},
        "YP-26-Alliance-0312": {},
        "YP-26-CenturyPark-0320": {},
        "YP-26-BaldwinHills-0406": {},
        "YP-26-CenturyPark-0410": {},
        "YP-26-YESAcademy-0413": {},
        "YP-26-UniPathways-0416": {},
        "YP-26-YESStaff-0505": {},
        "YP-26-LAUSDShowcase-0509": {},
        "YP-26-CenturyParkStaff-0512": {},
        "WL-26-001-0523": {},
        "WL-26-002-0627": {},
        "WL-26-003-0725": {},
        "WL-26-004-0829": {},
        "WL-26-005-0926": {},
        "WL-26-006-1024": {},
        "WL-26-007-1128": {},
        "CH-26-FoodDist-0606": {},
        "CH-26-FoodDist-0718": {},
        "CH-26-FoodDist-0815": {},
        "CH-26-FoodDist-0919": {},
        "CH-26-FoodDist-1017": {},
        "CH-26-FoodDist-1121": {},
        "CH-26-FoodDist-1219": {},
        "CH-26-WestLA-0428": {},
        "CH-26-WestLA-0527": {},
        "CH-26-WestLA-0630": {},
      },
    },
    "02-Invoices": {
      // Invoices by year, then by vendor/org
      "2024": {},
      "2025": {},
      "2026": {},
    },
    "03-Contracts-Agreements": {
      "2024": {},
      "2025": {},
      "2026": {},
    },
    "04-Planning-Docs": {
      // Planning docs by program and event
      "back-2-school": {
        "B2S-25": {},
        "B2S-26": {},
      },
      "fire-relief": {
        "FR-25": {},
        "FR-26": {},
      },
      "youth-programming": {
        "YP-25": {},
        "YP-26": {},
      },
      "coastal-care": {
        "CC-25": {},
        "CC-26": {},
      },
      wellness: {
        "WL-25": {},
        "WL-26": {},
      },
      "giving-season": {
        "GS-25": {},
        "GS-26": {},
      },
      "community-health": {
        "CH-25": {},
        "CH-26": {},
      },
    },
    "05-Sponsorship-Decks": {
      "2025": {},
      "2026": {},
    },
    "06-Government-Permits": {
      "2024": {},
      "2025": {},
      "2026": {},
    },
    "07-Vendor-Files": {
      // Sorted by vendor/org name
    },
    "08-Media-Press": {
      "2024": {},
      "2025": {},
      "2026": {},
    },
    "09-Donor-Communications": {
      "2024": {},
      "2025": {},
      "2026": {},
    },
    "10-Internal": {
      board: {},
      finance: {},
      hr: {},
      "meeting-notes": {},
    },
  },
  "IBTU-Email-Attachments": {
    // Attachments sorted by person/org/type
    "by-person": {},
    "by-org": {},
    "by-type": {
      pdf: {},
      images: {},
      spreadsheets: {},
      documents: {},
      presentations: {},
      other: {},
    },
  },
  "IBTU-Content-Library": {
    // Already exists — media assets by program/job number
  },
};

/* ── Helpers ── */
function mkdirSafe(dirPath: string): void {
  if (DRY_RUN) {
    console.log(`[DRY RUN] mkdir: ${dirPath}`);
    return;
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function moveSafe(src: string, dest: string): void {
  if (DRY_RUN) {
    console.log(`[DRY RUN] move: ${src} → ${dest}`);
    return;
  }
  if (fs.existsSync(src)) {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.renameSync(src, dest);
  }
}

function createStructure(basePath: string, structure: Record<string, any>): number {
  let count = 0;
  for (const [name, children] of Object.entries(structure)) {
    const fullPath = path.join(basePath, name);
    mkdirSafe(fullPath);
    count++;
    if (children && typeof children === "object" && Object.keys(children).length > 0) {
      count += createStructure(fullPath, children);
    }
  }
  return count;
}

/* ── Step 1: Create z-old and migrate existing folders ── */
function migrateToZOld(basePath: string): void {
  const zOldPath = path.join(basePath, "z-old");
  mkdirSafe(zOldPath);

  if (!fs.existsSync(basePath)) {
    console.log(`⚠ Base path not found: ${basePath}`);
    return;
  }

  const entries = fs.readdirSync(basePath, { withFileTypes: true });
  const skipFolders = new Set([
    "z-old",
    "IBTU-Operations",
    "IBTU-Email-Attachments",
    "IBTU-Content-Library",
    ".Trash",
  ]);

  let moved = 0;
  for (const entry of entries) {
    if (entry.isDirectory() && !skipFolders.has(entry.name) && !entry.name.startsWith(".")) {
      const src = path.join(basePath, entry.name);
      const dest = path.join(zOldPath, entry.name);
      console.log(`📦 Moving to z-old: ${entry.name}`);
      moveSafe(src, dest);
      moved++;
    }
  }
  console.log(`\n✅ Moved ${moved} existing folders to z-old/`);
}

/* ── Step 2: Create master folder structure ── */
function createMasterStructure(basePath: string): void {
  console.log("\n📁 Creating master folder structure...\n");
  const count = createStructure(basePath, MASTER_STRUCTURE);
  console.log(`\n✅ Created ${count} folders`);
}

/* ── Step 3: Generate job number from event data ── */
export function generateJobNumber(
  programSlug: string,
  year: number,
  seq: number,
  dateStart: string
): string {
  const dept = DEPT_CODES[programSlug] || "GEN";
  const yy = String(year).slice(-2);
  const seqStr = String(seq).padStart(3, "0");

  // Parse date to get MMDD
  let mmdd = "0000";
  const dateMatch = dateStart.match(
    /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{1,2}),?\s+\d{4}/
  );
  if (dateMatch) {
    const months: Record<string, string> = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
    };
    const monthStr = dateStart.match(
      /Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/
    )?.[0];
    if (monthStr) {
      const mm = months[monthStr];
      const dd = String(dateMatch[1]).padStart(2, "0");
      mmdd = `${mm}${dd}`;
    }
  }

  return `${dept}-${yy}-${seqStr}-${mmdd}`;
}

/* ── Main ── */
async function main() {
  console.log("═══════════════════════════════════════════");
  console.log("  IBTU Google Drive Folder Organization");
  console.log("═══════════════════════════════════════════");
  if (DRY_RUN) console.log("\n🔍 DRY RUN MODE — no changes will be made\n");

  // Step 1: Move existing folders to z-old
  console.log("\n── Step 1: Migrate existing folders to z-old ──");
  migrateToZOld(DRIVE_ROOT);

  // Step 2: Create new master structure
  console.log("\n── Step 2: Create master folder structure ──");
  createMasterStructure(DRIVE_ROOT);

  // Step 3: Sort z-old contents (tag them)
  console.log("\n── Step 3: Tagging z-old folders ──");
  const zOldPath = path.join(DRIVE_ROOT, "z-old");
  if (fs.existsSync(zOldPath)) {
    const oldFolders = fs.readdirSync(zOldPath, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);

    // Auto-tag old folders by pattern matching
    const tagResults: Array<{ folder: string; tags: FolderTags }> = [];
    for (const folder of oldFolders) {
      const tags = autoTagFolder(folder);
      tagResults.push({ folder, tags });
    }

    // Write tag manifest
    const manifestPath = path.join(zOldPath, "_folder-tags.json");
    if (!DRY_RUN) {
      fs.writeFileSync(manifestPath, JSON.stringify(tagResults, null, 2));
    }
    console.log(`✅ Tagged ${tagResults.length} folders in z-old`);
    console.log(`📋 Manifest: ${manifestPath}`);
  }

  console.log("\n═══════════════════════════════════════════");
  console.log("  ✅ Organization complete!");
  console.log("═══════════════════════════════════════════");
}

/* ── Auto-tag folders by name pattern ── */
function autoTagFolder(folderName: string): FolderTags {
  const tags: FolderTags = { status: "archived" };
  const lower = folderName.toLowerCase();

  // Year detection
  const yearMatch = folderName.match(/(20\d{2})/);
  if (yearMatch) tags.year = parseInt(yearMatch[1]);

  // Project/program detection
  if (lower.includes("b2s") || lower.includes("back") || lower.includes("school"))
    tags.project = "B2S";
  if (lower.includes("fire") || lower.includes("relief") || lower.includes("hub"))
    tags.project = "FR";
  if (lower.includes("youth") || lower.includes("school") || lower.includes("lausd"))
    tags.project = "YP";
  if (lower.includes("coastal") || lower.includes("beach") || lower.includes("cleanup"))
    tags.project = "CC";
  if (lower.includes("wellness") || lower.includes("yoga") || lower.includes("lululemon"))
    tags.project = "WL";
  if (lower.includes("giving") || lower.includes("toy") || lower.includes("holiday"))
    tags.project = "GS";
  if (lower.includes("food") || lower.includes("health") || lower.includes("dental"))
    tags.project = "CH";

  // Type detection
  if (lower.includes("coi") || lower.includes("insurance")) tags.type = "COI";
  if (lower.includes("invoice") || lower.includes("billing")) tags.type = "Invoice";
  if (lower.includes("plan") || lower.includes("logistics")) tags.type = "Planning";
  if (lower.includes("contract") || lower.includes("agreement")) tags.type = "Contract";
  if (lower.includes("media") || lower.includes("photo") || lower.includes("video"))
    tags.type = "Media";
  if (lower.includes("sponsor")) tags.type = "Sponsorship";

  // Department detection
  if (lower.includes("finance") || lower.includes("budget")) tags.department = "Finance";
  if (lower.includes("hr") || lower.includes("staff")) tags.department = "HR";
  if (lower.includes("board")) tags.department = "Board";
  if (lower.includes("volunteer")) tags.department = "Volunteers";
  if (lower.includes("program")) tags.department = "Programs";

  return tags;
}

main().catch(console.error);
