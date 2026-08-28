#!/usr/bin/env node
//
// generate-media-manifest.mjs
//
// Scans public/images/<folder> for each of the 11 content folders consumed by
// lib/data/site-media.ts and writes lib/data/media-manifest.json — a static
// build-time snapshot of the file lists that module used to read via
// fs.readdirSync() at module load. That runtime scan broke on Vercel: the
// serverless function bundle excludes public/images/** (outputFileTracingExcludes
// in next.config.ts, required to stay under the 250MB function size limit), so
// every fresh render threw ENOENT scandir /var/task/public/images/<folder>.
//
// Run automatically via the "prebuild" npm script before every `next build`
// (including on Vercel, where public/images IS present at build time). Also
// run manually after adding/removing images so local `next dev` picks up the
// change without a full build.
//
// Sort order MUST exactly match the old readFolder() in site-media.ts:
// localeCompare(undefined, { numeric: true, sensitivity: 'base' }).
//
// Idempotent. Fails loudly (exit 1) if a folder is missing or empty — a
// silent empty pool would break the image allocation logic downstream.

import { readdirSync, writeFileSync } from 'node:fs'
import { join, dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = resolve(__dirname, '..')
const IMAGE_ROOT = join(REPO_ROOT, 'public', 'images')
const OUT_FILE = join(REPO_ROOT, 'lib', 'data', 'media-manifest.json')

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

// Must match the folder list in site-media.ts's readAllContentImages().
const FOLDERS = [
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

function readFolder(folder) {
  const dir = join(IMAGE_ROOT, folder)

  let items
  try {
    items = readdirSync(dir, { withFileTypes: true })
  } catch (err) {
    throw new Error(
      `[generate-media-manifest] Folder "public/images/${folder}" is missing or unreadable: ${err.message}`
    )
  }

  const files = items
    .filter((item) => item.isFile())
    .map((item) => item.name)
    .filter((file) => IMAGE_EXTENSIONS.has(extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map((file) => `/images/${folder}/${file}`)

  if (files.length === 0) {
    throw new Error(
      `[generate-media-manifest] Folder "public/images/${folder}" contains no matching images (.jpg/.jpeg/.png/.webp). A silent empty pool would break downstream image allocation — fix the folder or update this script's FOLDERS list.`
    )
  }

  return files
}

function main() {
  const manifest = {}

  for (const folder of FOLDERS) {
    const files = readFolder(folder)
    manifest[folder] = files
    console.log(`  ${folder}: ${files.length} images`)
  }

  writeFileSync(OUT_FILE, JSON.stringify(manifest, null, 2) + '\n')
  console.log(`wrote ${OUT_FILE}`)
}

main()
