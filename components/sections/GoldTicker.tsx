'use client'

import { useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════
   GOLD TICKER — infinite scrolling ribbon
   LOT font, gold bg, black text, star separators
   STICKS to top of viewport ONLY after user
   scrolls past its natural position (not at load).
   Iridescent finish when content below is yellow.
═══════════════════════════════════════ */

const DEFAULT_PHRASES = [
  'Community is the Infrastructure',
  'Designed with Dignity',
  'We Listen. We Build. We Stay.',
  'Resilience',
  'Access',
  'Equity',
  'Stability',
  'Trust',
]

interface GoldTickerProps {
  phrases?: string[]
  speed?: number
  separator?: string
}

export default function GoldTicker({
  phrases = DEFAULT_PHRASES,
  speed = 30,
  separator = '\u2022',
}: GoldTickerProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const [isStuck, setIsStuck] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [belowIsYellow, setBelowIsYellow] = useState(false)

  // Track whether user has scrolled at all — prevents sticking at page load
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setHasScrolled(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect when ticker hits top of viewport using IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only stick if user has actually scrolled
        setIsStuck(!entry.isIntersecting && hasScrolled)
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasScrolled])

  // Detect if the section below ticker is yellow (#FFC700 background)
  useEffect(() => {
    if (!tickerRef.current) return

    const checkBelowColor = () => {
      const ticker = tickerRef.current
      if (!ticker) return
      const rect = ticker.getBoundingClientRect()
      const nextEl = document.elementFromPoint(rect.left + rect.width / 2, rect.bottom + 2)
      if (nextEl) {
        const bg = getComputedStyle(nextEl).backgroundColor
        // Check if it's yellow-ish (#FFC700 = rgb(255, 199, 0))
        const isYellow = bg.includes('255, 199, 0') || bg.includes('255,199,0')
        setBelowIsYellow(isYellow)
      }
    }

    window.addEventListener('scroll', checkBelowColor, { passive: true })
    checkBelowColor()
    return () => window.removeEventListener('scroll', checkBelowColor)
  }, [])

  // Build the ticker content with separators
  const content = phrases.flatMap((phrase, i) => [
    phrase,
    ...(i < phrases.length - 1 ? [separator] : []),
  ])

  const shouldStick = isStuck && hasScrolled

  return (
    <>
      {/* Sentinel: invisible element that sits at ticker's natural position */}
      <div ref={sentinelRef} style={{ height: '1px', width: '100%' }} />

      {/* Ticker element */}
      <div
        ref={tickerRef}
        role="marquee"
        aria-label="Scrolling values banner"
        className={`${shouldStick && belowIsYellow ? 'iridescent-border iridescent-active' : ''}`}
        style={{
          overflow: 'hidden',
          padding: 'clamp(16px, 2.5vw, 28px) 0',
          background: 'var(--ibtu-gold)',
          width: '100%',
          position: shouldStick ? 'fixed' : 'relative',
          top: shouldStick ? 0 : undefined,
          left: 0,
          right: 0,
          zIndex: shouldStick ? 90 : undefined,
          transition: 'box-shadow 0.3s',
          boxShadow: shouldStick ? '0 4px 20px #000' : 'none',
          borderBottom: shouldStick && belowIsYellow ? 'none' : undefined,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 'max-content',
            animation: `tickerScroll ${speed}s linear infinite`,
          }}
        >
          {/* Duplicate content 3x for seamless loop */}
          {[0, 1, 2].map((copy) => (
            <div key={copy} aria-hidden={copy > 0 ? 'true' : undefined} style={{ display: 'flex', alignItems: 'center' }}>
              {content.map((item, i) => (
                <span
                  key={`${copy}-${i}`}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(20px, 2.5vw, 36px)',
                    textTransform: 'uppercase',
                    color: 'var(--ibtu-black)',
                    whiteSpace: 'nowrap',
                    padding: '0 clamp(14px, 1.8vw, 28px)',
                    lineHeight: 1,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Spacer when stuck to prevent content jump */}
      {shouldStick && (
        <div style={{ height: 'clamp(56px, 7vw, 92px)' }} />
      )}
    </>
  )
}
