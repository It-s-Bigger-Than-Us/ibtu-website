#!/usr/bin/env bash
#
# make-headlines-transparent.sh
#
# Post-processes the chrome headline PNGs (rendered with a dark canvas by
# render-stylized-headlines{,-left}.jsx) into transparent-background versions.
#
# Strategy: ffmpeg geq filter sets each pixel's alpha = max(R, G, B).
#   - Pure black  (chrome canvas) → alpha 0  → fully transparent
#   - Pure white  (chrome highlight) → alpha 255 → fully opaque
#   - Mid-grays (chrome shading) → partial alpha → preserves soft glow edges
#   - Saturated colors (iridescent shifts) stay opaque because at least one
#     channel is bright.
#
# Why post-process instead of hiding background layers in the .psdt:
# The Adobe Stock chrome templates use Screen/Multiply blend modes calibrated
# against a dark base. Hiding the Background + Texture layers caused the
# chrome to render as nearly-white (blend math collapses without the base).
# Rendering on the original dark canvas then deriving alpha from luminance is
# the reliable way to keep chrome fidelity while producing a transparent PNG.
#
# Usage:
#   ./scripts/make-headlines-transparent.sh
#   DIR=/path/to/folder ./scripts/make-headlines-transparent.sh
#
# Idempotency: outputs go to *_transparent.png siblings (or set IN_PLACE=1 to
# overwrite). The script skips files already processed (by checking output
# mtime ≥ input mtime).

set -euo pipefail

ROOT="/Users/mollymorrow/Documents/Obsidian Vault/Brand/Claude Design Hand-Off/06-Stylized-Headlines"
DIRS=(
  "${ROOT}"
  "${ROOT}/left-justified"
)
IN_PLACE="${IN_PLACE:-1}"   # default: overwrite source PNGs with transparent versions

needs_rebuild() {
  local src="$1" dst="$2"
  if [ ! -f "$dst" ]; then return 0; fi
  if [ "$src" -nt "$dst" ]; then return 0; fi
  return 1
}

process_one() {
  local src="$1"
  local dst
  if [ "$IN_PLACE" = "1" ]; then
    dst="${src}.tmp.png"
  else
    dst="${src%.png}_transparent.png"
  fi

  if ! needs_rebuild "$src" "$dst"; then
    return
  fi

  # geq filter: alpha = max(R, G, B). The colon/comma escaping is awkward in
  # ffmpeg expression syntax — commas inside max() must be inside the expression
  # since they delimit args, and we wrap each expression in single quotes.
  ffmpeg -y -loglevel error -i "$src" \
    -vf "format=rgba,geq=r='r(X,Y)':g='g(X,Y)':b='b(X,Y)':a='max(r(X,Y),max(g(X,Y),b(X,Y)))'" \
    "$dst"

  if [ "$IN_PLACE" = "1" ]; then
    mv "$dst" "$src"
  fi
}

total=0
for DIR in "${DIRS[@]}"; do
  [ -d "$DIR" ] || continue
  echo "=== $DIR ==="
  count=0
  for f in "$DIR"/*.png; do
    [ -f "$f" ] || continue
    process_one "$f"
    count=$((count + 1))
    total=$((total + 1))
    # Print every 20 files
    if (( count % 20 == 0 )); then echo "  processed $count..."; fi
  done
  echo "  $count files in $DIR"
done

echo ""
echo "Done. Processed $total PNGs total."
