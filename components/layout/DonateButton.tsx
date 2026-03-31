'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function DonateButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = window.innerWidth * 0.6
      const exitThreshold = window.innerWidth * 0.4

      if (e.clientX > threshold && e.clientY < 100) {
        setVisible(true)
      } else if (e.clientX < exitThreshold) {
        setVisible(false)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 100,
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--ibtu-black)',
            padding: '0 32px',
          }}
        >
          <Link
            href="/donate"
            className="sparkle-stroke"
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              background: 'var(--ibtu-gold)',
              color: 'var(--ibtu-black)',
              borderRadius: '4px',
              padding: '12px 32px',
              transition: 'background 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--ibtu-white)'
              e.currentTarget.style.color = 'var(--ibtu-black)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--ibtu-gold)'
              e.currentTarget.style.color = 'var(--ibtu-black)'
            }}
          >
            Donate Now
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
