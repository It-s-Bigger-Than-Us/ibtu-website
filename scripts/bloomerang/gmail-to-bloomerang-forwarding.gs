/**
 * Gmail → Bloomerang Auto-Forward Script
 *
 * Forwards past sent emails to Bloomerang's BCC address so they get
 * logged as full interactions with email body + thread content.
 *
 * SETUP:
 * 1. Go to script.google.com
 * 2. Create new project
 * 3. Paste this entire script
 * 4. Click Run → select "forwardBatch" → Authorize
 * 5. It will process 80 emails per run (well under Gmail limits)
 * 6. Set up a time-based trigger to run every hour until done
 *
 * LIMITS BUILT IN:
 * - 80 emails per batch (Gmail daily limit: 500 for Workspace, this stays safe)
 * - 2 second delay between forwards (avoids rate limiting)
 * - Tracks progress in Script Properties (remembers where it left off)
 * - Skips internal emails (@itsbiggerthanusla.org → @itsbiggerthanusla.org)
 * - Skips system emails (google, noreply, calendar, bloomerang, qgiv)
 * - Exclusion list for specific contacts
 * - Won't re-forward emails already processed
 *
 * COST: $0 — Google Apps Script is free, forwarding uses your existing Gmail
 *
 * TO RUN FOR DIFFERENT TEAM MEMBERS:
 * Each person runs this from THEIR OWN Google account at script.google.com
 * Or you run it as admin using domain-wide delegation
 */

// ═══════════════════════════════════════
// CONFIGURATION — edit these
// ═══════════════════════════════════════

const BLOOMERANG_BCC = "bcc156679168@bloomerang.me"; // Your Bloomerang BCC address
const BATCH_SIZE = 80; // Emails per run (keep under 100 to be safe)
const DELAY_MS = 2000; // 2 seconds between forwards
const DAYS_BACK = 365; // How far back to go (365 = 1 year)
const DRY_RUN = true; // SET TO false WHEN READY TO ACTUALLY FORWARD

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

  // Search for sent emails to external recipients
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - DAYS_BACK);
  const dateStr = Utilities.formatDate(cutoffDate, "America/Los_Angeles", "yyyy/MM/dd");

  const query = "in:sent after:" + dateStr;
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

      // Forward to Bloomerang
      if (DRY_RUN) {
        Logger.log("[DRY RUN] Would forward: " + message.getSubject() + " → " + to);
      } else {
        try {
          message.forward(BLOOMERANG_BCC);
          Logger.log("✅ Forwarded: " + message.getSubject().substring(0, 60) + " → " + to);
        } catch (e) {
          Logger.log("⚠️ Failed: " + message.getSubject() + " — " + e.message);
        }

        // Delay to avoid rate limits
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

  // Create new hourly trigger
  ScriptApp.newTrigger("forwardBatch")
    .timeBased()
    .everyHours(1)
    .create();

  Logger.log("Hourly trigger created. Will process " + BATCH_SIZE + " emails per hour.");
  Logger.log("At this rate, 1 year of emails (~2000) will take about 25 hours.");
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
