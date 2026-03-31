import { getPrograms, getPillars } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import Footer from '@/components/layout/Footer'

/* ═══════════════════════════════════════
   Client-side components (animations, Three.js, events)
   Dynamic imports for code splitting
═══════════════════════════════════════ */
const CinematicHero = dynamic(() => import('@/components/sections/CinematicHero'), { ssr: false })
const MissionSplit = dynamic(() => import('@/components/sections/MissionSplit'), { ssr: false })
const ImpactReveal = dynamic(() => import('@/components/sections/ImpactReveal'), { ssr: false })
const ProgramsGrid = dynamic(() => import('@/components/sections/ProgramsGrid'), { ssr: false })
const ConstellationGallery = dynamic(() => import('@/components/sections/ConstellationGallery'), { ssr: false })
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false })
const SponsorPanel = dynamic(() => import('@/components/sections/SponsorPanel'), { ssr: false })

/* ═══════════════════════════════════════
   LOCAL MEDIA — videos and photos from /public
   Organized by program, pillar, and purpose
═══════════════════════════════════════ */

// Hero video
const HERO_VIDEO = '/videos/site-clips/homepage-hero/landscape/hero-venice-energy1.mp4'

// Mission section media — swapping panels
const MISSION_MEDIA = [
  { type: 'image' as const, src: '/images/b2s/_D5A7392.jpg', alt: 'Back to School community event' },
  { type: 'video' as const, src: '/videos/site-clips/pillar-youth/landscape/youth-baldwin-hills.mp4', alt: 'Youth programming' },
  { type: 'image' as const, src: '/images/coastal/IMG_0024.jpg', alt: 'Coastal Care beach cleanup' },
  { type: 'video' as const, src: '/videos/site-clips/pillar-crisis/landscape/crisis-rebuild-teaser.mp4', alt: 'Crisis response' },
]

// Impact pillar cards — one per pillar with video hover
const PILLARS = [
  {
    name: 'Crisis & Disaster',
    stat: '5,000+',
    statLabel: 'Families Stabilized',
    imageSrc: '/images/fire-relief/IMG_5382.jpg',
    videoSrc: '/videos/site-clips/program-fire-relief/landscape/fire-highlight1.mp4',
  },
  {
    name: 'School & Youth',
    stat: '62,475+',
    statLabel: 'Students Served',
    imageSrc: '/images/school/IMG_5608.jpg',
    videoSrc: '/videos/site-clips/pillar-youth/landscape/youth-wright-school.mp4',
  },
  {
    name: 'Community Health',
    stat: '875,500+',
    statLabel: 'Lbs Food Distributed',
    imageSrc: '/images/wellness/IMG_0007.jpg',
    videoSrc: '/videos/site-clips/pillar-health/landscape/health-beach1.mp4',
  },
]

// Stat cards — 6 key metrics
const STATS = [
  { value: 62475, suffix: '+', label: 'Students Served' },
  { value: 5000, suffix: '+', label: 'Families Stabilized' },
  { value: 875500, suffix: '+', label: 'Lbs Food Distributed' },
  { value: 300, suffix: '+', label: 'Partners & Sponsors' },
  { value: 34, label: 'School Sites' },
  { value: 7500, suffix: '+', label: 'Volunteers Mobilized' },
]

// Gallery images for constellation — curated from all programs
const GALLERY_ITEMS = [
  { src: '/images/gallery/IMG_1848.jpg', title: 'Coastal Care Cleanup', program: 'Coastal Care' },
  { src: '/images/gallery/IMG_4993.jpg', title: 'Beach Volunteers', program: 'Coastal Care' },
  { src: '/images/gallery/IMG_1807.jpg', title: 'Community Wellness', program: 'Wellness' },
  { src: '/images/gallery/IMG_4960.jpg', title: 'Yoga Programming', program: 'Wellness' },
  { src: '/images/gallery/IMG_1673.jpg', title: 'Community Builders', program: 'Community' },
  { src: '/images/gallery/IMG_4649.jpg', title: 'Volunteer Activation', program: 'Volunteers' },
  { src: '/images/gallery/IMG_1861.jpg', title: 'Beach Impact', program: 'Coastal Care' },
  { src: '/images/gallery/IMG_4687.jpg', title: 'Yoga Gathering', program: 'Wellness' },
  { src: '/images/gallery/IMG_1324.jpg', title: 'Community Connection', program: 'Events' },
  { src: '/images/gallery/IMG_4907.jpg', title: 'Outdoor Wellness', program: 'Wellness' },
  { src: '/images/gallery/IMG_1501.jpg', title: 'Community Service', program: 'Volunteers' },
  { src: '/images/gallery/IMG_4944.jpg', title: 'Wellness Activation', program: 'Wellness' },
  { src: '/images/b2s/_D5A7224.jpg', title: 'Back to School', program: 'B2S' },
  { src: '/images/b2s/2V8A1964.jpg', title: 'School Supplies', program: 'B2S' },
  { src: '/images/coastal/IMG_0267.jpg', title: 'Coastal Cleanup', program: 'Coastal Care' },
  { src: '/images/coastal/IMG_1796.jpg', title: 'Beach Community', program: 'Coastal Care' },
  { src: '/images/school/IMG_5629.jpg', title: 'School Programs', program: 'Youth' },
  { src: '/images/volunteer/IMG_1589.jpg', title: 'Volunteer Day', program: 'Volunteers' },
  { src: '/images/wellness/IMG_0279.jpg', title: 'Beach Wellness', program: 'Wellness' },
  { src: '/images/fire-relief/IMG_5406.jpg', title: 'Fire Relief', program: 'Crisis' },
]

