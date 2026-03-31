'use client'

import { ReactNode } from 'react'

interface SparkleStrokeProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  borderRadius?: string
}

export default function SparkleStroke({
  children,
  className = '',
  style,
  borderRadius = '4px',
}: SparkleStrokeProps) {
  return (
    <div
      className={`sparkle-stroke ${className}`}
      style={{ borderRadius, ...style }}
    >
      {children}
    </div>
  )
}
