import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Jobs & Careers | IBTU",
  description:
    "Community infrastructure needs Community Builders. Join the IBTU team — paid positions, volunteer pathways, and workforce development.",
  alternates: { canonical: "/jobs" },
};

export default function JobsPage() {
  return (
    <>

      <main style={{ background: "#000", minHeight: "100vh"}}>

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
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
            }}
          >
            Careers &amp; Opportunities
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-body)',
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
              color: "#fff",
              maxWidth: 600,
              lineHeight: 1.75,
              fontFamily: 'var(--font-body)',
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
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            Open Positions
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            CURRENT OPENINGS
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 20px)",
              color: "#fff",
              lineHeight: 1.75,
              maxWidth: 640,
              fontFamily: 'var(--font-body)',
            }}
          >
            Current openings are posted as they become available. Contact us at{" "}
            <a
              href="mailto:info@itsbiggerthanusla.org"
              style={{ color: "#FFC700", textDecoration: "none", fontWeight: 600 }}
            >
              info@itsbiggerthanusla.org
            </a>{" "}
            for inquiries.
          </p>
        </section>

        {/* ── CTA — INTERESTED? ── */}
        <section style={{ background: "#FFC700", padding: "100px 80px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: 'var(--font-body)',
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
              fontFamily: 'var(--font-body)',
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
              fontFamily: 'var(--font-body)',
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
