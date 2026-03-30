import { getPrograms, getPillars } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import HeroSection from '@/components/sections/HeroSection'
import ValuesTicker from '@/components/sections/ValuesTicker'
import PillarCards from '@/components/sections/PillarCards'
import StatsSection from '@/components/sections/StatsSection'
import ProgramsGrid from '@/components/sections/ProgramsGrid'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/layout/Footer'

const HERO_METADATA = [
  { label: 'Founded', value: '2020' },
  { label: 'Based', value: 'Los Angeles' },
  { label: 'Served', value: '62,475+' },
  { label: 'Pillars', value: 'Three' },
]

const VALUES = [
  'Community', 'Infrastructure', 'Resilience', 'Access',
  'Dignity', 'Equity', 'Stability', 'Trust',
]

const STATS = [
  { target: 62475, suffix: '+', label: 'Students Served' },
  { target: 5000, suffix: '+', label: 'Families Stabilized' },
  { target: 875500, suffix: '+', label: 'Lbs Food Distributed' },
  { target: 300, suffix: '+', label: 'Partners & Sponsors' },
]

const CTA_ACTIONS = [
  { label: 'Volunteer', href: '/get-involved#volunteer', primary: true },
  { label: 'Donate', href: '/donate', primary: true },
  { label: 'Partner With Us', href: '/get-involved#partner' },
  { label: 'Sponsor', href: '/get-involved#sponsor' },
]

/* Pillar-to-program slug mapping for images */
const PILLAR_PROGRAM_MAP: Record<string, string> = {
  'Crisis & Disaster Stabilization': 'fire-relief',
  'School & Youth Stability': 'youth-programming',
  'Community Health & Resource Access': 'community-health',
}

export default async function HomePage() {
  /* ── Fetch from Sanity ── */
  const [sanityPrograms, sanityPillars] = await Promise.all([
    getPrograms().catch(() => []),
    getPillars().catch(() => []),
  ])

  /* ── Build hero images from program hero images ── */
  const heroImages = sanityPrograms
    .filter((p: { heroImage?: unknown }) => p.heroImage)
    .slice(0, 5)
    .map((p: { heroImage: unknown; title: string }) => ({
      src: urlFor(p.heroImage).width(1920).quality(85).url(),
      alt: `IBTU — ${p.title}`,
    }))

  /* ── Build pillar cards ── */
  const pillars = sanityPillars.length
    ? sanityPillars.map((p: { pillarName: string; tagline?: string; pageDescription?: string; headlineStat?: string }) => {
        const programSlug = PILLAR_PROGRAM_MAP[p.pillarName]
        const matchedProgram = sanityPrograms.find(
          (prog: { slug: string; pillar: string }) => prog.slug === programSlug || prog.pillar === p.pillarName
        )
        return {
          title: p.pillarName,
          tagline: p.tagline || p.pageDescription || '',
          stat: p.headlineStat || '',
          image: matchedProgram?.heroImage
            ? urlFor(matchedProgram.heroImage).width(800).quality(80).url()
            : '',
        }
      })
    : []

  /* ── Build program cards ── */
  const programCards = sanityPrograms.map((p: { slug: string; title: string; pillar: string; heroImage?: unknown; cardStat?: string }) => ({
    slug: p.slug,
    title: p.title,
    pillar: p.pillar,
    heroImage: p.heroImage ? urlFor(p.heroImage).width(800).quality(80).url() : '',
    cardStat: p.cardStat || '',
  }))

  /* ── Photo break + CTA images from programs ── */
  const photoBreakSrc = sanityPrograms[1]?.heroImage
    ? urlFor(sanityPrograms[1].heroImage).width(1920).quality(85).url()
    : ''
  const ctaImageSrc = sanityPrograms[0]?.cardImages?.[1]
    ? urlFor(sanityPrograms[0].cardImages[1]).width(1920).quality(80).url()
    : sanityPrograms[2]?.heroImage
      ? urlFor(sanityPrograms[2].heroImage).width(1920).quality(80).url()
      : ''

  return (
    <main>
      {/* 1. Hero */}
      <HeroSection
        images={heroImages}
        headline="Community is the infrastructure"
        metadata={HERO_METADATA}
      />

      {/* 2. Values Ticker */}
      <ValuesTicker values={VALUES} speed={25} />

      {/* 3. Pillars */}
      {pillars.length > 0 && <PillarCards pillars={pillars} />}

      {/* 4. Impact Stats */}
      <StatsSection stats={STATS} />

      {/* 5. Photo Break */}
      {photoBreakSrc && (
        <div className="photo-break">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoBreakSrc} alt="IBTU community in action" loading="lazy" />
        </div>
      )}

      {/* 6. Programs */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* 7. Get Involved CTA */}
      <CTASection
        image={ctaImageSrc}
        headline="Join the movement"
        subtext="Community is the infrastructure. Whether you volunteer, donate, partner, or sponsor — you become part of the foundation."
        actions={CTA_ACTIONS}
      />

      {/* 8. Footer */}
      <Footer />
    </main>
  )
}
