import { NextResponse } from "next/server";
import { getDashboardStats } from "@/lib/bloomerang";

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json(stats);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch Bloomerang stats" },
      { status: 500 }
    );
  }
}
