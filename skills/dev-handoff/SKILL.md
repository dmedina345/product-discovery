---
name: dev-handoff
description: >-
  Package Consolidated requirements for engineering: verify Definition of Ready,
  write the dev-handoff note, seed spec.md stub from spec-template, and mark
  discovery superseded. Use after gap pass M10 approval, when user says dev
  handoff, hand off to engineering, ready for dev, or package for the dev team.
metadata:
  author: letsmake
  version: 1.3.0
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace. Run the install script (`install-letsmake.sh` / `.ps1`) if config is missing.  
**AskQuestion fallback:** if the AskQuestion tool is unavailable in this mode/agent, ask the same single question in plain chat and wait.

# Dev handoff

Close Phase 4: turn an approved **`requirements.md`** into a package engineering can run with — without re-discovering product rules. Engineering fills the technical sections and the implementation plan; product behavior stays in requirements.

**Spec stub:** [`spec-template.md`](../letsmake-product-workflow/references/spec-template.md)  
**Canonical gate:** [LetsMake Product Workflow § Dev handoff gate](../letsmake-product-workflow/references/letsmake-product-workflow.md)

## When to use

- Gap pass finished — `gap-analysis.md` is **PO approved** (M10) and `requirements.md` is **Consolidated**
- User says "dev handoff", "hand off to engineering", "package for dev"

## When NOT to use

- Requirements still Draft or gap pass incomplete → `gap-pass`
- Narrow change without full requirements → `small-change-requirements`

---

## Procedure

### 1 — Verify Definition of Ready (blocking)

Check the **Dev handoff gate** table in the canonical workflow doc against the feature's artifacts. Key checks:

- `gap-analysis.md` Status is **PO approved** with M10 logged
- Every Must story: observable Gherkin + Acceptance criteria (summary) + DoD; no subjective-only acceptance
- No Must **TBC** on user-visible behavior without owner + resolution path
- `scenario-matrix.md` exists and has no blocking `Ask PO` / unapplied `Add AC` rows, or PO explicitly accepted scenario hardening as N/A for a small/low-risk change
- Goals & success measurable or N/A with PO confirmation; platform matrix complete; NFR/analytics stated or N/A
- No open question in discovery blocks a Must story — everything is resolved or carried as `OQ-*`/`TBC` with an owner
- `decisions.md` has no **proposed** PDR touching a Must story (accepted / rejected / superseded only)

**Any failed check → one AskQuestion per failure**: fix now (route back to `gap-pass`), accept with owner + dated note, or abort handoff. Do **not** silently hand off with a failed gate.

### 2 — Write the handoff note

Create `dev-handoff.md` in the feature folder using the **Handoff note** block from the canonical workflow doc Phase 4: SSOT path + date, conflict rule, asks from engineering (codebase map, spec, implementation plan, test matrix mapped to AC + DoD), deferred-to-spec list, design-pass-only list.

### 3 — Seed `spec.md` stub

Copy [`spec-template.md`](../letsmake-product-workflow/references/spec-template.md) (or `{docsProductRoot}/spec-template.md`) to the feature folder as `spec.md` with Status **Stub — awaiting engineering**. Prefill **only** the Product summary section (one-liner, Must story titles, Won't Have titles, open TBC items) from `requirements.md`. Leave every `[ENG]` section untouched.

If a `spec.md` already exists, do not overwrite — AskQuestion how to proceed.

### 4 — Supersede draft artifacts

- `discovery.md` Status → **Superseded (historical — requirements.md is SSOT)**

### 5 — Close out

- Tell the user: package contents (requirements, design, dev-handoff note, spec stub, ADR links) and what engineering owes back (completed spec `[ENG]` sections + implementation plan + test matrix)

---

## Anti-patterns

- Handing off with a failed DoR check and no PO acknowledgment
- Skipping scenario hardening on medium/large or agent-built work because "engineering will catch it"
- Prefilling `[ENG]` sections (guessing architecture, file paths, or test design — engineering owns those)
- Duplicating requirements prose into the spec instead of linking
- Editing `requirements.md` during handoff (post-Consolidated changes go through change control / `small-change-requirements`)
- Treating handoff as done without telling engineering what is deferred to spec vs design
