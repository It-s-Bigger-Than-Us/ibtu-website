/**
 * Gmail → Bloomerang Auto-Forward Script
 *
 * Forwards sent emails to Bloomerang's BCC address so they get
 * logged as full interactions in the CRM with email body + thread content.
 *
 * CONTACT GATING: Before forwarding, checks Bloomerang API to confirm
 * the recipient already exists as a constituent. If not, the email is
 * logged to a "Review Queue" spreadsheet instead of forwarded — preventing
 * junk auto-created contacts in the CRM.
 *
 * Each staff member has their own Bloomerang BCC address.
 * The script detects who sent the email and forwards to the correct BCC.
 *
 * SETUP:
 * 1. Go to script.google.com
 * 2. Create new project, paste this script
 * 3. Run "storeApiKey" first — enter your Bloomerang API key when prompted
 * 4. Run "forwardBatch" → Authorize
 * 5. Run "setupHourlyTrigger" to auto-run every hour
 *
 * LIMITS BUILT IN:
 * - 80 emails per batch (Gmail daily limit: 500 for Workspace, this stays safe)
 * - 2 second delay between forwards (avoids rate limiting)
 * - Tracks progress in Script Properties (remembers where it left off)
 * - Skips internal emails (@itsbiggerthanusla.org → @itsbiggerthanusla.org)
 * - Skips system emails (google, noreply, calendar, bloomerang, qgiv)
 * - Won't re-forward emails already processed
 * - Won't forward to contacts not already in Bloomerang
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
  "jayshawn@itsbiggerthanusla.org": "bcc248057885@bloomerang.me",
};

// Fallback BCC if sender not in map (logs under Molly)
const BLOOMERANG_BCC_DEFAULT = "bcc156679168@bloomerang.me";

const BLOOMERANG_API_BASE = "https://api.bloomerang.co/v2";

const BATCH_SIZE = 80;
const DELAY_MS = 2000;
const DRY_RUN = false; // LIVE

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
  "unclaimedproperty@blueshieldca.com",
  "support@anthropic.com",
  "privacy@openai.com",
];

// ═══════════════════════════════════════
// API KEY SETUP — run this once
// ═══════════════════════════════════════

/**
 * Stores the Bloomerang API key in Script Properties.
 * Run this ONCE before using the script.
 * You'll be prompted to enter the key.
 */
function storeApiKey() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty("BLOOMERANG_API_KEY", "baf5b550-35cc-e1b9-3f81-a4cfd8299ee5");
  Logger.log("API key stored successfully.");
  Logger.log("Now run forwardBatch to test.");
}

function resetApiKey() {
  PropertiesService.getScriptProperties().deleteProperty("BLOOMERANG_API_KEY");
  Logger.log("API key cleared. Run storeApiKey() for instructions to re-add it.");
}

/**
 * Test function — makes one API call and logs everything.
 * Run this to diagnose API connection issues.
 */
