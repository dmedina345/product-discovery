# LetsMake Product Workflow — cheat sheet

One-page reference for BA/PO work before engineering owns `spec.md`. Program-agnostic — use across MessengerX and future products.

**Full doc:** [letsmake-product-workflow.md](./letsmake-product-workflow.md) · **Skills:** [`skills/README.md`](../../skills/README.md)

---

## Flow (one line)

**Intake → Discover → Grill + parallel research → Gap pass → Consolidated requirements → Dev handoff → spec + build**

---

## Support loops

These can happen anytime; they support the PO-led workflow and do not make product decisions automatically.

| Loop               | Use it for                                                      | Output                                            |
| ------------------ | --------------------------------------------------------------- | ------------------------------------------------- |
| Context inbox      | Raw notes, PO ideas, videos, Figma comments, stakeholder inputs | CI-_ row → decision / OQ / R-_ / EAR-\* / archive |
| Agent context map  | Keep future chats focused                                       | phase + read-first docs + authority order         |
| Artifact eval      | Check quality before moving phases                              | pass / needs PO / needs cleanup                   |
| Prototype / signal | Risky UX or hard-to-explain behavior                            | P-\* row → signal → AskQuestion decision          |

---

## Pick your track

| Situation                               | Track        | Skill                         |
| --------------------------------------- | ------------ | ----------------------------- |
| Chat paste, workshop notes, rough brief | Intake       | `intake-synthesize`           |
| Copy tweak, one surface                 | Small change | `small-change-requirements`   |
| Figma leads                             | Design-first | + figma-parity playbook       |
| Idea unvalidated                        | Spike-only   | `research-spike` first        |
| New IA, multi-module                    | Standard     | **LetsMake Product Workflow** |

---

## Phases

| #   | Phase            | Artifact                                  |
| --- | ---------------- | ----------------------------------------- |
| 0   | Intake           | `discovery.md`                            |
| 1   | Discover         | `discovery.md`                            |
| 2   | Grill + research | `discovery.md` + canvases                 |
| 3   | Gap pass         | `gap-analysis.md` → **`requirements.md`** |
| 4   | Dev handoff      | DoR package                               |
| 5+  | Engineering      | `spec.md`                                 |

**Orchestrator:** skill `letsmake-product-workflow` or say _"LetsMake Product Workflow"_

---

## Skills

| Skill                           | Trigger                                            |
| ------------------------------- | -------------------------------------------------- |
| `intake-synthesize`             | Paste transcript / kickoff                         |
| `grill-me`                      | "Grill me"                                         |
| `grill-to-handoff`              | End of grill → discovery                           |
| `research-spike`                | Auto R-\* / YouTube URL / desk research (parallel) |
| `gap-pass`                      | Consolidate to requirements SSOT                   |
| `increment-requirements`        | Refine a Consolidated `requirements.md` (PO wave)  |
| `small-change-requirements`     | Narrow change                                      |
| **`letsmake-product-workflow`** | Full path / dev handoff                            |

---

## Artifacts

```text
discovery.md              Living — brief, grill, research
discovery.md § Context inbox   Raw input queue
discovery.md § Agent context map   Read-first routing
discovery.md § Artifact eval log   Quality checks
gap-analysis.md           Audit (not in requirements)
requirements.md           SSOT after gap pass
{feature}/research/sources/   YouTube transcripts
docs/research/canvas-index.md   Canvas bookmark
```

**SSOT wins:** `requirements.md` > discovery, handoff, PRDs

---

## Locked rules

- **AskQuestion** for PO decisions (TBC + owner OK)
- **Auto-launch research** on gaps/ideas (parallel default); **PO adopts proposals** — research never edits `requirements.md`
- **No `[FIGMA Δ]`** in requirements — audit in gap-analysis
- **Must stories:** observable Gherkin + AC summary + DoD
- **EAR-\*** for epic-adjacent research — PO dispositions, no silent scope
- **No harness `generate-requirements`** skip on grill/design-led features
- Raw inputs go through **Context inbox** before requirements
- Eval can clean formatting, but **needs PO** goes to AskQuestion

Full shared rules: [`letsmake-conventions.md`](./letsmake-conventions.md).

**Optional Linear sync:** `gap-pass`/`increment-requirements` can mirror new OQs to Linear one-way (docs → Linear) if configured + PO opt-in — see `letsmake-conventions.md` § Linear sync.

---

## Research types

`desk` · `comparable` · `figma` · `video` (YouTube/Loom → `scripts/youtube-transcript.sh`) · `technical` · `prototype`

**Canvas quality:** follow [`canvas-authoring.md`](./canvas-authoring.md) — wrong Table/CardHeader API → empty blocks.

---

## Definition of Ready

- Must stories verifiable; goals measurable
- No Must **TBC** without owner + path
- Behavior not deferred to spec only
- Context inbox / prototype signal has no untriaged blocker
- Artifact eval log has no unresolved `needs PO`

---

## Chat phrases

- _"LetsMake Product Workflow — intake this into {feature}"_
- _"Grill me on {topic}"_
- _"Gap pass {program} into requirements"_
- _"Research this YouTube for {feature}"_ + URL
