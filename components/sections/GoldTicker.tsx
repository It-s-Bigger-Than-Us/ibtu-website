'use client'

import { useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════
   GOLD TICKER — infinite scrolling ribbon
   LOT font, gold bg, black text, star separators
   STICKS to top of viewport ONLY after user
   scrolls past ALL components above it.
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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const [isStuck, setIsStuck] = useState(false)
  const [belowIsYellow, setBelowIsYellow] = useState(false)
  const tickerHeight = useRef(0)

  // Sticky logic: stick when ticker top reaches viewport top
  useEffect(() => {
    const wrapper = wrapperRef.current
    const ticker = tickerRef.current
    if (!wrapper || !ticker) return

    const onScroll = () => {
      const rect = wrapper.getBoundingClientRect()
      const h = ticker.offsetHeight
      tickerHeight.current = h

      // Stick when the wrapper's top edge scrolls above viewport
      const shouldStick = rect.top <= 0
      setIsStuck(shouldStick)

      // Check what's below the ticker
      if (shouldStick) {
        const sampleX = window.innerWidth / 2
        const sampleY = h + 4
        // Temporarily hide ticker to sample element behind it
        ticker.style.pointerEvents = 'none'
        const el = document.elementFromPoint(sampleX, sampleY)
        ticker.style.pointerEvents = ''
        if (el) {
          const bg = getComputedStyle(el).backgroundColor
          const isYellow = bg.includes('255, 199, 0') || bg.includes('255,199,0')
          setBelowIsYellow(isYellow)
        }
      } else {
        setBelowIsYellow(false)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // initial check
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Build the ticker content with separators
  const content = phrases.flatMap((phrase, i) => [
    phrase,
    ...(i < phrases.length - 1 ? [separator] : []),
  ])

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {/* Ticker element */}
      <div
        ref={tickerRef}
        role="marquee"
        aria-label="Scrolling values banner"
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
          transition: 'box-shadow 0.4s',
          boxShadow: isStuck ? '0 4px 24px #000' : 'none',
        }}
      >
        {/* Iridescent border — shows when stuck AND below is yellow */}
        {isStuck && belowIsYellow && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 0,
              pointerEvents: 'none',
              zIndex: 2,
              borderBottom: '3px solid transparent',
              backgroundImage: 'var(--holo-gradient)',
              backgroundSize: '400% 400%',
              backgroundClip: 'padding-box',
              animation: 'holo-shift 24s ease infinite',
              WebkitMask: 'linear-gradient(transparent 0%, transparent calc(100% - 3px), #000 calc(100% - 3px))',
              mask: 'linear-gradient(transparent 0%, transparent calc(100% - 3px), #000 calc(100% - 3px))',
            }}
          />
        )}

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
        <div style={{ height: tickerHeight.current || 'clamp(56px, 7vw, 92px)' }} />
      )}
    </div>
  )
}
