# Spec template (Layer 2 — engineering-owned)

**Purpose:** Technical contract connecting approved `requirements.md` to the existing codebase. The **`dev-handoff`** skill seeds this stub with the product sections prefilled; **engineering fills every section marked `[ENG]`** and owns the file from then on.

**Do not** restate product behavior here — link to `requirements.md` (the SSOT). If a product rule is missing or ambiguous, raise it with the BA/PO; do not decide it in spec.

Copy below `--- TEMPLATE START ---` to `docs/epics/{epic}/features/{feature}/spec.md`.

**Process:** [LetsMake Product Workflow](./letsmake-product-workflow.md) Phase 5 · **Source:** [`requirements-template.md`](./requirements-template.md)

---

## TEMPLATE START

# Spec: [Feature Name]

**Epic:** [epic-slug]  
**Feature:** [feature-slug]  
**Status:** Stub — awaiting engineering | In progress | Approved for build  
**Last updated:** YYYY-MM-DD  
**Requirements (SSOT):** [requirements.md](./requirements.md) — status must be **Consolidated**  
**Dev handoff note:** [dev-handoff.md](./dev-handoff.md)  
**Design:** [design.md](./design.md)  
**ADR:** [links if any]

**Conflict rule:** `requirements.md` wins on product behavior. This file wins on implementation approach.

---

## Product summary (prefilled — do not edit here)

**In one sentence:** [copy from requirements Overview]

**Must stories:** [list story titles only — link to requirements § Stories]

**Won't Have (v1):** [copy titles from requirements — these are also out of scope for implementation]

**Open TBC items affecting implementation:** [from requirements § Missing info & clarifications, with owners — or none]

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

---

## TEMPLATE END
