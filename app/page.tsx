import { getPrograms } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import HomePageClient from '@/components/sections/HomePageClient'
import { PROGRAM_HOVER_VIDEO } from '@/lib/data/video-urls'
import { HOME_PILLAR_VISUALS, HOME_PROGRAM_HEROES, HOME_EDITORIAL_IMAGES } from '@/lib/data/site-media'
import { VOLUNTEER_VIDEOS } from '@/lib/data/video-urls'

const HIDDEN_PROGRAMS = ['gala', 'incubation-academy', 'community-health', 'community-builder-linkups']

const PROGRAM_IMAGE_OVERRIDE: Record<string, string> = HOME_PROGRAM_HEROES

/* Title overrides — Sanity may have old names */
const PROGRAM_TITLE_OVERRIDE: Record<string, string> = {
  'youth-programming': 'School Program',
}


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
  const sanityPrograms = await getPrograms().catch(() => [])

  const programCards = sanityPrograms
    .filter((p: { slug: string }) => !HIDDEN_PROGRAMS.includes(p.slug))
    .map((p: { slug: string; title: string; pillar: string; heroImage?: unknown; cardStat?: string; tagline?: string }) => ({
      slug: p.slug,
      title: PROGRAM_TITLE_OVERRIDE[p.slug] || p.title,
      pillar: p.pillar,
      heroImage: PROGRAM_IMAGE_OVERRIDE[p.slug] || (p.heroImage ? urlFor(p.heroImage).width(800).quality(85).url() : '/images/school/IMG_4687.jpg'),
      cardStat: p.cardStat || '',
      description: p.tagline || '',
      hoverVideo: PROGRAM_HOVER_VIDEO[p.slug] || '',
    }))

  return (
    <HomePageClient
      programCards={programCards}
      missionMedia={[]}
      pillarVisuals={HOME_PILLAR_VISUALS}
      stats={STATS}
      tickerPhrases={TICKER_PHRASES}
      editorialImages={HOME_EDITORIAL_IMAGES}
      editorialVideoUrl={VOLUNTEER_VIDEOS.brentwoodTeam}
    />
  )
}
