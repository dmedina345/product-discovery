---
name: intake-synthesize
description: >-
  Turn a brief, chat paste, transcript, or workshop notes into discovery.md
  sections and recommend a workflow track. Use at feature kickoff, before grill,
  or when the user dumps a pile of context.
metadata:
  author: letsmake
  version: 1.3.0
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`).  
**AskQuestion fallback:** if the AskQuestion tool is unavailable in this mode/agent, ask the same single question in plain chat and wait.

# Intake synthesize

Bootstrap **`discovery.md`** from unstructured input. Recommend track; do **not** write Consolidated requirements.

**Template:** [`discovery-template.md`](../letsmake-product-workflow/references/discovery-template.md)

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

1. **Name the destination** — AskQuestion once if unclear: what artifact marks done for this effort? (Consolidated `requirements.md` · locked PDR set · design parity sign-off · spike kill/adopt decision). Write `discovery.md` § **Destination** + **Notes**.
2. **Read** the workspace `docs/lessons-learned.md` + scan related epic folders for prior SSOT (do not assume slug). Query **OKF Brain** (`ask` on `user-okf-brain` MCP) for prior decisions/research on this topic before re-inventing context.
3. **Confirm** epic/feature slug; scaffold the feature folder (see [paths.md](../letsmake-product-workflow/references/paths.md)) if missing.
4. **Create/update** `discovery.md` from template:
   - Agent context map (current phase, read-first docs, authority order)
   - **Not yet specified** and **Out of scope** (honest first sketch — fog is allowed)
   - Context inbox rows for raw inputs that are not yet synthesized
   - Brief summary (MoSCoW bullets)
   - Problem / solution draft if inferable
   - Open questions table (honest)
   - Research backlog rows for obvious `R-*` needs — **auto-launch `research-spike`** when prompt is sufficient; if thin, one AskQuestion for prompt then launch
   - **Lessons applied** if relevant
5. **Triage context inbox** rows you can safely route:
   - PO decision needed → `OQ-*` or AskQuestion recommendation
   - Research needed → draft `R-*` row and **auto-launch** unless user deferred research
   - Adjacent idea → `EAR-*`
   - Useful but not actionable → archived reference
   - Beyond destination → **Out of scope** (not an OQ)
6. **No-fog early exit** — if input is narrow (single surface, copy tweak, one API field) and [`small-change-process.md`](../letsmake-product-workflow/references/small-change-process.md) escalation triggers are all false, recommend **`small-change-requirements`** instead of full discovery scaffolding. AskQuestion to confirm.
7. **Run discovery eval** and log `pass`, `needs PO`, or `needs cleanup` in `discovery.md` § Artifact eval log.
8. **Track recommendation** (tell user):

| Track            | When                                                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Small change** | [`small-change-process.md`](../letsmake-product-workflow/references/small-change-process.md) escalation triggers all false |
| **Design-first** | Figma/mockups lead; set Status Design-led                                                                                  |
| **Standard**     | brief + grill-me → gap pass                                                                                                |
| **Spike-only**   | Idea unvalidated; **auto-launch** desk/video research, then grill when findings land                                       |

9. **Design-first:** note Figma URLs in discovery; point to [`figma-parity-playbook.md`](../letsmake-product-workflow/references/figma-parity-playbook.md).
10. **Next step:** `grill-me` (standard) or **`research-spike`** auto-launched for spike-only / obvious R-\* (parallel), or `gap-pass` (if design-led + reqs draft exists), or **`small-change-requirements`** (no-fog exit).

---

## AskQuestion (if unclear)

One question max before writing:

- Epic/feature slug missing
- Cannot choose track (small vs full vs design-first)

---

## Anti-patterns

PO-gated rules (no writing `requirements.md` from intake; raw inbox rows aren't facts; auto-launch is approval-free) live in [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md). Intake-specific:

- Skipping the open-questions table
- Skipping **Destination** (scope drift follows)
- Ignoring prior SSOT in the same epic
- Skipping artifact eval before recommending the next phase

---

## Outputs

| File           | Action                                                      |
| -------------- | ----------------------------------------------------------- |
| `discovery.md` | Create or merge sections (preserve existing grill/research) |
| `brief.md`     | Optional — update its summary if the feature keeps one      |
