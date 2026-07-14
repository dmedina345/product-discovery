---
name: letsmake-product-workflow
description: >-
  LetsMake Product Workflow — orchestrate BA/PO feature documentation from intake
  through discovery, grill, gap pass, and engineering handoff. Program-agnostic.
  Use for new features, design-first work, gap analysis, or dev handoff before
  spec.md.
metadata:
  author: letsmake
  version: 2.2.0
---

**Paths:** [paths.md](references/paths.md) + `.cursor/letsmake.config.json` in the consumer workspace; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`). Run the install script (`install-letsmake.sh` / `.ps1`) if config is missing. Ask via AskQuestion where available, plain chat otherwise.

# LetsMake Product Workflow

Orchestrate **medium/large** product work before engineering owns `spec.md`. This skill routes; the process itself is stated once in the canonical doc — read the phase you are entering, not the whole thing.

**Canonical doc:** [`letsmake-product-workflow.md`](references/letsmake-product-workflow.md) · **States/gates:** [`workflow-state-machine.md`](references/workflow-state-machine.md) · **Atomic decisions:** [`decision-records.md`](references/decision-records.md) · **Shared rules:** [`letsmake-conventions.md`](references/letsmake-conventions.md)

## Artifact map

```text
discovery.md       Living — brief, grill capture, research, design links
gap-analysis.md    Audit — coverage, scope drops, PO decisions log (never inlined in requirements)
requirements.md    SSOT — Consolidated after gap pass (TBC allowed with owners)
decisions.md       PDR log — append-only; supersede, never edit
scenario-matrix.md Pre-handoff edge-case audit
dev-handoff.md     Phase 4 package note
spec.md            Engineering — stub at handoff; eng fills [ENG] sections
design.md          Journeys, screens (may lead or follow discovery)
brief.md           Optional intent summary
```

**Conflict rule:** `requirements.md` (Consolidated) wins over `decisions.md` > discovery capture, PRDs, chat.

## Phases → skills

| Phase                      | Skill / action                                                                  |
| -------------------------- | ------------------------------------------------------------------------------- |
| 0 — Intake                 | **`intake-synthesize`** — destination, track (standard / design-first / spike-only / small change), scaffold |
| 1 — Brief                  | MoSCoW titles in `discovery.md` § Brief summary (optional `brief.md`)            |
| 2 — Grill + research       | **`grill-me`** (captures as it goes) + auto-launched **`research-spike`** in parallel; design-first → [figma-parity-playbook.md](references/figma-parity-playbook.md) |
| 3 — Gap pass               | **`gap-pass`** — atomic questions → M9 → Draft → review → M10 → Consolidated; already Consolidated + updates → **`increment-requirements`** |
| 3.5 — Scenario hardening   | **`scenario-hardening`** — edge-case pass; route SSOT changes through change control |
| 4A — Handoff prepare       | **`dev-handoff`** — DoR check, handoff note, untouched `spec.md` stub → `Prepared` |
| 4B — Handoff accept        | Engineering acknowledgment → `Accepted`                                  |
| 5+ — Engineering           | Engineering fills `spec.md` `[ENG]` sections + implementation plan — not BA-owned |

Small changes bypass the full path: **`small-change-requirements`** (escalation triggers in [small-change-process.md](references/small-change-process.md)). Unsure → **`which-skill-next`**. Doc health → **`wiki-lint`**.

## Boundaries (enforced across all phases)

- The PO decides product direction; agents propose and capture. Scope drops, requirement content, and TBC resolution go through a question — never a silent merge.
- Only `gap-pass` and `increment-requirements` write product content to `requirements.md`; research never does.
- Research auto-launches on gaps/ideas (parallel default) and produces proposals the PO adopts per item.
- Do **not** auto-generate `requirements.md` straight from a brief to bypass gap pass on grill/design-led features.
- Keep one `GP-*` record per capability even when low-risk questions are presented in a batch.
- In `simulated-po` mode, label approvals evaluation-only and never synthesize Engineering acceptance.
- Run `scripts/validate-workflow.ps1` / `.sh` with `--explain-state` before M10, scenario closeout, and handoff acceptance. Record transitions in `workflow-events.jsonl`; events are evidence, not authority.

Full shared rules and anti-patterns: [`letsmake-conventions.md`](references/letsmake-conventions.md).
