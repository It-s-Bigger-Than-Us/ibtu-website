#!/usr/bin/env node
//
// build-video-manifest.mjs
//
// Walks public/videos/library/ and emits manifest.json describing every
// transcoded source/variant/size/format combination, plus byte sizes and
// public-relative paths. Consumed by <HeroVideo>, <SectionTransition>,
// <HoverAccent>, and <FullBleedVideo>.
//
// Idempotent: safe to run any time. No flags.

import { readdir, stat, writeFile } from 'node:fs/promises'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const LIBRARY_DIR = resolve(__dirname, '..', 'public', 'videos', 'library')
const PUBLIC_PREFIX = '/videos/library'

// Tag → absolute source path. Mirrors the SOURCES array in
// scripts/process-video-library.sh.
const DL = resolve(process.env.HOME, 'Downloads')
const TRANS = resolve(DL, 'transition animations')

const SOURCE_PATHS = {
  holo01: resolve(TRANS, 'AdobeStock_1029801465.mov'),
  holo02: resolve(TRANS, 'AdobeStock_376900006.mov'),
  holo03: resolve(TRANS, 'AdobeStock_506334228.mov'),
  holo04: resolve(TRANS, 'AdobeStock_740630052.mov'),
  holo05: resolve(DL, 'AdobeStock_317338429.mov'),
  holo06: resolve(DL, 'AdobeStock_1484840744.mov'),
}

function probeSource(file) {
  try {
    const out = execFileSync(
      'ffprobe',
      [
        '-v', 'error',
        '-show_entries', 'stream=r_frame_rate,width,height',
        '-show_entries', 'format=duration',
        '-of', 'default=nw=1',
        file,
      ],
      { encoding: 'utf8' }
    )
    const lines = Object.fromEntries(
      out
        .trim()
        .split('\n')
        .map((l) => l.split('='))
    )
    const [num, den] = (lines.r_frame_rate || '0/1').split('/').map(Number)
    return {
      width: Number(lines.width) || null,
      height: Number(lines.height) || null,
      fps: den ? Math.round((num / den) * 100) / 100 : null,
      duration: lines.duration ? Math.round(parseFloat(lines.duration) * 100) / 100 : null,
    }
  } catch {
    return {}
  }
}

const VARIANT_PATTERN = /^(holo\d+)-(bg-loop|transition|splash|hover)-(\d{3,4})\.(mp4|webm)$/
const POSTER_PATTERN = /^(holo\d+)-poster\.jpg$/

async function main() {
  let entries = []
  try {
    entries = await readdir(LIBRARY_DIR)
  } catch {
    // library dir may not exist yet
  }

  /** @type {Record<string, any>} */
  const sources = {}

  // Seed entries for every known source so the manifest shape stays stable
  // even before transcoding completes for a given source.
  for (const [tag, sourcePath] of Object.entries(SOURCE_PATHS)) {
    const probe = probeSource(sourcePath)
    sources[tag] = {
      originalFilename: sourcePath.split('/').pop(),
      ...probe,
      variants: {
        'bg-loop': {},
        transition: {},
        splash: {},
        hover: {},
      },
      poster: null,
    }
  }

  for (const entry of entries) {
    const full = join(LIBRARY_DIR, entry)
    const s = await stat(full)
    if (!s.isFile()) continue
    const sizeKb = Math.round(s.size / 1024)

    const m = entry.match(VARIANT_PATTERN)
    if (m) {
      const [, tag, variant, size, ext] = m
      if (!sources[tag]) sources[tag] = { variants: {} }
      sources[tag].variants[variant] ??= {}
      sources[tag].variants[variant][size] ??= {}
      sources[tag].variants[variant][size][ext] = `${PUBLIC_PREFIX}/${entry}`
      sources[tag].variants[variant][size].sizeKb =
        Math.max(sources[tag].variants[variant][size].sizeKb || 0, sizeKb)
      continue
    }

    const p = entry.match(POSTER_PATTERN)
    if (p) {
      const [, tag] = p
      if (!sources[tag]) sources[tag] = { variants: {} }
      sources[tag].poster = `${PUBLIC_PREFIX}/${entry}`
    }
  }

  // Attach poster to each variant size for convenience
  for (const tag of Object.keys(sources)) {
    const poster = sources[tag].poster
    if (!poster) continue
    for (const v of Object.values(sources[tag].variants)) {
      for (const size of Object.values(v)) {
        size.poster = poster
      }
    }
  }

  const manifest = {
    version: 1,
    generatedAt: new Date().toISOString(),
    sources,
  }

  const out = join(LIBRARY_DIR, 'manifest.json')
  await writeFile(out, JSON.stringify(manifest, null, 2) + '\n')

  const totalVariants = Object.values(sources).reduce(
    (n, s) =>
      n +
      Object.values(s.variants).reduce(
        (m, v) => m + Object.keys(v).length,
        0
      ),
    0
  )
  console.log(`wrote ${out}`)
  console.log(`  sources: ${Object.keys(sources).length}`)
  console.log(`  variant-sizes: ${totalVariants}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
