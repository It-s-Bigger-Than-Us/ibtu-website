import { NextResponse } from "next/server";
import { getRecentDonors } from "@/lib/bloomerang";

export async function GET() {
  try {
    const donors = await getRecentDonors(20);
    // Strip PII — only return names and groups for the dashboard
    const safe = donors.map((d) => ({
      id: d.Id,
      name: d.FullName,
      status: d.Status,
      groups: d.GroupsDetails?.map((g) => g.Name) || [],
    }));
    return NextResponse.json({ donors: safe, total: donors.length });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}
