---
name: letsmake-product-workflow
description: >-
  LetsMake Product Workflow — orchestrate BA/PO feature documentation from intake
  through discovery, grill, gap pass, and engineering handoff. Program-agnostic
  (MessengerX and future products). Use for new features, design-first work, gap
  analysis, or dev handoff before spec.md.
---

# LetsMake Product Workflow

Orchestrate **medium/large** product work before engineering owns `spec.md`.

**Canonical doc:** [`docs/product/letsmake-product-workflow.md`](../../docs/product/letsmake-product-workflow.md) · **Cheat sheet:** [`cheat-sheet.md`](../../docs/product/cheat-sheet.md)

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

**Conflict rule:** **`requirements.md`** wins over discovery grill capture, handoff, grill-me exports, PRDs.

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

- Escalation check → [`small-change-process.md`](../../docs/product/small-change-process.md)
- **`intake-synthesize`** for chat/transcript/brief paste → `discovery.md` + track recommendation
- **`scaffold-feature`** if folder missing
- Read **`docs/lessons-learned.md`**
- Initialize / refresh Agent context map + Context inbox

**Tracks:** Standard · Design-first · Spike-only · Small change

### Phase 1 — Brief

- MoSCoW in **`discovery.md`** § Brief summary (and/or harness `brief.md`)

### Phase 2 — Discover + grill

- **`grill-me`** — AskQuestion for product decisions; **auto-launch `research-spike`** on research-worthy gaps/ideas (parallel default)
- **`grill-to-handoff`** — capture to **`discovery.md`** when session ends
- **Design-first:** [`figma-parity-playbook.md`](../../docs/product/figma-parity-playbook.md); parity docs in discovery
- Review Context inbox before ending grill; route new raw inputs

### Phase 3 — Gap pass

- **`gap-pass`** only — `gap-analysis.md` + AskQuestion → **`requirements.md`**
- Consolidated with **Overview** + **Missing info & clarifications** per [requirements-template.md](../../docs/product/requirements-template.md)
- Context inbox must have no unresolved blocker before SSOT write

### Phase 4 — Dev handoff

Package: Consolidated `requirements.md`, `design.md`, discovery link, ADRs.

**Definition of Ready:** No Must story with user-visible **TBC** without owner + resolution path. No product behavior deferred to spec only. Every Must story has **observable** Gherkin + **Acceptance criteria (summary)** + **DoD** agents/QA can execute. **Goals & success** measurable or N/A confirmed.

Ask engineering for: codebase map, `spec.md`, implementation plan, test matrix.

### Phase 5+ — Engineering

- **`generate-spec`**, **`generate-plan`**, harness run — not BA-owned

---

## Story formats

Confirmed vs TBC Must shapes live in [`requirements-template.md`](../../docs/product/requirements-template.md); `gap-pass` writes them.

---

## Skills map

| Phase        | Skill                             |
| ------------ | --------------------------------- |
| Intake       | `intake-synthesize`               |
| Grill        | `grill-me`                        |
| Capture      | `grill-to-handoff`                |
| Research     | `research-spike`                  |
| Gap pass     | `gap-pass`                        |
| Refine doc   | `increment-requirements`          |
| Small change | `small-change-requirements`       |
| Orchestrate  | `letsmake-product-workflow`       |
| Folder       | `scaffold-feature` (harness)      |
| Spec         | `generate-spec` (eng, after gate) |

---

## Eval blocks

After major outputs, log `pass` / `needs PO` / `needs cleanup` in `discovery.md` § Artifact eval log. Per-artifact checks: [`letsmake-product-workflow.md`](../../docs/product/letsmake-product-workflow.md) § Artifact eval gates.

---

## Anti-patterns

See [`letsmake-conventions.md`](../../docs/product/letsmake-conventions.md) — dual SSOT, story sprawl, `spec.md` before Consolidated, skipping AskQuestion on scope drops, raw input merged into `requirements.md`.
