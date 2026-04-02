/**
 * Mail Merge — Sheets Data → Personalized Emails
 *
 * Reads rows from a Google Sheet, generates personalized emails
 * using a template, and sends them. Each row = one recipient.
 *
 * SETUP:
 * 1. Create a Google Sheet with columns: Name, Email, plus any custom fields
 * 2. Create an email template in a Google Doc with {{placeholders}}
 * 3. Update SPREADSHEET_ID, SHEET_NAME, and TEMPLATE_DOC_ID below
 * 4. script.google.com → New project → Paste this
 * 5. Run "previewMerge" first to test (no emails sent)
 * 6. Run "sendMerge" when ready
 *
 * COST: $0 (stays under Gmail daily limits)
 */

// ═══════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════

const SPREADSHEET_ID = "YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Sheet1"; // Tab name
const TEMPLATE_DOC_ID = "YOUR_TEMPLATE_DOC_ID_HERE"; // Google Doc with {{placeholders}}

const EMAIL_SUBJECT_TEMPLATE = "{{Subject}}"; // Column name for subject, or hardcode a string
const SENDER_NAME = "It's Bigger Than Us";
const REPLY_TO = "info@itsbiggerthanusla.org";

const STATUS_COLUMN = "Status"; // Column to mark as "Sent"
const EMAIL_COLUMN = "Email"; // Column with recipient email

const DELAY_MS = 2000; // 2 seconds between emails
const DRY_RUN = true; // SET TO false WHEN READY TO SEND

// ═══════════════════════════════════════
// MAIN — Send personalized emails
// ═══════════════════════════════════════

function sendMerge() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = ss.getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();

  if (data.length < 2) {
    Logger.log("No data rows found.");
    return;
  }

  // Get template
  const templateDoc = DocumentApp.openById(TEMPLATE_DOC_ID);
  const templateBody = templateDoc.getBody().getText();

  // Headers are in row 0
  const headers = data[0];
  const emailCol = headers.indexOf(EMAIL_COLUMN);
  const statusCol = headers.indexOf(STATUS_COLUMN);

  if (emailCol === -1) {
    Logger.log("ERROR: No '" + EMAIL_COLUMN + "' column found.");
    return;
  }

  let sent = 0;
  let skipped = 0;

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const email = row[emailCol];

    // Skip if no email or already sent
    if (!email) { skipped++; continue; }
    if (statusCol !== -1 && row[statusCol] === "Sent") { skipped++; continue; }

    // Replace placeholders
    let body = templateBody;
    let subject = EMAIL_SUBJECT_TEMPLATE;

    for (let j = 0; j < headers.length; j++) {
      const placeholder = "{{" + headers[j] + "}}";
      const value = row[j] || "";
      body = body.split(placeholder).join(value);
      subject = subject.split(placeholder).join(value);
    }

    if (DRY_RUN) {
      Logger.log("[DRY RUN] Would send to: " + email + " | Subject: " + subject);
    } else {
      try {
        GmailApp.sendEmail(email, subject, body, {
          name: SENDER_NAME,
          replyTo: REPLY_TO
        });

        // Mark as sent
        if (statusCol !== -1) {
          sheet.getRange(i + 1, statusCol + 1).setValue("Sent");
        }

        Logger.log("Sent to: " + email);
        Utilities.sleep(DELAY_MS);
      } catch (err) {
        Logger.log("Failed: " + email + " — " + err.message);
        if (statusCol !== -1) {
          sheet.getRange(i + 1, statusCol + 1).setValue("Failed: " + err.message);
        }
      }
    }

    sent++;
  }

  Logger.log("Mail merge complete. Sent: " + sent + " | Skipped: " + skipped + " | DRY_RUN: " + DRY_RUN);
}

// ═══════════════════════════════════════
// PREVIEW — Log what would be sent
// ═══════════════════════════════════════

function previewMerge() {
  DRY_RUN = true;
  sendMerge();
}
