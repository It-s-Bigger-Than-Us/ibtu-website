/**
 * IBTU Gmail Email Export & Organization — Google Apps Script
 *
 * Deploy this to Google Apps Script (script.google.com) to:
 * 1. Export all emails with metadata and attachments to Google Drive
 * 2. Apply Gmail labels based on IBTU categories
 * 3. Save attachments organized by person/org/type
 *
 * Setup:
 * 1. Go to script.google.com → New Project
 * 2. Paste this code
 * 3. Run exportAndOrganizeEmails()
 * 4. Grant Gmail + Drive permissions when prompted
 *
 * Job Number Format: DEPT-YY-SEQ-MMDD (date at end)
 */

/* ── Config ── */
const DRIVE_FOLDER_NAME = "IBTU-Email-Attachments";
const OPS_FOLDER_NAME = "IBTU-Operations";
const EXPORT_FILE_NAME = "email-export.json";
const BATCH_SIZE = 100; // emails per batch
const LOOKBACK_DAYS = 365; // how far back to search
const MAX_EMAILS = 5000; // safety limit

/* ── Color System (matches organize-drive-folders.ts) ── */
const COLORS = {
  insurance:   { label: "IBTU/Insurance-COI",      color: "#ff0000" },
  invoice:     { label: "IBTU/Invoices-Billing",    color: "#ff8c00" },
  planning:    { label: "IBTU/Planning-Logistics",  color: "#ffc700" },
  sponsorship: { label: "IBTU/Sponsorship",         color: "#4caf50" },
  volunteer:   { label: "IBTU/Volunteer",            color: "#2196f3" },
  government:  { label: "IBTU/Government-Permits",  color: "#9c27b0" },
  media:       { label: "IBTU/Media-Press",          color: "#ff69b4" },
  vendor:      { label: "IBTU/Vendor-Supplier",      color: "#795548" },
  internal:    { label: "IBTU/Internal",             color: "#607d8b" },
  contracts:   { label: "IBTU/Contracts",            color: "#000000" },
  donor:       { label: "IBTU/Donor-Comms",          color: "#4caf50" },
  school:      { label: "IBTU/School-Partnerships",  color: "#2196f3" },
};

