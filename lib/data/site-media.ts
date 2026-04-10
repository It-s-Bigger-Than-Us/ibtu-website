import 'server-only'

import fs from 'node:fs'
import path from 'node:path'

type ProgramSlug =
  | 'fire-relief'
  | 'back-2-school'
  | 'youth-programming'
  | 'coastal-care'
  | 'wellness'
  | 'giving-season'
  | 'community-health'
  | 'community-builder-linkups'

interface PillarVisual {
  name: string
  images: string[]
}

const IMAGE_ROOT = path.join(process.cwd(), 'public', 'images')
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

function readFolder(folder: string): string[] {
  const dir = path.join(IMAGE_ROOT, folder)
  const items = fs.readdirSync(dir, { withFileTypes: true })

  return items
    .filter((item) => item.isFile())
    .map((item) => item.name)
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => `/images/${folder}/${file}`)
}

function readAllContentImages(): string[] {
  return [
    ...readFolder('b2s'),
    ...readFolder('coastal'),
    ...readFolder('communityevent'),
    ...readFolder('fire-relief'),
    ...readFolder('giving-season'),
    ...readFolder('landscape'),
    ...readFolder('linkup'),
    ...readFolder('pillars'),
    ...readFolder('school'),
    ...readFolder('volunteer'),
    ...readFolder('wellness'),
  ]
}

function createPool(label: string, items: string[]) {
  let cursor = 0

  const take = (count: number) => {
    const claimed = items.slice(cursor, cursor + count)
    if (claimed.length !== count) {
      throw new Error(`Image pool "${label}" ran out while claiming ${count} files.`)
    }
    cursor += count
    return claimed
  }

  const takeAll = () => {
    const claimed = items.slice(cursor)
    cursor = items.length
    return claimed
  }

  /** Take count items evenly spread across the remaining pool (for visual variety) */
  const takeSpread = (count: number) => {
    const remaining = items.length - cursor
    if (remaining <= count) return takeAll()
    const step = remaining / count
    const picked: string[] = []
    const pickedIndices = new Set<number>()
    for (let i = 0; i < count; i++) {
      const idx = cursor + Math.floor(i * step)
      picked.push(items[idx])
      pickedIndices.add(idx)
    }
    // Rebuild cursor: move all items so picked ones are consumed first
    const newItems = [...picked]
    for (let i = cursor; i < items.length; i++) {
      if (!pickedIndices.has(i)) newItems.push(items[i])
    }
    // Replace remaining items with reordered version
    for (let i = 0; i < newItems.length; i++) {
      items[cursor + i] = newItems[i]
    }
    cursor += count
    return picked
  }

  return {
    take,
    takeOne: () => take(1)[0],
    takeAll,
    takeSpread,
  }
}

function flattenClaimedImages(value: unknown): string[] {
  if (typeof value === 'string') {
    return value.startsWith('/images/') ? [value] : []
  }

  if (Array.isArray(value)) {
    return value.flatMap(flattenClaimedImages)
  }

  if (value && typeof value === 'object') {
    return Object.values(value).flatMap(flattenClaimedImages)
  }

  return []
}

const b2s = createPool('b2s', readFolder('b2s'))
const coastal = createPool('coastal', readFolder('coastal'))
const communityEvent = createPool('communityevent', readFolder('communityevent'))
const fireRelief = createPool('fire-relief', readFolder('fire-relief'))
const givingSeason = createPool('giving-season', readFolder('giving-season'))
const landscape = createPool('landscape', readFolder('landscape'))
const linkup = createPool('linkup', readFolder('linkup'))
const pillars = createPool('pillars', readFolder('pillars'))
const school = createPool('school', readFolder('school'))
const volunteer = createPool('volunteer', readFolder('volunteer'))
const wellness = createPool('wellness', readFolder('wellness'))

export const SPECIAL_PAGE_MEDIA = {
  hubPoster: fireRelief.takeOne(),
} as const

export const HOME_PROGRAM_HEROES: Record<Exclude<ProgramSlug, 'community-health'>, string> = {
  'fire-relief': fireRelief.takeOne(),
  'back-2-school': b2s.takeOne(),
  'youth-programming': school.takeOne(),
  'coastal-care': coastal.takeOne(),
  'wellness': wellness.takeOne(),
  'giving-season': givingSeason.takeOne(),
  'community-builder-linkups': linkup.takeOne(),
}

export const HOME_PILLAR_VISUALS: PillarVisual[] = [
  {
    name: 'Crisis & Disaster Stabilization',
    images: fireRelief.take(4),
  },
  {
    name: 'School & Youth Stability',
    images: school.take(4),
  },
  {
    name: 'Community Health & Resource Access',
    images: [...b2s.take(2), wellness.takeOne(), communityEvent.takeOne()],
  },
]

export const PROGRAM_INDEX_GALLERIES: Record<ProgramSlug, string[]> = {
  'fire-relief': fireRelief.takeSpread(10),
  'back-2-school': b2s.takeSpread(10),
  'youth-programming': school.takeSpread(8),
  'coastal-care': coastal.takeSpread(8),
  'wellness': wellness.takeSpread(4),
  'giving-season': givingSeason.takeSpread(4),
  'community-health': volunteer.takeSpread(12),
  'community-builder-linkups': volunteer.take(8),
}

export const GET_INVOLVED_HERO_IMAGES = volunteer.take(12)

export const ABOUT_GALLERY_IMAGES = [...landscape.take(12), ...volunteer.take(12)]

export const IMPACT_GALLERY_IMAGES = [...pillars.takeAll(), ...communityEvent.take(4), ...volunteer.take(5)]

export const EVENTS_GALLERY_IMAGES = [...communityEvent.take(4), ...volunteer.take(14)]

/* Homepage editorial media strip — full-bleed cinematic gallery between ticker and mission */
export const HOME_EDITORIAL_IMAGES = volunteer.take(8)

export const PROGRAM_PAGE_IMAGES: Record<Exclude<ProgramSlug, 'community-builder-linkups'>, string[]> = {
  'fire-relief': fireRelief.takeAll(),
  'back-2-school': b2s.takeAll(),
  'youth-programming': school.takeAll(),
  'coastal-care': coastal.takeAll(),
  'wellness': wellness.takeAll(),
  'giving-season': givingSeason.takeAll(),
  'community-health': [
    ...communityEvent.takeAll(),
    ...landscape.takeAll(),
    ...volunteer.takeAll(),
  ],
}

const claimedImages = flattenClaimedImages({
  SPECIAL_PAGE_MEDIA,
  HOME_PROGRAM_HEROES,
  HOME_PILLAR_VISUALS,
  PROGRAM_INDEX_GALLERIES,
  GET_INVOLVED_HERO_IMAGES,
  ABOUT_GALLERY_IMAGES,
  IMPACT_GALLERY_IMAGES,
  EVENTS_GALLERY_IMAGES,
  HOME_EDITORIAL_IMAGES,
  PROGRAM_PAGE_IMAGES,
})

const uniqueClaimedImages = new Set(claimedImages)
const allContentImages = readAllContentImages()

if (uniqueClaimedImages.size !== claimedImages.length) {
  const seen = new Set<string>()
  const duplicates = claimedImages.filter((image) => {
    if (seen.has(image)) return true
    seen.add(image)
    return false
  })
  throw new Error(`Duplicate image allocations detected: ${duplicates.join(', ')}`)
}

if (uniqueClaimedImages.size !== allContentImages.length) {
  const missingImages = allContentImages.filter((image) => !uniqueClaimedImages.has(image))
  throw new Error(`Unassigned site images detected: ${missingImages.join(', ')}`)
}
