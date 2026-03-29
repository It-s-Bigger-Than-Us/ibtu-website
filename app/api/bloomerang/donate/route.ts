import { NextResponse } from "next/server";

const API_BASE = "https://api.bloomerang.co/v2";

export async function POST(request: Request) {
  try {
    const key = process.env.BLOOMERANG_API_KEY;
    if (!key) return NextResponse.json({ error: "API key not configured" }, { status: 500 });

    const body = await request.json();
    const { name, email, amount, frequency, program } = body;

    if (!name || !email || !amount) {
      return NextResponse.json({ error: "Name, email, and amount required" }, { status: 400 });
    }

    const [firstName, ...lastParts] = name.split(" ");
    const lastName = lastParts.join(" ") || "Donor";

    // Step 1: Create or find constituent in Bloomerang
    const searchRes = await fetch(
      `${API_BASE}/constituents?search=${encodeURIComponent(email)}&skip=0&take=1`,
      { headers: { "X-API-KEY": key } }
    );
    const searchData = await searchRes.json();

    let constituentId: number;

    if (searchData.Total > 0) {
      constituentId = searchData.Results[0].Id;
    } else {
      // Create new constituent
      const createRes = await fetch(`${API_BASE}/constituents`, {
        method: "POST",
        headers: { "X-API-KEY": key, "Content-Type": "application/json" },
        body: JSON.stringify({
          Type: "Individual",
          FirstName: firstName,
          LastName: lastName,
          PrimaryEmail: { Type: "Home", Value: email, IsPrimary: true },
        }),
      });
      const createData = await createRes.json();
      constituentId = createData.Id;
    }

    // Step 2: Log the donation intent as an interaction
    // (Actual payment processing happens via Qgiv redirect)
    await fetch(`${API_BASE}/interactions`, {
      method: "POST",
      headers: { "X-API-KEY": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        AccountId: constituentId,
        Channel: "Website",
        Purpose: "Donation",
        Subject: `Donation intent: $${amount} ${frequency || "one-time"} for ${program}`,
        Note: `Initiated from ibtu.la/donate/${program}. Amount: $${amount}. Frequency: ${frequency || "one-time"}. Redirected to Qgiv for payment processing.`,
        Date: new Date().toISOString().split("T")[0],
        IsInbound: true,
      }),
    });

    return NextResponse.json({
      success: true,
      message: "Donation logged. Redirecting to secure payment.",
      constituentId,
    });
  } catch (error) {
    console.error("Bloomerang donate error:", error);
    return NextResponse.json({ error: "Failed to process" }, { status: 500 });
  }
}
