import type { Metadata } from "next";
import Link from "next/link";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";
import { getImpactStats } from "@/sanity/lib/fetch";
import { digitalReach } from "@/lib/data/impact-stats";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Impact | IBTU",
  description:
    "The numbers behind IBTU's community impact — 62,475+ students, 875,500+ lbs of food, 300+ partners, and six consecutive years of service across Los Angeles.",
};

export default async function ImpactPage() {
  const [stats2025, statsCumulative] = await Promise.all([
    getImpactStats("2025"),
    getImpactStats("Cumulative"),
  ]);

  const digitalItems = [
    { value: digitalReach.reach, label: "Total Reach" },
    { value: digitalReach.views, label: "Video Views" },
    { value: digitalReach.profileVisits, label: "Profile Visits" },
    { value: digitalReach.contentPieces, label: "Content Pieces" },
    { value: digitalReach.websiteVisits, label: "Website Visits" },
  ];

  return (
    <>
      <TopNav />
      <main style={{ background: "#000", minHeight: "100vh"}}>

        {/* Hero */}
        <div style={{ padding: "140px 80px 100px 80px" }}>
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
            Impact
          </span>
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(48px, 7vw, 120px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            THE NUMBERS TELL
            <br />
            ONE STORY.
            <br />
            THE PEOPLE TELL
            <br />
            ANOTHER.
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 22px)",
              color: "#fff",
              maxWidth: 640,
              lineHeight: 1.75,
            }}
          >
            Six years of showing up. Every number represents a family who was
            met where they were, with what they needed, when they needed it.
          </p>
        </div>

        {/* 2025 Stats Grid */}
        <div style={{ background: "var(--gold)", padding: "80px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 48,
            }}
          >
            2025 At a Glance
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 40,
            }}
          >
            {stats2025.map((stat: any, i: number) => (
              <div key={i}>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(32px, 4vw, 56px)",
                    color: "#000",
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
                    color: "rgba(0,0,0,0.6)",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Cumulative Stats Grid */}
        <div style={{ padding: "100px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 48,
            }}
          >
            Cumulative Impact — Since 2020
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 40,
            }}
          >
            {statsCumulative.map((stat: any, i: number) => (
              <div key={i}>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
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
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Reach Strip */}
        <div
          style={{
            background: "var(--gold)",
            padding: "60px 80px",
            borderTop: "1px solid var(--gold)",
            borderBottom: "1px solid var(--gold)",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              marginBottom: 32,
            }}
          >
            Digital Reach
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            {digitalItems.map((item, i) => (
              <div key={i} style={{ textAlign: "center", flex: "1 1 140px" }}>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(28px, 3vw, 48px)",
                    color: "#fff",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  {item.value}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 600,
                  }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: 12,
              color: "var(--gold)",
              marginTop: 24,
              textAlign: "center",
            }}
          >
            {digitalReach.demographics}
          </p>
        </div>

        {/* CTA */}
        <div style={{ background: "var(--gold)", padding: "80px 80px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "#000",
              marginBottom: 24,
            }}
          >
            BEHIND EVERY NUMBER IS A PERSON
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
            See the programs that drive this impact — built with communities,
            not for them.
          </p>
          <Link
            href="/our-programs"
            style={{
              display: "inline-block",
              background: "#000",
              color: "var(--gold)",
              padding: "18px 48px",
              fontFamily: "Poppins, sans-serif",
              fontSize: 13,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            View Our Programs &rarr;
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
