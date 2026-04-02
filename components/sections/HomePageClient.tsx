'use client'

import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import HeroReveal from '@/components/sections/HeroReveal'
import Footer from '@/components/layout/Footer'
import GalleryCarousel3D from '@/components/sections/GalleryCarousel3D'

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
      {/* 1. Hero — "It's Bigger Than Us" text → logo → gallery reveal */}
      <HeroReveal />

      {/* 2. Values Ticker */}
      <GoldTicker phrases={tickerPhrases} speed={35} />

      {/* 3. Mission Card — "Our Mission" with skyline */}
      <MissionCard />

      {/* 4. Why We Exist */}
      <MissionSplit
        headline="Why We Exist"
        body="Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design."
        media={missionMedia}
      />

      {/* 5. Pillar Cubes + Stats */}
      <PillarCubes stats={stats} />

      {/* 6. Programs Grid */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* 7. Photo Gallery — 3D Carousel */}
      <GalleryCarousel3D />

      {/* 8. CTA */}
      <CTASection />

      {/* 8. Footer */}
      <Footer />

      {/* Sponsor Panel */}
      <SponsorPanel />
    </main>
  )
}
