/**
 * Bloomerang CRM API client.
 * Docs: https://bloomerang.co/features/integrations/api/rest-api/
 *
 * API Key stored in env: BLOOMERANG_API_KEY
 * This runs SERVER-SIDE ONLY — never exposed to the browser.
 */

const API_BASE = "https://api.bloomerang.co/v2";

function getHeaders() {
  const key = process.env.BLOOMERANG_API_KEY;
  if (!key) throw new Error("BLOOMERANG_API_KEY not set");
  return {
    "X-API-KEY": key,
    "Content-Type": "application/json",
  };
}

export interface BloomerangConstituent {
  Id: number;
  FirstName: string;
  LastName: string;
  FullName: string;
  Status: string;
  Type: string;
  PrimaryEmail?: { Value: string };
  PrimaryPhone?: { Number: string };
  GroupsDetails?: Array<{ Name: string }>;
}

export interface BloomerangTransaction {
  Id: number;
  Amount: number;
  Date: string;
  Method: string;
  Fund?: { Name: string };
  AccountId: number;
}

// ── Constituents ──

export async function getConstituentCount(): Promise<number> {
  const res = await fetch(`${API_BASE}/constituents?skip=0&take=1`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  return data.Total || 0;
}

export async function searchConstituents(query: string, take = 20): Promise<BloomerangConstituent[]> {
  const res = await fetch(
    `${API_BASE}/constituents?search=${encodeURIComponent(query)}&skip=0&take=${take}`,
    { headers: getHeaders() }
  );
  const data = await res.json();
  return data.Results || [];
}

export async function getRecentDonors(take = 10): Promise<BloomerangConstituent[]> {
  const res = await fetch(
    `${API_BASE}/constituents?orderBy=CreatedDate&orderDirection=Desc&skip=0&take=${take}`,
    { headers: getHeaders() }
  );
  const data = await res.json();
  return data.Results || [];
}

// ── Transactions ──

export async function getRecentTransactions(take = 20): Promise<BloomerangTransaction[]> {
  const res = await fetch(
    `${API_BASE}/transactions?orderBy=Date&orderDirection=Desc&skip=0&take=${take}`,
    { headers: getHeaders() }
  );
  const data = await res.json();
  return data.Results || [];
}

export async function getTransactionsByDateRange(
  startDate: string,
  endDate: string,
  take = 100
): Promise<BloomerangTransaction[]> {
  const res = await fetch(
    `${API_BASE}/transactions?minDate=${startDate}&maxDate=${endDate}&skip=0&take=${take}`,
    { headers: getHeaders() }
  );
  const data = await res.json();
  return data.Results || [];
}

// ── Interactions ──

export async function logInteraction(
  constituentId: number,
  channel: string,
  subject: string,
  note: string
) {
  const res = await fetch(`${API_BASE}/interactions`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      AccountId: constituentId,
      Channel: channel, // "Email", "Phone", "InPerson", "Mail", "TextMessage", "SocialMedia"
      Purpose: "Stewardship",
      Subject: subject,
      Note: note,
      Date: new Date().toISOString().split("T")[0],
      IsInbound: false,
    }),
  });
  return res.json();
}

// ── Summary Stats ──

export async function getDashboardStats() {
  const [constituentCount, recentTx] = await Promise.all([
    getConstituentCount(),
    getRecentTransactions(50),
  ]);

  const totalRaised = recentTx.reduce((sum: number, tx: BloomerangTransaction) => sum + (tx.Amount || 0), 0);

  return {
    totalConstituents: constituentCount,
    recentTransactionCount: recentTx.length,
    recentTotalRaised: totalRaised,
  };
}
