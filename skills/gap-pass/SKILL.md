---
name: gap-pass
description: >-
  Interactive gap analysis from discovery.md (and legacy handoff) to requirements
  SSOT: coverage matrix in gap-analysis.md, mandatory AskQuestion including TBC
  and scope drops, design-first parity rows. Use for gap pass, consolidate to
  Consolidated requirements, or PO review.
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace. Run `install-letsmake.sh` if config is missing.

# Gap pass

Turn **`discovery.md`** (and legacy `handoff.md` if present) into delivery-ready **`requirements.md`** with **PO in the loop**. Audit trail in **`gap-analysis.md`** only — not inlined in requirements.

**Checklist:** [`gap-pass-checklist.md`](../letsmake-product-workflow/references/gap-pass-checklist.md)  
**PO review:** [`gap-pass-review.md`](../letsmake-product-workflow/references/gap-pass-review.md)  
**Requirements shape:** [`requirements-template.md`](../letsmake-product-workflow/references/requirements-template.md) (TBC stories)  
**Design-first:** [`figma-parity-playbook.md`](../letsmake-product-workflow/references/figma-parity-playbook.md)

## Modes

| Mode               | Trigger               | Behavior                                       |
| ------------------ | --------------------- | ---------------------------------------------- |
| **Full** (default) | gap pass, consolidate | Phase A questions → Phase B SSOT               |
| **Review-only**    | PO review, red flags  | AskQuestion only; no SSOT edits until approved |

## When to use

- After grill + **`discovery.md`** capture (or design-led draft ready)
- Before **`requirements.md`** status **Consolidated** or dev handoff

## Sources (read all)

| Priority | Path                                 |
| -------- | ------------------------------------ |
| 1        | `discovery.md`                       |
| 2        | `brief.md`, `design.md`              |
| 3        | `handoff.md` if present (legacy)     |
| 4        | Figma parity docs, ADR, `CONTEXT.md` |
| 5        | Discovered prior SSOT under epic     |

Also review `discovery.md` § **Context inbox**, § **Prototype / signal loop**, and § **Artifact eval log** before writing `requirements.md`.

**Handoff ≠ PO decision.** Discovery/handoff "out of v1" still needs **AskQuestion** before Won't Have.

---

## Non-negotiable rules

1. **Phase A before Phase B** — no `requirements.md` edits until mandatory AskQuestions answered (M1–M10).
2. **Scope drop register** — every candidate → AskQuestion M1.
3. **Prior doc comparison** — AskQuestion M2 before skipping regression.
4. **Design-first** — add rows for Figma vs discovery vs prior SSOT conflicts.
5. **Research** — incomplete `R-*` with blocking status → AskQuestion (TBC / wait / accept recommendation) before Consolidated.
6. **Proactive research** — when a gap would benefit from desk/comparable work, **auto-launch `R-*`** via `research-spike` (parallel default); do not require launch approval.
7. **Epic-adjacent findings** — research/grill may file **EAR-\*** rows in discovery; offer AskQuestion per row (adopt here / sibling feature / backlog / ignore). Never silent-add to requirements.
8. **Context inbox gate** — no untriaged `CI-*` row may be skipped; route to decision, OQ, R, EAR, requirement candidate, or archive.
9. **Prototype/signal gate** — signal is evidence, not approval; convert pending `P-*` findings to AskQuestion / OQ / R / requirement candidate.
10. **Verifiable acceptance** — Must stories need observable Gherkin + AC summary + DoD; reject subjective-only language (checklist AC-1–AC-4).
11. **Never** set gap-analysis **PO approved** without M10.
12. Every Won't Have / DROP cites **PO decisions log** row.

---

## Phase A — Analysis + questions (no SSOT edits)

### A1 — Inventory

List sources in `gap-analysis.md`. Discover prior docs per checklist Step 1.

Include:

- Context inbox rows and disposition
- Prototype/signal rows and disposition
- Artifact eval entries with `needs PO` / `needs cleanup`

### A2 — Prior doc decision (M2)

AskQuestion: compare discovered prior docs? Log before skip.

### A3 — Coverage matrix

Score checklist rows 2A–2I + domain 2J. **Design-led:** include Figma parity gaps.

### A4 — Scope drop register

Populate **`## Scope drop candidates`** from checklist Step 2.5 + discovery Won't Have drafts.

### A5 — PO question loop

