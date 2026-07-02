# Feature Requirements: Saved collections

**Epic:** library  
**Feature:** saved-collections  
**Last updated:** 2026-07-02  
**Doc revision:** r2 (see Changelog)  
**Status:** Consolidated — SSOT for product and acceptance  
**Supersedes:** [discovery.md](./discovery.md) grill capture  
**Gap analysis:** [gap-analysis.md](./gap-analysis.md) (audit trail — PO log, coverage)  
**Decisions:** [decisions.md](./decisions.md) (PDR log)  
**Glossary:** none kept  
**ADR:** none

---

## Overview (read this first)

**In one sentence:** Add private collections on top of the existing one-tap save so saved recipes actually get cooked.

**What we're building**

- Automatic **All saves** pool (existing behavior, unchanged) + optional **collections** a save can belong to (0..n)
- Collection create/rename/delete; add/remove saves via a recents-first picker (search at > 8 collections — PDR-LIB-003)
- Revamped **Saved tab**: collections grid on top, All saves list beneath
- Zero-friction migration: existing saves are the All saves pool; one dismissible coachmark

**Who it's for:** Home cooks who save 10+ recipes.

**Problems we're solving**

| Today                                          | After this feature                          |
| ---------------------------------------------- | -------------------------------------------- |
| 40% of saves never revisited; flat endless list | Saves organized by intent; findable at cook time |
| Users screenshot recipes instead of saving     | Saved tab is the trusted place to return to |

**Goals & success (measurable)**

| Goal                        | Metric / observable                   | Target (v1)     | How verified |
| --------------------------- | -------------------------------------- | --------------- | ------------ |
| Saves get revisited         | % saves reopened within 30 days        | 40% → 55%       | analytics    |
| Collections adopted         | % saving users with ≥1 collection      | ≥ 30% by day 60 | analytics    |
| Save flow not degraded      | Saves per WAU                          | decline < 5%    | analytics    |

**Rollout success:** staged rollout 10% → 100%; halt if saves/WAU declines > 5% or crash rate rises.

**In scope:** collections CRUD, picker, Saved tab revamp, migration coachmark, read-only web views.

**Out of scope:** mirrors Won't Have below — sharing, smart collections, reordering, web create/edit.

**Open decisions:** OQ-03 limits — deferred to spec with acceptance note (see Missing info).

**Related research:** R-01 (comparables — Instagram model adopted, PDR-LIB-001 context).

---

## Problem Statement

**User voice:** "I save recipes all week but when it's time to cook I can never find them — so I screenshot instead."

**Business / product problems:**

1. 40% of saves are never revisited within 30 days (Jun 2026 analytics)
2. Screenshotting bypasses the app at the highest-intent moment

---

## Information Architecture & interaction

```text
Saved (tab)
├── Collections (grid, alphabetical; "+ New" tile first)
│   └── Collection detail (recipe list; rename/delete in ⋯ menu)
└── All saves (reverse-chron list — unchanged)
```

| Platform | Collections CRUD | Picker sheet | Notes                                        |
| -------- | ---------------- | ------------ | --------------------------------------------- |
| iOS      | yes              | yes          | long-press save = quick-add (shortcut only)   |
| Android  | yes              | yes          | system back closes sheet                      |
| Web      | read + open      | no           | routes `/saved`, `/saved/collections/{id}`    |

