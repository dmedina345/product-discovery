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

**Paths:** Read [paths.md](references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace. Run the install script (`install-letsmake.sh` / `.ps1`) if config is missing.  
**AskQuestion fallback:** if the AskQuestion tool is unavailable in this mode/agent, ask the same single question in plain chat and wait.

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
brief.md           Optional Layer 0.5 intent summary; summary lives in discovery too
handoff.md         Legacy optional; prefer discovery.md
```

**Conflict rule:** **`requirements.md`** wins over discovery grill capture, handoff, discovery-grill exports, PRDs.

**Shortcut warning:** Do **not** auto-generate `requirements.md` straight from a brief to bypass gap pass on grill/design-led features.

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
- Scaffold the feature folder if missing ([paths.md § Feature folder layout](references/paths.md))
- Read **`{lessonsLearnedPath}`**
- Initialize / refresh Agent context map + Context inbox

**Tracks:** Standard · Design-first · Spike-only · Small change

### Phase 1 — Brief

- MoSCoW in **`discovery.md`** § Brief summary (and/or optional `brief.md`)

### Phase 2 — Discover + grill

- **`discovery-grill`** — AskQuestion for product decisions; **auto-launch `research-spike`** on research-worthy gaps/ideas (parallel default); then capture the session into **`discovery.md`** and set it Ready for gap pass
- **Design-first:** [`figma-parity-playbook.md`](references/figma-parity-playbook.md); parity docs in discovery
- Review Context inbox before ending grill; route new raw inputs

### Phase 3 — Gap pass

- **`gap-pass`** only — `gap-analysis.md` + AskQuestion → **`requirements.md`**
- Consolidated with **Overview** + **Missing info & clarifications** per [requirements-template.md](references/requirements-template.md)
- Context inbox must have no unresolved blocker before SSOT write

### Phase 4 — Dev handoff

- **`dev-handoff`** — verifies the Definition of Ready (canonical gate table: [`letsmake-product-workflow.md`](references/letsmake-product-workflow.md) § Dev handoff gate), writes `dev-handoff.md`, seeds `spec.md` stub from [`spec-template.md`](references/spec-template.md)
- Package: Consolidated `requirements.md`, `design.md`, `dev-handoff.md`, spec stub, ADRs
- Ask engineering for: codebase map, completed `spec.md` `[ENG]` sections, implementation plan, test matrix mapped to AC + DoD

### Phase 5+ — Engineering

- Engineering completes `spec.md` + implementation plan from [`spec-template.md`](references/spec-template.md) — not BA-owned

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
| Small change    | `small-change-requirements`            |
| Orchestrate     | `letsmake-product-workflow`            |
| Dev handoff     | `dev-handoff`                          |
| Spec            | `spec-template.md` (eng, after gate)   |

---

## Eval blocks

Before saying an artifact is ready, run the relevant check and log the result:

| Artifact     | Pass requires                                                                     |
| ------------ | --------------------------------------------------------------------------------- |
| Discovery    | problem, users, open questions, R/EAR rows, non-goals, no spec detail             |
| Research     | question, sources, verification, proposed changes, PO adoption via AskQuestion    |
| Gap pass     | scope drops logged, TBC owners, audit outside requirements, Figma status clear    |
| Requirements | overview, measurable goals, observable Must stories, AC + DoD, clean Missing info |

Result labels: `pass`, `needs PO`, `needs cleanup`. Prefer running the eval in a **fresh subagent** (artifact + criteria only) so the author isn't grading its own work.

---

## Anti-patterns

- Dual SSOT (discovery + requirements both "active" for dev)
- 50+ story PRD parallel to requirements
- `spec.md` before Consolidated
- Skipping AskQuestion on scope drops
- Research without prompt/context row
- Raw input merged straight into `requirements.md`
- Eval pass skipped before handoff
