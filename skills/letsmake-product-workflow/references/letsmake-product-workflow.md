# LetsMake Product Workflow

**Program-agnostic BA/PO process** for any product or program. End-to-end path for **medium and large** product changes before engineering owns `spec.md`.

Built on a **three-layer document model** — `brief.md` (Layer 0.5 intent) → `requirements.md` (Layer 1 product contract) → `spec.md` (Layer 2 technical spec) — and adds **discovery**, **grill**, **parallel research**, **gap pass**, and **dev handoff** in front of it.

**Cheat sheet:** [cheat-sheet.md](./cheat-sheet.md) · **Templates:** [discovery-template.md](./discovery-template.md) · [requirements-template.md](./requirements-template.md) · [figma-parity-playbook.md](./figma-parity-playbook.md)

**Roles**

| Role        | Owns through phase                                                                |
| ----------- | --------------------------------------------------------------------------------- |
| BA/PO       | Brief, grill, handoff, requirements (SSOT), design alignment, acceptance criteria |
| Design      | `design.md`, visual deferrals, design-pass items                                  |
| Engineering | Codebase recon, `spec.md`, implementation plan, test matrix, build                |

---

## Phase overview

```text
0. Intake          → Track: small | standard | design-first | spike (see small-change-process.md)
1. Discover        → discovery.md (brief summary, links, lessons applied)
2. Grill + research→ discovery-grill; R-* rows → research-spike (parallel by default)
3. Gap pass        → gap-analysis.md (audit) → requirements.md Consolidated (TBC OK)
4. Dev handoff     → Package to engineering (Definition of Ready)
5. Spec & plan     → spec.md (Layer 2) — engineering-owned
6. Build & verify  → engineering builds + verifies; append lessons-learned.md
```

**Design-first:** Figma may lead Phase 1–3; gap pass includes parity rows ([figma-parity-playbook.md](./figma-parity-playbook.md)).

---

## Support loops (agent-assisted, PO-led)

These loops may run throughout the workflow. They **do not** replace AskQuestion or PO decisions.

### Context inbox

Raw inputs can arrive anytime — PO ideas, stakeholder notes, Figma comments, articles, YouTube transcripts, or research leads. Capture them in `discovery.md` § **Context inbox** first.

| Inbox outcome         | Use when                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| Resolved decision     | PO already chose and evidence is sufficient                                                          |
| `OQ-*`                | Decision needed later                                                                                |
| `R-*`                 | Research **auto-launches** when gap/idea benefits; findings propose changes — PO adopts in grill/gap |
| `EAR-*`               | Adjacent recommendation for same epic/idea                                                           |
| Requirement candidate | Ready to evaluate during gap pass                                                                    |
| Archived reference    | Useful context, no action                                                                            |

**Rule:** raw input never jumps straight into `requirements.md`.

### Agent context map

Each medium/large feature keeps a short `discovery.md` § **Agent context map**: current phase, read-first docs, authority order, and "ignore unless asked" paths.

Update it at phase changes or when major sources land. Keep it focused — routing and authority only, not summaries.

### Artifact eval gates

After each artifact-producing skill, leave a short eval in `discovery.md` § **Artifact eval log**:

| Artifact     | Eval checks                                                                                                                            |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| Discovery    | Problem clear; target users named; open questions explicit; R/EAR rows separated; implementation detail avoided                        |
| Research     | Question clear; sources cited; **Verification** section; confidence/limits; **Proposed changes** surfaced (not merged to requirements) |
| Gap pass     | Scope drops logged; TBC owners present; audit outside requirements; Figma conflicts resolved/deferred/open                             |
| Requirements | Overview present; goals measurable; Must stories observable; AC + DoD pass/fail; Missing info tables clean                             |

Eval result is **pass**, **needs PO**, or **needs cleanup**. Agents may clean formatting/link issues; product decisions go to AskQuestion.

**Objectivity tip:** when subagents are available, run the eval in a **fresh subagent** given only the artifact + the eval criteria — the agent that wrote an artifact grades its own work too generously.

