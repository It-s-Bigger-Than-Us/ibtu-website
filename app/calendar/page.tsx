import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getUpcomingEvents, getAllEvents } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Event Calendar | IBTU — It's Bigger Than Us",
  description:
    "See what's happening at IBTU — upcoming events, volunteer opportunities, and community activations across Los Angeles.",
};

const PILLAR_COLORS: Record<string, string> = {
  "Crisis & Disaster Stabilization": "#fff",
  "School & Youth Stability": "var(--gold)",
  "Community Health & Resource Access": "var(--gold)",
};

export default async function CalendarPage() {
  const [upcoming, allEvents] = await Promise.all([
    getUpcomingEvents(),
    getAllEvents(),
  ]);

  // Group upcoming by month
  const months: Record<string, any[]> = {};
  for (const ev of upcoming) {
    const monthKey = ev.dateStart?.split(",")[0]?.split(" ").slice(0, 2).join(" ") || ev.dateStart || "TBD";
    if (!months[monthKey]) months[monthKey] = [];
    months[monthKey].push(ev);
  }

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* Hero */}
        <div style={{ padding: "140px 80px 80px 80px", borderBottom: "1px solid rgba(255,199,0,0.2)" }}>
          <span style={{ display: "block", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20, fontFamily: "LOT, Poppins, sans-serif", fontWeight: 700 }}>
            Community Calendar · Los Angeles
          </span>
          <h1 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(60px, 9vw, 140px)", lineHeight: 0.9, color: "#fff", marginBottom: 32 }}>
            WHAT&apos;S
            <br />
            HAPPENING
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.75 }}>
            Every week, every month — IBTU shows up. Find upcoming events, volunteer
            opportunities, and ways to get involved.
          </p>
        </div>

        {/* Upcoming Events — Large Cards */}
        {upcoming.length > 0 && (
          <div style={{ padding: "80px 80px 40px 80px" }}>
            <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.95, color: "var(--gold)", marginBottom: 48 }}>
              UPCOMING & ACTIVE
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 2 }}>
              {upcoming.map((ev: any, i: number) => (
                <Link
                  key={i}
                  href={ev.programSlug ? `/our-programs/${ev.programSlug}` : "/events"}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: ev.status === "Active" ? "#111" : "#0a0a0a",
                      border: `1px solid ${ev.status === "Active" ? "rgba(34,197,94,0.4)" : "rgba(255,199,0,0.2)"}`,
                      padding: "36px 32px",
                      minHeight: 200,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                        <span style={{ display: "inline-block", background: ev.status === "Active" ? "#22c55e" : "var(--gold)", color: "#000", fontSize: 10, letterSpacing: "2px", fontWeight: 700, padding: "4px 10px", fontFamily: "LOT, Poppins, sans-serif", textTransform: "uppercase" }}>
                          {ev.status}
                        </span>
                        {ev.programTitle && (
                          <span style={{ display: "inline-block", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "2px", fontWeight: 700, padding: "4px 10px", fontFamily: "LOT, Poppins, sans-serif", textTransform: "uppercase" }}>
                            {ev.programTitle}
                          </span>
                        )}
                      </div>
                      <div style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(22px, 2.5vw, 34px)", color: "#fff", fontWeight: 700, lineHeight: 1.05, marginBottom: 12 }}>
                        {ev.title}
                      </div>
                      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                        {ev.location && <>{ev.location}<br /></>}
                        {ev.proofStats && <span style={{ color: "rgba(255,255,255,0.4)" }}>{ev.proofStats}</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24 }}>
                      <span style={{ fontSize: 15, color: "var(--gold)", fontWeight: 600 }}>
                        {ev.dateStart}{ev.dateEnd && ` – ${ev.dateEnd}`}
                      </span>
                      <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontFamily: "LOT, Poppins, sans-serif", fontWeight: 700 }}>
                        Get Involved →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Events Timeline */}
        <div style={{ padding: "60px 80px 80px 80px" }}>
          <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.95, color: "#fff", marginBottom: 40 }}>
            ALL EVENTS
          </h2>

          {/* Year groups */}
          {[2026, 2025, 2024, 2023, 2022].map((year) => {
            const yearEvents = allEvents.filter((e: any) => e.year === year);
            if (yearEvents.length === 0) return null;
            return (
              <div key={year} style={{ marginBottom: 48 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: 32, color: "var(--gold)" }}>
                    {year}
                  </span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                    {yearEvents.length} events
                  </span>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,199,0,0.15)" }} />
                </div>
                {yearEvents.map((ev: any, i: number) => (
                  <Link
                    key={i}
                    href={ev.programSlug ? `/our-programs/${ev.programSlug}` : "/events"}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "14px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        gap: 16,
                        transition: "background 0.15s",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background:
                              ev.status === "Active" ? "#22c55e" :
                              ev.status === "Upcoming" ? "var(--gold)" :
                              "rgba(255,255,255,0.2)",
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 15, color: ev.status === "Closed" ? "rgba(255,255,255,0.5)" : "#fff", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {ev.title}
                        </span>
                        {ev.programTitle && (
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                            {ev.programTitle}
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
                        {ev.dateStart}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ background: "var(--gold)", padding: "60px 80px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.95, color: "#000", marginBottom: 12 }}>
              WANT TO BE PART OF THIS?
            </h2>
            <p style={{ fontSize: 16, color: "#000" }}>
              Volunteer, sponsor, or just show up. Every person counts.
            </p>
          </div>
          <Link href="/get-involved" style={{ display: "inline-block", background: "#000", color: "var(--gold)", padding: "18px 48px", fontFamily: "LOT, Poppins, sans-serif", fontSize: 13, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, textDecoration: "none" }}>
            Get Involved →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
