import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import { getAllEvents, getUpcomingEvents, getPrograms } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events | IBTU — It's Bigger Than Us",
  description:
    "54 events across 7 programs — from annual festivals and monthly beach clean-ups to ongoing fire relief and weekly food distributions.",
};

const STATUS_COLORS: Record<string, string> = {
  Upcoming: "var(--gold)",
  Active: "var(--gold)",
  Closed: "var(--gold)",
};

export default async function EventsPage() {
  const [events, upcoming, programs] = await Promise.all([
    getAllEvents(),
    getUpcomingEvents(),
    getPrograms(),
  ]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allByProgram = programs.map((p: any) => ({
    program: p,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    events: events.filter((e: any) => e.programSlug === p.slug),
  }));

  return (
    <>

      <main style={{ background: "#000", minHeight: "100vh"}}>

        {/* Header */}
        <div style={{ padding: "140px 80px 80px 80px", borderBottom: "1px solid #FFC700" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 20,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
            }}
          >
            54 Events · 7 Programs · Los Angeles
          </span>
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(60px, 9vw, 140px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            EVENTS
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "#fff", maxWidth: 640, lineHeight: 1.75 }}>
            Every year, every month, every week — IBTU shows up.
          </p>
        </div>

        {/* Upcoming & Active */}
        {upcoming.length > 0 && (
          <div style={{ padding: "80px 80px 60px 80px" }}>
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(36px, 5vw, 72px)",
                lineHeight: 0.95,
                color: "var(--gold)",
                marginBottom: 40,
              }}
            >
              HAPPENING NOW & UPCOMING
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {upcoming.map((ev: any, i: number) => {
                const prog = programs.find((p: any) => p.slug === ev.programSlug);
                return (
                  <Link
                    key={i}
                    href={`/our-programs/${ev.programSlug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        background: "#000",
                        border: "1px solid #FFC700",
                        padding: "28px 32px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 24,
                        transition: "border-color 0.2s",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            display: "inline-block",
                            background: ev.status === "Active" ? "var(--gold)" : "var(--gold)",
                            color: "#000",
                            fontSize: 10,
                            letterSpacing: "2px",
                            fontWeight: 700,
                            padding: "3px 10px",
                            marginBottom: 10,
                            fontFamily: "Poppins, sans-serif",
                            textTransform: "uppercase",
                          }}
                        >
                          {ev.status}
                        </span>
                        <div
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "clamp(18px, 2vw, 28px)",
                            color: "#fff",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            marginBottom: 8,
                          }}
                        >
                          {ev.title}

                        </div>
                        <div style={{ fontSize: 13, color: "var(--gold)" }}>
                          {prog?.title} · {ev.location}
                          {ev.proofStats && <> · {ev.proofStats}</>}
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          fontSize: 13,
                          color: "var(--gold)",
                          fontWeight: 600,
                        }}
                      >
                        {ev.dateStart}
                        {ev.dateEnd && <> – {ev.dateEnd}</>}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* All events by program */}
        <div style={{ padding: "40px 80px 80px 80px" }}>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: 60,
            }}
          >
            ALL EVENTS BY PROGRAM
          </h2>

          {allByProgram.map(({ program: prog, events: progEvents }: any) => (
            <div key={prog.slug} style={{ marginBottom: 60 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  borderBottom: "1px solid #FFC700",
                  paddingBottom: 16,
                  marginBottom: 16,
                }}
              >
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(24px, 3vw, 40px)",
                    color: "var(--gold)",
                    fontWeight: 700,
                  }}
                >
                  {prog.title.toUpperCase()}
                </h3>
                <Link
                  href={`/our-programs/${prog.slug}`}
                  style={{
                    fontSize: 11,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    textDecoration: "none",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  View Program →
                </Link>
              </div>

              {progEvents.map((ev: any, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 24,
                    padding: "16px 0",
                    borderBottom: "1px solid var(--gold)",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 6,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: STATUS_COLORS[ev.status] || "#fff",
                          fontWeight: 700,
                        }}
                      >
                        {ev.status}
                      </span>
                      <span
                        style={{
                          fontSize: 15,
                          color: ev.status === "Closed" ? "var(--gold)" : "#fff",
                          fontWeight: 600,
                        }}
                      >
                        {ev.title}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--gold)" }}>
                      {ev.location}
                      {ev.proofStats && <> · {ev.proofStats}</>}
                    </div>
                  </div>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      fontSize: 13,
                      color: "var(--gold)",
                    }}
                  >
                    {ev.dateStart}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
