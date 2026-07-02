# LetsMake Product Workflow docs

**LetsMake Product Workflow** — program-agnostic BA/PO process before engineering owns `spec.md`.

Complements make-harness **three-layer model** (`brief.md` → `requirements.md` → `spec.md`) with **discovery**, **grill**, **parallel research**, **gap pass**, and **dev handoff**.

**Start here:** [cheat-sheet.md](./cheat-sheet.md) · [letsmake-product-workflow.md](./letsmake-product-workflow.md)

| Document                                                                 | Use when                                                           | Typical output location                          |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------ | ------------------------------------------------ |
| [cheat-sheet.md](./cheat-sheet.md)                                       | Quick reference across chats                                       | —                                                |
| [letsmake-product-workflow.md](./letsmake-product-workflow.md)           | New or changed features (medium/large scope)                       | Epic feature folder                              |
| [letsmake-conventions.md](./letsmake-conventions.md)                     | Shared rules skills enforce (PO-gated, auto-launch, anti-patterns) | Referenced by skills                             |
| [canvas-authoring.md](./canvas-authoring.md)                             | Fix empty/malformed research canvases                              | Playbook only                                    |
| [discovery-template.md](./discovery-template.md)                         | Living explore doc (grill, research, design)                       | `discovery.md`                                   |
| [requirements-template.md](./requirements-template.md)                   | Consolidated SSOT after gap pass                                   | `requirements.md`                                |
| [figma-parity-playbook.md](./figma-parity-playbook.md)                   | Design-first; Figma dev comments                                   | Parity docs + discovery                          |
| [research-deliverables-playbook.md](./research-deliverables-playbook.md) | Find & review research canvases                                    | [`canvas-index.md`](../research/canvas-index.md) |
| [grill-learnings.md](./grill-learnings.md)                               | Grilling a navigation/IA-heavy feature                             | Playbook only                                    |
| [handoff-template.md](./handoff-template.md)                             | Legacy optional capture                                            | `handoff.md` (prefer discovery)                  |
| [small-change-process.md](./small-change-process.md)                     | Tweaks, copy, single-surface behavior                              | `docs/changes/` or requirements patch            |
| [gap-pass-checklist.md](./gap-pass-checklist.md)                         | Gap pass (PO in the loop)                                          | `gap-analysis.md`                                |
| [gap-pass-review.md](./gap-pass-review.md)                               | PO sign-off before Consolidated                                    | Red-flag checklist                               |

## Artifact map

```text
discovery.md       Living — brief, grill, research, design, prototypes
discovery.md § Context inbox   Raw inputs → decision / OQ / R-* / EAR-* / archive
discovery.md § Agent context map   Phase + read-first docs + authority order
discovery.md § Artifact eval log   pass / needs PO / needs cleanup
gap-analysis.md    Audit — matrices, PO log (not in requirements)
requirements.md  SSOT — Consolidated (TBC stories allowed with owners)
docs/research/canvas-index.md   All research/gap/architecture canvas links (git-tracked bookmark)
{feature}/research/R-*.md       Optional markdown digest for deep spikes
design.md          Journeys, screens
spec.md            Engineering (after dev handoff gate)
brief.md           Optional harness Layer 0.5
handoff.md         Legacy optional
```

## Agent skills

[`skills/`](../skills/README.md) · symlinks in [`.cursor/skills/`](../.cursor/skills/)

| Skill                           | Trigger                                                 |
| ------------------------------- | ------------------------------------------------------- |
| `intake-synthesize`             | Transcript, chat paste, kickoff                         |
| `grill-me`                      | "grill me", stress-test design                          |
| `research-spike`                | R-\* research; Figma / YouTube (parallel default)       |
| `grill-to-handoff`              | Capture grill → discovery.md                            |
| `gap-pass`                      | Consolidate to requirements                             |
| `increment-requirements`        | Refine a Consolidated `requirements.md` (PDRs + rules)  |
| **`letsmake-product-workflow`** | Full path orchestration — **LetsMake Product Workflow** |
| `small-change-requirements`     | Narrow change                                           |

## Conflict rule

**`requirements.md` (Consolidated)** wins over `discovery.md` grill capture, `handoff.md`, grill-me exports, or narrative PRDs.

## Locked defaults (Jun 2026)

- Research: **parallel by default** unless user says wait/sequential
- Research: user **prompt/context** required; one AskQuestion if thin
- Research canvases: index at [`docs/research/canvas-index.md`](../research/canvas-index.md); canonical path only (see research-deliverables-playbook)
- Product decisions: **AskQuestion** one-at-a-time (TBC / defer allowed)
- Raw inputs: capture in **Context inbox** first; never merge raw input straight to requirements
- Artifact eval: `needs PO` must become AskQuestion / OQ / TBC with owner
