---
name: gap-pass
description: >-
  Consolidate discovery.md into the requirements.md SSOT with the PO in the loop
  — coverage scan + scope-drop questions logged in gap-analysis.md, then write
  Consolidated requirements. Use for gap pass, consolidate requirements, or a PO
  review of scope drops.
metadata:
  author: letsmake
  version: 2.2.0
---

**Paths:** [paths.md](../letsmake-product-workflow/references/paths.md) + `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`). Ask via AskQuestion where available, plain chat otherwise — always one question at a time unless batching is explicitly allowed below.

# Gap pass

Turn `discovery.md` into a delivery-ready `requirements.md`. The value of this pass is not the writing — it is that **every gap, drop, downgrade, and conflict passes through the PO before it becomes the contract**. The audit trail lives in `gap-analysis.md`; requirements stay clean.

**Companions:** [gap-pass-checklist.md](../letsmake-product-workflow/references/gap-pass-checklist.md) · [decision-records.md](../letsmake-product-workflow/references/decision-records.md) · [workflow-state-machine.md](../letsmake-product-workflow/references/workflow-state-machine.md) · [gap-analysis-template.md](../letsmake-product-workflow/references/gap-analysis-template.md) · [requirements-template.md](../letsmake-product-workflow/references/requirements-template.md) · [evaluation-contract.md](../letsmake-product-workflow/references/evaluation-contract.md)

## The two-phase rule

**Phase A asks; M9 permits a Draft; M10 permits Consolidated.** Discovery saying "out of v1" is not a decision. Record every capability in one stable `GP-*` row; batch presentation never means a batched audit row.

## Phase A — analysis and questions (no SSOT edits)

1. **Inventory.** Read `discovery.md` (primary), then `brief.md`, `design.md`, Figma parity docs, ADRs, and the glossary if one exists. Search the epic for prior requirements docs (checklist Step 1) — rank by relevance, never assume a slug.
2. **Prior-doc decision (M2).** If prior SSOT candidates exist, ask whether to run the regression diff against them. A skipped diff is a logged PO choice, never a silent one.
3. **Coverage matrix.** Score the checklist rows — scope, platforms, entry/routing, resilience, accessibility, migration, integrations, NFR/analytics, negative guardrails, plus domain rows built from *this feature's* Musts and open questions. Verdicts: `CARRIED` / `N/A` / `DEFER(spec)` / `DEFER(design)` / `DROP` / `MISSING` / `ASK PO`.
4. **Scope drop register.** Every candidate drop becomes its own `GP-DROP-*` row and M1 decision. Present high-risk items one-at-a-time; low-risk items may share a prompt with `Accept all`, but materialize one record per item.
5. **Question loop.** Run M3–M8 as triggered (full table in checklist Step 4): missing Musts, downgrades, N/A integrations, MISSING rows, and source conflicts (quote both sides, ask which wins). Log every answer in `gap-analysis.md` § PO decisions log.
6. **Research gate.** A blocking `R-*` still running → ask: wait, accept the current recommendation, or carry as `TBC` with owner. A new gap that desk/comparable/Figma/video research would resolve → auto-launch `research-spike` in parallel and keep going; findings are proposals the PO adopts per-item via a question. Research never edits requirements.
7. **Research contract gate.** Before M9, validate every done `R-*`: findings section, Verification, promised digest/canvas, and one `GP-RESEARCH-*` disposition per proposal. No pending proposal may cross M9.
8. **M9.** Record `GP-APPROVAL-M9`. An accepted answer authorizes a **Draft**, not Consolidated. Append `m9-approved` to `workflow-events.jsonl`.

## Phase B — Draft, review, then Consolidate

1. **After M9, write Draft.** Record PDRs for significant/reversible decisions, then write `requirements.md` Status `Draft`; each Won't bullet cites accepted `GP-DROP-*` IDs. Append `requirements-draft-created`.
2. **Review Draft.** Run the checklist, deterministic validator, and preferably a fresh evaluator using [evaluation-contract.md](../letsmake-product-workflow/references/evaluation-contract.md). Give the evaluator the canonical exit checklist and require criterion-by-criterion evidence/N/A, not only a verdict. Persist the raw response under `{feature}/reviews/`, then append `draft-review-completed` with its path. Empty/malformed evaluation is not a pass; retry once, then fall back to validator and label it not independent.
3. **M10.** Ask final approval only after the persisted Draft review. Record `GP-APPROVAL-M10` and append `m10-approved`.
4. **Consolidate.** After accepted M10, set requirements `Consolidated`, gap analysis `PO approved`, discovery `Superseded`, align design, and append `requirements-consolidated`.
5. **Exit.** Run `scripts/validate-workflow.*`, then route to `scenario-hardening` unless explicitly N/A for small/low-risk work.

## Anti-patterns

- A Won't Have without an M1 answer in the PO decisions log
- A positional "gap log row 7" reference instead of a stable `GP-*` ID
- A combined decision row covering multiple capabilities
- Manually pasting a low-risk batch as one row; use `materialize-decisions` to produce one atomic row per item
- Consolidated with a blocking `TBC` on a Must and no owner
- Editing `requirements.md` during Phase A "to save time"
- Treating a research recommendation or discovery draft as an approved decision
- Audit content — matrices, diff blocks, PO-log prose — inside `requirements.md`
