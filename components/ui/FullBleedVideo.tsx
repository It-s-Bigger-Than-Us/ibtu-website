'use client'

import { useRef, useEffect } from 'react'

interface FullBleedVideoProps {
  src: string
  aspectRatio?: string
  height?: string
  priority?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function FullBleedVideo({
  src,
  aspectRatio,
  height = '100vh',
  priority = false,
  className = '',
  style,
}: FullBleedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

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
      <video
        ref={videoRef}
        src={src}
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
    </div>
  )
}
