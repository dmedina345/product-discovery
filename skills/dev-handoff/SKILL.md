---
name: dev-handoff
description: >-
  Package Consolidated requirements for engineering: verify Definition of Ready,
  write the dev-handoff note, seed spec.md stub from spec-template, and mark
  discovery superseded. Use after gap pass M10 approval, when user says dev
  handoff, hand off to engineering, ready for dev, or package for the dev team.
metadata:
  author: letsmake
  version: 2.2.0
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace. Run the install script (`install-letsmake.sh` / `.ps1`) if config is missing.  
**AskQuestion fallback:** if the AskQuestion tool is unavailable in this mode/agent, ask the same single question in plain chat and wait.

# Dev handoff

Close Phase 4: turn an approved **`requirements.md`** into a package engineering can run with — without re-discovering product rules. Engineering fills the technical sections and the implementation plan; product behavior stays in requirements.

**Templates:** [`dev-handoff-template.md`](../letsmake-product-workflow/references/dev-handoff-template.md) · [`spec-template.md`](../letsmake-product-workflow/references/spec-template.md)
**Canonical states:** [`workflow-state-machine.md`](../letsmake-product-workflow/references/workflow-state-machine.md)

## When to use

- Gap pass finished — `gap-analysis.md` is **PO approved** (M10) and `requirements.md` is **Consolidated**
- User says "dev handoff", "hand off to engineering", "package for dev"

## When NOT to use

- Requirements still Draft or gap pass incomplete → `gap-pass`
- Narrow change without full requirements → `small-change-requirements`

---

## Procedure — prepare, then accept

### 1 — Verify product readiness

Check the **Dev handoff gate** table in the canonical workflow doc against the feature's artifacts. Key checks:

- `gap-analysis.md` Status is **PO approved** with M10 logged
- Every Must story: observable Gherkin + Acceptance criteria (summary) + DoD; no subjective-only acceptance
- No Must **TBC** on user-visible behavior without owner + resolution path
- `scenario-matrix.md` exists and has no blocking `Ask PO` / `Add AC` rows, or PO explicitly accepted N/A for small/low-risk work
- Goals & success measurable or N/A with PO confirmation; platform matrix complete; NFR/analytics stated or N/A
- No open question in discovery blocks a Must story — everything is resolved or carried as `OQ-*`/`TBC` with an owner
- `decisions.md` has no **proposed** PDR touching a Must story (accepted / rejected / superseded only)

Classify each remaining item as planning, implementation-start, or production readiness. Planning failures block preparation; later-dimension blockers may carry only with owner and trigger/date.

### 2 — Seed `spec.md` before acknowledgment

Copy `spec-template.md` with Status `Stub — awaiting engineering`. Prefill only Product summary. Leave everything from the first `[ENG]` heading onward exactly equal to the template; validate parity before continuing. Do not overwrite an existing spec.

### 3 — Prepare handoff note

Create `dev-handoff.md` from the template with Status `Prepared`, readiness by dimension, package links, and return asks. Planning must be `pass`; Consolidated requirements and a Complete scenario matrix are prerequisites. Append `handoff-prepared`. In `simulated-po` mode it remains Prepared.

### 4 — Validate and accept

Run `scripts/validate-workflow.* --explain-state`. Engineering then acknowledges by name/date and owns `[ENG]` sections; only then set handoff Status `Accepted` and append `handoff-accepted`. Discovery remains `Superseded`.

Tell the user whether the package is Prepared or Accepted and what blocks implementation/production separately.

---

## Anti-patterns

- Handing off with a failed DoR check and no PO acknowledgment
- Skipping scenario hardening on medium/large or agent-built work because "engineering will catch it"
- Prefilling `[ENG]` sections (guessing architecture, file paths, or test design — engineering owns those)
- Duplicating requirements prose into the spec instead of linking
- Editing `requirements.md` during handoff (post-Consolidated changes go through change control / `small-change-requirements`)
- Treating handoff as done without telling engineering what is deferred to spec vs design
