/**
 * IBTU Email Organization & Attachment Sorting System
 *
 * Connects to Gmail via Google Apps Script or IMAP, categorizes emails,
 * saves attachments to Google Drive sorted by person/org/type.
 *
 * Categories use the IBTU color system for Kanban/Obsidian integration.
 *
 * Job Number Format: DEPT-YY-SEQ-MMDD (date of event at end)
 *
 * Usage: npx tsx scripts/organize-emails.ts [--dry-run] [--since=YYYY-MM-DD]
 */

import * as fs from "fs";
import * as path from "path";
import { DEPT_CODES, COLOR_SYSTEM, generateJobNumber } from "./organize-drive-folders";

/* ── Config ── */
const DRIVE_ROOT =
  "/Users/mollymorrow/Library/CloudStorage/GoogleDrive-molly@itsbiggerthanusla.org/My Drive";
const ATTACHMENTS_ROOT = path.join(DRIVE_ROOT, "IBTU-Email-Attachments");
const OPS_ROOT = path.join(DRIVE_ROOT, "IBTU-Operations");
const DRY_RUN = process.argv.includes("--dry-run");
const SINCE_FLAG = process.argv.find((a) => a.startsWith("--since="));
const SINCE_DATE = SINCE_FLAG ? new Date(SINCE_FLAG.split("=")[1]) : new Date("2025-01-01");

/* ── File Type Mapping ── */
const FILE_TYPE_MAP: Record<string, string> = {
  ".pdf": "pdf",
  ".doc": "documents",
  ".docx": "documents",
  ".txt": "documents",
  ".rtf": "documents",
  ".xls": "spreadsheets",
  ".xlsx": "spreadsheets",
  ".csv": "spreadsheets",
  ".ppt": "presentations",
  ".pptx": "presentations",
  ".key": "presentations",
  ".jpg": "images",
  ".jpeg": "images",
  ".png": "images",
  ".gif": "images",
  ".heic": "images",
  ".webp": "images",
  ".tiff": "images",
  ".mp4": "video",
  ".mov": "video",
  ".zip": "archives",
  ".rar": "archives",
};

/* ── Email Classification Rules ── */
interface ClassificationRule {
  category: string;
  color: string;
  keywords: string[];
  senderPatterns: string[];
  subjectPatterns: string[];
  attachmentPatterns: string[];
  destinationFolder: string;
}

