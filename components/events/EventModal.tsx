'use client'

import { useEffect } from 'react'
import EventEmbedBlock from '@/components/events/EventEmbedBlock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ev = any

/**
 * Full-event popup. Opened from the compact event rail on program pages AND from the
 * /events calendar. Renders the shared EventEmbedBlock so the modal carries the flyer,
 * full info, the embedded Eventbrite checkout, and all three CTAs — one source of truth
 * for "the event surface." Solid-black scrim (brand: no opacity reductions).
 */
export default function EventModal({ event, onClose }: { event: Ev | null; onClose: () => void }) {
  useEffect(() => {
    if (!event) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [event, onClose])

  if (!event) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: '#000',
        overflowY: 'auto',
        display: 'flex',
        justifyContent: 'center',
        padding: 'clamp(56px, 8vh, 96px) clamp(16px, 4vw, 48px) clamp(24px, 5vh, 64px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'relative', width: 'min(880px, 100%)', margin: 'auto 0' }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: -48,
            right: 0,
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-pill, 100px)',
            background: 'var(--gold)',
            color: '#000',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontWeight: 800,
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          ×
        </button>
        <EventEmbedBlock event={event} />
      </div>
    </div>
  )
}
