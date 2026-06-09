---
name: discovery-grill
description: >-
  Interviews the user relentlessly about a plan or design until shared
  understanding, resolving each branch of the decision tree, then captures the
  session into discovery.md and marks it ready for gap pass. Auto-launches
  parallel research-spike when beneficial; updates discovery.md (and optional
  CONTEXT.md glossary) inline. Use to stress-test a plan, get grilled, say "grill
  me", or capture a finished grill before gap pass.
---

> **Heritage:** extends Matt Pocock's [`grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) skill (the relentless one-question-at-a-time interview). This `discovery-grill` variant adds the AskQuestion loop, domain-adaptive phases, auto-launched research, and capture/closeout into `discovery.md`. Still triggers on "grill me".

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace. Run `install-letsmake.sh` if config is missing.

Interview the user relentlessly about every aspect of this plan until you reach shared understanding. Walk each branch of the decision tree, resolving dependencies one-by-one, and recommend an answer per question. Ask **one question at a time** via **AskQuestion**. If a question is answerable by exploring the codebase, explore instead.

**Playbook:** [grill-learnings.md](../letsmake-product-workflow/references/grill-learnings.md) · consumer copy: `{docsProductRoot}/grill-learnings.md`

---

## Preflight

1. Read **`{lessonsLearnedPath}`** and note applicable conventions in `discovery.md` § Lessons applied.
2. Ensure **`discovery.md`** exists (run **`intake-synthesize`** or copy [`discovery-template.md`](../letsmake-product-workflow/references/discovery-template.md)).
3. Refresh `discovery.md` § Agent context map (current phase + read-first docs).
4. Review `discovery.md` § Context inbox for untriaged rows before asking new grill questions.
5. Find existing docs — requirements, brief, design, spec, ADRs, `CONTEXT.md`. Read what exists.
6. If multiple sources **conflict**, summarize in a short table and grill the **blocking fork** first (usually section count/order).
7. If **Figma/design leads**, read `discovery.md` design links; defer visual-only items to design pass.

---

## Session phases (work in order; skip only if user defers)

Default phase set below suits **UI / information-architecture** features. **Adapt the focus to the domain** — keep the dependency order, swap the examples (see _Phases by domain_).

| Phase                  | Focus (UI/IA example — adapt per domain)                               |
| ---------------------- | ---------------------------------------------------------------------- |
| **1 — Structure**      | What exists, how many, order, default entry point                      |
| **2 — Interaction**    | How users/clients act on it — tap vs swipe, bars, drawers, gestures    |
| **3 — Surfaces**       | Platform/consumer differences — iOS / Android / web, URLs, back stack  |
| **4 — Migration**      | Existing users/data, coachmarks, backward compatibility                |
| **5 — Hardening**      | Deep links, analytics intent, motion, versioning                       |
| **6 — Resilience**     | Offline, slow network, errors, partial failure, shell vs content, load |
| **7 — Code cross-ref** | When codebase exists — reality check before "no open questions"        |

After phases 1–3, offer to capture in **`discovery.md`** grill sections. Phases 5–7 may follow in same or later session.

### Phases by domain (keep the order; replace phases 1–5 focus)

| Domain                        | Phases 1–5 focus                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **UI / IA** (default)         | structure → interaction → surfaces/platform → migration → hardening                                                |
| **API / service**             | resources & contract → request/response & errors → auth & rate limits → versioning & compatibility → observability |
| **Data / pipeline / ML**      | sources & schema → transforms & quality → lineage & SLAs → evaluation/metrics → backfill & reprocessing            |
| **Workflow / ops / internal** | actors & states → actions & transitions → permissions & audit → integrations → failure & recovery                  |

Phases 6 (Resilience) and 7 (Code cross-ref) apply to every domain.

---

## Question UI

Use **AskQuestion** for every grill question.

**Per turn:**

1. State which **phase / branch** you are resolving (one sentence).
2. Call AskQuestion with **exactly one** question.
3. Wait for the answer.

**AskQuestion shape:**

- `prompt`: question + **Recommended:** one-line preferred answer
- `options`: 3–5 choices including recommended (prefix `Recommended: `)
- Include **Something else — I'll explain** when needed
- On doc conflict: name sources in prompt

**Answer options should include when relevant:**

- Must v1 · Won't v1 · Later epic · **TBC** · Defer — open question · Defer — design · **Defer — research** (`R-*`)

**After each answer:**

