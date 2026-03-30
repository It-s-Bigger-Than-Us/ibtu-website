import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import { getPrograms } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Programs | IBTU — It's Bigger Than Us",
  description:
    "7 community programs across Crisis & Disaster Stabilization, School & Youth Stability, and Community Health & Resource Access. Built for Los Angeles.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();
  return (
    <>
      <TopNav />
      <main style={{ background: "#000", minHeight: "100vh"}}>
        {/* Header */}
        <div
          style={{
            padding: "140px 80px 80px 80px",
            borderBottom: "1px solid rgba(255,199,0,0.2)",
          }}
        >
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
            Community Infrastructure · Los Angeles
          </span>
          <h1
            style={{
              fontFamily: "'LOT', 'Bebas Neue', sans-serif",
              fontSize: "clamp(60px, 12vw, 180px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            OUR
            <br />
            PROGRAMS
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 20px)",
              color: "#fff",
              maxWidth: 640,
              lineHeight: 1.75,
            }}
          >
            Seven programs. Three pillars. One operating model: we listen, we
            build, and we stay.
          </p>
        </div>

        {/* Program Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: 2,
            padding: 2,
          }}
        >
          {programs.map((prog: any) => (
            <Link
              key={prog.slug}
              href={`/our-programs/${prog.slug}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "var(--gold)",
                  padding: "52px 48px",
                  minHeight: 340,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                {/* Schedule badge */}
                <span
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    fontSize: 10,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    background: "#000",
                    color: "var(--gold)",
                    padding: "5px 12px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {prog.scheduleType}
                </span>

                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    color: "#000",
                    marginBottom: 14,
                    fontWeight: 700,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {prog.pillar}
                </span>
                <h2
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(32px, 3.5vw, 52px)",
                    lineHeight: 0.95,
                    color: "#000",
                    marginBottom: 16,
                  }}
                >
                  {prog.title.toUpperCase()}
                </h2>
                <p
                  style={{
                    fontSize: 15,
                    color: "#000",
                    lineHeight: 1.65,
                    maxWidth: 440,
                  }}
                >
                  {prog.tagline}
                </p>
                <div
                  style={{
                    marginTop: 28,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>
                    {prog.cardStat}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      fontFamily: "Poppins, sans-serif",
                      color: "#000",
                      fontWeight: 700,
                      borderBottom: "2px solid #000",
                      paddingBottom: 3,
                    }}
                  >
                    Learn more →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
