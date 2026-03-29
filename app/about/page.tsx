import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getTimeline } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Us | IBTU — It's Bigger Than Us",
  description:
    "Since 2020, IBTU has grown from a pandemic-era response team into permanent community infrastructure serving Los Angeles and beyond.",
};

export default async function AboutPage() {
  const orgTimeline = await getTimeline();
  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* Hero */}
        <div style={{ padding: "140px 80px 100px 80px" }}>
          <span style={{ display: "block", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20, fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
            Founded 2020 · Los Angeles
          </span>
          <h1 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(60px, 9vw, 140px)", lineHeight: 0.9, color: "#fff", marginBottom: 32 }}>
            WE LISTEN.
            <br />
            WE BUILD.
            <br />
            WE STAY.
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.5vw, 22px)", color: "rgba(255,255,255,0.7)", maxWidth: 640, lineHeight: 1.75 }}>
            Since 2020, It&apos;s Bigger Than Us has grown from a pandemic-era
            response team into permanent community infrastructure serving Los
            Angeles and beyond.
          </p>
        </div>

        {/* Origin */}
        <div style={{ background: "var(--gold)", padding: "100px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "#000", fontFamily: "Poppins, sans-serif", fontWeight: 700, marginBottom: 20, display: "block" }}>
                How It Started
              </span>
              <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(36px, 4.5vw, 72px)", lineHeight: 0.95, color: "#000", marginBottom: 28 }}>
                A QUESTION, NOT A PLAN
              </h2>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 19px)", color: "#000", lineHeight: 1.75, marginBottom: 24 }}>
                Founded in 2020 during COVID-19 with &ldquo;How can I help
                you?&rdquo; cards distributed in Los Angeles neighborhoods. The
                answers were immediate: food, school supplies, health resources,
                someone who would listen.
              </p>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 19px)", color: "#000", lineHeight: 1.75 }}>
                From weekly food distributions to a 3-pillar organization
                serving 62,475+ students. Expanded to Miami in 2024. By 2025,
                running the largest community-based wildfire relief operation in
                LA while serving 28,025 students across 34 school sites.
              </p>
            </div>
            <div>
              <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "#000", fontFamily: "Poppins, sans-serif", fontWeight: 700, marginBottom: 20, display: "block" }}>
                How It Works
              </span>
              <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(36px, 4.5vw, 72px)", lineHeight: 0.95, color: "#000", marginBottom: 28 }}>
                COMMUNITY IS THE INFRASTRUCTURE
              </h2>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 19px)", color: "#000", lineHeight: 1.75, marginBottom: 24 }}>
                We go where people already are, listen to what they need, and
                build systems around those needs. Every program is
                place-based — rooted in specific schools, neighborhoods, and
                community spaces.
              </p>
              <p style={{ fontSize: "clamp(16px, 1.3vw, 19px)", color: "#000", lineHeight: 1.75 }}>
                We don&apos;t parachute in. We listen, we build, and we stay.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div style={{ padding: "100px 80px", maxWidth: 800 }}>
          <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontFamily: "Poppins, sans-serif", fontWeight: 700, marginBottom: 20, display: "block" }}>
            Mission
          </span>
          <p style={{ fontSize: "clamp(18px, 1.8vw, 26px)", color: "#fff", lineHeight: 1.65, marginBottom: 60 }}>
            It&apos;s Bigger Than Us builds trusted, place-based programs that
            support youth, families, and neighborhoods through education, health
            access, and crisis response — designed with dignity, informed by
            community, and built to last.
          </p>

          <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontFamily: "Poppins, sans-serif", fontWeight: 700, marginBottom: 20, display: "block" }}>
            Vision
          </span>
          <p style={{ fontSize: "clamp(18px, 1.8vw, 26px)", color: "#fff", lineHeight: 1.65 }}>
            A city where every family has barrier-free access to the resources,
            care, and community infrastructure they need to thrive — not just
            survive.
          </p>
        </div>

        {/* Three Pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 2, padding: 2 }}>
          {[
            { tag: "Pillar 01", title: "Crisis & Disaster Stabilization", desc: "When crisis hits, IBTU is already there. We stabilize families through rapid response, trusted relief, and long-term recovery.", href: "/our-programs/fire-relief" },
            { tag: "Pillar 02", title: "School & Youth Stability", desc: "When families face instability, students feel it first. IBTU works inside schools to protect attendance, engagement, and opportunity.", href: "/our-programs/youth-programming" },
            { tag: "Pillar 03", title: "Community Health & Resource Access", desc: "From food distributions and dental screenings to mental health sessions — IBTU removes barriers to health and essentials.", href: "/our-programs/community-health" },
          ].map((p) => (
            <Link key={p.tag} href={p.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--gold)", padding: "60px 44px", minHeight: 280, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(0,0,0,0.5)", fontFamily: "Poppins, sans-serif", fontWeight: 700, marginBottom: 14 }}>{p.tag}</span>
                <h3 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(28px, 3vw, 44px)", lineHeight: 0.95, color: "#000", marginBottom: 16 }}>{p.title.toUpperCase()}</h3>
                <p style={{ fontSize: 14, color: "#000", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Timeline */}
        <div style={{ padding: "100px 80px" }}>
          <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(44px, 6vw, 96px)", lineHeight: 0.9, color: "#fff", marginBottom: 60 }}>
            TIMELINE
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {orgTimeline.map((entry: any, i: number) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: 32,
                  padding: "32px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div>
                  <span style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: 28, color: "var(--gold)", lineHeight: 1 }}>
                    {entry.year}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(18px, 2vw, 28px)", color: "#fff", fontWeight: 700, lineHeight: 1.1, marginBottom: 10 }}>
                    {entry.title.toUpperCase()}
                  </h3>
                  <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                    {entry.detail}
                  </p>
                  <span style={{ display: "inline-block", marginTop: 10, fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,199,0,0.5)", fontWeight: 600 }}>
                    {entry.pillar}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "var(--gold)", padding: "80px 80px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.95, color: "#000", marginBottom: 24 }}>
            THIS WORK DOES NOT HAPPEN WITHOUT YOU
          </h2>
          <p style={{ fontSize: 16, color: "#000", maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Every volunteer shift, every sponsorship dollar, every shared post
            expands the reach of community-built infrastructure.
          </p>
          <Link href="/get-involved" style={{ display: "inline-block", background: "#000", color: "var(--gold)", padding: "18px 48px", fontFamily: "Poppins, sans-serif", fontSize: 13, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, textDecoration: "none" }}>
            Get Involved →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
