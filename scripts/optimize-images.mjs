#!/usr/bin/env node

/**
 * Image optimization script for ibtu-website.
 *
 * Resizes all content images in public/images to web-appropriate dimensions
 * and compresses them. Processes files in-place — run once after importing
 * new media, or re-run safely (already-small images are skipped).
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # optimize all content folders
 *   node scripts/optimize-images.mjs --dry-run   # report only, no changes
 */

import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_IMAGES = path.join(__dirname, '..', 'public', 'images')

// Folders managed by the site-media allocator
const CONTENT_FOLDERS = [
  'b2s',
  'coastal',
  'communityevent',
  'fire-relief',
  'giving-season',
  'landscape',
  'linkup',
  'pillars',
  'school',
  'volunteer',
  'wellness',
]

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

// Max long edge in pixels — keeps images hero-ready while cutting 6000px originals
const MAX_LONG_EDGE = 2200
// JPEG quality (0-100) — 80 is a good balance of quality and size
const JPEG_QUALITY = 80
// Skip files already under this size (bytes) — no point reprocessing
const SKIP_UNDER_BYTES = 150_000 // 150 KB

const DRY_RUN = process.argv.includes('--dry-run')

async function getImageFiles() {
  const files = []
  for (const folder of CONTENT_FOLDERS) {
    const dir = path.join(PUBLIC_IMAGES, folder)
    if (!fs.existsSync(dir)) {
      console.warn(`  Skipping missing folder: ${folder}`)
      continue
    }
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (!entry.isFile()) continue
      const ext = path.extname(entry.name).toLowerCase()
      if (!IMAGE_EXTENSIONS.has(ext)) continue
      files.push({
        folder,
        name: entry.name,
        fullPath: path.join(dir, entry.name),
      })
    }
  }
  return files
}

async function optimizeImage(file) {
  const stat = fs.statSync(file.fullPath)
  const originalSize = stat.size

  // Skip tiny files
  if (originalSize < SKIP_UNDER_BYTES) {
    return { file, skipped: true, reason: 'already small', originalSize, newSize: originalSize }
  }

  const metadata = await sharp(file.fullPath).metadata()
  const { width, height, format } = metadata
  const longEdge = Math.max(width || 0, height || 0)

  // Determine if resize is needed
  const needsResize = longEdge > MAX_LONG_EDGE

  // Build the sharp pipeline
  let pipeline = sharp(file.fullPath, { failOn: 'none' })
    .rotate() // auto-orient from EXIF

  if (needsResize) {
    pipeline = pipeline.resize({
      width: width >= height ? MAX_LONG_EDGE : undefined,
      height: height > width ? MAX_LONG_EDGE : undefined,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  // Output as JPEG for jpg/jpeg/png, keep webp as webp
  const ext = path.extname(file.name).toLowerCase()
  if (ext === '.webp') {
    pipeline = pipeline.webp({ quality: JPEG_QUALITY })
  } else {
    // Convert everything else to JPEG
    pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  }

  if (DRY_RUN) {
    // Estimate — process to buffer but don't write
    const buffer = await pipeline.toBuffer()
    return {
      file,
      skipped: false,
      originalSize,
      newSize: buffer.length,
      originalDimensions: `${width}x${height}`,
      resized: needsResize,
      dryRun: true,
    }
  }

  // Write to temp file then replace (atomic-ish)
  const tmpPath = file.fullPath + '.optimized.tmp'
  await pipeline.toFile(tmpPath)
  const newStat = fs.statSync(tmpPath)

  // Only replace if we actually saved space
  if (newStat.size < originalSize) {
    fs.renameSync(tmpPath, file.fullPath)
    return {
      file,
      skipped: false,
      originalSize,
      newSize: newStat.size,
      originalDimensions: `${width}x${height}`,
      resized: needsResize,
    }
  } else {
    // Original was already efficient — remove temp
    fs.unlinkSync(tmpPath)
    return {
      file,
      skipped: true,
      reason: 'no savings',
      originalSize,
      newSize: originalSize,
    }
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

async function main() {
  console.log(`\n  IBTU Image Optimizer`)
  console.log(`  ====================`)
  if (DRY_RUN) console.log(`  MODE: DRY RUN (no files will be modified)\n`)
  else console.log(`  MODE: LIVE (files will be optimized in-place)\n`)

  console.log(`  Settings:`)
  console.log(`    Max long edge: ${MAX_LONG_EDGE}px`)
  console.log(`    JPEG quality:  ${JPEG_QUALITY}`)
  console.log(`    Skip under:    ${formatBytes(SKIP_UNDER_BYTES)}`)
  console.log(`    Folders:       ${CONTENT_FOLDERS.length}\n`)

  const files = await getImageFiles()
  console.log(`  Found ${files.length} images to process.\n`)

  let totalOriginal = 0
  let totalNew = 0
  let processed = 0
  let skippedCount = 0
  const heaviest = []
  const biggestSavings = []

  // Process in batches of 10 for concurrency
  const BATCH_SIZE = 10
  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE)
    const results = await Promise.all(batch.map(optimizeImage))

    for (const result of results) {
      totalOriginal += result.originalSize
      totalNew += result.newSize

      heaviest.push({ path: `${result.file.folder}/${result.file.name}`, size: result.originalSize })

      if (result.skipped) {
        skippedCount++
      } else {
        processed++
        const saved = result.originalSize - result.newSize
        biggestSavings.push({
          path: `${result.file.folder}/${result.file.name}`,
          saved,
          from: result.originalSize,
          to: result.newSize,
          dims: result.originalDimensions,
        })
      }
    }

    // Progress indicator every 50 files
    const done = Math.min(i + BATCH_SIZE, files.length)
    if (done % 50 === 0 || done === files.length) {
      process.stdout.write(`  Progress: ${done}/${files.length}\r`)
    }
  }

  console.log(`\n`)

  // Sort and report heaviest originals
  heaviest.sort((a, b) => b.size - a.size)
  console.log(`  Top 15 Heaviest Originals:`)
  console.log(`  ${'—'.repeat(55)}`)
  for (const item of heaviest.slice(0, 15)) {
    console.log(`    ${formatBytes(item.size).padStart(9)}  ${item.path}`)
  }

  // Sort and report biggest savings
  biggestSavings.sort((a, b) => b.saved - a.saved)
  if (biggestSavings.length > 0) {
    console.log(`\n  Top 15 Biggest Savings:`)
    console.log(`  ${'—'.repeat(70)}`)
    for (const item of biggestSavings.slice(0, 15)) {
      console.log(`    ${item.dims.padStart(11)} | ${formatBytes(item.from).padStart(9)} → ${formatBytes(item.to).padStart(9)} (saved ${formatBytes(item.saved)})  ${item.path}`)
    }
  }

  // Summary
  const totalSaved = totalOriginal - totalNew
  const pctSaved = totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : '0'

  console.log(`\n  Summary:`)
  console.log(`  ${'—'.repeat(40)}`)
  console.log(`    Total images:     ${files.length}`)
  console.log(`    Optimized:        ${processed}`)
  console.log(`    Skipped:          ${skippedCount}`)
  console.log(`    Size before:      ${formatBytes(totalOriginal)}`)
  console.log(`    Size after:       ${formatBytes(totalNew)}`)
  console.log(`    Total saved:      ${formatBytes(totalSaved)} (${pctSaved}%)`)
  console.log(``)
}

main().catch((err) => {
  console.error('Optimization failed:', err)
  process.exit(1)
})
