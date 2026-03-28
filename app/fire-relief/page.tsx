import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getProgramBySlug } from "@/lib/data/programs";
import { getEventsByProgram } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Fire Relief & The Hub | IBTU",
  description:
    "When the fires hit, IBTU was already here. From 72-hour emergency response to the permanent Relief Resource Hub — the full fire relief story.",
};

export default function FireReliefPage() {
  const program = getProgramBySlug("fire-relief");
  const fireEvents = getEventsByProgram("fire-relief");

  const phases = [
    {
      label: "PHASE 1",
      title: "RELIEF",
      date: "Jan 7 – Feb 21, 2025",
      detail:
        "14-day sprint. 87+ locations activated within 72 hours. 1,800+ volunteers deployed. 15,000+ meals served. 5,000+ families stabilized across Los Angeles.",
    },
    {
      label: "PHASE 2",
      title: "REBUILD",
      date: "Apr 2025 – Present",
      detail:
        "The permanent Relief Resource Hub launched at Baldwin Hills Crenshaw Plaza. 15+ partner services under one roof. Weekly dental, vision, mental health, food assistance, legal aid, and more.",
    },
    {
      label: "PHASE 3",
      title: "RENEW",
      date: "Fall 2025+",
      detail:
        "Converting the Hub into an all-crisis community center — permanent infrastructure for the next disaster, and every day in between.",
    },
  ];

  const hubStats = [
    { value: "7,581", label: "Assistance Instances" },
    { value: "324", label: "Active Clients" },
    { value: "23.4", label: "Avg Visits / Client" },
    { value: "90+", label: "Zip Codes Served" },
    { value: "15+", label: "Partner Services" },
  ];

  const keyStats = [
    { value: "5,000+", label: "Families Stabilized" },
    { value: "1,800+", label: "Volunteers Deployed" },
    { value: "15,000+", label: "Meals Served" },
    { value: "$1.75M+", label: "Distributed" },
    { value: "350", label: "Immigrant Families Served" },
  ];

  const demographics = [
    { value: "20.4%", label: "Children" },
    { value: "63.6%", label: "Working-Age Adults" },
    { value: "16.0%", label: "Seniors" },
    { value: "21%", label: "Uninsured" },
    { value: "17.9%", label: "Homeless / At-Risk" },
    { value: "~61%", label: "Food Assistance" },
  ];

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* Hero */}
        <div
          style={{
            position: "relative",
            padding: "140px 80px 100px 80px",
            minHeight: 520,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          {program?.heroImage && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${program.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.35,
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.95) 100%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <span
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 20,
                fontFamily: "LOT, Poppins, sans-serif",
                fontWeight: 700,
              }}
            >
              Crisis &amp; Disaster Stabilization
            </span>
            <h1
              style={{
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: "clamp(44px, 7vw, 110px)",
                lineHeight: 0.9,
                color: "#fff",
                marginBottom: 32,
              }}
            >
              WHEN THE FIRES HIT,
              <br />
              IBTU WAS ALREADY HERE
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 1.5vw, 22px)",
                color: "rgba(255,255,255,0.7)",
                maxWidth: 640,
                lineHeight: 1.75,
              }}
            >
              From 72-hour emergency response to the permanent Relief Resource
              Hub — the largest community-led disaster operation in Los Angeles
              nonprofit history.
            </p>
          </div>
        </div>

        {/* Three Phases Timeline */}
        <div style={{ padding: "100px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "LOT, Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Three Phases
          </span>
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: 60,
            }}
          >
            RELIEF → REBUILD → RENEW
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {phases.map((phase, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: 40,
                  padding: "40px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "LOT, Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: "3px",
                      color: "var(--gold)",
                    }}
                  >
                    {phase.label}
                  </span>
                  <br />
                  <span
                    style={{
                      fontFamily: "LOT, Poppins, sans-serif",
                      fontSize: "clamp(28px, 3vw, 44px)",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    {phase.title}
                  </span>
                </div>
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: 12,
                      color: "rgba(255,199,0,0.6)",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      marginBottom: 10,
                    }}
                  >
                    {phase.date}
                  </span>
                  <p
                    style={{
                      fontSize: 15,
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.7,
                    }}
                  >
                    {phase.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hub Stats */}
        <div style={{ background: "var(--gold)", padding: "80px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontFamily: "LOT, Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            The Hub — By the Numbers
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 40,
              marginTop: 40,
            }}
          >
            {hubStats.map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: "clamp(36px, 4vw, 64px)",
                    color: "#000",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.6)",
                    fontWeight: 600,
                    marginTop: 8,
                    display: "block",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Stats */}
        <div style={{ padding: "100px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "LOT, Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Full Response Impact
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 40,
              marginTop: 40,
            }}
          >
            {keyStats.map((stat, i) => (
              <div key={i}>
                <span
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: "clamp(32px, 4vw, 56px)",
                    color: "var(--gold)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hub Demographics */}
        <div
          style={{
            padding: "80px 80px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "LOT, Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Who the Hub Serves
          </span>
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(28px, 3.5vw, 52px)",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: 48,
            }}
          >
            HUB CLIENT DEMOGRAPHICS
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 40,
            }}
          >
            {demographics.map((d, i) => (
              <div
                key={i}
                style={{
                  padding: "32px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: "clamp(36px, 4vw, 60px)",
                    color: "var(--gold)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {d.value}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: 500,
                  }}
                >
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "var(--gold)", padding: "80px 80px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "#000",
              marginBottom: 24,
            }}
          >
            THE HUB IS OPEN. THE WORK CONTINUES.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#000",
              maxWidth: 580,
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Support the Relief Resource Hub or sign up to volunteer — every
            action extends the reach of community-built infrastructure.
          </p>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/get-involved"
              style={{
                display: "inline-block",
                background: "#000",
                color: "var(--gold)",
                padding: "18px 48px",
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: 13,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Support the Hub &rarr;
            </Link>
            <a
              href="https://volunteer.bloomerang.co/JE/7haetjfrq5g190"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "transparent",
                color: "#000",
                padding: "18px 48px",
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: 13,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
                border: "2px solid #000",
              }}
            >
              Volunteer &rarr;
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
