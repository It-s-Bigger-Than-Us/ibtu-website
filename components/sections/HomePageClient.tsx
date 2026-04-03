'use client'

import dynamic from 'next/dynamic'
import GoldTicker from '@/components/sections/GoldTicker'
import HeroReveal from '@/components/sections/HeroReveal'
import Footer from '@/components/layout/Footer'
import ProgramCarousel3D from '@/components/sections/ProgramCarousel3D'
import PillarTabs from '@/components/sections/PillarTabs'
import HeroGallery from '@/components/sections/HeroGallery'

const ShortPlaceholder = () => <div style={{ minHeight: '300px', background: '#000' }} />
const MissionCard = dynamic(() => import('@/components/sections/MissionCard'), { ssr: false, loading: ShortPlaceholder })
const PillarCubes = dynamic(() => import('@/components/sections/PillarCubes'), { ssr: false, loading: ShortPlaceholder })
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false, loading: ShortPlaceholder })
const SponsorPanel = dynamic(() => import('@/components/sections/SponsorPanel'), { ssr: false })

interface Program {
  slug: string
  title: string
  pillar: string
  heroImage: string
  description?: string
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
  stats,
  tickerPhrases,
}: HomePageClientProps) {
  return (
    <main>
      {/* 1. Hero */}
      <HeroReveal />

      {/* 1b. Hero Gallery — revealed by logo zoom */}
      <HeroGallery />

      {/* 2. Values Ticker */}
      <GoldTicker phrases={tickerPhrases} speed={60} />

      {/* 3. Mission — typewriter effect */}
      <MissionCard />

      {/* 4. What We Do — tabbed pillars (yellow bg) */}
      <PillarTabs />

      {/* 5. Impact Pillars + Stats (sky bg) */}
      <PillarCubes stats={stats} />

      {/* 6. Program Cards — 3D Gradient Carousel */}
      <ProgramCarousel3D programs={programCards.length > 0 ? programCards : [
        { slug: 'fire-relief', title: 'Fire Relief & The Hub', pillar: 'Crisis & Disaster Stabilization', heroImage: '/images/gallery/IMG_1311.jpg' },
        { slug: 'back-2-school', title: 'Back 2 School Festival', pillar: 'Community Health & Resource Access', heroImage: '/images/b2s/_D5A7392.jpg' },
        { slug: 'youth-programming', title: 'Youth Programming', pillar: 'School & Youth Stability', heroImage: '/images/school/IMG_5608.jpg' },
        { slug: 'coastal-care', title: 'Coastal Care', pillar: 'Community Health & Resource Access', heroImage: '/images/coastal/IMG_4838.jpg' },
        { slug: 'wellness', title: 'Wellness & Health', pillar: 'Community Health & Resource Access', heroImage: '/images/wellness/IMG_1610.jpg' },
        { slug: 'giving-season', title: 'Giving Season', pillar: 'Community Health & Resource Access', heroImage: '/images/b2s/6D5A0765.jpg' },
        { slug: 'community-health', title: 'Community Health', pillar: 'Community Health & Resource Access', heroImage: '/images/wellness/IMG_9922.jpg' },
      ]} />

      {/* 7. CTA */}
      <CTASection />

      {/* 8. Footer */}
      <Footer />

      {/* Sponsor Panel */}
      <SponsorPanel />
    </main>
  )
}
