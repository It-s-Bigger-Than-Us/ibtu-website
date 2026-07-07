#!/usr/bin/env bash
#
# process-video-library.sh
#
# Transcodes raw .mov sources from $SOURCE_DIR into a web-ready video library
# under public/videos/library/. Idempotent: only rebuilds outputs whose source
# is newer (or missing).
#
# Per-source outputs (4 variants × 2 formats + poster):
#   {tag}-bg-loop-{1080|720|480}.{mp4|webm}   (full duration, hero backgrounds)
#   {tag}-transition-720.{mp4|webm}            (2.5s mid-cut, section wipes)
#   {tag}-splash-720.{mp4|webm}                (1.2s opening, page splashes)
#   {tag}-hover-480.{mp4|webm}                 (up to 4s loop, card hovers)
#   {tag}-poster.jpg                           (mid-frame, 640px wide)
#
# Usage:
#   ./scripts/process-video-library.sh
#   SOURCE_DIR="$HOME/Downloads/other/folder" ./scripts/process-video-library.sh

set -euo pipefail

SOURCE_DIR="${SOURCE_DIR:-$HOME/Downloads/transition animations}"
EXTRA_SOURCE_DIR="${EXTRA_SOURCE_DIR:-$HOME/Downloads}"
HERE="$(cd "$(dirname "$0")" && pwd)"
OUT_DIR="${OUT_DIR:-$HERE/../public/videos/library}"

mkdir -p "$OUT_DIR"

# tag : relative-or-absolute filename. Tags 01–04 sit in SOURCE_DIR;
# tags 05+ sit directly under EXTRA_SOURCE_DIR (added later).
SOURCES=(
  "holo01:${SOURCE_DIR}/AdobeStock_1029801465.mov"
  "holo02:${SOURCE_DIR}/AdobeStock_376900006.mov"
  "holo03:${SOURCE_DIR}/AdobeStock_506334228.mov"
  "holo04:${SOURCE_DIR}/AdobeStock_740630052.mov"
  "holo05:${EXTRA_SOURCE_DIR}/AdobeStock_317338429.mov"
  "holo06:${EXTRA_SOURCE_DIR}/AdobeStock_1484840744.mov"
)

needs_rebuild() {
  local src="$1"
  local dst="$2"
  if [ ! -f "$dst" ]; then return 0; fi
  if [ "$src" -nt "$dst" ]; then return 0; fi
  return 1
}

encode_mp4() {
  local input="$1" output="$2" height="$3" crf="$4" extra_vf="${5:-}"
  local vf="scale=-2:${height}"
  [ -n "$extra_vf" ] && vf="${extra_vf},${vf}"
  ffmpeg -y -loglevel error -hide_banner -i "$input" \
    -vf "$vf" \
    -c:v libx264 -profile:v main -preset medium -crf "$crf" \
    -pix_fmt yuv420p -movflags +faststart -an \
    "$output"
}

encode_webm() {
  local input="$1" output="$2" height="$3" crf="$4" extra_vf="${5:-}"
  local vf="scale=-2:${height}"
  [ -n "$extra_vf" ] && vf="${extra_vf},${vf}"
  ffmpeg -y -loglevel error -hide_banner -i "$input" \
    -vf "$vf" \
    -c:v libvpx-vp9 -crf "$crf" -b:v 0 -deadline good -cpu-used 4 -an \
    "$output"
}

extract_poster() {
  local input="$1" output="$2"
  local duration
  duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$input")
  local mid
  mid=$(awk "BEGIN { print $duration / 2 }")
  ffmpeg -y -loglevel error -hide_banner -ss "$mid" -i "$input" -frames:v 1 \
    -vf "scale=640:-2" -q:v 3 "$output"
}

human_size() {
  local f="$1"
  if [ -f "$f" ]; then
    du -h "$f" | awk '{print $1}'
  else
    echo "-"
  fi
}

total_start=$(date +%s)

