---
name: wiki-lint
description: >-
  Check the product doc wiki for broken links, malformed or duplicate IDs
  (PDR/OQ/R), unlinked supersede chains, stale statuses, value drift, and
  formatting issues. Use for lint the docs, check the wiki, doc health, before a
  dev handoff, or on a periodic cleanup pass.
metadata:
  author: letsmake
  version: 2.2.0
---

**Paths:** [paths.md](../letsmake-product-workflow/references/paths.md) + `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`).

# Wiki lint

Mechanical health check for the product docs (`docs/` and feature folders). **Report first; fix only formatting.** Product contradictions are flagged for the PO — never silently resolved (see [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md)).

Run `scripts/validate-workflow.ps1 -Workspace . -ExplainState` (Windows) or `scripts/validate-workflow.sh --workspace . --explain-state` first. Add `-Feature` / `--feature` for a focused gate and `-Json` / `--json` for automation. The script owns deterministic checks, event chronology, evaluator persistence, and derived state; this skill interprets contradictions.

## When to use

- Periodic cleanup, "lint the docs", before dev handoff or a PO review
- After a big editing session or merge (links/IDs may have drifted)
- `increment-requirements` step 6 delegates its cross-artifact lint here

## Checks

| Area | Check |
| ---- | ----- |
| **Links** | Every relative markdown link in `docs/` resolves to an existing file/anchor |
| **IDs** | `PDR-*`, `OQ-*`, `R-*` match their format; no duplicates within a scope |
| **Cross-refs** | Every PDR/OQ/R id cited in `requirements.md` exists in its source doc; no orphan accepted PDRs (no requirements trace) on Must-level topics |
| **Supersede chains** | `superseded` PDRs have `superseded-by`; the successor exists and points back via `supersedes` |
| **Statuses** | Enum values only (doc Status, PDR status, `R-*` status); no doc both "Consolidated" and "Draft" |
| **Freshness** | `Last updated` dates vs recent file changes; `running` `R-*` older than ~a week → flag |
| **Hygiene** | No coverage matrices / `[FIGMA Δ]` / diff blocks in `requirements.md`; no inline `(PO YYYY-MM-DD)` prose where a PDR belongs; canvas-index rows point at existing canvases (warn only — paths are per-machine) |
| **Workflow** | Legal artifact/event transitions; M9 before Draft and persisted review before M10; atomic `GP-*`/`GP-RESEARCH-*` traceability; no scenario blockers; Planning pass; untouched spec `[ENG]` sections; Prepared vs Accepted acknowledgment |
| **Contradictions** | Same topic stated differently across requirements / decisions / design docs → `[!contradiction]` naming **both** sources. `discovery.md` is **exempt** once requirements is Consolidated (historical capture — flag it only if its Status still claims to be current) |

**Method:** grep/glob per check (IDs are grep-precise by design); read only the files a hit points at. Keep it cheap — this is a lint, not a review.

## Output contract

A short report grouped by severity:

1. **Broken** (dead links, missing PDR targets, malformed IDs) — fix formatting/links directly, list what was fixed
2. **Flag for PO** (`[!contradiction]`, orphan decisions, status conflicts) — never auto-resolve; suggest the question or an `increment-requirements` pass
3. **Warnings** (stale dates, long-running spikes, per-machine canvas paths)

Template/stub source links are relocation-aware: validate them at their documented installed destination. End with validator counts plus contradiction findings; route product changes through change control.

## Anti-patterns

- "Fixing" a contradiction by picking a side (that is a PO decision)
- Rewriting a PDR's meaning while fixing its formatting
- Auto-editing `requirements.md` content beyond links/formatting
