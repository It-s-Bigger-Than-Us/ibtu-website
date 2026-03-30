import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { getProgramBySlug, getSponsorPackages, getPrograms } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/client";
import SponsorCard from "@/components/ui/SponsorCard";

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

  const groups: Record<string, { tierName: string; priceDisplay: string; deliverables?: string[]; boothSize?: string; featured?: boolean; bloomerangFormUrl?: string; _id: string }[]> = {};
  for (const pkg of sponsorPackages) {
    const g = pkg.tierGroup || "Sponsorship";
    if (!groups[g]) groups[g] = [];
    groups[g].push(pkg);
  }

  const heroSrc = program.heroImage
    ? urlFor(program.heroImage).width(1920).quality(80).url()
    : null;

  return (
    <>
      <main style={{ background: "#000", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{
          minHeight: "50vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px) clamp(48px, 5vw, 80px)",
        }}>
          {heroSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={heroSrc}
              alt={program.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7) saturate(1.1)" }}
            />
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
            <Link
              href={`/our-programs/${slug}`}
              style={{ display: "inline-block", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: "#FFC700", marginBottom: 28, fontFamily: "Poppins, sans-serif", fontWeight: 600, textDecoration: "none" }}
            >
              &larr; Back to {program.title}
            </Link>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 900, lineHeight: 1, color: "#fff", marginBottom: 16, textTransform: "uppercase", letterSpacing: -1 }}>
              Support {program.title}
            </h1>
            <p style={{ fontSize: "clamp(15px, 1.3vw, 18px)", color: "#fff", maxWidth: 560, lineHeight: 1.7, fontFamily: "Poppins, sans-serif" }}>
              {program.tagline}
            </p>
          </div>
        </section>

        {/* Quick Donate CTA */}
        {qgivUrl && (
          <section style={{ padding: "40px clamp(24px, 5vw, 80px)", borderBottom: "1px solid rgba(255,199,0,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span style={{ fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 600, color: "var(--gold)", letterSpacing: 1, textTransform: "uppercase" }}>
                Make a direct donation
              </span>
            </div>
            <a
              href={qgivUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "#FFC700", color: "#000",
                padding: "14px 36px", borderRadius: 100,
                fontFamily: "Poppins, sans-serif", fontSize: 13, fontWeight: 700,
                letterSpacing: 1, textTransform: "uppercase",
                textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              Donate Now &rarr;
            </a>
          </section>
        )}

        {/* Sponsorship Packages — Framer-style pricing cards */}
        {Object.keys(groups).length > 0 && (
          <section style={{ padding: "clamp(48px, 6vw, 100px) clamp(24px, 5vw, 80px)" }}>
            <div style={{ marginBottom: 48 }}>
              <span style={{ display: "block", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#FFC700", marginBottom: 16, fontFamily: "Poppins, sans-serif", fontWeight: 700 }}>
                Sponsorship Opportunities
              </span>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.05, color: "#fff", marginBottom: 16, textTransform: "uppercase" }}>
                Become a Sponsor
              </h2>
              <p style={{ fontSize: "clamp(14px, 1.2vw, 17px)", color: "#fff", maxWidth: 520, lineHeight: 1.7, fontFamily: "Poppins, sans-serif" }}>
                Your sponsorship is more than a logo. It&apos;s an investment in community infrastructure — seen by thousands of families, partners, and media.
              </p>
            </div>

            {Object.entries(groups).map(([groupName, pkgs]) => (
              <div key={groupName} style={{ marginBottom: 56 }}>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 12, color: "var(--gold)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>
                  {groupName}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
                  {pkgs.map((pkg) => (
                    <SponsorCard
                      key={pkg._id}
                      tierName={pkg.tierName}
                      priceDisplay={pkg.priceDisplay}
                      deliverables={pkg.deliverables}
                      boothSize={pkg.boothSize}
                      featured={pkg.featured}
                      href={qgivUrl || (pkg.bloomerangFormUrl && !pkg.bloomerangFormUrl.includes('ibtu.la') ? pkg.bloomerangFormUrl : "/get-involved#sponsor")}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Contact CTA */}
        <section style={{
          background: "#FFC700",
          padding: "clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 40, flexWrap: "wrap",
        }}>
          <div>
            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, lineHeight: 1.05, color: "#000", marginBottom: 8, textTransform: "uppercase" }}>
              Questions About Sponsorship?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(0,0,0,0.65)", fontFamily: "Poppins, sans-serif" }}>
              Contact us to build a custom partnership that fits your organization.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="mailto:partnerships@itsbiggerthanusla.org"
              style={{ display: "inline-block", background: "#000", color: "#FFC700", padding: "14px 32px", fontFamily: "Poppins, sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, textDecoration: "none", borderRadius: 100 }}
            >
              Email Us &rarr;
            </a>
            <Link
              href="/get-involved"
              style={{ display: "inline-block", border: "2px solid #000", color: "#000", padding: "14px 32px", fontFamily: "Poppins, sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, textDecoration: "none", borderRadius: 100 }}
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
