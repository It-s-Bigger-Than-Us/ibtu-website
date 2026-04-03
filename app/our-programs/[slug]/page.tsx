import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getPrograms, getProgramBySlug, getEventsByProgram } from "@/sanity/lib/fetch"
import Footer from "@/components/layout/Footer"
import AnimatedHeadline from "@/components/ui/AnimatedHeadline"
import ProgramDetailClient from "@/components/sections/ProgramDetailClient"
import ProgramSponsorSlider from "@/components/sections/ProgramSponsorSlider"
import { PROGRAM_STORY_VIDEOS } from "@/lib/data/video-urls"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

/* Program videos now served from Sanity CDN — see lib/data/video-urls.ts */

/* Program-to-image mapping — correct folders per program */
const PROGRAM_IMAGES: Record<string, string[]> = {
  'fire-relief': ['/images/gallery/IMG_1311.jpg', '/images/gallery/IMG_1673.jpg', '/images/gallery/IMG_1790.jpg', '/images/gallery/IMG_1848.jpg'],
  'back-2-school': ['/images/b2s/_D5A7392.jpg', '/images/b2s/_D5A7224.jpg', '/images/b2s/2V8A1964.jpg', '/images/b2s/_D5A5912.jpg'],
  'back-to-school': ['/images/b2s/_D5A7392.jpg', '/images/b2s/_D5A7224.jpg', '/images/b2s/2V8A1964.jpg', '/images/b2s/_D5A5912.jpg'],
  'coastal-care': ['/images/coastal/IMG_0024.jpg', '/images/coastal/IMG_0267.jpg', '/images/coastal/IMG_1796.jpg', '/images/coastal/IMG_1810.jpg'],
  'wellness': ['/images/wellness/IMG_0007.jpg', '/images/wellness/IMG_0279.jpg', '/images/wellness/IMG_1554.jpg', '/images/wellness/IMG_1583.jpg'],
  'youth-programming': ['/images/school/IMG_4674.jpg', '/images/school/IMG_5612.jpg', '/images/school/IMG_5884.jpg', '/images/school/IMG_6134.jpg'],
  'community-builder-linkups': ['/images/gallery/IMG_4353.jpg', '/images/gallery/IMG_1501.jpg', '/images/gallery/IMG_1603.jpg', '/images/gallery/IMG_1807.jpg'],
  'community-health': ['/images/wellness/IMG_0097.jpg', '/images/wellness/IMG_0111.jpg', '/images/wellness/IMG_4457.jpg', '/images/wellness/IMG_4688.jpg'],
  'giving-season': ['/images/b2s/6D5A0871.jpg', '/images/b2s/6D5A1246.jpg', '/images/b2s/_D5A8700.jpg', '/images/b2s/_D5A8744.jpg'],
}

/* Who We Serve — warm, specific, dignity-centered */
const WHO_WE_SERVE: Record<string, string[]> = {
  'fire-relief': ['Families displaced by the Palisades and Eaton fires', 'Homeowners navigating FEMA and insurance without representation', 'Immigrant families who need bilingual case management', 'Seniors rebuilding after losing everything', 'Single parents holding it together for their kids'],
  'back-2-school': ['K-12 students heading back to class across Los Angeles', 'Families at Title I schools who need supplies and resources', 'Neighborhoods where back-to-school shopping is a real financial burden', 'First-generation families navigating the school system'],
  'back-to-school': ['K-12 students heading back to class across Los Angeles', 'Families at Title I schools who need supplies and resources', 'Neighborhoods where back-to-school shopping is a real financial burden', 'First-generation families navigating the school system'],
  'coastal-care': ['Angelenos who want to take care of the coastline', 'Families looking for outdoor wellness and community', 'Young people learning environmental stewardship', 'Residents near Venice Beach who want a cleaner neighborhood'],
  'wellness': ['Families in Los Angeles without regular access to wellness programming', 'Young people who have never had a yoga class or health screening', 'Educators who spend all year pouring into students and need refilling', 'Seniors and caregivers carrying the weight of their households'],
  'youth-programming': ['Students in 34 schools across Los Angeles', 'Young people who need their school to feel like a place of belonging', 'Parents who want to be more involved but need a bridge', 'Campus staff who see the needs every day and want backup'],
  'community-builder-linkups': ['Local entrepreneurs building something in their neighborhood', 'Community organizers looking for collaboration', 'Small business owners who want to connect with IBTU programs', 'Aspiring nonprofit leaders learning the work'],
  'community-health': ['Families without healthcare access', 'Seniors', 'Youth in food deserts', 'Caregivers and parents'],
}

