'use client'

import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import Footer from '@/components/layout/Footer'

const SectionPlaceholder = () => <div style={{ minHeight: '100vh', background: '#000' }} />
const ShortPlaceholder = () => <div style={{ minHeight: '300px', background: '#000' }} />

const MissionSplit = dynamic(() => import('@/components/sections/MissionSplit'), { ssr: false, loading: SectionPlaceholder })
const PillarCubes = dynamic(() => import('@/components/sections/PillarCubes'), { ssr: false, loading: ShortPlaceholder })
const ImpactReveal = dynamic(() => import('@/components/sections/ImpactReveal'), { ssr: false, loading: SectionPlaceholder })
const ProgramsGrid = dynamic(() => import('@/components/sections/ProgramsGrid'), { ssr: false, loading: ShortPlaceholder })
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false, loading: ShortPlaceholder })
const SponsorPanel = dynamic(() => import('@/components/sections/SponsorPanel'), { ssr: false })

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  cardStat?: string
  description?: string
  hoverVideo?: string
}

interface Pillar {
  name: string
  stat: string
  statLabel: string
  videoSrc?: string
  imageSrc: string
}

interface StatItem {
  value: number
  suffix?: string
  label: string
}

interface HomePageClientProps {
  programCards: Program[]
  heroVideo?: string
  missionMedia: Array<{ type: 'image' | 'video'; src: string; alt?: string }>
  pillars: Pillar[]
  stats: StatItem[]
  tickerPhrases: string[]
}

export default function HomePageClient({
  programCards,
  missionMedia,
  pillars,
  stats,
  tickerPhrases,
}: HomePageClientProps) {
  return (
    <main>
      {/* 1. Values Ticker — gold bg, black text */}
      <GoldTicker phrases={tickerPhrases} speed={35} />

      {/* 3. Mission Split — sticky 50/50 with media swaps */}
      <MissionSplit
        headline="Why We Exist"
        body="Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design."
        media={missionMedia}
      />

      {/* 4. Pillar Cubes — 3D rotating cubes per pillar */}
      <PillarCubes />

      {/* 5. Impact Reveal — shrinking headline + stat cards */}
      <ImpactReveal pillars={pillars} stats={stats} />

      {/* 5. Programs Grid — fold-out cards with holo borders + video hover */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* 6. CTA — gold bg, sparkle + holo buttons */}
      <CTASection />

      {/* 7. Footer — sacred mantra, LA skyline */}
      <Footer />

      {/* Sponsor Panel — fixed right-edge tab */}
      <SponsorPanel />
    </main>
  )
}
