import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getPrograms, getProgramBySlug, getEventsByProgram } from "@/sanity/lib/fetch";
import EventGallery3D from "@/components/sections/EventGallery3D";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p: { slug: string }) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: `${program.title} | IBTU`,
    description: program.tagline,
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const events = await getEventsByProgram(slug);
  const upcomingEvents = events.filter((e: any) => e.status === "Upcoming" || e.status === "Active");
  const pastEvents = events.filter((e: any) => e.status === "Closed");

  const stats = program.proofStats
    ? program.proofStats.split("|").map((s: any) => s.trim())
    : [];

  const heroSrc = program.heroImage?.asset?._ref
    ? `https://cdn.sanity.io/images/0m4ngfcw/production/${program.heroImage.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}`
    : null;

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* ──────────────────────────────────────────────
            1. FULL-SCREEN HERO
        ────────────────────────────────────────────── */}
        <section
          style={{
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "160px 80px 100px 80px",
          }}
        >
          {/* Hero background image — full opacity */}
          {heroSrc && (
            <img
              src={heroSrc}
              alt={program.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, #000 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.2) 100%)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Back link */}
            <Link
              href="/our-programs"
              style={{
                display: "inline-block",
                fontSize: 12,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "#FFC700",
                marginBottom: 40,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              &larr; Our Programs
            </Link>

            {/* Pillar eyebrow */}
            <div
              style={{
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.45)",
                marginBottom: 20,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
              }}
            >
              {program.pillar}
            </div>

            {/* Program title */}
            <h1
              style={{
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: "clamp(60px, 10vw, 140px)",
                lineHeight: 0.88,
                color: "#FFF",
                marginBottom: 36,
                maxWidth: "14ch",
              }}
            >
              {program.title.toUpperCase()}
            </h1>

            {/* Tagline */}
            <p
              style={{
                fontSize: "clamp(17px, 1.5vw, 22px)",
                color: "rgba(255,255,255,0.8)",
                maxWidth: 700,
                lineHeight: 1.7,
                marginBottom: 48,
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {program.tagline}
            </p>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {program.volunteerUrl && (
                <a
                  href={program.volunteerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    background: "#FFC700",
                    color: "#000",
                    padding: "18px 40px",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: 12,
                    letterSpacing: "3px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Volunteer &rarr;
                </a>
              )}
              <Link
                href={`/donate/${slug}`}
                style={{
                  display: "inline-block",
                  border: "1px solid rgba(255,255,255,0.4)",
                  color: "#FFF",
                  padding: "18px 40px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 12,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {program.ctaText}
              </Link>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            2. STATS STRIP
        ────────────────────────────────────────────── */}
        {stats.length > 0 && (
          <section
            style={{
              background: "#FFC700",
              padding: "48px 80px",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 60,
                minWidth: "max-content",
              }}
            >
              {stats.map((stat: any, i: number) => {
                const parts = stat.split(" ");
                const number = parts[0];
                const label = parts.slice(1).join(" ");
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.15)" : "none",
                      paddingRight: i < stats.length - 1 ? 60 : 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 900,
                        fontSize: "clamp(32px, 4vw, 56px)",
                        color: "#000",
                        letterSpacing: "-1px",
                        lineHeight: 1,
                      }}
                    >
                      {number}
                    </span>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: 13,
                        color: "#000",
                        fontWeight: 600,
                        marginTop: 6,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ──────────────────────────────────────────────
            3. DESCRIPTION
        ────────────────────────────────────────────── */}
        <section
          style={{
            background: "#000",
            padding: "120px 80px",
          }}
        >
          <div style={{ maxWidth: 800 }}>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(18px, 1.6vw, 22px)",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.8,
                letterSpacing: "0.2px",
              }}
            >
              {program.description}
            </p>
          </div>
        </section>

        {/* ──────────────────────────────────────────────
            4. UPCOMING EVENTS
        ────────────────────────────────────────────── */}
        {upcomingEvents.length > 0 && (
          <section style={{ padding: "120px 80px 80px 80px" }}>
            <h2
              style={{
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                color: "#FFC700",
                marginBottom: 48,
                lineHeight: 0.95,
              }}
            >
              UPCOMING
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {upcomingEvents.map((ev: any, i: number) => (
                <div
                  key={i}
                  style={{
                    background: "#0A0A0A",
                    border: "1px solid rgba(255,199,0,0.12)",
                    padding: "36px 40px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 32,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <span
                      style={{
                        display: "inline-block",
                        background: "#FFC700",
                        color: "#000",
                        fontSize: 10,
                        letterSpacing: "2px",
                        fontWeight: 700,
                        padding: "5px 12px",
                        marginBottom: 16,
                        fontFamily: "Poppins, sans-serif",
                        textTransform: "uppercase",
                      }}
                    >
                      {ev.status}
                    </span>
                    <div
                      style={{
                        fontFamily: "LOT, Poppins, sans-serif",
                        fontSize: "clamp(20px, 2.2vw, 28px)",
                        color: "#FFF",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        marginBottom: 10,
                      }}
                    >
                      {ev.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: 14,
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.5,
                      }}
                    >
                      {ev.location}
                      {ev.proofStats && <> &middot; {ev.proofStats}</>}
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      whiteSpace: "nowrap",
                      fontFamily: "Poppins, sans-serif",
                      fontSize: 13,
                      color: "#FFC700",
                      fontWeight: 600,
                      paddingTop: 4,
                    }}
                  >
                    {ev.dateStart}
                    {ev.dateEnd && <> &ndash; {ev.dateEnd}</>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ──────────────────────────────────────────────
            5. PAST EVENTS — 3D Gallery
        ────────────────────────────────────────────── */}
        {pastEvents.length > 0 && (
          <section style={{ padding: "40px 80px 120px 80px" }}>
            <EventGallery3D events={pastEvents} />
          </section>
        )}

        {/* ──────────────────────────────────────────────
            6. KEY PARTNERS
        ────────────────────────────────────────────── */}
        {program.keyPartners && (
          <section
            style={{
              padding: "100px 80px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#FFC700",
                marginBottom: 20,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
              }}
            >
              Key Partners
            </div>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: 16,
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                maxWidth: 700,
              }}
            >
              {program.keyPartners}
            </p>
          </section>
        )}

        {/* ──────────────────────────────────────────────
            7. CTA BANNER
        ────────────────────────────────────────────── */}
        <section
          style={{
            background: "#FFC700",
            padding: "100px 80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2
              style={{
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                lineHeight: 0.92,
                color: "#000",
                marginBottom: 16,
              }}
            >
              {program.ctaText.toUpperCase()}
            </h2>
            {program.allTimeServed && (
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 16,
                  color: "#000",
                  maxWidth: 500,
                  lineHeight: 1.6,
                }}
              >
                {program.allTimeServed}
              </p>
            )}
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {program.volunteerUrl && (
              <a
                href={program.volunteerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "#000",
                  color: "#FFC700",
                  padding: "18px 44px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 12,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Volunteer &rarr;
              </a>
            )}
            <Link
              href={`/donate/${slug}`}
              style={{
                display: "inline-block",
                border: "2px solid #000",
                color: "#000",
                padding: "18px 44px",
                fontFamily: "Poppins, sans-serif",
                fontSize: 12,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Support This Program
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
