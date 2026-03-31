'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoloGlassProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  hover?: boolean
  as?: 'div' | 'section' | 'article'
}

export default function HoloGlass({
  children,
  className = '',
  style,
  hover = false,
  as: Tag = 'div',
}: HoloGlassProps) {
  if (hover) {
    return (
      <motion.div
        className={className}
        style={{ position: 'relative', ...style }}
        whileHover="hovered"
        initial="idle"
      >
        <motion.div
          variants={{
            idle: { opacity: 0 },
            hovered: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            padding: '2px',
            background: 'var(--holo-gradient)',
            backgroundSize: '400% 400%',
            animation: 'holo-shift 6s ease infinite',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude' as never,
            pointerEvents: 'none',
          }}
        />
        {children}
      </motion.div>
    )
  }

  return (
    <Tag className={`holo-glass ${className}`} style={style}>
      {children}
    </Tag>
  )
}
