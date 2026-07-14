# LetsMake Product Workflow — cheat sheet

One-page reference for BA/PO work before engineering owns `spec.md`. Program-agnostic.

**Full doc:** [letsmake-product-workflow.md](./letsmake-product-workflow.md) · **States:** [workflow-state-machine.md](./workflow-state-machine.md) · **Decisions:** [decision-records.md](./decision-records.md)

---

## Flow (one line)

**Intake → Discover → Grill/research → Gap M9 → Draft → M10 → Consolidated → Scenario hardening/change control → Handoff Prepared → Engineering Accepted**

## Pick your track

| Situation                               | Track        | Skill                       |
| --------------------------------------- | ------------ | --------------------------- |
| Chat paste, workshop notes, rough brief | Intake       | `intake-synthesize`         |
| Copy tweak, one surface                 | Small change | `small-change-requirements` |
| Figma leads                             | Design-first | + figma-parity playbook     |
| Idea unvalidated                        | Spike-only   | `research-spike` first      |
| New IA, multi-module                    | Standard     | full workflow               |

## Skills

| Skill                           | Trigger                                                  |
| ------------------------------- | -------------------------------------------------------- |
| **`which-skill-next`**          | "Which skill?" / unsure what to run next                 |
| `intake-synthesize`             | Paste transcript / kickoff                               |
| `grill-me`                      | "Grill me" — one question at a time, captures as it goes |
| `research-spike`                | Auto `R-*` / YouTube/Loom URL / desk research            |
| `gap-pass`                      | Consolidate to requirements SSOT                         |
| `increment-requirements`        | Wave of PO updates on a Consolidated doc                 |
| `scenario-hardening`            | Edge-case / silent-agent-assumption pass                 |
| `dev-handoff`                   | DoR check + handoff note + spec stub                     |
| `wiki-lint`                     | Doc/link/ID health check                                 |
| `small-change-requirements`     | Narrow change                                            |
| **`letsmake-product-workflow`** | Full path orchestration                                  |

## Artifacts

```text
discovery.md         Living — destination, brief, fog, grill capture, research
gap-analysis.md      Audit — coverage, scope drops, PO log (not in requirements)
requirements.md      SSOT after gap pass (TBC allowed with owners)
decisions.md         PDR log — append-only; supersede, never edit
scenario-matrix.md   Pre-handoff edge-case audit
dev-handoff.md       Prepared package → Engineering Accepted
spec.md              Engineering — stub at handoff
docs/research/canvas-index.md   Canvas bookmark (git-tracked)
{feature}/research/sources/     YouTube/Loom transcripts
```

**SSOT wins:** `requirements.md` > `decisions.md` > discovery capture, PRDs, chat.

## Locked rules

- **High-risk questions one at a time; low-risk batches allowed** — always one stable `GP-*` audit row per capability
- **Auto-launch research** on gaps/ideas (parallel default); **PO adopts proposals** — research never edits `requirements.md`
- **Raw input never jumps into requirements** — it lands in discovery first and passes through a PO answer
- **Must stories:** observable Gherkin + AC summary + DoD; no subjective-only acceptance
- **Every scope drop cites accepted `GP-DROP-*` IDs** — never positional table rows
- **No auto-generated requirements** skipping gap pass on grill/design-led features
- **Recall before rework:** check local `decisions.md` / requirements / research findings; optionally query a memory MCP for **recall only** (wiki writes stay with that system)

Full shared rules: [letsmake-conventions.md](./letsmake-conventions.md). Optional one-way Linear sync: same file, § Linear sync.

## Research types

`desk` · `comparable` · `figma` · `video` · `technical` · `prototype`; deliverable: canvas, discovery, markdown digest, or both based on environment.

**Canvas quality:** follow [canvas-authoring.md](./canvas-authoring.md) — wrong Table/CardHeader API → empty blocks.

## Definition of Ready (summary)

Canonical gate: [letsmake-product-workflow.md](./letsmake-product-workflow.md) § Dev handoff gate — the `dev-handoff` skill verifies it.

- Must stories verifiable; goals measurable or N/A with PO ok
- Scenario matrix complete or explicitly N/A
- No Must **TBC** without owner + resolution path
- Won't Have matches PO-confirmed drops only
- `scripts/validate-workflow.*` passes
- Prepared package is not Accepted until named Engineering acknowledgment

## Chat phrases

- _"Which skill next?"_ · _"Grill me on {topic}"_
- _"Intake this into {feature}"_ + paste
- _"Gap pass {feature} into requirements"_
- _"Research this YouTube for {feature}"_ + URL
- _"Dev handoff {feature}"_ · _"Lint the docs"_
- _"Validate workflow for {feature}"_ · _"Check LetsMake upgrade"_
