# Gap analysis: Saved collections

**Epic:** library  
**Feature:** saved-collections  
**Status:** PO approved — merged into requirements.md  
**Last updated:** 2026-07-02  
**Authority mode:** simulated-po
**Requirements:** [requirements.md](./requirements.md) · **Discovery:** [discovery.md](./discovery.md)

> Evaluation-only example: M9 and M10 are separate stable approval records.

---

## 1 — Inventory (sources read)

| Source | Path | Read | Notes |
| ------ | ---- | ---- | ----- |
| Discovery (primary) | ./discovery.md | [x] | grill capture complete, eval pass |
| Brief | ./brief.md | [x] | N/A — brief lives in discovery § Brief summary |
| Design | ./design.md | [x] | N/A — design pass follows gap pass (D-note) |
| Decisions | ./decisions.md | [x] | none yet — created in Phase B |
| Prior SSOT candidates | docs/epics/library/features/*/ | [x] | none — first feature in epic |
| ADR / glossary | docs/adr/, CONTEXT.md | [x] | none exist |

**Research rows pending:** none (R-01 done; proposals dispositioned D2–D4, D6)

## 2 — Prior doc decision (M2)

**Asked:** 2026-07-02 · **PO answer:** skip — first feature in the epic, no prior SSOT discovered (`GP-GAP-001`)

## 3 — Coverage matrix

| ID | Topic | Source says | Draft requirements say | Verdict | PO ref |
| -- | ----- | ----------- | ---------------------- | ------- | ------ |
| SC-1 | Problem matches brief | brief in discovery | matches | CARRIED | — |
| SC-2 | Every brief Must has a story | 3 Musts | 4 stories (incl. migration) | CARRIED | — |
| SC-3 | Brief Won't Have carried | 3 items | Won't Have section | CARRIED | `GP-DROP-001`–`003` |
| SC-4 | v1 boundary explicit | solution summary | Overview in/out | CARRIED | — |
| SC-5 | Dependencies listed | saves-service assumption | Dependencies section | CARRIED | — |
| PL-1/2 | iOS/Android behavior | platform matrix | carried + long-press quick-add | CARRIED | — |
| PL-3 | Web behavior | read-only (D8) | carried | CARRIED | `GP-DROP-004` |
| PL-4 | Parity statement | matrix notes | added explicit statement | CARRIED | — |
| PL-5 | System back (Android) | sheet closes on back | carried into story AC | CARRIED | — |
| EN-1 | Cold start | Saved tab unchanged entry | carried | CARRIED | — |
| EN-2 | Deep links / notifications | **silent in grill** | **MISSING → asked** | ASK PO | `GP-GAP-003` |
| EN-3 | Entry doesn't change defaults | n/a | N/A | N/A | — |
| EN-4 | Web routing | **silent in grill** | **MISSING → asked** | ASK PO | `GP-GAP-003` |
| RS-1 | Primary action never blocked | save unchanged | carried (save never blocked by collection failures) | CARRIED | — |
| RS-2 | Offline behavior | **silent in grill** | **MISSING → asked** | ASK PO | `GP-GAP-004` |
| RS-3 | Empty/error states | empty-state row in IA | carried + error toast AC | CARRIED | — |
| RS-4 | Rapid repeat actions | — | debounce picker add/remove; last-wins | CARRIED | — |
| RS-5 | Session vs cold start | — | N/A (no session state) | N/A | — |
| A11Y-1 | Non-gesture path | long-press is a shortcut only | ⋯ menu covers all actions | CARRIED | — |
| A11Y-2 | Announcements | — | DEFER(spec) with acceptance note | DEFER(spec) | `GP-GAP-002` |
| A11Y-3 | Reduced motion | — | N/A (no new motion) | N/A | `GP-GAP-002` |
| A11Y-4 | Web focus/escape | read-only web | N/A v1 | N/A | `GP-GAP-002` |
| L10N-1 | Localization | — | new strings localized; collection names = user content | CARRIED | — |
| MG-1 | Existing-user migration | D7 | carried (Must story) | CARRIED | — |
| MG-2 | Coachmark dismiss rules | D7 single dismissible | carried into AC | CARRIED | — |
| MG-3 | Tap-first discovery | long-press optional | carried | CARRIED | — |
| XG-1 | Named dependencies | saves service | carried | CARRIED | — |
| XG-2 | Shared shell interaction | none | N/A | N/A | — |
| AC-1..5 | Overview/Gherkin/AC/DoD/Missing-info | — | verified in requirements draft | CARRIED | — |
| NF-1 | Performance targets | — | picker open < 300ms reference device | CARRIED | — |
| NF-2 | Memory/lifecycle | — | DEFER(spec) | DEFER(spec) | `GP-GAP-002` |
| NF-3 | Analytics v1 | OQ-04 | events defined (§ Analytics) | CARRIED | — |
| NF-4 | Rollout success | goals draft | carried into Overview | CARRIED | — |
| PR-1 | PII in analytics/storage | — | collection names = user content: excluded from events; retention = account lifetime | CARRIED | — |
| PR-2 | Security/permissions | — | N/A (no auth surface change) | N/A | `GP-GAP-002` |
| NG-1 | Do-not-ship rules | Won't Have drafts | carried | CARRIED | — |
| NG-2 | Prior-SSOT drops | none | N/A (no prior) | N/A | `GP-GAP-001` |
| DOM-01 | Delete collection keeps saves | grill UX principle | Must story AC | CARRIED | — |
| DOM-02 | Limits (OQ-03) | open | DEFER(spec) with acceptance note | DEFER(spec) | `GP-GAP-002` |

## 4 — Scope drop candidates

| Decision ID | Capability | Source of the drop | Risk class | PO disposition |
| ----------- | ---------- | ------------------ | ---------- | -------------- |
| GP-DROP-001 | Shareable/collaborative collections | marketing ask + D6 draft | high | Won't Have v1; revisit post-launch |
| GP-DROP-002 | Smart/auto collections | grill Won't draft | low | Won't Have v1 |
| GP-DROP-003 | Manual reordering | grill Won't draft | low | Won't Have v1 |
| GP-DROP-004 | Web create/edit | D8 draft | low | Won't Have v1; web read-only |

## 5 — Regression diff

N/A — no prior SSOT (`GP-GAP-001`).

## 6 — Atomic PO decisions

| ID | Date | Type | Capability / question | Options offered | PO answer | Source refs | Carried into | PDR |
| -- | ---- | ---- | --------------------- | --------------- | --------- | ----------- | ------------ | --- |
| GP-GAP-001 | 2026-07-02 | M2 | Prior-doc comparison | compare / skip | skip — first feature | inventory | regression N/A | — |
| GP-GAP-002 | 2026-07-02 | M7 | Deferrals/N/A batch | per-item / accept all | atomic items accepted as recommended | coverage rows | matrix | — |
| GP-DROP-001 | 2026-07-02 | M1 | Sharing | Must / Won't / later | Won't v1; revisit | D6/R-01 | Won't Have | PDR-LIB-001 |
| GP-DROP-002 | 2026-07-02 | M1 | Smart collections | Must / Won't / later | Won't v1 | grill | Won't Have | — |
| GP-DROP-003 | 2026-07-02 | M1 | Manual reordering | Must / Won't / later | Won't v1 | grill | Won't Have | — |
| GP-DROP-004 | 2026-07-02 | M1 | Web create/edit | Must / Won't / later | Won't v1; read-only web | D8 | Won't Have | — |
| GP-GAP-003 | 2026-07-02 | M7 | Web routes | routes / no routes / defer | `/saved`, `/saved/collections/{id}` | EN-2/4 | IA/stories | — |
| GP-GAP-004 | 2026-07-02 | M7 | Offline CRUD | queue / online-only / TBC | online-only; toast + retry | RS-2 | resilience | PDR-LIB-002 |
| GP-RESEARCH-001 | 2026-07-02 | research | Default All saves pool | adopt / reject / defer | adopt evaluation-only | R-01 proposal 1 | IA and requirements | — |
| GP-RESEARCH-002 | 2026-07-02 | research | Multi-collection membership | adopt / reject / defer | adopt evaluation-only | R-01 proposal 2 | requirements Must | — |
| GP-RESEARCH-003 | 2026-07-02 | research | Scalable collection picker | adopt / reject / defer | adopt evaluation-only | R-01 proposal 3 | picker behavior | PDR-LIB-003 |
| GP-RESEARCH-004 | 2026-07-02 | research | Private-only v1 | adopt / reject / defer | adopt evaluation-only | R-01 proposal 4 | Won't Have | PDR-LIB-001 |
| GP-APPROVAL-M9 | 2026-07-02 | M9 | Authorize Draft? | proceed / hold | proceed evaluation-only | completed questions | requirements Draft | — |
| GP-APPROVAL-M10 | 2026-07-02 | M10 | Approve reviewed Draft? | approve / revise | approve evaluation-only | Draft review | Consolidated | — |

## 7 — Blocking items

| Item | Type | Owner | Resolution path |
| ---- | ---- | ----- | --------------- |
| OQ-03 limits | DEFER(spec) | Eng lead | spec must state limits + acceptance note (`GP-GAP-002`) |

## 8 — Exit gate

Checklist Step 6 + validator run 2026-07-02 — pass; M9 preceded Draft and reviewed Draft preceded evaluation-only M10.
