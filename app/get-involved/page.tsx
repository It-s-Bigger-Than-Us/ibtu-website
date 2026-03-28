import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Get Involved | IBTU — It's Bigger Than Us",
  description:
    "Volunteer, donate, or partner with IBTU. Community is the infrastructure — and this work does not happen without you.",
};

const BLOOMERANG = [
  {
    label: "Hub Volunteer",
    description: "Support fire relief and ongoing community services at our Relief Resource Hub.",
    href: "https://volunteer.bloomerang.co/JE/7haetjfrq5g190",
    cta: "Sign Up for Hub →",
  },
  {
    label: "School Program Volunteer",
    description: "Bring IBTU programs to school campuses. Lunchtime activations, resource fairs, and more.",
    href: "https://volunteer.bloomerang.co/JE/9bxg8o3ix6z1ih",
    cta: "Sign Up for Schools →",
  },
  {
    label: "Coastal Care Volunteer",
    description: "Join our monthly beach clean-up crew at Venice Beach. Every 2nd Saturday.",
    href: "https://volunteer.bloomerang.co/JE/6qkd8xo7woun5v",
    cta: "Sign Up for Coastal Care →",
  },
  {
    label: "Group Volunteer",
    description: "Bring your company, team, or organization. We coordinate group activations.",
    href: "https://volunteer.bloomerang.co/JE/zrvllcgtjvzav2",
    cta: "Sign Up as a Group →",
  },
];

const SPONSOR_TIERS = [
  { name: "Day One", amount: "$50,000+", description: "Premier naming rights, event co-branding, executive partnership" },
  { name: "Anchor", amount: "$25,000", description: "Program naming rights, major event presence, community recognition" },
  { name: "Catalyst", amount: "$10,000", description: "Event sponsor, program partner, brand placement across all activations" },
  { name: "Builder", amount: "$5,000", description: "Event presence, community recognition, IBTU partner listing" },
  { name: "Supporter", amount: "$2,500", description: "Community recognition, IBTU partner listing" },
  { name: "Contributor", amount: "$1,000", description: "Community recognition, in-kind partner listing" },
  { name: "Backer", amount: "$500", description: "Community recognition" },
];

