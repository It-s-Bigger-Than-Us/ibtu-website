import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { getPrograms, getProgramBySlug, getEventsByProgram } from "@/sanity/lib/fetch"
import Footer from "@/components/layout/Footer"
import AnimatedHeadline from "@/components/ui/AnimatedHeadline"
import ProgramDetailClient from "@/components/sections/ProgramDetailClient"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

/* Program-to-video mapping for sticky story sections */
const PROGRAM_VIDEOS: Record<string, string[]> = {
  'fire-relief': [
    '/videos/site-clips/program-fire-relief/landscape/fire-highlight1.mp4',
    '/videos/site-clips/program-fire-relief/landscape/fire-rebuild1.mp4',
  ],
  'youth-programming': [
    '/videos/site-clips/program-youth/landscape/youth-bhes1.mp4',
    '/videos/site-clips/program-youth/landscape/youth-wright1.mp4',
  ],
  'back-to-school': [
    '/videos/site-clips/program-b2s/landscape/b2s-venice1.mp4',
    '/videos/site-clips/program-b2s/landscape/b2s-venice2.mp4',
  ],
  'coastal-care': [
    '/videos/site-clips/program-coastal/landscape/coastal-cleanup1.mp4',
    '/videos/site-clips/program-coastal/landscape/coastal-cleanup2.mp4',
  ],
  'community-health': [
    '/videos/site-clips/program-community-health/landscape/ch-mlk-parade1.mp4',
    '/videos/site-clips/program-community-health/landscape/ch-rams-event.mp4',
  ],
  'giving-season': [
    '/videos/site-clips/program-giving/landscape/gs-cd8-event.mp4',
    '/videos/site-clips/program-giving/landscape/gs-production1.mp4',
  ],
  'wellness': [
    '/videos/site-clips/program-wellness/landscape/well-yoga-beach1.mp4',
    '/videos/site-clips/program-wellness/landscape/well-yoga-beach2.mp4',
  ],
}

/* Program-to-image mapping for stacking gallery */
const PROGRAM_IMAGES: Record<string, string[]> = {
  'fire-relief': ['/images/fire-relief/IMG_5382.jpg', '/images/fire-relief/IMG_5406.jpg', '/images/fire-relief/IMG_5508.jpg', '/images/fire-relief/IMG_5608.jpg'],
  'back-to-school': ['/images/b2s/_D5A7392.jpg', '/images/b2s/_D5A7224.jpg', '/images/b2s/2V8A1964.jpg', '/images/b2s/_D5A5912.jpg'],
  'coastal-care': ['/images/coastal/IMG_0024.jpg', '/images/coastal/IMG_0267.jpg', '/images/coastal/IMG_1796.jpg', '/images/coastal/IMG_1810.jpg'],
  'wellness': ['/images/wellness/IMG_0007.jpg', '/images/wellness/IMG_0279.jpg', '/images/wellness/IMG_1554.jpg', '/images/wellness/IMG_1583.jpg'],
  'youth-programming': ['/images/school/IMG_5608.jpg', '/images/school/IMG_5629.jpg', '/images/school/IMG_4674.jpg', '/images/school/IMG_5612.jpg'],
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

  // Videos for sticky story
  const storyVideos = PROGRAM_VIDEOS[slug] || []

  // Build sticky story media
  const storyMedia = [
    ...(heroSrc ? [{ type: 'image' as const, src: heroSrc, alt: program.title }] : []),
    ...storyVideos.map(src => ({ type: 'video' as const, src, alt: program.title })),
    ...cardImageUrls.slice(0, 2).map((src: string) => ({ type: 'image' as const, src, alt: program.title })),
  ].slice(0, 4)

  return (
    <main style={{ background: "var(--ibtu-black)", minHeight: "100vh" }}>

      {/* ── 1. PROGRAM HERO — full-bleed photo ── */}
      {heroSrc && (
        <section style={{ width: "100%", height: "70vh", minHeight: "400px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroSrc}
            alt={`${program.title} — IBTU program`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "saturate(1.15) brightness(1.05)",
            }}
          />
        </section>
      )}

      {/* ── 1b. PROGRAM NAME — below image, NOT over it ── */}
      <section style={{
        background: "var(--ibtu-black)",
        padding: "clamp(48px, 6vw, 100px) clamp(32px, 5vw, 80px)",
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
              color: "var(--ibtu-gold)",
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
            color: "var(--ibtu-gold)",
            fontWeight: 700,
            marginBottom: 20,
          }}>
            {program.pillar}
          </div>

          {/* Program title — word-by-word stagger */}
          <AnimatedHeadline
            text={program.title}
            as="h1"
            size="hero"
            color="var(--ibtu-white)"
            scrollTrigger={false}
            style={{ marginBottom: 12 }}
          />

          {/* Gold accent bar — animates to full width */}
          <div
            style={{
              height: "4px",
              background: "var(--ibtu-gold)",
              marginBottom: 36,
              animation: "goldBarGrow 1s var(--ease-out-expo) forwards",
              transformOrigin: "left",
            }}
          />

          {/* Tagline */}
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--body-lg)",
            color: "var(--ibtu-white)",
            maxWidth: 700,
            lineHeight: 1.7,
            fontWeight: 500,
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
                className="sparkle-stroke"
                style={{
                  display: "inline-block",
                  background: "var(--ibtu-gold)",
                  color: "var(--ibtu-black)",
                  padding: "16px 40px",
                  borderRadius: "4px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Volunteer →
              </a>
            )}
            <Link
              href={`/donate/${slug}`}
              className="holo-glass"
              style={{
                display: "inline-block",
                background: "var(--ibtu-white)",
                color: "var(--ibtu-black)",
                padding: "16px 40px",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Support This Program
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2–4. Client sections: sticky story + gallery + events ── */}
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
      />

      {/* ── 3. PROGRAM STATS — gold cards ── */}
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
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 5vw, 64px)",
                    color: "var(--ibtu-black)",
                    lineHeight: 1,
                  }}>
                    {number}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--body-sm)",
                    fontWeight: 600,
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

      {/* ── 6. PROGRAM CTA ── */}
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
                  borderRadius: "4px",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Volunteer →
              </a>
            )}
            <Link
              href={`/donate/${slug}`}
              style={{
                display: "inline-block",
                border: "2px solid var(--ibtu-black)",
                color: "var(--ibtu-black)",
                padding: "16px 40px",
                borderRadius: "4px",
                fontFamily: "var(--font-body)",
                fontSize: 13,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Support This Program
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Gold bar animation */}
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