/* ── Classification Keywords ── */
const RULES = [
  {
    key: "insurance",
    subjectKeywords: ["COI", "certificate of insurance", "insurance", "liability", "policy", "endorsement", "coverage", "additional insured"],
    bodyKeywords: ["certificate of insurance", "coi", "additional insured", "policy number"],
    senderDomains: ["alliant", "marsh", "aon", "gallagher"],
    attachmentKeywords: ["coi", "certificate", "insurance", "policy"],
    driveFolder: "01-Insurance-COI",
  },
  {
    key: "invoice",
    subjectKeywords: ["invoice", "bill", "payment", "PO#", "purchase order", "receipt", "remittance"],
    bodyKeywords: ["invoice", "amount due", "net 30", "payment", "remittance"],
    senderDomains: ["bill.com", "quickbooks", "stripe", "paypal", "square"],
    attachmentKeywords: ["invoice", "bill", "receipt", "statement", "po"],
    driveFolder: "02-Invoices",
  },
  {
    key: "contracts",
    subjectKeywords: ["contract", "agreement", "sign", "execute", "docusign", "amendment"],
    bodyKeywords: ["contract", "agreement", "execute", "signature", "amendment", "addendum"],
    senderDomains: ["docusign", "hellosign", "pandadoc", "adobesign"],
    attachmentKeywords: ["contract", "agreement", "amendment", "signed", "executed"],
    driveFolder: "03-Contracts-Agreements",
  },
  {
    key: "planning",
    subjectKeywords: ["planning", "logistics", "timeline", "run of show", "site plan", "setup", "production"],
    bodyKeywords: ["run of show", "logistics", "timeline", "site plan", "load-in", "setup", "breakdown"],
    senderDomains: [],
    attachmentKeywords: ["plan", "timeline", "schedule", "site", "layout", "ros", "runsheet"],
    driveFolder: "04-Planning-Docs",
  },
  {
    key: "sponsorship",
    subjectKeywords: ["sponsor", "partnership", "collaboration", "in-kind", "activation", "MOU", "LOI"],
    bodyKeywords: ["sponsorship", "partnership", "in-kind", "activation", "brand partner", "MOU", "LOI"],
    senderDomains: ["lululemon", "nike", "adidas", "google", "apple", "target", "pepsi", "bombas", "baby2baby"],
    attachmentKeywords: ["sponsor", "partnership", "deck", "proposal", "mou", "loi"],
    driveFolder: "05-Sponsorship-Decks",
  },
  {
    key: "government",
    subjectKeywords: ["permit", "compliance", "license", "ordinance", "tax", "EIN", "501c3"],
    bodyKeywords: ["permit", "city of los angeles", "council district", "LAUSD", "county", "tax exempt"],
    senderDomains: ["lacity.org", "lacounty.gov", "lausd.net", "ca.gov", "irs.gov"],
    attachmentKeywords: ["permit", "license", "approval", "compliance", "tax"],
    driveFolder: "06-Government-Permits",
  },
  {
    key: "vendor",
    subjectKeywords: ["quote", "estimate", "proposal", "bid", "SOW", "rental", "catering"],
    bodyKeywords: ["quote", "estimate", "proposal", "bid", "scope of work", "SOW", "deliverable"],
    senderDomains: [],
    attachmentKeywords: ["quote", "estimate", "proposal", "bid", "sow"],
    driveFolder: "07-Vendor-Files",
  },
  {
    key: "media",
    subjectKeywords: ["press", "media", "interview", "feature", "article", "coverage", "story"],
    bodyKeywords: ["press", "media", "interview", "article", "feature", "reporter", "journalist"],
    senderDomains: ["fox", "bet", "nbc", "abc", "cbs", "latimes", "lasentinel"],
    attachmentKeywords: ["press", "release", "article", "clip"],
    driveFolder: "08-Media-Press",
  },
  {
    key: "donor",
    subjectKeywords: ["donation", "gift", "grant", "pledge", "fund", "contribution"],
    bodyKeywords: ["donation", "gift", "pledge", "fund", "grant", "contribution", "tax receipt"],
    senderDomains: ["foundation", "fund", "philanthropy"],
    attachmentKeywords: ["donation", "receipt", "acknowledgment", "grant"],
    driveFolder: "09-Donor-Communications",
  },
  {
    key: "volunteer",
    subjectKeywords: ["volunteer", "sign up", "shift", "orientation", "training"],
    bodyKeywords: ["volunteer", "sign up", "shift", "orientation", "training", "bloomerang"],
    senderDomains: ["bloomerang", "signupgenius"],
    attachmentKeywords: ["volunteer", "roster", "signup", "waiver"],
    driveFolder: "10-Internal",
  },
  {
    key: "school",
    subjectKeywords: ["school", "campus", "LAUSD", "student", "parent", "principal", "lunchtime", "PW-8"],
    bodyKeywords: ["LAUSD", "school", "campus", "principal", "parent engagement", "lunchtime", "community school"],
    senderDomains: ["lausd.net", "alliancecrs.org"],
    attachmentKeywords: ["school", "campus", "lausd", "enrollment"],
    driveFolder: "04-Planning-Docs",
  },
];

