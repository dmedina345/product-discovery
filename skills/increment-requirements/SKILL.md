---
name: increment-requirements
description: >-
  Refine an already-Consolidated requirements.md when a wave of PO
  updates/reversals/clarifications arrives: capture decisions as PDRs, update the
  rules registry, apply minimal SSOT edits, and lint before stopping. Use for
  increment, refine or update requirements, a new pass, or reconciling decisions
  on an existing doc — bigger than a small change, not a fresh grill.
---

# Increment / Refine requirements

The scaffold for **conversational refinement of an already-built `requirements.md`** — the mode between `small-change-requirements` (one narrow edit) and `gap-pass` (greenfield consolidation). It is the LLM-Wiki **Ingest + Lint** loop applied to requirements, with decisions captured as **PDRs** and durable preferences captured as **rules**.

Design + rationale: [`discovery-hardening-proposal.md`](../../docs/product/discovery-hardening-proposal.md) §4.3.

## When to use

- The doc is already **Consolidated** / handed off and the PO is iterating on it.
- A **wave of changes** arrives in one session (multiple points, possibly reversing prior calls).
- You catch yourself writing inline `(PO YYYY-MM-DD)` notes or appending to a run-on status line.

## When NOT to use

- **One narrow edit, no reversal** → `small-change-requirements`.
- **No SSOT yet / fresh feature** → `grill-me` → `gap-pass`.
- **New IA, new Must-level capability across modules, Won't-Have reversal** → escalate to `letsmake-product-workflow`.

## Prerequisites (create if missing, from templates in `docs/product/`)

| Artifact                   | Template                     | Purpose                          |
| -------------------------- | ---------------------------- | -------------------------------- |
| `<project>/decisions.md`   | `decision-log-template.md`   | episodic — PDRs                  |
| `<project>/rules/*.md`     | `rules-registry-template.md` | semantic — guardrails            |
| `<project>/context-map.md` | `context-map-template.md`    | working — read-first + hot cache |
| `<project>/AGENTS.md`      | (read-order pointer)         | enforce read-first               |

## Read-first (before any edit)

`context-map.md` → `rules/` (constitution → product → client → feature) → `decisions.md` (only for the _why_/history) → the relevant `requirements.md` section. **Do not re-derive a rule from Figma/defaults when a rule exists.**

## Loop

### 1 — Stage the change-set

Capture the batch of points as **proposed changes**, separate from the SSOT. Do not edit `requirements.md` yet. (OpenSpec separation.)

### 2 — Classify each point

`new decision` · `reversal` · `clarification` · `new rule` · `OQ-resolution` · `research-pending`.

### 3 — Clarify ambiguities (AskQuestion, one at a time)

Before writing, resolve conflicts and missing measurables. Surface any point that **contradicts an existing PDR or rule** explicitly. (Spec Kit `/clarify`.)

### 4 — Write episodic records (`decisions.md`)

- Append a **PDR** per decision (table row; expanded block for significant/irreversible ones).
- For a **reversal:** set the old PDR `status: superseded` + `superseded-by: <new>`, and the new PDR `supersedes: <old>`. **Never rewrite the old record's meaning.**

### 5 — Update semantic memory (`rules/`)

When a durable preference emerges, add a `RULE-*` (cite its source PDR). Retiring a rule requires a superseding PDR (mark `retired`, keep listed).

### 6 — Apply minimal SSOT edits (`requirements.md`)

Clean prose referencing **PDR IDs** — not inline date-tags. Touch only the affected stories/AC/DoD. Don't refactor adjacent untouched content.

### 7 — Lint / cross-artifact consistency

Check: requirements ↔ decisions ↔ rules ↔ `figma-component-map.md` ↔ OQ table. Emit explicit **`[!contradiction]`** notes naming **both** sources/PDRs; flag orphans (PDR with no requirements ref) and stale claims. A human resolves contradictions via a new PDR — never silently overwrite. (Spec Kit `/analyze`; LLM-Wiki Lint.)

### 8 — Stop-gate (end-loop guardrail)

End by **confirming the ending point** with the PO: present the change summary and stop. Do not drift into adjacent edits the PO didn't ask for.

### 9 — Bump revision + refresh cache

- Bump the `requirements.md` **Doc revision** header + add a **Changelog** row (date · rev · summary · PDR refs).
- Refresh the **hot cache** in `context-map.md` (3–6 bullets) and any changed `do-not-drift` items.
- Append `docs/lessons-learned.md` if a process insight emerged.

### 10 — Optional: sync to Linear

**Gated** — see [`letsmake-conventions.md`](../../docs/product/letsmake-conventions.md) § Linear sync (only if Linear is configured and the user opts in this project). Mirror new/changed _Still open_ rows and newly-resolved ones; file blocking new OQs as issues. Skip silently if not set up.

## Output contract

A short summary: **what changed · which PDRs (new + superseded) · which rules touched · contradictions found · revision bump.** The PO reviews records, not prose diffs.

## Consolidation (periodic, not every run)

On a cadence, distill durable rules from `decisions.md` into `rules/` + `context-map.md`, and retire superseded entries — keeping the read-first layer lean. (Memory-talk consolidation gate.)

## Anti-patterns

- Inline `(PO YYYY-MM-DD)` prose or a growing run-on status line instead of a PDR.
- Rewriting a decided PDR to change its meaning (must supersede).
- Re-deriving an existing rule from Figma/defaults (drift).
- Silently resolving a contradiction instead of flagging it for a PO decision.
- Open-ended editing past the PO's batch without a stop-gate.
