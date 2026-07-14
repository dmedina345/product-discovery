# LetsMake Product Workflow docs

**LetsMake Product Workflow** — program-agnostic BA/PO process before engineering owns `spec.md`.

Built on a **three-layer document model** (`brief.md` → `requirements.md` → `spec.md`) plus **discovery**, **grill**, **parallel research**, **gap pass**, and **dev handoff**.

**Start here:** [cheat-sheet.md](./cheat-sheet.md) · [letsmake-product-workflow.md](./letsmake-product-workflow.md) · [letsmake-conventions.md](./letsmake-conventions.md)

| Document                                                                 | Use when                                                          | Typical output location               |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------- |
| [cheat-sheet.md](./cheat-sheet.md)                                       | Quick reference across chats                                      | —                                     |
| [letsmake-product-workflow.md](./letsmake-product-workflow.md)           | New or changed features (medium/large scope)                      | Epic feature folder                   |
| [letsmake-conventions.md](./letsmake-conventions.md)                     | Shared rules skills enforce (PO-gated, auto-launch, recall)       | Referenced by skills                  |
| [paths.md](./paths.md)                                                   | Path/config resolution; folder layouts; canvas dir                | Referenced by skills                  |
| [discovery-template.md](./discovery-template.md)                         | Living explore doc (grill, research, design)                      | `discovery.md`                        |
| [requirements-template.md](./requirements-template.md)                   | Consolidated SSOT after gap pass                                  | `requirements.md`                     |
| [gap-analysis-template.md](./gap-analysis-template.md)                   | Gap pass audit file structure                                     | `gap-analysis.md`                     |
| [decision-records.md](./decision-records.md)                             | Stable atomic `GP-*` decision IDs and batch UX rules              | `gap-analysis.md`, requirements refs  |
| [workflow-state-machine.md](./workflow-state-machine.md)                 | Canonical states, gates, statuses, authority modes                 | all phases                            |
| [workflow-events.md](./workflow-events.md)                               | Append-only transition evidence and evaluator artifact rules       | `workflow-events.jsonl`               |
| [evaluation-contract.md](./evaluation-contract.md)                       | Fresh-evaluator output, retry, and fallback contract               | M10/eval gates                        |
| [dev-handoff-template.md](./dev-handoff-template.md)                     | Prepared-versus-Accepted Engineering package                      | `dev-handoff.md`                      |
| [gap-pass-checklist.md](./gap-pass-checklist.md)                         | Gap pass coverage rows + question queue                           | `gap-analysis.md`                     |
| [gap-pass-review.md](./gap-pass-review.md)                               | PO sign-off before Consolidated                                   | Red-flag checklist                    |
| [decision-log-template.md](./decision-log-template.md)                   | PDR log (append-only; supersede, never edit)                      | `decisions.md`                        |
| [scenario-matrix-template.md](./scenario-matrix-template.md)             | Agent-readiness edge-case pass before dev handoff                 | `scenario-matrix.md`                  |
| [spec-template.md](./spec-template.md)                                   | Engineering spec stub (dev handoff seeds it)                      | `spec.md`                             |
| [figma-parity-playbook.md](./figma-parity-playbook.md)                   | Design-first; Figma dev comments                                  | Parity docs + discovery               |
| [canvas-authoring.md](./canvas-authoring.md)                             | Fix empty/malformed research canvases                             | Playbook only                         |
| [research-deliverables-playbook.md](./research-deliverables-playbook.md) | Find & review research canvases                                   | `{researchIndexPath}` canvas index    |
| [small-change-process.md](./small-change-process.md)                     | Tweaks, copy, single-surface behavior                             | `docs/changes/` or requirements patch |

## Artifact map

```text
discovery.md       Living — destination, brief, fog, grill capture, research findings
gap-analysis.md    Audit — coverage, scope drops, PO decisions log (not in requirements)
requirements.md    SSOT — Consolidated (TBC stories allowed with owners)
decisions.md       PDR log — append-only; supersede, never edit
scenario-matrix.md Pre-handoff edge-case audit
dev-handoff.md     Phase 4 package note (dev-handoff skill)
spec.md            Engineering — stub at handoff; eng fills [ENG] sections
design.md          Journeys, screens
brief.md           Optional intent summary
{researchIndexPath}        Canvas bookmark table (git-tracked)
{feature}/research/R-*.md  Optional markdown digest for deep spikes
```

## Agent skills

| Skill                           | Trigger                                                  |
| ------------------------------- | -------------------------------------------------------- |
| **`which-skill-next`**          | Unsure which skill or phase to run                       |
| `intake-synthesize`             | Transcript, chat paste, kickoff                          |
| `grill-me`                      | "grill me", stress-test a concept — captures as it goes  |
| `research-spike`                | R-\* research; Figma / YouTube / Loom (parallel default) |
| `gap-pass`                      | Consolidate to requirements                              |
| `increment-requirements`        | Change control on a Consolidated `requirements.md`       |
| `scenario-hardening`            | Agent-readiness edge-case pass before dev handoff        |
| `dev-handoff`                   | DoR check + handoff note + `spec.md` stub                |
| `wiki-lint`                     | Doc/link/ID health; contradiction flags                  |
| **`letsmake-product-workflow`** | Full path orchestration                                  |
| `small-change-requirements`     | Narrow change                                            |

## Conflict rule

**`requirements.md` (Consolidated)** wins over `decisions.md` > `discovery.md` grill capture, grill exports, or narrative PRDs.

## Locked defaults

- Research: **auto-launch** on gaps/ideas (parallel default); one question if the prompt is thin — canonical policy in `research-spike` § Prompt gate
- **Recall before rework:** check `decisions.md` / requirements / research findings (+ a configured memory MCP if the workspace has one) before new research or re-deciding
- Decisions: **PDRs** in `decisions.md` (append-only, supersede on reversal)
- Research canvases: index at `{researchIndexPath}`; canonical `canvasDir` path only (see research-deliverables-playbook)
- Product decisions: one question at a time (low-risk gap-pass batching per checklist Step 4)
- Raw inputs land in `discovery.md` first; never merged straight into requirements
