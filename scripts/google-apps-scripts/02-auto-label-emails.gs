/**
 * Auto-Label Emails by Project/Program
 *
 * Scans inbox and applies Gmail labels based on sender, subject, and body keywords.
 * Creates labels if they don't exist.
 *
 * SETUP:
 * 1. Go to script.google.com → New project → Paste this
 * 2. Run "setupLabels" first (creates all labels)
 * 3. Run "labelEmails" to test
 * 4. Run "setupTrigger" to auto-run every 10 minutes
 *
 * COST: $0
 */

// ═══════════════════════════════════════
// CONFIGURATION
// ═══════════════════════════════════════

const LABEL_RULES = [
  {
    label: "IBTU/Back 2 School",
    keywords: ["back 2 school", "back to school", "b2s", "backpack", "school supplies"],
    senders: []
  },
  {
    label: "IBTU/School Program",
    keywords: ["school program", "lunch takeover", "lunchtime takeover", "lesson plan", "school site", "resource fair"],
    senders: ["cwright@itsbiggerthanusla.org", "danielle@itsbiggerthanusla.org"]
  },
  {
    label: "IBTU/Fire Relief",
    keywords: ["fire relief", "relief hub", "palisades", "eaton", "displaced", "fema", "disaster"],
    senders: []
  },
  {
    label: "IBTU/Coastal Care",
    keywords: ["coastal care", "beach cleanup", "venice beach", "ocean", "coastal"],
    senders: []
  },
  {
    label: "IBTU/Gala",
    keywords: ["gala", "biltmore", "giving tuesday", "silent auction", "table sales", "honoree"],
    senders: []
  },
  {
    label: "IBTU/Finance",
    keywords: ["invoice", "payment", "expense", "budget", "quickbooks", "bill.com", "reimbursement", "receipt", "tax", "w-9", "1099"],
    senders: ["rubi", "billing", "accounts@", "payable"]
  },
  {
    label: "IBTU/Grants",
    keywords: ["grant", "rfp", "proposal", "funding", "funder", "foundation", "award letter", "good neighbors"],
    senders: []
  },
  {
    label: "IBTU/Partnerships",
    keywords: ["sponsor", "partnership", "mou", "in-kind", "corporate partner", "sponsor deck"],
    senders: []
  },
  {
    label: "IBTU/Volunteers",
    keywords: ["volunteer", "sign up", "shift", "orientation", "hours logged", "volunteer lead"],
    senders: []
  },
  {
    label: "IBTU/Hub",
    keywords: ["hub", "rental", "mall", "baldwin hills crenshaw", "community supply", "case manager"],
    senders: []
  },
  {
    label: "IBTU/Compliance",
    keywords: ["insurance", "coi", "fingerprint", "live scan", "lausd", "compliance", "background check", "certificate of insurance"],
    senders: []
  },
  {
    label: "IBTU/Urgent",
    keywords: ["urgent", "deadline", "asap", "immediately", "time sensitive", "overdue"],
    senders: []
  }
];

const BATCH_SIZE = 50;
const DAYS_BACK = 7; // Only scan last 7 days each run

// ═══════════════════════════════════════
// MAIN FUNCTION
// ═══════════════════════════════════════

function labelEmails() {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - DAYS_BACK);
  const dateStr = Utilities.formatDate(cutoff, "America/Los_Angeles", "yyyy/MM/dd");

  const threads = GmailApp.search("in:inbox after:" + dateStr, 0, BATCH_SIZE);
  let labeled = 0;

  for (const thread of threads) {
    const messages = thread.getMessages();
    const firstMessage = messages[0];
    const subject = (firstMessage.getSubject() || "").toLowerCase();
    const from = (firstMessage.getFrom() || "").toLowerCase();
    const body = (firstMessage.getPlainBody() || "").toLowerCase().substring(0, 2000); // First 2000 chars only

    for (const rule of LABEL_RULES) {
      let matched = false;

      // Check keywords in subject + body
      for (const kw of rule.keywords) {
        if (subject.includes(kw) || body.includes(kw)) {
          matched = true;
          break;
        }
      }

      // Check sender matches
      if (!matched) {
        for (const sender of rule.senders) {
          if (from.includes(sender)) {
            matched = true;
            break;
          }
        }
      }

      if (matched) {
        const label = GmailApp.getUserLabelByName(rule.label);
        if (label) {
          thread.addLabel(label);
          labeled++;
        }
      }
    }
  }

  Logger.log("Labeled " + labeled + " threads across " + threads.length + " scanned");
}

// ═══════════════════════════════════════
// SETUP — Create all labels
// ═══════════════════════════════════════

function setupLabels() {
  // Create parent label
  let parent = GmailApp.getUserLabelByName("IBTU");
  if (!parent) {
    parent = GmailApp.createLabel("IBTU");
    Logger.log("Created parent label: IBTU");
  }

  for (const rule of LABEL_RULES) {
    let label = GmailApp.getUserLabelByName(rule.label);
    if (!label) {
      GmailApp.createLabel(rule.label);
      Logger.log("Created label: " + rule.label);
    } else {
      Logger.log("Label exists: " + rule.label);
    }
  }

  Logger.log("All labels ready.");
}

// ═══════════════════════════════════════
// TRIGGER — Run every 10 minutes
// ═══════════════════════════════════════

function setupTrigger() {
  // Remove existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }

  ScriptApp.newTrigger("labelEmails")
    .timeBased()
    .everyMinutes(10)
    .create();

  Logger.log("Trigger set: labelEmails runs every 10 minutes");
}

function removeTrigger() {
  const triggers = ScriptApp.getProjectTriggers();
  for (const trigger of triggers) {
    ScriptApp.deleteTrigger(trigger);
  }
  Logger.log("All triggers removed.");
}
