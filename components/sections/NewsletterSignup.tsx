'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import confetti from 'canvas-confetti'

type Status = 'idle' | 'loading' | 'success' | 'error'

const STORAGE_KEY = 'ibtu_newsletter_prompt_v1'
// Shared with NewsletterMount.tsx — bump both together if the shape changes.
const PAGEVIEW_KEY = 'ibtu_newsletter_pageviews_v1'
// Set the moment the dialog opens; once present, never open again this tab session.
const SESSION_KEY = 'ibtu_newsletter_session_v1'
const SUPPRESS_DAYS = 14
const SCROLL_TRIGGER = 0.6
const HERO_WAIT_MS = 10_000
// Exit is 65 percent of the enter duration (finding 09). Both the backdrop
// fade and the frame pop-in animate on --dur-base (300ms), so their reversed
// exit keyframes (see globals.css [data-closing]) both finish at 195ms.
const CLOSE_ANIM_MS = 195

function shouldSuppress(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw) as { status?: string; ts?: number }
    if (data.status === 'subscribed') return true
    if (data.status === 'dismissed' && data.ts) {
      const ageMs = Date.now() - data.ts
      return ageMs < SUPPRESS_DAYS * 24 * 60 * 60 * 1000
    }
    return false
  } catch {
    return false
  }
}

function persist(status: 'subscribed' | 'dismissed') {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ status, ts: Date.now() }),
    )
  } catch {
    /* ignore */
  }
}

function hasOpenedThisSession(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function markOpenedThisSession() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* ignore */
  }
}

function getPageviewCount(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = window.sessionStorage.getItem(PAGEVIEW_KEY)
    return raw ? parseInt(raw, 10) || 0 : 0
  } catch {
    return 0
  }
}

function heroIntroDone(): boolean {
  if (typeof document === 'undefined') return true
  const flag = document.documentElement.dataset.heroIntro
  // No hero on this render (or it hasn't set the flag yet) — treated as done
  // once the wait cap below elapses, so we never block forever on a page
  // that has no hero at all.
  return flag === 'done'
}

// Waits for the hero intro timeline to finish (data-hero-intro="done" on
// <html>) before firing cb, capped at HERO_WAIT_MS so a page with no hero
// (or a stalled one) never blocks the dialog forever.
function waitForHeroReady(cb: () => void, isCancelled: () => boolean) {
  if (heroIntroDone()) {
    cb()
    return
  }
  const startedAt = Date.now()
  const check = () => {
    if (isCancelled()) return
    if (heroIntroDone() || Date.now() - startedAt > HERO_WAIT_MS) {
      cb()
      return
    }
    requestAnimationFrame(check)
  }
  requestAnimationFrame(check)
}

export default function NewsletterSignup() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closedManually = useRef(false)
  const revealedRef = useRef(false)
  const cancelledRef = useRef(false)
  // At most one hero-ready wait in flight; scroll events past the trigger
  // fire many times per second and must not each start a polling loop.
  const waitingRef = useRef(false)
  const { scrollYProgress } = useScroll()

  const attemptRevealRef = useRef<() => void>(() => {})
  attemptRevealRef.current = () => {
    if (cancelledRef.current || closedManually.current || revealedRef.current) return
    if (shouldSuppress() || hasOpenedThisSession()) return
    revealedRef.current = true
    markOpenedThisSession()
    setOpen(true)
  }

  const requestReveal = () => {
    if (waitingRef.current || revealedRef.current) return
    waitingRef.current = true
    waitForHeroReady(
      () => {
        waitingRef.current = false
        attemptRevealRef.current()
      },
      () => cancelledRef.current,
    )
  }
  const requestRevealRef = useRef(requestReveal)
  requestRevealRef.current = requestReveal

  // Trigger A: second page view reached while on Home.
  // Trigger B: exit intent (mouse leaves toward the browser chrome), Home only.
  // Both wait for the hero intro to finish before opening.
  useEffect(() => {
    cancelledRef.current = false
    if (shouldSuppress() || hasOpenedThisSession()) {
      return () => {
        cancelledRef.current = true
      }
    }

    if (getPageviewCount() >= 2) requestRevealRef.current()

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) requestRevealRef.current()
    }
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelledRef.current = true
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  // Trigger C: 60% scroll depth of the document, Home only (this component
  // is mounted on the Home route only — see NewsletterMount.tsx).
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < SCROLL_TRIGGER) return
    requestRevealRef.current()
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close('dismiss')
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    setTimeout(() => dialogRef.current?.focus(), 60)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function close(reason: 'dismiss' | 'success' | 'manual') {
    closedManually.current = true
    if (reason === 'success') persist('subscribed')
    else persist('dismissed')
    setClosing(true)
    setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, CLOSE_ANIM_MS)
  }

  function fireConfetti() {
    const rect = buttonRef.current?.getBoundingClientRect()
    const origin = rect
      ? {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        }
      : { x: 0.5, y: 0.5 }

    const colors = ['#FFC700', '#000000']
    const defaults = {
      origin,
      colors,
      ticks: 220,
      gravity: 0.85,
      scalar: 1.15,
      shapes: ['square', 'circle'] as confetti.Shape[],
    }

    confetti({ ...defaults, particleCount: 100, spread: 75, startVelocity: 48 })
    confetti({ ...defaults, particleCount: 60, spread: 140, startVelocity: 28, decay: 0.92 })
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 50, spread: 110, startVelocity: 38 })
    }, 220)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus('error')
        setMessage(data?.error || 'Something went wrong. Try again.')
        return
      }
      setStatus('success')
      setMessage(
        data?.status === 'already_subscribed'
          ? "You're already on the list — welcome back."
          : "You're in. Watch your inbox.",
      )
      setEmail('')
      fireConfetti()
      setTimeout(() => close('success'), 2800)
    } catch {
      setStatus('error')
      setMessage('Network error. Try again.')
    }
  }

  if (!open) return null

  return (
    <div
      className="ibtu-newsletter-backdrop"
      data-closing={closing ? 'true' : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) close('dismiss')
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="ibtu-newsletter-frame"
      >
        <button
          type="button"
          aria-label="Close newsletter prompt"
          className="ibtu-newsletter-close"
          onClick={() => close('manual')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div className="ibtu-newsletter-card">
          <span className="ibtu-newsletter-eyebrow">Stay Close</span>
          <h2 id="newsletter-heading" className="ibtu-newsletter-headline">
            Join the<br />Newsletter
          </h2>
          <p className="ibtu-newsletter-body">
            Field notes from the work — programs, partners, and the people building Los Angeles. One email a month. No spam.
          </p>

          <form className="ibtu-newsletter-form" onSubmit={onSubmit} noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ibtu-newsletter-input"
              disabled={status === 'loading' || status === 'success'}
            />
            <button
              ref={buttonRef}
              type="submit"
              className="ibtu-newsletter-submit"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Joining…' : status === 'success' ? 'Joined' : 'Count Me In'}
            </button>
          </form>

          <div
            className="ibtu-newsletter-message"
            data-state={status}
            aria-live="polite"
          >
            {message}
          </div>

          <button
            type="button"
            className="ibtu-newsletter-decline"
            onClick={() => close('dismiss')}
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  )
}
