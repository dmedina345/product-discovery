---
name: gap-pass
description: >-
  Consolidate discovery.md into the requirements.md SSOT with the PO in the loop
  — coverage scan + scope-drop questions logged in gap-analysis.md, then write
  Consolidated requirements. Use for gap pass, consolidate requirements, or a PO
  review of scope drops.
metadata:
  author: letsmake
  version: 2.0.0
---

**Paths:** [paths.md](../letsmake-product-workflow/references/paths.md) + `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`). Ask via AskQuestion where available, plain chat otherwise — always one question at a time unless batching is explicitly allowed below.

# Gap pass

Turn `discovery.md` into a delivery-ready `requirements.md`. The value of this pass is not the writing — it is that **every gap, drop, downgrade, and conflict passes through the PO before it becomes the contract**. The audit trail lives in `gap-analysis.md`; requirements stay clean.

**Companions:** [gap-pass-checklist.md](../letsmake-product-workflow/references/gap-pass-checklist.md) (coverage rows + question queue) · [gap-analysis-template.md](../letsmake-product-workflow/references/gap-analysis-template.md) · [requirements-template.md](../letsmake-product-workflow/references/requirements-template.md) · [gap-pass-review.md](../letsmake-product-workflow/references/gap-pass-review.md) (PO sign-off aid) · design-first: [figma-parity-playbook.md](../letsmake-product-workflow/references/figma-parity-playbook.md)

## The two-phase rule

**Phase A asks; Phase B writes.** Not one line of `requirements.md` changes until the PO has answered the mandatory questions (M1–M10). Discovery saying "out of v1" is **not** a PO decision — it still gets a question.

## Phase A — analysis and questions (no SSOT edits)

1. **Inventory.** Read `discovery.md` (primary), then `brief.md`, `design.md`, Figma parity docs, ADRs, and the glossary if one exists. Search the epic for prior requirements docs (checklist Step 1) — rank by relevance, never assume a slug.
2. **Prior-doc decision (M2).** If prior SSOT candidates exist, ask whether to run the regression diff against them. A skipped diff is a logged PO choice, never a silent one.
3. **Coverage matrix.** Score the checklist rows — scope, platforms, entry/routing, resilience, accessibility, migration, integrations, NFR/analytics, negative guardrails, plus domain rows built from *this feature's* Musts and open questions. Verdicts: `CARRIED` / `N/A` / `DEFER(spec)` / `DEFER(design)` / `DROP` / `MISSING` / `ASK PO`.
4. **Scope drop register.** Every candidate drop, from any source, becomes a register row, and every row becomes an **M1** question. One-at-a-time always for: shared/global UI, cross-feature dependencies, analytics or rollout reductions, accessibility or platform-parity downgrades, and prior-SSOT Musts. Other low-risk candidates may be batched into one question with per-item recommendations and an "accept all" option. Either way, every item gets its own PO decisions log row.
5. **Question loop.** Run M3–M8 as triggered (full table in checklist Step 4): missing Musts, downgrades, N/A integrations, MISSING rows, and source conflicts (quote both sides, ask which wins). Log every answer in `gap-analysis.md` § PO decisions log.
6. **Research gate.** A blocking `R-*` still running → ask: wait, accept the current recommendation, or carry as `TBC` with owner. A new gap that desk/comparable/Figma/video research would resolve → auto-launch `research-spike` in parallel and keep going; findings are proposals the PO adopts per-item via a question. Research never edits requirements.
7. **M9.** "Proceed to write requirements?"

## Phase B — write the SSOT (only after M9)

1. **M10 — final approval.** Only after it, set `gap-analysis.md` Status: **PO approved — merged into requirements.md**.
2. **Record PDRs.** Significant or reversible-later answers (scope drops with revisit triggers, policy calls like offline behavior) get a `PDR-*` row in `decisions.md` ([decision-log-template.md](../letsmake-product-workflow/references/decision-log-template.md)); cite the id in the PO log and in requirements § Resolved decisions.
3. **Write `requirements.md`** per the template: Overview first; every Must story with observable Gherkin + acceptance-criteria summary + Definition of Done, marked `Confirmed` or `TBC` with owner; full MoSCoW; measurable NFR/analytics or explicit N/A; Resolved decisions citing PDRs; open items in **Missing info & clarifications** as plain tables. Reject subjective-only acceptance on a Must — rewrite it observable or TBC the unmeasurable part. Won't Have rows cite their PO-log entry. No coverage matrices, `[FIGMA Δ]` blocks, or audit prose in this file.
4. **Align `design.md`**; set `discovery.md` Status: superseded for SSOT (historical — keep the file).
5. **Exit gate.** Run checklist Step 6 and offer [gap-pass-review.md](../letsmake-product-workflow/references/gap-pass-review.md) to the PO. Then offer **`scenario-hardening`** before `dev-handoff`, unless the change is small/low-risk and the PO accepts N/A.

## Anti-patterns

- A Won't Have without an M1 answer in the PO decisions log
- Consolidated with a blocking `TBC` on a Must and no owner
- Editing `requirements.md` during Phase A "to save time"
- Treating a research recommendation or discovery draft as an approved decision
- Audit content — matrices, diff blocks, PO-log prose — inside `requirements.md`
