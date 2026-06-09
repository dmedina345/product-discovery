# Requirements template (Layer 1 SSOT)

**Purpose:** Delivery-ready product contract after **gap pass** and PO approval. **Human-readable first** — dev, QA, and agents test against observable acceptance here.

**Audit trail lives elsewhere:** PO logs, coverage matrices, parity resolution history → [`gap-analysis.md`](./gap-analysis.md) (and a program-level `requirements-audit.md` when used). **Do not** embed `[FIGMA Δ]` diff blocks or gap-pass audit prose in requirements.

Copy below `--- TEMPLATE START ---` to `docs/epics/{epic}/features/{feature}/requirements.md` (or program SSOT path).

**Process:** [LetsMake Product Workflow](./letsmake-product-workflow.md) · **Discovery source:** [`discovery-template.md`](./discovery-template.md)

---

## TEMPLATE START

# Feature Requirements: [Feature Name]

**Epic:** [epic-name]  
**Feature:** [feature-slug]  
**Last updated:** YYYY-MM-DD  
**Status:** Draft | Consolidated — SSOT for product and acceptance  
**Supersedes:** [discovery.md](./discovery.md) grill capture; [handoff.md if any]  
**Gap analysis:** [gap-analysis.md](./gap-analysis.md) (audit trail — PO log, coverage, parity history)  
**Glossary:** `CONTEXT.md` (optional — program/repo-root term glossary, if your team keeps one)  
**ADR:** [links if any]

---

## Overview (read this first)

**In one sentence:** [What ships and why it matters]

**What we’re building**

- [3–6 bullets — concrete scope]

**Who it’s for:** [target users]

**Problems we’re solving**

| Today  | After this feature |
| ------ | ------------------ |
| [pain] | [outcome]          |

**Goals & success (measurable)**

| Goal                   | Metric / observable    | Target (v1) | How verified     |
| ---------------------- | ---------------------- | ----------- | ---------------- |
| [e.g. Clarity on open] | [time to first action] | [≤ 10 s]    | [QA / analytics] |

**Rollout success (if applicable):** [thresholds or N/A]

**In scope:** [bullets]

**Out of scope:** [bullets — point to other reqs/epics]

**Open decisions:** [short list — detail in Missing info & clarifications below]

**Related research:** [R-* ids or none]

---

## Feature Description

[Optional short expansion if Overview is not enough — what, why, not how]

## Problem Statement

**User voice:** [optional]

**Business / product problems:**

1. [Problem 1]

---

## Information Architecture & interaction

[Diagrams, platform matrix, interaction tables — from discovery, refined in gap pass]

---

## Stories

### Acceptance quality bar (all Must stories)

Every Must story must be **verifiable** by engineering and agents without guessing.

| Element                | Rule                                                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Gherkin THEN/AND**   | Observable outcome — what a user, tester, or agent can **see, hear, or measure** (not “works well”, “feels fast”, “is intuitive”) |
| **Definition of Done** | Concrete pass/fail checks: QA steps, automated test intent, analytics event fired, or measurable threshold                        |
| **Platform**           | Call out iOS / Android / web when behavior differs                                                                                |
| **Negative cases**     | Add AND/WHEN rows for critical failures (offline, empty, error) where user-visible                                                |

**Bad:** “THEN the experience is delightful.”  
**Good:** “THEN the feed shows 1 anchor + 4 cards within 2s of skeleton dismiss on reference device.”

### Must Have

**Story — [Category]: [Title]** · `Confirmed`

As a [user], I want [goal] so that [value].

- GIVEN [precondition]
- WHEN [action]
- THEN [observable, measurable outcome]
- AND [optional second observable]

**Acceptance criteria (summary):** [1–3 bullets — same observables as Gherkin, usable as test titles]

**Definition of Done:** [pass/fail — e.g. “Gherkin scenario passes on iOS + Android reference; event `feed_loaded` fires with `item_count`”]

---

**Story — [Category]: [Title]** · `TBC`

As a [user], I want [goal] so that [value].

- GIVEN [precondition]
- WHEN [action]
- THEN [observable outcome — use **[TBC: …]** for unset parts]

**Open:** [OQ-id or R-id from discovery]  
**Default if unresolved at spec:** [PO suggestion — not approved until AskQuestion]  
**Owner:** [PO / design / research]  
**Acceptance criteria (summary):** [verifiable parts only; mark **[TBC: …]** on unset observables]

**Definition of Done:** [what can still be verified even with TBC fields]

**TBC rules**

- Allowed only when PO explicitly accepted the gap (logged in `gap-analysis.md`).
- Every TBC links to discovery open question or research row.
- **Must** stories: no TBC on user-visible behavior at **dev handoff** without owner + resolution path.
- Use **`TBC`** markers and **Missing info & clarifications** — not inline diff/audit blocks.

### Should Have / Could Have / Won't Have

[MoSCoW sections]

---

## Non-functional requirements

[Measurable targets or N/A]

## Analytics v1

[Events + when fired, or N/A]

## Resilience & accessibility

[Scenario table or N/A with reason]

---

## Resolved decisions

| #   | Date | Topic | Decision |
| --- | ---- | ----- | -------- |

_(Major program decisions also logged in `gap-analysis.md` PO decisions log.)_

---

## Dependencies & assumptions

---

## Missing info & clarifications

Unresolved product questions, **TBC** items, and PO-pending research recommendations. **Do not** use `[FIGMA Δ]` or diff blocks here — plain tables or bullets only.

### Resolved / narrowed

| Topic   | Decision  |
| ------- | --------- |
| [topic] | [outcome] |

### Still open

| ID    | Topic      | Status                | Owner | Ref  |
| ----- | ---------- | --------------------- | ----- | ---- |
| OQ-01 | [question] | TBC · open · deferred | PO    | R-04 |

---

## Out of scope

See Won't Have. Implementation paths belong in `spec.md`.

---

## TEMPLATE END
