#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE="$PWD"
FEATURE=""
JSON=0
EXPLAIN_STATE=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --workspace) WORKSPACE="$2"; shift 2 ;;
    --feature) FEATURE="$2"; shift 2 ;;
    --json) JSON=1; shift ;;
    --explain-state) EXPLAIN_STATE=1; shift ;;
    *) echo "Unknown option: $1" >&2; exit 2 ;;
  esac
done

NODE_BIN="${LETSMAKE_NODE:-$(command -v node || true)}"
if [[ -z "$NODE_BIN" ]]; then echo "Node.js 18+ not found. Set LETSMAKE_NODE or install Node.js." >&2; exit 1; fi
ARGS=("$SCRIPT_DIR/letsmake-tools.mjs" validate --workspace "$WORKSPACE")
if [[ -n "$FEATURE" ]]; then ARGS+=(--feature "$FEATURE"); fi
if [[ "$JSON" == "1" ]]; then ARGS+=(--json); fi
if [[ "$EXPLAIN_STATE" == "1" ]]; then ARGS+=(--explain-state); fi
exec "$NODE_BIN" "${ARGS[@]}"
