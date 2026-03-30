/**
 * Gmail → Bloomerang Interaction Import
 *
 * Searches Molly's Gmail for all external communications,
 * matches contacts to Bloomerang constituents by email,
 * and logs them as Interaction records.
 *
 * This script is meant to be run in Claude Code with Gmail MCP access.
 * It outputs a list of interactions to create, then creates them.
 *
 * Does NOT modify emails or Gmail in any way.
 * Creates Interaction records in Bloomerang only.
 *
 * Run: npx tsx scripts/bloomerang/import-gmail-interactions.ts
 */

const API_KEY = "baf5b550-35cc-e1b9-3f81-a4cfd8299ee5";
const API_BASE = "https://api.bloomerang.co/v2";
const HEADERS: Record<string, string> = { "X-API-KEY": API_KEY, "Content-Type": "application/json" };

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

// This script needs to be run manually through Claude Code
// because it requires Gmail MCP access (not a standalone API).
// The process:
// 1. Claude searches Gmail for external emails
// 2. For each email, extracts: from, to, subject, date
// 3. Searches Bloomerang for the external contact by email
// 4. If found, creates an Interaction record on their profile
// 5. If not found, logs the email for manual review

// Interaction format for Bloomerang:
// POST /v2/interaction
// {
//   "AccountId": [constituent ID],
//   "Channel": "Email",
//   "Purpose": "Stewardship",
//   "Subject": "[email subject]",
//   "Note": "Email from [sender] to [recipient] on [date]",
//   "Date": "[YYYY-MM-DD]",
//   "IsInbound": [true if from external, false if from IBTU]
// }

interface EmailInteraction {
  externalEmail: string;
  externalName: string;
  subject: string;
  date: string;
  isInbound: boolean;
  bloomerangId?: number;
}

async function createInteraction(interaction: EmailInteraction): Promise<boolean> {
  if (!interaction.bloomerangId) return false;

  const res = await fetch(`${API_BASE}/interaction`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      AccountId: interaction.bloomerangId,
      Channel: "Email",
      Purpose: "Stewardship",
      Subject: interaction.subject.substring(0, 200),
      Note: `${interaction.isInbound ? "Received from" : "Sent to"} ${interaction.externalName} (${interaction.externalEmail}) on ${interaction.date}`,
      Date: interaction.date,
      IsInbound: interaction.isInbound,
    }),
  });

  const data = await res.json();
  return !!data.Id;
}

async function searchBloomerang(email: string): Promise<number | null> {
  const res = await fetch(`${API_BASE}/constituents?search=${encodeURIComponent(email)}&skip=0&take=1`, {
    headers: HEADERS,
  });
  const data = await res.json();
  if (data.Results?.length > 0) return data.Results[0].Id;
  return null;
}

// Export for use in Claude Code
export { createInteraction, searchBloomerang, EmailInteraction };

// When run standalone, output instructions
console.log(`
Gmail → Bloomerang Interaction Import
═══════════════════════════════════════

This script provides the functions needed to import Gmail interactions.
It should be run through Claude Code which has Gmail MCP access.

Steps:
1. Claude searches Gmail for emails to/from external contacts
2. For each email, calls searchBloomerang() to find the constituent
3. If found, calls createInteraction() to log it

The script uses:
- POST /v2/interaction (singular endpoint - confirmed working)
- GET /v2/constituents?search= (for email matching)

Email domains to process:
- @lausd.net (LAUSD staff)
- @laalliance.org (Alliance staff)
- All other non-@itsbiggerthanusla.org addresses

Email domains to SKIP:
- @itsbiggerthanusla.org (internal)
- @google.com, @gmail.com (system notifications)
- @bloomerang.com (CRM notifications)
- @qgiv.com (payment notifications)
`);
