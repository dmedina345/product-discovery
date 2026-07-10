# LetsMake Product Workflow

**Program-agnostic BA/PO process** for any product or program. End-to-end path for **medium and large** product changes before engineering owns `spec.md`.

Built on a **three-layer document model** — `brief.md` (intent) → `requirements.md` (product contract, SSOT) → `spec.md` (technical spec) — plus **discovery**, **grill**, **parallel research**, **gap pass**, and **dev handoff**.

**Cheat sheet:** [cheat-sheet.md](./cheat-sheet.md) · **Shared rules:** [letsmake-conventions.md](./letsmake-conventions.md) · **Templates:** [discovery-template.md](./discovery-template.md) · [requirements-template.md](./requirements-template.md) · [gap-analysis-template.md](./gap-analysis-template.md) · [decision-log-template.md](./decision-log-template.md) · [spec-template.md](./spec-template.md)

**Roles**

| Role        | Owns through phase                                                                |
| ----------- | --------------------------------------------------------------------------------- |
| BA/PO       | Brief, grill, requirements (SSOT), design alignment, acceptance criteria           |
| Design      | `design.md`, visual deferrals, design-pass items                                   |
| Engineering | Codebase recon, `spec.md`, implementation plan, test matrix, build                 |

---

## Phase overview

```text
0. Intake          → Track: small | standard | design-first | spike (see small-change-process.md)
1. Discover        → discovery.md (destination, brief summary, honest fog)
2. Grill + research→ grill-me (captures as it goes); R-* rows → research-spike (parallel by default)
3. Gap pass        → gap-analysis.md (audit) → requirements.md Consolidated (TBC OK with owners)
3.5 Scenario hardening → scenario-matrix.md (agent-readiness edge-case pass)
4. Dev handoff     → Package to engineering (Definition of Ready)
5. Spec & plan     → spec.md — engineering-owned
6. Build & verify  → engineering builds + verifies; append lessons-learned.md
```

**Design-first:** Figma may lead Phases 1–3; gap pass includes parity rows ([figma-parity-playbook.md](./figma-parity-playbook.md)).

**No-fog early exit.** Not every idea needs the full scaffold. After intake or a breadth-first grill pass, if the **destination** is already visible, open items are sharp (ticketable as `OQ-*`/`R-*`, not vague fog), and the [small-change-process.md](./small-change-process.md) escalation triggers are all false — stop and ask: route to `small-change-requirements`, a short grill → `gap-pass`, or continue the full path if the PO wants exhaustive coverage anyway.

**Fog vs ticket:** keep dim unknowns in `discovery.md` § Not yet specified; ticket when the question is sharp even if blocked. Work beyond the destination goes in § Out of scope, not fog.

**Decisions are PDRs.** Record significant product decisions in `decisions.md` (`PDR-*`, append-only), not as inline dated prose. Reversals supersede the old PDR and link the chain. Before re-researching or re-deciding, check the existing record first ([letsmake-conventions.md](./letsmake-conventions.md) § Recall before rework).

---

## Phase 0 — Intake

**Goal:** choose the right track before writing.

| Signal                                                  | Track                                                   |
| ------------------------------------------------------- | ------------------------------------------------------- |
| New IA, multi-platform, multiple modules, migration     | **Standard** or **design-first** (this workflow)        |
| Copy, single control, one API field, bug-level behavior | [small-change-process.md](./small-change-process.md)    |
| Chat/transcript/workshop dump                           | **`intake-synthesize`** → `discovery.md`                |
| Figma/mockups ahead of reqs                             | **Design-first** — parity before Consolidated           |
| Unvalidated idea                                        | **Spike** — desk research / prototype before full grill |

**Outputs:** epic/feature slug, `discovery.md` with a named **Destination**, folder per [paths.md](./paths.md). Read `docs/lessons-learned.md`.

**Do not** auto-generate `requirements.md` straight from a brief to skip gap pass on grill- or design-led features.

## Phase 1 — Discover (brief + living doc)

**Goal:** align on intent; capture explore material in one living doc — `discovery.md` ([discovery-template.md](./discovery-template.md)). Optional standalone `brief.md`.

Include: what & why (1–3 sentences), target users, MoSCoW bullets (titles only — no Gherkin yet), references, open questions, honest fog (§ Not yet specified / § Out of scope).

**Done when:** the PO agrees the problem is worth solving; Won't Have captures obvious non-goals. **Avoid:** 50+ user stories; implementation detail (routes, components, APIs).

## Phase 2 — Grill + research

