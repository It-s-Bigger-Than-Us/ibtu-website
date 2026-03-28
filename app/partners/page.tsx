import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getPartners } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Partners | IBTU",
  description:
    "300+ organizations, brands, government agencies, and community groups that power IBTU's community infrastructure across Los Angeles.",
};

export default async function PartnersPage() {
  const partners = await getPartners();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const grouped: Record<string, any[]> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const p of partners as any[]) {
    const cat = p.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  }
  const categories = Object.keys(grouped);

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

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
            Partnerships
          </span>
          <h1
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(60px, 9vw, 140px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            BUILT WITH,
            <br />
            NOT FOR
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 22px)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 640,
              lineHeight: 1.75,
            }}
          >
            300+ organizations — from global brands to neighborhood churches —
            power IBTU&apos;s community infrastructure. Every partnership is
            built on trust, shared values, and showing up.
          </p>
        </div>

        {/* Partner Groups */}
        <div style={{ padding: "0 80px 100px 80px" }}>
          {categories.map((category) => (
            <div
              key={category}
              style={{
                marginBottom: 60,
                paddingBottom: 60,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
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
                  marginBottom: 24,
                }}
              >
                {category}
              </span>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                {grouped[category].map((partner: any, i: number) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      border: "1px solid var(--gold)",
                      borderRadius: 999,
                      padding: "10px 24px",
                      fontSize: 14,
                      color: "#fff",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {partner.title}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
            PARTNERSHIPS START WITH A CONVERSATION
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
            Whether you represent a brand, a school, a government office, or a
            community group — we build with you, not for you.
          </p>
          <a
            href="mailto:info@itsbiggerthanusla.org"
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
            info@itsbiggerthanusla.org
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
