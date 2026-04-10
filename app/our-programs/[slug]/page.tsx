import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import { getPrograms, getProgramBySlug, getEventsByProgram } from "@/sanity/lib/fetch"
import Footer from "@/components/layout/Footer"
import AnimatedHeadline from "@/components/ui/AnimatedHeadline"
import ProgramPageClient from "@/components/sections/ProgramPageClient"
import { getProgramContent } from "@/lib/data/program-content"

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
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

  // Get typed program content from data file
  const programContent = getProgramContent(slug)
  if (!programContent) notFound()

  const events = await getEventsByProgram(slug)
  const pastEvents = events.filter((e: { status: string }) => e.status === "Closed")

  // Build hero image URL from Sanity
  const heroImageUrl = program.heroImage?.asset?._ref
    ? `https://cdn.sanity.io/images/0m4ngfcw/production/${program.heroImage.asset._ref.replace('image-', '').replace(/-(\w+)$/, '.$1')}?w=1920&q=90`
    : null

  /* Per-program hero video — replaces the wide image below the header */
  const HERO_VIDEOS: Record<string, string> = {
    'fire-relief': '/videos/fire-rebuild-drone.mp4',
    'back-2-school': '/videos/b2s-venice-highlight.mp4',
  }
  const heroVideoUrl = HERO_VIDEOS[slug] || undefined

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>

      {/* ── Full program page — client component with GSAP ── */}
      <ProgramPageClient
        program={programContent}
        heroImageUrl={heroImageUrl}
        heroVideoUrl={heroVideoUrl}
        pastEvents={pastEvents}
      />

      {/* ── QGIV SPONSOR WIDGETS — per-program ── */}
      {slug === 'coastal-care' && (
        <section style={{
          background: "#000",
          padding: "clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
            <AnimatedHeadline
              text="Same Shore. Every Month."
              as="h2"
              size="section"
              color="#FFC700"
            />
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--body-md)",
              color: "#FFF",
              fontWeight: 700,
              marginTop: 16,
              marginBottom: 40,
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}>
              Coastal Care at Venice Fishing Pier — help us keep showing up.
            </p>
            <style>{`
              .qgiv-sponsor-btn {
                background: #FFC700 !important;
                font-family: var(--font-body) !important;
                text-align: center !important;
                font-size: 1.125rem !important;
                font-weight: bold !important;
                text-decoration: none !important;
                color: #000 !important;
                border-radius: 16px !important;
                border: none !important;
                cursor: pointer !important;
                padding: 16px 40px !important;
                max-width: 300px !important;
                margin: 0 auto !important;
                letter-spacing: 0.1em !important;
                text-transform: uppercase !important;
              }
              .qgiv-sponsor-btn:hover {
                filter: brightness(0.85);
              }
            `}</style>
            <button
              id="qgiv-load-modal-89559"
              className="qgiv-load-modal qgiv-sponsor-btn"
              data-event-url="https://secure.qgiv.com/for/ibt/event/1003121/embed/89559/"
              data-embed-id="89559"
              data-event-name="SAME SHORE. EVERY MONTH. — Coastal Care at Venice Fishing Pier"
            >
              Sponsor The Movement
            </button>
          </div>
          <Script
            id="qgiv-embedjs"
            src="https://secure.qgiv.com/resources/core/js/embed.js"
            strategy="lazyOnload"
          />
        </section>
      )}

      {slug === 'back-2-school' && (
        <section style={{
          background: "#000",
          padding: "clamp(60px, 8vw, 100px) clamp(32px, 5vw, 80px)",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: "var(--content-max)", margin: "0 auto" }}>
            <AnimatedHeadline
              text="7th Annual Back 2 School Festival"
              as="h2"
              size="section"
              color="#FFC700"
            />
            <p style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--body-md)",
              color: "#FFF",
              fontWeight: 700,
              marginTop: 16,
              marginBottom: 40,
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}>
              Every child deserves to start the year with dignity.
            </p>
            <style>{`
              .qgiv-sponsor-btn {
                background: #FFC700 !important;
                font-family: var(--font-body) !important;
                text-align: center !important;
                font-size: 1.125rem !important;
                font-weight: bold !important;
                text-decoration: none !important;
                color: #000 !important;
                border-radius: 16px !important;
                border: none !important;
                cursor: pointer !important;
                padding: 16px 40px !important;
                max-width: 300px !important;
                margin: 0 auto !important;
                letter-spacing: 0.1em !important;
                text-transform: uppercase !important;
              }
              .qgiv-sponsor-btn:hover {
                filter: brightness(0.85);
              }
            `}</style>
            <button
              id="qgiv-load-modal-89560"
              className="qgiv-load-modal qgiv-sponsor-btn"
              data-event-url="https://secure.qgiv.com/for/ibt/event/1003120/embed/89560/"
              data-embed-id="89560"
              data-event-name="7th Annual Back 2 School Festival"
            >
              Become a Sponsor
            </button>
          </div>
          <Script
            id="qgiv-embedjs"
            src="https://secure.qgiv.com/resources/core/js/embed.js"
            strategy="lazyOnload"
          />
        </section>
      )}

      <Footer />
    </main>
  )
}
