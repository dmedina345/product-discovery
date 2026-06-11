# Gap pass checklist

Use during **Phase 3 (gap pass)** after `discovery.md` capture (and optional legacy `handoff.md`) before `requirements.md` is marked SSOT.

**"Contract draft" below** = `discovery.md` § Grill capture (the normal case), or legacy `handoff.md` where one exists. Wherever an older revision said "handoff", read it as the contract draft.

**Agent skill:** `gap-pass`  
**Output artifact:** `gap-analysis.md` in the feature folder, from [`gap-analysis-template.md`](./gap-analysis-template.md) (audit trail; keep after merge)

---

## Rules

1. **Do not write `requirements.md` until** coverage scan + **scope drop register** + regression decision + **PO AskQuestion loop** complete.
2. **AskQuestion is mandatory** — see **Step 4 — Mandatory questions** (scope drops always require PO confirmation).
3. **Contract draft ≠ PO decision** — if the draft says “out of v1” or Won’t Have, still **AskQuestion** before writing SSOT.
4. **Silent defaults are forbidden** — if the contract draft is silent and a prior doc had a rule, mark `MISSING` and ask.
5. Record every PO answer in **`gap-analysis.md` PO decisions log** and **Resolved decisions** (topic "Gap pass").
6. **No feature names in the process** — discover prior docs by path search, not hardcoded slugs.
7. **Agent cannot set `PO approved`** without PO confirmation AskQuestion (Step 6).
8. **Context inbox / prototype signal are inputs** — route every pending row before SSOT; do not silently ignore or adopt.

---

## Step 1 — Source inventory (read all before scoring)

| Source           | Path pattern                                  | Purpose                               |
| ---------------- | --------------------------------------------- | ------------------------------------- |
| **Discovery**    | `{feature}/discovery.md`                      | **Primary** — grill, research, design |
| Brief            | `{feature}/brief.md`                          | Intent, MoSCoW                        |
| Handoff (legacy) | `{feature}/handoff.md`                        | Optional contract draft               |
| Prior SSOT       | See **Prior doc discovery** below             | Regression diff                       |
| ADR              | `docs/adr/*.md`                               | Structural constraints                |
| Glossary         | `CONTEXT.md` (repo root or linked)            | Terminology                           |
| Design           | `{feature}/design.md`                         | Journeys (align after requirements)   |
| Exploratory docs | Paths PO provides (other repos, chat exports) | Edge-case mining only                 |
| Context inbox    | `discovery.md` § Context inbox                | Raw input triage                      |
| Prototype signal | `discovery.md` § Prototype / signal loop      | Evidence for PO decisions             |
| Artifact eval    | `discovery.md` § Artifact eval log            | Blockers: `needs PO`, `needs cleanup` |

**Feature folder:** `docs/epics/{epic}/features/{feature}/`

### Prior doc discovery (generic)

Find candidate prior requirements **without assuming naming conventions**:

1. List all feature folders under the same epic: `docs/epics/{epic}/features/*/`
2. Exclude the **current** `{feature}` slug
3. Rank candidates by relevance:
   - PO-named path in the request (highest priority)
   - Same feature stem with suffix (`-v1`, `-v2`, `-draft`, date stamps)
   - `requirements.md` that references the same ADR, product area, or glossary terms as `brief.md`
   - Most recently updated `requirements.md` in the epic
4. Read **top 1–3** candidates
5. **AskQuestion (blocking, first gap-pass question if not already answered):**  
   “Compare against discovered prior doc(s): [list paths]? Recommended: **Yes** if same product area or successor feature.”
   - **Yes** → full regression diff (Step 3)
   - **No** → log PO decision + reason in `gap-analysis.md`; skip regression table (not silent skip)
6. Never treat an exploratory PRD as SSOT unless PO confirms

**Search helpers (agent):**

```text
docs/epics/{epic}/features/*/
docs/adr/
grep -l "{feature-stem}\|{product-area-keyword}" docs/
```

---

## Step 2 — Coverage matrix

Every row: `CARRIED` | `N/A` | `DEFER(spec)` | `DEFER(design)` | `DROP` | `MISSING` | `ASK PO`

Empty contract draft + no Won't Have → **MISSING** → **ASK PO** (unless prior doc also silent and PO confirms N/A).

**Domain adaptation:** sections below use **UI / mobile** framing. For non-UI work, re-read the section as:

