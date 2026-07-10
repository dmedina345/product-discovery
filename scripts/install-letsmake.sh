#!/usr/bin/env bash
# Bootstrap LetsMake Product Workflow in a consumer workspace (macOS/Linux).
# Windows: use install-letsmake.ps1 — keep both scripts in sync.
# Usage: bash install-letsmake.sh [--workspace DIR] [--pack-dir DIR]
set -euo pipefail

WORKSPACE="$(pwd)"
PACK_DIR=""
CHECK_MODE=0

usage() {
  cat <<'EOF'
LetsMake Product Workflow — workspace bootstrap

Usage:
  bash install-letsmake.sh [options]

Options:
  --workspace DIR   Target product repo (default: current directory)
  --pack-dir DIR    Path to product-discovery clone (default: script parent/..)
  --check           Doctor mode: validate existing config + environment, write nothing

Creates:
  docs/product/              (templates + playbooks from pack)
  docs/research/canvas-index.md
  docs/lessons-learned.md    (from template if missing)
  scripts/youtube-transcript.{sh,ps1}
  .cursor/letsmake.config.json

Does NOT install Cursor skills — run separately:
  npx skills add dmedina345/product-discovery --all -a cursor -y
EOF
}

# Read a string value for a top-level key from the config JSON.
cfg_get() {
  local key="$1" file="$2"
  if command -v python3 >/dev/null 2>&1; then
    python3 -c "import json,sys;print(json.load(open(sys.argv[1])).get(sys.argv[2],''))" "$file" "$key" 2>/dev/null
  else
    grep -o "\"$key\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" "$file" | head -1 | sed -E 's/.*:[[:space:]]*"([^"]*)"/\1/'
  fi
}