// Ticker phrases
const TICKER_PHRASES = [
  'Community is the Infrastructure',
  'Designed with Dignity',
  'We Listen. We Build. We Stay.',
  'Resilience',
  'Access',
  'Equity',
  'Stability',
  'Trust',
  '62,475+ Students Served',
  'Los Angeles',
]

// Program-to-video mapping for hover clips
const PROGRAM_VIDEO_MAP: Record<string, string> = {
  'fire-relief': '/videos/site-clips/program-fire-relief/landscape/fire-rebuild1.mp4',
  'youth-programming': '/videos/site-clips/program-youth/landscape/youth-bhes1.mp4',
  'back-to-school': '/videos/site-clips/program-b2s/landscape/b2s-venice1.mp4',
  'coastal-care': '/videos/site-clips/program-coastal/landscape/coastal-cleanup1.mp4',
  'community-health': '/videos/site-clips/program-community-health/landscape/ch-mlk-parade1.mp4',
  'giving-season': '/videos/site-clips/program-giving/landscape/gs-cd8-event.mp4',
  'wellness': '/videos/site-clips/program-wellness/landscape/well-yoga-beach1.mp4',
}

/* ═══════════════════════════════════════
   HOMEPAGE — Server Component
   Fetches Sanity data, passes to client sections
═══════════════════════════════════════ */

export default async function HomePage() {
  const [sanityPrograms, sanityPillars] = await Promise.all([
    getPrograms().catch(() => []),
    getPillars().catch(() => []),
  ])

  /* Program cards with Sanity data + local video fallbacks */
  const programCards = sanityPrograms.map((p: { slug: string; title: string; pillar: string; heroImage?: unknown; cardStat?: string; tagline?: string; hoverVideoClip?: { asset?: unknown } }) => ({
    slug: p.slug,
    title: p.title,
    pillar: p.pillar,
    heroImage: p.heroImage ? urlFor(p.heroImage).width(800).quality(85).url() : '',
    cardStat: p.cardStat || '',
    description: p.tagline || '',
    hoverVideo: PROGRAM_VIDEO_MAP[p.slug] || '',
  }))

  /* Constellation gallery — mix Sanity images + local images */
  const sanityGalleryItems = sanityPrograms
    .filter((p: { heroImage?: unknown }) => p.heroImage)
    .map((p: { heroImage: unknown; title: string; pillar: string; slug: string }) => ({
      src: urlFor(p.heroImage).width(600).quality(80).url(),
      title: p.title,
      program: p.pillar,
    }))

  const galleryItems = [
    ...sanityGalleryItems,
    ...GALLERY_ITEMS,
  ].slice(0, 24)

  return (
    <main>
      {/* 1. Cinematic Hero — 4-phase pinned scroll sequence */}
      <CinematicHero
        videoSrc={HERO_VIDEO}
        photoLeft="/images/b2s/_D5A7392.jpg"
        photoRight="/images/coastal/IMG_0024.jpg"
      />

      {/* 2. Values Ticker — gold bg, LOT font, star separators */}
      <GoldTicker phrases={TICKER_PHRASES} speed={35} />

      {/* 3. Mission Split — sticky 50/50 with media swaps */}
      <MissionSplit
        headline="Why We Exist"
        body="Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design."
        media={MISSION_MEDIA}
      />

      {/* 4. Impact Reveal — shrinking headline + pillar cards + stat cards */}
      <ImpactReveal
        pillars={PILLARS}
        stats={STATS}
      />

      {/* 5. Values Ticker — second instance between impact and programs */}
      <GoldTicker
        phrases={['Community', 'Infrastructure', 'Resilience', 'Access', 'Dignity', 'Equity', 'Stability', 'Trust']}
        speed={25}
        separator="★"
      />

      {/* 6. Programs Grid — fold-out cards with holo borders + video hover */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* 7. 3D Constellation Gallery — replaces OrbitalGallery */}
      {galleryItems.length > 0 && (
        <ConstellationGallery
          items={galleryItems}
          title="(EXPLORE OUR IMPACT)"
        />
      )}

      {/* 8. CTA — gold bg, sparkle + holo buttons */}
      <CTASection />

      {/* 9. Footer — sacred mantra, LA skyline, social icons */}
      <Footer />

      {/* Sponsor Panel — fixed right-edge tab (renders over everything) */}
      <SponsorPanel />
    </main>
  )
}