| UI/mobile section             | API / service                      | Data / pipeline / ML              | Workflow / ops / internal    |
| ----------------------------- | ---------------------------------- | --------------------------------- | ---------------------------- |
| B — Platform & surfaces       | clients/SDKs, API consumers        | producers/consumers, environments | actors, integrating systems  |
| C — Entry, routing, deeplinks | endpoints, auth, versioning        | triggers, schedules, ingestion    | entry states, triggers       |
| E — Accessibility & motion    | (often N/A — confirm)              | (often N/A — confirm)             | operator UX where applicable |
| F — Migration & onboarding    | API version migration, deprecation | schema/backfill migration         | rollout, data migration      |

Mark genuinely inapplicable rows **N/A with PO confirmation** — do not silently skip them.

### A — Scope & brief alignment (all features)

| ID   | Topic                                                                                 | Must specify |
| ---- | ------------------------------------------------------------------------------------- | ------------ |
| SC-1 | Problem statement matches approved `brief.md`                                         |              |
| SC-2 | Every **brief Must** has a matching requirement (story or explicit Won't Have change) |              |
| SC-3 | Every **brief Won't Have** appears in requirements Won't Have                         |              |
| SC-4 | v1 boundary explicit (what ships now vs later)                                        |              |
| SC-5 | Dependencies & assumptions listed                                                     |              |

### B — Platform & surfaces (all features)

| ID   | Topic                                                                               | Must specify |
| ---- | ----------------------------------------------------------------------------------- | ------------ |
| PL-1 | iOS behavior documented or **N/A** with reason                                      |              |
| PL-2 | Android behavior documented or **N/A**                                              |              |
| PL-3 | Web behavior documented or **N/A**                                                  |              |
| PL-4 | Cross-platform parity statement (what matches, what differs intentionally)          |              |
| PL-5 | Platform-specific system integration (back button, history, OS gestures) or **N/A** |              |

### C — Entry, routing & deep links (if applicable)

| ID   | Topic                                                       | Must specify |
| ---- | ----------------------------------------------------------- | ------------ |
| EN-1 | Default / cold-start behavior                               |              |
| EN-2 | Deep links, notifications, or shared URLs or **N/A**        |              |
| EN-3 | Entry does not permanently change defaults unless specified |              |
| EN-4 | Web routing / bookmark / refresh behavior or **N/A**        |              |

### D — User-visible states & resilience (all features)

| ID   | Topic                                                                          | Must specify |
| ---- | ------------------------------------------------------------------------------ | ------------ |
| RS-1 | Primary user action never blocked by loading/errors (or define blocking cases) |              |
| RS-2 | Offline or slow-network behavior                                               |              |
| RS-3 | Empty / error states (where shown, per-area vs global)                         |              |
| RS-4 | Rapid repeat actions (debounce, cancel, last-wins) or **N/A**                  |              |
| RS-5 | Session vs cold-start state (preserve, reset) or **N/A**                       |              |

### E — Accessibility & motion (all features)

| ID     | Topic                                                                                | Must specify |
| ------ | ------------------------------------------------------------------------------------ | ------------ |
| A11Y-1 | Non-default input path (keyboard, tap-only, assistive tech)                          |              |
| A11Y-2 | Announcements / labels for major state changes or defer to spec with acceptance note |              |
| A11Y-3 | Reduced motion / low-tier degrade or **N/A**                                         |              |
| A11Y-4 | Web focus order and escape/dismiss patterns or **N/A**                               |              |
| L10N-1 | Localization / copy impact (new strings, languages, RTL) or **N/A**                  |              |

### F — Migration & onboarding (if applicable)

| ID   | Topic                                                         | Must specify |
| ---- | ------------------------------------------------------------- | ------------ |
| MG-1 | Existing-user migration or **N/A**                            |              |
| MG-2 | Discovery hints (coachmark, tooltip) dismiss rules or **N/A** |              |
| MG-3 | Tap-first / non-gesture-only discovery or **N/A**             |              |

### G — Cross-cutting integrations (from brief dependencies)

| ID   | Topic                                                                          | Must specify |
| ---- | ------------------------------------------------------------------------------ | ------------ |
| XG-1 | Each named dependency in brief/handoff: in scope Must, Won't Have v1, or later |              |
| XG-2 | Interaction between this feature and shared shell/chrome (if any)              |              |

_Add rows XG-3… for each integration named in the brief (global bars, banners, auth, etc.)._

### H — NFRs & engineering intent (all features)

| ID   | Topic                                                                                        | Must specify |
| ---- | -------------------------------------------------------------------------------------------- | ------------ |
| AC-1 | **Overview** (one-screen summary) + **goals & success** measurable or **N/A** (PO ok)        |              |
| AC-2 | Every **Must** story: Gherkin with **observable** THEN/AND                                   |              |
| AC-3 | Every **Must** story: **Acceptance criteria (summary)** + **Definition of Done** (pass/fail) |              |
| AC-4 | No Must story with **subjective-only** acceptance (“delightful”, “intuitive”, “feels right”) |              |
| AC-5 | **Missing info & clarifications** section; no `[FIGMA Δ]` / diff blockquotes in requirements |              |
| NF-1 | Measurable performance or timing targets or **N/A**                                          |              |
| NF-2 | Memory / lifecycle policy or defer to spec with PO approval                                  |              |
| NF-3 | Analytics v1 events + properties or **N/A**                                                  |              |
| NF-4 | Rollout success metrics or **N/A**                                                           |              |
| PR-1 | Data privacy: analytics events/properties and stored data reviewed for PII; retention stated or **N/A** |              |
| PR-2 | Security / permissions: auth, role, or permission-surface changes documented or **N/A**      |              |

### I — Negative guardrails (all features)

| ID   | Topic                                                                                 | Must specify |
| ---- | ------------------------------------------------------------------------------------- | ------------ |
| NG-1 | Product "do not ship" rules in Won't Have                                             |              |
| NG-2 | Every intentional **DROP** from prior SSOT listed in Won't Have or Resolved decisions |              |

### J — Domain-specific rows (per feature — required)

**Do not rely on a fixed domain checklist.** Build rows from this feature's artifacts:

| Source                                | Add row for…                                    | ID pattern            |
| ------------------------------------- | ----------------------------------------------- | --------------------- |
| Each contract-draft **Must** bullet   | Behavior not fully covered by core rows above   | `DOM-01`, `DOM-02`, … |
| Each prior SSOT **Must** story        | Title/summary not matched in draft requirements | `REG-01`, …           |
| Each contract-draft **open question** | Product behavior (not pure visual)              | `OQ-01`, …            |
| ADR constraints                       | Any rule not reflected in the contract draft    | `ADR-01`, …           |
| Context inbox `CI-*` rows      | Raw input not routed / synthesized              | `CI-01`, …            |
| Prototype `P-*` rows           | Signal not converted to a decision or OQ/R row  | `P-01`, …             |
| Artifact eval blockers         | `needs PO` / unresolved `needs cleanup` items   | `EVAL-01`, …          |

List all `DOM-*` / `REG-*` rows in `gap-analysis.md` with topic text copied from source — not from a template feature.

---

## Step 2.5 — Scope drop register (required before SSOT)

Build **`## Scope drop candidates`** in `gap-analysis.md`. Populate from:

| Source                                                            | Candidate drops                    |
| ----------------------------------------------------------------- | ---------------------------------- |
| Contract-draft “v1 does not / out of scope / Won’t Have” bullets  | Each named capability              |
| Contract-draft open questions resolved as DROP                    | Each item                          |
| Brief **Must/Should** with no matching draft story                | Each gap                           |
| Prior SSOT **Must** stories absent in draft (if regression run) | Each `REG-*`                       |
| `CONTEXT.md`, ADR, epic notes naming integrations               | Shell chrome, shared bars, banners |
| Agent inference (“probably defer Coach”)                        | **Never add without PO question**  |

**Rule:** Every row in this register → **Step 4 mandatory AskQuestion** before appearing in `requirements.md` Won’t Have or Resolved DROP.

**Categories that always require a question** (even if the contract draft already says drop):

- Global / shared shell UI (input bars, coach, offline banner, tab bar)
- Cross-feature dependencies listed in brief
- Analytics / rollout scope reduction
- Accessibility or platform parity downgrade
- Omitting a prior SSOT Must

---

## Step 3 — Regression diff (when prior SSOT exists)

Build in `gap-analysis.md`:

| Topic ID | Prior doc says           | Draft says         | Proposed action | PO decision |
| -------- | ------------------------ | ------------------ | --------------- | ----------- |
| REG-01   | {quote or story title}   | {quote or MISSING} | ASK PO          |             |
| XG-1     | {prior Must integration} | {silent}           | ASK PO          |             |

**Proposed action:** `CARRY` | `DROP` | `DEFER(spec)` | `DEFER(design)` | `N/A` | `ASK PO`

**Priority:** prior **Must** + new **MISSING** or **DROP** → blocking AskQuestion.

**Regression diff is driven by prior doc content**, not a fixed topic list.

---

## Step 4 — AskQuestion queue (blocking)

One question at a time (same UX as `discovery-grill`), with one exception for low-risk batching:

**Risk classes for scope drop candidates (M1):**

- **Always one-at-a-time** — the categories listed in Step 2.5 ("always require a question"): global/shared shell UI, cross-feature dependencies, analytics/rollout reduction, accessibility or platform parity downgrade, omitting a prior SSOT Must. Also every M3–M8 trigger.
- **Low-risk batch allowed** — candidates outside those categories (e.g. polish items, single-surface nice-to-haves the draft already excluded). The agent may group them into **one** AskQuestion listing each item with its recommendation, offering “accept all as recommended” plus per-item override. Show the classification; the PO can pull any item out for its own question.

Either way, **every item still gets its own PO decisions log row** — batching changes the question UX, never the audit trail.

### Mandatory questions (always AskQuestion)

| #   | Trigger                                   | Example prompt                                          |
| --- | ----------------------------------------- | ------------------------------------------------------- |
| M1  | **Scope drop register** row (Step 2.5)    | “{Capability} — v1 Must, Won’t Have v1, or later epic?” |
| M2  | **Prior doc comparison** not yet answered | “Compare against {paths}?”                              |
| M3  | Prior SSOT **Must** missing in draft      | “Carry {story}, drop, or defer?”                        |
| M4  | Brief **Must** missing in draft           | “Add story, drop, or defer?”                            |
| M5  | **Should → Won’t** or **Must → Should**   | “Accept downgrade for {topic}?”                         |
| M6  | Marking integration **N/A** (XG rows)     | “{Integration} in v1, later, or N/A?”                   |
| M7  | **MISSING** on core checklist row         | State topic ID + options                                |
| M8  | Two sources **conflict**                  | Quote both; ask which wins                              |
| M9  | Before writing SSOT                       | “Proceed to update requirements.md?”                    |
| M10 | Before **Consolidated**                   | “Approve gap-analysis and SSOT for dev handoff?”        |

**The contract draft already saying “out of v1” satisfies none of the above — still run M1.**

### Question shape

- Topic ID + what each source says
- Options: **Must v1** / **Won’t Have v1** / **Later epic** / **Defer(spec)** / **Defer(design)** / Something else
- **Recommended:** (agent suggestion — PO may override)

### Forbidden

- Writing `DROP` or Won’t Have without a **PO decisions log** row from AskQuestion
- Setting `gap-analysis.md` Status to **PO approved** without M10
- Inferring PO intent from grill session or handoff draft alone

---

## Step 5 — Write artifacts (order)

**Phase A (analysis only):** Steps 1–4 → `gap-analysis.md` with Status **In progress** — **no `requirements.md` edits**

**Phase B (after PO M9 + M10):**

1. **`gap-analysis.md`** — set Status **PO approved** only after M10
2. **`requirements.md`** — SSOT; every CARRIED row + every PO-confirmed DROP in Won’t Have
3. **`design.md`** — align; design-only deferrals
4. **`handoff.md`** — Superseded by requirements.md

Link `gap-analysis.md` from requirements header (optional): `Gap analysis: [gap-analysis.md](./gap-analysis.md)`

---

## Step 6 — Exit gate (PO confirms)

- [ ] **Scope drop register:** every row has PO decisions log entry (AskQuestion)
- [ ] **Prior doc decision** logged (compare yes/no + paths)
- [ ] Core checklist: no unexplained **MISSING**
- [ ] Domain rows: every contract-draft Must accounted for
- [ ] Regression: every prior **Must** has PO decision (or compare skipped with PO log)
- [ ] Requirements: **Overview** + goals; Gherkin Must + **AC summary** + DoD (AC-1–AC-5); no inline audit/diff blocks; NFR/analytics/resilience or **N/A** with PO confirmation
- [ ] Epic-adjacent research recommendations dispositioned (adopt / defer / ignore) or none filed
- [ ] Won't Have matches **only** PO-confirmed drops (no agent-inferred drops)
- [ ] Open questions only design pass or spec-only
- [ ] PO answered **M10** (explicit approval for Consolidated + dev handoff)
- [ ] Optional: PO ran [gap-pass-review.md](./gap-pass-review.md)

**Do not mark `requirements.md` Consolidated until exit gate passes.**

**PO review aid:** [gap-pass-review.md](./gap-pass-review.md)
