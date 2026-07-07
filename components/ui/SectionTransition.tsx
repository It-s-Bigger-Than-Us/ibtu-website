'use client'

import { useEffect, useRef, useState } from 'react'

import { LibrarySource, variantPaths } from '@/lib/video-library'

/* SectionTransition
   2.5s motion clip that plays when the element scrolls into view.
   Drop between two content sections; it acts as a visual wipe between
   them. Uses the {tag}-transition-720 variant. */

interface SectionTransitionProps {
  src: LibrarySource
  height?: string
  threshold?: number
  className?: string
  style?: React.CSSProperties
  rootMargin?: string
  loop?: boolean
}

export default function SectionTransition({
  src,
  height = '40vh',
  threshold = 0.4,
  rootMargin = '0px',
  className = '',
  style,
  loop = false,
}: SectionTransitionProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const v = videoRef.current
        if (!v) return
        v.currentTime = 0
        v.play().catch(() => {})
        setHasPlayed(true)
        if (!loop) observer.disconnect()
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, loop])

  const paths = variantPaths(src, 'transition')

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        background: '#000',
        ...style,
      }}
      role="presentation"
    >
      <video
        ref={videoRef}
        poster={paths.poster}
        playsInline
        muted
        loop={loop}
        preload="metadata"
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: hasPlayed ? 1 : 0,
          transition: 'opacity 0.25s ease',
        }}
      >
        <source src={paths.webm} type="video/webm" />
        <source src={paths.mp4} type="video/mp4" />
      </video>
    </div>
  )
}
