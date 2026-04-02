'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

/* ═══════════════════════════════════════
   PROGRAM SPONSOR SLIDER — right-edge panel
   Holographic attention button. Click to expand
   sponsorship tiers. Compact, concise. For program pages.
═══════════════════════════════════════ */

interface SponsorTier {
  name: string
  price: string
  deliverables: string[]
  featured?: boolean
}

interface ProgramSponsorSliderProps {
  programName: string
  tiers?: SponsorTier[]
}

const DEFAULT_TIERS: SponsorTier[] = [
  {
    name: 'Title Sponsor',
    price: '$15,000+',
    featured: true,
    deliverables: [
      'Title recognition at all events',
      'On-site branded signage',
      'Solo social media spotlight',
      'Logo on all materials + website',
      'Custom impact report',
      'Employee activation opportunities',
    ],
  },
  {
    name: 'Impact Sponsor',
    price: '$10,000',
    deliverables: [
      'Logo on event materials + signage',
      'Carousel social media feature',
      'On-site tabling at events',
      'Inclusion in impact report',
      'Logo on IBTU website',
    ],
  },
  {
    name: 'Community Sponsor',
    price: '$5,000',
    deliverables: [
      'Logo on select materials',
      'Solo frame in social carousel',
      'Metrics report inclusion',
      'Community recognition',
    ],
  },
  {
    name: 'Ally',
    price: '$2,500',
    deliverables: [
      'Name on select materials',
      'Group social acknowledgment',
      'Community wall listing',
    ],
  },
  {
    name: 'Supporter',
    price: '$1,000',
    deliverables: [
      'Name on event materials',
      'Group social acknowledgment',
    ],
  },
]

export default function ProgramSponsorSlider({
  programName,
  tiers = DEFAULT_TIERS,
}: ProgramSponsorSliderProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)
  const tabRef = useRef<HTMLButtonElement>(null)

  // Pulse animation on the tab to catch attention
  useEffect(() => {
    if (!tabRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(tabRef.current, {
        scale: 1.05,
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  // Escape to close
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Holographic tab button — right edge ── */}
      <button
        ref={tabRef}
        onClick={() => setOpen(true)}
        aria-label="View sponsorship packages"
        className="holo-glass"
        style={{
          position: 'fixed',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 200,
          cursor: 'pointer',
          border: 'none',
          borderRadius: '8px 0 0 8px',
          background: 'var(--ibtu-black)',
          padding: '16px 12px',
          display: open ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: '11px',
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
      </button>

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: '#000',
                zIndex: 250,
              }}
            />

            {/* Slide panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Sponsorship packages"
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(480px, 90vw)',
                background: 'var(--ibtu-black)',
                zIndex: 300,
                overflowY: 'auto',
                padding: 'clamp(24px, 4vw, 48px)',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'none',
                  border: 'none',
                  color: 'var(--ibtu-white)',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>

              {/* Header */}
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(28px, 4vw, 44px)',
                textTransform: 'uppercase',
                color: 'var(--ibtu-white)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                Sponsor
              </h2>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--body-sm)',
                color: 'var(--ibtu-gold)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '24px',
              }}>
                {programName}
              </p>

              {/* Tiers */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {tiers.map((tier, i) => {
                  const isExpanded = expanded === i
                  return (
                    <div
                      key={tier.name}
                      className={tier.featured ? 'holo-glass' : ''}
                      style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                      }}
                      onClick={() => setExpanded(isExpanded ? null : i)}
                    >
                      {/* Tier header */}
                      <div style={{
                        background: 'var(--ibtu-gold)',
                        padding: '14px 16px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <div>
                          <h3 style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px',
                            fontWeight: 800,
                            color: 'var(--ibtu-black)',
                            textTransform: 'uppercase',
                            margin: 0,
                          }}>
                            {tier.name}
                          </h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(16px, 2vw, 22px)',
                            color: 'var(--ibtu-black)',
                          }}>
                            {tier.price}
                          </span>
                          <span style={{
                            fontSize: '14px',
                            color: 'var(--ibtu-black)',
                            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s var(--ease-out-expo)',
                          }}>
                            ▼
                          </span>
                        </div>
                      </div>

                      {/* Deliverables */}
                      <motion.div
                        initial={false}
                        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden', background: 'var(--ibtu-gold)' }}
                      >
                        <ul style={{
                          listStyle: 'none',
                          padding: '0 16px 14px',
                          margin: 0,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          borderTop: '1px solid var(--ibtu-black)',
                          paddingTop: '12px',
                        }}>
                          {tier.deliverables.map((item) => (
                            <li key={item} style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '12px',
                              color: 'var(--ibtu-black)',
                              fontWeight: 500,
                              paddingLeft: '16px',
                              position: 'relative',
                            }}>
                              <span style={{ position: 'absolute', left: 0 }}>→</span>
                              {item}
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
                href={`mailto:info@itsbiggerthanusla.org?subject=Sponsorship%20Inquiry%20-%20${encodeURIComponent(programName)}`}
                className="sparkle-stroke"
                style={{
                  display: 'block',
                  marginTop: '24px',
                  background: 'var(--ibtu-gold)',
                  color: 'var(--ibtu-black)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                  padding: '14px 24px',
                  borderRadius: '4px',
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
