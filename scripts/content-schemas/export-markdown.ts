import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { allSchemasToMarkdown } from "@/lib/content-schemas/markdown-export";

const target = resolve(
  process.env.HOME ?? "",
  "Documents/Obsidian Vault/Brand/ASSET-PACK-FIELD-SPECS.md"
);

writeFileSync(target, allSchemasToMarkdown(), "utf8");
console.log(`Wrote ${target}`);
