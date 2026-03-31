import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getPrograms } from "@/sanity/lib/fetch";

export const revalidate = 60;

const HIDDEN_PROGRAMS = ["gala", "incubation-academy"];

export const metadata: Metadata = {
  title: "Donate | IBTU",
  description:
    "Support IBTU programs across Los Angeles — from fire relief and youth programming to back-to-school festivals and community health. Every dollar builds infrastructure.",
};

export default async function DonateIndex() {
  const programs = await getPrograms().catch(() => []);
  const visible = programs.filter(
    (p: { slug: string }) => !HIDDEN_PROGRAMS.includes(p.slug)
  );

  return (
    <>
      <main style={{ background: "#000", minHeight: "100vh" }}>
        {/* Hero */}
        <section
          style={{
            background: "var(--ibtu-gold)",
            padding: "clamp(120px, 14vw, 200px) clamp(32px, 5vw, 80px) clamp(80px, 10vw, 140px)",
          }}
        >
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--display-section)",
                lineHeight: 0.92,
                textTransform: "uppercase",
                color: "var(--ibtu-black)",
                letterSpacing: "-0.02em",
                marginBottom: "24px",
              }}
            >
              Support the Movement
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--body-lg)",
                color: "var(--ibtu-black)",
                maxWidth: "640px",
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              Every dollar builds infrastructure — in schools, on beaches, across
              neighborhoods, and through crises. Choose a program below to direct your
              impact.
            </p>
          </div>
        </section>

        {/* Program cards */}
        <section
          style={{
            padding: "clamp(60px, 8vw, 120px) clamp(32px, 5vw, 80px)",
          }}
        >
          <div
            style={{
              maxWidth: "var(--content-max)",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "var(--grid-gap)",
            }}
          >
            {visible.map((p: { slug: string; title: string; tagline?: string; pillar?: string }) => (
              <Link
                key={p.slug}
                href={`/donate/${p.slug}`}
                style={{
                  display: "block",
                  background: "var(--ibtu-gold)",
                  borderRadius: "16px",
                  padding: "clamp(24px, 3vw, 40px)",
                  textDecoration: "none",
                  transition: "transform 0.35s var(--ease-out-expo), box-shadow 0.35s",
                }}
                onMouseEnter={undefined}
              >
                {p.pillar && (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "9px",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      color: "var(--ibtu-black)",
                      fontWeight: 700,
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    {p.pillar}
                  </span>
                )}
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(24px, 3vw, 40px)",
                    textTransform: "uppercase",
                    color: "var(--ibtu-black)",
                    lineHeight: 1,
                    marginBottom: "12px",
                  }}
                >
                  {p.title}
                </h2>
                {p.tagline && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "var(--body-sm)",
                      color: "var(--ibtu-black)",
                      lineHeight: 1.5,
                      marginBottom: "16px",
                    }}
                  >
                    {p.tagline}
                  </p>
                )}
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "var(--ibtu-black)",
                  }}
                >
                  Donate Now →
                </span>
              </Link>
            ))}
          </div>

          {/* General donation */}
          <div
            style={{
              maxWidth: "var(--content-max)",
              margin: "48px auto 0",
              textAlign: "center",
            }}
          >
            <a
              href="https://secure.qgiv.com/for/bac2sch"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                background: "var(--ibtu-gold)",
                color: "var(--ibtu-black)",
                padding: "16px 48px",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              General Donation →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