function testBloomerangApi() {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty("BLOOMERANG_API_KEY");

  Logger.log("API key set: " + (apiKey ? "YES" : "NO"));

  if (!apiKey) {
    Logger.log("Run storeApiKey() first.");
    return;
  }

  // Test 1: Log raw structure of first constituent to see field names
  const url1 = BLOOMERANG_API_BASE + "/constituents?take=1";
  Logger.log("Test 1 — Fetching one constituent to see data structure...");
  try {
    const r1 = UrlFetchApp.fetch(url1, {
      method: "get",
      headers: { "X-API-KEY": apiKey },
      muteHttpExceptions: true,
    });
    const data1 = JSON.parse(r1.getContentText());
    const first = (data1.Results || [])[0];
    if (first) {
      Logger.log("Keys: " + Object.keys(first).join(", "));
      Logger.log("PrimaryEmail type: " + typeof first.PrimaryEmail);
      Logger.log("PrimaryEmail value: " + JSON.stringify(first.PrimaryEmail));
      Logger.log("EmailAddresses: " + JSON.stringify(first.EmailAddresses));
    }
  } catch (e) {
    Logger.log("Test 1 error: " + e.message);
  }

  // Test 2: Try email-specific search
  Logger.log("");
  Logger.log("Test 2 — Searching for a known email...");

  // Try the email endpoint if it exists
  var testEmails = ["molly@itsbiggerthanusla.org"];
  for (var i = 0; i < testEmails.length; i++) {
    var email = testEmails[i];
    // Try search with just the email
    var url2 = BLOOMERANG_API_BASE + "/constituents?search=" + encodeURIComponent(email) + "&take=3";
    Logger.log("Search URL: " + url2);
    try {
      var r2 = UrlFetchApp.fetch(url2, {
        method: "get",
        headers: { "X-API-KEY": apiKey },
        muteHttpExceptions: true,
      });
      var data2 = JSON.parse(r2.getContentText());
      Logger.log("Total: " + (data2.Total || 0) + " | Results returned: " + (data2.Results || []).length);
      var results = data2.Results || [];
      for (var j = 0; j < results.length; j++) {
        var c = results[j];
        Logger.log("  " + (c.FirstName || "") + " " + (c.LastName || "") + " | PrimaryEmail: " + JSON.stringify(c.PrimaryEmail) + " | EmailAddresses: " + JSON.stringify(c.EmailAddresses));
      }
    } catch (e) {
      Logger.log("Search error: " + e.message);
    }
  }
}

// ═══════════════════════════════════════
// BLOOMERANG CONTACT CACHE
// ═══════════════════════════════════════

/**
 * Downloads ALL constituent emails from Bloomerang and caches them.
 * ~9,300 contacts at 50 per page = ~188 API calls (~2 min).
 * Cache refreshes daily (checks timestamp).
 *
 * Run this manually the first time, then it auto-refreshes in forwardBatch.
 */
function refreshContactEmailCache() {
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty("BLOOMERANG_API_KEY");

  if (!apiKey) {
    Logger.log("No API key set. Run storeApiKey() first.");
    return null;
  }

  Logger.log("Downloading all constituent emails from Bloomerang...");

  const allEmails = {};  // email → name, for logging
  let skip = 0;
  const take = 50;
  let total = 0;
  let pages = 0;

  while (true) {
    const url = BLOOMERANG_API_BASE + "/constituents?take=" + take + "&skip=" + skip;

    try {
      const response = UrlFetchApp.fetch(url, {
        method: "get",
        headers: { "X-API-KEY": apiKey },
        muteHttpExceptions: true,
      });

      if (response.getResponseCode() !== 200) {
        Logger.log("API error at skip=" + skip + ": " + response.getResponseCode());
        break;
      }

      const data = JSON.parse(response.getContentText());
      const results = data.Results || [];
      total = data.Total || total;

      if (results.length === 0) break;

      for (const c of results) {
        if (c.PrimaryEmail && c.PrimaryEmail.Value) {
          const email = c.PrimaryEmail.Value.toLowerCase().trim();
          allEmails[email] = (c.FirstName || "") + " " + (c.LastName || "");
        }
      }

      pages++;
      skip += take;

      // Safety: don't exceed 6-min execution limit
      if (pages > 250) {
        Logger.log("Hit page limit at " + pages + " pages. Cached what we have.");
        break;
      }

    } catch (e) {
      Logger.log("API exception at skip=" + skip + ": " + e.message);
      break;
    }
  }

  // Store as simple array of emails
  const emailList = Object.keys(allEmails);
  props.setProperty("bloomerangEmails", JSON.stringify(emailList));
  props.setProperty("bloomerangCacheDate", new Date().toISOString());

  Logger.log("═══════════════════════════════════════");
  Logger.log("Cache complete: " + emailList.length + " emails from " + total + " constituents");
  Logger.log("Pages fetched: " + pages);
  Logger.log("═══════════════════════════════════════");

  return new Set(emailList);
}

/**
 * Loads the cached email set. Auto-refreshes if cache is older than 24 hours.
 */
