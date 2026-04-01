'use client'

import { ReactNode } from 'react'

/* Page transition disabled — was causing conflicts with
   GSAP ScrollTrigger pinning. Simple passthrough. */

export default function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>
}
