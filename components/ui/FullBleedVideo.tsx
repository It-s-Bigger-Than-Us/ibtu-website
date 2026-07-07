'use client'

import { useRef, useEffect } from 'react'

import {
  LibrarySize,
  LibrarySource,
  variantPaths,
} from '@/lib/video-library'

const KNOWN_LIBRARY_TAGS = new Set<LibrarySource>([
  'holo01',
  'holo02',
  'holo03',
  'holo04',
  'holo05',
  'holo06',
])

interface FullBleedVideoProps {
  /** Either a library tag (e.g. "holo01") or a path to an mp4. */
  src: string
  /** When src is a library tag, override the size variant. Ignored for path-based src. */
  size?: LibrarySize
  aspectRatio?: string
  height?: string
  priority?: boolean
  className?: string
  style?: React.CSSProperties
  poster?: string
}

export default function FullBleedVideo({
  src,
  size = '720',
  aspectRatio,
  height = '100vh',
  priority = false,
  className = '',
  style,
  poster,
}: FullBleedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  const isLibraryTag = KNOWN_LIBRARY_TAGS.has(src as LibrarySource)
  const paths = isLibraryTag
    ? variantPaths(src as LibrarySource, 'bg-loop', size)
    : null

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: aspectRatio ? undefined : height,
        aspectRatio,
        overflow: 'hidden',
        ...style,
      }}
    >
      {paths ? (
        <video
          ref={videoRef}
          poster={poster ?? paths.poster}
          playsInline
          autoPlay
          muted
          loop
          preload={priority ? 'auto' : 'metadata'}
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
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          crossOrigin="anonymous"
          playsInline
          autoPlay
          muted
          loop
          preload={priority ? 'auto' : 'metadata'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  )
}
