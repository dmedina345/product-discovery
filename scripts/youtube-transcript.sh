#!/usr/bin/env bash
# Fetch YouTube or Loom captions (no video download) and write a markdown source file.
# Requires: yt-dlp (brew install yt-dlp)
set -euo pipefail

SUB_LANG="en"
OUT_DIR=""
URL=""
SOURCE=""

usage() {
  cat <<'EOF'
Usage: youtube-transcript.sh --url URL --out-dir PATH [--lang en]

Writes: {out-dir}/{YYYY-MM-DD}-{title-slug}.md

  --url       Single YouTube or Loom video URL
  --out-dir   Feature research sources folder (created if missing)
  --lang      Caption language (default: en)

Supported URLs:
  YouTube: youtube.com/watch, youtu.be, youtube.com/shorts, youtube.com/live
  Loom:    loom.com/share/{id}, loom.com/embed/{id}

Notes:
  - Downloads subtitles only (--skip-download). No video/audio files kept.
  - YouTube: prefers manual captions over auto-generated when both exist.
  - Loom: uses Loom's native transcript (public share/embed URLs only).
  - Fails clearly if no captions are available (Whisper not used in v1).
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

detect_source() {
  case "$1" in
    *youtube.com/watch*|*youtu.be/*|*youtube.com/shorts/*|*youtube.com/live/*) echo "youtube" ;;
    *loom.com/share/*|*loom.com/embed/*) echo "loom" ;;
    *) echo "unknown" ;;
  esac
}

validate_url() {
  SOURCE="$(detect_source "$1")"
  case "$SOURCE" in
    youtube)
      if [[ "$1" =~ youtube.com/playlist\? ]] && [[ ! "$1" =~ v= ]]; then
        echo "error: playlist URLs are not supported in v1. Pass a single video URL." >&2
        exit 1
      fi
      ;;
    loom)
      ;;
    *)
      echo "error: not a supported YouTube or Loom video URL: $1" >&2
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
  ' "$file" | sed -E 's/[[:space:]]+/ /g; s/^ //; s/ $//'
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

META="$TMPDIR/meta.json"
yt-dlp --no-update --no-download-archive --skip-download --dump-json "$URL" >"$META" 2>/dev/null

VIDEO_ID="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1]))['id'])" "$META")"
TITLE="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1])).get('title','unknown-title'))" "$META")"
UPLOAD_RAW="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1])).get('upload_date',''))" "$META")"
DURATION="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1])).get('duration') or 0)" "$META")"
WEBPAGE="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1])).get('webpage_url', sys.argv[2]))" "$META" "$URL")"

if [[ "$SOURCE" == "youtube" ]]; then
  CREATOR="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1])).get('channel',''))" "$META")"
  CREATOR_LABEL="Channel"
else
  CREATOR="$(python3 -c "import json,sys; print(json.load(open(sys.argv[1])).get('uploader',''))" "$META")"
  CREATOR_LABEL="Creator"
fi

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
  yt-dlp --no-update --no-download-archive --skip-download \
    "$flag" --sub-lang "$SUB_LANG" --sub-format "vtt/srt/best" \
    -o "$TMPDIR/%(id)s" "$URL" >/dev/null 2>&1 || true
  SUB_FILE="$(find "$TMPDIR" -maxdepth 1 -type f \( -name "*.vtt" -o -name "*.srt" \) | head -n 1)"
  if [[ -n "$SUB_FILE" ]]; then
    CAPTION_TYPE="$mode"
  fi
}

if [[ "$SOURCE" == "youtube" ]]; then
  download_subs "manual" "--write-sub"
  if [[ -z "$SUB_FILE" ]]; then
    download_subs "auto" "--write-auto-sub"
  fi
else
  download_subs "native" "--write-sub"
fi

if [[ -z "$SUB_FILE" ]]; then
  echo "error: no ${SUB_LANG} captions found for this video." >&2
  if [[ "$SOURCE" == "loom" ]]; then
    echo "hint: Loom must be public and have transcription enabled. Private videos need the Loom API." >&2
  else
    echo "hint: v1 uses captions only (no Whisper). Try another video or paste a transcript manually." >&2
  fi
  exit 1
fi

TRANSCRIPT="$(subs_to_text "$SUB_FILE")"
if [[ -z "$TRANSCRIPT" ]]; then
  echo "error: caption file was empty after conversion." >&2
  exit 1
fi

SLUG="$(slugify "$TITLE")"
OUT_FILE="$OUT_DIR/${UPLOAD_DATE}-${SLUG}.md"

SOURCE_LABEL="$(echo "$SOURCE" | awk '{print toupper(substr($0,1,1)) substr($0,2)}')"

if [[ "$SOURCE" == "youtube" ]]; then
  FRONTMATTER_CREATOR="channel: \"${CREATOR//\"/\\\"}\""
else
  FRONTMATTER_CREATOR="creator: \"${CREATOR//\"/\\\"}\""
fi

cat >"$OUT_FILE" <<EOF
---
source: ${SOURCE}
url: ${WEBPAGE}
video_id: ${VIDEO_ID}
title: "${TITLE//\"/\\\"}"
${FRONTMATTER_CREATOR}
upload_date: ${UPLOAD_DATE}
duration_seconds: ${DURATION}
caption_type: ${CAPTION_TYPE}
language: ${SUB_LANG}
fetched: $(date +%Y-%m-%d)
---

# ${TITLE}

**Source:** [${SOURCE_LABEL}](${WEBPAGE}) · **${CREATOR_LABEL}:** ${CREATOR} · **Uploaded:** ${UPLOAD_DATE}

## Transcript

${TRANSCRIPT}
EOF

echo "$OUT_FILE"