# Doctor mode: validate the consumer workspace config + environment. Writes nothing.
run_check() {
  set +e
  local cfg="$WORKSPACE/.cursor/letsmake.config.json"
  local fail=0 warn=0
  echo "LetsMake doctor — workspace: $WORKSPACE"
  echo ""

  if [[ ! -f "$cfg" ]]; then
    echo "FAIL  config not found: .cursor/letsmake.config.json"
    echo "      fix:  bash install-letsmake.sh --workspace \"$WORKSPACE\""
    echo ""
    echo "RESULT: FAIL (not bootstrapped)"
    return 1
  fi
  echo "ok    config: .cursor/letsmake.config.json"

  if command -v python3 >/dev/null 2>&1; then
    if ! python3 -c "import json,sys;json.load(open(sys.argv[1]))" "$cfg" 2>/dev/null; then
      echo "FAIL  config is not valid JSON"
      echo ""
      echo "RESULT: FAIL (invalid config)"
      return 1
    fi
  fi

  local docsRoot featRoot indexPath lessons canvas
  docsRoot="$(cfg_get docsProductRoot "$cfg")"
  featRoot="$(cfg_get featureDocsRoot "$cfg")"
  indexPath="$(cfg_get researchIndexPath "$cfg")"
  lessons="$(cfg_get lessonsLearnedPath "$cfg")"
  canvas="$(cfg_get canvasDir "$cfg")"

  abspath() { case "$1" in /*) printf '%s' "$1" ;; *) printf '%s' "$WORKSPACE/$1" ;; esac; }

  check_dir() {
    local label="$1" p; p="$(abspath "$2")"
    if [[ -d "$p" ]]; then echo "ok    $label: $p"; else echo "WARN  $label missing: $p"; warn=$((warn+1)); fi
  }
  check_file() {
    local label="$1" p; p="$(abspath "$2")"
    if [[ -f "$p" ]]; then echo "ok    $label: $p"; else echo "WARN  $label missing: $p"; warn=$((warn+1)); fi
  }

  if [[ -n "$docsRoot" ]]; then check_dir "docsProductRoot" "$docsRoot"; else echo "WARN  docsProductRoot unset"; warn=$((warn+1)); fi
  if [[ -n "$featRoot" ]]; then
    local fr; fr="$(abspath "$featRoot")"
    if [[ -d "$fr" ]]; then echo "ok    featureDocsRoot: $fr"; else echo "info  featureDocsRoot not yet created: $fr"; fi
  fi
  if [[ -n "$indexPath" ]]; then check_file "researchIndexPath" "$indexPath"; fi
  if [[ -n "$lessons" ]]; then check_file "lessonsLearnedPath" "$lessons"; fi

  # canvasDir must exist and be writable, and match this workspace's Cursor slug.
  if [[ -z "$canvas" ]]; then
    echo "FAIL  canvasDir unset in config"; fail=$((fail+1))
  else
    local expected="${HOME}/.cursor/projects/$(echo "$WORKSPACE" | sed 's|^/||' | tr '/' '-')/canvases"
    if [[ ! -d "$canvas" ]]; then
      echo "WARN  canvasDir missing (created on first canvas): $canvas"; warn=$((warn+1))
    elif touch "$canvas/.letsmake-write-test" 2>/dev/null; then
      rm -f "$canvas/.letsmake-write-test"
      echo "ok    canvasDir writable: $canvas"
    else
      echo "FAIL  canvasDir not writable: $canvas"; fail=$((fail+1))
    fi
    if [[ "$canvas" != "$expected" ]]; then
      echo "WARN  canvasDir does not match this workspace path"
      echo "      expected: $expected"
      warn=$((warn+1))
    fi
  fi

  # yt-dlp is only needed for video research.
  if command -v yt-dlp >/dev/null 2>&1; then
    echo "ok    yt-dlp on PATH"
  else
    echo "WARN  yt-dlp not found (video research only): brew install yt-dlp"; warn=$((warn+1))
  fi

  # Transcript script lives in workspace scripts/ (either shell flavor).
  if [[ -f "$WORKSPACE/scripts/youtube-transcript.sh" ]] || [[ -f "$WORKSPACE/scripts/youtube-transcript.ps1" ]]; then
    echo "ok    youtube-transcript script present in scripts/"
  else
    echo "WARN  youtube-transcript.{sh,ps1} not found in workspace scripts/"; warn=$((warn+1))
  fi

  echo ""
  if [[ $fail -gt 0 ]]; then
    echo "RESULT: FAIL ($fail error(s), $warn warning(s))"
    return 1
  elif [[ $warn -gt 0 ]]; then
    echo "RESULT: OK with $warn warning(s)"
    return 0
  fi
  echo "RESULT: OK — config healthy"
  return 0
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --workspace) WORKSPACE="$(cd "$2" && pwd)"; shift 2 ;;
    --pack-dir) PACK_DIR="$(cd "$2" && pwd)"; shift 2 ;;
    --check) CHECK_MODE=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "error: unknown argument: $1" >&2; usage; exit 1 ;;
  esac
done

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACK_DIR="${PACK_DIR:-$(cd "$SCRIPT_DIR/.." && pwd)}"

# Doctor mode validates an already-bootstrapped workspace; it needs no pack docs.
if [[ $CHECK_MODE -eq 1 ]]; then
  run_check
  exit $?
fi

# Canonical home for shared templates/playbooks (single source of truth).
DOCS_SRC="$PACK_DIR/skills/letsmake-product-workflow/references"

if [[ ! -d "$DOCS_SRC" ]]; then
  echo "error: pack not found at $PACK_DIR (expected $DOCS_SRC)" >&2
  exit 1
fi

# Cursor projects slug: strip leading /, replace / with -
WS_SLUG="$(echo "$WORKSPACE" | sed 's|^/||' | tr '/' '-')"
CANVAS_DIR="${HOME}/.cursor/projects/${WS_SLUG}/canvases"

mkdir -p "$WORKSPACE/docs/product"
mkdir -p "$WORKSPACE/docs/research"
mkdir -p "$WORKSPACE/scripts"
mkdir -p "$WORKSPACE/.cursor"
mkdir -p "$CANVAS_DIR"

# Copy product docs from the canonical references hub (do not overwrite existing)
for f in "$DOCS_SRC/"*.md; do
  base="$(basename "$f")"
  dest="$WORKSPACE/docs/product/$base"
  if [[ ! -f "$dest" ]]; then
    cp "$f" "$dest"
    echo "installed docs/product/$base"
  else
    echo "skip docs/product/$base (exists)"
  fi
done

# Canvas index stub
INDEX="$WORKSPACE/docs/research/canvas-index.md"
if [[ ! -f "$INDEX" ]]; then
  cp "$PACK_DIR/assets/research/canvas-index.stub.md" "$INDEX"
  # Replace placeholder canvas dir in stub
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "s|{CANVAS_DIR}|$CANVAS_DIR|g" "$INDEX"
  else
    sed -i "s|{CANVAS_DIR}|$CANVAS_DIR|g" "$INDEX"
  fi
  echo "installed docs/research/canvas-index.md"
else
  echo "skip docs/research/canvas-index.md (exists)"
fi

# Lessons learned template
LESSONS="$WORKSPACE/docs/lessons-learned.md"
if [[ ! -f "$LESSONS" ]]; then
  cp "$PACK_DIR/assets/lessons-learned.template.md" "$LESSONS"
  echo "installed docs/lessons-learned.md"
else
  echo "skip docs/lessons-learned.md (exists)"
fi

# YouTube scripts (both shells, so research works on macOS/Linux and Windows)
for yt_name in youtube-transcript.sh youtube-transcript.ps1; do
  YT="$WORKSPACE/scripts/$yt_name"
  if [[ ! -f "$YT" ]]; then
    cp "$PACK_DIR/scripts/$yt_name" "$YT"
    [[ "$yt_name" == *.sh ]] && chmod +x "$YT"
    echo "installed scripts/$yt_name"
  else
    echo "skip scripts/$yt_name (exists)"
  fi
done

# Config — never overwrite an existing config (it may carry team customizations).
CONFIG="$WORKSPACE/.cursor/letsmake.config.json"
if [[ -f "$CONFIG" ]]; then
  echo "skip .cursor/letsmake.config.json (exists — delete it first to regenerate)"
else
  cat >"$CONFIG" <<EOF
{
  "version": 1,
  "docsProductRoot": "docs/product",
  "featureDocsRoot": "docs/epics",
  "researchIndexPath": "docs/research/canvas-index.md",
  "lessonsLearnedPath": "docs/lessons-learned.md",
  "canvasDir": "$CANVAS_DIR"
}
EOF
  echo "wrote .cursor/letsmake.config.json"
fi
echo ""
echo "Canvas directory: $CANVAS_DIR"
echo ""
echo "Next steps:"
echo "  1. npx skills add dmedina345/product-discovery --all -a cursor -y"
echo "  2. Create a feature folder under docs/epics/{epic}/features/{feature}/"
echo "  3. Run intake-synthesize or grill-me in Cursor Agent"
