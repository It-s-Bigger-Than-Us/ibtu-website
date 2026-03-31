'use client'

import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import Footer from '@/components/layout/Footer'

const CinematicHero = dynamic(() => import('@/components/sections/CinematicHero'), { ssr: false })
const MissionSplit = dynamic(() => import('@/components/sections/MissionSplit'), { ssr: false })
const ImpactReveal = dynamic(() => import('@/components/sections/ImpactReveal'), { ssr: false })
const ProgramsGrid = dynamic(() => import('@/components/sections/ProgramsGrid'), { ssr: false })
const ConstellationGallery = dynamic(() => import('@/components/sections/ConstellationGallery'), { ssr: false })
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false })
const SponsorPanel = dynamic(() => import('@/components/sections/SponsorPanel'), { ssr: false })
const CommunityRibbon = dynamic(() => import('@/components/3d/CommunityRibbon'), { ssr: false })

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  cardStat?: string
  description?: string
  hoverVideo?: string
}

interface GalleryItem {
  src: string
  title?: string
  program?: string
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
  galleryItems: GalleryItem[]
  heroVideo: string
  missionMedia: Array<{ type: 'image' | 'video'; src: string; alt?: string }>
  pillars: Pillar[]
  stats: StatItem[]
  tickerPhrases: string[]
}

export default function HomePageClient({
  programCards,
  galleryItems,
  heroVideo,
  missionMedia,
  pillars,
  stats,
  tickerPhrases,
}: HomePageClientProps) {
  return (
    <main>
      {/* 1. Cinematic Hero — 4-phase pinned scroll sequence */}
      <CinematicHero
        videoSrc={heroVideo}
        photoLeft="/images/b2s/_D5A7392.jpg"
        photoRight="/images/coastal/IMG_0024.jpg"
      />

      {/* 2. Values Ticker — gold bg, LOT font, star separators */}
      <GoldTicker phrases={tickerPhrases} speed={35} />

      {/* 3. Mission Split — sticky 50/50 with media swaps */}
      <MissionSplit
        headline="Why We Exist"
        body="Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design."
        media={missionMedia}
      />

      {/* 4. Impact Reveal — shrinking headline + pillar cards + stat cards */}
      <ImpactReveal pillars={pillars} stats={stats} />

      {/* 5. 3D Community Ribbon — iridescent divider */}
      <CommunityRibbon />

      {/* 5b. Values Ticker — second instance */}
      <GoldTicker
        phrases={['Community', 'Infrastructure', 'Resilience', 'Access', 'Dignity', 'Equity', 'Stability', 'Trust']}
        speed={25}
        separator="★"
      />

      {/* 6. Programs Grid — fold-out cards with holo borders + video hover */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* 7. 3D Constellation Gallery */}
      {galleryItems.length > 0 && (
        <ConstellationGallery
          items={galleryItems}
          title="(EXPLORE OUR IMPACT)"
        />
      )}

      {/* 8. CTA — gold bg, sparkle + holo buttons */}
      <CTASection />

      {/* 9. Footer — sacred mantra, LA skyline, social icons */}
      <Footer />

      {/* Sponsor Panel — fixed right-edge tab */}
      <SponsorPanel />
    </main>
  )
}
