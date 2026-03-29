import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Jobs & Careers | IBTU",
  description:
    "Community infrastructure needs Community Builders. Join the IBTU team — paid positions, volunteer pathways, and workforce development.",
};

export default function JobsPage() {
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
              marginBottom: 32,
            }}
          >
            CURRENT OPENINGS
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 1.4vw, 20px)",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.75,
              maxWidth: 640,
              fontFamily: "Poppins, sans-serif",
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
