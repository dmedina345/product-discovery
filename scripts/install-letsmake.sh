#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACK_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
WORKSPACE="$PWD"
MODE="install"
DRY_RUN=0
ACCEPT_CURRENT=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --workspace) WORKSPACE="$2"; shift 2 ;;
    --pack-dir) PACK_DIR="$2"; shift 2 ;;
    --check) MODE="check"; shift ;;
    --check-upgrade) MODE="check-upgrade"; shift ;;
    --upgrade) MODE="upgrade"; shift ;;
    --dry-run) DRY_RUN=1; shift ;;
    --accept-current) ACCEPT_CURRENT="$2"; shift 2 ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done

NODE_BIN="${LETSMAKE_NODE:-}"
if [[ -z "$NODE_BIN" ]]; then NODE_BIN="$(command -v node || true)"; fi
if [[ -z "$NODE_BIN" ]]; then echo "Node.js 18+ not found. Set LETSMAKE_NODE or install Node.js." >&2; exit 1; fi

ARGS=("$SCRIPT_DIR/letsmake-tools.mjs" "$MODE" --workspace "$WORKSPACE" --pack "$PACK_DIR")
if [[ "$DRY_RUN" == "1" ]]; then ARGS+=(--dry-run); fi
if [[ -n "$ACCEPT_CURRENT" ]]; then ARGS+=(--accept-current "$ACCEPT_CURRENT"); fi
exec "$NODE_BIN" "${ARGS[@]}"
