'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   SPONSOR PANEL — fixed right-edge tab
   Grows on scroll, click opens full panel
═══════════════════════════════════════ */

interface SponsorTier {
  name: string
  price: string
  benefits: string[]
  featured?: boolean
}

interface SponsorPanelProps {
  tiers?: SponsorTier[]
}

const DEFAULT_TIERS: SponsorTier[] = [
  {
    name: 'Community Partner',
    price: '$2,500',
    benefits: ['Logo on event materials', 'Social media shoutout', 'VIP event access'],
  },
  {
    name: 'Impact Sponsor',
    price: '$5,000',
    benefits: ['Logo on event materials', 'Booth at 2 events', 'Social media campaign', 'Newsletter feature'],
    featured: true,
  },
  {
    name: 'Title Sponsor',
    price: '$10,000+',
    benefits: ['Co-branded event', 'Speaking opportunity', 'Year-round logo placement', 'Custom activation', 'Impact report'],
  },
]

export default function SponsorPanel({ tiers = DEFAULT_TIERS }: SponsorPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const tabRef = useRef<HTMLDivElement>(null)
  const tabWidthRef = useRef<HTMLDivElement>(null)

  // Show tab only after scrolling past the hero
  useEffect(() => {
    const handleScroll = () => setPastHero(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Tab growth on scroll through programs section
  useEffect(() => {
    if (!tabWidthRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: '.programs-grid',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate(self) {
        if (tabWidthRef.current) {
          const w = 48 + self.progress * 152 // 48px → 200px
          tabWidthRef.current.style.width = `${w}px`
        }
      },
    })

    return () => trigger.kill()
  }, [])

  // Lock body scroll when panel is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Escape key closes panel
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  if (!pastHero) return null

  return (
    <>
      {/* ── Fixed tab on right edge ── */}
      <div
        ref={tabRef}
        role="button"
        tabIndex={0}
        aria-label="Open sponsor panel"
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIsOpen(true) } }}
        className="holo-glass"
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          cursor: 'pointer',
          overflow: 'hidden',
          borderRadius: '8px 0 0 8px',
          transition: 'opacity 0.3s',
          opacity: isOpen ? 0 : 1,
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
      >
        <div
          ref={tabWidthRef}
          style={{
            width: '48px',
            height: '160px',
            background: 'var(--ibtu-black)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {/* Rotated text for narrow state, inline text for wide */}
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--ibtu-gold)',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
            }}
          >
            Sponsor
          </span>
        </div>
      </div>

      {/* ── Full slide-in panel ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 250,
              }}
            />

            {/* Panel */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Sponsorship information"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(480px, 90vw)',
                background: 'var(--ibtu-black)',
                zIndex: 300,
                overflowY: 'auto',
                padding: 'clamp(32px, 5vw, 60px)',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close sponsor panel"
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--ibtu-white)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                }}
              >
                ✕
              </button>

              {/* Header */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  textTransform: 'uppercase',
                  color: 'var(--ibtu-white)',
                  lineHeight: 1,
                  marginBottom: '16px',
                }}
              >
                Become a<br />Sponsor
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--body-md)',
                  color: 'var(--ibtu-white)',
                  lineHeight: 1.7,
                  marginBottom: '40px',
                }}
              >
                Partner with IBTU to create lasting impact in Los Angeles communities.
              </p>

              {/* Tier cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {tiers.map((tier) => (
                  <div
                    key={tier.name}
                    className={tier.featured ? 'holo-glass' : ''}
                    style={{
                      background: 'var(--ibtu-gold)',
                      borderRadius: '12px',
                      padding: 'clamp(20px, 3vw, 32px)',
                      transition: 'transform 0.3s var(--ease-out-expo)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '12px',
                    }}>
                      <h3 style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(16px, 1.5vw, 20px)',
                        fontWeight: 900,
                        color: 'var(--ibtu-black)',
                        textTransform: 'uppercase',
                      }}>
                        {tier.name}
                      </h3>
                      <span style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(24px, 3vw, 32px)',
                        color: 'var(--ibtu-black)',
                      }}>
                        {tier.price}
                      </span>
                    </div>
                    <ul style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}>
                      {tier.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'var(--body-sm)',
                            color: 'var(--ibtu-black)',
                            fontWeight: 500,
                            paddingLeft: '16px',
                            position: 'relative',
                          }}
                        >
                          <span style={{
                            position: 'absolute',
                            left: 0,
                            color: 'var(--ibtu-black)',
                          }}>→</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href="mailto:info@itsbiggerthanusla.org?subject=Sponsorship%20Inquiry"
                className="sparkle-stroke"
                style={{
                  display: 'block',
                  marginTop: '32px',
                  background: 'var(--ibtu-gold)',
                  color: 'var(--ibtu-black)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '16px 32px',
                  borderRadius: '4px',
                  transition: 'background 0.3s, color 0.3s',
                }}
              >
                Get in Touch →
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
