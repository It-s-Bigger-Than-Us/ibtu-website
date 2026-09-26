'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const NewsletterSignup = dynamic(
  () => import('@/components/sections/NewsletterSignup'),
  { ssr: false },
)

// Shared with NewsletterSignup.tsx — bump both together if the shape changes.
const PAGEVIEW_KEY = 'ibtu_newsletter_pageviews_v1'

export default function NewsletterMount() {
  const pathname = usePathname()
  const lastCounted = useRef<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (pathname?.startsWith('/studio')) return
    if (lastCounted.current === pathname) return
    lastCounted.current = pathname
    try {
      const raw = window.sessionStorage.getItem(PAGEVIEW_KEY)
      const count = raw ? parseInt(raw, 10) || 0 : 0
      window.sessionStorage.setItem(PAGEVIEW_KEY, String(count + 1))
    } catch {
      /* ignore */
    }
  }, [pathname])

  if (pathname?.startsWith('/studio')) return null
  // The newsletter dialog only ever opens on Home — never interrupt a
  // program, event, or get-involved page.
  if (pathname !== '/') return null
  return <NewsletterSignup />
}
