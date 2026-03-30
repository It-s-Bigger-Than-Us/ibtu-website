import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Fire Relief & The Hub | IBTU",
  description:
    "When the fires hit, IBTU was already here. From 72-hour emergency response to the permanent Relief Resource Hub — the full fire relief story.",
};

export default function FireReliefPage() {
  const phases = [
    {
      number: "01",
      label: "PHASE 1",
      title: "RELIEF",
      date: "Jan 7 – Feb 21, 2025",
      tagline: "14 days. 87 locations. 5,000+ families.",
      detail:
        "Within 72 hours of the Palisades and Eaton fires, IBTU activated an emergency distribution network across 87+ locations throughout Los Angeles. 1,800+ volunteers were deployed in the first two weeks. 15,000+ meals served. 5,000+ families stabilized — not with handouts, but with infrastructure built to last.",
      stats: [
        { value: "87+", label: "Locations Activated" },
        { value: "1,800+", label: "Volunteers Deployed" },
        { value: "15,000+", label: "Meals Served" },
        { value: "5,000+", label: "Families Stabilized" },
      ],
    },
    {
      number: "02",
      label: "PHASE 2",
      title: "REBUILD",
      date: "Apr 2025 – Present",
      tagline: "The Hub. Permanent infrastructure.",
      detail:
        "IBTU opened the Relief Resource Hub at Baldwin Hills Crenshaw Plaza — a permanent, community-led recovery center with 15+ partner services under one roof. Case management, dental, vision, mental health, food assistance, legal aid, housing navigation, and immigration support. Not temporary. Not a popup. Built to stay.",
      stats: [
        { value: "324", label: "Active Clients" },
        { value: "15+", label: "Partner Services" },
        { value: "7,581", label: "Assistance Instances" },
        { value: "90+", label: "Zip Codes Served" },
      ],
    },
    {
      number: "03",
      label: "PHASE 3",
      title: "RENEW",
      date: "Fall 2025+",
      tagline: "From emergency response to community center.",
      detail:
        "The Hub is evolving into a permanent all-crisis community center — infrastructure that serves Los Angeles not just during the next disaster, but every single day in between. The model IBTU built in weeks is becoming the blueprint for community-led recovery nationwide.",
      stats: [
        { value: "1", label: "Permanent Hub" },
        { value: "365", label: "Days / Year" },
        { value: "All-Crisis", label: "Model" },
        { value: "National", label: "Blueprint" },
      ],
    },
  ];

  const hubServices = [
    {
      title: "Case Management",
      detail: "HIPAA-compliant intake and ongoing support. 324 active clients.",
    },
    {
      title: "Food & Grocery Distribution",
      detail: "Weekly distributions in partnership with Westside Food Bank.",
    },
    {
      title: "Clothing & Essentials",
      detail: "Donated goods sorted and distributed with dignity.",
    },
    {
      title: "Dental Access",
      detail: "Weekly dental clinic through Liberty Dental partnership.",
    },
    {
      title: "Vision Screenings",
      detail: "On-site screenings with same-day glasses available.",
    },
    {
      title: "Mental Health Support",
      detail: "Licensed providers on-site. No waitlist.",
    },
    {
      title: "Housing Navigation",
      detail: "Dedicated navigators connecting clients to stable housing.",
    },
    {
      title: "Legal Support",
      detail: "FEMA appeals, insurance guidance, and tenant protections.",
    },
    {
      title: "Immigration Assistance",
      detail: "Trusted legal partners supporting undocumented community members.",
    },
  ];

  const impactStats = [
    { value: "717", label: "Cases" },
    { value: "313", label: "Households" },
    { value: "2,290", label: "Individuals" },
    { value: "15,413", label: "Items Distributed" },
    { value: "$4.5M+", label: "In-Kind Mobilized" },
    { value: "23.4", label: "Avg Visits / Client" },
  ];

  return (
    <>
      <TopNav />
      <main style={{ background: "#000", minHeight: "100vh"}}>

        {/* ── VIDEO BLOCK — no text overlay ── */}
        <section style={{ width: "100%", height: "70vh", minHeight: "400px", overflow: "hidden", position: "relative" }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source
              src="https://video.wixstatic.com/video/a11c28_22a0fdd69fb348d4a65cc8b7e81e1f81/720p/mp4/file.mp4"
              type="video/mp4"
            />
          </video>
        </section>

        {/* ── HERO TEXT — solid black, no overlay ── */}
        <section style={{ background: "#000", padding: "clamp(60px, 8vw, 120px) clamp(32px, 5vw, 80px)" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#FFC700",
              marginBottom: 24,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
            }}
          >
            Crisis &amp; Disaster Stabilization
          </span>
          <h1
            style={{
              fontFamily: "'LOT', 'Bebas Neue', sans-serif",
              fontSize: "clamp(48px, 10vw, 160px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 32,
              maxWidth: 1000,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            WHEN THE FIRES HIT,
            <br />
            IBTU WAS ALREADY HERE.
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 21px)",
              color: "#fff",
              maxWidth: 620,
              lineHeight: 1.75,
              fontFamily: "Poppins, sans-serif",
              fontWeight: 500,
            }}
          >
            72 hours to activate. 87 locations across Los Angeles. A permanent Relief Resource
            Hub that&rsquo;s still open today. This isn&rsquo;t charity — it&rsquo;s infrastructure.
          </p>
        </section>

        {/* ── THREE PHASES — EDITORIAL TIMELINE ── */}
        {phases.map((phase, i) => (
          <section
            key={i}
            style={{
              padding: "120px 80px",
              borderTop: i === 0 ? "none" : "1px solid rgba(255,199,0,0.15)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "260px 1fr",
                gap: 60,
                alignItems: "start",
              }}
            >
              {/* Left — Phase Number & Title */}
              <div>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(80px, 10vw, 140px)",
                    color: "rgba(255,199,0,0.12)",
                    lineHeight: 0.85,
                    display: "block",
                  }}
                >
                  {phase.number}
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "3px",
                    color: "#FFC700",
                    display: "block",
                    marginTop: 16,
                  }}
                >
                  {phase.label}
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(32px, 4vw, 56px)",
                    color: "#fff",
                    lineHeight: 1,
                    display: "block",
                    marginTop: 8,
                  }}
                >
                  {phase.title}
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: 13,
                    color: "rgba(255,199,0,0.5)",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    marginTop: 12,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {phase.date}
                </span>
              </div>

              {/* Right — Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(24px, 3vw, 40px)",
                    color: "#FFC700",
                    lineHeight: 1.1,
                    marginBottom: 24,
                  }}
                >
                  {phase.tagline}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "#fff",
                    lineHeight: 1.8,
                    maxWidth: 640,
                    fontFamily: "Poppins, sans-serif",
                    marginBottom: 48,
                  }}
                >
                  {phase.detail}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 32,
                  }}
                >
                  {phase.stats.map((stat, j) => (
                    <div key={j}>
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "clamp(28px, 3vw, 48px)",
                          color: "#FFC700",
                          lineHeight: 1,
                          display: "block",
                          marginBottom: 6,
                        }}
                      >
                        {stat.value}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--gold)",
                          fontWeight: 600,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* ── FULL-FRAME VIDEO SECTION ── */}
        <section
          style={{
            position: "relative",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source
              src="https://video.wixstatic.com/video/a11c28_22a0fdd69fb348d4a65cc8b7e81e1f81/720p/mp4/file.mp4"
              type="video/mp4"
            />
          </video>
          {/* Gradient overlay removed — no text over video */}
        </section>

        {/* ── HUB SERVICES — HOW TO GET ASSISTANCE ── */}
        <section style={{ padding: "120px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#FFC700",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            The Relief Resource Hub
          </span>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            HOW TO GET ASSISTANCE
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#fff",
              lineHeight: 1.7,
              maxWidth: 600,
              fontFamily: "Poppins, sans-serif",
              marginBottom: 60,
            }}
          >
            The Hub is open and serving fire-impacted community members at no cost.
            Walk in or call to schedule an appointment.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginBottom: 80,
            }}
          >
            {hubServices.map((service, i) => (
              <div
                key={i}
                style={{
                  padding: "32px",
                  border: "1px solid var(--gold)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 28,
                    color: "#FFC700",
                    marginBottom: 12,
                    lineHeight: 1.1,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#fff",
                    lineHeight: 1.7,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {service.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Address & Links */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              padding: "48px 0",
              borderTop: "1px solid var(--gold)",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#FFC700",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                Location
              </span>
              <p
                style={{
                  fontSize: 18,
                  color: "#fff",
                  lineHeight: 1.6,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Baldwin Hills Crenshaw Plaza
                <br />
                Suite 224-226
                <br />
                3650 W. Martin Luther King Jr. Blvd
                <br />
                Los Angeles, CA 90008
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <span
                style={{
                  display: "block",
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#FFC700",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  marginBottom: 0,
                }}
              >
                Get Involved
              </span>
              <a
                href="https://volunteer.bloomerang.co/JE/7haetjfrq5g190"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "#FFC700",
                  color: "#000",
                  padding: "16px 40px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  width: "fit-content",
                }}
              >
                Volunteer at the Hub &rarr;
              </a>
              <a
                href="https://secure.qgiv.com/for/firerelief"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#FFC700",
                  padding: "16px 40px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  border: "2px solid #FFC700",
                  width: "fit-content",
                }}
              >
                Donate &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ── IMPACT STATS — GOLD BAR ── */}
        <section style={{ background: "#FFC700", padding: "80px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 40,
            }}
          >
            Fire Relief — By the Numbers
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: 32,
            }}
          >
            {impactStats.map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(32px, 3.5vw, 56px)",
                    color: "#000",
                    lineHeight: 1,
                    display: "block",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.6)",
                    fontWeight: 600,
                    marginTop: 8,
                    display: "block",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA — SUPPORT THE HUB ── */}
        <section style={{ background: "#FFC700", padding: "100px 80px", textAlign: "center" }}>
          <div
            style={{
              borderTop: "2px solid rgba(0,0,0,0.1)",
              paddingTop: 80,
            }}
          >
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(40px, 5.5vw, 80px)",
                lineHeight: 0.95,
                color: "#000",
                marginBottom: 24,
              }}
            >
              SUPPORT THE HUB
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#000",
                maxWidth: 560,
                margin: "0 auto 48px",
                lineHeight: 1.7,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              The Hub is open. The work continues. Every dollar and every hour
              extends the reach of community-built infrastructure.
            </p>
            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href="https://secure.qgiv.com/for/firerelief"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "#000",
                  color: "#FFC700",
                  padding: "18px 48px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Donate &rarr;
              </a>
              <a
                href="https://volunteer.bloomerang.co/JE/7haetjfrq5g190"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#000",
                  padding: "18px 48px",
                  fontFamily: "Poppins, sans-serif",
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
        </section>
      </main>
      <Footer />
    </>
  );
}
