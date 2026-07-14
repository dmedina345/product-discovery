# Spec: Saved collections

**Epic:** library  
**Feature:** saved-collections  
**Status:** Stub — awaiting engineering  
**Last updated:** 2026-07-02  
**Requirements (SSOT):** [requirements.md](./requirements.md) — Consolidated r2  
**Dev handoff note:** [dev-handoff.md](./dev-handoff.md)  
**Design:** [design.md](./design.md)
**ADR:** none

**Conflict rule:** `requirements.md` wins on product behavior. This file wins on implementation approach.

---

## Product summary (prefilled — do not edit here)

**In one sentence:** Private collections on top of the existing one-tap save so saved recipes get cooked.

**Must stories:** Collections CRUD · Add/remove a save · Saved tab revamp · Migration.

**Won't Have (v1):** sharing · smart collections · manual reordering · web create/edit.

**Open TBC items affecting implementation:** OQ-03 collection limits — Engineering owns the spec value and acceptance note.

---

## Codebase map `[ENG]`

What exists today that this feature touches: current navigation/modules/services, key entry points, prior implementations to reuse or replace.

| Area | Current state | Touched how |
| ---- | ------------- | ----------- |
|      |               |             |

## Navigation / state model `[ENG]`

Diagram or table of states, transitions, and ownership (shell vs feature). Cover every platform in the requirements platform matrix.

## Public contracts & integration points `[ENG]`

What this feature exposes and consumes: component/module interfaces, API endpoints, events, shared state. Note backward-compatibility constraints.

## Routes, deep links & entry `[ENG]`

Map every entry path from requirements (cold start, deep links, notifications, URLs) to concrete routes per platform.

## Data & persistence `[ENG]`

Schemas, persistence keys (session state, coachmark flags), migrations, retention. Flag anything storing user data for BA/PO privacy review.

## File / module touch list `[ENG]`

| Path | Change |
| ---- | ------ |
|      |        |

## Test plan `[ENG]`

Map every requirements **Must** story to test intent — this is the test matrix the BA asked for at handoff.

| Must story | Acceptance criteria (from requirements) | Unit | Integration | E2E / manual |
| ---------- | --------------------------------------- | ---- | ----------- | ------------ |
|            |                                          |      |             |              |

Include analytics verification (events from requirements § Analytics v1) and NFR checks where measurable.

## Implementation plan `[ENG]`

| Phase | Scope | Depends on | Flag / rollout |
| ----- | ----- | ---------- | -------------- |
| 1     |       |            |                |

**Risks & rollback:** [top risks, mitigation, rollback path]

**Migration / feature flag strategy:** [or N/A]

## Out of scope for implementation

Copy of requirements Won't Have plus any implementation-only exclusions `[ENG]`.

## Clarifications needed from BA/PO `[ENG]`

| # | Question | Blocking? | Answer (dated) |
| - | -------- | --------- | -------------- |
|   |          |           |                |

_Route answers through the BA — do not fork a second requirements doc._