function loadContactCache() {
  const props = PropertiesService.getScriptProperties();
  const cacheDate = props.getProperty("bloomerangCacheDate");
  const cachedEmails = props.getProperty("bloomerangEmails");

  // Check if cache exists and is fresh (less than 24 hours old)
  if (cacheDate && cachedEmails) {
    const age = Date.now() - new Date(cacheDate).getTime();
    const hours = age / (1000 * 60 * 60);
    if (hours < 24) {
      const emails = JSON.parse(cachedEmails);
      Logger.log("Contact cache loaded: " + emails.length + " emails (" + Math.round(hours) + " hours old)");
      return new Set(emails);
    }
    Logger.log("Contact cache expired (" + Math.round(hours) + " hours old). Refreshing...");
  } else {
    Logger.log("No contact cache found. Building from Bloomerang API...");
  }

  // Cache missing or stale — refresh
  return refreshContactEmailCache();
}

/**
 * Checks if an email exists in the cached Bloomerang contact list.
 */
function contactExistsInBloomerang(email, cache) {
  if (!cache) return { exists: false, noCache: true };
  const lower = email.toLowerCase().trim();
  return { exists: cache.has(lower) };
}

// ═══════════════════════════════════════
// REVIEW QUEUE — log unknown contacts
// ═══════════════════════════════════════

/**
 * Gets or creates the Review Queue spreadsheet.
 * Stores the spreadsheet ID in Script Properties so it reuses the same sheet.
 */
function getReviewSheet() {
  const props = PropertiesService.getScriptProperties();
  const sheetId = props.getProperty("reviewSheetId");

  if (sheetId) {
    try {
      const ss = SpreadsheetApp.openById(sheetId);
      return ss.getSheetByName("Review Queue") || ss.getActiveSheet();
    } catch (e) {
      // Sheet was deleted or inaccessible — create a new one
      Logger.log("Review sheet not found, creating new one.");
    }
  }

  // Create new spreadsheet
  const ss = SpreadsheetApp.create("Bloomerang Review Queue — Contacts Not in CRM");
  const sheet = ss.getActiveSheet();
  sheet.setName("Review Queue");
  sheet.appendRow([
    "Date Logged",
    "Recipient Email",
    "Recipient Name",
    "Email Subject",
    "Sender",
    "Status",
  ]);

  // Bold header row
  sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
  sheet.setFrozenRows(1);

  // Auto-size columns
  sheet.autoResizeColumns(1, 6);

  props.setProperty("reviewSheetId", ss.getId());
  Logger.log("Created Review Queue spreadsheet: " + ss.getUrl());

  return sheet;
}

/**
 * Logs an email to the Review Queue for manual review.
 */
function logToReviewQueue(sheet, recipientEmail, recipientName, subject, sender) {
  const now = Utilities.formatDate(new Date(), "America/Los_Angeles", "yyyy-MM-dd HH:mm");
  sheet.appendRow([
    now,
    recipientEmail,
    recipientName || "",
    subject,
    sender,
    "Needs Review",
  ]);
}

// ═══════════════════════════════════════
// HELPER — extract all email addresses from a To/CC field
// ═══════════════════════════════════════

function extractEmails(field) {
  if (!field) return [];
  const matches = field.match(/[\w.-]+@[\w.-]+/g);
  return matches ? matches.map(function(e) { return e.toLowerCase(); }) : [];
}

// Domain-wide coverage: Admin Console Gmail routing BCCs all staff
// outbound mail to molly@. This script scans molly's inbox and
// uses the From: header to route to the correct Bloomerang BCC.

// ═══════════════════════════════════════
// MAIN FUNCTION — scans ALL staff inboxes via domain-wide delegation
// ═══════════════════════════════════════