/* ── Main Export Function ── */
function exportAndOrganizeEmails() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - LOOKBACK_DAYS);
  const query = `after:${Utilities.formatDate(cutoff, "America/Los_Angeles", "yyyy/MM/dd")}`;

  Logger.log(`Searching emails: ${query}`);

  const exportData = [];
  let start = 0;
  let totalProcessed = 0;

  // Get or create Drive folders
  const opsFolder = getOrCreateFolder_(OPS_FOLDER_NAME);
  const attFolder = getOrCreateFolder_(DRIVE_FOLDER_NAME);

  while (start < MAX_EMAILS) {
    const threads = GmailApp.search(query, start, BATCH_SIZE);
    if (threads.length === 0) break;

    for (const thread of threads) {
      const messages = thread.getMessages();
      for (const msg of messages) {
        const msgDate = msg.getDate();
        if (msgDate < cutoff) continue;

        // Classify the email
        const classification = classifyMessage_(msg);

        // Process attachments
        const attachments = msg.getAttachments();
        const attachmentRecords = [];

        for (const att of attachments) {
          const filename = att.getName();
          if (!filename || filename.startsWith(".")) continue;

          // Save attachment to Drive
          const savedPath = saveAttachmentToDrive_(att, msg, classification, opsFolder, attFolder);
          attachmentRecords.push({
            filename: filename,
            mimeType: att.getContentType(),
            sizeBytes: att.getSize(),
            drivePath: savedPath,
          });
        }

        // Apply Gmail label
        applyLabel_(thread, classification.key);

        // Build export record
        exportData.push({
          id: msg.getId(),
          threadId: thread.getId(),
          date: msgDate.toISOString(),
          from: extractName_(msg.getFrom()),
          fromEmail: extractEmail_(msg.getFrom()),
          to: msg.getTo(),
          subject: msg.getSubject(),
          body: msg.getPlainBody().substring(0, 2000), // Truncate for size
          labels: thread.getLabels().map(function(l) { return l.getName(); }),
          attachments: attachmentRecords,
          isRead: !msg.isUnread(),
          isStarred: msg.isStarred(),
          category: classification.key,
          confidence: classification.confidence,
        });

        totalProcessed++;
      }
    }

    start += BATCH_SIZE;
    Logger.log(`Processed ${totalProcessed} emails so far...`);

    // Avoid timeout (Apps Script has 6-min limit)
    if (totalProcessed > MAX_EMAILS) break;
  }

  // Save export JSON to Drive
  const exportJson = JSON.stringify(exportData, null, 2);
  const rootFolder = DriveApp.getRootFolder();
  const existing = rootFolder.getFilesByName(EXPORT_FILE_NAME);
  if (existing.hasNext()) {
    existing.next().setContent(exportJson);
  } else {
    rootFolder.createFile(EXPORT_FILE_NAME, exportJson, "application/json");
  }

  Logger.log(`✅ Exported ${totalProcessed} emails to ${EXPORT_FILE_NAME}`);
  Logger.log(`📎 Attachments saved to ${DRIVE_FOLDER_NAME}/ and ${OPS_FOLDER_NAME}/`);

  return { total: totalProcessed, exported: exportData.length };
}

