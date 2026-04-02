'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ═══════════════════════════════════════
   SPONSOR PANEL — fixed right-edge tab
   Click-to-reveal tiers with animation
   Real sponsorship packages from Sanity
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

/* Real IBTU sponsorship tiers — grouped from Sanity programSponsorPackage data */
const REAL_TIERS: SponsorTier[] = [
  {
    name: 'Title Sponsor',
    price: '$15,000+',
    benefits: [
      'Title sponsor recognition at events',
      'On-site branded signage at activations',
      'Solo social media spotlight posts',
      'Logo on all printed materials',
      'Logo + link on IBTU website',
      'Custom impact recap report',
      'Employee activation opportunities',
    ],
    featured: true,
  },
  {
    name: 'Impact Sponsor',
    price: '$10,000',
    benefits: [
      'Logo on event materials & signage',
      'Carousel social media feature',
      'On-site tabling at events',
      'Inclusion in impact report',
      'Verbal recognition at events',
      'Logo on IBTU website',
    ],
  },
  {
    name: 'Community Sponsor',
    price: '$5,000',
    benefits: [
      'Logo on select materials',
      'Solo frame in social carousel',
      'Grouped story slide feature',
      'Included in metrics report',
      'Community recognition',
    ],
  },
  {
    name: 'Ally',
    price: '$2,500',
    benefits: [
      'Name on select materials',
      'Group social acknowledgment',
      'Listed on community wall',
    ],
  },
  {
    name: 'Supporter',
    price: '$1,000',
    benefits: [
      'Name on event materials',
      'Group social acknowledgment',
    ],
  },
]

export default function SponsorPanel({ tiers = REAL_TIERS }: SponsorPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [expandedTier, setExpandedTier] = useState<number | null>(null)
  const tabRef = useRef<HTMLDivElement>(null)
  const tabWidthRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setPastHero(window.scrollY > window.innerHeight)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!tabWidthRef.current) return
    const trigger = ScrollTrigger.create({
      trigger: '.programs-grid',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate(self) {
        if (tabWidthRef.current) {
          const w = 48 + self.progress * 152
          tabWidthRef.current.style.width = `${w}px`
        }
      },
    })
    return () => trigger.kill()
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

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
      {/* ── Fixed tab ── */}
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
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ibtu-gold)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}>
            Sponsor
          </span>
        </div>
      </div>

      {/* ── Full panel ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 250 }}
            />

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
                width: 'min(520px, 90vw)',
                background: 'var(--ibtu-black)',
                zIndex: 300,
                overflowY: 'auto',
                padding: 'clamp(32px, 5vw, 60px)',
              }}
            >
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
                }}
              >
                ✕
              </button>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                textTransform: 'uppercase',
                color: 'var(--ibtu-white)',
                lineHeight: 1,
                marginBottom: '16px',
              }}>
                Become a<br />Sponsor
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-md)',
                color: 'var(--ibtu-white)',
                lineHeight: 1.7,
                marginBottom: '40px',
              }}>
                Partner with IBTU to create lasting impact in Los Angeles communities.
                Click any tier to see what&apos;s included.
              </p>

              {/* Accordion tiers — click to reveal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tiers.map((tier, i) => {
                  const isExpanded = expandedTier === i
                  return (
                    <div
                      key={tier.name}
                      className={tier.featured ? 'holo-glass' : ''}
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={() => setExpandedTier(isExpanded ? null : i)}
                    >
                      {/* Tier header — always visible */}
                      <div style={{
                        background: 'var(--ibtu-gold)',
                        padding: 'clamp(16px, 2vw, 24px)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'background 0.3s',
                      }}>
                        <div>
                          <h3 style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: 'clamp(14px, 1.3vw, 18px)',
                            fontWeight: 900,
                            color: 'var(--ibtu-black)',
                            textTransform: 'uppercase',
                            margin: 0,
                          }}>
                            {tier.name}
                          </h3>
                          {tier.featured && (
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '10px',
                              fontWeight: 700,
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: 'var(--ibtu-black)',
                              opacity: 0.6,
                            }}>
                              Most Popular
                            </span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(20px, 2.5vw, 28px)',
                            color: 'var(--ibtu-black)',
                          }}>
                            {tier.price}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '18px',
                            color: 'var(--ibtu-black)',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s var(--ease-out-expo)',
                          }}>
                            ▼
                          </span>
                        </div>
                      </div>

                      {/* Benefits — click to reveal with animation */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isExpanded ? 'auto' : 0,
                          opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          overflow: 'hidden',
                          background: 'var(--ibtu-gold)',
                        }}
                      >
                        <ul style={{
                          listStyle: 'none',
                          padding: '0 clamp(16px, 2vw, 24px) clamp(16px, 2vw, 24px)',
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          borderTop: '1px solid var(--ibtu-black)',
                          paddingTop: '16px',
                        }}>
                          {tier.benefits.map((benefit) => (
                            <li
                              key={benefit}
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: 'var(--body-sm)',
                                color: 'var(--ibtu-black)',
                                fontWeight: 500,
                                paddingLeft: '20px',
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
                      </motion.div>
                    </div>
                  )
                })}
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
