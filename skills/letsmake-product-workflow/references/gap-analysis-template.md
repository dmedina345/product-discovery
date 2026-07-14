# Gap analysis template (audit artifact)

**Purpose:** Audit trail for the **gap pass** — inventory, coverage, scope drops, regression diff, and the PO decisions log. Kept **after** merge; never inlined into `requirements.md`.

**Process:** [`gap-pass-checklist.md`](./gap-pass-checklist.md) defines the full row set and rules. This template fixes the file structure so every feature's `gap-analysis.md` looks the same.

Copy everything below the `## TEMPLATE START` heading (strip the marker lines) to `docs/epics/{epic}/features/{feature}/gap-analysis.md`.

---

## TEMPLATE START

# Gap analysis: [Feature Name]

**Epic:** [epic-slug]  
**Feature:** [feature-slug]  
**Status:** In progress | Blocked — awaiting PO | PO approved — merged into requirements.md  
**Last updated:** YYYY-MM-DD  
**Authority mode:** real | simulated-po
**Requirements:** [requirements.md](./requirements.md) · **Discovery:** [discovery.md](./discovery.md)

> Status may be set to **PO approved** only after AskQuestion **M10** (checklist Step 4).

---

## 1 — Inventory (sources read)

| Source | Path | Read | Notes |
| ------ | ---- | ---- | ----- |
| Discovery (primary) | ./discovery.md | [ ] |  |
| Brief | ./brief.md | [ ] | or N/A |
| Design | ./design.md | [ ] | or N/A |
| Decisions | ./decisions.md | [ ] | existing PDRs — or N/A |
| Prior SSOT candidates | [paths from prior-doc discovery] | [ ] | checklist Step 1 |
| ADR / glossary | [paths] | [ ] |  |

**Research rows pending:** [R-ids still queued/running, or none]

## 2 — Prior doc decision (M2)

**Asked:** YYYY-MM-DD · **PO answer:** compare [paths] | skip — reason: […]

## 3 — Coverage matrix

One row per checklist item (2A–2I core + 2J domain rows). Verdicts: `CARRIED` | `N/A` | `DEFER(spec)` | `DEFER(design)` | `DROP` | `MISSING` | `ASK PO`

| ID | Topic | Source says | Draft requirements say | Verdict | PO ref |
| -- | ----- | ----------- | ---------------------- | ------- | ------ |
| SC-1 |  |  |  |  |  |

## 4 — Scope drop candidates

Every row here requires an **M1 AskQuestion** before it may appear in requirements Won't Have or Resolved DROP.

| Decision ID | Capability | Source of the drop | Risk class | PO disposition |
| ----------- | ---------- | ------------------ | ---------- | -------------- |
| GP-DROP-001 |            |                    | high / low | pending |

## 5 — Regression diff (if prior SSOT compared)

| Topic ID | Prior doc says | Contract draft says | Proposed action | PO decision |
| -------- | -------------- | ------------------- | --------------- | ----------- |
| REG-01   |                |                     | ASK PO          |             |

## 6 — Atomic PO decisions

Use `materialize-decisions` for low-risk batches so every capability becomes its own row. Add one `GP-RESEARCH-*` record per research proposal before M9.

One stable row per capability/proposal, even when several low-risk items were presented in one prompt. Requirements cite these IDs, never positional row numbers. See [decision-records.md](./decision-records.md).

| ID | Date | Type | Capability / question | Options offered | PO answer | Source refs | Carried into | PDR |
| -- | ---- | ---- | --------------------- | --------------- | --------- | ----------- | ------------ | --- |
| GP-GAP-001 | | M7 | | | | | | |
| GP-APPROVAL-M9 | | M9 | Write Draft SSOT? | proceed / wait / abort | | | requirements Draft | — |
| GP-APPROVAL-M10 | | M10 | Approve Consolidated SSOT? | approve / revise / stop | | Draft review | requirements Consolidated | — |

## 7 — Blocking items

Open gates classified by readiness dimension:

| Item | Type | Readiness (planning / implementation / production) | Owner | Resolution path / trigger |
| ---- | ---- | -------------------------------------------------- | ----- | ------------------------- |
|      |      |                                                    |       |                           |

## 8 — Exit gate

Run `gap-pass-checklist.md` Step 6 (in `{docsProductRoot}/`, default `docs/product/`) and record the result + date here. Offer `gap-pass-review.md` to the PO.

---

## TEMPLATE END