const CLASSIFICATION_RULES: ClassificationRule[] = [
  {
    category: "insurance-coi",
    color: COLOR_SYSTEM.insurance.hex,
    keywords: ["certificate of insurance", "coi", "additional insured", "liability", "policy number", "insurance certificate", "endorsement", "coverage"],
    senderPatterns: ["insurance", "alliant", "marsh", "aon", "gallagher", "liberty mutual", "state farm", "progressive"],
    subjectPatterns: ["COI", "certificate", "insurance", "policy", "coverage", "endorsement"],
    attachmentPatterns: ["coi", "certificate", "insurance", "policy"],
    destinationFolder: "01-Insurance-COI",
  },
  {
    category: "invoices-billing",
    color: COLOR_SYSTEM.invoice.hex,
    keywords: ["invoice", "bill", "payment", "remittance", "purchase order", "PO#", "net 30", "due date", "amount due", "balance"],
    senderPatterns: ["billing", "accounting", "payable", "invoice", "quickbooks", "bill.com", "stripe", "paypal"],
    subjectPatterns: ["invoice", "bill", "payment", "PO", "purchase order", "receipt"],
    attachmentPatterns: ["invoice", "bill", "receipt", "statement"],
    destinationFolder: "02-Invoices",
  },
  {
    category: "planning-logistics",
    color: COLOR_SYSTEM.planning.hex,
    keywords: ["run of show", "logistics", "timeline", "site plan", "load-in", "setup", "breakdown", "floor plan", "event plan", "production schedule", "day-of"],
    senderPatterns: [],
    subjectPatterns: ["planning", "logistics", "timeline", "run of show", "site plan", "setup", "production"],
    attachmentPatterns: ["plan", "timeline", "schedule", "site", "layout", "ros"],
    destinationFolder: "04-Planning-Docs",
  },
  {
    category: "sponsorship-partnership",
    color: COLOR_SYSTEM.sponsorship.hex,
    keywords: ["sponsorship", "partnership", "sponsor", "in-kind", "activation", "brand partner", "co-brand", "collaboration", "MOU", "LOI"],
    senderPatterns: ["lululemon", "nike", "adidas", "google", "apple", "target", "pepsi", "supreme", "bombas", "baby2baby", "la rams", "shell", "l'occitane", "la28", "sol de janeiro", "tbwa"],
    subjectPatterns: ["sponsor", "partnership", "collaboration", "in-kind", "activation", "MOU", "LOI"],
    attachmentPatterns: ["sponsor", "partnership", "deck", "proposal", "mou", "loi"],
    destinationFolder: "05-Sponsorship-Decks",
  },
  {
    category: "volunteer-coordination",
    color: COLOR_SYSTEM.volunteer.hex,
    keywords: ["volunteer", "sign up", "shift", "orientation", "training", "check-in", "bloomerang", "registration"],
    senderPatterns: ["bloomerang", "volunteer", "signupgenius"],
    subjectPatterns: ["volunteer", "sign up", "shift", "orientation", "training"],
    attachmentPatterns: ["volunteer", "roster", "signup", "waiver"],
    destinationFolder: "IBTU-Operations/10-Internal",
  },
  {
    category: "government-permits",
    color: COLOR_SYSTEM.government.hex,
    keywords: ["permit", "city of los angeles", "council district", "cd10", "cd8", "LAUSD", "county", "state", "federal", "501c3", "tax exempt", "EIN"],
    senderPatterns: ["@lacity.org", "@lacounty.gov", "@lausd.net", "@ca.gov", "@irs.gov", "@state.ca.us"],
    subjectPatterns: ["permit", "approval", "compliance", "license", "regulation", "ordinance", "tax", "EIN"],
    attachmentPatterns: ["permit", "license", "approval", "compliance", "tax"],
    destinationFolder: "06-Government-Permits",
  },
  {
    category: "media-press",
    color: COLOR_SYSTEM.media.hex,
    keywords: ["press", "media", "interview", "article", "feature", "coverage", "publication", "story", "reporter", "journalist"],
    senderPatterns: ["@fox", "@bet", "@nbc", "@abc", "@cbs", "@latimes", "@lasentinel", "press", "media", "news"],
    subjectPatterns: ["press", "media", "interview", "feature", "story", "article", "coverage"],
    attachmentPatterns: ["press", "media", "release", "article", "clip"],
    destinationFolder: "08-Media-Press",
  },
  {
    category: "vendor-supplier",
    color: COLOR_SYSTEM.vendor.hex,
    keywords: ["quote", "estimate", "proposal", "bid", "scope of work", "SOW", "deliverable", "rental", "catering", "vendor"],
    senderPatterns: [],
    subjectPatterns: ["quote", "estimate", "proposal", "bid", "SOW", "rental"],
    attachmentPatterns: ["quote", "estimate", "proposal", "bid", "sow"],
    destinationFolder: "07-Vendor-Files",
  },
  {
    category: "contracts-agreements",
    color: COLOR_SYSTEM.urgent.hex,
    keywords: ["contract", "agreement", "execute", "signature", "sign", "docusign", "hellosign", "amendment", "addendum", "terms"],
    senderPatterns: ["docusign", "hellosign", "pandadoc", "adobesign"],
    subjectPatterns: ["contract", "agreement", "sign", "execute", "amendment", "terms"],
    attachmentPatterns: ["contract", "agreement", "amendment", "signed", "executed"],
    destinationFolder: "03-Contracts-Agreements",
  },
  {
    category: "donor-communications",
    color: COLOR_SYSTEM.sponsorship.hex,
    keywords: ["donation", "gift", "pledge", "fund", "grant", "foundation", "contribution", "tax receipt", "acknowledgment"],
    senderPatterns: ["foundation", "fund", "philanthropy", "giving"],
    subjectPatterns: ["donation", "gift", "grant", "fund", "pledge", "contribution"],
    attachmentPatterns: ["donation", "receipt", "acknowledgment", "grant", "pledge"],
    destinationFolder: "09-Donor-Communications",
  },
  {
    category: "school-partnerships",
    color: COLOR_SYSTEM.volunteer.hex,
    keywords: ["LAUSD", "school", "campus", "principal", "teacher", "parent engagement", "lunchtime", "PW-8", "community school"],
    senderPatterns: ["@lausd.net", "@alliancecrs.org", "school"],
    subjectPatterns: ["school", "campus", "LAUSD", "student", "parent", "principal"],
    attachmentPatterns: ["school", "campus", "lausd", "enrollment"],
    destinationFolder: "04-Planning-Docs/youth-programming",
  },
];

