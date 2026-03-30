import { getPrograms, getPillars } from '@/sanity/lib/fetch'
import { urlFor } from '@/sanity/lib/client'
import HeroSection from '@/components/sections/HeroSection'
import ValuesTicker from '@/components/sections/ValuesTicker'
import PillarCards from '@/components/sections/PillarCards'
import StatsSection from '@/components/sections/StatsSection'
import ProgramsGrid from '@/components/sections/ProgramsGrid'
import CTASection from '@/components/sections/CTASection'
import MissionMosaic from '@/components/sections/MissionMosaic'
import OrbitalGallery from '@/components/sections/OrbitalGallery'
import Footer from '@/components/layout/Footer'

const HERO_METADATA = [
  { label: 'Founded', value: '2020' },
  { label: 'Based', value: 'Los Angeles' },
  { label: 'Served', value: '62,475+' },
  { label: 'Pillars', value: 'Three' },
]

const VALUES = [
  'Community', 'Infrastructure', 'Resilience', 'Access',
  'Dignity', 'Equity', 'Stability', 'Trust',
]

const STATS = [
  { target: 62475, suffix: '+', label: 'Students Served' },
  { target: 5000, suffix: '+', label: 'Families Stabilized' },
  { target: 875500, suffix: '+', label: 'Lbs Food Distributed' },
  { target: 300, suffix: '+', label: 'Partners & Sponsors' },
]

const CTA_ACTIONS = [
  { label: 'Volunteer', href: '/get-involved#volunteer', primary: true },
  { label: 'Donate', href: '/donate', primary: true },
  { label: 'Partner With Us', href: '/get-involved#partner' },
  { label: 'Sponsor', href: '/get-involved#sponsor' },
]

/* Local gallery images from Obsidian vault — always available even if Sanity is empty */
const LOCAL_GALLERY_IMAGES = [
  { src: '/images/gallery/IMG_1848.jpg', alt: 'IBTU Coastal Care community cleanup', type: 'image' as const },
  { src: '/images/gallery/IMG_4993.jpg', alt: 'IBTU Coastal Care beach volunteers', type: 'image' as const },
  { src: '/images/gallery/IMG_1807.jpg', alt: 'IBTU community wellness event', type: 'image' as const },
  { src: '/images/gallery/IMG_4960.jpg', alt: 'IBTU yoga and wellness programming', type: 'image' as const },
  { src: '/images/gallery/IMG_1673.jpg', alt: 'IBTU community builders in action', type: 'image' as const },
  { src: '/images/gallery/IMG_4649.jpg', alt: 'IBTU volunteer activation', type: 'image' as const },
  { src: '/images/gallery/IMG_1861.jpg', alt: 'IBTU beach cleanup impact', type: 'image' as const },
  { src: '/images/gallery/IMG_4687.jpg', alt: 'IBTU yoga community gathering', type: 'image' as const },
  { src: '/images/gallery/IMG_1324.jpg', alt: 'IBTU event community connection', type: 'image' as const },
  { src: '/images/gallery/IMG_4907.jpg', alt: 'IBTU wellness programming outdoors', type: 'image' as const },
  { src: '/images/gallery/IMG_1501.jpg', alt: 'IBTU volunteers serving community', type: 'image' as const },
  { src: '/images/gallery/IMG_4944.jpg', alt: 'IBTU community wellness activation', type: 'image' as const },
]

const PILLAR_PROGRAM_MAP: Record<string, string> = {
  'Crisis & Disaster Stabilization': 'fire-relief',
  'School & Youth Stability': 'youth-programming',
  'Community Health & Resource Access': 'community-health',
}