### Prototype / signal loop

Use before gap pass when the concept is hard to evaluate in prose or the product risk is high:

```text
Hypothesis → prototype brief → quick prototype → PO/user/stakeholder signal → synthesis → AskQuestion decision
```

Artifacts live in `discovery.md` § **Prototype / signal loop**. Signal informs OQ/R rows or requirement candidates; it is not an automatic scope decision.

---

## Phase 0 — Intake

**Goal:** Choose the right track before writing.

| Signal                                                  | Track                                                   |
| ------------------------------------------------------- | ------------------------------------------------------- |
| New IA, multi-platform, multiple modules, migration     | **Standard** or **design-first** (this workflow)        |
| Copy, single control, one API field, bug-level behavior | [small-change-process.md](./small-change-process.md)    |
| Chat/transcript/workshop dump                           | **`intake-synthesize`** → `discovery.md`                |
| Figma/mockups ahead of reqs                             | **Design-first** — parity before Consolidated           |
| Unvalidated idea                                        | **Spike** — desk research / prototype before full grill |

**Outputs:** Epic/feature slug, `discovery.md`, folder `docs/epics/{epic}/features/{feature}/`

**Agent skills:** `intake-synthesize` · scaffold the feature folder per [paths.md](./paths.md) · read `docs/lessons-learned.md`

**Do not** auto-generate `requirements.md` straight from a brief to skip gap pass on grill- or design-led features.

---

## Phase 1 — Discover (brief + living doc)

**Goal:** Align on intent and capture all explore material in one living doc.

**Primary artifact:** `discovery.md` ([discovery-template.md](./discovery-template.md))

**Optional:** standalone `brief.md` (Layer 0.5) — keep summary in sync with discovery § Brief

**Include**

- What & why (1–3 sentences)
- Target users
- MoSCoW bullets (titles only—no Gherkin yet)
- References & open questions
- Agent context map + context inbox for raw inputs

**Done when**

- Product lead or PO agrees the problem is worth solving
- Won't Have captures obvious non-goals
- Context inbox has no untriaged blocker for the next phase

**Avoid**

- 50+ user stories
- Implementation detail (routes, components, APIs)

---

## Phase 2 — Grill-me session

**Goal:** Stress-test IA, platform differences, and decisions in a focused session.

**Agent skill:** Use **`discovery-grill`** in Cursor (`skills/discovery-grill/`) — one question at a time via AskQuestion, dependency-ordered.

**Recommended inputs:** `brief.md`, existing nav/design context, ADR candidates for structural choices

**Activities**

- Walk spatial model (whiteboard or ASCII)
- Fill platform matrix row by row
- Record **resolved decisions** live
- Capture **open questions** explicitly—do not "resolve" by omission
- Draft Must/Should/Won't as **bullet stories** (not Gherkin yet)

**Output artifact:** **`discovery.md`** § Grill capture (`discovery-grill` capture & closeout). Legacy `handoff.md` optional only.

**Format guidance (from discovery reviews)**

| Do in grill                     | Defer to gap pass            |
| ------------------------------- | ---------------------------- |
| IA + adjacency tables           | Gherkin + Definition of Done |
| Platform matrix                 | NFR numbers, analytics table |
| Resolved / open decision tables | Resilience scenario matrix   |
| Short outcome bullets per story | Requirement IDs, test matrix |
| UX principles                   | Spec-level shell API         |

**Optional exploratory outputs** (not SSOT)

- Narrative PRD for stakeholders—mine for edge cases, then **fold or archive**
- Grill-me repo copy for session history—**do not** maintain parallel to epic SSOT

**Done when**

- No unresolved **structural** disagreements (IA, section count, default home)
- Discovery grill sections complete; research `R-*` rows queued or done
- Context inbox reviewed; new raw inputs routed to OQ/R/EAR/archive

