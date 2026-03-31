/* ═══════════════════════════════════════
   GOLD TICKER — infinite scrolling ribbon
   LOT font, gold bg, black text, star separators
   NO hover pause — always moving
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
  separator = '★',
}: GoldTickerProps) {
  // Build the ticker content with separators
  const content = phrases.flatMap((phrase, i) => [
    phrase,
    ...(i < phrases.length - 1 ? [separator] : []),
  ])

  return (
    <div
      role="marquee"
      aria-label="Scrolling values banner"
      style={{
        overflow: 'hidden',
        padding: 'clamp(20px, 3vw, 36px) 0',
        background: 'var(--ibtu-gold)',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `tickerScroll ${speed}s linear infinite`,
        }}
      >
        {/* Duplicate content 3x for seamless loop — dupes hidden from screen readers */}
        {[0, 1, 2].map((copy) => (
          <div key={copy} aria-hidden={copy > 0 ? 'true' : undefined} style={{ display: 'flex', alignItems: 'center' }}>
            {content.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 3vw, 40px)',
                  textTransform: 'uppercase',
                  color: 'var(--ibtu-black)',
                  whiteSpace: 'nowrap',
                  padding: '0 clamp(16px, 2vw, 32px)',
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
  )
}
