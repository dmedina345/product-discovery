# Discovery template (living document)

**Purpose:** single **living** artifact for explore/grill/research/design work. Not dev SSOT — that is `requirements.md` after gap pass.

**How to use**

1. Copy everything below the `## TEMPLATE START` heading (strip the marker lines) into
   `docs/epics/{epic}/features/{feature}/discovery.md`
2. Update continuously during grill, research, and design iteration — capture as you go, don't batch to session end
3. At gap pass, `requirements.md` is written clean; keep this file as history + links
4. **Do not** paste coverage matrices here — those live in `gap-analysis.md`

**ID legend:** `OQ-*` open question · `R-*` research row · `PDR-*` decision record (in `decisions.md`)

**Fog rule:** `Not yet specified` = in-scope unknowns not sharp enough to ticket yet · `Out of scope` = consciously ruled out (never graduates). Ticket when the question is sharp — even if blocked.

---

## TEMPLATE START

# Discovery: [Feature Name]

**Epic:** [epic-slug]
**Feature:** [feature-slug]
**Status:** Exploring | Ready for gap pass | Superseded
**Last updated:** YYYY-MM-DD
**Track:** Standard | Design-first | Spike-only | Small change
**Authority mode:** real | simulated-po

---

## Destination

_What reaching the end of this effort looks like — the artifact or decision this work is finding its way to. One or two lines; every session orients here first._

**Destination:** [e.g. Consolidated `requirements.md` ready for dev handoff · design parity sign-off · spike kill/adopt decision]

**Notes:** [domain context; standing preferences for this effort]

---

## Brief summary

**What & why:** [1–3 sentences]

**Target users:** [who]

**MoSCoW (titles only)**

| Must | Should | Won't (v1) |
| ---- | ------ | ---------- |
| [ ]  | [ ]    | [ ]        |

**Goals & success (draft)** — _measurable outcomes, drafted early; the grill stress-tests them, gap pass consolidates them_

| Goal   | Metric / observable | Target (draft)  |
| ------ | ------------------- | --------------- |
| [goal] | [how measured]      | [number or TBD] |

**References:** [workshop links, transcripts, prior docs, lessons-learned entries applied]

---

## Not yet specified

_In-scope fog — decisions or investigations you sense are coming but cannot phrase sharply yet. Graduates into `OQ-*`, `R-*`, or grill topics._

| Area / suspected question  | Why not ticketable yet  | Likely unblocks when      |
| -------------------------- | ----------------------- | ------------------------- |
| [dim view of what's ahead] | [depends on OQ/R/grill] | [which ticket or session] |

## Out of scope

_Work consciously ruled beyond the destination. Never graduates unless the destination is redrawn._

| Item                             | Why out of scope                                     |
| -------------------------------- | ---------------------------------------------------- |
| [work excluded from this effort] | [beyond destination / wrong epic / deferred product] |

---

## Research backlog

Rows are added during intake/grill/gap pass. **Default:** `research-spike` auto-launches in parallel when the prompt is sufficient; one question to sharpen a thin prompt, then launch.

| ID   | Question   | Type                                                                    | Prompt / context            | Blocks            | Status                    | Deliverable                                      | Depth                     |
| ---- | ---------- | ----------------------------------------------------------------------- | --------------------------- | ----------------- | ------------------------- | ------------------------------------------------ | ------------------------- |
| R-01 | [question] | desk \| comparable \| user \| technical \| prototype \| figma \| video | [user paste or agent draft] | [story / OQ / gap] | queued \| running \| done | canvas \| discovery \| markdown-digest \| both | quick \| standard \| deep |

## Research findings

_Research proposes; the PO adopts via a question in grill or gap pass. **Never** auto-merge into `requirements.md`._

### R-01 — [title]

**Outcome:** proceed | pivot | kill | inconclusive
**Conclusion:** [what we now believe]
**Recommendation:** [1–3 sentences — PO consideration, not approved scope]
**Evidence:** [bullets with source links/paths]
**Verification:** [claims checked; downgraded/removed; counter-evidence]
**Confidence:** high | medium | low — [limits]
**Canvas:** [link if created]

**Proposed changes**

The controller is the sole writer of this section. After PO disposition, every row cites one atomic `GP-RESEARCH-*` ID; no row remains pending at M9.

| #   | Target               | Proposal     | Rationale | Sources | PO disposition                             |
| --- | -------------------- | ------------ | --------- | ------- | ------------------------------------------ |
| 1   | discovery § Resolved | [draft text] | …         | [links] | pending \| adopted \| rejected \| deferred |

_Adjacent recommendations (outside the original `R-*` question) go here too, clearly marked with a suggested home — the PO adopts, defers, or ignores each._

---

## Design references (design-first)

| Artifact       | Link   | Last reviewed |
| -------------- | ------ | ------------- |
| Figma file     | [URL]  | YYYY-MM-DD    |
| Parity summary | [path] |               |

**Parity notes:** use [`figma-parity-playbook.md`](./figma-parity-playbook.md). Resolved design facts merge into requirements at gap pass; open items → **TBC** in Missing info (not `[FIGMA Δ]` blocks).

---

## Grill capture

**Session date(s):** YYYY-MM-DD
**Participants:** [names]

### Problem (user + business)

**User voice:** [1–2 sentences]

**Business problems:**

1. [Problem 1]

### Solution summary

[3–6 sentences — v1 boundary explicit]

### Structure / information architecture

```text
[diagram or spatial model, where the feature has one]
```

**Platform matrix** _(where behavior differs by platform/client)_

| Platform / client | [capability] | Notes |
| ----------------- | ------------ | ----- |
|                   |              |       |

### Stories (draft — bullets only)

**Must — [Category]: [Title]**

- [Observable outcome bullet — verifiable language; Gherkin + DoD are written at gap pass]

**Won't Have (v1)**

- [Explicit exclusion]

### Resolved decisions

| #   | Date | Topic | Decision |
| --- | ---- | ----- | -------- |
| 1   |      |       |          |

### Open questions

| ID    | Topic | Question | Owner | Resolution path                        |
| ----- | ----- | -------- | ----- | -------------------------------------- |
| OQ-01 |       |          |       | ask PO \| research `R-*` \| design pass |

### Dependencies & assumptions (draft)

- [Assumption / dependency]

---

## Next step

When the load-bearing branches are resolved or parked: run **`gap-pass`** → `gap-analysis.md` (audit) → `requirements.md` (Consolidated). **Do not** mark discovery as SSOT for dev handoff.

## TEMPLATE END
