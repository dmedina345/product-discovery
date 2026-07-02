---
name: wiki-lint
description: >-
  Check the product doc wiki for broken links, malformed or duplicate IDs
  (PDR/RULE/OQ/R/CI/EAR), rules citing missing PDRs, unlinked supersede chains,
  stale statuses, and formatting drift. Use for lint the docs, check the wiki,
  doc health, before a dev handoff, or on a periodic cleanup pass.
metadata:
  author: letsmake
  version: 1.2.0
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`).

# Wiki lint

Mechanical health check for the doc wiki (`docs/` + memory files). **Report first; fix only formatting.** Product contradictions are flagged for the PO — never silently resolved (see [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md)).

## When to use

- Periodic cleanup, "lint the docs", before dev handoff or a PO review
- After a big editing session or merge (links/IDs may have drifted)
- `increment-requirements` step 7 delegates its cross-artifact lint here

## Checks

| Area | Check |
| ---- | ----- |
| **Links** | Every relative markdown link in `docs/`, `AGENTS.md`, memory files resolves to an existing file/anchor |
| **IDs** | `PDR-*`, `RULE-*`, `OQ-*`, `R-*`, `CI-*`, `EAR-*`, `P-*` match their format; no duplicates within a scope |
| **Cross-refs** | Every `RULE-*` cites an existing PDR; every requirements PDR/OQ/R reference exists; no **orphan** accepted PDRs (no requirements/rules trace) on Must-level topics |
| **Supersede chains** | `superseded` PDRs have `superseded-by`; the successor exists and points back via `supersedes` |
| **Statuses** | Enum values only (doc Status, PDR status, R-\* status, RULE status); no doc both "Consolidated" and "Draft"; discovery not "Ready for gap pass" with untriaged CI rows |
| **Freshness** | `Last updated` / hot-cache dates vs recent file changes; `running` R-\* older than ~a week → flag |
| **Hygiene** | No coverage matrices / `[FIGMA Δ]` / diff blocks in `requirements.md`; no inline `(PO YYYY-MM-DD)` prose where a PDR belongs; canvas-index rows point at existing canvases (warn only — paths are per-machine) |
| **Contradictions** | Same topic stated differently across requirements / rules / decisions → `[!contradiction]` naming **both** sources |

**Method:** grep/glob per check (IDs are grep-precise by design); read only the files a hit points at. Keep it cheap — this is a lint, not a review.

## Output contract

A short report grouped by severity:

1. **Broken** (dead links, missing PDR targets, malformed IDs) — fix formatting/links directly, list what was fixed
2. **Flag for PO** (`[!contradiction]`, orphan decisions, status conflicts) — never auto-resolve; suggest the AskQuestion or `increment-requirements` pass
3. **Warnings** (stale dates, long-running spikes, per-machine canvas paths)

End with counts (checked / fixed / flagged) and, if product issues were found, offer `increment-requirements` to resolve them with the PO.

## Anti-patterns

- "Fixing" a contradiction by picking a side (that is a PO decision)
- Rewriting a PDR's meaning while fixing its formatting
- Auto-editing `requirements.md` content beyond links/formatting