export default function GetInvolvedPage() {
  const programsWithVol = programs.filter((p) => p.volunteerUrl);

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* Hero */}
        <div
          id="volunteer"
          style={{ padding: "140px 80px 100px 80px", borderBottom: "1px solid rgba(255,199,0,0.2)" }}
        >
          <span
            style={{
              display: "block",
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: 20,
              fontFamily: "LOT, Poppins, sans-serif",
              fontWeight: 700,
            }}
          >
            Get Involved · Los Angeles
          </span>
          <h1
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(52px, 8vw, 120px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 32,
            }}
          >
            THIS WORK
            <br />
            DOES NOT
            <br />
            HAPPEN
            <br />
            WITHOUT YOU
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 22px)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 640,
              lineHeight: 1.75,
            }}
          >
            7,500+ volunteers have shown up for Los Angeles through IBTU. Every
            shift, every clean-up, every lunchtime activation — community built
            this. Join us.
          </p>
        </div>

        {/* Volunteer Sign-Up */}
        <div style={{ padding: "80px 80px 80px 80px" }}>
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 0.95,
              color: "#fff",
              marginBottom: 48,
            }}
          >
            VOLUNTEER
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 2,
            }}
          >
            {BLOOMERANG.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#0e0e0e",
                    border: "1px solid rgba(255,199,0,0.2)",
                    padding: "40px 36px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    minHeight: 240,
                    cursor: "pointer",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "LOT, Poppins, sans-serif",
                        fontSize: "clamp(22px, 2.5vw, 36px)",
                        color: "#fff",
                        marginBottom: 16,
                        lineHeight: 1,
                      }}
                    >
                      {item.label}
                    </h3>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>
                      {item.description}
                    </p>
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 28,
                      fontSize: 11,
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontFamily: "LOT, Poppins, sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {item.cta}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Volunteer by Program */}
        <div
          style={{
            background: "#0a0a0a",
            padding: "60px 80px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(20px, 2.5vw, 32px)",
              color: "rgba(255,255,255,0.6)",
              marginBottom: 28,
            }}
          >
            VOLUNTEER BY PROGRAM
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {programsWithVol.map((prog) => (
              <a
                key={prog.slug}
                href={prog.volunteerUrl!}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 28px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#111",
                    cursor: "pointer",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "LOT, Poppins, sans-serif",
                        fontSize: "clamp(16px, 1.8vw, 24px)",
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      {prog.title}
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                      {prog.schedule}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: "3px",
                      color: "var(--gold)",
                      fontFamily: "LOT, Poppins, sans-serif",
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}
                  >
                    Sign Up →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Donate */}
        <div
          id="donate"
          style={{ background: "var(--gold)", padding: "80px 80px" }}
        >
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(44px, 6vw, 96px)",
              lineHeight: 0.9,
              color: "#000",
              marginBottom: 28,
            }}
          >
            DONATE
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 22px)",
              color: "#000",
              maxWidth: 580,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Your donation sustains community infrastructure. From fire relief to
            food access to school programming — every dollar goes directly to
            programs built for Los Angeles.
          </p>
          <a
            href="https://bloomerang.co/ibtu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#000",
              color: "var(--gold)",
              padding: "18px 48px",
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: 13,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 700,
              textDecoration: "none",
              marginRight: 16,
            }}
          >
            Donate Today →
          </a>
        </div>

        {/* Sponsor */}
        <div id="sponsor" style={{ padding: "80px 80px" }}>
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(44px, 6vw, 96px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            SPONSOR
          </h2>
          <p
            style={{
              fontSize: "clamp(15px, 1.3vw, 19px)",
              color: "rgba(255,255,255,0.6)",
              maxWidth: 580,
              lineHeight: 1.7,
              marginBottom: 48,
            }}
          >
            300+ brands already trust IBTU as their community activation
            partner. Dignified, impactful, and brand-safe — sponsorship puts
            your brand at the center of the work.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 2,
            }}
          >
            {SPONSOR_TIERS.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: "#0e0e0e",
                  border: "1px solid rgba(255,199,0,0.15)",
                  padding: "32px 28px",
                }}
              >
                <div
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: "clamp(20px, 2vw, 28px)",
                    color: "var(--gold)",
                    lineHeight: 1,
                    marginBottom: 8,
                  }}
                >
                  {tier.name}
                </div>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(24px, 3vw, 40px)",
                    color: "#fff",
                    letterSpacing: -1,
                    marginBottom: 16,
                  }}
                >
                  {tier.amount}
                </div>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40 }}>
            <a
              href="mailto:info@itsbiggerthanusla.org"
              style={{
                display: "inline-block",
                background: "var(--gold)",
                color: "#000",
                padding: "18px 48px",
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: 13,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Sponsor IBTU →
            </a>
          </div>
        </div>

        {/* Partner */}
        <div
          id="partner"
          style={{
            background: "#0a0a0a",
            padding: "80px 80px",
            borderTop: "1px solid rgba(255,199,0,0.15)",
          }}
        >
          <h2
            style={{
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: "clamp(44px, 6vw, 96px)",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 24,
            }}
          >
            PARTNER
          </h2>
          <p
            style={{
              fontSize: "clamp(16px, 1.5vw, 22px)",
              color: "rgba(255,255,255,0.7)",
              maxWidth: 640,
              lineHeight: 1.75,
              marginBottom: 40,
            }}
          >
            IBTU is the community activation partner that 300+ brands and
            organizations already trust. We connect your resources directly to
            people who need them most — with dignity, precision, and no poverty
            voyeurism.
          </p>
          <a
            href="mailto:info@itsbiggerthanusla.org"
            style={{
              display: "inline-block",
              border: "1px solid rgba(255,199,0,0.6)",
              color: "var(--gold)",
              padding: "18px 48px",
              fontFamily: "LOT, Poppins, sans-serif",
              fontSize: 13,
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Partner With Us →
          </a>
        </div>

        {/* Back to programs */}
        <div
          style={{
            padding: "48px 80px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Link
            href="/our-programs"
            style={{
              fontSize: 11,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              textDecoration: "none",
              fontFamily: "LOT, Poppins, sans-serif",
              fontWeight: 700,
            }}
          >
            ← View All Programs
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
