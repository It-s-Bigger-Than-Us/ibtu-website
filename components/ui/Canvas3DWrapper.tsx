'use client'

import { Component, ReactNode, useState, useEffect } from 'react'

/* Error boundary to catch Three.js/R3F crashes */
class Canvas3DErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

/* Deferred loader — delays mounting until after initial paint */
function DeferredMount({ delay = 0, children, fallback }: {
  delay?: number
  children: ReactNode
  fallback: ReactNode
}) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!ready) return fallback
  return children
}

/* Wraps any 3D/R3F component with error boundary + deferred loading */
export default function Canvas3DWrapper({
  children,
  fallback,
  delay = 0,
}: {
  children: ReactNode
  fallback?: ReactNode
  delay?: number
}) {
  const fb = fallback || (
    <div style={{ width: '100%', height: '100%', background: 'var(--ibtu-black)' }} />
  )

  return (
    <Canvas3DErrorBoundary fallback={fb}>
      <DeferredMount delay={delay} fallback={fb}>
        {children}
      </DeferredMount>
    </Canvas3DErrorBoundary>
  )
}
