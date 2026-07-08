# LetsMake Product Workflow docs

**LetsMake Product Workflow** — program-agnostic BA/PO process before engineering owns `spec.md`.

Built on a **three-layer document model** (`brief.md` → `requirements.md` → `spec.md`) plus **discovery**, **grill**, **parallel research**, **gap pass**, **dev handoff**, and a **layered memory system** (decisions, rules, context map).

**Start here:** [cheat-sheet.md](./cheat-sheet.md) · [letsmake-product-workflow.md](./letsmake-product-workflow.md) · [memory-system.md](./memory-system.md)

| Document                                                                 | Use when                                                          | Typical output location               |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------- |
| [cheat-sheet.md](./cheat-sheet.md)                                       | Quick reference across chats                                      | —                                     |
| [letsmake-product-workflow.md](./letsmake-product-workflow.md)           | New or changed features (medium/large scope)                      | Epic feature folder                   |
| [letsmake-conventions.md](./letsmake-conventions.md)                     | Shared rules skills enforce (PO-gated, auto-launch, recall-first) | Referenced by skills                  |
| [memory-system.md](./memory-system.md)                                   | Memory model: types, read order, recall, capture-at-source        | Referenced by skills                  |
| [paths.md](./paths.md)                                                   | Path/config resolution; folder layouts; canvas dir                | Referenced by skills                  |
| [discovery-template.md](./discovery-template.md)                         | Living explore doc (grill, research, design)                      | `discovery.md`                        |
| [requirements-template.md](./requirements-template.md)                   | Consolidated SSOT after gap pass                                  | `requirements.md`                     |
| [scenario-matrix-template.md](./scenario-matrix-template.md)             | Agent-readiness edge-case pass before dev handoff                 | `scenario-matrix.md`                  |
| [gap-analysis-template.md](./gap-analysis-template.md)                   | Gap pass audit file structure                                     | `gap-analysis.md`                     |
| [spec-template.md](./spec-template.md)                                   | Engineering spec stub (dev handoff seeds it)                      | `spec.md`                             |
| [decision-log-template.md](./decision-log-template.md)                   | Episodic memory — PDR log                                         | `decisions.md`                        |
| [rules-registry-template.md](./rules-registry-template.md)               | Semantic memory — durable rules                                   | `rules/*.md`                          |
| [context-map-template.md](./context-map-template.md)                     | Working memory — read-first + hot cache                           | `context-map.md`                      |
| [agents-md-template.md](./agents-md-template.md)                         | Session read-first hook (Cursor auto-loads)                       | workspace `AGENTS.md`                 |
| [canvas-authoring.md](./canvas-authoring.md)                             | Fix empty/malformed research canvases                             | Playbook only                         |
| [figma-parity-playbook.md](./figma-parity-playbook.md)                   | Design-first; Figma dev comments                                  | Parity docs + discovery               |
| [research-deliverables-playbook.md](./research-deliverables-playbook.md) | Find & review research canvases                                   | `{researchIndexPath}` canvas index    |
| [grill-learnings.md](./grill-learnings.md)                               | Grilling a navigation/IA-heavy feature                            | Playbook only                         |
| [handoff-template.md](./handoff-template.md)                             | Legacy optional capture                                           | `handoff.md` (prefer discovery)       |
| [small-change-process.md](./small-change-process.md)                     | Tweaks, copy, single-surface behavior                             | `docs/changes/` or requirements patch |
| [gap-pass-checklist.md](./gap-pass-checklist.md)                         | Gap pass (PO in the loop)                                         | `gap-analysis.md`                     |
| [gap-pass-review.md](./gap-pass-review.md)                               | PO sign-off before Consolidated                                   | Red-flag checklist                    |

## Artifact map

```text
discovery.md       Living — brief, grill, research, design, prototypes
discovery.md § Destination   What done looks like + effort notes
discovery.md § Not yet specified   In-scope fog (graduates to OQ/R/grill)
discovery.md § Out of scope   Ruled beyond destination (never graduates)
discovery.md § Context inbox   Raw inputs → decision / OQ / R-* / EAR-* / archive
discovery.md § Agent context map   Phase + read-first docs + authority order
discovery.md § Artifact eval log   pass / needs PO / needs cleanup
gap-analysis.md    Audit — matrices, PO log (not in requirements)
requirements.md    SSOT — Consolidated (TBC stories allowed with owners)
scenario-matrix.md Pre-handoff edge-case audit
decisions.md       Episodic — PDR log (append-only; supersede, never edit)
rules/*.md         Semantic — durable rules/preferences
context-map.md     Working — read-first + hot cache (per project)
AGENTS.md          Workspace read-first hook (auto-loaded each session)
dev-handoff.md     Phase 4 package note (dev-handoff skill)
spec.md            Engineering — stub at handoff; eng fills [ENG] sections
{researchIndexPath}             Canvas bookmark table (git-tracked)
{feature}/research/R-*.md       Optional markdown digest for deep spikes
design.md          Journeys, screens
brief.md           Optional Layer 0.5 intent summary
handoff.md         Legacy optional
```

## Agent skills

| Skill                           | Trigger                                                  |
| ------------------------------- | -------------------------------------------------------- |
| **`which-skill-next`**          | Unsure which skill or phase to run                       |
| `intake-synthesize`             | Transcript, chat paste, kickoff                          |
| `grill-me`                      | "grill me", stress-test design                           |
| `research-spike`                | R-\* research; Figma / YouTube / Loom (parallel default) |
| OKF Brain (`user-okf-brain`)    | "Did we decide/research X?" — `ask` before rework        |
| `grill-to-handoff`              | Capture grill → discovery.md                             |
| `gap-pass`                      | Consolidate to requirements                              |
| `increment-requirements`        | Refine a Consolidated `requirements.md` (PDRs + rules)   |
| `scenario-hardening`            | Agent-readiness edge-case pass before dev handoff        |
| `dev-handoff`                   | DoR check + handoff note + `spec.md` stub                |
| `wiki-lint`                     | Doc/link/ID health; contradiction flags                  |
| **`letsmake-product-workflow`** | Full path orchestration — **LetsMake Product Workflow**  |
| `small-change-requirements`     | Narrow change                                            |

## Conflict rule

**`requirements.md` (Consolidated)** wins over `decisions.md` > `rules/` > `discovery.md` grill capture, `handoff.md`, grill-me exports, or narrative PRDs.

## Locked defaults (Jul 2026)

- Research: **auto-launch** on gaps/ideas (parallel default); one AskQuestion if the prompt is thin — canonical policy in `research-spike` § Prompt gate
- **Recall before rework:** OKF Brain MCP (`ask` on `user-okf-brain`) before new research or re-deciding — cite concept paths; local SSOT fallback if `NOT_IN_BRAIN`
- Decisions: **PDRs** in `decisions.md` (append-only, supersede on reversal); durable preferences → `RULE-*`
- Research canvases: index at `{researchIndexPath}`; canonical `canvasDir` path only (see research-deliverables-playbook)
- Product decisions: **AskQuestion** (one-at-a-time; low-risk gap-pass batching per checklist Step 4)
- Raw inputs: capture in **Context inbox** first; never merge raw input straight to requirements
- Artifact eval: `needs PO` must become AskQuestion / OQ / TBC with owner
