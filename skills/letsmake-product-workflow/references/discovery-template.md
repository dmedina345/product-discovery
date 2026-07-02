# Discovery template (living document)

**Purpose:** Single **living** artifact for explore/grill/research/design/prototype work. Not dev SSOT — that is `requirements.md` after gap pass.

**How to use**

1. Copy everything below `--- TEMPLATE START ---` into  
   `docs/epics/{epic}/features/{feature}/discovery.md`  
   (or `docs/{program}/discovery.md` for program-level work)
2. Update continuously during grill, research, and design iteration
3. At gap pass, **`requirements.md`** is written clean; keep this file as history + links
4. **Do not** paste coverage matrices here — use `gap-analysis.md`

**ID legend:** `CI-*` context-inbox raw input · `OQ-*` open question · `R-*` research row · `EAR-*` epic-adjacent recommendation · `P-*` prototype/signal spike · `PDR-*` decision record (`decisions.md`) · `RULE-*` durable rule (`rules/`)

---

## TEMPLATE START

# Discovery: [Feature Name]

**Epic:** [epic-slug]  
**Feature:** [feature-slug]  
**Status:** Exploring | Design-led | Ready for gap pass | Superseded (historical — requirements.md is SSOT)  
**Last updated:** YYYY-MM-DD  
**Track:** Standard | Design-first | Spike-only (experiment)

**Figma:** [URL + key node IDs]  
**Design:** [design.md](./design.md) · [figma-parity-summary if any]

**Research index (workspace):** `{researchIndexPath}` from `.cursor/letsmake.config.json` (default `docs/research/canvas-index.md`) — link it here with the correct relative path for this folder depth

---

## Agent context map

_Keep this short. Update at phase changes or when major inputs land. This is routing context, not a second SSOT._

**Current phase:** Intake | Discover | Grill | Research | Gap pass | Dev handoff

**Read first**

1. `discovery.md`
2. [requirements.md / gap-analysis.md / design.md — when present]
3. [active Figma / research / transcript links]

**Authority**

| Artifact          | Role                             | Authority                     |
| ----------------- | -------------------------------- | ----------------------------- |
| `requirements.md` | Consolidated SSOT after gap pass | Wins for dev handoff          |
| `discovery.md`    | Living capture                   | Historical after Consolidated |
| `gap-analysis.md` | Audit + PO log                   | Explains decisions; not SSOT  |

**Ignore unless asked:** [old PRDs, superseded handoffs, exploratory folders]

---

## Context inbox

_Use for raw inputs that arrive anytime: PO ideas, stakeholder notes, videos, articles, Figma comments, research leads. Do not merge raw inputs directly into `requirements.md`._

| ID    | Source       | Why it matters | Related area   | Status                                                                                 | Next action                          |
| ----- | ------------ | -------------- | -------------- | -------------------------------------------------------------------------------------- | ------------------------------------ |
| CI-01 | [link/paste] | [one sentence] | [story/OQ/R-*] | captured \| triaged \| needs PO decision \| research queued \| synthesized \| archived | [AskQuestion / R-* / OQ-* / archive] |

**Triage rule:** every inbox row becomes one of: resolved decision, open question (`OQ-*`), research row (`R-*`), epic-adjacent recommendation (`EAR-*`), requirement candidate, or archived reference.

---

## Research canvases — quick open

_Update when any R-\* completes. Use absolute links — see [research-deliverables-playbook.md](./research-deliverables-playbook.md)._

