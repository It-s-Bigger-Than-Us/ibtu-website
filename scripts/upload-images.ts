/**
 * Upload program photos to Sanity CDN and link to program records.
 * Run: SANITY_TOKEN=xxx npx tsx scripts/upload-images.ts
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

const PROGRAM_FOLDERS: Record<string, { folder: string; sanityId: string }> = {
  "Back 2 School": { folder: "Website-B2S", sanityId: "prog-back-2-school" },
  "School Programs": { folder: "Website-School", sanityId: "prog-youth-programming" },
  "Coastal Care": { folder: "Website-CoastalCleanup", sanityId: "prog-coastal-care" },
  "Wellness": { folder: "Website-Wellness", sanityId: "prog-wellness" },
};

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

async function seed() {
  console.log("Uploading program images to Sanity CDN...\n");

  for (const [programName, config] of Object.entries(PROGRAM_FOLDERS)) {
    const folderPath = path.join(IMAGE_BASE, config.folder);
    if (!fs.existsSync(folderPath)) {
      console.log(`  ⚠️  Folder not found: ${folderPath}`);
      continue;
    }

    const files = fs.readdirSync(folderPath)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .slice(0, 6); // Upload first 6 images per program

    if (files.length === 0) {
      console.log(`  ⚠️  No images in ${config.folder}`);
      continue;
    }

    console.log(`  ${programName}: uploading ${files.length} images...`);

    // Upload hero image (first photo)
    const heroAssetId = await uploadImage(path.join(folderPath, files[0]));
    console.log(`    Hero: ${files[0]} → ${heroAssetId}`);

    // Upload card images (first 2)
    const cardAssetIds: string[] = [];
    for (const f of files.slice(0, 2)) {
      const id = f === files[0] ? heroAssetId : await uploadImage(path.join(folderPath, f));
      cardAssetIds.push(id);
    }

    // Update program record with Sanity image references
    await client.patch(config.sanityId).set({
      heroImage: {
        _type: "image",
        asset: { _type: "reference", _ref: heroAssetId },
      },
      cardImages: cardAssetIds.map((id, i) => ({
        _type: "image",
        _key: `card-${i}`,
        asset: { _type: "reference", _ref: id },
      })),
    }).commit();

    console.log(`    ✅ ${programName} updated with Sanity images`);

    // Upload remaining as gallery images (for future event attachment)
    for (const f of files.slice(2)) {
      const assetId = await uploadImage(path.join(folderPath, f));
      console.log(`    Gallery: ${f} → ${assetId}`);
    }
  }

  // Also upload a few volunteer highlight photos
  const volFolder = path.join(IMAGE_BASE, "Volunteer Highlights");
  if (fs.existsSync(volFolder)) {
    const volFiles = fs.readdirSync(volFolder)
      .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
      .slice(0, 6);

    console.log(`\n  Volunteer Highlights: uploading ${volFiles.length} images...`);
    for (const f of volFiles) {
      const assetId = await uploadImage(path.join(volFolder, f));
      console.log(`    ${f} → ${assetId}`);
    }
  }

  console.log("\n✅ Image upload complete!");
  console.log("   Program hero + card images linked in Sanity.");
  console.log("   Gallery images uploaded to Sanity CDN (available for event records).");
  console.log("   View all images in Sanity Studio → Media tab.");
}

seed().catch(console.error);
