'use client'

import { useMemo, useState } from 'react'
import EventModal from '@/components/events/EventModal'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ev = any

type EventType = 'attendee' | 'volunteer' | 'vendor'
type View = 'list' | 'grid'

const TYPE_LABELS: Record<EventType, string> = {
  attendee: 'Attend',
  volunteer: 'Volunteer',
  vendor: 'Vendors / Partners',
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** Parse the MM/DD/YYYY dates stored in Sanity. Returns null for ranges / TBD / unparseable. */
function parseEventDate(dateStart?: string): { y: number; m: number; d: number } | null {
  if (!dateStart) return null
  const mdy = dateStart.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (mdy) {
    const m = Number(mdy[1]) - 1
    const d = Number(mdy[2])
    const y = Number(mdy[3])
    if (m >= 0 && m <= 11 && d >= 1 && d <= 31) return { y, m, d }
  }
  const t = Date.parse(dateStart)
  if (!Number.isNaN(t)) {
    const dt = new Date(t)
    return { y: dt.getFullYear(), m: dt.getMonth(), d: dt.getDate() }
  }
  return null
}

function eventTypes(ev: Ev): EventType[] {
  const types: EventType[] = []
  if (ev.publicAttendance || ev.eventbriteId || ev.rsvpUrl) types.push('attendee')
  if (ev.volunteerSignupOpen) types.push('volunteer')
  if (ev.vendorSignupOpen) types.push('vendor')
  return types
}

const pillStyle: React.CSSProperties = {
  display: 'inline-block',
  fontFamily: 'var(--font-body)',
  fontWeight: 700,
  fontSize: 'var(--text-sm)',
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  padding: '3px 10px',
  borderRadius: 'var(--radius-pill, 100px)',
  border: '1px solid #000',
  color: '#000',
  background: 'transparent',
}

function TypePills({ ev }: { ev: Ev }) {
  const evTypes = eventTypes(ev)
  if (evTypes.length === 0) return null
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
      {evTypes.map((t) => (
        <span key={t} style={pillStyle}>{TYPE_LABELS[t]}</span>
      ))}
    </div>
  )
}

/**
 * The /events calendar — month grid of upcoming/active events with filter chips by
 * program and by involvement type. Clicking an event jumps to its block on the program
 * page (events live on program pages; this is the index). Brand-locked to gold/black/
 * white, so programs are distinguished by label, not hue.
 *
 * Default view is a monthly agenda list (decision d05, finding 06) with a grid view
 * kept behind a toggle for anyone who prefers to scan a calendar layout.
 */
