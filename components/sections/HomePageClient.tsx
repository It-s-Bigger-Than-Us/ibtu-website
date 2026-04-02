'use client'

import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import HeroReveal from '@/components/sections/HeroReveal'
import Footer from '@/components/layout/Footer'
import GalleryCarousel3D from '@/components/sections/GalleryCarousel3D'
import IridescentLogoTransition from '@/components/ui/IridescentLogoTransition'

const ShortPlaceholder = () => <div style={{ minHeight: '300px', background: '#000' }} />
const MissionCard = dynamic(() => import('@/components/sections/MissionCard'), { ssr: false, loading: ShortPlaceholder })
const MissionSplit = dynamic(() => import('@/components/sections/MissionSplit'), { ssr: false, loading: ShortPlaceholder })
const PillarCubes = dynamic(() => import('@/components/sections/PillarCubes'), { ssr: false, loading: ShortPlaceholder })
// ProgramsGrid replaced by GalleryCarousel3D on homepage
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false, loading: ShortPlaceholder })
const SponsorPanel = dynamic(() => import('@/components/sections/SponsorPanel'), { ssr: false })

interface StatItem {
  value: number
  suffix?: string
  label: string
}

interface HomePageClientProps {
  programCards?: unknown[]
  missionMedia: Array<{ type: 'image' | 'video'; src: string; alt?: string }>
  stats: StatItem[]
  tickerPhrases: string[]
}

export default function HomePageClient({
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

      {/* Iridescent logo transition between sections */}
      <div style={{
        background: '#FFC700',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(40px, 6vw, 80px) 0',
      }}>
        <IridescentLogoTransition size={120} duration={4} autoPlay />
      </div>

      {/* 6. 3D Photo Gallery — replaces ProgramsGrid */}
      <GalleryCarousel3D />

      {/* 8. CTA */}
      <CTASection />

      {/* 9. Footer */}
      <Footer />

      {/* Sponsor Panel */}
      <SponsorPanel />
    </main>
  )
}
