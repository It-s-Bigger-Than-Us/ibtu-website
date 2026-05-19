'use client'

import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'

type Status = 'idle' | 'loading' | 'success' | 'error'

const STORAGE_KEY = 'ibtu_newsletter_prompt_v1'
const SHOW_DELAY_MS = 12_000
const SUPPRESS_DAYS = 14

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

export default function NewsletterSignup() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closedManually = useRef(false)

  useEffect(() => {
    if (shouldSuppress()) return
    let scrolled = false
    let timer: ReturnType<typeof setTimeout> | null = null

    const reveal = () => {
      if (closedManually.current) return
      setOpen(true)
    }

    const onScroll = () => {
      if (scrolled) return
      const triggerY = window.innerHeight * 0.6
      if (window.scrollY > triggerY) {
        scrolled = true
        reveal()
      }
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) reveal()
    }

    timer = setTimeout(reveal, SHOW_DELAY_MS)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      if (timer) clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

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
    setOpen(false)
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
