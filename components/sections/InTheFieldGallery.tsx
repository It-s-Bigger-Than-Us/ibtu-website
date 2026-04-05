'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

/*  ═══════════════════════════════════════
    IN THE FIELD — tiled editorial gallery
    CSS Grid, asymmetric layout, Motion for React hover.
    No GSAP. No ScrollTrigger. No parallax.
═══════════════════════════════════════ */

export interface GalleryItem {
  id: string
  image: string
  alt: string
  title?: string
  span?: 'default' | 'tall' | 'wide' | 'large'
}

interface InTheFieldGalleryProps {
  items: GalleryItem[]
}

/* Repeating tile pattern for editorial rhythm */
const SPAN_PATTERN: GalleryItem['span'][] = [
  'large',   // 2×2 hero
  'default', // 1×1
  'tall',    // 1×2
  'default', // 1×1
  'default', // 1×1
  'wide',    // 2×1
  'default', // 1×1
  'tall',    // 1×2
]

function getSpan(item: GalleryItem, index: number): NonNullable<GalleryItem['span']> {
  return item.span || SPAN_PATTERN[index % SPAN_PATTERN.length] || 'default'
}

const SPAN_CLASSES: Record<NonNullable<GalleryItem['span']>, string> = {
  default: 'col-span-1 row-span-1',
  tall:    'col-span-1 row-span-2',
  wide:    'col-span-2 row-span-1',
  large:   'col-span-2 row-span-2',
}

/* Mobile: collapse all spans to single cells */
const MOBILE_SPAN_CLASSES: Record<NonNullable<GalleryItem['span']>, string> = {
  default: 'max-md:col-span-1 max-md:row-span-1',
  tall:    'max-md:col-span-1 max-md:row-span-1',
  wide:    'max-md:col-span-1 max-md:row-span-1',
  large:   'max-md:col-span-2 max-md:row-span-1',
}

export default function InTheFieldGallery({ items }: InTheFieldGalleryProps) {
  if (items.length === 0) return null

  return (
    <div
      className="grid grid-cols-4 gap-[var(--grid-gap)] max-lg:grid-cols-3 max-md:grid-cols-2"
      style={{ gridAutoRows: 'clamp(200px, 18vw, 280px)' }}
    >
      {items.map((item, i) => {
        const span = getSpan(item, i)
        return (
          <motion.div
            key={item.id}
            className={`relative overflow-hidden rounded-2xl ${SPAN_CLASSES[span]} ${MOBILE_SPAN_CLASSES[span]}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: Math.min(i * 0.04, 0.32), ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4, scale: 1.015 }}
          >
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes={span === 'large' || span === 'wide' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                className="object-cover"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
            </motion.div>
            {item.title && (
              <div className="absolute bottom-0 inset-x-0 p-4 pt-10 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                <span className="font-[family-name:var(--font-body)] text-[11px] font-bold uppercase tracking-[2px] text-white">
                  {item.title}
                </span>
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