**Goal:** stress-test the concept in a focused session; convert fog into explicit decisions and named unknowns.

**Skill:** **`grill-me`** — one question at a time, recommended answer with each, dependency-ordered, captures to `discovery.md` as it goes (resolved decisions, `OQ-*`, `R-*`, out-of-scope).

| Do in grill                     | Defer to gap pass            |
| ------------------------------- | ---------------------------- |
| Structure / IA + adjacency      | Gherkin + Definition of Done |
| Platform matrix                 | NFR numbers, analytics table |
| Resolved / open decision tables | Resilience scenario matrix   |
| Short outcome bullets per story | Requirement IDs, test matrix |

**Research:** when grill, gap pass, or intake hits a gap that desk/comparable/Figma/video research would resolve, **auto-launch `research-spike`** (parallel default; full policy in [letsmake-conventions.md](./letsmake-conventions.md) § Auto-launch research). Research verifies claims against sources, writes conclusions + **proposed changes** to `discovery.md`, and never edits `requirements.md` — the PO adopts proposals via a question in grill or gap pass. Adjacent recommendations outside the original question are proposals too, never silent scope adds.

**Done when:** no unresolved *structural* disagreement; grill capture complete; `R-*` rows queued or done; every deferral has an `OQ-*`/`R-*` id.

## Phase 3 — Gap pass (consolidation)

**Goal:** turn the discovery capture into delivery-ready `requirements.md` with **PO confirmation** — not a silent agent merge.

**Skill:** **`gap-pass`** — Phase A (questions only) → Phase B (SSOT) after PO approval. **Checklists:** [gap-pass-checklist.md](./gap-pass-checklist.md) · PO review: [gap-pass-review.md](./gap-pass-review.md).

> **Already Consolidated?** A wave of PO updates/reversals on an existing doc → **`increment-requirements`** (PDRs, minimal edits, drift lint). One truly narrow edit → `small-change-requirements`. Greenfield → full grill → gap pass.

Why this phase is blocking, in one list — the failure mode it prevents is requirements written without:

- a **scope drop register** with a PO question per item ("out of v1" in discovery is not a decision)
- a coverage matrix built from *this* feature's Musts and prior SSOT
- a regression diff vs discovered prior requirements — or an explicit PO choice to skip it
- a question for every omission, downgrade, or source conflict

### Requirements shape

Write per [requirements-template.md](./requirements-template.md): Overview (one-screen summary) → problem → IA/interaction → Must stories → full MoSCoW → NFR/analytics/a11y (measurable or N/A) → resolved decisions (citing PDRs) → Missing info & clarifications (plain tables).

**Story format (Layer 1)**

```markdown
**Story — [Category]: [Title]**
As a [user], I want [goal] so that [value].

- GIVEN [precondition]
- WHEN [action]
- THEN [observable, measurable outcome — not subjective]

**Acceptance criteria (summary):**
- [Pass/fail bullet agents/QA can execute]

**Definition of Done:** [Concrete verification — QA steps, test intent, analytics, or threshold]
```

**Verifiability gate:** if an agent cannot write a test or QA step from the THEN/DoD, rewrite before Consolidated.

**Document hygiene (mandatory):** no `[FIGMA Δ]`, `[GAP PASS NOTE]`, diff blockquotes, or coverage matrices in requirements — audit history lives in `gap-analysis.md`.

### Testing & analytics intent (BA input, before handoff)

| Area            | BA documents in requirements                            |
| --------------- | ------------------------------------------------------- |
| Analytics v1    | Event names + when fired + key properties               |
| Rollout success | Thresholds, or N/A                                      |
| Resilience      | Scenario table (offline, slow network, rapid actions)   |
| Accessibility   | Must paths without gesture; announcement expectations   |

### ADRs

Create or link an ADR for structural decisions that are hard to reverse; reference from `requirements.md`.

## Phase 3.5 — Scenario hardening

Before Phase 4 on medium/large or agent-built work, run **`scenario-hardening`** → `scenario-matrix.md` beside `requirements.md`. Each row: concrete trigger + expected behavior (halt/degrade/retry/notify/skip/queue/ask) + what an agent would silently assume + follow-up (`Add AC` / `Ask PO` / `Defer(spec)` / `Resolved` / `N/A`). A Must user-visible failure path cannot remain undefined at handoff. Small/low-risk changes may skip with explicit PO N/A.

## Phase 4 — Dev handoff (BA package)

**Goal:** engineering can produce an implementation plan + `spec.md` without re-discovering product rules.

