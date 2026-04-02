/**
 * Finance Email Auto-Forward to Rubi
 *
 * Scans inbox for finance-related emails and forwards them
 * to the finance team automatically.
 *
 * SETUP:
 * 1. script.google.com → New project → Paste this
 * 2. Update FINANCE_EMAIL below
 * 3. Run "forwardFinanceEmails" to test
 * 4. Run "setupTrigger" to auto-run every 10 minutes
 *
 * COST: $0
 */

// ═══════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════

const FINANCE_EMAIL = "finance@itsbiggerthanusla.org"; // Update after creating Google Group
const FINANCE_LABEL_NAME = "IBTU/Finance-Forwarded";
const BATCH_SIZE = 20;

const FINANCE_KEYWORDS = [
  "invoice",
  "payment",
  "expense",
  "reimbursement",
  "receipt",
  "bill.com",
  "quickbooks",
  "payroll",
  "gusto",
  "tax form",
  "w-9",
  "w9",
  "1099",
  "bank statement",
  "wire transfer",
  "ach",
  "purchase order",
  "vendor payment",
  "accounts payable",
  "accounts receivable"
];

const FINANCE_SENDERS = [
  "bill.com",
  "intuit.com",
  "quickbooks",
  "gusto.com",
  "paypal",
  "stripe",
  "square"
];

// ═══════════════════════════════════════
// MAIN
// ═══════════════════════════════════════

function forwardFinanceEmails() {
  // Ensure label exists
  let label = GmailApp.getUserLabelByName(FINANCE_LABEL_NAME);
  if (!label) {
    label = GmailApp.createLabel(FINANCE_LABEL_NAME);
  }

  // Search unread inbox from last 2 days, excluding already-forwarded
  const query = "in:inbox is:unread newer_than:2d -label:" + FINANCE_LABEL_NAME.replace("/", "-");
  const threads = GmailApp.search(query, 0, BATCH_SIZE);

  let forwarded = 0;

  for (const thread of threads) {
    const messages = thread.getMessages();
    const firstMessage = messages[0];
    const subject = (firstMessage.getSubject() || "").toLowerCase();
    const from = (firstMessage.getFrom() || "").toLowerCase();
    const body = (firstMessage.getPlainBody() || "").toLowerCase().substring(0, 1000);

    let isFinance = false;

    // Check keywords
    for (const kw of FINANCE_KEYWORDS) {
      if (subject.includes(kw) || body.includes(kw)) {
        isFinance = true;
        break;
      }
    }

    // Check senders
    if (!isFinance) {
      for (const sender of FINANCE_SENDERS) {
        if (from.includes(sender)) {
          isFinance = true;
          break;
        }
      }
    }

    if (isFinance) {
      // Forward the latest message in thread
      const latest = messages[messages.length - 1];
      latest.forward(FINANCE_EMAIL);
      thread.addLabel(label);
      forwarded++;

      Logger.log("Forwarded: " + firstMessage.getSubject());
      Utilities.sleep(1000); // Rate limit
    }
  }

  Logger.log("Finance forward complete. Forwarded: " + forwarded + " / Scanned: " + threads.length);
}

// ═══════════════════════════════════════
// TRIGGER — Every 10 minutes
// ═══════════════════════════════════════

function setupTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }

  ScriptApp.newTrigger("forwardFinanceEmails")
    .timeBased()
    .everyMinutes(10)
    .create();

  Logger.log("Finance auto-forward trigger set: every 10 minutes");
}

function removeTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }
  Logger.log("All triggers removed.");
}
