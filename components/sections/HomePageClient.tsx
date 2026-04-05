'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import GoldTicker from '@/components/sections/GoldTicker'
import HeroReveal from '@/components/sections/HeroReveal'
import Footer from '@/components/layout/Footer'
import ProgramCarousel3D from '@/components/sections/ProgramCarousel3D'
import PillarTabs from '@/components/sections/PillarTabs'
import PillarCubes from '@/components/sections/PillarCubes'

const ShortPlaceholder = () => <div style={{ minHeight: '300px', background: '#000' }} />
const MissionCard = dynamic(() => import('@/components/sections/MissionCard'), { ssr: false, loading: ShortPlaceholder })
const CTASection = dynamic(() => import('@/components/sections/CTASection'), { ssr: false, loading: ShortPlaceholder })

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
      {/* 1. Hero — text wipe → iridescent logo → yellow volunteer section */}
      <HeroReveal />

      {/* 2. Hero Statement — approved wireframe copy */}
      <section style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
      }}>
        <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', textAlign: 'center' }}>
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
            margin: '0 auto 40px',
            fontWeight: 700,
          }}>
            It&apos;s Bigger Than Us builds trusted, lasting programs in the places communities already are — schools, neighborhood hubs, community spaces. Everything we do starts by listening. Everything we build is designed with dignity. And we don&apos;t leave.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/impact" style={{
              display: 'inline-block',
              background: '#FFC700',
              color: '#000',
              padding: '16px 40px',
              borderRadius: '16px',
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
              border: '0.5px solid #FFC700',
              color: '#FFC700',
              padding: '16px 40px',
              borderRadius: '16px',
              overflow: 'hidden',
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

      {/* 4. Numbers Don't Lie — 2-column layout */}
      <section style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
      }}>
        <div style={{
          maxWidth: 'var(--content-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(32px, 4vw, 64px)',
          alignItems: 'start',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 6vw, 80px)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: '#FFC700',
            letterSpacing: '-0.02em',
          }}>
            The Numbers Don&apos;t Lie
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-md)',
              color: '#FFF',
              lineHeight: 1.8,
            }}>
              In 2025, IBTU served 28,025 students across 34 school sites — more than every previous year combined. We have distributed 875,500+ pounds of food across Los Angeles since 2020. When the Palisades and Eaton fires displaced thousands, we opened a permanent Relief Resource Hub that now serves 324 active clients averaging 23 visits each. That is not a pop-up. That is infrastructure.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--body-md)',
              color: '#FFF',
              lineHeight: 1.8,
            }}>
              This reach is the result of 300+ partnerships, a volunteer force 7,500 strong, and an organization that has earned the trust to mobilize a city. Every dollar donated extends community-built infrastructure to more families and neighborhoods across Los Angeles.
            </p>
          </div>
        </div>
        {/* Responsive: stack on mobile */}
        <style>{`
          @media (max-width: 768px) {
            section > div[style*="grid-template-columns: 1fr 1fr"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>

      {/* 5. Mission — typewriter effect */}
      <MissionCard />

      {/* 6. Our Impact Pillars — blue sky bg behind tabs + cubes */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/images/blue-sky.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={60}
            priority={false}
            placeholder="empty"
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <PillarTabs />
          <PillarCubes stats={stats} />
        </div>
      </section>

      {/* 7. Program Cards — 3D Gradient Carousel */}
      <ProgramCarousel3D programs={programCards.length > 0 ? programCards : [
        { slug: 'fire-relief', title: 'Fire Relief & The Hub', pillar: 'Crisis & Disaster Stabilization', heroImage: '/images/fire-relief/IMG_8047.jpg' },
        { slug: 'back-2-school', title: 'Back 2 School Festival', pillar: 'Community Health & Resource Access', heroImage: '/images/b2s/_D5A5792.jpg' },
        { slug: 'youth-programming', title: 'School Program', pillar: 'School & Youth Stability', heroImage: '/images/school/IMG_5406.jpg' },
        { slug: 'coastal-care', title: 'Coastal Care', pillar: 'Community Health & Resource Access', heroImage: '/images/coastal/IMG_4920.jpg' },
        { slug: 'wellness', title: 'Wellness & Health Activations', pillar: 'Community Health & Resource Access', heroImage: '/images/additional/IMG_1540.jpg' },
        { slug: 'giving-season', title: 'Giving Season', pillar: 'Community Health & Resource Access', heroImage: '/images/b2s/6D5A1108.jpg' },
        { slug: 'community-builder-linkups', title: 'Community Builder Link Ups', pillar: 'Community Health & Resource Access', heroImage: '/images/linkup/community-builder-linkups.jpg' },
      ]} />

      {/* 8. CTA */}
      <CTASection />

      {/* 9. Footer */}
      <Footer />
    </main>
  )
}
