import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getPrograms, getProgramBySlug, getEventsByProgram, getSponsorPackages } from "@/sanity/lib/fetch";
import SponsorshipSection from "@/components/sections/SponsorshipSection";
import EventGallery3D from "@/components/sections/EventGallery3D";

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

  const [events, sponsorPackages] = await Promise.all([
    getEventsByProgram(slug),
    getSponsorPackages(slug),
  ]);
  const upcomingEvents = events.filter((e: any) => e.status === "Upcoming" || e.status === "Active");
  const pastEvents = events.filter((e: any) => e.status === "Closed");

  const stats = program.proofStats.split("|").map((s: any) => s.trim());

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* Hero */}
        <div
          style={{
            minHeight: "70vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "120px 80px 80px 80px",
          }}
        >
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={program.heroImage}
            alt={program.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 70%, transparent 100%)",
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Link
              href="/our-programs"
              style={{
                display: "inline-block",
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 20,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              ← Our Programs
            </Link>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 16,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
              }}
            >
              {program.pillar} · {program.scheduleType}
            </div>
            <h1
              style={{
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: "clamp(52px, 8vw, 120px)",
                lineHeight: 0.9,
                color: "#fff",
                marginBottom: 32,
              }}
            >
              {program.title.toUpperCase()}
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 1.5vw, 22px)",
                color: "rgba(255,255,255,0.85)",
                maxWidth: 700,
                lineHeight: 1.7,
                marginBottom: 40,
              }}
            >
              {program.tagline}
            </p>
            {program.volunteerUrl ? (
              <a
                href={program.volunteerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "var(--gold)",
                  color: "#000",
                  padding: "16px 36px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  marginRight: 16,
                }}
              >
                Volunteer →
              </a>
            ) : null}
            <Link
              href="/get-involved"
              style={{
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.5)",
                color: "#fff",
                padding: "16px 36px",
                fontFamily: "Poppins, sans-serif",
                fontSize: 13,
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

        {/* Proof Stats Bar */}
        <div
          style={{
            background: "var(--gold)",
            padding: "52px 80px",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 60px",
          }}
        >
          {stats.map((stat: any, i: number) => (
            <div key={i}>
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 3.5vw, 52px)",
                  color: "#000",
                  letterSpacing: -1,
                  display: "block",
                  lineHeight: 1,
                }}
              >
                {stat.split(" ")[0]}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "#000",
                  fontWeight: 600,
                  display: "block",
                  marginTop: 4,
                }}
              >
                {stat.split(" ").slice(1).join(" ")}
              </span>
            </div>
          ))}
        </div>

        {/* Description */}
        <div style={{ padding: "80px 80px 60px 80px", maxWidth: 800 }}>
          <p
            style={{
              fontSize: "clamp(17px, 1.5vw, 22px)",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.8,
            }}
          >
            {program.description}
          </p>
        </div>

        {/* Events */}
        {events.length > 0 && (
          <div style={{ padding: "0 80px 80px 80px" }}>
            {upcomingEvents.length > 0 && (
              <>
                <h2
                  style={{
                    fontFamily: "LOT, Poppins, sans-serif",
                    fontSize: "clamp(32px, 4vw, 56px)",
                    color: "var(--gold)",
                    marginBottom: 32,
                    lineHeight: 0.95,
                  }}
                >
                  UPCOMING
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 60 }}>
                  {upcomingEvents.map((ev: any, i: number) => (
                    <div
                      key={i}
                      style={{
                        background: "#111",
                        border: "1px solid rgba(255,199,0,0.2)",
                        padding: "28px 32px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 24,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <span
                          style={{
                            display: "inline-block",
                            background: "var(--gold)",
                            color: "#000",
                            fontSize: 11,
                            letterSpacing: "2px",
                            fontWeight: 700,
                            padding: "4px 10px",
                            marginBottom: 12,
                            fontFamily: "Poppins, sans-serif",
                            textTransform: "uppercase",
                          }}
                        >
                          {ev.status}
                        </span>
                        <div
                          style={{
                            fontFamily: "LOT, Poppins, sans-serif",
                            fontSize: "clamp(18px, 2vw, 26px)",
                            color: "#fff",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            marginBottom: 8,
                          }}
                        >
                          {ev.title}
                        </div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>
                          {ev.location}
                          {ev.proofStats && (
                            <> · {ev.proofStats}</>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          whiteSpace: "nowrap",
                          fontSize: 13,
                          color: "var(--gold)",
                          fontWeight: 600,
                        }}
                      >
                        {ev.dateStart}
                        {ev.dateEnd && <> – {ev.dateEnd}</>}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Past Events — 3D Glass Gallery */}
            <EventGallery3D events={pastEvents} />
          </div>
        )}

        {/* Sponsorship Packages */}
        <SponsorshipSection packages={sponsorPackages} programTitle={program.title} />

        {/* Partners */}
        {program.keyPartners && (
          <div
            style={{
              padding: "60px 80px",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <h3
              style={{
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: "clamp(24px, 2.5vw, 36px)",
                color: "#fff",
                marginBottom: 20,
              }}
            >
              KEY PARTNERS
            </h3>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
              {program.keyPartners}
            </p>
          </div>
        )}

        {/* CTA */}
        <div
          style={{
            background: "var(--gold)",
            padding: "80px 80px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 40,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "LOT, Poppins, sans-serif",
                fontSize: "clamp(36px, 5vw, 72px)",
                lineHeight: 0.95,
                color: "#000",
                marginBottom: 12,
              }}
            >
              {program.ctaText.toUpperCase()}
            </h2>
            <p style={{ fontSize: 16, color: "#000", maxWidth: 480 }}>
              {program.allTimeServed}
            </p>
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
                  color: "var(--gold)",
                  padding: "18px 40px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: 13,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Volunteer →
              </a>
            )}
            <Link
              href="/get-involved"
              style={{
                display: "inline-block",
                border: "2px solid #000",
                color: "#000",
                padding: "18px 40px",
                fontFamily: "Poppins, sans-serif",
                fontSize: 13,
                letterSpacing: "3px",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Get Involved
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