for entry in "${SOURCES[@]}"; do
  tag="${entry%%:*}"
  src="${entry#*:}"
  filename="$(basename "$src")"

  echo ""
  echo "=== ${tag} :: ${filename} ==="

  if [ ! -f "$src" ]; then
    echo "  ! source missing, skipping"
    continue
  fi

  duration=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$src")

  # bg-loops cap at 8s — keeps filesize reasonable AND ensures a clean loop.
  # Browsers' loop attribute restarts at frame 1; the shorter the source the
  # less visible any end→start seam becomes.
  bgloop_dur=$(awk "BEGIN { d=$duration; print (d > 8 ? 8 : d) }")
  bgloop_filter="trim=0:${bgloop_dur},setpts=PTS-STARTPTS"

  # ---- bg-loop: capped duration at 3 sizes ----
  for h in 1080 720 480; do
    case "$h" in
      1080) crf_mp4=25; crf_webm=33 ;;
      720)  crf_mp4=24; crf_webm=33 ;;
      480)  crf_mp4=25; crf_webm=35 ;;
    esac
    mp4="${OUT_DIR}/${tag}-bg-loop-${h}.mp4"
    webm="${OUT_DIR}/${tag}-bg-loop-${h}.webm"
    if needs_rebuild "$src" "$mp4"; then
      echo "  bg-loop  ${h}p mp4  ..."
      encode_mp4 "$src" "$mp4" "$h" "$crf_mp4" "$bgloop_filter"
      echo "  bg-loop  ${h}p mp4  -> $(human_size "$mp4")"
    fi
    if needs_rebuild "$src" "$webm"; then
      echo "  bg-loop  ${h}p webm ..."
      encode_webm "$src" "$webm" "$h" "$crf_webm" "$bgloop_filter"
      echo "  bg-loop  ${h}p webm -> $(human_size "$webm")"
    fi
  done

  # ---- transition: middle 2.5s with fade edges ----
  mid_start=$(awk "BEGIN { v = ($duration / 2) - 1.25; if (v < 0) v = 0; print v }")
  trans_filter="trim=${mid_start}:duration=2.5,setpts=PTS-STARTPTS,fade=t=in:st=0:d=0.25,fade=t=out:st=2.25:d=0.25"
  for fmt in mp4 webm; do
    out="${OUT_DIR}/${tag}-transition-720.${fmt}"
    if needs_rebuild "$src" "$out"; then
      echo "  transition 720 ${fmt} ..."
      if [ "$fmt" = "mp4" ]; then encode_mp4 "$src" "$out" 720 23 "$trans_filter"
      else encode_webm "$src" "$out" 720 32 "$trans_filter"; fi
      echo "  transition 720 ${fmt} -> $(human_size "$out")"
    fi
  done

  # ---- splash: first 1.2s, punchy ----
  splash_filter="trim=0:1.2,setpts=PTS-STARTPTS,fade=t=out:st=1.0:d=0.2"
  for fmt in mp4 webm; do
    out="${OUT_DIR}/${tag}-splash-720.${fmt}"
    if needs_rebuild "$src" "$out"; then
      echo "  splash 720 ${fmt} ..."
      if [ "$fmt" = "mp4" ]; then encode_mp4 "$src" "$out" 720 22 "$splash_filter"
      else encode_webm "$src" "$out" 720 31 "$splash_filter"; fi
      echo "  splash 720 ${fmt} -> $(human_size "$out")"
    fi
  done

  # ---- hover: up to 4s loop ----
  hover_dur=$(awk "BEGIN { d=$duration; print (d > 4 ? 4 : d) }")
  hover_filter="trim=0:${hover_dur},setpts=PTS-STARTPTS"
  for fmt in mp4 webm; do
    out="${OUT_DIR}/${tag}-hover-480.${fmt}"
    if needs_rebuild "$src" "$out"; then
      echo "  hover 480 ${fmt} ..."
      if [ "$fmt" = "mp4" ]; then encode_mp4 "$src" "$out" 480 24 "$hover_filter"
      else encode_webm "$src" "$out" 480 34 "$hover_filter"; fi
      echo "  hover 480 ${fmt} -> $(human_size "$out")"
    fi
  done

  # ---- poster ----
  poster="${OUT_DIR}/${tag}-poster.jpg"
  if needs_rebuild "$src" "$poster"; then
    echo "  poster ..."
    extract_poster "$src" "$poster"
    echo "  poster -> $(human_size "$poster")"
  fi
done

total_end=$(date +%s)
echo ""
echo "Done in $((total_end - total_start))s. Outputs in: $OUT_DIR"
echo "Next: run 'node scripts/build-video-manifest.mjs' to (re)build manifest.json"
