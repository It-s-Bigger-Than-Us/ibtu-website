'use client'

import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import HeroReveal from '@/components/sections/HeroReveal'
import Footer from '@/components/layout/Footer'
import FloatingShapes from '@/components/ui/FloatingShapes'

const ShortPlaceholder = () => <div style={{ minHeight: '300px', background: '#000' }} />
const MissionCard = dynamic(() => import('@/components/sections/MissionCard'), { ssr: false, loading: ShortPlaceholder })
const MissionSplit = dynamic(() => import('@/components/sections/MissionSplit'), { ssr: false, loading: ShortPlaceholder })
const PillarCubes = dynamic(() => import('@/components/sections/PillarCubes'), { ssr: false, loading: ShortPlaceholder })
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

interface StatItem {
  value: number
  suffix?: string
  label: string
}

interface HomePageClientProps {
  programCards: Program[]
  missionMedia: Array<{ type: 'image' | 'video'; src: string; alt?: string }>
  stats: StatItem[]
  tickerPhrases: string[]
}

export default function HomePageClient({
  programCards,
  missionMedia,
  stats,
  tickerPhrases,
}: HomePageClientProps) {
  return (
    <main>
      {/* 1. Hero — "It's Bigger Than Us" text -> logo -> gallery reveal */}
      <HeroReveal />

      {/* 2. Values Ticker */}
      <GoldTicker phrases={tickerPhrases} speed={35} />

      {/* Floating shapes transition — gold on black */}
      <FloatingShapes count={6} seed={1} height="100px" bgColor="#000" />

      {/* 3. Mission Card — "Our Mission" with skyline */}
      <MissionCard />

      {/* Floating shapes transition — black bg */}
      <FloatingShapes count={5} seed={2} height="80px" bgColor="#000" />

      {/* 4. Why We Exist */}
      <MissionSplit
        headline="Why We Exist"
        body="Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design."
        media={missionMedia}
      />

      {/* Floating shapes transition — into pillars */}
      <FloatingShapes count={7} seed={3} height="100px" bgColor="#FFC700" />

      {/* 4. Pillar Cubes + Stats */}
      <PillarCubes stats={stats} />

      {/* Floating shapes transition — into programs */}
      <FloatingShapes count={6} seed={4} height="80px" bgColor="#000" />

      {/* 5. Programs Grid */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* Floating shapes transition — into CTA */}
      <FloatingShapes count={5} seed={5} height="100px" bgColor="#FFC700" />

      {/* 6. CTA */}
      <CTASection />

      {/* 7. Footer */}
      <Footer />

      {/* Sponsor Panel */}
      <SponsorPanel />
    </main>
  )
}