**Skill:** **`dev-handoff`** — verifies the gate below, writes `dev-handoff.md`, seeds `spec.md` from [spec-template.md](./spec-template.md).

**Package:** `requirements.md` (Consolidated) · `design.md` · `brief.md` (context) · ADR links · `spec.md` stub (product summary prefilled, `[ENG]` sections empty) · handoff note:

```markdown
## Dev handoff — [feature]

**SSOT:** docs/epics/{epic}/features/{feature}/requirements.md (YYYY-MM-DD)
**Conflict rule:** requirements.md wins over grill exports or narrative PRDs.

**Ask from engineering:**
- [ ] Codebase map (existing modules touched)
- [ ] spec.md ([ENG] sections: contracts, state, integration points)
- [ ] Implementation plan (phases, risks, flags)
- [ ] Test matrix: Must story → unit / integration / E2E mapped to AC summary + DoD

**Deferred to spec only:** [code-specific unknowns]
**Design pass only:** [visual/motion items]
```

### Dev handoff gate — **canonical Definition of Ready**

Skills and the cheat sheet summarize this table; when in doubt, this version wins.

| Gate                                                                       | Owner     |
| -------------------------------------------------------------------------- | --------- |
| Feature **goals & success** measurable or N/A (PO ok)                      | BA        |
| All Must stories have observable Gherkin + AC summary + DoD                | BA        |
| No subjective-only acceptance ("delightful", "intuitive") on Must          | BA        |
| Won't Have agreed with product (every drop cites a PO decision)            | BA        |
| Platform matrix complete                                                   | BA        |
| NFRs stated or explicitly N/A                                              | BA + Eng  |
| Analytics v1 events listed or N/A                                          | BA + Data |
| Open product questions closed or TBC with owner                            | BA        |
| No Must **TBC** on user-visible behavior without owner                     | BA        |
| Scenario matrix complete or explicitly N/A; blocking rows resolved / owned | BA + PO   |
| `design.md` status aligned                                                 | Design    |
| `spec.md` stub acknowledged                                                | Eng       |
| Lessons applied / new lessons captured                                     | BA        |

**Not required at handoff:** file paths, component names, full test implementation (spec/plan phase).

## Phase 5 — Spec & implementation plan (engineering)

`spec.md` connects requirements to existing code: state model, public contracts, route/deep-link map, persistence keys, module touch list, test seams, implementation plan (phases, flags, risks, rollback). Seed from [spec-template.md](./spec-template.md); engineering fills the `[ENG]` sections. **BA involvement:** answer clarifications; do not fork a second requirements doc.

## Phase 6 — Build & verify (engineering)

Engineering builds against `spec.md` and verifies against the requirements Must stories.

**BA involvement:** acceptance review against Must stories (including TBC resolutions before ship); sign-off on migration/analytics behavior; **change control after Consolidated** — `small-change-requirements` for one narrow edit, `increment-requirements` for a wave of PO updates, and anything hitting the small-change escalation triggers re-opens gap pass, never a silent edit. Append durable learnings to `docs/lessons-learned.md`.

---

## Document hygiene (avoid drift)

| Anti-pattern                                             | Fix                                             |
| -------------------------------------------------------- | ----------------------------------------------- |
| discovery + requirements both "dev SSOT"                 | requirements Consolidated; discovery historical |
| Coverage matrix inside requirements.md                   | Keep in gap-analysis.md only                    |
| PRD with 50+ stories parallel to requirements            | Archive PRD; extract edge cases into appendix   |
| Open questions duplicated across docs with different states | Single Still-open table in the SSOT          |
| spec written before requirements approved                | spec stays stub until Phase 4 gate passes       |

## Skills map

| Phase                        | Skill                                                           |
| ---------------------------- | --------------------------------------------------------------- |
| Intake / transcript          | `intake-synthesize`                                             |
| Grill (captures as it goes)  | `grill-me`                                                      |
| Research                     | `research-spike` (parallel default)                             |
| Gap pass                     | `gap-pass`                                                      |
| Refine a Consolidated doc    | `increment-requirements`                                        |
| Agent-readiness edge pass    | `scenario-hardening`                                            |
| Small change                 | `small-change-requirements`                                     |
| Dev handoff package          | `dev-handoff`                                                   |
| Doc/link/ID health           | `wiki-lint`                                                     |
| Router                       | `which-skill-next`                                              |
| Orchestration                | `letsmake-product-workflow`                                     |

**Optional Linear sync** (one-way docs → Linear) is gated per [letsmake-conventions.md](./letsmake-conventions.md) § Linear sync.