export async function generateStaticParams() {
  const programs = await getPrograms()
  return programs.map((p: { slug: string }) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) return {}
  return {
    title: `${program.title} | IBTU`,
    description: program.tagline,
  }
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) notFound()

  const events = await getEventsByProgram(slug)
  const pastEvents = events.filter((e: { status: string }) => e.status === "Closed")

  const stats = program.proofStats
    ? program.proofStats.split("|").map((s: string) => s.trim())
    : []

  const heroSrc = program.heroImage?.asset?._ref
    ? `https://cdn.sanity.io/images/0m4ngfcw/production/${program.heroImage.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}?w=1920&q=90`
    : null

  // Build Sanity image URLs for card images
  const cardImageUrls = (program.cardImages || [])
    .map((img: { asset?: { _ref?: string } }) =>
      img?.asset?._ref
        ? `https://cdn.sanity.io/images/0m4ngfcw/production/${img.asset._ref.replace("image-", "").replace(/-(\w+)$/, ".$1")}?w=1600&q=85`
        : ""
    )
    .filter(Boolean)

  // Combine Sanity + local images for gallery
  const localImages = PROGRAM_IMAGES[slug] || []
  const galleryImages = [...cardImageUrls, ...localImages].slice(0, 8)

  // Videos for sticky story — served from Sanity CDN
  const storyVideos = PROGRAM_STORY_VIDEOS[slug] || []

  // Build sticky story media
  const storyMedia = [
    ...(heroSrc ? [{ type: 'image' as const, src: heroSrc, alt: program.title }] : []),
    ...storyVideos.map(src => ({ type: 'video' as const, src, alt: program.title })),
    ...cardImageUrls.slice(0, 2).map((src: string) => ({ type: 'image' as const, src, alt: program.title })),
  ].slice(0, 4)

  // Who we serve
  const whoWeServe = WHO_WE_SERVE[slug] || []

  return (
    <main style={{ background: "#FFC700", minHeight: "100vh" }}>

      {/* ── 1. PROGRAM HERO — storybook intro, documentary feel ── */}
      <section style={{
        background: "#FFC700",
        padding: "clamp(120px, 15vh, 200px) clamp(32px, 5vw, 80px) clamp(48px, 6vw, 100px)",
      }}>
        <div style={{ maxWidth: "var(--content-max)" }}>
          {/* Back link */}
          <Link
            href="/our-programs"
            style={{
              display: "inline-block",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "#000",
              fontWeight: 700,
              textDecoration: "none",
              marginBottom: "32px",
            }}
          >
            &larr; Our Programs
          </Link>

          {/* Pillar eyebrow */}
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 11,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "#000",
            fontWeight: 700,
            marginBottom: 20,
          }}>
            {program.pillar}
          </div>

          {/* Program title — black on yellow, storybook feel */}
          <AnimatedHeadline
            text={program.title}
            as="h1"
            size="hero"
            color="#000"
            scrollTrigger={false}
            style={{ marginBottom: 12 }}
          />

          {/* Black accent bar */}
          <div
            style={{
              height: "4px",
              background: "#000",
              marginBottom: 36,
              animation: "goldBarGrow 1s var(--ease-out-expo) forwards",
              transformOrigin: "left",
            }}
          />

          {/* Tagline — documentary narration style */}
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--body-lg)",
            color: "#000",
            maxWidth: 700,
            lineHeight: 1.7,
            fontWeight: 700,
            marginBottom: 48,
          }}>
            {program.tagline}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {program.volunteerUrl && (
              <a
                href={program.volunteerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="iridescent-border"
                style={{
                  display: "inline-block",
                  background: "#000",
                  color: "#FFC700",
                  padding: "16px 40px",
                  borderRadius: "16px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  position: "relative",
                }}
              >
                Volunteer &rarr;
              </a>
            )}
            <Link
              href="/get-involved"
              className="iridescent-border"
              style={{
                display: "inline-block",
                background: "#000",
                color: "#FFC700",
                padding: "16px 40px",
                borderRadius: "16px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
                position: "relative",
              }}
            >
              Support This Program
            </Link>
          </div>
        </div>
      </section>

      {/* Full-bleed hero photo with parallax effect */}
      {heroSrc && (
        <section style={{
          width: "100%",
          height: "70vh",
          minHeight: "400px",
          overflow: "hidden",
          position: "relative",
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt={`${program.title} — IBTU program`}
            style={{
              width: "100%",
              height: "120%",
              objectFit: "cover",
              filter: "saturate(1.15) brightness(1.05)",
              position: "absolute",
              top: "-10%",
            }}
          />
        </section>
      )}

      {/* ── 2-4. Client sections: storybook story + gallery + events ── */}
      <ProgramDetailClient
        slides={storyMedia.map((m, i) => ({
          image: m.src,
          alt: m.alt || program.title,
          headline: i === 0 ? 'The Story' : program.title,
          body: i === 0 ? (program.description || program.tagline || '') : undefined,
          type: m.type,
        }))}
        galleryImages={galleryImages.map((src: string, i: number) => ({
          src,
          alt: `${program.title} — photo ${i + 1}`,
        }))}
        pastEvents={pastEvents}
        fieldImages={galleryImages.slice(0, 6)}
        programTitle={program.title}
      />

      {/* ── WHO WE SERVE — documentary scroll section ── */}
      {whoWeServe.length > 0 && (
        <section style={{
          background: "#000",
          padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)",
        }}>
          <div style={{
            maxWidth: "var(--content-max)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 80px)",
            alignItems: "start",
          }}>
            <div>
              <div style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#FFC700",
                fontWeight: 700,
                marginBottom: 24,
              }}>
                WHO WE SERVE
              </div>
              <AnimatedHeadline
                text="Designed for the Community"
                as="h2"
                size="section"
                color="#FFC700"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 12 }}>
              {whoWeServe.map((item, i) => (
                <div
                  key={i}
                  className="holo-glass"
                  style={{
                    background: "#000",
                    border: "2px solid #FFC700",
                    borderRadius: "16px",
                    padding: "clamp(16px, 2vw, 24px) clamp(20px, 2.5vw, 32px)",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 900,
                    fontSize: "clamp(28px, 3vw, 40px)",
                    color: "#FFC700",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--body-md)",
                    color: "#FFF",
                    fontWeight: 700,
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROGRAM STATS — gold cards ── */}
      {stats.length > 0 && (
        <section style={{
          background: "var(--ibtu-gold)",
          padding: "clamp(48px, 6vw, 80px) clamp(32px, 5vw, 80px)",
        }}>
          <div style={{
            maxWidth: "var(--content-max)",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
            gap: "var(--grid-gap)",
          }}>
            {stats.map((stat: string, i: number) => {
              const parts = stat.split(" ")
              const number = parts[0]
              const label = parts.slice(1).join(" ")
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "clamp(20px, 3vw, 40px)",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 900,
                    fontSize: "clamp(32px, 5vw, 64px)",
                    color: "var(--ibtu-black)",
                    lineHeight: 1,
                  }}>
                    {number}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--body-sm)",
                    fontWeight: 700,
                    color: "var(--ibtu-black)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginTop: 8,
                  }}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* IN THE FIELD gallery is now rendered inside ProgramDetailClient with auto-scroll on hover */}

      {/* ── PROGRAM CTA — sponsor button with iridescent fill ── */}
      <section style={{
        background: "var(--ibtu-gold)",
        padding: "clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)",
      }}>
        <div style={{
          maxWidth: "var(--content-max)",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 48,
          flexWrap: "wrap",
        }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <AnimatedHeadline
              text={program.ctaText || "Support This Program"}
              as="h2"
              size="section"
              color="var(--ibtu-black)"
            />
          </div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {program.volunteerUrl && (
              <a
                href={program.volunteerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="sparkle-stroke"
                style={{
                  display: "inline-block",
                  background: "var(--ibtu-black)",
                  color: "var(--ibtu-gold)",
                  padding: "16px 40px",
                  borderRadius: "16px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Volunteer
              </a>
            )}
            <Link
              href="/get-involved"
              className="sparkle-stroke"
              style={{
                display: "inline-block",
                border: "2px solid var(--ibtu-black)",
                color: "var(--ibtu-black)",
                padding: "16px 40px",
                borderRadius: "16px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Sponsor This Program
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Sponsor slider — right-edge panel for each program */}
      {/* Sponsor slider removed for now */}

      {/* Gold bar animation + responsive */}
      <style>{`
        @keyframes goldBarGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @media (max-width: 768px) {
          section:has(.sticky-story) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
