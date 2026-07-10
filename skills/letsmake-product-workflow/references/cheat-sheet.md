# LetsMake Product Workflow — cheat sheet

One-page reference for BA/PO work before engineering owns `spec.md`. Program-agnostic.

**Full doc:** [letsmake-product-workflow.md](./letsmake-product-workflow.md) · **Shared rules:** [letsmake-conventions.md](./letsmake-conventions.md)

---

## Flow (one line)

**Intake → Discover → Grill + parallel research → Gap pass → Consolidated requirements → Scenario hardening → Dev handoff → spec + build**

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
dev-handoff.md       Phase 4 package note
spec.md              Engineering — stub at handoff
docs/research/canvas-index.md   Canvas bookmark (git-tracked)
{feature}/research/sources/     YouTube/Loom transcripts
```

**SSOT wins:** `requirements.md` > `decisions.md` > discovery capture, PRDs, chat.

## Locked rules

- **One question at a time** for PO decisions; recommended answer with every question (TBC + owner OK)
- **Auto-launch research** on gaps/ideas (parallel default); **PO adopts proposals** — research never edits `requirements.md`
- **Raw input never jumps into requirements** — it lands in discovery first and passes through a PO answer
- **Must stories:** observable Gherkin + AC summary + DoD; no subjective-only acceptance
- **Every scope drop cites a PO decision** (PDR or gap-analysis PO-log row)
- **No auto-generated requirements** skipping gap pass on grill/design-led features
- **Recall before rework:** check local `decisions.md` / requirements / research findings; optionally query a memory MCP for **recall only** (wiki writes stay with that system)

Full shared rules: [letsmake-conventions.md](./letsmake-conventions.md). Optional one-way Linear sync: same file, § Linear sync.

## Research types

`desk` · `comparable` · `figma` · `video` (YouTube/Loom → `scripts/youtube-transcript.{sh,ps1}`) · `technical` · `prototype`

**Canvas quality:** follow [canvas-authoring.md](./canvas-authoring.md) — wrong Table/CardHeader API → empty blocks.

## Definition of Ready (summary)

Canonical gate: [letsmake-product-workflow.md](./letsmake-product-workflow.md) § Dev handoff gate — the `dev-handoff` skill verifies it.

- Must stories verifiable; goals measurable or N/A with PO ok
- Scenario matrix complete or explicitly N/A
- No Must **TBC** without owner + resolution path
- Won't Have matches PO-confirmed drops only

## Chat phrases

- _"Which skill next?"_ · _"Grill me on {topic}"_
- _"Intake this into {feature}"_ + paste
- _"Gap pass {feature} into requirements"_
- _"Research this YouTube for {feature}"_ + URL
- _"Dev handoff {feature}"_ · _"Lint the docs"_