| ID   | Title         | Outcome       | Canvas                                                                   |
| ---- | ------------- | ------------- | ------------------------------------------------------------------------ |
| R-01 | [short title] | queued / done | [open](file:///Users/<you>/.cursor/projects/<workspace-slug>/canvases/…) |

---

## Brief summary (Layer 0.5)

**What & why:** [1–3 sentences]

**Target users:** [who]

**MoSCoW (titles only)**

| Must | Should | Won't (v1) |
| ---- | ------ | ---------- |
| [ ]  | [ ]    | [ ]        |

**Goals & success (draft)**

_Draft the measurable outcomes early — gap pass consolidates these into requirements § Goals & success; the grill should stress-test them._

| Goal   | Metric / observable | Target (draft)  |
| ------ | ------------------- | --------------- |
| [goal] | [how measured]      | [number or TBD] |

**References:** [workshop links, transcripts, prior docs]

---

## Lessons applied

Read `{lessonsLearnedPath}` from `.cursor/letsmake.config.json` (default `docs/lessons-learned.md`) at intake. Record what you used:

- [YYYY-MM-DD] [lesson or convention applied — e.g. one SSOT folder, shell vs content]

---

## Research backlog

Flag rows during grill/gap pass. **Default:** launch **`research-spike`** in parallel unless user says wait/sequential.

| ID   | Question   | Type                                                                   | Prompt / context            | Blocks            | Owner | Status                    | Deliverable         | Depth                     |
| ---- | ---------- | ---------------------------------------------------------------------- | --------------------------- | ----------------- | ----- | ------------------------- | ------------------- | ------------------------- |
| R-01 | [question] | desk \| comparable \| user \| technical \| prototype \| figma \| video | [user paste or agent draft] | [story / gap row] | [PO]  | queued \| running \| done | canvas \| discovery | quick \| standard \| deep |

**Types:** `desk` (best practices, comparables) · `prototype` (build to learn) · `figma` (annotation/parity pass) · `video` (YouTube transcript as source)

**When prompt/context is thin:** parent agent **AskQuestion once** for scope/success criteria/links, then **auto-launch** (no separate spike approval).

**Proactive research:** Any phase may add a new `R-*` when a gap or user idea would benefit from desk/comparable/video work — **launch immediately** in parallel unless user said wait/defer research.

**Epic-adjacent findings:** Research is not limited to the original question. Related recommendations for the **same epic or product idea** (even another feature’s UX) belong in findings § **Epic-adjacent recommendations** — not silent scope adds.

---

## Research findings

Link canvases and summaries here — not full matrices.

### R-01 — [title]

**Outcome:** proceed | pivot | kill | inconclusive  
**Canvas:** [link to `.canvas.tsx` if created]  
**Conclusion:** [what we now believe]  
**Recommendation:** [1–3 sentences — PO consideration, not approved scope]  
**Evidence:** [bullets with source links/paths]  
**Verification:** [claims checked; downgraded/removed; counter-evidence]  
**Confidence:** high | medium | low — [limits]  
**Still needs PO AskQuestion:** [adopt/reject/defer proposals — not re-approve research]

---

## Proposed changes from research

_Research proposes; PO adopts in grill or gap pass. **Never** auto-merge into `requirements.md`._

### From R-01

| #   | Target               | Proposal     | Rationale | Sources | PO disposition                             |
| --- | -------------------- | ------------ | --------- | ------- | ------------------------------------------ |
| 1   | discovery § Resolved | [draft text] | …         | [links] | pending \| adopted \| rejected \| deferred |

---

## Epic-adjacent recommendations (from research)

_Findings that inform the epic/idea but were **not** the original `R-*` question. Do not auto-add to requirements._

| ID     | Source R-\* | Recommendation                         | Suggested home                     | PO disposition                 |
| ------ | ----------- | -------------------------------------- | ---------------------------------- | ------------------------------ |
| EAR-01 | R-01        | [e.g. single-heart feedback vs thumbs] | [this feature / sibling / backlog] | pending \| adopted \| deferred |

_Gap pass or grill surfaces each row via AskQuestion: adopt in this feature, sibling feature, epic backlog, or ignore._

---

## Design references (design-first)

| Artifact       | Link   | Last reviewed |
| -------------- | ------ | ------------- |
| Figma file     | [URL]  | YYYY-MM-DD    |
| Parity summary | [path] |               |

**Parity notes:** Use [`figma-parity-playbook.md`](./figma-parity-playbook.md). Resolved design facts merge into requirements at gap pass; open items → **TBC** in Missing info (not `[FIGMA Δ]` blocks).

---

## Prototype / signal loop

_Optional. Use before gap pass when a behavior is hard to judge in prose, UX risk is high, or stakeholder/user signal would materially change scope._

| Spike | Hypothesis      | Prototype                     | Signal source                                  | Result                                   | Next action                          |
| ----- | --------------- | ----------------------------- | ---------------------------------------------- | ---------------------------------------- | ------------------------------------ |
| P-01  | [what we learn] | [canvas/Figma/prototype link] | PO review \| 5-user test \| stakeholder review | adopt \| revise \| kill \| research more | OQ-_ \| R-_ \| requirement candidate |

**Signal rule:** prototype output is evidence, not a PO decision. Convert findings into AskQuestion options, OQ/R rows, or gap-pass inputs.

---

## Artifact eval log

_Each artifact-producing skill should leave a short pass/fail note. Product decisions still go to AskQuestion._

| Date       | Artifact                                  | Eval                              | Issues  | Next action                       |
| ---------- | ----------------------------------------- | --------------------------------- | ------- | --------------------------------- |
| YYYY-MM-DD | discovery / research / gap / requirements | pass \| needs PO \| needs cleanup | [short] | [AskQuestion / cleanup / proceed] |

---

## Grill capture (workshop / AskQuestion session)

**Session date:** YYYY-MM-DD  
**Participants:** [names]

### Problem (user + business)

**User voice:** [1–2 sentences]

**Business problems:**

1. [Problem 1]
2. [Problem 2]

### Solution summary

[3–6 sentences — v1 boundary explicit]

### Information architecture

```text
[ASCII spatial model]
```

| Position | Name | Type              | Default? | Notes |
| -------- | ---- | ----------------- | -------- | ----- |
|          |      | primary / overlay |          |       |

**Platform matrix**

| Platform | [capability] | Notes |
| -------- | ------------ | ----- |
| iOS      |              |       |
| Android  |              |       |
| Web      |              |       |

### Stories (draft — bullets only)

**Must — [Category]: [Title]**

- [Observable outcome bullet — draft verifiable language; Gherkin + DoD finalized at gap pass]

**Won't Have (v1)**

- [Explicit exclusion]

### Resolved decisions (discovery)

| #   | Date | Topic | Decision |
| --- | ---- | ----- | -------- |
| 1   |      |       |          |

### Open questions

| ID    | Topic | Question | Owner | Resolution path                             |
| ----- | ----- | -------- | ----- | ------------------------------------------- |
| OQ-01 |       |          |       | AskQuestion \| research R-\* \| design pass |

### UX principles

- [Guardrail bullet]

### Dependencies & assumptions (draft)

- [Assumption / dependency]

---

## Gap pass pointer

When ready: run **`gap-pass`** → `gap-analysis.md` (audit) → `requirements.md` (Consolidated).

**Do not** mark discovery as SSOT for dev handoff.

---

## TEMPLATE END
