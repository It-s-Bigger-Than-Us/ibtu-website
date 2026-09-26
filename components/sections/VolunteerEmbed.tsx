'use client'

import { useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════
   VOLUNTEER EMBED — framed Bloomerang shift cards
   White card, reserved 600px area. Shows a loading line while the
   iframe loads; if it does not fire onLoad within 12s (or errors),
   swaps to a static three-role fallback with a direct signup link.
═══════════════════════════════════════ */

const VOLUNTEER_JOIN_URL =
  'https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr'

const FALLBACK_ROLES = ['Hub', 'School', 'Coastal Care']

const FAILURE_TIMEOUT_MS = 12000

export default function VolunteerEmbed() {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'failed'>('loading')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setStatus((current) => (current === 'loading' ? 'failed' : current))
    }, FAILURE_TIMEOUT_MS)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setStatus('loaded')
  }

  const handleError = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setStatus('failed')
  }

  return (
    <section
      aria-labelledby="volunteer-embed-heading"
      style={{
        background: '#FFF',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-6)',
        boxShadow: 'var(--shadow-card)',
        color: '#000',
      }}
    >
      <h3
        id="volunteer-embed-heading"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 900,
          fontSize: 'var(--text-xl)',
          color: '#000',
          margin: '0 0 var(--space-6)',
        }}
      >
        Open shifts
      </h3>

      <div style={{ position: 'relative', minHeight: 600 }}>
        {status !== 'failed' && (
          <>
            {status === 'loading' && (
              <div
                aria-live="polite"
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: '#000',
                  }}
                >
                  Loading shifts
                </span>
              </div>
            )}
            <iframe
              src="https://volunteer.bloomerang.co:443/volunteer/embed/cards.html?mode=event&org_id=3917&show_description=true&show_language=true&default_language=eng_can"
              title="IBTU Volunteer Opportunities"
              width="100%"
              height="600"
              onLoad={handleLoad}
              onError={handleError}
              className="ibtu-volunteer-iframe"
              style={{
                border: 'none',
                width: '100%',
                height: '600px',
                display: 'block',
                opacity: status === 'loaded' ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />
          </>
        )}

        {status === 'failed' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: 'var(--space-6)',
            }}
          >
            {FALLBACK_ROLES.map((role) => (
              <div
                key={role}
                style={{
                  background: '#000',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 120,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 900,
                    fontSize: 'var(--text-xl)',
                    color: '#FFC700',
                    textAlign: 'center',
                  }}
                >
                  {role}
                </span>
              </div>
            ))}

            <a
              href={VOLUNTEER_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                gridColumn: '1 / -1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'var(--target-min)',
                background: '#FFC700',
                color: '#000',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Volunteer
            </a>
          </div>
        )}
      </div>

      <style>{`
        .ibtu-volunteer-iframe:focus,
        .ibtu-volunteer-iframe:focus-visible {
          outline: 3px solid #FFC700;
          outline-offset: 2px;
        }
      `}</style>
    </section>
  )
}