function forwardBatch() {
  const props = PropertiesService.getScriptProperties();
  const totalForwarded = parseInt(props.getProperty("totalForwarded") || "0");
  const processedIds = JSON.parse(props.getProperty("processedIds") || "[]");

  const cache = loadContactCache();
  if (!cache) {
    Logger.log("ERROR: Could not load contact cache. Check API key.");
    return;
  }

  let reviewSheet = null;
  const currentUser = Session.getActiveUser().getEmail().toLowerCase();
  const cutoffStr = BACKFILL_CUTOFFS[currentUser] || DEFAULT_CUTOFF;

  // Search sent mail + BCC'd copies from other staff (via Gmail routing rule)
  const query = "in:sent after:" + cutoffStr;
  const threads = GmailApp.search(query, 0, BATCH_SIZE * 2);

  Logger.log("Found " + threads.length + " sent threads to process");
  Logger.log("Already processed: " + totalForwarded + " total");
  Logger.log("Contact cache: " + cache.size + " emails loaded");
  Logger.log("DRY RUN: " + DRY_RUN);

  let forwarded = 0;
  let skipped = 0;
  let queued = 0;

  for (const thread of threads) {
    if (forwarded >= BATCH_SIZE) break;

    const messages = thread.getMessages();

    for (const message of messages) {
      if (forwarded >= BATCH_SIZE) break;

      const messageId = message.getId();

      if (processedIds.indexOf(messageId) !== -1) {
        skipped++;
        continue;
      }

      const from = message.getFrom().toLowerCase();
      if (!from.includes("@itsbiggerthanusla.org")) {
        skipped++;
        continue;
      }

      const to = message.getTo().toLowerCase();

      if (shouldSkip(to)) {
        skipped++;
        processedIds.push(messageId);
        continue;
      }

      const recipientEmails = extractEmails(to);
      if (recipientEmails.length === 0) {
        skipped++;
        processedIds.push(messageId);
        continue;
      }

      // Check if ANY recipient exists in Bloomerang
      let hasKnownRecipient = false;
      for (const recipEmail of recipientEmails) {
        if (shouldSkip(recipEmail)) continue;
        if (contactExistsInBloomerang(recipEmail, cache).exists) {
          hasKnownRecipient = true;
          break;
        }
      }

      if (!hasKnownRecipient) {
        if (!reviewSheet) reviewSheet = getReviewSheet();
        const recipName = to.includes("<") ? to.split("<")[0].replace(/"/g, "").trim() : "";
        logToReviewQueue(reviewSheet, recipientEmails.join(", "), recipName, message.getSubject(), from);

        if (DRY_RUN) {
          Logger.log("[DRY] NOT IN CRM: " + message.getSubject().substring(0, 50) + " → " + recipientEmails.join(", "));
        }

        queued++;
        processedIds.push(messageId);
        continue;
      }

      // Route to correct Bloomerang BCC based on who sent it
      const senderEmail = from.match(/[\w.-]+@[\w.-]+/);
      const bccAddress = senderEmail ? (BLOOMERANG_BCC_MAP[senderEmail[0]] || BLOOMERANG_BCC_DEFAULT) : BLOOMERANG_BCC_DEFAULT;

      if (DRY_RUN) {
        Logger.log("[DRY] Would forward: " + message.getSubject().substring(0, 50) + " [" + (senderEmail ? senderEmail[0] : "?") + "] → " + bccAddress);
      } else {
        try {
          message.forward(bccAddress);
          Logger.log("Forwarded: " + message.getSubject().substring(0, 50) + " → " + bccAddress);
        } catch (e) {
          Logger.log("Failed: " + message.getSubject().substring(0, 40) + " — " + e.message);
        }
        Utilities.sleep(DELAY_MS);
      }

      forwarded++;
      processedIds.push(messageId);
    }
  }

  const trimmedIds = processedIds.slice(-5000);
  props.setProperty("processedIds", JSON.stringify(trimmedIds));
  props.setProperty("totalForwarded", String(totalForwarded + forwarded));
  props.setProperty("lastRun", new Date().toISOString());

  Logger.log("");
  Logger.log("═══════════════════════════════════════");
  Logger.log("Batch complete");
  Logger.log("  Forwarded this batch: " + forwarded);
  Logger.log("  Queued for review (not in CRM): " + queued);
  Logger.log("  Skipped: " + skipped);
  Logger.log("  Total forwarded all time: " + (totalForwarded + forwarded));
  Logger.log("  Bloomerang contacts in cache: " + cache.size);
  Logger.log("  DRY RUN: " + DRY_RUN);
  Logger.log("═══════════════════════════════════════");

  if (reviewSheet) {
    Logger.log("  Review Queue: " + SpreadsheetApp.openById(props.getProperty("reviewSheetId")).getUrl());
  }
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
// INBOX BACKFILL — Forward received emails for ALL staff
// ═══════════════════════════════════════

function forwardInboxBatch() {
  const props = PropertiesService.getScriptProperties();
  const inboxForwarded = parseInt(props.getProperty("inboxForwarded") || "0");
  const inboxProcessedIds = JSON.parse(props.getProperty("inboxProcessedIds") || "[]");

  const cache = loadContactCache();
  if (!cache) {
    Logger.log("ERROR: Could not load contact cache.");
    return;
  }

  let reviewSheet = null;
  let forwarded = 0;
  let skipped = 0;
  let queued = 0;

  Logger.log("Scanning " + STAFF_ACCOUNTS.length + " staff inboxes (received mail)");
  Logger.log("DRY RUN: " + DRY_RUN);
  Logger.log("");

  for (const staffEmail of STAFF_ACCOUNTS) {
    const bccAddress = BLOOMERANG_BCC_MAP[staffEmail];
    const cutoffStr = BACKFILL_CUTOFFS[staffEmail] || DEFAULT_CUTOFF;

    let messages = [];
    try {
      const query = "in:inbox after:" + cutoffStr + " -from:itsbiggerthanusla.org -from:google.com -from:noreply -from:no-reply -category:promotions -category:social -category:updates";
      const response = Gmail.Users.Messages.list(staffEmail, {
        q: query,
        maxResults: BATCH_SIZE
      });
      messages = response.messages || [];
    } catch (e) {
      Logger.log("ERROR accessing " + staffEmail + " inbox: " + e.message);
      continue;
    }

    Logger.log("── " + staffEmail + ": " + messages.length + " inbox messages found");

    let userForwarded = 0;
    let userSkipped = 0;
    let userQueued = 0;

    for (const msgRef of messages) {
      if (forwarded >= BATCH_SIZE) break;

      const messageId = msgRef.id;

      if (inboxProcessedIds.indexOf(messageId) !== -1) {
        userSkipped++;
        skipped++;
        continue;
      }

      let msg;
      try {
        msg = Gmail.Users.Messages.get(staffEmail, messageId, { format: "metadata", metadataHeaders: ["To", "From", "Subject"] });
      } catch (e) {
        userSkipped++;
        skipped++;
        inboxProcessedIds.push(messageId);
        continue;
      }

      const headers = msg.payload.headers || [];
      let from = "";
      let subject = "";
      for (const h of headers) {
        if (h.name === "From") from = h.value.toLowerCase();
        if (h.name === "Subject") subject = h.value;
      }

      if (shouldSkip(from)) {
        userSkipped++;
        skipped++;
        inboxProcessedIds.push(messageId);
        continue;
      }

      // Check if sender exists in Bloomerang
      const senderEmails = extractEmails(from);
      let senderInCrm = false;
      for (const se of senderEmails) {
        if (contactExistsInBloomerang(se, cache).exists) {
          senderInCrm = true;
          break;
        }
      }

      if (!senderInCrm) {
        if (!reviewSheet) reviewSheet = getReviewSheet();
        const senderName = from.includes("<") ? from.split("<")[0].replace(/"/g, "").trim() : "";
        logToReviewQueue(reviewSheet, senderEmails.join(", "), senderName, subject, "INBOUND to " + staffEmail);

        if (DRY_RUN) {
          Logger.log("  [DRY] INBOX NOT IN CRM: " + subject.substring(0, 50) + " from " + senderEmails.join(", "));
        }

        userQueued++;
        queued++;
        inboxProcessedIds.push(messageId);
        continue;
      }

      if (DRY_RUN) {
        Logger.log("  [DRY] Would forward inbox: " + subject.substring(0, 50) + " → " + bccAddress);
      } else {
        try {
          Gmail.Users.Messages.send({
            raw: Utilities.base64Encode(
              "From: " + staffEmail + "\r\n" +
              "To: " + bccAddress + "\r\n" +
              "Subject: Fwd: " + subject + "\r\n" +
              "Content-Type: text/plain; charset=utf-8\r\n\r\n" +
              "[Forwarded inbound email to Bloomerang]\r\n" +
              "Original From: " + from + "\r\n" +
              "Original Subject: " + subject + "\r\n"
            )
          }, staffEmail);

          Logger.log("  Forwarded inbox: " + subject.substring(0, 50) + " → " + bccAddress);
        } catch (e) {
          Logger.log("  FAILED: " + subject.substring(0, 50) + " — " + e.message);
        }
        Utilities.sleep(DELAY_MS);
      }

      userForwarded++;
      forwarded++;
      inboxProcessedIds.push(messageId);
    }

    Logger.log("  ↳ forwarded: " + userForwarded + " | queued: " + userQueued + " | skipped: " + userSkipped);
  }

  const trimmedIds = inboxProcessedIds.slice(-5000);
  props.setProperty("inboxProcessedIds", JSON.stringify(trimmedIds));
  props.setProperty("inboxForwarded", String(inboxForwarded + forwarded));

  Logger.log("");
  Logger.log("Inbox batch complete — ALL STAFF: forwarded " + forwarded + " | queued " + queued + " | skipped " + skipped);
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
// UTILITY — view review queue URL
// ═══════════════════════════════════════

function viewReviewQueue() {
  const sheetId = PropertiesService.getScriptProperties().getProperty("reviewSheetId");
  if (sheetId) {
    Logger.log("Review Queue: " + SpreadsheetApp.openById(sheetId).getUrl());
  } else {
    Logger.log("No review queue created yet. It will be created on the first run that finds unknown contacts.");
  }
}

// ═══════════════════════════════════════
// UTILITY — clear contact cache (force re-check all)
// ═══════════════════════════════════════

function clearContactCache() {
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty("bloomerangEmails");
  props.deleteProperty("bloomerangCacheDate");
  Logger.log("Contact cache cleared. Next run will re-download all contacts from Bloomerang.");
}

// ═══════════════════════════════════════
// UTILITY — reset progress (start over)
// ═══════════════════════════════════════

function resetProgress() {
  const props = PropertiesService.getScriptProperties();
  props.deleteProperty("processedIds");
  props.deleteProperty("inboxProcessedIds");
  props.deleteProperty("totalForwarded");
  props.deleteProperty("inboxForwarded");
  props.deleteProperty("lastRun");
  props.deleteProperty("bloomerangEmails");
  props.deleteProperty("bloomerangCacheDate");
  props.deleteProperty("reviewSheetId");
  Logger.log("Progress + cache reset. API key preserved.");
  Logger.log("Next run will re-check all emails from the beginning.");
}

// ═══════════════════════════════════════
// UTILITY — check current progress
// ═══════════════════════════════════════

function checkProgress() {
  const props = PropertiesService.getScriptProperties();
  Logger.log("Total forwarded: " + (props.getProperty("totalForwarded") || "0"));
  Logger.log("Last run: " + (props.getProperty("lastRun") || "never"));
  Logger.log("Processed IDs stored: " + JSON.parse(props.getProperty("processedIds") || "[]").length);
  const cachedEmails = props.getProperty("bloomerangEmails");
  const cacheDate = props.getProperty("bloomerangCacheDate");
  Logger.log("Contact cache: " + (cachedEmails ? JSON.parse(cachedEmails).length + " emails" : "empty") + " | Last refreshed: " + (cacheDate || "never"));
  Logger.log("API key set: " + (props.getProperty("BLOOMERANG_API_KEY") ? "YES" : "NO"));
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

// ═══════════════════════════════════════
// INBOX → GROUP MIGRATION — labels + filters for all 5 accounts
// ═══════════════════════════════════════

// Accounts being converted from user inboxes to Google Groups
const GROUP_MIGRATION_ACCOUNTS = [
  { address: "partnerships@itsbiggerthanusla.org", label: "Partnerships Archive" },
  { address: "press@itsbiggerthanusla.org",        label: "Press Archive" },
  { address: "help@itsbiggerthanusla.org",          label: "Help Archive" },
  { address: "volunteers@itsbiggerthanusla.org",    label: "Volunteers Archive" },
  { address: "info@itsbiggerthanusla.org",          label: "Info Archive" },
];

/**
 * Creates archive labels and Gmail filters for ALL 5 accounts.
 * Run this ONCE before starting data migrations.
 * Each account gets its own label, and a filter that auto-labels + skips inbox.
 */
function setupAllArchiveLabels() {
  var created = 0;
  var failed = 0;

  for (var i = 0; i < GROUP_MIGRATION_ACCOUNTS.length; i++) {
    var acct = GROUP_MIGRATION_ACCOUNTS[i];
    var addr = acct.address;
    var labelName = acct.label;

    // Create label
    var label = GmailApp.getUserLabelByName(labelName);
    if (!label) {
      label = GmailApp.createLabel(labelName);
      Logger.log("✓ Created label: " + labelName);
    } else {
      Logger.log("· Label exists: " + labelName);
    }

    // Look up the label ID via Gmail API
    var labelId = null;
    var labels = Gmail.Users.Labels.list("me").labels;
    for (var k = 0; k < labels.length; k++) {
      if (labels[k].name === labelName) {
        labelId = labels[k].id;
        break;
      }
    }

    if (!labelId) {
      Logger.log("✗ Could not find label ID for: " + labelName);
      failed++;
      continue;
    }

    // Create filter using label ID
    var filter = {
      criteria: {
        query: "to:" + addr + " OR from:" + addr + " OR deliveredto:" + addr
      },
      action: {
        addLabelIds: [labelId],
        removeLabelIds: ["INBOX"]
      }
    };

    try {
      Gmail.Users.Settings.Filters.create(filter, "me");
      Logger.log("✓ Filter created: " + addr + " → " + labelName + " (skip inbox)");
      created++;
    } catch (e) {
      Logger.log("✗ Filter failed for " + addr + ": " + e.message);
      failed++;
    }
  }

  Logger.log("");
  Logger.log("═══════════════════════════════════════");
  Logger.log("Labels + filters: " + created + " created, " + failed + " failed");
  Logger.log("");
  Logger.log("Labels created:");
  for (var j = 0; j < GROUP_MIGRATION_ACCOUNTS.length; j++) {
    Logger.log("  · " + GROUP_MIGRATION_ACCOUNTS[j].label + " ← " + GROUP_MIGRATION_ACCOUNTS[j].address);
  }
  Logger.log("");
  Logger.log("You can now start data migrations in Admin Console.");
  Logger.log("All migrated emails will land in their archive label and skip your inbox.");
  Logger.log("═══════════════════════════════════════");
}

/**
 * After ALL migrations complete, run this to catch any migrated emails
 * that landed in the inbox and move them to their correct archive label.
 */
function archiveAllMigratedEmails() {
  var totalMoved = 0;

  for (var i = 0; i < GROUP_MIGRATION_ACCOUNTS.length; i++) {
    var acct = GROUP_MIGRATION_ACCOUNTS[i];
    var label = GmailApp.getUserLabelByName(acct.label);
    if (!label) {
      Logger.log("SKIP: Label '" + acct.label + "' not found");
      continue;
    }

    var queries = [
      "in:inbox to:" + acct.address,
      "in:inbox from:" + acct.address,
      "in:inbox deliveredto:" + acct.address
    ];

    var moved = 0;
    for (var q = 0; q < queries.length; q++) {
      var threads = GmailApp.search(queries[q], 0, 500);
      for (var t = 0; t < threads.length; t++) {
        label.addToThread(threads[t]);
        threads[t].moveToArchive();
        moved++;
      }
    }

    Logger.log(acct.label + ": moved " + moved + " threads");
    totalMoved += moved;
  }

  Logger.log("");
  Logger.log("Total: " + totalMoved + " threads archived across all 5 accounts.");
}