export default async function HomePage() {
  const [sanityPrograms, sanityPillars] = await Promise.all([
    getPrograms().catch(() => []),
    getPillars().catch(() => []),
  ])

  /* Hero images from programs — fallback to local gallery */
  const sanityHeroImages = sanityPrograms
    .filter((p: { heroImage?: unknown }) => p.heroImage)
    .slice(0, 5)
    .map((p: { heroImage: unknown; title: string }) => ({
      src: urlFor(p.heroImage).width(1920).quality(85).url(),
      alt: `IBTU — ${p.title}`,
    }))
  const heroImages = sanityHeroImages.length > 0 ? sanityHeroImages : LOCAL_GALLERY_IMAGES.slice(0, 5)

  /* Pillar cards */
  const pillars = sanityPillars.length
    ? sanityPillars.map((p: { pillarName: string; tagline?: string; pageDescription?: string; headlineStat?: string }) => {
        const programSlug = PILLAR_PROGRAM_MAP[p.pillarName]
        const matchedProgram = sanityPrograms.find(
          (prog: { slug: string; pillar: string }) => prog.slug === programSlug || prog.pillar === p.pillarName
        )
        return {
          title: p.pillarName,
          tagline: p.tagline || p.pageDescription || '',
          stat: p.headlineStat || '',
          image: matchedProgram?.heroImage
            ? urlFor(matchedProgram.heroImage).width(800).quality(80).url()
            : '',
        }
      })
    : []

  /* Program cards */
  const programCards = sanityPrograms.map((p: { slug: string; title: string; pillar: string; heroImage?: unknown; cardStat?: string; tagline?: string }) => ({
    slug: p.slug,
    title: p.title,
    pillar: p.pillar,
    heroImage: p.heroImage ? urlFor(p.heroImage).width(800).quality(80).url() : '',
    cardStat: p.cardStat || '',
    description: p.tagline || '',
  }))

  /* Mission mosaic images — collect from all programs */
  const mosaicItems = sanityPrograms
    .flatMap((p: { heroImage?: unknown; cardImages?: unknown[]; title: string }) => {
      const items = []
      if (p.heroImage) {
        items.push({
          src: urlFor(p.heroImage).width(800).quality(80).url(),
          alt: `IBTU — ${p.title}`,
          type: 'image' as const,
        })
      }
      if (p.cardImages) {
        p.cardImages.slice(0, 2).forEach((img: unknown, i: number) => {
          if (img) {
            items.push({
              src: urlFor(img).width(600).quality(80).url(),
              alt: `${p.title} moment ${i + 1}`,
              type: 'image' as const,
            })
          }
        })
      }
      return items
    })
    .slice(0, 8)

  /* Use local gallery images as fallback if Sanity doesn't return enough */
  const allGalleryItems = mosaicItems.length >= 6 ? mosaicItems : [...mosaicItems, ...LOCAL_GALLERY_IMAGES].slice(0, 12)

  /* CTA image */
  const ctaImageSrc = sanityPrograms[0]?.cardImages?.[1]
    ? urlFor(sanityPrograms[0].cardImages[1]).width(1920).quality(80).url()
    : sanityPrograms[2]?.heroImage
      ? urlFor(sanityPrograms[2].heroImage).width(1920).quality(80).url()
      : ''

  return (
    <main>
      {/* 1. Hero — image carousel with video support */}
      <HeroSection
        images={heroImages}
        headline="Community is the Infrastructure"
        metadata={HERO_METADATA}
      />

      {/* 2. Values Ticker — gold bg, black text */}
      <ValuesTicker values={VALUES} speed={25} />

      {/* 3. Mission Mosaic — editorial photo grid with animated entrance */}
      {allGalleryItems.length > 0 && (
        <MissionMosaic
          items={allGalleryItems}
          headline="Community is the Infrastructure."
          body="We listen, we build, we stay. Since 2020, IBTU has mobilized 62,475+ students, 300+ partners, and $4.5M in resources across Los Angeles — building systems rooted in dignity, access, and community-led design."
        />
      )}

      {/* 4. Pillars — big bold rows with hover image reveal */}
      {pillars.length > 0 && <PillarCards pillars={pillars} />}

      {/* 5. Impact Stats — gold cards with animated counters */}
      <StatsSection stats={STATS} />

      {/* 6. Programs — cards with fold-out descriptions */}
      {programCards.length > 0 && <ProgramsGrid programs={programCards} />}

      {/* 7. 3D Orbital Gallery — interactive photo space */}
      {allGalleryItems.length > 0 && (
        <OrbitalGallery
          items={[
            ...programCards.filter((p: { heroImage: string }) => p.heroImage).map((p: { heroImage: string; title: string; pillar: string; slug: string }) => ({
              src: p.heroImage,
              title: p.title,
              program: p.pillar,
              programSlug: p.slug,
            })),
            ...LOCAL_GALLERY_IMAGES.slice(0, 6).map((img) => ({
              src: img.src,
              title: img.alt.replace('IBTU ', ''),
              program: 'Community',
            })),
          ]}
          title="(EXPLORE OUR IMPACT)"
        />
      )}

      {/* 8. Get Involved CTA — gold bg, black type, no text over image */}
      <CTASection
        image={ctaImageSrc}
        headline="Join the movement"
        subtext="Whether you volunteer, donate, partner, or sponsor — you become part of the foundation. Designed with dignity."
        actions={CTA_ACTIONS}
      />

      {/* 8. Footer — gold bg, social icons */}
      <Footer />
    </main>
  )
}
