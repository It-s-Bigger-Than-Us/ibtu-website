import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Services | IBTU",
  description:
    "Trusted, place-based programs designed with dignity. School programs, community wellness, crisis response, and more — serving 62,475+ students across 34 sites.",
};

export default function ServicesPage() {
  const pillars = [
    {
      title: "SCHOOL PROGRAMS",
      description:
        "Lunchtime Takeovers, Resource Fairs, Parent Empowerment, and Youth Leadership programming embedded directly into K-12 campuses across Los Angeles. 34 school sites and counting.",
    },
    {
      title: "COMMUNITY PROGRAMS",
      description:
        "Coastal Care cleanups, wellness initiatives, food distribution, Giving Season events, and Community Builder Link-Ups — connecting neighbors to neighbors, block by block.",
    },
    {
      title: "CRISIS RESPONSE",
      description:
        "When disaster hits, IBTU activates within 72 hours. The permanent Relief Resource Hub at Baldwin Hills Crenshaw Plaza is the largest community-led recovery center in LA nonprofit history.",
    },
  ];

  const schoolPrograms = [
    {
      title: "Lunchtime Takeovers",
      detail: "High-energy campus activations during lunch — resource tables, music, games, hygiene kits, and direct service sign-ups. The entry point for every school partnership.",
    },
    {
      title: "Resource Fairs",
      detail: "Full-campus events with 15-30 partner organizations providing dental screenings, vision checks, food boxes, legal aid, and more — all in one day.",
    },
    {
      title: "Parent Empowerment Workshops",
      detail: "8-week series building financial literacy, digital skills, wellness habits, and advocacy tools for parents and caregivers.",
    },
    {
      title: "Parent Empowerment Days",
      detail: "Single-day intensive versions of the workshop series — designed for high-impact, low-barrier entry.",
    },
    {
      title: "Young Community Builder Program",
      detail: "8-week youth leadership series training the next generation of community infrastructure builders.",
    },
    {
      title: "Building Community Builders",
      detail: "Workshops and retreats for school staff and emerging leaders on community-centered service delivery.",
    },
    {
      title: "Staff Appreciation & Wellness Days",
      detail: "Dedicated wellness programming for teachers and school staff — because the people who serve also need to be served.",
    },
    {
      title: "Professional Development",
      detail: "Training sessions for educators on trauma-informed community engagement and resource navigation.",
    },
  ];

  const schoolStats = [
    { value: "62,475+", label: "Students Since 2020" },
    { value: "34", label: "School Sites" },
    { value: "$721,660", label: "In Contracts" },
    { value: "4.7–5/5", label: "Satisfaction Rating" },
  ];

  const communityPrograms = [
    {
      title: "Coastal Care",
      detail: "Monthly beach cleanups combined with community wellness — environmental stewardship meets neighbor connection.",
    },
    {
      title: "Wellness Initiatives",
      detail: "Mental health workshops, fitness programming, and holistic wellness events designed for community access.",
    },
    {
      title: "Food Distribution",
      detail: "Regular grocery and meal distributions in partnership with Westside Food Bank and local vendors. 875,500+ lbs distributed.",
    },
    {
      title: "Giving Season",
      detail: "Annual holiday programming delivering toys, meals, and essentials to families across Los Angeles.",
    },
    {
      title: "Community Builder Link-Ups",
      detail: "Quarterly gatherings connecting volunteers, partners, and community members — building the network that activates when it matters most.",
    },
  ];

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* ── HERO ── */}
        <section
          style={{
            padding: "180px 80px 120px 80px",
            minHeight: 520,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
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
            Programs &amp; Services
          </span>
          <h1
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(48px, 8vw, 120px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            WHAT WE DO
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 21px)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 600,
              lineHeight: 1.75,
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Trusted, place-based programs designed with dignity.
          </p>
        </section>

        {/* ── THREE PILLARS ── */}
        <section style={{ padding: "0 80px 120px 80px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {pillars.map((pillar, i) => (
              <div
                key={i}
                style={{
                  background: "#FFC700",
                  padding: "48px 40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 320,
                }}
              >
                <span
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: "clamp(28px, 3vw, 44px)",
                    color: "#000",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 24,
                  }}
                >
                  {pillar.title}
                </span>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(0,0,0,0.75)",
                    lineHeight: 1.7,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SCHOOL PROGRAMS PIPELINE ── */}
        <section
          style={{
            padding: "120px 80px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
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
            School Programs
          </span>
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: 20,
            }}
          >
            THE PIPELINE
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              maxWidth: 640,
              fontFamily: "Poppins, sans-serif",
              marginBottom: 60,
            }}
          >
            IBTU&rsquo;s school programming is a full-service pipeline — from a single lunchtime
            activation to year-round embedded partnership. Every program is designed to meet
            students, families, and staff exactly where they are.
          </p>

          {/* Stats Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 32,
              marginBottom: 80,
              padding: "48px 0",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {schoolStats.map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <span
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: "clamp(32px, 3.5vw, 56px)",
                    color: "#FFC700",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 600,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Program Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
              marginBottom: 60,
            }}
          >
            {schoolPrograms.map((prog, i) => (
              <div
                key={i}
                style={{
                  padding: "32px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: 28,
                    color: "#FFC700",
                    marginBottom: 12,
                    lineHeight: 1.1,
                  }}
                >
                  {prog.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {prog.detail}
                </p>
              </div>
            ))}
          </div>

          {/* CTA + LAUSD Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/get-involved"
              style={{
                display: "inline-block",
                background: "#FFC700",
                color: "#000",
                padding: "18px 48px",
                fontFamily: "Poppins, sans-serif",
                fontSize: 13,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Bring IBTU to Your Campus &rarr;
            </Link>
            <span
              style={{
                display: "inline-block",
                padding: "12px 24px",
                border: "2px solid rgba(255,199,0,0.3)",
                fontFamily: "Poppins, sans-serif",
                fontSize: 12,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#FFC700",
                fontWeight: 700,
              }}
            >
              LAUSD Vendor #1000024018
            </span>
          </div>
        </section>

        {/* ── COMMUNITY PROGRAMS ── */}
        <section
          style={{
            padding: "120px 80px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
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
            Community Programs
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
            BLOCK BY BLOCK
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {communityPrograms.map((prog, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 32px",
                  borderTop: "3px solid #FFC700",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: 28,
                    color: "#fff",
                    marginBottom: 16,
                    lineHeight: 1.1,
                  }}
                >
                  {prog.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {prog.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CRISIS RESPONSE ── */}
        <section
          style={{
            padding: "120px 80px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "center",
            }}
          >
            <div>
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
                Crisis Response
              </span>
              <h2
                style={{
                  fontFamily: "LOT, Poppins, sans-serif",
                  fontSize: "clamp(36px, 4vw, 64px)",
                  lineHeight: 0.95,
                  color: "#fff",
                  marginBottom: 24,
                }}
              >
                FIRE RELIEF &amp; THE HUB
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                  fontFamily: "Poppins, sans-serif",
                  marginBottom: 32,
                }}
              >
                When the 2025 LA fires hit, IBTU activated within 72 hours — deploying volunteers,
                distributing supplies, and stabilizing 5,000+ families across 87+ locations.
                Phase 2 launched the permanent Relief Resource Hub at Baldwin Hills Crenshaw
                Plaza: case management, dental, vision, mental health, food, legal aid, housing
                navigation, and immigration assistance under one roof.
              </p>
              <Link
                href="/fire-relief"
                style={{
                  display: "inline-block",
                  background: "#FFC700",
                  color: "#000",
                  padding: "18px 48px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Full Fire Relief Story &rarr;
              </Link>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
              }}
            >
              {[
                { value: "717", label: "Cases Managed" },
                { value: "2,290", label: "Individuals Served" },
                { value: "$4.5M+", label: "In-Kind Mobilized" },
                { value: "15+", label: "Partner Services" },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    padding: "28px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 20,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "LOT, Poppins, sans-serif",
                      fontSize: "clamp(32px, 3vw, 48px)",
                      color: "#FFC700",
                      lineHeight: 1,
                      minWidth: 140,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.5)",
                      fontWeight: 500,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA — PARTNER WITH US ── */}
        <section style={{ background: "#FFC700", padding: "100px 80px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(40px, 5.5vw, 80px)",
              lineHeight: 0.95,
              color: "#000",
              marginBottom: 24,
            }}
          >
            PARTNER WITH US
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
            Whether you&rsquo;re a school, a city agency, a corporation, or a neighbor — there&rsquo;s
            a way in. Community is the infrastructure. Let&rsquo;s build it together.
          </p>
          <a
            href="mailto:info@itsbiggerthanusla.org"
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
            info@itsbiggerthanusla.org &rarr;
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
