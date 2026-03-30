/**
 * IBTU Content Library Organizer
 *
 * Scans Google Drive for photos/videos, matches them to event job numbers,
 * copies and renames files into the organized content library structure.
 *
 * Usage: npx tsx scripts/organize-content.ts [--dry-run]
 */

import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

/* ── Config ── */
const DRIVE_ROOT =
  "/Users/mollymorrow/Library/CloudStorage/GoogleDrive-molly@itsbiggerthanusla.org";
const CONTENT_LIB = `${DRIVE_ROOT}/My Drive/IBTU-Content-Library`;
const MEDIA_EXTS = new Set([
  ".jpg", ".jpeg", ".png", ".webp", ".heic", ".tiff", ".tif", ".bmp", ".gif",
  ".mp4", ".mov", ".avi", ".mkv", ".m4v", ".wmv", ".mpg", ".mpeg", ".mts",
]);

const DRY_RUN = process.argv.includes("--dry-run");

/* ── Sanity client ── */
const client = createClient({
  projectId: "0m4ngfcw",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

/* ── Types ── */
interface SanityEvent {
  jobNumber: string;
  title: string;
  year: number;
  programSlug: string;
  status: string;
}

interface MediaFile {
  fullPath: string;
  fileName: string;
  ext: string;
  sizeBytes: number;
}

interface MatchResult {
  file: MediaFile;
  jobNumber: string;
  program: string;
  confidence: "exact" | "strong" | "partial" | "none";
  matchReason: string;
}

/* ── Fetch events from Sanity ── */
async function fetchEvents(): Promise<SanityEvent[]> {
  const query = `*[_type == "event"] | order(year desc) {
    jobNumber, title, year, status,
    "programSlug": program->slug.current
  }`;
  return client.fetch(query);
}

/* ── Build keyword index from events ── */
function buildKeywordIndex(events: SanityEvent[]) {
  const index: Map<string, { jobNumber: string; program: string }> = new Map();

  for (const evt of events) {
    if (!evt.jobNumber || !evt.programSlug) continue;

    // Exact job number
    index.set(evt.jobNumber.toLowerCase(), {
      jobNumber: evt.jobNumber,
      program: evt.programSlug,
    });

    // Key fragments from job number (e.g., "B2S-25-001", "Purche", "Hillcrest")
    const parts = evt.jobNumber.split(/[-_]/);
    for (const part of parts) {
      if (part.length >= 4 && !/^\d+$/.test(part) && !["IBTU", "PROP", "PROG", "MISC"].includes(part.toUpperCase())) {
        const key = part.toLowerCase();
        if (!index.has(key)) {
          index.set(key, { jobNumber: evt.jobNumber, program: evt.programSlug });
        }
      }
    }
  }

  return index;
}

/* ── Scan directory for media files ── */
function scanForMedia(dir: string, results: MediaFile[] = []): MediaFile[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name.startsWith(".") || entry.name === "IBTU-Content-Library") continue;

    if (entry.isDirectory()) {
      scanForMedia(fullPath, results);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (MEDIA_EXTS.has(ext)) {
        try {
          const stat = fs.statSync(fullPath);
          results.push({
            fullPath,
            fileName: entry.name,
            ext,
            sizeBytes: stat.size,
          });
        } catch {
          // Skip unreadable files
        }
      }
    }
  }

  return results;
}

