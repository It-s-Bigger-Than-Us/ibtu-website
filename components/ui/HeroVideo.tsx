'use client'

import { useEffect, useRef, useState } from 'react'

import {
  LibrarySource,
  LibrarySize,
  defaultSize,
  sizeForViewport,
  variantPaths,
} from '@/lib/video-library'

/* HeroVideo
   Full-bleed muted/looped video background driven by a library tag.
   Picks the closest size to the viewport, emits both webm + mp4
   <source>s, and shows the poster JPG while loading. */

interface HeroVideoProps {
  src: LibrarySource
  size?: LibrarySize
  height?: string
  aspectRatio?: string
  priority?: boolean
  overlay?: 'none' | 'dim' | 'gold'
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}

const OVERLAYS: Record<NonNullable<HeroVideoProps['overlay']>, string> = {
  none: 'transparent',
  dim: 'rgba(0,0,0,0.35)',
  gold: 'rgba(255,199,0,0.18)',
}

export default function HeroVideo({
  src,
  size,
  height = '100vh',
  aspectRatio,
  priority = false,
  overlay = 'none',
  className = '',
  style,
  ariaLabel,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [resolvedSize, setResolvedSize] = useState<LibrarySize>(
    size ?? defaultSize('bg-loop')
  )

  useEffect(() => {
    if (size) return
    const update = () => setResolvedSize(sizeForViewport('bg-loop', window.innerWidth))
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [size])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [src, resolvedSize])

  const paths = variantPaths(src, 'bg-loop', resolvedSize)

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: aspectRatio ? undefined : height,
        aspectRatio,
        overflow: 'hidden',
        background: '#000',
        ...style,
      }}
      role={ariaLabel ? undefined : 'presentation'}
      aria-label={ariaLabel}
    >
      <video
        ref={videoRef}
        key={`${src}-${resolvedSize}`}
        poster={paths.poster}
        playsInline
        autoPlay
        muted
        loop
        preload={priority ? 'auto' : 'metadata'}
        aria-hidden={ariaLabel ? undefined : true}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={paths.webm} type="video/webm" />
        <source src={paths.mp4} type="video/mp4" />
      </video>
      {overlay !== 'none' && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: OVERLAYS[overlay],
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  )
}
