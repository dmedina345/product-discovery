---
name: intake-synthesize
description: >-
  Turn a brief, chat paste, transcript, or workshop notes into discovery.md
  sections and recommend a workflow track. Use at feature kickoff, before grill,
  or when the user dumps a pile of context.
---

# Intake synthesize

Bootstrap **`discovery.md`** from unstructured input. Recommend track; do **not** write Consolidated requirements.

**Template:** [`discovery-template.md`](../../docs/product/discovery-template.md)

---

## When to use

- User pastes chat export, transcript, workshop notes, or rough brief
- New feature kickoff before grill
- User asks "where do I start?" with a pile of context

## When NOT to use

- Gap pass or Consolidated requirements → `gap-pass`
- Live grilling → `grill-me`
- Small change already scoped → `small-change-requirements`

---

## Procedure

1. **Read** [`docs/lessons-learned.md`](../../docs/lessons-learned.md) + scan related epic folders for prior SSOT (do not assume slug).
2. **Confirm** epic/feature slug; `scaffold-feature` if folder missing.
3. **Create/update** `discovery.md` from template:
   - Agent context map (current phase, read-first docs, authority order)
   - Context inbox rows for raw inputs that are not yet synthesized
   - Brief summary (MoSCoW bullets)
   - Problem / solution draft if inferable
   - Open questions table (honest)
   - Research backlog rows for obvious `R-*` needs — **auto-launch `research-spike`** when prompt is sufficient; if thin, one AskQuestion for prompt then launch
   - **Lessons applied** if relevant
4. **Triage context inbox** rows you can safely route:
   - PO decision needed → `OQ-*` or AskQuestion recommendation
   - Research needed → draft `R-*` row and **auto-launch** unless user deferred research
   - Adjacent idea → `EAR-*`
   - Useful but not actionable → archived reference
5. **Run discovery eval** and log `pass`, `needs PO`, or `needs cleanup` in `discovery.md` § Artifact eval log.
6. **Track recommendation** (tell user):

| Track            | When                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------- |
| **Small change** | [`small-change-process.md`](../../docs/product/small-change-process.md) escalation triggers all false |
| **Design-first** | Figma/mockups lead; set Status Design-led                                                             |
| **Standard**     | brief + grill-me → gap pass                                                                           |
| **Spike-only**   | Idea unvalidated; **auto-launch** desk/video research, then grill when findings land                  |

7. **Design-first:** note Figma URLs in discovery; point to [`figma-parity-playbook.md`](../../docs/product/figma-parity-playbook.md).
8. **Next step:** `grill-me` (standard) or **`research-spike`** auto-launched for spike-only / obvious R-\* (parallel), or `gap-pass` (if design-led + reqs draft exists).

---

## AskQuestion (if unclear)

One question max before writing:

- Epic/feature slug missing
- Cannot choose track (small vs full vs design-first)

---

## Anti-patterns

PO-gated rules (no writing `requirements.md` from intake; raw inbox rows aren't facts; auto-launch is approval-free) live in [`letsmake-conventions.md`](../../docs/product/letsmake-conventions.md). Intake-specific:

- Skipping the open-questions table
- Ignoring prior SSOT in the same epic
- Skipping artifact eval before recommending the next phase

---

## Outputs

| File           | Action                                                      |
| -------------- | ----------------------------------------------------------- |
| `discovery.md` | Create or merge sections (preserve existing grill/research) |
| `brief.md`     | Update summary if aligned with harness brief template       |