/* ── Match a file to an event ── */
function matchFile(
  file: MediaFile,
  events: SanityEvent[],
  keywordIndex: Map<string, { jobNumber: string; program: string }>
): MatchResult {
  const fileLower = file.fullPath.toLowerCase();
  const nameLower = file.fileName.toLowerCase();

  // 1. Exact job number in path or filename
  for (const evt of events) {
    if (!evt.jobNumber || !evt.programSlug) continue;
    if (fileLower.includes(evt.jobNumber.toLowerCase())) {
      return {
        file, jobNumber: evt.jobNumber, program: evt.programSlug,
        confidence: "exact", matchReason: `Job number "${evt.jobNumber}" found in path`,
      };
    }
  }

  // 2. Strong match — program + keyword in path
  const programPatterns: [RegExp, string][] = [
    [/\bb2s\b|back.?2.?school|back.to.school/i, "back-2-school"],
    [/\bcoastal.?care\b|beach.?clean/i, "coastal-care"],
    [/\bfire.?relief\b|\bhub\b|disaster/i, "fire-relief"],
    [/\bgiving.?season\b|holiday|toy.?give/i, "giving-season"],
    [/\bwellness\b|yoga|lululemon/i, "wellness"],
    [/\bcommunity.?health\b|food.?access|food.?dist/i, "community-health"],
    [/\bschool\b|campus|lunchtime|resource.?fair|staff.?app/i, "youth-programming"],
  ];

  for (const [pattern, program] of programPatterns) {
    if (pattern.test(fileLower)) {
      // Try to narrow down to specific job number via keywords
      for (const [keyword, info] of keywordIndex) {
        if (info.program === program && fileLower.includes(keyword)) {
          return {
            file, jobNumber: info.jobNumber, program,
            confidence: "strong", matchReason: `Program "${program}" + keyword "${keyword}" match`,
          };
        }
      }

      // Check for date patterns to match job numbers with dates
      const dateMatch = nameLower.match(/(\d{4})[_-]?(\d{2})[_-]?(\d{2})/);
      if (dateMatch) {
        const dateStr = `${dateMatch[1]}${dateMatch[2]}${dateMatch[3]}`;
        const shortDate = `${dateMatch[2]}${dateMatch[3]}${dateMatch[1].slice(2)}`;
        for (const evt of events) {
          if (!evt.jobNumber || evt.programSlug !== program) continue;
          const jnLower = evt.jobNumber.toLowerCase();
          if (jnLower.includes(dateStr) || jnLower.includes(shortDate)) {
            return {
              file, jobNumber: evt.jobNumber, program,
              confidence: "strong", matchReason: `Program + date "${dateStr}" match`,
            };
          }
        }
      }

      // Year-based match for annual events
      const yearMatch = fileLower.match(/20(2[3-6])/);
      if (yearMatch) {
        const year = parseInt(`20${yearMatch[1]}`);
        const yearEvents = events.filter(
          (e) => e.programSlug === program && e.year === year
        );
        if (yearEvents.length === 1) {
          return {
            file, jobNumber: yearEvents[0].jobNumber, program,
            confidence: "strong", matchReason: `Program "${program}" + year ${year} (single event)`,
          };
        }
      }

      // Just program match
      return {
        file, jobNumber: "", program,
        confidence: "partial", matchReason: `Program "${program}" match only`,
      };
    }
  }

  return {
    file, jobNumber: "", program: "",
    confidence: "none", matchReason: "No match found",
  };
}

/* ── Sanitize filename ── */
function sanitize(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/_+/g, "_");
}

/* ── Copy and rename file ── */
function copyFile(match: MatchResult, seq: number): string | null {
  const program = match.program || "_unmatched";
  const jobDir = match.jobNumber || "_unsorted";
  const destDir = path.join(CONTENT_LIB, program, jobDir);

  // Create dir if needed
  if (!fs.existsSync(destDir)) {
    if (!DRY_RUN) fs.mkdirSync(destDir, { recursive: true });
  }

  // Build new filename: {JobNumber}_{seq}_{sanitized-original}.{ext}
  const prefix = match.jobNumber || program;
  const baseName = path.basename(match.file.fileName, match.file.ext);
  const newName = `${sanitize(prefix)}_${String(seq).padStart(3, "0")}_${sanitize(baseName)}${match.file.ext}`;
  const destPath = path.join(destDir, newName);

  if (fs.existsSync(destPath)) return null; // Skip existing

  if (!DRY_RUN) {
    try {
      fs.copyFileSync(match.file.fullPath, destPath);
    } catch (err) {
      console.error(`  ERROR copying: ${err}`);
      return null;
    }
  }

  return destPath;
}