/* ── Classify a Gmail message ── */
function classifyMessage_(msg) {
  const subject = (msg.getSubject() || "").toLowerCase();
  const body = (msg.getPlainBody() || "").substring(0, 5000).toLowerCase();
  const from = (msg.getFrom() || "").toLowerCase();
  const attachmentNames = msg.getAttachments().map(function(a) { return a.getName().toLowerCase(); });

  let bestKey = "internal";
  let bestScore = 0;

  for (var i = 0; i < RULES.length; i++) {
    var rule = RULES[i];
    var score = 0;

    // Subject keywords
    for (var j = 0; j < rule.subjectKeywords.length; j++) {
      if (subject.indexOf(rule.subjectKeywords[j].toLowerCase()) >= 0) score += 3;
    }

    // Body keywords
    for (var j = 0; j < rule.bodyKeywords.length; j++) {
      if (body.indexOf(rule.bodyKeywords[j].toLowerCase()) >= 0) score += 2;
    }

    // Sender domains
    for (var j = 0; j < rule.senderDomains.length; j++) {
      if (from.indexOf(rule.senderDomains[j].toLowerCase()) >= 0) score += 4;
    }

    // Attachment names
    for (var j = 0; j < rule.attachmentKeywords.length; j++) {
      for (var k = 0; k < attachmentNames.length; k++) {
        if (attachmentNames[k].indexOf(rule.attachmentKeywords[j]) >= 0) score += 3;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestKey = rule.key;
    }
  }

  var confidence = bestScore >= 6 ? "high" : bestScore >= 3 ? "medium" : "low";

  return { key: bestKey, score: bestScore, confidence: confidence };
}

/* ── Save attachment to organized Drive folders ── */
function saveAttachmentToDrive_(attachment, message, classification, opsFolder, attFolder) {
  var filename = attachment.getName();
  var from = message.getFrom();
  var date = message.getDate();
  var dateStr = Utilities.formatDate(date, "America/Los_Angeles", "yyyy-MM-dd");
  var year = Utilities.formatDate(date, "America/Los_Angeles", "yyyy");
  var orgName = extractOrgName_(extractEmail_(from));
  var personName = extractName_(from).replace(/[^a-zA-Z0-9\-_ ]/g, "").replace(/\s+/g, "-");

  // 1. Save by person
  var personFolder = getOrCreateSubFolder_(attFolder, "by-person");
  var personSubFolder = getOrCreateSubFolder_(personFolder, personName || "unknown");
  personSubFolder.createFile(attachment.copyBlob().setName(dateStr + "_" + filename));

  // 2. Save by org
  var orgFolder = getOrCreateSubFolder_(attFolder, "by-org");
  var orgSubFolder = getOrCreateSubFolder_(orgFolder, orgName || "unknown");
  orgSubFolder.createFile(attachment.copyBlob().setName(dateStr + "_" + filename));

  // 3. Save by file type
  var ext = filename.split(".").pop().toLowerCase();
  var typeMap = {
    pdf: "pdf", doc: "documents", docx: "documents", txt: "documents",
    xls: "spreadsheets", xlsx: "spreadsheets", csv: "spreadsheets",
    ppt: "presentations", pptx: "presentations", key: "presentations",
    jpg: "images", jpeg: "images", png: "images", gif: "images", heic: "images",
    mp4: "video", mov: "video",
  };
  var fileType = typeMap[ext] || "other";
  var typeFolder = getOrCreateSubFolder_(attFolder, "by-type");
  var typeSubFolder = getOrCreateSubFolder_(typeFolder, fileType);
  typeSubFolder.createFile(attachment.copyBlob().setName(dateStr + "_" + orgName + "_" + filename));

  // 4. Save to category-specific ops folder
  var rule = RULES.filter(function(r) { return r.key === classification.key; })[0];
  if (rule) {
    var catFolder = getOrCreateSubFolder_(opsFolder, rule.driveFolder);
    var yearFolder = getOrCreateSubFolder_(catFolder, year);

    // For COI: try to create event-specific subfolder
    if (classification.key === "insurance") {
      var eventFolder = getOrCreateSubFolder_(yearFolder, orgName || "general");
      eventFolder.createFile(attachment.copyBlob().setName(dateStr + "_" + filename));
    }
    // For invoices: organize by vendor
    else if (classification.key === "invoice") {
      var vendorFolder = getOrCreateSubFolder_(yearFolder, orgName || "general");
      vendorFolder.createFile(attachment.copyBlob().setName(dateStr + "_" + filename));
    }
    else {
      yearFolder.createFile(attachment.copyBlob().setName(dateStr + "_" + orgName + "_" + filename));
    }
  }

  return "saved";
}

/* ── Apply Gmail label ── */
function applyLabel_(thread, categoryKey) {
  var colorConfig = COLORS[categoryKey];
  if (!colorConfig) return;

  var label = GmailApp.getUserLabelByName(colorConfig.label);
  if (!label) {
    label = GmailApp.createLabel(colorConfig.label);
  }
  thread.addLabel(label);
}

/* ── Helper: Extract email from "Name <email>" format ── */
function extractEmail_(fromStr) {
  var match = fromStr.match(/<([^>]+)>/);
  return match ? match[1] : fromStr.trim();
}

/* ── Helper: Extract display name ── */
function extractName_(fromStr) {
  var match = fromStr.match(/^"?([^"<]+)"?\s*</);
  return match ? match[1].trim() : fromStr.split("@")[0];
}

/* ── Helper: Extract org name from email domain ── */
function extractOrgName_(email) {
  var domain = email.split("@")[1];
  if (!domain) return null;

  var generic = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com", "aol.com"];
  if (generic.indexOf(domain) >= 0) return null;

  var orgMap = {
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
  };

  return orgMap[domain] || domain.split(".")[0];
}

/* ── Helper: Get or create folder ── */
function getOrCreateFolder_(name) {
  var folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

function getOrCreateSubFolder_(parent, name) {
  var folders = parent.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : parent.createFolder(name);
}

/* ── Trigger: Run on schedule ── */
function createDailyTrigger() {
  ScriptApp.newTrigger("exportAndOrganizeEmails")
    .timeBased()
    .everyDays(1)
    .atHour(6)
    .create();
  Logger.log("✅ Daily trigger created — runs at 6 AM");
}
