import { getPrograms, getPillars } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import HomePageClient from '@/components/sections/HomePageClient'
import { PROGRAM_HOVER_VIDEO } from '@/lib/data/video-urls'

/* ═══════════════════════════════════════
   Programs that should NOT appear on homepage
   (gala didn't happen, incubation is internal)
═══════════════════════════════════════ */
const HIDDEN_PROGRAMS = ['gala', 'incubation-academy']

/* Override Sanity hero images for programs with wrong photos */
const PROGRAM_IMAGE_OVERRIDE: Record<string, string> = {
  'community-builder-linkups': '/images/b2s/_D5A7155.jpg',
  'community-health': '/images/wellness/IMG_9922.jpg',
  'wellness': '/images/wellness/IMG_1610.jpg',
  'coastal-care': '/images/coastal/IMG_4838.jpg',
}

/* Local gallery images — curated, no duplicates */
const LOCAL_GALLERY_IMAGES = [
  { src: '/images/gallery/IMG_1848.jpg', title: 'Coastal Care Cleanup', program: 'Coastal Care' },
  { src: '/images/gallery/IMG_1807.jpg', title: 'Community Wellness', program: 'Wellness' },
  { src: '/images/gallery/IMG_1673.jpg', title: 'Community Builders', program: 'Community' },
  { src: '/images/gallery/IMG_4649.jpg', title: 'Volunteer Activation', program: 'Volunteers' },
  { src: '/images/gallery/IMG_4687.jpg', title: 'Beach Yoga', program: 'Wellness' },
  { src: '/images/gallery/IMG_1324.jpg', title: 'Community Connection', program: 'Events' },
  { src: '/images/gallery/IMG_1501.jpg', title: 'Community Service', program: 'Volunteers' },
  { src: '/images/b2s/_D5A7224.jpg', title: 'Back to School 2025', program: 'B2S' },
  { src: '/images/b2s/6D5A0783.jpg', title: 'B2S Festival Energy', program: 'B2S' },
  { src: '/images/school/IMG_5629.jpg', title: 'Youth Programming', program: 'Youth' },
  { src: '/images/school/IMG_4674.jpg', title: 'School Activations', program: 'Youth' },
  { src: '/images/wellness/IMG_0279.jpg', title: 'Beach Wellness', program: 'Wellness' },
  { src: '/images/fire-relief/IMG_5406.jpg', title: 'Fire Relief Response', program: 'Crisis' },
  { src: '/images/fire-relief/IMG_5508.jpg', title: 'Rebuilding Together', program: 'Crisis' },
  { src: '/images/coastal/IMG_0267.jpg', title: 'Coastal Cleanup Day', program: 'Coastal Care' },
  { src: '/images/b2s/_D5A5912.jpg', title: 'B2S Community', program: 'B2S' },
]

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

const PILLAR_PROGRAM_MAP: Record<string, string> = {
  'Crisis & Disaster Stabilization': 'fire-relief',
  'School & Youth Stability': 'youth-programming',
  'Community Health & Resource Access': 'community-health',
}

/* ═══════════════════════════════════════
   HOMEPAGE — Server Component
   Fetches Sanity data, passes to client
═══════════════════════════════════════ */

export default async function HomePage() {
  const [sanityPrograms, sanityPillars] = await Promise.all([
    getPrograms().catch(() => []),
    getPillars().catch(() => []),
  ])

  /* Hero images from programs */
  const heroImages = sanityPrograms
    .filter((p: { heroImage?: unknown; slug: string }) => p.heroImage && !HIDDEN_PROGRAMS.includes(p.slug))
    .slice(0, 5)
    .map((p: { heroImage: unknown; title: string }) => ({
      src: urlFor(p.heroImage).width(1920).quality(85).url(),
      alt: `IBTU — ${p.title}`,
    }))
  const fallbackHeroImages = LOCAL_GALLERY_IMAGES.slice(0, 5).map(g => ({ src: g.src, alt: g.title }))
  const finalHeroImages = heroImages.length > 0 ? heroImages : fallbackHeroImages

  /* Mosaic items for editorial photo grid */
  const mosaicItems = sanityPrograms
    .filter((p: { heroImage?: unknown; slug: string }) => p.heroImage && !HIDDEN_PROGRAMS.includes(p.slug))
    .flatMap((p: { heroImage?: unknown; cardImages?: unknown[]; title: string }) => {
      const items: { src: string; alt: string; type: 'image' }[] = []
      if (p.heroImage) {
        items.push({
          src: urlFor(p.heroImage).width(800).quality(80).url(),
          alt: `IBTU — ${p.title}`,
          type: 'image',
        })
      }
      if (p.cardImages) {
        p.cardImages.slice(0, 1).forEach((img: unknown) => {
          if (img) {
            items.push({
              src: urlFor(img).width(600).quality(80).url(),
              alt: `${p.title}`,
              type: 'image',
            })
          }
        })
      }
      return items
    })
    .slice(0, 8)
  const finalMosaic = mosaicItems.length >= 6
    ? mosaicItems
    : [...mosaicItems, ...LOCAL_GALLERY_IMAGES.slice(0, 12 - mosaicItems.length).map(g => ({ src: g.src, alt: g.title, type: 'image' as const }))].slice(0, 12)

  /* Pillar cards */
  const pillarCards = sanityPillars.length
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

  /* Stats */
  const stats = [
    { target: 62475, suffix: '+', label: 'Students Served' },
    { target: 5000, suffix: '+', label: 'Families Stabilized' },
    { target: 875500, suffix: '+', label: 'Lbs Food Distributed' },
    { target: 300, suffix: '+', label: 'Partners & Sponsors' },
  ]

  /* Program cards — filtered, with image overrides */
  const programCards = sanityPrograms
    .filter((p: { slug: string }) => !HIDDEN_PROGRAMS.includes(p.slug))
    .map((p: { slug: string; title: string; pillar: string; heroImage?: unknown; cardStat?: string; tagline?: string }) => ({
      slug: p.slug,
      title: p.title,
      pillar: p.pillar,
      heroImage: PROGRAM_IMAGE_OVERRIDE[p.slug] || (p.heroImage ? urlFor(p.heroImage).width(800).quality(85).url() : ''),
      cardStat: p.cardStat || '',
      description: p.tagline || '',
      hoverVideo: PROGRAM_HOVER_VIDEO[p.slug] || '',
    }))

  /* Gallery items */
  const sanityGalleryItems = sanityPrograms
    .filter((p: { heroImage?: unknown; slug: string }) => p.heroImage && !HIDDEN_PROGRAMS.includes(p.slug))
    .map((p: { heroImage: unknown; title: string; pillar: string }) => ({
      src: urlFor(p.heroImage).width(600).quality(80).url(),
      title: p.title,
      program: p.pillar,
    }))
  return (
    <HomePageClient
      heroImages={finalHeroImages}
      mosaicItems={finalMosaic}
      pillars={pillarCards}
      stats={stats}
      programCards={programCards}
      tickerPhrases={TICKER_PHRASES}
    />
  )
}