/* ── Main ── */
async function main() {
  console.log(DRY_RUN ? "🔍 DRY RUN — no files will be copied\n" : "📁 COPYING FILES\n");

  // 1. Fetch events
  console.log("Fetching events from Sanity...");
  const events = await fetchEvents();
  console.log(`  Found ${events.length} events\n`);

  const keywordIndex = buildKeywordIndex(events);

  // 2. Scan Drive for media
  console.log("Scanning Google Drive for media files...");
  const scanDirs = [
    `${DRIVE_ROOT}/Shared drives`,
    `${DRIVE_ROOT}/My Drive`,
  ];

  const allMedia: MediaFile[] = [];
  for (const dir of scanDirs) {
    console.log(`  Scanning: ${dir}`);
    scanForMedia(dir, allMedia);
  }
  console.log(`  Found ${allMedia.length} media files\n`);

  // 3. Match files
  console.log("Matching files to events...");
  const matches: MatchResult[] = allMedia.map((f) => matchFile(f, events, keywordIndex));

  const exact = matches.filter((m) => m.confidence === "exact");
  const strong = matches.filter((m) => m.confidence === "strong");
  const partial = matches.filter((m) => m.confidence === "partial");
  const none = matches.filter((m) => m.confidence === "none");

  console.log(`  Exact matches:   ${exact.length}`);
  console.log(`  Strong matches:  ${strong.length}`);
  console.log(`  Partial matches: ${partial.length}`);
  console.log(`  Unmatched:       ${none.length}\n`);

  // 4. Copy files
  console.log("Copying and renaming files...");
  const jobSeq = new Map<string, number>();
  let copied = 0;
  let skipped = 0;

  for (const match of matches) {
    if (match.confidence === "none" || match.confidence === "partial") continue; // Only exact + strong

    const key = `${match.program}/${match.jobNumber}`;
    const seq = (jobSeq.get(key) || 0) + 1;
    jobSeq.set(key, seq);

    const dest = copyFile(match, seq);
    if (dest) {
      copied++;
      if (copied <= 20) {
        console.log(`  ✓ ${path.basename(dest)}`);
      }
    } else {
      skipped++;
    }
  }

  if (copied > 20) console.log(`  ... and ${copied - 20} more`);
  console.log(`\n  Copied: ${copied} | Skipped (existing): ${skipped}`);

  // 5. Generate manifest CSV
  const csvPath = path.join(CONTENT_LIB, "manifest.csv");
  const csvRows = [
    "job_number,program,title,confidence,match_reason,source_path,dest_filename,size_mb",
  ];

  const jobTitleMap = new Map(events.map((e) => [e.jobNumber, e.title]));
  const jobSeq2 = new Map<string, number>();

  for (const match of matches) {
    if (match.confidence === "none" || match.confidence === "partial") continue;
    const key = `${match.program}/${match.jobNumber}`;
    const seq = (jobSeq2.get(key) || 0) + 1;
    jobSeq2.set(key, seq);

    const prefix = match.jobNumber || match.program;
    const baseName = path.basename(match.file.fileName, match.file.ext);
    const newName = `${sanitize(prefix)}_${String(seq).padStart(3, "0")}_${sanitize(baseName)}${match.file.ext}`;
    const title = jobTitleMap.get(match.jobNumber) || "";
    const sizeMb = (match.file.sizeBytes / 1024 / 1024).toFixed(2);

    csvRows.push(
      `"${match.jobNumber}","${match.program}","${title.replace(/"/g, '""')}","${match.confidence}","${match.matchReason}","${match.file.fullPath.replace(/"/g, '""')}","${newName}",${sizeMb}`
    );
  }

  if (!DRY_RUN) {
    fs.writeFileSync(csvPath, csvRows.join("\n"), "utf-8");
    console.log(`\n📊 Manifest saved: ${csvPath}`);
  } else {
    console.log(`\n📊 Would save manifest with ${csvRows.length - 1} rows to: ${csvPath}`);
  }

  // 6. Summary by program
  console.log("\n=== SUMMARY BY PROGRAM ===");
  const programCounts = new Map<string, number>();
  for (const match of matches) {
    if (match.confidence === "none") continue;
    const p = match.program || "_unmatched";
    programCounts.set(p, (programCounts.get(p) || 0) + 1);
  }
  for (const [prog, count] of [...programCounts.entries()].sort()) {
    console.log(`  ${prog}: ${count} files`);
  }

  console.log("\nDone!");
}

main().catch(console.error);
