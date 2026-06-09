---
name: letsmake-product-workflow
description: >-
  LetsMake Product Workflow — orchestrate BA/PO feature documentation from intake
  through discovery, grill, gap pass, and engineering handoff. Program-agnostic.
  Use for new features, design-first work, gap analysis, or dev handoff before spec.md.
metadata:
  author: letsmake
  version: 1.0.0
compatibility: Cursor Agent with AskQuestion; yt-dlp for YouTube research; optional Figma MCP
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace. Run `install-letsmake.sh` if config is missing.

# LetsMake Product Workflow

Orchestrate **medium/large** product work before engineering owns `spec.md`.

**Canonical doc:** [`letsmake-product-workflow.md`](references/letsmake-product-workflow.md) · **Cheat sheet:** [`cheat-sheet.md`](references/cheat-sheet.md)

## Artifact map

```text
discovery.md       Living — brief, grill, research, design links, prototypes
gap-analysis.md    Audit — matrices, PO log (not in requirements)
requirements.md    SSOT — Consolidated after gap pass (TBC allowed with owners)
design.md          Journeys, screens (may lead or follow discovery)
spec.md            Engineering — after dev handoff gate
brief.md           Optional harness Layer 0.5; summary lives in discovery too
handoff.md         Legacy optional; prefer discovery.md
```

**Conflict rule:** **`requirements.md`** wins over discovery grill capture, handoff, discovery-grill exports, PRDs.

**Harness:** Do **not** use `generate-requirements` to bypass gap pass on grill/design-led features.

---

## Support loops

Use these throughout; do **not** auto-decide product direction.

| Loop               | Agent behavior                                                                                                                                      |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Context inbox      | Capture raw inputs in `discovery.md` § Context inbox; route to decision / OQ / R-_ / EAR-_ / archive; **auto-launch R-\* when research would help** |
| Agent context map  | Keep `discovery.md` § Agent context map short: phase, read-first docs, authority order, ignore-unless-asked                                         |
| Artifact eval      | After major outputs, append `pass` / `needs PO` / `needs cleanup` to `discovery.md` § Artifact eval log                                             |
| Prototype / signal | For high-risk UX, propose a prototype/signal loop before gap pass; signal becomes AskQuestion options                                               |

**Boundary:** Agents may auto-fix formatting, links, missing indexes, malformed canvases, and **auto-launch research**. Product behavior, scope drops, requirements content, and TBC resolution go through AskQuestion.

---

## Phase guide

### Phase 0 — Intake

- Escalation check → [`small-change-process.md`](references/small-change-process.md)
- **`intake-synthesize`** for chat/transcript/brief paste → `discovery.md` + track recommendation
- **`scaffold-feature`** if folder missing
- Read **`{lessonsLearnedPath}`**
- Initialize / refresh Agent context map + Context inbox

**Tracks:** Standard · Design-first · Spike-only · Small change

### Phase 1 — Brief

- MoSCoW in **`discovery.md`** § Brief summary (and/or harness `brief.md`)

### Phase 2 — Discover + grill

- **`discovery-grill`** — AskQuestion for product decisions; **auto-launch `research-spike`** on research-worthy gaps/ideas (parallel default); then capture the session into **`discovery.md`** and set it Ready for gap pass
- **Design-first:** [`figma-parity-playbook.md`](references/figma-parity-playbook.md); parity docs in discovery
- Review Context inbox before ending grill; route new raw inputs

### Phase 3 — Gap pass

- **`gap-pass`** only — `gap-analysis.md` + AskQuestion → **`requirements.md`**
- Consolidated with **Overview** + **Missing info & clarifications** per [requirements-template.md](references/requirements-template.md)
- Context inbox must have no unresolved blocker before SSOT write

### Phase 4 — Dev handoff

Package: Consolidated `requirements.md`, `design.md`, discovery link, ADRs.

**Definition of Ready:** No Must story with user-visible **TBC** without owner + resolution path. No product behavior deferred to spec only. Every Must story has **observable** Gherkin + **Acceptance criteria (summary)** + **DoD** agents/QA can execute. **Goals & success** measurable or N/A confirmed.

Ask engineering for: codebase map, `spec.md`, implementation plan, test matrix.

### Phase 5+ — Engineering

- **`generate-spec`**, **`generate-plan`**, harness run — not BA-owned

---

## Story formats

`Confirmed` and `TBC` Must-story shapes (Gherkin + Acceptance criteria summary + DoD; TBC adds Open / Default-if-unresolved / Owner) live in [`requirements-template.md`](references/requirements-template.md). Every Must needs **observable** Gherkin; TBC needs an owner + resolution path.

---

## Skills map

| Phase           | Skill                             |
| --------------- | --------------------------------- |
| Intake          | `intake-synthesize`               |
| Grill + capture | `discovery-grill`                 |
| Research        | `research-spike`                  |
| Gap pass        | `gap-pass`                        |
| Small change    | `small-change-requirements`       |
| Orchestrate     | `letsmake-product-workflow`       |
| Folder          | `scaffold-feature` (harness)      |
| Spec            | `generate-spec` (eng, after gate) |

---

## Eval blocks

Before saying an artifact is ready, run the relevant check and log the result:

| Artifact     | Pass requires                                                                     |
| ------------ | --------------------------------------------------------------------------------- |
| Discovery    | problem, users, open questions, R/EAR rows, non-goals, no spec detail             |
| Research     | question, sources, verification, proposed changes, PO adoption via AskQuestion    |
| Gap pass     | scope drops logged, TBC owners, audit outside requirements, Figma status clear    |
| Requirements | overview, measurable goals, observable Must stories, AC + DoD, clean Missing info |

Result labels: `pass`, `needs PO`, `needs cleanup`.

---

## Anti-patterns

- Dual SSOT (discovery + requirements both "active" for dev)
- 77-story PRD parallel to requirements
- `spec.md` before Consolidated
- Skipping AskQuestion on scope drops
- Research without prompt/context row
- Raw input merged straight into `requirements.md`
- Eval pass skipped before handoff
