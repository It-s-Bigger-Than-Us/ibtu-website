import type { AssetSchema, FieldSpec, ImageSlotSpec } from "./types";
import { ASSET_SCHEMAS, BRAND_RULES, GLOBAL_INHERITED_RULES } from "./index";

function fieldRow(f: FieldSpec): string {
  const chars =
    f.minChars != null || f.maxChars != null
      ? `${f.minChars ?? 0}-${f.maxChars ?? "—"}`
      : "—";
  const rules = (f.rules ?? []).join(", ") || "—";
  const enumList = f.enumValues ? ` · values: ${f.enumValues.join(" | ")}` : "";
  return `| \`${f.name}\` | ${f.label} | ${f.type} | ${chars} | ${f.required ? "yes" : "no"} | ${f.position} | ${f.tokenRole ?? "—"} | ${rules}${enumList} |`;
}

function imageRow(img: ImageSlotSpec): string {
  const dims =
    img.widthPx && img.heightPx
      ? `${img.widthPx}×${img.heightPx}px`
      : img.aspectRatio
        ? `aspect ${img.aspectRatio}`
        : "—";
  return `| \`${img.name}\` | ${img.role} | ${dims} | ${img.required ? "yes" : "no"} | ${img.approvedSource} | ${img.notes ?? ""} |`;
}

export function schemaToMarkdown(schema: AssetSchema): string {
  const dimensions = schema.fluid
    ? "Fluid"
    : schema.widthPx && schema.heightPx
      ? `${schema.widthPx}×${schema.heightPx}px`
      : "—";
  const lines: string[] = [];
  lines.push(`## ${schema.displayName}`);
  lines.push("");
  lines.push(
    `- **id:** \`${schema.id}\`  · **category:** ${schema.category}  · **dimensions:** ${dimensions}  · **outputs:** ${schema.outputFormats.join(", ")}`
  );
  if (schema.notes) {
    lines.push(`- **Notes:** ${schema.notes}`);
  }
  lines.push("");
  lines.push("### Fields");
  lines.push("");
  lines.push("| Name | Label | Type | Chars | Required | Position | Token role | Rules |");
  lines.push("| --- | --- | --- | --- | --- | --- | --- | --- |");
  for (const f of schema.fields) {
    lines.push(fieldRow(f));
  }
  lines.push("");
  if (schema.imageSlots.length > 0) {
    lines.push("### Image Slots");
    lines.push("");
    lines.push("| Name | Role | Size | Required | Approved source | Notes |");
    lines.push("| --- | --- | --- | --- | --- | --- |");
    for (const img of schema.imageSlots) {
      lines.push(imageRow(img));
    }
    lines.push("");
  }
  const allRules = Array.from(
    new Set([...schema.inheritedRules, ...schema.fields.flatMap((f) => f.rules ?? [])])
  );
  lines.push("### Brand rules that apply");
  lines.push("");
  for (const rid of allRules) {
    const r = BRAND_RULES[rid];
    if (r) {
      lines.push(`- **${r.title}** — ${r.detail}`);
    }
  }
  lines.push("");
  return lines.join("\n");
}

export function allSchemasToMarkdown(): string {
  const preamble: string[] = [];
  preamble.push("# IBTU Asset Pack Field Specs");
  preamble.push("");
  preamble.push(
    "Auto-generated from `ibtu-website/lib/content-schemas/`. One table per asset type. Text fields list character budgets; image slots list exact pixel dimensions."
  );
  preamble.push("");
  preamble.push("## Global brand rules (inherited by every asset)");
  preamble.push("");
  for (const rid of GLOBAL_INHERITED_RULES) {
    const r = BRAND_RULES[rid];
    preamble.push(`- **${r.title}** — ${r.detail}`);
  }
  preamble.push("");
  preamble.push("---");
  preamble.push("");

  const bodies = Object.values(ASSET_SCHEMAS).map(schemaToMarkdown);
  return preamble.join("\n") + bodies.join("\n---\n\n");
}
