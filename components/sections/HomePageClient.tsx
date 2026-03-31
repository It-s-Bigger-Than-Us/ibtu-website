'use client'

import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import Footer from '@/components/layout/Footer'

const ShortPlaceholder = () => <div style={{ minHeight: '300px', background: '#000' }} />
const SectionPlaceholder = () => <div style={{ minHeight: '100vh', background: '#000' }} />

const HeroSection = dynamic(() => import('@/components/sections/HeroSection'), { ssr: false, loading: SectionPlaceholder })
const MissionMosaic = dynamic(() => import('@/components/sections/MissionMosaic'), { ssr: false, loading: ShortPlaceholder })
const PillarCards = dynamic(() => import('@/components/sections/PillarCards'), { ssr: false, loading: ShortPlaceholder })
const StatsSection = dynamic(() => import('@/components/sections/StatsSection'), { ssr: false, loading: ShortPlaceholder })
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
  title: string
  tagline: string
  stat: string
  image: string
}

interface StatItem {
  target: number
  suffix?: string
  label: string
}

interface HeroImage {
  src: string
  alt: string
}

interface MosaicItem {
  src: string
  alt: string
  type?: 'image' | 'video'
}

interface HomePageClientProps {
  heroImages: HeroImage[]
  mosaicItems: MosaicItem[]
  pillars: Pillar[]
  stats: StatItem[]
  programCards: Program[]
  tickerPhrases: string[]
}

export default function HomePageClient({
  heroImages,
  mosaicItems,
  pillars,
  stats,
  programCards,
  tickerPhrases,
}: HomePageClientProps) {
  return (
    <main>
      {/* 1. Hero — image carousel with LOT headline */}
      <HeroSection
        images={heroImages}
        headline="Community is the Infrastructure"
        metadata={[
          { label: 'Founded', value: '2020' },
          { label: 'Based', value: 'Los Angeles' },
          { label: 'Served', value: '62,475+' },
          { label: 'Pillars', value: 'Three' },
        ]}
      />

      {/* 2. Values Ticker — gold bg, black text, scrolling */}
      <GoldTicker phrases={tickerPhrases} speed={30} />

      {/* 3. Mission Mosaic — editorial photo grid */}
      {mosaicItems.length > 0 && (
        <MissionMosaic
          items={mosaicItems}
          headline="We Listen. We Build. We Stay."
          body="Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design."
        />
      )}

      {/* 4. Pillar Cards — big bold rows with hover reveals */}
      {pillars.length > 0 && <PillarCards pillars={pillars} />}

      {/* 5. Stats — gold cards with animated counters */}
      <StatsSection stats={stats} />

      {/* 6. Programs Grid — image above, gold text below, hover fold-out */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* 7. CTA — gold bg, black type */}
      <CTASection />

      {/* 8. Footer */}
      <Footer />

      {/* Sponsor Panel — fixed right-edge tab */}
      <SponsorPanel />
    </main>
  )
}
