'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GoldTicker from '@/components/sections/GoldTicker'
import HeroReveal from '@/components/sections/HeroReveal'
import Footer from '@/components/layout/Footer'
import ProgramCarousel3D from '@/components/sections/ProgramCarousel3D'
import PillarTabs from '@/components/sections/PillarTabs'
import PillarCubes from '@/components/sections/PillarCubes'
import EditorialMediaStrip from '@/components/sections/EditorialMediaStrip'

gsap.registerPlugin(ScrollTrigger)

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

interface PillarVisual {
  name: string
  images: string[]
}

interface HomePageClientProps {
  programCards: Program[]
  missionMedia: Array<{ type: 'image' | 'video'; src: string; alt?: string }>
  pillarVisuals?: PillarVisual[]
  stats: StatItem[]
  tickerPhrases: string[]
  editorialImages?: string[]
  editorialVideoUrl?: string
}

export default function HomePageClient({
  programCards,
  pillarVisuals,
  stats,
  tickerPhrases,
  editorialImages,
  editorialVideoUrl,
}: HomePageClientProps) {
  const mainRef = useRef<HTMLElement>(null)

  /* Scroll-triggered fade-in for the statement section (smooth hero → content transition) */
  useEffect(() => {
    if (!mainRef.current) return
    const statement = mainRef.current.querySelector('.home-statement')
    if (!statement) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        statement,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: statement,
            start: 'top 90%',
            once: true,
          },
        },
      )
    }, mainRef)

    return () => ctx.revert()
  }, [])

  return (
    <main className="home-page" ref={mainRef}>
      {/* 1. Hero — text wipe → iridescent logo → yellow volunteer section */}
      <HeroReveal />

      {/* 2. Hero Statement — approved wireframe copy (scroll-reveal from hero) */}
      <section className="home-statement" style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
      }}>
        <div className="home-statement-inner" style={{ maxWidth: 'var(--content-max)', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="home-statement-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 8vw, 140px)',
            lineHeight: 0.92,
            textTransform: 'uppercase',
            color: '#FFC700',
            letterSpacing: '-0.02em',
            marginBottom: 32,
            textWrap: 'balance',
          }}>
            When Systems Fail, Communities Show Up.
          </h2>
          <p className="home-statement-body" style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(16px, 1.4vw, 22px)',
            color: '#FFF',
            lineHeight: 1.7,
            maxWidth: 720,
            margin: '0 auto 40px',
            fontWeight: 700,
          }}>
            Since 2020, IBTU has served 62,475+ students across 34 school sites, distributed 875,500+ pounds of food, and stabilized 5,000+ families after the LA fires. We built a permanent Relief Resource Hub, activated 7,500+ volunteers, and mobilized $4.5 million in resources — all through 300+ partnerships and a community that shows up every single time.
          </p>
          <div className="home-statement-actions" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
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

      {/* 3.5. Editorial Media Strip — full-bleed cinematic gallery (3519-style) */}
      {editorialImages && editorialImages.length >= 6 && (
        <EditorialMediaStrip
          images={editorialImages}
          videoUrl={editorialVideoUrl}
          sectionLabel="In the Field"
        />
      )}

      {/* 4. Mission — typewriter effect */}
      <MissionCard />

      {/* 6. Our Impact Pillars — blue sky bg behind tabs + cubes */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <Image
            src="/images/blue-sky.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={60}
            priority={false}
            placeholder="empty"
            style={{
              objectFit: 'cover',
              objectPosition: 'center top',
              animation: 'skyPan 60s linear infinite',
              transform: 'scale(1.2)',
            }}
          />
        </div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <PillarTabs />
          <PillarCubes stats={stats} pillars={pillarVisuals} />
        </div>
      </section>

      {/* 7. Program Cards — 3D Gradient Carousel */}
      <ProgramCarousel3D programs={programCards.length > 0 ? programCards : [
        { slug: 'fire-relief', title: 'Fire Relief & The Hub', pillar: 'Crisis & Disaster Stabilization', heroImage: '/images/fire-relief/IMG_8047.jpg' },
        { slug: 'back-2-school', title: 'Back 2 School Festival', pillar: 'Community Health & Resource Access', heroImage: '/images/b2s/_D5A5792.jpg' },
        { slug: 'youth-programming', title: 'School Program', pillar: 'School & Youth Stability', heroImage: '/images/school/IMG_5406.jpg' },
        { slug: 'coastal-care', title: 'Coastal Care', pillar: 'Community Health & Resource Access', heroImage: '/images/coastal/IMG_4920.jpg' },
        { slug: 'wellness', title: 'Wellness & Health Activations', pillar: 'Community Health & Resource Access', heroImage: '/images/wellness/IMG_1540.jpg' },
        { slug: 'giving-season', title: 'Giving Season', pillar: 'Community Health & Resource Access', heroImage: '/images/b2s/6D5A1108.jpg' },
      ]} />

      {/* 8. CTA */}
      <CTASection />

      {/* 9. Footer */}
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .home-statement {
            padding: 56px 20px !important;
          }

          .home-statement-title {
            font-size: clamp(36px, 14vw, 62px) !important;
            max-width: 7.5ch;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px !important;
          }

          .home-statement-body {
            font-size: 16px !important;
            line-height: 1.65 !important;
            max-width: 30ch !important;
            margin-bottom: 28px !important;
          }

          .home-statement-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .home-statement-actions a {
            width: 100%;
            max-width: 320px;
            margin: 0 auto;
            text-align: center;
          }
        }
      `}</style>
    </main>
  )
}