1. Confirm in one sentence.
2. Sharpen terms; when a glossary term is resolved, record it in the **optional** `CONTEXT.md` glossary — a simple `| Term | Definition |` table at the program/repo root — or in `discovery.md` if your team keeps no glossary file.
3. Offer **ADR** only when hard to reverse + surprising + real trade-off.
4. Append row to **`discovery.md`** § Resolved decisions or Open questions.
5. If user introduces a new raw input or idea that is not ready for a decision, append it to § Context inbox and route it later.
6. Move to next dependency.

---

## Research flags (mandatory behavior)

When you **cannot decide in session** (needs desk/comparable/Figma/prototype research) **or the user shares a research-worthy idea or link**:

1. Add an **`R-*`** row to `discovery.md` § Research backlog (`type`, `blocks`, draft `prompt`).
2. **Auto-launch `research-spike`** in parallel and notify: “Started R-{id} in background: [question].” Do **not** ask to approve the spike — unless the prompt is too thin (research-spike asks once) or the user chose **Defer — research** / **wait** this turn.
3. Keep grilling other branches while it runs; on completion, surface conclusions + verification + proposed changes and **AskQuestion to adopt/reject/defer** (not to re-approve research).

**User override:** **Defer — research**, **decide now**, or stop/wait → don’t launch; log OQ or decide in session.

**Epic-adjacent findings:** a related recommendation outside the original `R-*` scope (e.g. a feedback affordance from a feed study) → add an **`EAR-*`** row to discovery § Epic-adjacent recommendations (never a silent Must) and AskQuestion: adopt here · sibling feature · backlog · ignore.

---

## Prototype / signal flags

When a question is difficult to judge in prose (interaction feel, information density, trust, onboarding, high-risk UX):

1. Add a `P-*` row to `discovery.md` § Prototype / signal loop with hypothesis and proposed signal source.
2. AskQuestion before creating/building anything: **Prototype now** · **Research first** · **Decide in grill** · **TBC**.
3. Treat prototype results as evidence only; convert findings to AskQuestion options, `OQ-*`, `R-*`, or requirement candidates.

---

## During the session

- **Stress-test scenarios** for fuzzy relationships (edge cases).
- **Flag scope creep** when answers add sections/platforms/integrations.
- **Migration:** tap-first discovery for UX changes.
- **Challenge glossary:** terms conflicting with `CONTEXT.md`.
- Keep Context inbox current; do not silently promote inbox items to requirements.

---

## Ending

When core branches are resolved, offer **Continue** (pick N high-impact gaps via AskQuestion meta) or **Stop**. Do not claim "no open questions" until interaction, platform, and resilience are touched or **explicitly deferred** (with OQ-id or R-id). **Do not** write Consolidated `requirements.md` — that is **`gap-pass`**.

---

## Capture & closeout

To finalize the session for gap pass, fill the **§ Grill capture** sections of `discovery.md` ([`discovery-template.md`](../letsmake-product-workflow/references/discovery-template.md)) — problem, solution summary, IA + section map, platform matrix, draft stories (bullets, **no Gherkin**), resolved decisions, open questions (OQ-ids), UX principles, dependencies. Then:

1. Refresh **Agent context map** (phase, read-first docs, authority order) and confirm Context inbox, `R-*`, and `P-*` rows are routed.
2. Run the discovery **artifact eval** → append `pass` / `needs PO` / `needs cleanup` to § Artifact eval log.
3. Set discovery **Status: `Ready for gap pass`** only when the quality bar holds.
4. **Optional legacy:** if `handoff.md` exists or the user asks, sync the same content to `handoff.md` ([`handoff-template.md`](../letsmake-product-workflow/references/handoff-template.md)) with `Status: Draft — superseded by discovery.md for new work`.

**Quality bar (all must hold):**

- [ ] IA diagram + section map captured
- [ ] At least one **Won't Have**
- [ ] Every Must bullet **observable**; no "resolved" item lacks a PO answer
- [ ] Open questions named — not silently resolved
- [ ] Research rows have a prompt or were auto-launched
- [ ] Context inbox / prototype rows have a next action
- [ ] Artifact eval is `pass` (or `needs PO` items are explicit OQ/R/TBC)

Discovery grill capture is a **contract draft**, not dev SSOT.

---

## After grilling

Next steps: **`discovery.md`** is the living capture (legacy `handoff.md` optional only); run **`gap-pass`** for SSOT; optional **`research-spike`** for remaining `R-*` rows. Full path: [LetsMake Product Workflow](../letsmake-product-workflow/references/letsmake-product-workflow.md).

---

## Anti-patterns

- Silent merge into requirements.md
- 50+ "As a user" stories in discovery
- Launching research without prompt/context
- Skipping structure phase for polish questions
- CONTEXT.md as spec (glossary only)
- Context inbox ignored at session close
- Prototype signal treated as automatic PO approval
