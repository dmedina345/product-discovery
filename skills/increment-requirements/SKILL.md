---
name: increment-requirements
description: >-
  Change control for an already-Consolidated requirements.md when a wave of PO
  updates, reversals, or clarifications arrives: capture decisions as PDRs,
  apply minimal SSOT edits, and lint for drift before stopping. Use for
  increment, refine or update requirements, a new pass, or reconciling decisions
  on an existing doc — bigger than a small change, not a fresh grill.
metadata:
  author: letsmake
  version: 2.2.0
---

**Paths:** [paths.md](../letsmake-product-workflow/references/paths.md) + `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`). Ask via AskQuestion where available, plain chat otherwise.

# Increment requirements

Change control for a **Consolidated `requirements.md`** — the mode between `small-change-requirements` (one narrow edit) and a fresh `grill-me` → `gap-pass`. A wave of PO updates arrives; decisions land as **PDRs**, the SSOT gets minimal clean edits, and drift is caught before stopping.

**When to use:** the doc is Consolidated or handed off and the PO is iterating on it — multiple points in one session, possibly reversing earlier calls.

**When not to:** one narrow edit with no reversal → `small-change-requirements`. No SSOT yet → `grill-me` → `gap-pass`. New IA, a new Must-level capability across modules, or a Won't-Have reversal → re-open `gap-pass` — that is not an increment.

## Loop

1. **Stage the change-set.** Capture the batch separately from the SSOT. Scenario hardening uses `scenario-matrix.md` below the matrix; do not close its `Add AC` rows yet.
2. **Classify each point:** new decision · reversal · clarification · OQ resolution · research-pending.
3. **Clarify ambiguities** — one question at a time. Surface anything that contradicts an existing PDR or requirements section explicitly; resolve missing measurables before writing.
4. **Record PDRs** in `decisions.md` ([decision-log-template.md](../letsmake-product-workflow/references/decision-log-template.md)) — one per decision; expanded block only for significant/irreversible ones. **Reversals supersede:** old PDR gets `status: superseded` + `superseded-by`; the new one links back via `supersedes`. Never rewrite a decided record's meaning.
5. **Apply minimal SSOT edits.** Clean prose citing PDR ids — not inline `(PO YYYY-MM-DD)` tags. Touch only the affected stories/AC/DoD; don't refactor adjacent content the PO didn't raise.
6. **Lint for drift.** For every changed value (a number, threshold, name), grep the whole doc for the stale value — Overview, AC summaries, and NFR sections drift apart easily. Cross-check requirements ↔ decisions ↔ design/parity docs ↔ the open-questions table (delegate the mechanical pass to `wiki-lint`). Emit `[!contradiction]` notes naming **both** sources — a human resolves via a new PDR, never a silent overwrite.
7. **Validate and record.** If changing an already prepared/accepted package, append `workflow-reopened` with the triggering audit, revision, and reason. Apply accepted PDRs, append `requirements-incremented` with its PDR/revision, run `scripts/validate-workflow.* --explain-state`, then persist and append `increment-review-completed`. For scenario-driven changes, update only applied rows to `Resolved`; when hardening completes append `scenario-hardened`, then re-prepare handoff.
8. **Stop-gate and revision.** Confirm the ending point, bump the requirements revision, add a Changelog row, and append a durable lesson when warranted.

Optional: mirror new/changed open questions to Linear, one-way — gated per [letsmake-conventions.md](../letsmake-product-workflow/references/letsmake-conventions.md) § Linear sync; skip silently if not set up.

## Output contract

A short summary: what changed · which PDRs (new + superseded) · contradictions found · revision bump. The PO reviews records, not prose diffs.

## Anti-patterns

- Inline dated prose or a growing run-on status line instead of a PDR
- Rewriting a decided PDR to change its meaning (supersede instead)
- Silently resolving a contradiction the PO should adjudicate
- Open-ended editing past the PO's batch without the stop-gate
