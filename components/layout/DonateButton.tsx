'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Link from 'next/link'

/* ═══════════════════════════════════════
   ACTION BAR — slides in from left,
   aligned with logo, horizontal.
   Donate + Volunteer + Support Us
═══════════════════════════════════════ */

const ACTIONS = [
  { label: 'Donate', href: 'https://secure.qgiv.com/for/ibt/' },
  { label: 'Volunteer', href: 'https://volunteer.bloomerang.co/volunteer/#/join-party?k=u9uiz8g1753qfr' },
  { label: 'Support Us', href: '/get-involved' },
]

export default function DonateButton() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    setVisible(scrollY.get() > window.innerHeight * 0.5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMotionValueEvent(scrollY, 'change', (y) => {
    setVisible(y > window.innerHeight * 0.5)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: '-100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 0, transition: { duration: 0.7 * 0.65, ease: [0.16, 1, 0.3, 1] } }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            top: '100px',
            left: '24px',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {ACTIONS.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="sparkle-stroke"
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-label)',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                background: 'var(--ibtu-black)',
                color: 'var(--ibtu-gold)',
                borderRadius: '16px',
                padding: '10px 20px',
                whiteSpace: 'nowrap',
                transition: 'background var(--dur-base) var(--ease-out-expo), color var(--dur-base)',
                textAlign: 'center',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--ibtu-gold)'
                e.currentTarget.style.color = 'var(--ibtu-black)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--ibtu-black)'
                e.currentTarget.style.color = 'var(--ibtu-gold)'
              }}
            >
              {action.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