/* ── Email Data Structure (from Gmail export / Apps Script) ── */
export interface EmailRecord {
  id: string;
  threadId: string;
  date: string;
  from: string;
  fromEmail: string;
  to: string;
  subject: string;
  body: string;
  labels: string[];
  attachments: AttachmentRecord[];
  isRead: boolean;
  isStarred: boolean;
}

export interface AttachmentRecord {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  localPath?: string;
}

export interface SortedEmail {
  email: EmailRecord;
  category: string;
  color: string;
  confidence: "high" | "medium" | "low";
  matchReasons: string[];
  destinationFolder: string;
  jobNumber?: string;
  tags: string[];
}

/* ── Classification Engine ── */
function classifyEmail(email: EmailRecord): SortedEmail {
  let bestMatch: { rule: ClassificationRule; score: number; reasons: string[] } | null = null;

  for (const rule of CLASSIFICATION_RULES) {
    let score = 0;
    const reasons: string[] = [];
    const bodyLower = (email.body || "").toLowerCase();
    const subjectLower = (email.subject || "").toLowerCase();
    const fromLower = (email.fromEmail || "").toLowerCase();

    // Check keywords in body
    for (const kw of rule.keywords) {
      if (bodyLower.includes(kw.toLowerCase())) {
        score += 2;
        reasons.push(`body contains "${kw}"`);
      }
    }

    // Check subject patterns
    for (const pattern of rule.subjectPatterns) {
      if (subjectLower.includes(pattern.toLowerCase())) {
        score += 3;
        reasons.push(`subject contains "${pattern}"`);
      }
    }

    // Check sender patterns
    for (const pattern of rule.senderPatterns) {
      if (fromLower.includes(pattern.toLowerCase())) {
        score += 4;
        reasons.push(`sender matches "${pattern}"`);
      }
    }

    // Check attachment names
    for (const att of email.attachments || []) {
      const attLower = att.filename.toLowerCase();
      for (const pattern of rule.attachmentPatterns) {
        if (attLower.includes(pattern.toLowerCase())) {
          score += 3;
          reasons.push(`attachment "${att.filename}" matches "${pattern}"`);
        }
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { rule, score, reasons };
    }
  }

  // Determine confidence
  const confidence = bestMatch
    ? bestMatch.score >= 6
      ? "high"
      : bestMatch.score >= 3
        ? "medium"
        : "low"
    : "low";

  // Build tags
  const tags: string[] = [];
  if (bestMatch) tags.push(bestMatch.rule.category);

  // Detect year tags
  const yearMatch = email.subject?.match(/(202[0-9])/);
  if (yearMatch) tags.push(`year:${yearMatch[1]}`);

  // Detect program tags
  const programPatterns: Record<string, string> = {
    "B2S|back.?2.?school|backpack": "B2S",
    "fire.?relief|hub|emergency": "FR",
    "youth|school.?program|lausd|lunchtime|parent.?engagement": "YP",
    "coastal|beach.?cleanup|venice.?pier": "CC",
    "wellness|yoga|soundbath|lululemon": "WL",
    "giving|toy|holiday|winter": "GS",
    "food.?dist|health|dental|vision|mental.?health|megafeast": "CH",
  };

  for (const [pattern, code] of Object.entries(programPatterns)) {
    const regex = new RegExp(pattern, "i");
    if (regex.test(email.subject || "") || regex.test(email.body || "")) {
      tags.push(`program:${code}`);
    }
  }

  // Detect org from sender
  const orgName = extractOrgFromEmail(email.fromEmail);
  if (orgName) tags.push(`org:${orgName}`);

  return {
    email,
    category: bestMatch?.rule.category || "general-correspondence",
    color: bestMatch?.rule.color || "#999999",
    confidence,
    matchReasons: bestMatch?.reasons || ["no strong match — general correspondence"],
    destinationFolder: bestMatch?.rule.destinationFolder || "IBTU-Operations/10-Internal",
    tags,
  };
}

/* ── Extract org name from email address ── */
function extractOrgFromEmail(email: string): string | null {
  if (!email) return null;
  const domain = email.split("@")[1];
  if (!domain) return null;

  // Skip generic domains
  const generic = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com", "me.com"];
  if (generic.includes(domain)) return null;

  // Known org mappings
  const orgMap: Record<string, string> = {
    "itsbiggerthanusla.org": "IBTU",
    "lausd.net": "LAUSD",
    "alliancecrs.org": "Alliance",
    "lacity.org": "City-of-LA",
    "lacounty.gov": "LA-County",
    "solaimpact.com": "SoLa-Impact",
    "baby2baby.org": "Baby2Baby",
    "lululemon.com": "lululemon",
    "nike.com": "Nike",
    "google.com": "Google",
    "apple.com": "Apple",
    "target.com": "Target",
    "westsideno.org": "Westside-Food-Bank",
    "bloomerang.co": "Bloomerang",
    "libertydentalplan.com": "Liberty-Dental",
  };

  if (orgMap[domain]) return orgMap[domain];

  // Use domain name as org (strip TLD)
  return domain.split(".")[0];
}

/* ── Save Attachment to Drive ── */
function saveAttachment(
  attachment: AttachmentRecord,
  sortedEmail: SortedEmail
): string | null {
  if (!attachment.localPath || !fs.existsSync(attachment.localPath)) return null;

  const ext = path.extname(attachment.filename).toLowerCase();
  const fileType = FILE_TYPE_MAP[ext] || "other";
  const orgName = extractOrgFromEmail(sortedEmail.email.fromEmail) || "unknown";
  const personName = sortedEmail.email.from.replace(/[<>@"]/g, "").trim().replace(/\s+/g, "-");
  const dateStr = new Date(sortedEmail.email.date).toISOString().slice(0, 10);

  // Save to 3 locations (by-person, by-org, by-type)
  const destinations = [
    path.join(ATTACHMENTS_ROOT, "by-person", personName, `${dateStr}_${attachment.filename}`),
    path.join(ATTACHMENTS_ROOT, "by-org", orgName, `${dateStr}_${attachment.filename}`),
    path.join(ATTACHMENTS_ROOT, "by-type", fileType, `${dateStr}_${orgName}_${attachment.filename}`),
  ];

  // Also save to category-specific folder
  const categoryDest = getCategoryDestination(sortedEmail, attachment, dateStr);
  if (categoryDest) destinations.push(categoryDest);

  for (const dest of destinations) {
    if (DRY_RUN) {
      console.log(`[DRY RUN] Save: ${attachment.filename} → ${dest}`);
    } else {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(attachment.localPath, dest);
    }
  }

  return destinations[0];
}

/* ── Route attachment to correct ops folder ── */
function getCategoryDestination(
  sorted: SortedEmail,
  attachment: AttachmentRecord,
  dateStr: string
): string | null {
  const year = new Date(sorted.email.date).getFullYear().toString();
  const orgName = extractOrgFromEmail(sorted.email.fromEmail) || "unknown";
  const filename = `${dateStr}_${orgName}_${attachment.filename}`;

  switch (sorted.category) {
    case "insurance-coi":
      // Route to COI folder by year, try to match event job number
      return path.join(OPS_ROOT, "01-Insurance-COI", year, filename);

    case "invoices-billing":
      // Route to Invoices by year, then by vendor
      return path.join(OPS_ROOT, "02-Invoices", year, orgName, filename);

    case "contracts-agreements":
      return path.join(OPS_ROOT, "03-Contracts-Agreements", year, filename);

    case "planning-logistics":
      return path.join(OPS_ROOT, "04-Planning-Docs", filename);

    case "sponsorship-partnership":
      return path.join(OPS_ROOT, "05-Sponsorship-Decks", year, orgName, filename);

    case "government-permits":
      return path.join(OPS_ROOT, "06-Government-Permits", year, filename);

    case "vendor-supplier":
      return path.join(OPS_ROOT, "07-Vendor-Files", orgName, filename);

    case "media-press":
      return path.join(OPS_ROOT, "08-Media-Press", year, filename);

    case "donor-communications":
      return path.join(OPS_ROOT, "09-Donor-Communications", year, orgName, filename);

    default:
      return null;
  }
}

/* ── Generate Sort Summary ── */
export function generateSortSummary(sorted: SortedEmail[]): string {
  const byCat: Record<string, SortedEmail[]> = {};
  for (const s of sorted) {
    if (!byCat[s.category]) byCat[s.category] = [];
    byCat[s.category].push(s);
  }

  const lines: string[] = [];
  lines.push("# IBTU Email Sort Summary");
  lines.push(`**Date:** ${new Date().toISOString().slice(0, 10)}`);
  lines.push(`**Total Emails Sorted:** ${sorted.length}`);
  lines.push("");

  // Stats
  const highConf = sorted.filter((s) => s.confidence === "high").length;
  const medConf = sorted.filter((s) => s.confidence === "medium").length;
  const lowConf = sorted.filter((s) => s.confidence === "low").length;
  lines.push(`| Confidence | Count |`);
  lines.push(`|---|---|`);
  lines.push(`| High | ${highConf} |`);
  lines.push(`| Medium | ${medConf} |`);
  lines.push(`| Low (needs review) | ${lowConf} |`);
  lines.push("");

  // By category
  for (const [cat, emails] of Object.entries(byCat).sort((a, b) => b[1].length - a[1].length)) {
    const rule = CLASSIFICATION_RULES.find((r) => r.category === cat);
    const colorEntry = Object.values(COLOR_SYSTEM).find((c) => c.hex === rule?.color);
    const emoji = colorEntry?.emoji || "📧";

    lines.push(`## ${emoji} ${cat.replace(/-/g, " ").toUpperCase()} (${emails.length})`);
    lines.push("");
    for (const e of emails.slice(0, 20)) {
      const date = new Date(e.email.date).toISOString().slice(0, 10);
      const attCount = e.email.attachments?.length || 0;
      const attStr = attCount > 0 ? ` [${attCount} attachment${attCount > 1 ? "s" : ""}]` : "";
      lines.push(`- **${date}** — ${e.email.from}: _${e.email.subject}_${attStr}`);
      if (e.confidence === "low") lines.push(`  - ⚠️ Low confidence — needs manual review`);
    }
    if (emails.length > 20) lines.push(`  - _...and ${emails.length - 20} more_`);
    lines.push("");
  }

  return lines.join("\n");
}

/* ── Main (placeholder for Gmail integration) ── */
async function main() {
  console.log("═══════════════════════════════════════════════");
  console.log("  IBTU Email Organization System");
  console.log("═══════════════════════════════════════════════");
  console.log(`  Since: ${SINCE_DATE.toISOString().slice(0, 10)}`);
  if (DRY_RUN) console.log("  Mode: DRY RUN\n");

  console.log("\n⚠️  This script requires email data exported from Gmail.");
  console.log("   Run the companion Google Apps Script first to export emails,");
  console.log("   or provide a JSON file with EmailRecord[] data.\n");
  console.log("   Expected input: DRIVE_ROOT/email-export.json\n");

  const exportPath = path.join(DRIVE_ROOT, "email-export.json");
  if (!fs.existsSync(exportPath)) {
    console.log(`📋 No export file found at: ${exportPath}`);
    console.log("   To get started:");
    console.log("   1. Deploy scripts/organize-emails-apps-script.gs to Google Apps Script");
    console.log("   2. Run exportEmails() to generate the JSON export");
    console.log("   3. Re-run this script");
    console.log("\n   Or use --dry-run with sample data for testing.");
    return;
  }

  // Load exported emails
  const raw = fs.readFileSync(exportPath, "utf-8");
  const emails: EmailRecord[] = JSON.parse(raw);
  console.log(`📧 Loaded ${emails.length} emails\n`);

  // Classify all emails
  const sorted: SortedEmail[] = emails.map(classifyEmail);

  // Save attachments
  let attachmentCount = 0;
  for (const s of sorted) {
    for (const att of s.email.attachments || []) {
      saveAttachment(att, s);
      attachmentCount++;
    }
  }
  console.log(`📎 Processed ${attachmentCount} attachments\n`);

  // Generate summary
  const summary = generateSortSummary(sorted);
  const summaryPath = path.join(DRIVE_ROOT, "IBTU-Operations", "email-sort-summary.md");
  if (!DRY_RUN) {
    fs.mkdirSync(path.dirname(summaryPath), { recursive: true });
    fs.writeFileSync(summaryPath, summary);
  }
  console.log(`📋 Summary: ${summaryPath}`);

  // Output recap for Obsidian
  const obsidianPath = path.join(DRIVE_ROOT, "email-sort-recap.md");
  if (!DRY_RUN) {
    fs.writeFileSync(obsidianPath, summary);
  }
  console.log(`📓 Obsidian recap: ${obsidianPath}`);

  console.log("\n✅ Email organization complete!");
}

main().catch(console.error);
