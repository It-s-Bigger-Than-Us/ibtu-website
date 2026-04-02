'use client'

import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import Footer from '@/components/layout/Footer'
import SkylineTransition from '@/components/ui/SkylineTransition'

const SectionPlaceholder = () => <div style={{ minHeight: '100vh', background: '#000' }} />
const ShortPlaceholder = () => <div style={{ minHeight: '300px', background: '#000' }} />

const OrbitalGallery = dynamic(() => import('@/components/3d/OrbitalGallery'), { ssr: false, loading: SectionPlaceholder })
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
      {/* 1. Orbital Gallery — IS the hero. Starts at page top.
          Includes "It's Bigger Than Us" text + 3D logo + photo gallery */}
      <OrbitalGallery />

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

      {/* Skyline transition into Pillar Cubes */}
      <SkylineTransition flip bg="black" />

      {/* 4. Pillar Cubes + Stats */}
      <PillarCubes stats={stats} />

      {/* Skyline transition into Programs */}
      <SkylineTransition bg="black" />

      {/* 5. Programs Grid */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* Skyline transition into CTA */}
      <SkylineTransition flip bg="black" />

      {/* 6. CTA */}
      <CTASection />

      {/* 7. Footer */}
      <Footer />

      {/* Sponsor Panel */}
      <SponsorPanel />
    </main>
  )
}
