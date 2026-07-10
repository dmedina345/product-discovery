---
name: which-skill-next
description: >-
  Ask which LetsMake skill or workflow step fits your situation. A router over
  the product-discovery skill pack — use when you are unsure what to run next.
disable-model-invocation: true
metadata:
  author: letsmake
  version: 2.0.0
---

# Which skill next?

**Canonical workflow:** [`letsmake-product-workflow.md`](../letsmake-product-workflow/references/letsmake-product-workflow.md) · **Cheat sheet:** [`cheat-sheet.md`](../letsmake-product-workflow/references/cheat-sheet.md)

## The main flow: idea → dev handoff

```text
intake-synthesize → grill-me (+ parallel research-spike) → gap-pass → scenario-hardening → dev-handoff
```

Engineering then owns `spec.md` and build. Do **not** skip `gap-pass` on grill- or design-led features. Keep intake → grill → gap pass in one context window when possible; start fresh at natural phase breaks.

## Pick your on-ramp

| Starting situation                                  | Run                                                                                     |
| --------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Chat paste, transcript, workshop notes, rough brief | **`intake-synthesize`**                                                                  |
| "Grill me" / stress-test a plan or concept          | **`grill-me`** (captures to `discovery.md` as it goes)                                   |
| Copy tweak, one surface, bug-level behavior         | **`small-change-requirements`**                                                          |
| Figma leads; parity before Consolidated             | Design-first path + [`figma-parity-playbook.md`](../letsmake-product-workflow/references/figma-parity-playbook.md) |
| Idea unvalidated                                    | **`research-spike`** first, then grill                                                   |
| Huge / foggy — destination not visible yet          | **`intake-synthesize`** (name the destination, sketch the fog) → **`grill-me`** breadth-first |

**No-fog exit:** if the destination is clear, open items are sharp, and small-change escalation triggers are false — route to `small-change-requirements` or a short grill → `gap-pass`. Don't force full scaffolding.

## Mid-flow

| Situation                                                    | Skill                        |
| ------------------------------------------------------------ | ---------------------------- |
| Ready to consolidate discovery → SSOT                        | **`gap-pass`**               |
| Consolidated doc needs a wave of PO updates                  | **`increment-requirements`** |
| Agent-built or failure-path-heavy; pre-handoff edge pass     | **`scenario-hardening`**     |
| Definition of Ready check + handoff package                  | **`dev-handoff`**            |
| Doc/link/ID health, contradiction flags                      | **`wiki-lint`**              |
| Orchestrate the full path                                    | **`letsmake-product-workflow`** |

## "Did we already decide / research this?"

Don't guess and don't re-run work: check `decisions.md` (PDRs, including supersede chains), `requirements.md` § Resolved decisions, and discovery research findings — plus a configured memory MCP if the workspace has one (see [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md) § Recall before rework). Cite what you find; only then launch `research-spike` or ask.
