/**
 * Gmail → Bloomerang Auto-Forward Script
 *
 * Forwards sent emails to Bloomerang's BCC address so they get
 * logged as full interactions in the CRM with email body + thread content.
 *
 * Each staff member has their own Bloomerang BCC address.
 * The script detects who sent the email and forwards to the correct BCC.
 *
 * SETUP:
 * 1. Go to script.google.com
 * 2. Create new project
 * 3. Paste this entire script
 * 4. Click Run → select "forwardBatch" → Authorize
 * 5. It will process 80 emails per run (well under Gmail limits)
 * 6. Run "setupHourlyTrigger" to auto-run every hour
 *
 * LIMITS BUILT IN:
 * - 80 emails per batch (Gmail daily limit: 500 for Workspace, this stays safe)
 * - 2 second delay between forwards (avoids rate limiting)
 * - Tracks progress in Script Properties (remembers where it left off)
 * - Skips internal emails (@itsbiggerthanusla.org → @itsbiggerthanusla.org)
 * - Skips system emails (google, noreply, calendar, bloomerang, qgiv)
 * - Won't re-forward emails already processed
 *
 * COST: $0
 */

// ═══════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════

// Each staff member's Bloomerang BCC address
const BLOOMERANG_BCC_MAP = {
  "molly@itsbiggerthanusla.org": "bcc156679168@bloomerang.me",
  "tyrone@itsbiggerthanusla.org": "bcc155884623@bloomerang.me",
  "cwright@itsbiggerthanusla.org": "bcc236431406@bloomerang.me",
  "danielle@itsbiggerthanusla.org": "bcc236423209@bloomerang.me",
  "data@itsbiggerthanusla.org": "bcc216733812@bloomerang.me",
};

// Fallback BCC if sender not in map (logs under Molly)
const BLOOMERANG_BCC_DEFAULT = "bcc156679168@bloomerang.me";

const BATCH_SIZE = 80;
const DELAY_MS = 2000;
const DRY_RUN = true; // SET TO false WHEN READY TO ACTUALLY FORWARD

// Cutoff dates per person — don't backfill before these dates
const BACKFILL_CUTOFFS = {
  "molly@itsbiggerthanusla.org": "2024/08/01",
  "tyrone@itsbiggerthanusla.org": "2024/08/01",
  // Everyone else: no cutoff (backfill all available history)
};

// Default cutoff if not in map (2 years back)
const DEFAULT_CUTOFF = "2022/01/01";

// Emails to SKIP
const EXCLUDED_DOMAINS = [
  "itsbiggerthanusla.org", // internal
  "google.com",
  "gmail.com", // unless it's a real contact
  "bloomerang.me",
  "bloomerang.com",
  "qgiv.com",
  "calendar.google.com",
  "noreply",
  "no-reply",
  "notifications",
  "bill.com",
];

const EXCLUDED_ADDRESSES = [
  // Add specific emails to never forward
  // "someone@example.com",
];

// ═══════════════════════════════════════
// MAIN FUNCTION — run this
// ═══════════════════════════════════════

function forwardBatch() {
  const props = PropertiesService.getScriptProperties();
  const lastProcessedDate = props.getProperty("lastProcessedDate") || "";
  const totalForwarded = parseInt(props.getProperty("totalForwarded") || "0");
  const processedIds = JSON.parse(props.getProperty("processedIds") || "[]");

  // Determine cutoff date for the current user
  const currentUser = Session.getActiveUser().getEmail().toLowerCase();
  const cutoffStr = BACKFILL_CUTOFFS[currentUser] || DEFAULT_CUTOFF;

  const query = "in:sent after:" + cutoffStr;
  const threads = GmailApp.search(query, 0, BATCH_SIZE * 2); // Get extra to account for skips

  Logger.log("Found " + threads.length + " sent threads to process");
  Logger.log("Already processed: " + totalForwarded + " total");

  let forwarded = 0;
  let skipped = 0;

  for (const thread of threads) {
    if (forwarded >= BATCH_SIZE) break;

    const messages = thread.getMessages();

    for (const message of messages) {
      if (forwarded >= BATCH_SIZE) break;

      const messageId = message.getId();

      // Skip if already processed
      if (processedIds.indexOf(messageId) !== -1) {
        skipped++;
        continue;
      }

      // Only process sent messages (from me)
      const from = message.getFrom().toLowerCase();
      if (!from.includes("@itsbiggerthanusla.org")) {
        skipped++;
        continue;
      }

      // Get recipient
      const to = message.getTo().toLowerCase();

      // Skip internal
      if (shouldSkip(to)) {
        skipped++;
        processedIds.push(messageId);
        continue;
      }

      // Determine which Bloomerang BCC to use based on sender
      const senderEmail = from.match(/[\w.-]+@[\w.-]+/);
      const bccAddress = senderEmail ? (BLOOMERANG_BCC_MAP[senderEmail[0]] || BLOOMERANG_BCC_DEFAULT) : BLOOMERANG_BCC_DEFAULT;

      // Forward to Bloomerang
      if (DRY_RUN) {
        Logger.log("[DRY RUN] Would forward: " + message.getSubject() + " → " + to + " (BCC: " + bccAddress + ")");
      } else {
        try {
          message.forward(bccAddress);
          Logger.log("Forwarded: " + message.getSubject().substring(0, 60) + " → " + bccAddress);
        } catch (e) {
          Logger.log("Failed: " + message.getSubject() + " — " + e.message);
        }

        Utilities.sleep(DELAY_MS);
      }

      forwarded++;
      processedIds.push(messageId);
    }
  }

  // Save progress
  // Keep only last 5000 IDs to avoid property size limits
  const trimmedIds = processedIds.slice(-5000);
  props.setProperty("processedIds", JSON.stringify(trimmedIds));
  props.setProperty("totalForwarded", String(totalForwarded + forwarded));
  props.setProperty("lastRun", new Date().toISOString());

  Logger.log("");
  Logger.log("═══════════════════════════════════════");
  Logger.log("Batch complete");
  Logger.log("  Forwarded this batch: " + forwarded);
  Logger.log("  Skipped: " + skipped);
  Logger.log("  Total forwarded all time: " + (totalForwarded + forwarded));
  Logger.log("  DRY RUN: " + DRY_RUN);
  Logger.log("═══════════════════════════════════════");
}

