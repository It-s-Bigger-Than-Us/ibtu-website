import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import { getProgramBySlug, getSponsorPackages, getPrograms } from "@/sanity/lib/fetch";

export const revalidate = 60;

interface Props {
  params: Promise<{ program: string }>;
}

const QGIV_URLS: Record<string, string> = {
  "back-2-school": "https://secure.qgiv.com/for/bac2sch",
  "coastal-care": "https://secure.qgiv.com/for/coastalclean-up",
  "community-health": "https://secure.qgiv.com/for/fooddistributionresourceaccess",
  "youth-programming": "https://secure.qgiv.com/for/youtprogram",
  "wellness": "https://secure.qgiv.com/for/communitywellness",
  "fire-relief": "https://secure.qgiv.com/for/firerelief",
  "community-builder-linkups": "https://secure.qgiv.com/for/communitybuilderlinkups",
  "gala": "https://secure.qgiv.com/for/acityunitedgala12126",
  "giving-season": "https://secure.qgiv.com/for/bac2sch",
};

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((p: { slug: string }) => ({ program: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { program: slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) return {};
  return {
    title: `Support ${program.title} | IBTU`,
    description: `Donate or sponsor ${program.title}. ${program.tagline}`,
  };
}

export default async function DonatePage({ params }: Props) {
  const { program: slug } = await params;
  const program = await getProgramBySlug(slug);
  if (!program) notFound();

  const sponsorPackages = await getSponsorPackages(slug);
  const qgivUrl = QGIV_URLS[slug];

  // Group sponsor packages by tier
  const groups: Record<string, any[]> = {};
  for (const pkg of sponsorPackages) {
    const g = pkg.tierGroup || "Sponsorship";
    if (!groups[g]) groups[g] = [];
    groups[g].push(pkg);
  }

  const heroSrc = program.heroImage?.asset?._ref
    ? `https://cdn.sanity.io/images/0m4ngfcw/production/${program.heroImage.asset._ref.replace("image-", "").replace(/-(\w+)$/, ".$1")}`
    : null;

  return (
    <>
      <Nav />
      <main style={{ background: "#000", minHeight: "100vh", paddingRight: "var(--nav-w)" }}>

        {/* Hero — full opacity image */}
        <section
          style={{
            minHeight: "60vh",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "140px 80px 80px 80px",
          }}
        >
          {heroSrc && (
            <img
              src={heroSrc}
              alt={program.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Link
              href={`/our-programs/${slug}`}
              style={{ display: "inline-block", fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", color: "#FFC700", marginBottom: 32, fontFamily: "Poppins, sans-serif", fontWeight: 600, textDecoration: "none" }}
            >
              &larr; Back to {program.title}
            </Link>
            <h1
              style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(48px, 8vw, 100px)", lineHeight: 0.9, color: "#fff", marginBottom: 20 }}
            >
              SUPPORT {program.title.toUpperCase()}
            </h1>
            <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", color: "rgba(255,255,255,0.7)", maxWidth: 600, lineHeight: 1.7 }}>
              {program.tagline}
            </p>
          </div>
        </section>

        {/* Sponsorship Packages */}
        {Object.keys(groups).length > 0 && (
          <section style={{ padding: "80px 80px", borderTop: "1px solid rgba(255,199,0,0.1)" }}>
            <span style={{ display: "block", fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "#FFC700", marginBottom: 20, fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
              Sponsorship Opportunities
            </span>
            <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(36px, 5vw, 72px)", lineHeight: 0.95, color: "#fff", marginBottom: 48 }}>
              BECOME A SPONSOR
            </h2>
            <p style={{ fontSize: "clamp(15px, 1.3vw, 19px)", color: "rgba(255,255,255,0.5)", maxWidth: 600, lineHeight: 1.7, marginBottom: 48 }}>
              Your sponsorship is more than a logo. It&apos;s an investment in community infrastructure — seen by thousands of families, partners, and media.
            </p>

            {Object.entries(groups).map(([groupName, pkgs]) => (
              <div key={groupName} style={{ marginBottom: 48 }}>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", letterSpacing: "3px", textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>
                  {groupName}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 2 }}>
                  {pkgs.map((pkg: any) => (
                    <div
                      key={pkg._id}
                      style={{
                        background: pkg.featured ? "#FFC700" : "#0e0e0e",
                        border: pkg.featured ? "none" : "1px solid rgba(255,199,0,0.12)",
                        padding: "40px 36px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: 280,
                      }}
                    >
                      <div>
                        <div style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(22px, 2.5vw, 32px)", color: pkg.featured ? "#000" : "#fff", lineHeight: 1, marginBottom: 8 }}>
                          {pkg.tierName}
                        </div>
                        <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 4vw, 52px)", color: pkg.featured ? "#000" : "#FFC700", letterSpacing: -1, lineHeight: 1, marginBottom: 20 }}>
                          {pkg.priceDisplay}
                        </div>
                        {pkg.boothSize && (
                          <div style={{ fontSize: 13, color: pkg.featured ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.4)", marginBottom: 16, fontFamily: "Poppins, sans-serif" }}>
                            Booth: {pkg.boothSize}
                          </div>
                        )}
                        {pkg.deliverables && (
                          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {pkg.deliverables.map((d: string, i: number) => (
                              <li key={i} style={{ fontSize: 13, color: pkg.featured ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.6)", lineHeight: 1.6, paddingLeft: 16, position: "relative", fontFamily: "Poppins, sans-serif" }}>
                                <span style={{ position: "absolute", left: 0, color: pkg.featured ? "#000" : "#FFC700" }}>+</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <a
                        href={pkg.bloomerangFormUrl || qgivUrl || "/get-involved#sponsor"}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          marginTop: 24,
                          background: pkg.featured ? "#000" : "#FFC700",
                          color: pkg.featured ? "#FFC700" : "#000",
                          padding: "16px 32px",
                          fontFamily: "Poppins, sans-serif",
                          fontSize: 12,
                          letterSpacing: "3px",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          textDecoration: "none",
                          textAlign: "center",
                          borderRadius: 4,
                        }}
                      >
                        Sponsor Now &rarr;
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Contact CTA */}
        <section style={{ background: "#FFC700", padding: "80px 80px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "LOT, Poppins, sans-serif", fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 0.95, color: "#000", marginBottom: 12 }}>
              QUESTIONS ABOUT SPONSORSHIP?
            </h2>
            <p style={{ fontSize: 16, color: "#000" }}>
              Contact us to build a custom partnership that fits your organization.
            </p>
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a
              href="mailto:partnerships@itsbiggerthanusla.org"
              style={{ display: "inline-block", background: "#000", color: "#FFC700", padding: "18px 40px", fontFamily: "Poppins, sans-serif", fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, textDecoration: "none", borderRadius: 4 }}
            >
              Email Us &rarr;
            </a>
            <Link
              href="/get-involved"
              style={{ display: "inline-block", border: "2px solid #000", color: "#000", padding: "18px 40px", fontFamily: "Poppins, sans-serif", fontSize: 12, letterSpacing: "3px", textTransform: "uppercase", fontWeight: 700, textDecoration: "none", borderRadius: 4 }}
            >
              Get Involved
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
