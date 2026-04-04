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
// SponsorPanel removed for now

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

      {/* 2. Hero Statement — approved wireframe copy */}
      <section style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 140px)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: '#FFC700',
            letterSpacing: '-0.02em',
            marginBottom: 32,
          }}>
            When Systems Fail, Communities Show Up.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(16px, 1.4vw, 22px)',
            color: '#FFF',
            lineHeight: 1.7,
            maxWidth: 720,
            fontWeight: 700,
            marginBottom: 40,
          }}>
            It&apos;s Bigger Than Us builds trusted, lasting programs in the places communities already are — schools, neighborhood hubs, community spaces. Everything we do starts by listening. Everything we build is designed with dignity. And we don&apos;t leave.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="/impact" style={{
              display: 'inline-block',
              background: '#FFC700',
              color: '#000',
              padding: '16px 40px',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              See Our Impact
            </a>
            <a href="/get-involved" style={{
              display: 'inline-block',
              border: '2px solid #FFC700',
              color: '#FFC700',
              padding: '16px 40px',
              borderRadius: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
            }}>
              Find Your Role
            </a>
          </div>
        </div>
      </section>

      {/* 3. Values Ticker */}
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
        { slug: 'youth-programming', title: 'Youth Programming', pillar: 'School & Youth Stability', heroImage: '/images/school/IMG_4674.jpg' },
        { slug: 'coastal-care', title: 'Coastal Care', pillar: 'Community Health & Resource Access', heroImage: '/images/coastal/IMG_0267.jpg' },
        { slug: 'wellness', title: 'Wellness & Health Activations', pillar: 'Community Health & Resource Access', heroImage: '/images/wellness/IMG_0279.jpg' },
        { slug: 'giving-season', title: 'Giving Season', pillar: 'Community Health & Resource Access', heroImage: '/images/b2s/6D5A0871.jpg' },
        { slug: 'community-health', title: 'Community Health & Equity', pillar: 'Community Health & Resource Access', heroImage: '/images/wellness/IMG_0007.jpg' },
      ]} />

      {/* 7. CTA */}
      <CTASection />

      {/* 8. Footer */}
      <Footer />

      {/* Sponsor Panel removed for now */}
    </main>
  )
}
