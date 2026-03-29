import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Jobs & Careers | IBTU",
  description:
    "Community infrastructure needs Community Builders. Join the IBTU team — paid positions, volunteer pathways, and workforce development.",
};

export default function JobsPage() {
  const openings = [
    {
      title: "Relief Hub Case Manager",
      department: "Crisis Response",
      type: "W2",
      status: "Ongoing",
      description:
        "Manage HIPAA-compliant client intake, needs assessment, and service navigation for fire-impacted community members at the Relief Resource Hub. Coordinate referrals across 15+ partner organizations.",
    },
    {
      title: "School Program Coordinator",
      department: "School Programs",
      type: "W2",
      status: "Ongoing",
      description:
        "Plan and execute Lunchtime Takeovers, Resource Fairs, and Parent Empowerment programming across LAUSD campuses. Manage volunteer teams, partner logistics, and post-event reporting.",
    },
    {
      title: "Outreach & Volunteer Lead",
      department: "Volunteer Operations",
      type: "W2",
      status: "Ongoing",
      description:
        "Recruit, onboard, and manage volunteers across all IBTU programs. Build and maintain the volunteer pipeline from first-time sign-up to Core Crew leadership.",
    },
    {
      title: "Content Creator",
      department: "Communications",
      type: "1099 / Freelance",
      status: "Ongoing",
      description:
        "Capture photo, video, and written content across IBTU events and programs. Create social media assets, event recaps, and impact stories that center community voice.",
    },
  ];

  const pipelineStages = [
    {
      stage: "01",
      title: "VOLUNTEER",
      description:
        "Sign up through Bloomerang. Show up to an event. Get oriented. Every Community Builder starts here — no experience required, just willingness.",
    },
    {
      stage: "02",
      title: "CORE CREW",
      description:
        "After consistent participation, volunteers are invited into the Core Crew — a trusted inner circle that takes on leadership responsibilities at events and programs.",
    },
    {
      stage: "03",
      title: "VOLUNTEER LEAD",
      description:
        "Core Crew members who demonstrate reliability and initiative are elevated to Volunteer Lead roles — managing teams, running check-in, and mentoring new volunteers.",
    },
    {
      stage: "04",
      title: "STAFF",
      description:
        "When paid positions open, Volunteer Leads are the first candidates considered. IBTU promotes from within. The people who build the infrastructure should benefit from it.",
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
            Careers &amp; Opportunities
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
            JOIN THE TEAM
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
            Community infrastructure needs Community Builders. Here&rsquo;s how to join.
          </p>
        </section>

        {/* ── CURRENT OPENINGS ── */}
        <section
          style={{
            padding: "0 80px 120px 80px",
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
            Open Positions
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
            CURRENT OPENINGS
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {openings.map((job, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 40,
                  padding: "40px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  alignItems: "start",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "LOT, Poppins, sans-serif",
                      fontSize: "clamp(28px, 3vw, 40px)",
                      color: "#fff",
                      lineHeight: 1.1,
                      marginBottom: 12,
                    }}
                  >
                    {job.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      marginBottom: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        border: "1px solid rgba(255,199,0,0.3)",
                        fontSize: 11,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#FFC700",
                        fontWeight: 700,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {job.department}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        fontSize: 11,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 600,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {job.type}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 12px",
                        border: "1px solid rgba(255,255,255,0.15)",
                        fontSize: 11,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: 600,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {job.status}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.55)",
                      lineHeight: 1.7,
                      maxWidth: 640,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {job.description}
                  </p>
                </div>
                <a
                  href="mailto:info@itsbiggerthanusla.org"
                  style={{
                    display: "inline-block",
                    background: "#FFC700",
                    color: "#000",
                    padding: "14px 32px",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 12,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    marginTop: 4,
                  }}
                >
                  Apply &rarr;
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── HACLA WORKFORCE DEVELOPMENT ── */}
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
                Workforce Development
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
                HACLA PARTNERSHIP
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.8,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                IBTU partners with the Housing Authority of the City of Los Angeles (HACLA)
                to employ fire-impacted community members as W2 staff at the Relief Resource Hub.
                This isn&rsquo;t just aid — it&rsquo;s employment. The people affected by the crisis
                are the ones leading the recovery.
              </p>
            </div>
            <div
              style={{
                background: "#FFC700",
                padding: "60px 48px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "LOT, Poppins, sans-serif",
                  fontSize: "clamp(60px, 8vw, 100px)",
                  color: "#000",
                  lineHeight: 1,
                  display: "block",
                  marginBottom: 12,
                }}
              >
                9
              </span>
              <span
                style={{
                  fontSize: 13,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.7)",
                  fontWeight: 700,
                  fontFamily: "Poppins, sans-serif",
                  display: "block",
                  marginBottom: 8,
                }}
              >
                W2 Positions Created
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(0,0,0,0.5)",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                in 2025
              </span>
            </div>
          </div>
        </section>

        {/* ── VOLUNTEER TO STAFF PIPELINE ── */}
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
            The Path
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
            VOLUNTEER TO STAFF PIPELINE
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              maxWidth: 600,
              fontFamily: "Poppins, sans-serif",
              marginBottom: 80,
            }}
          >
            IBTU promotes from within. Every staff member started as a volunteer.
            The infrastructure we build should employ the people who build it.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
            }}
          >
            {pipelineStages.map((step, i) => (
              <div
                key={i}
                style={{
                  padding: "40px 32px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: 64,
                    color: "rgba(255,199,0,0.1)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 16,
                  }}
                >
                  {step.stage}
                </span>
                <h3
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: 28,
                    color: "#FFC700",
                    marginBottom: 16,
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.7,
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  {step.description}
                </p>
                {i < pipelineStages.length - 1 && (
                  <span
                    style={{
                      position: "absolute",
                      right: -16,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontFamily: "LOT, Poppins, sans-serif",
                      fontSize: 28,
                      color: "rgba(255,199,0,0.3)",
                    }}
                  >
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA — INTERESTED? ── */}
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
            INTERESTED?
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
            Whether you&rsquo;re looking for a career in community work or want to
            volunteer your first hour — the door is open. Reach out.
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