**Parity statement:** identical model and ordering on all platforms; web is read-only in v1 (PO log #6); no new push/deep-link entry points in v1 (PO log #7).

---

## Stories

### Must Have

**Story — Collections: Create, rename, delete** · `Confirmed`

As a saver, I want to create and manage collections so that my saves are grouped by intent.

- GIVEN the Saved tab WHEN I tap the "+ New" tile and enter a name THEN a collection appears first in the grid and in the picker recents
- GIVEN a collection detail WHEN I choose Delete and confirm THEN the collection disappears AND every recipe in it remains in All saves

**Acceptance criteria (summary):** create from tab and picker; rename/delete from detail ⋯ menu; delete never removes saves.

**Definition of Done:** Gherkin passes on iOS + Android reference devices; `collection_created` / `collection_deleted` events fire with `collection_count`.

---

**Story — Collections: Add / remove a save** · `Confirmed`

As a saver, I want to file a save into collections so that I can find it at cook time.

- GIVEN I have just saved a recipe WHEN the post-save toast appears and I tap "Add to collection" THEN the picker opens with most-recently-used collections first
- GIVEN more than 8 collections WHEN the picker opens THEN a search field is present (PDR-LIB-003)
- GIVEN a recipe in two collections WHEN I remove it from one THEN it remains in the other AND in All saves
- GIVEN the device is offline WHEN I try to add/remove THEN an error toast with Retry appears AND the save itself is unaffected (PDR-LIB-002)

**Acceptance criteria (summary):** post-save toast entry; recents-first picker; search > 8; multi-membership; offline = toast + retry, never blocks saving.

**Definition of Done:** Gherkin passes both platforms; rapid add/remove is debounced last-wins; `save_added_to_collection` fires with `picker_source`.

---

**Story — Saved tab revamp** · `Confirmed`

As a saver, I want collections above my flat list so that organization is visible without losing the old behavior.

- GIVEN I open Saved WHEN I have collections THEN the grid renders above All saves AND All saves is reachable in one scroll
- GIVEN no collections WHEN I open Saved THEN a one-row empty state introduces collections AND the All saves list is not pushed below the fold
- GIVEN the picker or grid WHEN measured on a reference device THEN the picker opens in < 300 ms

**Acceptance criteria (summary):** grid above list; list unchanged; empty state non-blocking; picker < 300 ms.

**Definition of Done:** layout verified both platforms + web read-only routes; perf measured on reference device.

---

**Story — Migration: existing savers** · `TBC`

As an existing saver, I want my saves untouched so that the update never costs me anything.

- GIVEN I update the app WHEN I open Saved THEN all prior saves appear in All saves in their existing order
- GIVEN my first visit after update WHEN the coachmark appears THEN it is dismissible in one tap AND never reappears after dismissal
- THEN the coachmark copy reads **[TBC: final copy]**

**Open:** coachmark copy — design pass  
**Default if unresolved at spec:** "New: group saves into collections — tap + to start."  
**Owner:** Design  
**Acceptance criteria (summary):** zero data migration visible to user; coachmark once, dismissible; copy per design pass (default above).

**Definition of Done:** upgrade test from previous app version shows identical All saves list; coachmark dismissal persisted across cold starts.

### Should Have

- Suggested collection names on create (e.g. "Weeknight", "Baking") — static list, no personalization
- Collection cover image = latest recipe photo

### Won't Have (v1)

- Shareable / collaborative collections — PO log #3, **PDR-LIB-001** (revisit post-launch with adoption data)
- Smart/auto collections — PO log #4
- Manual reordering (alphabetical/recency only) — PO log #5
- Web create/edit (read-only web) — PO log #6

---

## Non-functional requirements

- Picker opens < 300 ms on reference devices; Saved tab initial render unaffected (± 10%) by up to 50 collections
- Collection limits: deferred to spec — spec must state max collections/user and recipes/collection with an acceptance note (PO log #2, OQ-03)

## Analytics v1

| Event                      | Fired when                      | Key properties                    |
| -------------------------- | -------------------------------- | ---------------------------------- |
| `collection_created`       | create confirmed                 | `collection_count`, `source`       |
| `collection_deleted`       | delete confirmed                 | `recipe_count`                     |
| `save_added_to_collection` | picker add confirmed             | `picker_source`, `collection_count` |
| `saved_tab_viewed`         | tab focus                        | `has_collections`                  |

**Privacy (PR-1):** collection names are user content — never sent as event properties; retained for account lifetime, deleted with account.

## Resilience & accessibility

| Scenario                    | Behavior                                                        |
| --------------------------- | ---------------------------------------------------------------- |
| Offline CRUD                | Error toast + Retry; the save itself never blocked (PDR-LIB-002) |
| Rapid add/remove            | Debounced, last-wins                                             |
| Empty / error states        | One-row empty state; per-area error, list never blanks           |
| Non-gesture path            | Every long-press action also reachable via ⋯ menu                |
| SR announcements            | Deferred to spec with acceptance note (PO log #2)                |

---

## Resolved decisions

| #  | Date       | Topic        | Decision                                             | PDR         |
| -- | ---------- | ------------ | ----------------------------------------------------- | ----------- |
| D1 | 2026-07-02 | Save gesture | One-tap heart unchanged; organization optional        | —           |
| D2 | 2026-07-02 | IA model     | All saves pool + optional collections (R-01)          | —           |
| D3 | 2026-07-02 | Membership   | 0..n collections per save                             | —           |
| D6 | 2026-07-02 | Sharing      | Private-only v1                                       | PDR-LIB-001 |
| D8+#7 | 2026-07-02 | Web       | Read-only; routes `/saved`, `/saved/collections/{id}` | —           |
| #8 | 2026-07-02 | Offline      | Online-only CRUD v1; toast + retry                    | PDR-LIB-002 |

_(Full session log: gap-analysis.md § 6. Post-Consolidated decisions: decisions.md.)_

---

## Dependencies & assumptions

- Saves service supports many-to-many labels (eng to confirm at spec — flag immediately if not)
- No design file yet; design pass is visual polish only (no new behavior)

---

## Missing info & clarifications

### Resolved / narrowed

| Topic      | Decision                                  |
| ---------- | ----------------------------------------- |
| Sharing    | Won't Have v1 (PDR-LIB-001)               |
| Offline    | Online-only CRUD, toast + retry (PDR-LIB-002) |
| Web routes | `/saved`, `/saved/collections/{id}` (PO log #7) |

### Still open

| ID    | Topic          | Status      | Owner    | Ref          |
| ----- | -------------- | ----------- | -------- | ------------ |
| OQ-03 | Limits         | DEFER(spec) | Eng lead | PO log #2    |
| TBC   | Coachmark copy | TBC         | Design   | Migration story |

---

## Out of scope

See Won't Have. Implementation paths belong in `spec.md`.

---

## Changelog

| Date       | Rev | Summary                                                        | PDR refs                 |
| ---------- | --- | --------------------------------------------------------------- | ------------------------ |
| 2026-07-02 | r1  | Consolidated after gap pass (M10)                               | PDR-LIB-001, PDR-LIB-002 |
| 2026-07-02 | r2  | Increment: picker threshold 6→8; Should→Must cover images reversed; offline copy clarified | PDR-LIB-003, PDR-LIB-004 |
