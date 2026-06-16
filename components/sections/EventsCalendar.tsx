'use client'

import { useMemo, useState } from 'react'
import EventModal from '@/components/events/EventModal'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ev = any

type EventType = 'attendee' | 'volunteer' | 'vendor'

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


/**
 * The /events calendar — month grid of upcoming/active events with filter chips by
 * program and by involvement type. Clicking an event jumps to its block on the program
 * page (events live on program pages; this is the index). Brand-locked to gold/black/
 * white, so programs are distinguished by label, not hue.
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

  // Group the parseable events by month, sorted chronologically.
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
    return { ordered, undated }
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
    fontSize: 12,
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

  return (
    <main style={{ background: '#000', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ padding: '140px clamp(24px,5vw,80px) 48px', borderBottom: '1px solid var(--gold)' }}>
        <span style={{ display: 'block', fontSize: 11, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 18, fontFamily: 'var(--font-body)', fontWeight: 700 }}>
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
          <span style={{ display: 'block', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: 10 }}>
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
        <div>
          <span style={{ display: 'block', fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: 10 }}>
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
      </div>

      {/* Month grids */}
      <div style={{ padding: 'clamp(28px,4vw,48px) clamp(24px,5vw,80px) 60px' }}>
        {months.ordered.length === 0 && months.undated.length === 0 && (
          <p style={{ fontFamily: 'var(--font-body)', color: 'var(--gold)', fontSize: 16 }}>
            No events match these filters yet — try clearing a filter.
          </p>
        )}

        {months.ordered.map(({ y, m, events: monthEvents }) => {
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
                  <div key={`wd-${i}`} style={{ background: '#000', color: 'var(--gold)', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 11, letterSpacing: '1px', textAlign: 'center', padding: '8px 0' }}>
                    {w}
                  </div>
                ))}
                {cells.map((day, i) => {
                  const dayEvents = day ? byDay.get(day) : undefined
                  return (
                    <div key={`c-${i}`} style={{ background: '#000', minHeight: 96, padding: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {day && (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: dayEvents ? 'var(--gold)' : '#fff', fontWeight: dayEvents ? 700 : 400 }}>
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
                            style={{ display: 'block', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer', background: 'var(--gold)', color: '#000', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 10, lineHeight: 1.2, padding: '4px 6px', borderRadius: 6, overflow: 'hidden' }}
                          >
                            {ev.title}
                            <span style={{ display: 'block', fontWeight: 400, fontSize: 9 }}>{label}</span>
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
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#fff', fontWeight: 600 }}>{ev.title}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
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
