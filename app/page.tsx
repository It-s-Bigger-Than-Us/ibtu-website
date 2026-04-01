import { getPrograms, getPillars } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import HomePageClient from '@/components/sections/HomePageClient'
import { PROGRAM_HOVER_VIDEO } from '@/lib/data/video-urls'

const HIDDEN_PROGRAMS = ['gala', 'incubation-academy']

const PROGRAM_IMAGE_OVERRIDE: Record<string, string> = {
  'community-builder-linkups': '/images/b2s/_D5A7155.jpg',
  'community-health': '/images/wellness/IMG_9922.jpg',
  'wellness': '/images/wellness/IMG_1610.jpg',
  'coastal-care': '/images/coastal/IMG_4838.jpg',
}


const MISSION_MEDIA = [
  { type: 'image' as const, src: '/images/b2s/_D5A7392.jpg', alt: 'Back to School community event' },
  { type: 'image' as const, src: '/images/landscape/IMG_5943.jpg', alt: 'IBTU community in action' },
  { type: 'image' as const, src: '/images/coastal/IMG_4838.jpg', alt: 'Coastal Care beach cleanup' },
  { type: 'image' as const, src: '/images/landscape/_D5A8515.jpg', alt: 'Youth programming' },
  { type: 'image' as const, src: '/images/wellness/IMG_9922.jpg', alt: 'Community yoga and wellness' },
  { type: 'image' as const, src: '/images/landscape/IMG_5683.jpg', alt: 'Community rebuilding together' },
]

const PILLARS = [
  {
    name: 'Crisis & Disaster',
    stat: '5,000+',
    statLabel: 'Families Stabilized',
    imageSrc: '/images/landscape/_D5A8999.jpg',
  },
  {
    name: 'School & Youth',
    stat: '62,475+',
    statLabel: 'Students Served',
    imageSrc: '/images/landscape/IMG_5727.jpg',
  },
  {
    name: 'Community Health',
    stat: '875,500+',
    statLabel: 'Lbs Food Distributed',
    imageSrc: '/images/landscape/IMG_1628.jpg',
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

export default async function HomePage() {
  const [sanityPrograms] = await Promise.all([
    getPrograms().catch(() => []),
    getPillars().catch(() => []),
  ])

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

  return (
    <HomePageClient
      programCards={programCards}
      missionMedia={MISSION_MEDIA}
      pillars={PILLARS}
      stats={STATS}
      tickerPhrases={TICKER_PHRASES}
    />
  )
}
