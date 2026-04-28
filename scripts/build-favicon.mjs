// Regenerate app/favicon.ico from public/ibtu-logo.svg.
// Embeds 16/32/48px PNGs into a single ICO container.
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import sharp from 'sharp'

const svgPath = resolve('public/ibtu-logo.svg')
const outPath = resolve('app/favicon.ico')

const SIZES = [16, 32, 48]
const svg = readFileSync(svgPath)

const pngs = await Promise.all(
  SIZES.map((size) =>
    sharp(svg, { density: 384 })
      .resize(size, size, { fit: 'contain', background: { r: 255, g: 199, b: 0, alpha: 1 } })
      .flatten({ background: { r: 255, g: 199, b: 0 } })
      .ensureAlpha()
      .png({ compressionLevel: 9 })
      .toBuffer()
      .then((data) => ({ size, data })),
  ),
)

// ICO header: 6 bytes
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)            // reserved
header.writeUInt16LE(1, 2)            // type = icon
header.writeUInt16LE(pngs.length, 4)  // image count

// Directory: 16 bytes per image
const dirSize = 16 * pngs.length
let offset = header.length + dirSize

const dir = Buffer.alloc(dirSize)
pngs.forEach(({ size, data }, i) => {
  const o = i * 16
  dir.writeUInt8(size === 256 ? 0 : size, o)        // width (0 = 256)
  dir.writeUInt8(size === 256 ? 0 : size, o + 1)    // height
  dir.writeUInt8(0, o + 2)                          // palette
  dir.writeUInt8(0, o + 3)                          // reserved
  dir.writeUInt16LE(1, o + 4)                       // planes
  dir.writeUInt16LE(32, o + 6)                      // bpp
  dir.writeUInt32LE(data.length, o + 8)             // image size
  dir.writeUInt32LE(offset, o + 12)                 // offset
  offset += data.length
})

const ico = Buffer.concat([header, dir, ...pngs.map((p) => p.data)])
writeFileSync(outPath, ico)
console.log(`Wrote ${ico.length} bytes -> ${outPath} (sizes: ${SIZES.join(', ')})`)
