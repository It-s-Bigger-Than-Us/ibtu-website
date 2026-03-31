import { getPrograms, getPillars } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import HomePageClient from '@/components/sections/HomePageClient'

/* ═══════════════════════════════════════
   LOCAL MEDIA — videos and photos from /public
   Organized by program, pillar, and purpose
═══════════════════════════════════════ */

const HERO_VIDEO = '/videos/site-clips/homepage-hero/landscape/hero-venice-energy1.mp4'

const MISSION_MEDIA = [
  { type: 'image' as const, src: '/images/b2s/_D5A7392.jpg', alt: 'Back to School community event' },
  { type: 'video' as const, src: '/videos/site-clips/pillar-youth/landscape/youth-baldwin-hills.mp4', alt: 'Youth programming' },
  { type: 'image' as const, src: '/images/coastal/IMG_0024.jpg', alt: 'Coastal Care beach cleanup' },
  { type: 'video' as const, src: '/videos/site-clips/pillar-crisis/landscape/crisis-rebuild-teaser.mp4', alt: 'Crisis response' },
]

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

const STATS = [
  { value: 62475, suffix: '+', label: 'Students Served' },
  { value: 5000, suffix: '+', label: 'Families Stabilized' },
  { value: 875500, suffix: '+', label: 'Lbs Food Distributed' },
  { value: 300, suffix: '+', label: 'Partners & Sponsors' },
  { value: 34, label: 'School Sites' },
  { value: 7500, suffix: '+', label: 'Volunteers Mobilized' },
]

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
   Fetches Sanity data, passes to client wrapper
═══════════════════════════════════════ */

export default async function HomePage() {
  const [sanityPrograms] = await Promise.all([
    getPrograms().catch(() => []),
    getPillars().catch(() => []),
  ])

  const programCards = sanityPrograms.map((p: { slug: string; title: string; pillar: string; heroImage?: unknown; cardStat?: string; tagline?: string }) => ({
    slug: p.slug,
    title: p.title,
    pillar: p.pillar,
    heroImage: p.heroImage ? urlFor(p.heroImage).width(800).quality(85).url() : '',
    cardStat: p.cardStat || '',
    description: p.tagline || '',
    hoverVideo: PROGRAM_VIDEO_MAP[p.slug] || '',
  }))

  const sanityGalleryItems = sanityPrograms
    .filter((p: { heroImage?: unknown }) => p.heroImage)
    .map((p: { heroImage: unknown; title: string; pillar: string }) => ({
      src: urlFor(p.heroImage).width(600).quality(80).url(),
      title: p.title,
      program: p.pillar,
    }))

  const galleryItems = [...sanityGalleryItems, ...GALLERY_ITEMS].slice(0, 24)

  return (
    <HomePageClient
      programCards={programCards}
      galleryItems={galleryItems}
      heroVideo={HERO_VIDEO}
      missionMedia={MISSION_MEDIA}
      pillars={PILLARS}
      stats={STATS}
      tickerPhrases={TICKER_PHRASES}
    />
  )
}
