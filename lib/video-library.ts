// Typed accessor for the transcoded motion library under public/videos/library/.
// Paths follow the convention {tag}-{variant}-{height}.{ext}, set by
// scripts/process-video-library.sh — keeping the helper convention-driven means
// components work even before manifest.json is regenerated.

export type LibrarySource = 'holo01' | 'holo02' | 'holo03' | 'holo04' | 'holo05' | 'holo06'
export type LibraryVariant = 'bg-loop' | 'transition' | 'splash' | 'hover'
export type LibrarySize = '1080' | '720' | '480'
export type LibraryFormat = 'mp4' | 'webm'

export const LIBRARY_BASE = '/videos/library'

const VARIANT_SIZES: Record<LibraryVariant, LibrarySize[]> = {
  'bg-loop': ['1080', '720', '480'],
  transition: ['720'],
  splash: ['720'],
  hover: ['480'],
}

export interface VariantSources {
  mp4: string
  webm: string
  poster: string
  height: LibrarySize
}

export function variantPaths(
  tag: LibrarySource,
  variant: LibraryVariant,
  size: LibrarySize = defaultSize(variant)
): VariantSources {
  return {
    mp4: `${LIBRARY_BASE}/${tag}-${variant}-${size}.mp4`,
    webm: `${LIBRARY_BASE}/${tag}-${variant}-${size}.webm`,
    poster: `${LIBRARY_BASE}/${tag}-poster.jpg`,
    height: size,
  }
}

export function defaultSize(variant: LibraryVariant): LibrarySize {
  return VARIANT_SIZES[variant][0]
}

export function availableSizes(variant: LibraryVariant): LibrarySize[] {
  return [...VARIANT_SIZES[variant]]
}

export const ALL_SOURCES: LibrarySource[] = [
  'holo01',
  'holo02',
  'holo03',
  'holo04',
  'holo05',
  'holo06',
]

// Heuristic: pick the closest available size to a viewport width. Used by
// HeroVideo to avoid serving 4K when 720p would do.
export function sizeForViewport(
  variant: LibraryVariant,
  viewportWidth: number
): LibrarySize {
  const candidates = availableSizes(variant)
  if (variant !== 'bg-loop') return candidates[0]
  if (viewportWidth >= 1600) return '1080'
  if (viewportWidth >= 800) return '720'
  return '480'
}