**Research:** Gaps and research-worthy ideas **auto-launch `research-spike`** (parallel by default). The canonical launch policy — when to launch without asking, the one thin-prompt AskQuestion, user overrides — lives in **`research-spike` § Prompt gate**. Research verifies claims, writes conclusions + **proposed changes** to `discovery.md`, never edits `requirements.md`; PO adopts proposals via AskQuestion in grill or gap pass.

**Epic-adjacent findings:** Research may recommend patterns for the **same epic/idea** even when not blocking the original `R-*` question (e.g. single-heart feedback from a feed-sizing study). Capture in discovery § Research findings → **Epic-adjacent recommendations**; gap pass offers adopt / sibling feature / backlog / ignore.

**Grill guide:** [grill-learnings.md](./grill-learnings.md)

---

## Phase 3 — Gap pass (consolidation)

**Goal:** Turn contract draft into **delivery-ready** `requirements.md` with **PO confirmation** — not a silent agent merge.

**Owner:** BA/PO (agent facilitates; **PO decides every scope drop**)

**Agent skill:** **`gap-pass`** — Phase A (questions only) → Phase B (SSOT) after PO M10 approval

**Checklists:** [`gap-pass-checklist.md`](./gap-pass-checklist.md) · PO review: [`gap-pass-review.md`](./gap-pass-review.md)

**Working artifact:** `gap-analysis.md` with **Scope drop candidates** + **PO decisions log** (one AskQuestion per drop)

**Critical rule:** Handoff text ("out of v1", e.g. global Coach) is **not** a PO decision — AskQuestion required before Won't Have.

### Why gap pass failed silently before

Handoff → requirements without:

