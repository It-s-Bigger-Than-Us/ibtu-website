'use client'

import { useState } from 'react'
import { urlFor } from '@/sanity/lib/client'
import EventModal from '@/components/events/EventModal'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ev = any

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
function shortDate(d?: string): string | null {
  if (!d) return null
  const m = d.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!m) return d
  return `${MONTHS[Number(m[1]) - 1]} ${Number(m[2])}`
}

/**
 * Consistent "Upcoming Events" section for EVERY program page. A compact horizontal rail
 * (all events in one view, not a long vertical stack) — each card opens the full-event
 * popup (flyer + info + embedded checkout + CTAs). Same look on every program page; visual
 * upgrade to the holographic-ticket card drops straight into this card.
 */
export default function UpcomingEvents({
  events,
  heading = "What's Next",
}: {
  events: Ev[]
  heading?: string
}) {
  const [active, setActive] = useState<Ev | null>(null)
  const upcoming = (events || []).filter((e: Ev) => e.status === 'Upcoming' || e.status === 'Active')
  if (upcoming.length === 0) return null

  return (
    <section id="upcoming-events" style={{ background: '#000', padding: 'clamp(48px, 6vw, 88px) 0', scrollMarginTop: 96 }}>
      <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <span className="section-label" style={{ display: 'block', marginBottom: 12 }}>Upcoming Events</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--display-section, clamp(36px, 5vw, 72px))', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', margin: 0 }}>
          {heading}
        </h2>
      </div>

      <div className="ue-rail">
        {upcoming.map((ev: Ev) => {
          const date = shortDate(ev.dateStart)
          return (
            <button
              key={ev._id || ev.slug || ev.title}
              type="button"
              className="ue-card card-lift"
              onClick={() => setActive(ev)}
            >
              <div className="ue-card-media">
                {ev.flyer ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={urlFor(ev.flyer).width(640).quality(80).url()} alt={`${ev.title} flyer`} />
                ) : (
                  <div className="ue-card-fallback">
                    <span>{ev.programTitle || ev.title}</span>
                  </div>
                )}
                {date && <span className="ue-date">{date}</span>}
              </div>
              <div className="ue-card-body">
                <h3>{ev.title}</h3>
                {ev.location && <p className="ue-loc">{ev.location}</p>}
                <span className="ue-cta">Details &amp; Tickets →</span>
              </div>
            </button>
          )
        })}
      </div>

      <style>{`
        .ue-rail {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 24px clamp(24px, 5vw, 80px) 16px;
          scrollbar-width: thin;
          scrollbar-color: #FFC700 #000;
        }
        .ue-rail::-webkit-scrollbar { height: 8px; }
        .ue-rail::-webkit-scrollbar-track { background: #000; }
        .ue-rail::-webkit-scrollbar-thumb { background: #FFC700; border-radius: 100px; }
        .ue-card {
          flex: 0 0 auto;
          width: clamp(258px, 30vw, 340px);
          scroll-snap-align: start;
          text-align: left;
          background: #000;
          border: 1px solid var(--gold);
          border-radius: var(--radius-card, 16px);
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          font-family: var(--font-body);
          display: flex;
          flex-direction: column;
        }
        .ue-card-media { position: relative; width: 100%; aspect-ratio: 4 / 3; overflow: hidden; background: var(--gold); }
        .ue-card-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ue-card-fallback { position: absolute; inset: 0; display: flex; align-items: flex-end; padding: 16px; }
        .ue-card-fallback span { font-family: var(--font-display); font-size: clamp(20px, 2.4vw, 30px); line-height: 0.95; text-transform: uppercase; color: #000; }
        .ue-date { position: absolute; top: 12px; left: 12px; background: #000; color: var(--gold); font-weight: 700; font-size: 11px; letter-spacing: 1px; text-transform: uppercase; padding: 6px 10px; border-radius: 100px; }
        .ue-card-body { padding: 18px 18px 20px; display: flex; flex-direction: column; gap: 8px; }
        .ue-card-body h3 { font-family: var(--font-display); font-size: clamp(18px, 1.6vw, 24px); line-height: 1.04; text-transform: uppercase; color: #fff; margin: 0; }
        .ue-loc { font-size: 13px; color: var(--gold); font-weight: 600; margin: 0; line-height: 1.4; }
        .ue-cta { margin-top: 4px; font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); }
      `}</style>

      <EventModal event={active} onClose={() => setActive(null)} />
    </section>
  )
}
