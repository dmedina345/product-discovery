#!/usr/bin/env bash
# Fetch YouTube captions (no video download) and write a markdown source file (macOS/Linux).
# Windows: use youtube-transcript.ps1 — keep both scripts in sync.
# Requires: yt-dlp (brew install yt-dlp)
set -euo pipefail

SUB_LANG="en"
OUT_DIR=""
URL=""

usage() {
  cat <<'EOF'
Usage: youtube-transcript.sh --url URL --out-dir PATH [--lang en]

Writes: {out-dir}/{YYYY-MM-DD}-{title-slug}.md

  --url       Single YouTube video URL (watch, youtu.be, or shorts)
  --out-dir   Feature research sources folder (created if missing)
  --lang      Caption language (default: en)

Notes:
  - Downloads subtitles only (--skip-download). No video/audio files kept.
  - Prefers manual captions over auto-generated when both exist.
  - Fails clearly if no English captions are available (Whisper not used in v1).
EOF
}

slugify() {
  echo "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g' | cut -c1-80
}

require_yt_dlp() {
  if ! command -v yt-dlp >/dev/null 2>&1; then
    echo "error: yt-dlp not found. Install with: brew install yt-dlp" >&2
    exit 1
  fi
}

validate_url() {
  case "$1" in
    *youtube.com/watch*|*youtu.be/*|*youtube.com/shorts/*|*youtube.com/live/*)
      if [[ "$1" =~ youtube.com/playlist\? ]] && [[ ! "$1" =~ v= ]]; then
        echo "error: playlist URLs are not supported in v1. Pass a single video URL." >&2
        exit 1
      fi
      ;;
    *)
      echo "error: not a supported YouTube video URL: $1" >&2
      exit 1
      ;;
  esac
}

subs_to_text() {
  local file="$1"
  awk '
    BEGIN { prev = "" }
    /^WEBVTT/ || /^Kind:/ || /^Language:/ || /^NOTE/ { next }
    /^[0-9]+$/ { next }
    /^[0-9]{2}:[0-9]{2}:/ { next }
    /<[^>]+>/ { gsub(/<[^>]+>/, "") }
    {
      gsub(/^[[:space:]]+|[[:space:]]+$/, "")
      if ($0 == "" || $0 == prev) next
      printf "%s ", $0
      prev = $0
    }
  ' "$file" \
    | sed -E 's/[[:space:]]+/ /g; s/^ //; s/ $//' \
    | awk '
      # Wrap the caption stream into paragraphs of roughly 80-160 words,
      # breaking at sentence ends, so transcripts stay readable and diffable.
      {
        n = split($0, w, " ")
        line = ""; count = 0
        for (i = 1; i <= n; i++) {
          line = (line == "" ? w[i] : line " " w[i])
          count++
          if ((count >= 80 && w[i] ~ /[.!?]"?$/) || count >= 160) {
            print line "\n"
            line = ""; count = 0
          }
        }
        if (line != "") print line
      }'
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --url) URL="$2"; shift 2 ;;
    --out-dir) OUT_DIR="$2"; shift 2 ;;
    --lang) SUB_LANG="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "error: unknown argument: $1" >&2; usage; exit 1 ;;
  esac
done

[[ -n "$URL" ]] || { echo "error: --url is required" >&2; usage; exit 1; }
[[ -n "$OUT_DIR" ]] || { echo "error: --out-dir is required" >&2; usage; exit 1; }

require_yt_dlp
validate_url "$URL"

mkdir -p "$OUT_DIR"

TMPDIR="$(mktemp -d)"
cleanup() { rm -rf "$TMPDIR"; }
trap cleanup EXIT

# Metadata via --print (one field per line — no JSON parser dependency)
META="$TMPDIR/meta.txt"
yt-dlp --no-download-archive --skip-download \
  --print "%(id)s" --print "%(title)s" --print "%(channel)s" \
  --print "%(upload_date)s" --print "%(duration)s" --print "%(webpage_url)s" \
  "$URL" >"$META"

VIDEO_ID="$(sed -n '1p' "$META")"
TITLE="$(sed -n '2p' "$META")"
CHANNEL="$(sed -n '3p' "$META")"
UPLOAD_RAW="$(sed -n '4p' "$META")"
DURATION="$(sed -n '5p' "$META")"
WEBPAGE="$(sed -n '6p' "$META")"

[[ -n "$TITLE" && "$TITLE" != "NA" ]] || TITLE="unknown-title"
[[ -n "$WEBPAGE" && "$WEBPAGE" != "NA" ]] || WEBPAGE="$URL"
[[ "$CHANNEL" != "NA" ]] || CHANNEL=""
[[ "$DURATION" =~ ^[0-9]+$ ]] || DURATION=0

if [[ "$UPLOAD_RAW" =~ ^[0-9]{8}$ ]]; then
  UPLOAD_DATE="${UPLOAD_RAW:0:4}-${UPLOAD_RAW:4:2}-${UPLOAD_RAW:6:2}"
else
  UPLOAD_DATE="$(date +%Y-%m-%d)"
fi

if [[ "$DURATION" -gt 3600 ]]; then
  echo "warning: video duration is ${DURATION}s (>1h). Proceeding anyway." >&2
fi

CAPTION_TYPE="unknown"
SUB_FILE=""

download_subs() {
  local mode="$1"
  local flag="$2"
  yt-dlp --no-download-archive --skip-download \
    "$flag" --sub-lang "$SUB_LANG" --sub-format "vtt/srt/best" \
    -o "$TMPDIR/%(id)s" "$URL" >/dev/null 2>&1 || true
  SUB_FILE="$(find "$TMPDIR" -maxdepth 1 -type f \( -name "*.vtt" -o -name "*.srt" \) | head -n 1)"
  if [[ -n "$SUB_FILE" ]]; then
    CAPTION_TYPE="$mode"
  fi
}

download_subs "manual" "--write-sub"
if [[ -z "$SUB_FILE" ]]; then
  download_subs "auto" "--write-auto-sub"
fi

if [[ -z "$SUB_FILE" ]]; then
  echo "error: no ${SUB_LANG} captions found for this video." >&2
  echo "hint: v1 uses captions only (no Whisper). Try another video or paste a transcript manually." >&2
  exit 1
fi

TRANSCRIPT="$(subs_to_text "$SUB_FILE")"
if [[ -z "$TRANSCRIPT" ]]; then
  echo "error: caption file was empty after conversion." >&2
  exit 1
fi

SLUG="$(slugify "$TITLE")"
OUT_FILE="$OUT_DIR/${UPLOAD_DATE}-${SLUG}.md"

cat >"$OUT_FILE" <<EOF
---
source: youtube
url: ${WEBPAGE}
video_id: ${VIDEO_ID}
title: "${TITLE//\"/\\\"}"
channel: "${CHANNEL//\"/\\\"}"
upload_date: ${UPLOAD_DATE}
duration_seconds: ${DURATION}
caption_type: ${CAPTION_TYPE}
language: ${SUB_LANG}
fetched: $(date +%Y-%m-%d)
---

# ${TITLE}

**Source:** [YouTube](${WEBPAGE}) · **Channel:** ${CHANNEL} · **Uploaded:** ${UPLOAD_DATE}

## Transcript

${TRANSCRIPT}
EOF

echo "$OUT_FILE"