- **Scope drop register** with AskQuestion per item
- Coverage matrix (core + domain rows from **this** feature's handoff and prior SSOT)
- Regression diff vs **discovered** prior requirements — or explicit PO choice to skip
- **AskQuestion** for every omission or scope drop (including handoff-stated exclusions)

### 3a — Coverage scan + regression diff

1. Read **`discovery.md`** (primary), `handoff.md` if legacy, `brief.md`, `design.md`, Figma parity docs, ADR, `CONTEXT.md`
2. **Search** for prior feature docs — same epic, PO-named paths, slug variants (see [gap-pass checklist Step 1](./gap-pass-checklist.md)); do not assume a fixed prior slug
3. Review `discovery.md` § **Context inbox** and route all open rows before SSOT write
4. Score every row in [`gap-pass-checklist.md`](./gap-pass-checklist.md) → write `gap-analysis.md`
5. Build regression table: prior **Must** missing in handoff = **blocking PO question**

### 3b — Scope drop register + PO question loop (blocking)

1. Build **Scope drop candidates** (checklist Step 2.5) in `gap-analysis.md`
2. **AskQuestion** for **each** candidate (M1) — including Coach, banners, shell chrome, brief Must gaps
3. **AskQuestion** whether to compare prior docs (M2) before skipping regression
4. Run M3–M8 for conflicts, downgrades, MISSING rows — one question at a time
5. **Do not edit `requirements.md` until M9** (proceed to SSOT) answered
6. **Do not mark Consolidated until M10** (final approval)

### 3c — Write / update `requirements.md` (SSOT)

Merge discovery (+ PO log) into **`requirements.md`** ([requirements-template.md](./requirements-template.md)):

| Section                           | Standard                                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| Header                            | Epic, feature, status `Consolidated`, link to **`gap-analysis.md`** (audit — not inlined)       |
| **Overview**                      | One-screen summary: what we’re building, goals table, in/out scope, open decisions (human skim) |
| Problem                           | Numbered business problems + optional user voice                                                |
| IA & interaction                  | From discovery; add resilience tables if user-facing                                            |
| **Must stories**                  | Observable Gherkin + **AC summary** + **DoD**; **`Confirmed`** or **`TBC`**                     |
| Should / Could / Won't            | Full MoSCoW                                                                                     |
| NFRs / analytics / a11y           | Measurable or **N/A** with PO confirm                                                           |
| Resolved decisions                | Dated table (major PO log also in `gap-analysis.md`)                                            |
| **Missing info & clarifications** | Open / TBC items — plain tables, **no `[FIGMA Δ]` diff blocks**                                 |
| Dependencies & assumptions        | Explicit                                                                                        |

**Document hygiene (mandatory)**

- **No** inline `[FIGMA Δ]`, `[GAP PASS NOTE]`, or diff blockquotes in requirements — resolved facts go in clean prose; audit history → `gap-analysis.md` / program `requirements-audit.md` / `parity-resolution-archive.md`.
- **No** coverage matrices in requirements.

**Story format (Layer 1)**

```markdown
**Story — Navigation: [Title]**
As a [user], I want [goal] so that [value].

- GIVEN [precondition]
- WHEN [action]
- THEN [observable, measurable outcome — not subjective]
- AND [optional second observable]

**Acceptance criteria (summary):**

- [Pass/fail bullet agents/QA can execute]

**Definition of Done:** [Concrete verification — manual QA steps, test intent, analytics, or threshold]
```

**Verifiability gate:** If an agent cannot write a test or QA step from the THEN/DoD, rewrite before Consolidated.

**Optional appendix:** Edge-case table keyed to story title (from exploratory PRD mining)—not duplicate full "As a user" lists.

### 3d — Align `design.md`

- Journeys match IA
- Screens list shell vs section-owned UI
- Platform notes mirror requirements matrix
- "Deferred to design pass" items listed explicitly

### 3e — ADR (when structural)

Create or link ADR for decisions that are hard to reverse (e.g. two primary sections + drawer). Reference from `requirements.md`.

### 3f — Testing & analytics requirements (BA input)

Before dev handoff, specify **intent** (not test code):

| Area            | BA documents in requirements                            |
| --------------- | ------------------------------------------------------- |
| Analytics v1    | Event names + when fired + key properties               |
| Rollout success | Thresholds (e.g. % default home, support ticket watch)  |
| Resilience      | Scenario table (offline, slow network, rapid switching) |
| Accessibility   | Must paths without gesture; SR announce expectation     |
| QA tiers        | Reference vs low-end device expectations (if NFR)       |

**Done when**

- [ ] `gap-analysis.md` complete; PO approved exit gate ([checklist Step 6](./gap-pass-checklist.md))
- [ ] `requirements.md` is self-contained SSOT
- [ ] `handoff.md` marked superseded or archived
- [ ] No conflicting exploratory PRD without "requirements wins" note
- [ ] Design aligned or explicitly deferred with owner
- [ ] Dev handoff gate (below) can be checked
- [ ] Artifact eval log has no `needs PO` blockers

---

## Phase 4 — Dev handoff (BA package)

**Goal:** Engineering can produce **implementation plan** + **`spec.md`** without re-discovering product rules.

**Agent skill:** **`dev-handoff`** — verifies the gate below, writes `dev-handoff.md` from the note template, seeds `spec.md` from [`spec-template.md`](./spec-template.md).

### Package contents

1. **`requirements.md`** (approved status in header)
2. **`design.md`**
3. **`brief.md`** (context)
4. **ADR links** (if any)
5. **`spec.md` stub** (product summary prefilled; `[ENG]` sections empty)
6. **Handoff note** — `dev-handoff.md` in the feature folder (or ticket comment):

```markdown
## Dev handoff — [feature]

**SSOT:** docs/epics/{epic}/features/{feature}/requirements.md (YYYY-MM-DD)

**Conflict rule:** requirements.md wins over grill exports or narrative PRDs.

**Ask from engineering:**

- [ ] Codebase map (existing nav, routes, modules touched)
- [ ] spec.md (shell contract, state, integration points)
- [ ] Implementation plan (phases, risks, flags)
- [ ] Test matrix: Must story → unit / integration / E2E **mapped to Acceptance criteria (summary) + DoD**

**Deferred to spec only:** [list code-specific unknowns]

**Design pass only:** [drawer visuals, motion tokens, etc.]
```

### Dev handoff gate (checklist)

**This table is the canonical Definition of Ready** — skills and the cheat sheet summarize it; when in doubt, this version wins.

| Gate                                                              | Owner     |
| ----------------------------------------------------------------- | --------- |
| Feature **goals & success** measurable or N/A (PO ok)             | BA        |
| All Must stories have observable Gherkin + AC summary + DoD       | BA        |
| No subjective-only acceptance (“delightful”, “intuitive”) on Must | BA        |
| Won't Have agreed with product                                    | BA        |
| Platform matrix complete                                          | BA        |
| NFRs stated or explicitly N/A                                     | BA + Eng  |
| Analytics v1 events listed or N/A                                 | BA + Data |
| Open product questions closed or TBC with owner                   | BA        |
| No Must **TBC** on user-visible behavior without owner            | BA        |
| `design.md` status aligned                                        | Design    |
| `spec.md` stub acknowledged                                       | Eng       |
| Lessons applied / new lessons captured                            | BA        |

**Not required at handoff:** File paths, component names, full test implementation (spec/plan phase).

---

## Phase 5 — Spec & implementation plan (engineering)

**Goal:** Connect requirements to **existing code** and interfaces.

**Artifact:** `spec.md` (Layer 2) — seed from [`spec-template.md`](./spec-template.md) (the `dev-handoff` skill creates the stub); engineering fills the technical sections

**Spec should include**

- Navigation / state model (diagram or table)
- Public shell contract (what sections expose)
- Route / deep-link map (all platforms)
- Persistence keys (coachmarks, session state)
- File / module touch list (repo-specific)
- Test seams (from BA testing intent)
- Out of scope for implementation (copy from requirements Won't Have)

**Implementation plan** (may live in spec or tracker)

- Phases, dependencies on other teams
- Migration / feature flag strategy if any
- Risks and rollback

**BA involvement:** Answer clarifications; do not fork a second requirements doc.

---

## Phase 6 — Build & verify (engineering)

Engineering builds against `spec.md` and verifies against the requirements Must stories (use whatever build/verify tooling your team runs).

**BA involvement**

- Acceptance review against Must stories (including TBC resolutions before ship)
- Sign-off on migration/analytics behavior
- Update `requirements.md` only via change control if scope shifts — **change control after Consolidated** = [small-change-process.md](./small-change-process.md) for narrow changes; anything hitting its escalation triggers re-opens **gap pass** (new PO decisions log rows), never a silent edit
- Append product/process learnings to `docs/lessons-learned.md` when durable

---

## Document hygiene (avoid drift)

| Anti-pattern                                             | Fix                                             |
| -------------------------------------------------------- | ----------------------------------------------- |
| discovery + requirements both "dev SSOT"                 | requirements Consolidated; discovery historical |
| handoff.md + requirements.md both "active"               | Mark handoff superseded after gap pass          |
| Coverage matrix inside requirements.md                   | Keep in gap-analysis.md only                    |
| PRD with 50+ stories parallel to requirements            | Archive PRD; extract edge cases into appendix   |
| Open questions in handoff but "resolved" in requirements | Single resolved table in SSOT                   |
| spec written before requirements approved                | spec stays stub until Phase 4 gate passes       |

---

## When to involve which skill

| Phase                        | Skill                                                            |
| ---------------------------- | ---------------------------------------------------------------- |
| Intake / transcript          | `intake-synthesize`                                              |
| New folder                   | Scaffold per [paths.md](./paths.md) § Feature folder layout      |
| Grill + capture              | `discovery-grill`                                                |
| Research                     | `research-spike` (parallel default)                              |
| Gap pass                     | `gap-pass`                                                       |
| Orchestration                | `letsmake-product-workflow`                                      |
| Small change                 | `small-change-requirements`                                      |
| Dev handoff package          | `dev-handoff` (DoR check + handoff note + spec stub)             |
| Approved requirements → spec | Engineering fills [`spec-template.md`](./spec-template.md) stub  |

---

## Related paths

- Feature folders: `docs/epics/{epic}/features/{feature}/`
- Small changes: [small-change-process.md](./small-change-process.md)
- Handoff template: [handoff-template.md](./handoff-template.md)
