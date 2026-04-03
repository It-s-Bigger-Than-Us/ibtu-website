'use client'

import dynamic from 'next/dynamic'

const StickyStorySection = dynamic(() => import('@/components/sections/StickyStorySection'), { ssr: false })
const StackingGallery = dynamic(() => import('@/components/sections/StackingGallery'), { ssr: false })
const EventGallery3D = dynamic(() => import('@/components/sections/EventGallery3D'), { ssr: false })
const InTheFieldGallery = dynamic(() => import('@/components/sections/InTheFieldGallery'), { ssr: false })

import AnimatedHeadline from '@/components/ui/AnimatedHeadline'

/* ═══════════════════════════════════════
   PROGRAM DETAIL CLIENT — wraps client-only
   sections that need ssr: false
═══════════════════════════════════════ */

interface StorySlide {
  image: string
  alt: string
  label?: string
  headline: string
  body?: string
  stat?: string
  type?: 'image' | 'video'
}

interface GalleryEvent {
  _id: string
  title: string
  year: number
  dateStart?: string
  location?: string
  shortDescription?: string
  proofStats?: string
}

interface ProgramDetailClientProps {
  slides: StorySlide[]
  galleryImages: Array<{ src: string; alt: string }>
  pastEvents: GalleryEvent[]
  fieldImages?: string[]
  programTitle?: string
}

export default function ProgramDetailClient({
  slides,
  galleryImages,
  pastEvents,
  fieldImages = [],
  programTitle = '',
}: ProgramDetailClientProps) {
  return (
    <>
      {/* Sticky Story — pinned left text + right media swaps */}
      {slides.length > 1 && (
        <StickyStorySection slides={slides} sectionLabel="(THE STORY)" />
      )}

      {/* Stacking Gallery — images slide + stack on scroll */}
      {galleryImages.length > 2 && (
        <StackingGallery images={galleryImages} />
      )}

      {/* IN THE FIELD — auto-scroll gallery on hover */}
      {fieldImages.length > 0 && (
        <section style={{
          background: '#000',
          padding: 'clamp(80px, 10vw, 140px) clamp(32px, 5vw, 80px)',
          overflow: 'hidden',
        }}>
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: '#FFC700',
              fontWeight: 700,
              marginBottom: 24,
            }}>
              (IN THE FIELD)
            </div>
            <InTheFieldGallery images={fieldImages} programTitle={programTitle} />
          </div>
        </section>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section style={{ padding: 'var(--section-pad) clamp(32px, 5vw, 80px)' }}>
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            <AnimatedHeadline
              text="Past Events"
              as="h2"
              size="section"
              color="var(--ibtu-white)"
              style={{ marginBottom: 48 }}
            />
            <EventGallery3D events={pastEvents} />
          </div>
        </section>
      )}
    </>
  )
}
