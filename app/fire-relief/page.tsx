import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/Footer";
import { PROGRAM_VIDEOS } from "@/lib/data/video-urls";

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
        "IBTU opened the Relief Resource Hub at Baldwin Hills Crenshaw Plaza — a permanent, community-led recovery center with 15+ partner services under one roof. Case management, dental, vision, mental health, food assistance, legal aid, and housing navigation. Not temporary. Not a popup. Built to stay.",
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
      title: "Comprehensive Intake",
      detail:
        "When someone arrives, we sit down and hear their whole story. Housing, health, employment, family needs — we assess everything so we can respond to the full picture, not just the surface.",
    },
    {
      title: "Material Aid Distribution",
      detail:
        "Groceries, clothing, hygiene kits, household goods, baby essentials, pet supplies. We give people choice and dignity in selecting what they actually need — not a pre-packed box.",
    },
    {
      title: "FEMA & Insurance Navigation",
      detail:
        "Insurance battles are ongoing and many survivors are severely underinsured. We help navigate applications, gather documentation, and connect people to case managers.",
    },
    {
      title: "Mental Health Support",
      detail:
        "Parents watching their children have nightmares. Adults experiencing night terrors and severe anxiety. We connect every person who needs it to mental health services and ongoing counseling.",
    },
    {
      title: "Employment Navigation",
      detail:
        "Housekeepers whose client homes burned. Hairdressers who lost their tools. Daycare providers whose facilities are gone. We help people navigate a financial collapse that didn’t make the news.",
    },
    {
      title: "Long-Term Follow-Up",
      detail:
        "We are not a one-time stop. We remember names, children, and situations. We follow up. We are a consistent presence throughout the entire recovery journey.",
    },
  ];

  const principles = [
    {
      title: "Dignity First",
      detail:
        "We verify impact through proper documentation, but we never make people feel interrogated or judged. Every person who walks through our doors is in one of the most vulnerable moments of their life. We treat them accordingly.",
    },
    {
      title: "Relationship-Based",
      detail:
        "This is not transactional. We remember names, we remember kids, we remember what someone was going through last time. People come back because they trust us. That trust is the foundation of everything we do.",
    },
    {
      title: "Community Rooted",
      detail:
        "This fire relief work extends our existing mission of supporting Los Angeles communities. We were here before the fires. We will be here long after the headlines fade. We do not show up for a moment and leave — we stay.",
    },
  ];

  const verificationFaqs = [
    {
      q: "Why Do You Verify Fire Impact?",
      a: "We verify because we want limited resources to reach the people who need them most. This is not about distrust — it’s about accountability to our funders and to our community. We work hard to make verification easy, private, and dignified.",
    },
    {
      q: "What if I’m a renter?",
      a: "Bring your lease or rental agreement showing your affected address. Your personal ID can have a different address. We’ll confirm the address is in the fire zone and that you were displaced.",
    },
    {
      q: "What if I lost everything, including my ID?",
      a: "We work with what you have. We accept passports, temporary IDs, and foreign-issued IDs. Combined with FEMA paperwork, insurance documents, utility bills, or bank statements showing your affected address, we will do our best to verify your situation.",
    },
    {
      q: "What about smoke damage in neighboring areas?",
      a: "If you were forced to leave your home due to smoke damage and cannot return, you may qualify. We’ll need proof that you are still displaced — such as an uninhabitable notice, hotel receipts, or a temporary housing lease. Being near the fire zone without displacement does not qualify.",
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

      <main style={{ background: "#FFC700", minHeight: "100vh"}}>

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
              src="/videos/fire-day3-highlight.mp4"
              type="video/mp4"
            />
            <source
              src={PROGRAM_VIDEOS['fire-relief'].highlight}
              type="video/mp4"
            />
          </video>
        </section>

        {/* ── HERO TEXT — gold bg ── */}
        <section style={{ background: "#FFC700", padding: "clamp(60px, 8vw, 120px) clamp(32px, 5vw, 80px)" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              marginBottom: 24,
              fontFamily: "var(--font-body)",
              fontWeight: 700,
            }}
          >
            Crisis &amp; Disaster Stabilization
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 10vw, 160px)",
              lineHeight: 0.9,
              color: "#000",
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
              color: "#000",
              maxWidth: 620,
              lineHeight: 1.75,
              fontFamily: "var(--font-body)",
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
              padding: "clamp(60px, 10vw, 120px) clamp(24px, 5vw, 80px)",
              borderTop: i === 0 ? "none" : "1px solid #000",
            }}
          >
            <div
              className="fr-phase-grid"
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
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(80px, 10vw, 140px)",
                    color: "#000",
                    lineHeight: 0.85,
                    display: "block",
                  }}
                >
                  {phase.number}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "3px",
                    color: "#000",
                    display: "block",
                    marginTop: 16,
                  }}
                >
                  {phase.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 4vw, 56px)",
                    color: "#000",
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
                    color: "#000",
                    fontWeight: 600,
                    letterSpacing: "1px",
                    marginTop: 12,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {phase.date}
                </span>
              </div>

              {/* Right — Content */}
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3vw, 40px)",
                    color: "#000",
                    lineHeight: 1.1,
                    marginBottom: 24,
                  }}
                >
                  {phase.tagline}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "#000",
                    lineHeight: 1.8,
                    maxWidth: 640,
                    fontFamily: "var(--font-body)",
                    marginBottom: 48,
                  }}
                >
                  {phase.detail}
                </p>
                <div
                  className="fr-services-grid"
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
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(28px, 3vw, 48px)",
                          color: "#000",
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
                          color: "#000",
                          fontWeight: 600,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                          fontFamily: "var(--font-body)",
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

        {/* ── THE HUB — LAUNCH VIDEO ── */}
        <section
          style={{
            background: "#FFC700",
            padding: "clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px) 0",
            textAlign: "center",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            The Relief Resource Hub
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(72px, 14vw, 220px)",
              lineHeight: 0.85,
              color: "#000",
              marginBottom: 0,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            THE HUB
          </h2>
        </section>
        <section
          style={{
            background: "#FFC700",
            padding: "clamp(40px, 6vw, 80px) clamp(24px, 5vw, 80px) clamp(60px, 8vw, 100px)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: 1280,
              margin: "0 auto",
              aspectRatio: "16 / 9",
              overflow: "hidden",
              border: "1px solid #000",
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src={PROGRAM_VIDEOS['fire-relief'].hubLaunch} type="video/mp4" />
            </video>
          </div>
        </section>

        {/* ── HUB SERVICES — WHAT WE DO HERE ── */}
        <section style={{ padding: "120px 80px", borderTop: "1px solid #000" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Inside The Hub
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.9,
              color: "#000",
              marginBottom: 20,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            WHAT WE DO HERE
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#000",
              lineHeight: 1.7,
              maxWidth: 720,
              fontFamily: "var(--font-body)",
              marginBottom: 60,
            }}
          >
            We take a holistic approach because a family’s needs do not exist in
            isolation. A household that lost its home also lost its income, its
            kids’ school routine, its sense of safety, and sometimes its will to
            ask for help. We address all of it.
          </p>

          <div
            className="fr-services-grid"
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
                  border: "1px solid #000",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    color: "#000",
                    marginBottom: 12,
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#000",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {service.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Address & Links */}
          <div
            className="fr-timeline-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              padding: "48px 0",
              borderTop: "1px solid #000",
            }}
          >
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "#000",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  marginBottom: 16,
                }}
              >
                Visit The Hub
              </span>
              <p
                style={{
                  fontSize: 18,
                  color: "#000",
                  lineHeight: 1.6,
                  fontFamily: "var(--font-body)",
                }}
              >
                The IBTU Relief Resource Hub
                <br />
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
                  color: "#000",
                  fontFamily: "var(--font-body)",
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
                  background: "#000",
                  color: "#FFC700",
                  padding: "16px 40px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "16px",
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
                  color: "#000",
                  padding: "16px 40px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "16px",
                  border: "2px solid #000",
                  width: "fit-content",
                }}
              >
                Donate &rarr;
              </a>
              <a
                href="https://calendar.app.google/TgJk68WX7w1joC3p8"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#000",
                  padding: "16px 40px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "16px",
                  border: "2px solid #000",
                  width: "fit-content",
                }}
              >
                Book an Appointment &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* ── WHAT MAKES IBTU DIFFERENT ── */}
        <section style={{ padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)", borderTop: "1px solid #000" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Our Approach
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.9,
              color: "#000",
              marginBottom: 60,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            WHAT MAKES IBTU DIFFERENT
          </h2>
          <div
            className="fr-services-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {principles.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: 32,
                  border: "1px solid #000",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 28,
                    color: "#000",
                    marginBottom: 12,
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#000",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {p.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── VERIFICATION FAQ ── */}
        <section style={{ padding: "clamp(80px, 10vw, 120px) clamp(24px, 5vw, 80px)", borderTop: "1px solid #000" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Verification &amp; Eligibility
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.9,
              color: "#000",
              marginBottom: 24,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
            }}
          >
            NOT SURE IF YOU QUALIFY?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#000",
              lineHeight: 1.7,
              maxWidth: 720,
              fontFamily: "var(--font-body)",
              marginBottom: 48,
            }}
          >
            We verify addresses using Google Maps and publicly available fire zone
            and evacuation maps. No documentation looks suspicious to us — people
            lose everything in disasters. If you have questions, any IBTU team
            member can walk you through it.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 32,
              maxWidth: 880,
              marginBottom: 64,
            }}
          >
            {verificationFaqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderTop: "1px solid #000",
                  paddingTop: 24,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 22,
                    color: "#000",
                    marginBottom: 12,
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "#000",
                    lineHeight: 1.7,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          {/* Three-question walkthrough */}
          <div
            style={{
              border: "1px solid #000",
              padding: "32px",
              maxWidth: 880,
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#000",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                marginBottom: 20,
              }}
            >
              Three-Question Walkthrough
            </span>
            <ol
              style={{
                listStyle: "decimal",
                paddingLeft: 24,
                color: "#000",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: 16 }}>
                <strong style={{ color: "#000" }}>
                  Do you have a photo ID with your affected address, or a lease /
                  deed for the affected property?
                </strong>
                <br />
                Yes → We verify the address against fire zone maps. If it’s in the
                burn or evacuation zone, you’re verified.
              </li>
              <li style={{ marginBottom: 16 }}>
                <strong style={{ color: "#000" }}>
                  Do you have a photo ID at a different address plus proof of the
                  affected property?
                </strong>
                <br />
                Yes → We verify the affected address online and confirm
                displacement.
              </li>
              <li>
                <strong style={{ color: "#000" }}>
                  Do you have a FEMA registration number plus one other document?
                </strong>
                <br />
                Yes → We verify with additional proof of impact. If not, you may
                receive one-time emergency access — please bring documentation
                next time.
              </li>
            </ol>
          </div>
        </section>

        {/* ── IMPACT STATS — BLACK BAR (contrast) ── */}
        <section style={{ background: "#000", padding: "80px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#FFC700",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              marginBottom: 40,
            }}
          >
            Fire Relief — By the Numbers
          </span>
          <div
            className="fr-stats-grid"
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
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 3.5vw, 56px)",
                    color: "#FFC700",
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
                    color: "#fff",
                    fontWeight: 600,
                    marginTop: 8,
                    display: "block",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA — SUPPORT THE HUB ── */}
        <section style={{ background: "#000", padding: "clamp(60px, 10vw, 100px) clamp(24px, 5vw, 80px)", textAlign: "center" }}>
          <div
            style={{
              borderTop: "0.5px solid #FFC700",
              paddingTop: 80,
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(56px, 8vw, 120px)",
                lineHeight: 0.9,
                color: "#FFC700",
                marginBottom: 24,
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              SUPPORT THE HUB
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "#fff",
                maxWidth: 560,
                margin: "0 auto 48px",
                lineHeight: 1.7,
                fontFamily: "var(--font-body)",
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
                  background: "#FFC700",
                  color: "#000",
                  padding: "18px 48px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "16px",
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
                  color: "#FFC700",
                  padding: "18px 48px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "16px",
                  border: "2px solid #FFC700",
                }}
              >
                Volunteer &rarr;
              </a>
              <a
                href="https://calendar.app.google/TgJk68WX7w1joC3p8"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "transparent",
                  color: "#FFC700",
                  padding: "18px 48px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  borderRadius: "16px",
                  border: "2px solid #FFC700",
                }}
              >
                Book an Appointment &rarr;
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .fr-phase-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .fr-services-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .fr-demographics-grid {
            grid-template-columns: 1fr !important;
          }
          .fr-timeline-grid {
            grid-template-columns: 1fr !important;
          }
          .fr-stats-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