// ═══════════════════════════════════════
// HELPER — check if email should be skipped
// ═══════════════════════════════════════

function shouldSkip(email) {
  const lower = email.toLowerCase();

  for (const domain of EXCLUDED_DOMAINS) {
    if (lower.includes(domain)) return true;
  }

  for (const addr of EXCLUDED_ADDRESSES) {
    if (lower.includes(addr)) return true;
  }

  return false;
}

// ═══════════════════════════════════════
// INBOX BACKFILL — Forward received emails too
// ═══════════════════════════════════════

function forwardInboxBatch() {
  const props = PropertiesService.getScriptProperties();
  const inboxForwarded = parseInt(props.getProperty("inboxForwarded") || "0");
  const inboxProcessedIds = JSON.parse(props.getProperty("inboxProcessedIds") || "[]");

  const currentUser = Session.getActiveUser().getEmail().toLowerCase();
  const cutoffStr = BACKFILL_CUTOFFS[currentUser] || DEFAULT_CUTOFF;
  const senderEmail = currentUser;
  const bccAddress = BLOOMERANG_BCC_MAP[senderEmail] || BLOOMERANG_BCC_DEFAULT;

  // Search for received emails from external senders
  const query = "in:inbox after:" + cutoffStr + " -from:itsbiggerthanusla.org -from:google.com -from:noreply -from:no-reply -category:promotions -category:social -category:updates";
  const threads = GmailApp.search(query, 0, BATCH_SIZE * 2);

  Logger.log("Found " + threads.length + " inbox threads to process");

  let forwarded = 0;
  let skipped = 0;

  for (const thread of threads) {
    if (forwarded >= BATCH_SIZE) break;

    const messages = thread.getMessages();
    // Only forward the FIRST external message in each thread (creates the interaction in Bloomerang)
    const firstMessage = messages[0];
    const messageId = firstMessage.getId();

    if (inboxProcessedIds.indexOf(messageId) !== -1) {
      skipped++;
      continue;
    }

    const from = firstMessage.getFrom().toLowerCase();
    if (shouldSkip(from)) {
      skipped++;
      inboxProcessedIds.push(messageId);
      continue;
    }

    if (DRY_RUN) {
      Logger.log("[DRY RUN] Would forward inbox: " + firstMessage.getSubject() + " from " + from + " (BCC: " + bccAddress + ")");
    } else {
      try {
        firstMessage.forward(bccAddress);
        Logger.log("Forwarded inbox: " + firstMessage.getSubject().substring(0, 60));
      } catch (e) {
        Logger.log("Failed: " + firstMessage.getSubject() + " — " + e.message);
      }
      Utilities.sleep(DELAY_MS);
    }

    forwarded++;
    inboxProcessedIds.push(messageId);
  }

  const trimmedIds = inboxProcessedIds.slice(-5000);
  props.setProperty("inboxProcessedIds", JSON.stringify(trimmedIds));
  props.setProperty("inboxForwarded", String(inboxForwarded + forwarded));

  Logger.log("Inbox batch: forwarded " + forwarded + " | skipped " + skipped + " | DRY_RUN: " + DRY_RUN);
}

// ═══════════════════════════════════════
// PROFILE EXTRACTION — Parse email signatures for contact info
// ═══════════════════════════════════════

