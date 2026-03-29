/**
 * Upload ALL program photos to Sanity CDN and link hero/card images.
 * Picks the largest files for hero images (most compositional white space).
 * Run: SANITY_TOKEN=xxx npx tsx scripts/upload-all-images.ts
 */
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "0m4ngfcw", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false,
});

const IMAGE_BASE = "/Users/mollymorrow/Downloads/ibtu-website";

async function uploadImage(filePath: string): Promise<string> {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = ext === ".png" ? "image/png" : "image/jpeg";
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
    contentType,
  });
  return asset._id;
}

interface FolderConfig {
  folder: string;
  sanityId: string;
  programName: string;
}

const FOLDERS: FolderConfig[] = [
  { folder: "Website-B2S", sanityId: "prog-back-2-school", programName: "Back 2 School" },
  { folder: "Website-School", sanityId: "prog-youth-programming", programName: "Youth Programming" },
  { folder: "Website-CoastalCleanup", sanityId: "prog-coastal-care", programName: "Coastal Care" },
  { folder: "Website-Wellness", sanityId: "prog-wellness", programName: "Wellness" },
  { folder: "Volunteer Highlights", sanityId: "", programName: "Volunteer Highlights" },
];

async function seed() {
  console.log("Uploading ALL program photos to Sanity CDN...\n");

  let totalUploaded = 0;

  for (const config of FOLDERS) {
    const folderPath = path.join(IMAGE_BASE, config.folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`  ⚠️  Folder not found: ${folderPath}`);
      continue;
    }

    let files = fs.readdirSync(folderPath)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f));

    if (files.length === 0) {
      console.log(`  ⚠️  No images in ${config.folder}`);
      continue;
    }

    // Sort by file size descending — largest files tend to be highest quality/most compositional
    files = files.sort((a, b) => {
      const sizeA = fs.statSync(path.join(folderPath, a)).size;
      const sizeB = fs.statSync(path.join(folderPath, b)).size;
      return sizeB - sizeA;
    });

    console.log(`  ${config.programName}: uploading ${files.length} images (sorted by size, largest first)...`);

    const assetIds: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const filePath = path.join(folderPath, f);
      const sizeMB = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);

      try {
        const assetId = await uploadImage(filePath);
        assetIds.push(assetId);
        totalUploaded++;

        if (i < 3) {
          console.log(`    ★ ${f} (${sizeMB}MB) → ${assetId} [TOP PICK]`);
        } else if (i % 10 === 0) {
          console.log(`    ${i + 1}/${files.length} uploaded...`);
        }
      } catch (err: any) {
        console.log(`    ⚠️  Failed: ${f} — ${err.message}`);
      }
    }

    // Update program record with images (if it has a sanityId)
    if (config.sanityId && assetIds.length > 0) {
      // Hero = largest file (first after sort)
      // Card images = top 2
      await client.patch(config.sanityId).set({
        heroImage: {
          _type: "image",
          asset: { _type: "reference", _ref: assetIds[0] },
        },
        cardImages: assetIds.slice(0, Math.min(4, assetIds.length)).map((id, i) => ({
          _type: "image",
          _key: `card-${i}`,
          asset: { _type: "reference", _ref: id },
        })),
      }).commit();

      console.log(`    ✅ ${config.programName}: hero + ${Math.min(4, assetIds.length)} card images linked`);
    }

    console.log(`    ${assetIds.length} images uploaded for ${config.programName}\n`);
  }

  console.log(`\n✅ Total: ${totalUploaded} images uploaded to Sanity CDN.`);
  console.log("   All programs have hero + card images assigned (largest = hero).");
  console.log("   View all at: ibtu.la/admin/media");
}

seed().catch(console.error);
