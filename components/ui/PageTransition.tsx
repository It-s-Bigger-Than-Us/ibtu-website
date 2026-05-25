'use client'

import { usePathname } from 'next/navigation'
import { ReactNode, useEffect, useRef, useState } from 'react'

import GlitchSplash from './GlitchSplash'

/* PageTransition
   App Router page-transition wrapper that plays GlitchSplash on entry to
   designated routes. Detects pathname changes via usePathname; on a match
   in `routePatterns`, mounts the splash, waits for it to complete, then
   hides it.

   Default routes (per plan): homepage initial load and every
   /our-programs/[slug] entry. */

interface PageTransitionProps {
  children: ReactNode
  /** RegExp patterns; splash fires when pathname matches any. */
  routePatterns?: RegExp[]
  /** Force-skip the splash (e.g. inside /studio). */
  disabled?: boolean
}

const DEFAULT_PATTERNS: RegExp[] = [/^\/our-programs\/[^/]+$/]

// Routes that must never get the overlay (Sanity Studio runs its own UI).
const NEVER_PATTERNS: RegExp[] = [/^\/studio/]

export default function PageTransition({
  children,
  routePatterns = DEFAULT_PATTERNS,
  disabled = false,
}: PageTransitionProps) {
  const pathname = usePathname() ?? '/'
  const previous = useRef<string | null>(null)
  const [showSplash, setShowSplash] = useState(false)
  const isExcluded = NEVER_PATTERNS.some((re) => re.test(pathname))

  useEffect(() => {
    if (disabled || isExcluded) return
    if (previous.current === pathname) return
    const isFirstMount = previous.current === null
    previous.current = pathname

    const matches = routePatterns.some((re) => re.test(pathname))
    if (!matches) return

    // Skip first-mount splash if pathname isn't homepage to avoid flashing
    // splash on deep links to non-/ routes the user shared.
    if (isFirstMount && pathname !== '/') return

    setShowSplash(true)
  }, [pathname, routePatterns, disabled, isExcluded])

  if (isExcluded) return <>{children}</>

  return (
    <>
      <GlitchSplash show={showSplash} onComplete={() => setShowSplash(false)} />
      {children}
    </>
  )
}