For each scope drop → **AskQuestion M1** (one at a time).

**Options:** Must v1 · Won't v1 · Later epic · **TBC** · Defer — open question · Defer — design · Defer — research · Something else

Also M3–M8 as triggered. Log all in **`## PO decisions log`**.

For **TBC** answers: note linked story draft, owner, optional default for gap pass log.

### A6 — Research gate

For each blocking **`R-*`** still `queued`/`running`:

- AskQuestion: accept finding / adopt proposals, TBC story, or wait?
- If a **new** gap would benefit from research → **auto-launch `research-spike`** (see Proactive research below); notify PO research started.

Review **`discovery.md` § Epic-adjacent recommendations** — one AskQuestion per pending **EAR-\*** row: adopt in this feature · sibling feature · epic backlog · ignore.

Review **`discovery.md` § Context inbox** — one action per pending row:

- decision now → AskQuestion
- research → auto-launch spike or mark TBC if user deferred research
- requirement candidate → include in coverage matrix
- archive → log why

Review **`discovery.md` § Prototype / signal loop** — pending signal must become PO decision, OQ, research, or archive before SSOT.

### A6b — Proactive research (auto-launch)

When a gap is answerable by desk/comparable/Figma/video research, draft an `R-*` row and **invoke `research-spike` in parallel**: notify PO, continue Phase A while it runs, then **AskQuestion per proposed change** (adopt / reject / defer / TBC) when findings land — research never edits `requirements.md`. Do not ask to approve the spike unless context is thin or the user chose **decide now** / **defer research** / **wait** this turn.

### A7 — Summary + M9

AskQuestion M9: proceed to write requirements?

---

## Phase B — Write SSOT (after Phase A)

### B1 — M10 final approval

AskQuestion: approve Consolidated requirements for dev handoff?

Set `gap-analysis.md` Status: **PO approved — merged into requirements.md**

### B2 — Write `requirements.md`

Use [`requirements-template.md`](../letsmake-product-workflow/references/requirements-template.md):

- **Overview** — one-screen summary per feature or req block
- Gherkin Must with **observable** THEN/AND + **Acceptance criteria (summary)** + **DoD**; **TBC** marker per PO decisions
- Reject subjective-only Must acceptance — rewrite or TBC the missing measurable piece
- Carry adopted **EAR-\*** rows into stories or Resolved decisions; ignored rows logged in PO decisions log
- Carry adopted context inbox / prototype findings only after PO decision or as `TBC`
- Won't Have only from PO log
- Resolved decisions include gap-pass rows (brief); full PO log stays in **`gap-analysis.md`**
- **`## Missing info & clarifications`** for open/TBC items — plain tables only
- **No** `[FIGMA Δ]`, diff blockquotes, coverage matrix, or audit logs in this file

### B3 — Align `design.md`; mark discovery **superseded for SSOT** (not deleted)

### B4 — Legacy `handoff.md`

Header: `Status: Superseded by requirements.md`

### B5 — Exit gate

Checklist Step 6 + offer [`gap-pass-review.md`](../letsmake-product-workflow/references/gap-pass-review.md)

---

## Review-only mode

Flag scope drops that lack a PO decisions log row and surface blocking AskQuestion items only. **Make no `requirements.md` edits** until the PO approves (M10). Use for red-flag reviews or a second pass on high-impact features — see [`gap-pass-review.md`](../letsmake-product-workflow/references/gap-pass-review.md).

---

## `gap-analysis.md` sections

Structure the audit file with these sections: **Inventory** (sources read), **Coverage matrix** (checklist rows 2A–2J), **Scope drop candidates**, **Regression diff** (vs prior SSOT, if compared), **PO decisions log** (one row per AskQuestion answer), and **Blocking items** (open TBC / research gates). See [`gap-pass-checklist.md`](../letsmake-product-workflow/references/gap-pass-checklist.md) for the full row set.

---

## Anti-patterns

- Silent merge from discovery to requirements; scope drop in Won't Have without M1
- Consolidated with blocking TBC on a Must without owner
- Matrices, `[FIGMA Δ]`, or diff blockquotes inside requirements (use gap-analysis / parity-resolution-archive)
- Ignoring context-inbox / prototype rows or treating artifact eval `needs PO` as non-blocking without OQ/TBC owner

---

## After gap pass

Offer **`letsmake-product-workflow`** Phase 4 (dev handoff) when M10 complete.