export default function EventsCalendar({
  events,
  programs,
}: {
  events: Ev[]
  programs: Ev[]
}) {
  const [program, setProgram] = useState<string>('all')
  const [types, setTypes] = useState<Set<EventType>>(new Set())
  const [active, setActive] = useState<Ev | null>(null)
  const [view, setView] = useState<View>('list')

  const visible = useMemo(() => {
    return (events || []).filter((ev: Ev) => {
      if (program !== 'all' && ev.programSlug !== program) return false
      if (types.size > 0) {
        const evTypes = eventTypes(ev)
        if (!evTypes.some((t) => types.has(t))) return false
      }
      return true
    })
  }, [events, program, types])

  // Group the parseable events by month, sorted chronologically. A month
  // bucket only exists once an event lands in it, so empty months are never
  // rendered in either view.
  const months = useMemo(() => {
    const buckets = new Map<string, { y: number; m: number; events: { ev: Ev; d: number }[] }>()
    const undated: Ev[] = []
    for (const ev of visible) {
      const parsed = parseEventDate(ev.dateStart)
      if (!parsed) {
        undated.push(ev)
        continue
      }
      const key = `${parsed.y}-${parsed.m}`
      if (!buckets.has(key)) buckets.set(key, { y: parsed.y, m: parsed.m, events: [] })
      buckets.get(key)!.events.push({ ev, d: parsed.d })
    }
    const ordered = [...buckets.values()].sort((a, b) => a.y - b.y || a.m - b.m)
    for (const bucket of ordered) bucket.events.sort((a, b) => a.d - b.d)
    return { ordered, undated }
  }, [visible])

  // Soonest three dated events, across all months, for the "Next up" strip.
  const nextUp = useMemo(() => {
    const dated: { ev: Ev; y: number; m: number; d: number }[] = []
    for (const ev of visible) {
      const parsed = parseEventDate(ev.dateStart)
      if (parsed) dated.push({ ev, ...parsed })
    }
    dated.sort((a, b) => a.y - b.y || a.m - b.m || a.d - b.d)
    return dated.slice(0, 3)
  }, [visible])

  const toggleType = (t: EventType) => {
    setTypes((prev) => {
      const next = new Set(prev)
      if (next.has(t)) next.delete(t)
      else next.add(t)
      return next
    })
  }

  const chipBase: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: 'var(--text-label)',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    padding: '8px 16px',
    borderRadius: 'var(--radius-pill, 100px)',
    cursor: 'pointer',
    border: '1px solid var(--gold)',
    background: 'transparent',
    color: 'var(--gold)',
    transition: 'background 0.15s, color 0.15s',
  }
  const chipActive: React.CSSProperties = { background: 'var(--gold)', color: '#000' }

  const toggleBtnBase: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: 'var(--text-sm)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '10px 20px',
    minHeight: 44,
    cursor: 'pointer',
    border: '1px solid var(--gold)',
    background: '#000',
    color: 'var(--gold)',
  }

  const eventCardStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--space-3)',
    width: '100%',
    textAlign: 'left',
    border: 'none',
    cursor: 'pointer',
    background: 'var(--gold)',
    color: '#000',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-2)',
  }

  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ padding: '140px clamp(24px,5vw,80px) 48px', borderBottom: '1px solid var(--gold)' }}>
        <span style={{ display: 'block', fontSize: 'var(--text-label)', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 18, fontFamily: 'var(--font-body)', fontWeight: 700 }}>
          Community Calendar · Los Angeles
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px, 8vw, 120px)', lineHeight: 0.9, color: '#fff', marginBottom: 24, textTransform: 'uppercase' }}>
          What&apos;s Happening
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(15px, 1.3vw, 19px)', color: '#fff', maxWidth: 640, lineHeight: 1.7 }}>
          Every week, every month — IBTU shows up. Filter by program or by how you want to
          get involved, then tap an event to register, volunteer, or apply as a vendor.
        </p>
      </div>

      {/* Filters */}
      <div style={{ padding: 'clamp(28px,4vw,48px) clamp(24px,5vw,80px) 8px' }}>
        <div style={{ marginBottom: 20 }}>
          <span style={{ display: 'block', fontSize: 'var(--text-label)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: 10 }}>
            Program
          </span>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={() => setProgram('all')} style={{ ...chipBase, ...(program === 'all' ? chipActive : {}) }}>All</button>
            {programs.map((p: Ev) => (
              <button key={p.slug} onClick={() => setProgram(p.slug)} style={{ ...chipBase, ...(program === p.slug ? chipActive : {}) }}>
                {p.title}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span style={{ display: 'block', fontSize: 'var(--text-label)', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: 10 }}>
              How to get involved
            </span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {(Object.keys(TYPE_LABELS) as EventType[]).map((t) => (
                <button key={t} onClick={() => toggleType(t)} style={{ ...chipBase, ...(types.has(t) ? chipActive : {}) }}>
                  {TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
          <div role="group" aria-label="Events layout" style={{ display: 'flex', border: '1px solid var(--gold)' }}>
            <button
              type="button"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
              style={{ ...toggleBtnBase, ...(view === 'list' ? chipActive : {}), border: 'none', borderRight: '1px solid var(--gold)' }}
            >
              List
            </button>
            <button
              type="button"
              aria-pressed={view === 'grid'}
              onClick={() => setView('grid')}
              style={{ ...toggleBtnBase, ...(view === 'grid' ? chipActive : {}), border: 'none' }}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {/* Next up */}
      {nextUp.length > 0 && (
        <div style={{ padding: 'clamp(28px,4vw,48px) clamp(24px,5vw,80px) 0' }}>
          <span style={{ display: 'inline-block', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-label)', letterSpacing: '2px', textTransform: 'uppercase', color: '#000', background: 'var(--gold)', padding: '4px 12px', marginBottom: 10 }}>
            Next up
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
            {nextUp.map(({ ev, y, m, d }, i) => (
              <button key={i} type="button" onClick={() => setActive(ev)} style={eventCardStyle}>
                <div style={{ flex: '0 0 auto' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 900, fontSize: 'var(--text-lg)', lineHeight: 1 }}>{d}</span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>{WEEKDAYS_SHORT[new Date(y, m, d).getDay()]}</span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--text-base)' }}>{ev.title}</span>
                  {ev.programTitle && (
                    <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', marginTop: 2 }}>{ev.programTitle}</span>
                  )}
                  <TypePills ev={ev} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Events */}
      <div style={{ padding: 'clamp(28px,4vw,48px) clamp(24px,5vw,80px) 60px' }}>
        {months.ordered.length === 0 && months.undated.length === 0 && (
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--gold)', fontSize: 'var(--text-base)' }}>
            No events match these filters yet — try clearing a filter.
          </p>
        )}

        {view === 'list' && months.ordered.map(({ y, m, events: monthEvents }) => {
          return (
            <div key={`${y}-${m}`} style={{ marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,48px)', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>
                {MONTHS[m]} {y}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                {monthEvents.map(({ ev, d }, i) => (
                  <button key={i} type="button" onClick={() => setActive(ev)} style={eventCardStyle}>
                    <div style={{ flex: '0 0 auto', minWidth: 48 }}>
                      <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 900, fontSize: 'var(--text-lg)', lineHeight: 1 }}>{d}</span>
                      <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>{WEEKDAYS_SHORT[new Date(y, m, d).getDay()]}</span>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 'var(--text-base)' }}>{ev.title}</span>
                      {ev.programTitle && (
                        <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', marginTop: 2 }}>{ev.programTitle}</span>
                      )}
                      <TypePills ev={ev} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )
        })}

        {view === 'grid' && months.ordered.map(({ y, m, events: monthEvents }) => {
          const firstWeekday = new Date(y, m, 1).getDay()
          const daysInMonth = new Date(y, m + 1, 0).getDate()
          const byDay = new Map<number, Ev[]>()
          for (const { ev, d } of monthEvents) {
            if (!byDay.has(d)) byDay.set(d, [])
            byDay.get(d)!.push(ev)
          }
          const cells: (number | null)[] = [
            ...Array(firstWeekday).fill(null),
            ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
          ]
          return (
            <div key={`${y}-${m}`} style={{ marginBottom: 56 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,3vw,48px)', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 20 }}>
                {MONTHS[m]} {y}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1, background: 'var(--gold)', border: '1px solid var(--gold)' }}>
                {WEEKDAYS.map((w, i) => (
                  <div key={`wd-${i}`} style={{ background: '#000', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-label)', letterSpacing: '1px', textAlign: 'center', padding: '8px 0' }}>
                    {w}
                  </div>
                ))}
                {cells.map((day, i) => {
                  const dayEvents = day ? byDay.get(day) : undefined
                  return (
                    <div key={`c-${i}`} style={{ background: '#000', minHeight: 96, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {day && (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: dayEvents ? 'var(--gold)' : '#fff', fontWeight: dayEvents ? 700 : 400 }}>
                          {day}
                        </span>
                      )}
                      {dayEvents?.map((ev: Ev, j: number) => {
                        const label = ev.programTitle ? `${ev.programTitle}` : ev.title
                        return (
                          <button
                            key={j}
                            type="button"
                            onClick={() => setActive(ev)}
                            style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', background: 'var(--gold)', color: '#000', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 'var(--text-sm)', lineHeight: 1.2, padding: '4px 6px', borderRadius: 6, overflow: 'hidden' }}
                          >
                            {ev.title}
                            <span style={{ display: 'block', fontWeight: 400, fontSize: 'var(--text-sm)' }}>{label}</span>
                          </button>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}

        {/* Ongoing / dates-TBD events that don't sit on a single calendar day */}
        {months.undated.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px,2.5vw,40px)', color: '#fff', textTransform: 'uppercase', marginBottom: 16 }}>
              Ongoing &amp; Upcoming
            </h2>
            <div style={{ display: 'grid', gap: 1, background: 'var(--gold)', border: '1px solid var(--gold)' }}>
              {months.undated.map((ev: Ev, i: number) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(ev)}
                  style={{ background: '#000', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, padding: '14px 16px' }}
                >
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-base)', color: '#fff', fontWeight: 600 }}>{ev.title}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
                    {ev.programTitle || ev.dateStart || 'TBD'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <EventModal event={active} onClose={() => setActive(null)} />
    </main>
  )
}
