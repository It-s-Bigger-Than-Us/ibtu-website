import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { awards } from "@/lib/data/awards";

export const metadata: Metadata = {
  title: "Awards & Recognition | IBTU",
  description:
    "23 awards and recognitions from the U.S. Congress, California Legislature, City of Los Angeles, and community institutions — honoring IBTU's impact since 2020.",
};

export default function AwardsPage() {
  const awards2025 = awards.filter((a) => a.year === 2025);
  const awards2024 = awards.filter((a) => a.year === 2024);

  const yearGroups = [
    { year: 2025, items: awards2025 },
    { year: 2024, items: awards2024 },
  ];

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* Hero */}
        <div style={{ background: "var(--gold)", padding: "140px 80px 100px 80px" }}>
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.5)",
              marginBottom: 20,
              fontFamily: "LOT, Poppins, sans-serif",
              fontWeight: 700,
            }}
          >
            Awards &amp; Recognition
          </span>
          <h1
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(40px, 6vw, 100px)",
              lineHeight: 0.9,
              color: "#000",
              marginBottom: 32,
              maxWidth: 900,
            }}
          >
            RECOGNIZED BY THE PEOPLE WE SERVE AND THE INSTITUTIONS THAT WATCH
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 20px)",
              color: "rgba(0,0,0,0.65)",
              maxWidth: 600,
              lineHeight: 1.75,
            }}
          >
            23 awards from Congress, the California Legislature, the City of Los
            Angeles, and community partners — each one earned in the field.
          </p>
        </div>

        {/* Awards List */}
        <div style={{ padding: "100px 80px" }}>
          {yearGroups.map((group) => (
            <div key={group.year} style={{ marginBottom: 80 }}>
              <h2
                style={{
                  fontFamily: "LOT, Poppins, sans-serif",
                  fontSize: "clamp(44px, 5vw, 80px)",
                  color: "var(--gold)",
                  lineHeight: 1,
                  marginBottom: 40,
                }}
              >
                {group.year}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {group.items.map((award, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "80px 1fr",
                      gap: 28,
                      padding: "28px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          background: "var(--gold)",
                          color: "#000",
                          fontFamily: "LOT, Poppins, sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                          padding: "6px 12px",
                          letterSpacing: "1px",
                        }}
                      >
                        {award.year}
                      </span>
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "LOT, Poppins, sans-serif",
                          fontSize: "clamp(16px, 1.8vw, 24px)",
                          color: "#fff",
                          fontWeight: 700,
                          lineHeight: 1.2,
                          marginBottom: 6,
                        }}
                      >
                        {award.title.toUpperCase()}
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,0.45)",
                          lineHeight: 1.5,
                          marginBottom: 4,
                        }}
                      >
                        {award.presentedBy}
                      </p>
                      <span
                        style={{
                          fontSize: 12,
                          color: "rgba(255,199,0,0.5)",
                          fontWeight: 600,
                          letterSpacing: "1px",
                          textTransform: "uppercase",
                        }}
                      >
                        {award.context}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Media Moments */}
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
            Media Moments
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
            THE WORK SPEAKS. THE MEDIA LISTENS.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 60,
              marginTop: 40,
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "LOT, Poppins, sans-serif",
                  fontSize: "clamp(22px, 2.5vw, 36px)",
                  color: "var(--gold)",
                  marginBottom: 16,
                }}
              >
                JENNIFER HUDSON SHOW
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                }}
              >
                IBTU founder Molly Morrow featured on the Jennifer Hudson Show,
                spotlighting the organization&apos;s wildfire relief work and
                community-first approach to crisis response.
              </p>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "LOT, Poppins, sans-serif",
                  fontSize: "clamp(22px, 2.5vw, 36px)",
                  color: "var(--gold)",
                  marginBottom: 16,
                }}
              >
                80+ MEDIA PLACEMENTS
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                }}
              >
                Coverage across ABC, Spectrum News, FoxLA, LA Sentinel, Yahoo
                Finance, and dozens more — earned through impact, never bought.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
