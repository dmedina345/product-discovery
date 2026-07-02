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
**Requirements:** [requirements.md](./requirements.md) · **Discovery:** [discovery.md](./discovery.md)

> Status may be set to **PO approved** only after AskQuestion **M10** (checklist Step 4).

---

## 1 — Inventory (sources read)

| Source | Path | Read | Notes |
| ------ | ---- | ---- | ----- |
| Discovery (primary) | ./discovery.md | [ ] |  |
| Brief | ./brief.md | [ ] | or N/A |
| Design | ./design.md | [ ] | or N/A |
| Legacy handoff | ./handoff.md | [ ] | or N/A |
| Prior SSOT candidates | [paths from prior-doc discovery] | [ ] | checklist Step 1 |
| ADR / glossary | [paths] | [ ] |  |

**Context inbox rows pending:** [CI-ids or none] · **Prototype rows pending:** [P-ids or none] · **Eval blockers:** [rows with `needs PO` / `needs cleanup` or none]

## 2 — Prior doc decision (M2)

**Asked:** YYYY-MM-DD · **PO answer:** compare [paths] | skip — reason: […]

## 3 — Coverage matrix

One row per checklist item (2A–2I core + 2J domain rows). Verdicts: `CARRIED` | `N/A` | `DEFER(spec)` | `DEFER(design)` | `DROP` | `MISSING` | `ASK PO`

| ID | Topic | Source says | Draft requirements say | Verdict | PO ref |
| -- | ----- | ----------- | ---------------------- | ------- | ------ |
| SC-1 |  |  |  |  |  |

## 4 — Scope drop candidates

Every row here requires an **M1 AskQuestion** before it may appear in requirements Won't Have or Resolved DROP.

| # | Capability | Source of the drop | Risk class (always-ask / low-risk) | PO decision (log row #) |
| - | ---------- | ------------------ | ----------------------------------- | ----------------------- |
| 1 |            |                    |                                     |                         |

## 5 — Regression diff (if prior SSOT compared)

| Topic ID | Prior doc says | Contract draft says | Proposed action | PO decision |
| -------- | -------------- | ------------------- | --------------- | ----------- |
| REG-01   |                |                     | ASK PO          |             |

## 6 — PO decisions log

One row per AskQuestion answer — the session record cited by requirements Won't Have / Resolved decisions. **Significant or reversible-later decisions also get a `PDR-*` in `decisions.md`** (episodic memory — see [decision-log-template.md](./decision-log-template.md)); cite the PDR ID in the last column.

| # | Date | Question (M-id + topic) | Options offered | PO answer | Carried into | PDR |
| - | ---- | ----------------------- | --------------- | --------- | ------------ | --- |
| 1 |      |                         |                 |           |              |     |

## 7 — Blocking items

Open gates that must clear before Phase B (SSOT write):

| Item | Type (TBC / R-* / CI-* / P-* / EVAL) | Owner | Resolution path |
| ---- | ------------------------------------- | ----- | --------------- |
|      |                                       |       |                 |

## 8 — Exit gate

Run `gap-pass-checklist.md` Step 6 (in `{docsProductRoot}/`, default `docs/product/`) and record the result + date here. Offer `gap-pass-review.md` to the PO.

---

## TEMPLATE END