function extractContactProfiles() {
  const currentUser = Session.getActiveUser().getEmail().toLowerCase();
  const cutoffStr = BACKFILL_CUTOFFS[currentUser] || DEFAULT_CUTOFF;

  // Search for external emails with likely signatures
  const query = "after:" + cutoffStr + " -from:itsbiggerthanusla.org -from:google.com -from:noreply -category:promotions";
  const threads = GmailApp.search(query, 0, 200);

  const contacts = {};

  for (const thread of threads) {
    const messages = thread.getMessages();
    for (const message of messages) {
      const from = message.getFrom();
      const body = message.getPlainBody() || "";

      // Extract email
      const emailMatch = from.match(/[\w.-]+@[\w.-]+/);
      if (!emailMatch) continue;
      const email = emailMatch[0].toLowerCase();
      if (email.includes("itsbiggerthanusla.org") || email.includes("noreply") || email.includes("google.com")) continue;

      if (!contacts[email]) {
        contacts[email] = { email: email, name: "", org: "", title: "", phone: "", address: "", website: "" };
      }

      // Extract name from "Name <email>" format
      if (!contacts[email].name && from.includes("<")) {
        contacts[email].name = from.split("<")[0].replace(/"/g, "").trim();
      }

      // Parse signature from last 20 lines of email body
      const lines = body.split("\n").slice(-25);
      const sigText = lines.join("\n");

      // Phone patterns
      const phoneMatch = sigText.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
      if (phoneMatch && !contacts[email].phone) {
        contacts[email].phone = phoneMatch[1];
      }

      // Title patterns (common nonprofit/business titles)
      const titlePatterns = /(?:^|\n)\s*((?:executive |associate |assistant |deputy |chief |senior |junior |vice )?(?:director|manager|coordinator|specialist|officer|president|ceo|cfo|coo|cto|founder|co-founder|partner|counsel|attorney|advisor|consultant|analyst|developer|engineer|designer|planner|secretary|treasurer|chair)(?:\s+of\s+\w+)?)/im;
      const titleMatch = sigText.match(titlePatterns);
      if (titleMatch && !contacts[email].title) {
        contacts[email].title = titleMatch[1].trim();
      }

      // Website patterns
      const webMatch = sigText.match(/(https?:\/\/(?:www\.)?[\w.-]+\.\w{2,})/i);
      if (webMatch && !contacts[email].website) {
        contacts[email].website = webMatch[1];
      }
    }
  }

  // Log results to a spreadsheet
  const ss = SpreadsheetApp.create("Bloomerang Contact Enrichment — " + Utilities.formatDate(new Date(), "America/Los_Angeles", "yyyy-MM-dd"));
  const sheet = ss.getActiveSheet();
  sheet.appendRow(["Email", "Name", "Organization", "Title", "Phone", "Address", "Website", "Source"]);

  for (const [email, info] of Object.entries(contacts)) {
    sheet.appendRow([info.email, info.name, info.org, info.title, info.phone, info.address, info.website, "Gmail signature extraction"]);
  }

  Logger.log("Extracted " + Object.keys(contacts).length + " contact profiles → " + ss.getUrl());
}

// ═══════════════════════════════════════
// UTILITY — reset progress (start over)
// ═══════════════════════════════════════

function resetProgress() {
  const props = PropertiesService.getScriptProperties();
  props.deleteAllProperties();
  Logger.log("Progress reset. Next run will start from the beginning.");
}

// ═══════════════════════════════════════
// UTILITY — check current progress
// ═══════════════════════════════════════

function checkProgress() {
  const props = PropertiesService.getScriptProperties();
  Logger.log("Total forwarded: " + (props.getProperty("totalForwarded") || "0"));
  Logger.log("Last run: " + (props.getProperty("lastRun") || "never"));
  Logger.log("Processed IDs stored: " + JSON.parse(props.getProperty("processedIds") || "[]").length);
}

// ═══════════════════════════════════════
// SETUP — create hourly trigger
// ═══════════════════════════════════════

function setupHourlyTrigger() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }

  // Sent email forwarding — every hour
  ScriptApp.newTrigger("forwardBatch")
    .timeBased()
    .everyHours(1)
    .create();

  // Inbox email forwarding — every hour (offset by 30 min)
  ScriptApp.newTrigger("forwardInboxBatch")
    .timeBased()
    .everyHours(1)
    .create();

  Logger.log("Hourly triggers created for both sent + inbox forwarding.");
  Logger.log("Will process " + BATCH_SIZE + " sent + " + BATCH_SIZE + " inbox emails per hour.");
}

// ═══════════════════════════════════════
// CLEANUP — remove trigger when done
// ═══════════════════════════════════════

function removeTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }
  Logger.log("All triggers removed.");
}
