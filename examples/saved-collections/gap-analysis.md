# Gap analysis: Saved collections

**Epic:** library  
**Feature:** saved-collections  
**Status:** PO approved — merged into requirements.md  
**Last updated:** 2026-07-02  
**Requirements:** [requirements.md](./requirements.md) · **Discovery:** [discovery.md](./discovery.md)

> Status set to **PO approved** after AskQuestion **M10** (log row #9).

---

## 1 — Inventory (sources read)

| Source | Path | Read | Notes |
| ------ | ---- | ---- | ----- |
| Discovery (primary) | ./discovery.md | [x] | grill capture complete, eval pass |
| Brief | ./brief.md | [x] | N/A — brief lives in discovery § Brief summary |
| Design | ./design.md | [x] | N/A — design pass follows gap pass (D-note) |
| Legacy handoff | ./handoff.md | [x] | N/A — none |
| Prior SSOT candidates | docs/epics/library/features/*/ | [x] | none — first feature in epic |
| ADR / glossary | docs/adr/, CONTEXT.md | [x] | none exist |

**Context inbox rows pending:** none (CI-01 → OQ-02 → D6; CI-02 → R-01 done) · **Prototype rows pending:** none · **Eval blockers:** none

## 2 — Prior doc decision (M2)

**Asked:** 2026-07-02 · **PO answer:** skip — first feature in the epic, no prior SSOT discovered (log row #1)

## 3 — Coverage matrix

| ID | Topic | Source says | Draft requirements say | Verdict | PO ref |
| -- | ----- | ----------- | ---------------------- | ------- | ------ |
| SC-1 | Problem matches brief | brief in discovery | matches | CARRIED | — |
| SC-2 | Every brief Must has a story | 3 Musts | 4 stories (incl. migration) | CARRIED | — |
| SC-3 | Brief Won't Have carried | 3 items | Won't Have section | CARRIED | #4–6 |
| SC-4 | v1 boundary explicit | solution summary | Overview in/out | CARRIED | — |
| SC-5 | Dependencies listed | saves-service assumption | Dependencies section | CARRIED | — |
| PL-1/2 | iOS/Android behavior | platform matrix | carried + long-press quick-add | CARRIED | — |
| PL-3 | Web behavior | read-only (D8) | carried | CARRIED | #3 |
| PL-4 | Parity statement | matrix notes | added explicit statement | CARRIED | — |
| PL-5 | System back (Android) | sheet closes on back | carried into story AC | CARRIED | — |
| EN-1 | Cold start | Saved tab unchanged entry | carried | CARRIED | — |
| EN-2 | Deep links / notifications | **silent in grill** | **MISSING → asked** | ASK PO | #7 |
| EN-3 | Entry doesn't change defaults | n/a | N/A | N/A | — |
| EN-4 | Web routing | **silent in grill** | **MISSING → asked** | ASK PO | #7 |
| RS-1 | Primary action never blocked | save unchanged | carried (save never blocked by collection failures) | CARRIED | — |
| RS-2 | Offline behavior | **silent in grill** | **MISSING → asked** | ASK PO | #8 |
| RS-3 | Empty/error states | empty-state row in IA | carried + error toast AC | CARRIED | — |
| RS-4 | Rapid repeat actions | — | debounce picker add/remove; last-wins | CARRIED | — |
| RS-5 | Session vs cold start | — | N/A (no session state) | N/A | — |
| A11Y-1 | Non-gesture path | long-press is a shortcut only | ⋯ menu covers all actions | CARRIED | — |
| A11Y-2 | Announcements | — | DEFER(spec) with acceptance note | DEFER(spec) | #2 |
| A11Y-3 | Reduced motion | — | N/A (no new motion) | N/A | #2 |
| A11Y-4 | Web focus/escape | read-only web | N/A v1 | N/A | #2 |
| L10N-1 | Localization | — | new strings localized; collection names = user content | CARRIED | — |
| MG-1 | Existing-user migration | D7 | carried (Must story) | CARRIED | — |
| MG-2 | Coachmark dismiss rules | D7 single dismissible | carried into AC | CARRIED | — |
| MG-3 | Tap-first discovery | long-press optional | carried | CARRIED | — |
| XG-1 | Named dependencies | saves service | carried | CARRIED | — |
| XG-2 | Shared shell interaction | none | N/A | N/A | — |
| AC-1..5 | Overview/Gherkin/AC/DoD/Missing-info | — | verified in requirements draft | CARRIED | — |
| NF-1 | Performance targets | — | picker open < 300ms reference device | CARRIED | — |
| NF-2 | Memory/lifecycle | — | DEFER(spec) | DEFER(spec) | #2 |
| NF-3 | Analytics v1 | OQ-04 | events defined (§ Analytics) | CARRIED | — |
| NF-4 | Rollout success | goals draft | carried into Overview | CARRIED | — |
| PR-1 | PII in analytics/storage | — | collection names = user content: excluded from events; retention = account lifetime | CARRIED | — |
| PR-2 | Security/permissions | — | N/A (no auth surface change) | N/A | #2 |
| NG-1 | Do-not-ship rules | Won't Have drafts | carried | CARRIED | — |
| NG-2 | Prior-SSOT drops | none | N/A (no prior) | N/A | #1 |
| DOM-01 | Delete collection keeps saves | grill UX principle | Must story AC | CARRIED | — |
| DOM-02 | Limits (OQ-03) | open | DEFER(spec) with acceptance note | DEFER(spec) | #2 |

## 4 — Scope drop candidates

| # | Capability | Source of the drop | Risk class | PO decision (log row #) |
| - | ---------- | ------------------ | ---------- | ----------------------- |
| 1 | Shareable/collaborative collections | CI-01 + D6 draft | **always-ask** (cross-team ask from marketing) | #3 — Won't Have v1; revisit post-launch with adoption data |
| 2 | Smart/auto collections | grill Won't draft | low-risk | #4 (batched) — Won't Have v1 |
| 3 | Manual reordering | grill Won't draft | low-risk | #5 (batched) — Won't Have v1 |
| 4 | Web create/edit | D8 draft | low-risk | #6 (batched) — Won't Have v1, web read-only |

## 5 — Regression diff

N/A — no prior SSOT (M2, log row #1).

## 6 — PO decisions log

| # | Date | Question (M-id + topic) | Options offered | PO answer | Carried into | PDR |
| - | ---- | ----------------------- | --------------- | --------- | ------------ | --- |
| 1 | 2026-07-02 | M2 prior-doc comparison | compare / skip | skip — first feature in epic | § 5 | — |
| 2 | 2026-07-02 | M7 deferrals+N/A batch (A11Y-2, NF-2, DOM-02 limits, PR-2, A11Y-3/4) | per-item | accept as recommended (defer to spec with acceptance notes / N/A) | matrix | — |
| 3 | 2026-07-02 | M1 shareable collections (always-ask) | Must v1 / Won't v1 / later epic / TBC | **Won't Have v1** — revisit post-launch with adoption data | Won't Have | PDR-LIB-001 |
| 4 | 2026-07-02 | M1 smart collections (low-risk batch) | accept-all / per-item | Won't Have v1 | Won't Have | — |
| 5 | 2026-07-02 | M1 manual reordering (low-risk batch) | accept-all / per-item | Won't Have v1 | Won't Have | — |
| 6 | 2026-07-02 | M1 web create/edit (low-risk batch) | accept-all / per-item | Won't Have v1 (read-only web) | Won't Have | — |
| 7 | 2026-07-02 | M7 EN-2/EN-4 entry & web routes (MISSING) | options + recommended | web routes `/saved`, `/saved/collections/{id}`; no push/deep-link entry work in v1 (existing recipe deep links unaffected) | IA & stories | — |
| 8 | 2026-07-02 | M7 RS-2 offline (MISSING) | queue edits / online-only / TBC | **online-only CRUD v1**: error toast + retry; saves themselves keep existing offline behavior | Resilience | PDR-LIB-002 |
| 9 | 2026-07-02 | M9 + M10 proceed & approve | proceed / hold | approved — write SSOT, mark Consolidated | requirements.md | — |

## 7 — Blocking items

| Item | Type | Owner | Resolution path |
| ---- | ---- | ----- | --------------- |
| OQ-03 limits | DEFER(spec) | Eng lead | spec must state limits + acceptance note (log row #2) |

## 8 — Exit gate

Checklist Step 6 run 2026-07-02 — all boxes pass (no unexplained MISSING; every drop has a log row; EAR-01 dispositioned → epic backlog row in discovery; M10 answered). `gap-pass-review.md` offered — PO declined (solo dry run).
