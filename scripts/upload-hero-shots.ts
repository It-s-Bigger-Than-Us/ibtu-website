/**
 * Upload Molly's curated hero shots from Obsidian canvas.
 * Run: SANITY_TOKEN=xxx npx tsx scripts/upload-hero-shots.ts
 */
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const token = process.env.SANITY_TOKEN;
if (!token) { console.error("Set SANITY_TOKEN"); process.exit(1); }

const client = createClient({
  projectId: "0m4ngfcw", dataset: "production", apiVersion: "2024-01-01", token, useCdn: false,
});

const VAULT = "/Users/mollymorrow/Documents/Obsidian Vault";

async function uploadImage(filePath: string): Promise<string> {
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
    contentType: "image/jpeg",
  });
  return asset._id;
}

async function seed() {
  console.log("Uploading Molly's curated hero shots from Obsidian canvas...\n");

  // Coastal Care heroes — from canvas "Coastal Heros" group
  const coastalFiles = [
    "IMG_4993.jpg", "IMG_4960.jpg", "IMG_4992.jpg", "IMG_1848.jpg",
    "IMG_1861.jpg", "IMG_1673.jpg", "IMG_1790.jpg", "IMG_1801.jpg",
    "IMG_1807.jpg", "IMG_1827.jpg", "IMG_5021.jpg", "IMG_4954.jpg",
    "IMG_4953.jpg", "IMG_4949.jpg", "IMG_4944.jpg", "IMG_4920.jpg", "IMG_4907.jpg",
  ];

  // Yoga/Wellness heroes — from canvas "YOGA HEROS" group
  const yogaFiles = [
    "IMG_1589.jpg", "IMG_1359.jpg", "IMG_1507.jpg", "IMG_1559.jpg",
    "IMG_1517.jpg", "IMG_1501.jpg", "IMG_1540.jpg", "IMG_1591.jpg",
    "IMG_1562.jpg", "IMG_1796.jpg", "IMG_1361.jpg", "IMG_1318.jpg",
    "IMG_1522.jpg", "IMG_1595.jpg", "IMG_1628.jpg", "IMG_1587.jpg", "IMG_1593.jpg",
    "IMG_1610.jpg", "IMG_1357.jpg", "IMG_1623.jpg",
  ];

  // Upload Coastal Care heroes
  console.log(`  Coastal Care: uploading ${coastalFiles.length} hero shots...`);
  const coastalIds: string[] = [];
  for (const f of coastalFiles) {
    const fp = path.join(VAULT, f);
    if (!fs.existsSync(fp)) { console.log(`    ⚠️ Not found: ${f}`); continue; }
    const id = await uploadImage(fp);
    coastalIds.push(id);
    if (coastalIds.length <= 3) console.log(`    ★ ${f} → ${id}`);
  }

  // Set Coastal Care hero + cards
  if (coastalIds.length > 0) {
    await client.patch("prog-coastal-care").set({
      heroImage: { _type: "image", asset: { _type: "reference", _ref: coastalIds[0] } },
      cardImages: coastalIds.slice(0, 4).map((id, i) => ({
        _type: "image", _key: `hero-${i}`, asset: { _type: "reference", _ref: id },
      })),
    }).commit();
    console.log(`    ✅ Coastal Care: hero + ${Math.min(4, coastalIds.length)} cards updated (${coastalIds.length} total uploaded)`);
  }

  // Upload Yoga/Wellness heroes
  console.log(`\n  Wellness: uploading ${yogaFiles.length} hero shots...`);
  const yogaIds: string[] = [];
  for (const f of yogaFiles) {
    const fp = path.join(VAULT, f);
    if (!fs.existsSync(fp)) { console.log(`    ⚠️ Not found: ${f}`); continue; }
    const id = await uploadImage(fp);
    yogaIds.push(id);
    if (yogaIds.length <= 3) console.log(`    ★ ${f} → ${id}`);
  }

  // Set Wellness hero + cards
  if (yogaIds.length > 0) {
    await client.patch("prog-wellness").set({
      heroImage: { _type: "image", asset: { _type: "reference", _ref: yogaIds[0] } },
      cardImages: yogaIds.slice(0, 4).map((id, i) => ({
        _type: "image", _key: `hero-${i}`, asset: { _type: "reference", _ref: id },
      })),
    }).commit();
    console.log(`    ✅ Wellness: hero + ${Math.min(4, yogaIds.length)} cards updated (${yogaIds.length} total uploaded)`);
  }

  // Also upload the additional photos below the groups (IMG_43xx-48xx range)
  const additionalFiles = [
    "IMG_4353.jpg", "IMG_4363.jpg", "IMG_4367.jpg", "IMG_4375.jpg",
    "IMG_4457.jpg", "IMG_4495.jpg", "IMG_4500.jpg", "IMG_4649.jpg",
    "IMG_4672.jpg", "IMG_4673.jpg", "IMG_4686.jpg", "IMG_4687.jpg",
    "IMG_1603.jpg", "IMG_1612.jpg", "IMG_1614.jpg",
  ];

  console.log(`\n  Additional photos: uploading ${additionalFiles.length}...`);
  let addCount = 0;
  for (const f of additionalFiles) {
    const fp = path.join(VAULT, f);
    if (!fs.existsSync(fp)) continue;
    await uploadImage(fp);
    addCount++;
  }
  console.log(`    ${addCount} additional photos uploaded`);

  console.log(`\n✅ Hero shots uploaded and assigned!`);
  console.log(`   Coastal Care: ${coastalIds.length} photos (hero + cards set)`);
  console.log(`   Wellness: ${yogaIds.length} photos (hero + cards set)`);
  console.log(`   Additional: ${addCount} photos`);
}

seed().catch(console.error);
