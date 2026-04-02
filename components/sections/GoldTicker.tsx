'use client'

import { useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════
   GOLD TICKER — infinite scrolling ribbon
   LOT font, gold bg, black text, star separators
   STICKS to top of viewport when scrolled to,
   integrates visually with nav via iridescent stroke
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
  const [isStuck, setIsStuck] = useState(false)

  // Detect when ticker hits top of viewport using IntersectionObserver
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel scrolls above viewport, ticker should stick
        setIsStuck(!entry.isIntersecting)
      },
      {
        threshold: 0,
        rootMargin: '0px 0px 0px 0px',
      }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  // Build the ticker content with separators
  const content = phrases.flatMap((phrase, i) => [
    phrase,
    ...(i < phrases.length - 1 ? [separator] : []),
  ])

  return (
    <>
      {/* Sentinel: invisible element that sits at ticker's natural position */}
      <div ref={sentinelRef} style={{ height: '1px', width: '100%' }} />

      {/* Ticker element */}
      <div
        role="marquee"
        aria-label="Scrolling values banner"
        className={isStuck ? 'iridescent-border iridescent-active' : ''}
        style={{
          overflow: 'hidden',
          padding: 'clamp(16px, 2.5vw, 28px) 0',
          background: 'var(--ibtu-gold)',
          width: '100%',
          position: isStuck ? 'fixed' : 'relative',
          top: isStuck ? 0 : undefined,
          left: 0,
          right: 0,
          zIndex: isStuck ? 90 : undefined,
          transition: 'box-shadow 0.3s',
          boxShadow: isStuck ? '0 4px 20px #000' : 'none',
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
      {isStuck && (
        <div style={{ height: 'clamp(56px, 7vw, 92px)' }} />
      )}
    </>
  )
}
