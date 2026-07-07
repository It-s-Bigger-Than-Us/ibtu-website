'use client'

import { useRef, ReactNode } from 'react'

import { LibrarySource, variantPaths } from '@/lib/video-library'

/* HoverAccent
   Looping accent video behind a child element. Plays on pointer enter,
   pauses on leave. Designed for program cards, sponsor tiles, CTA buttons.
   Uses the {tag}-hover-480 variant (small file, fast hover response). */

interface HoverAccentProps {
  src: LibrarySource
  children?: ReactNode
  borderRadius?: string | number
  fadeOnIdle?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function HoverAccent({
  src,
  children,
  borderRadius,
  fadeOnIdle = true,
  className = '',
  style,
}: HoverAccentProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const onEnter = () => {
    const v = videoRef.current
    if (!v) return
    v.style.opacity = '1'
    v.play().catch(() => {})
  }

  const onLeave = () => {
    const v = videoRef.current
    if (!v) return
    if (fadeOnIdle) v.style.opacity = '0'
    v.pause()
  }

  const paths = variantPaths(src, 'hover')

  return (
    <div
      className={className}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius,
        ...style,
      }}
    >
      <video
        ref={videoRef}
        poster={paths.poster}
        playsInline
        muted
        loop
        preload="metadata"
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: fadeOnIdle ? 0 : 1,
          transition: 'opacity 0.35s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <source src={paths.webm} type="video/webm" />
        <source src={paths.mp4} type="video/mp4" />
      </video>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  )
}
