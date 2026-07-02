---
name: letsmake-product-workflow
description: >-
  LetsMake Product Workflow — orchestrate BA/PO feature documentation from intake
  through discovery, grill, gap pass, and engineering handoff. Program-agnostic.
  Use for new features, design-first work, gap analysis, or dev handoff before
  spec.md.
metadata:
  author: letsmake
  version: 1.2.0
---

**Paths:** Read [paths.md](references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`). Run the install script (`install-letsmake.sh` / `.ps1`) if config is missing.  
**AskQuestion fallback:** if the AskQuestion tool is unavailable in this mode/agent, ask the same single question in plain chat and wait.

# LetsMake Product Workflow

Orchestrate **medium/large** product work before engineering owns `spec.md`.

**Canonical doc:** [`letsmake-product-workflow.md`](references/letsmake-product-workflow.md) · **Cheat sheet:** [`cheat-sheet.md`](references/cheat-sheet.md) · **Memory:** [`memory-system.md`](references/memory-system.md)

## Artifact map

```text
discovery.md       Living — brief, grill, research, design links, prototypes
gap-analysis.md    Audit — matrices, PO log (not in requirements)
requirements.md    SSOT — Consolidated after gap pass (TBC allowed with owners)
decisions.md       Episodic — PDR log, append-only (project or feature scope)
rules/*.md         Semantic — durable rules/preferences
context-map.md     Working — read-first + hot cache (per project)
design.md          Journeys, screens (may lead or follow discovery)
dev-handoff.md     Phase 4 package note (dev-handoff skill)
spec.md            Engineering — stub at handoff; eng fills [ENG] sections
brief.md           Optional Layer 0.5 intent summary
handoff.md         Legacy optional; prefer discovery.md
```

**Conflict rule:** **`requirements.md`** wins over `decisions.md` > `rules/` > discovery grill capture, handoff, grill-me exports, PRDs, chat.

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
| Memory / recall    | Read-first per [`memory-system.md`](references/memory-system.md); **`memory-recall`** before re-researching or re-deciding anything                 |

**Boundary:** Agents may auto-fix formatting, links, missing indexes, malformed canvases, and **auto-launch research**. Product behavior, scope drops, requirements content, and TBC resolution go through AskQuestion.

---

## Phase guide

### Phase 0 — Intake

- Escalation check → [`small-change-process.md`](references/small-change-process.md)
- **`intake-synthesize`** for chat/transcript/brief paste → `discovery.md` + track recommendation
- Scaffold the feature folder if missing ([paths.md § Feature folder layout](references/paths.md))
- Read **`docs/lessons-learned.md`**
- Initialize / refresh Agent context map + Context inbox

**Tracks:** Standard · Design-first · Spike-only · Small change

### Phase 1 — Brief

- MoSCoW in **`discovery.md`** § Brief summary (and/or optional `brief.md`)

### Phase 2 — Discover + grill

- **`grill-me`** — AskQuestion for product decisions; **auto-launch `research-spike`** on research-worthy gaps/ideas (parallel default)
- **`grill-to-handoff`** — capture to **`discovery.md`** when session ends
- **Design-first:** [`figma-parity-playbook.md`](references/figma-parity-playbook.md); parity docs in discovery
- Review Context inbox before ending grill; route new raw inputs

### Phase 3 — Gap pass

- **`gap-pass`** only — `gap-analysis.md` + AskQuestion → **`requirements.md`**
- Consolidated with **Overview** + **Missing info & clarifications** per [requirements-template.md](references/requirements-template.md)
- Context inbox must have no unresolved blocker before SSOT write
- Already Consolidated + a wave of PO updates → **`increment-requirements`** (PDRs + rules + lint) instead

### Phase 4 — Dev handoff

- **`dev-handoff`** — verifies the Definition of Ready (canonical gate: [`letsmake-product-workflow.md`](references/letsmake-product-workflow.md) § Dev handoff gate), writes `dev-handoff.md`, seeds `spec.md` stub from [`spec-template.md`](references/spec-template.md)
- Package: Consolidated `requirements.md`, `design.md`, `dev-handoff.md`, spec stub, ADRs
- Ask engineering for: codebase map, completed `spec.md` `[ENG]` sections, implementation plan, test matrix mapped to AC + DoD

### Phase 5+ — Engineering

- Engineering completes `spec.md` + implementation plan from [`spec-template.md`](references/spec-template.md) — not BA-owned

---

## Story formats

Confirmed vs TBC Must shapes live in [`requirements-template.md`](references/requirements-template.md); `gap-pass` writes them.

---

## Skills map

| Phase        | Skill                                 |
| ------------ | ------------------------------------- |
| Intake       | `intake-synthesize`                   |
| Grill        | `grill-me`                            |
| Capture      | `grill-to-handoff`                    |
| Research     | `research-spike`                      |
| Recall       | `memory-recall`                       |
| Gap pass     | `gap-pass`                            |
| Refine doc   | `increment-requirements`              |
| Small change | `small-change-requirements`           |
| Dev handoff  | `dev-handoff`                         |
| Doc health   | `wiki-lint`                           |
| Orchestrate  | `letsmake-product-workflow`           |
| Spec         | `spec-template.md` (eng, after gate)  |

---

## Eval blocks

After major outputs, log `pass` / `needs PO` / `needs cleanup` in `discovery.md` § Artifact eval log. Per-artifact checks: [`letsmake-product-workflow.md`](references/letsmake-product-workflow.md) § Artifact eval gates. Prefer running the eval in a **fresh subagent** (artifact + criteria only) so the author isn't grading its own work.

---

## Anti-patterns

See [`letsmake-conventions.md`](references/letsmake-conventions.md) — dual SSOT, story sprawl, `spec.md` before Consolidated, skipping AskQuestion on scope drops, raw input merged into `requirements.md`.
