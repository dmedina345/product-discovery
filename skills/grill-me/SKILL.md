---
name: grill-me
description: >-
  Interview the user relentlessly, one question at a time, to resolve every
  branch of a plan or design until shared understanding. Use when the user wants
  to stress-test or pressure-test a plan, get grilled, or says "grill me".
---

Interview me relentlessly about every aspect of this plan until we reach a shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one-by-one. For each question, provide your recommended answer.

Ask the questions **one at a time** via **AskQuestion**.

If a question can be answered by exploring the codebase, explore the codebase instead.

**Nav/IA playbook:** [`grill-learnings.md`](../../docs/product/grill-learnings.md) — decision order for navigation/IA-heavy features only

---

## Preflight

1. Read **`docs/lessons-learned.md`** and note applicable conventions in `discovery.md` § Lessons applied.
2. Ensure **`discovery.md`** exists (run **`intake-synthesize`** or copy [`discovery-template.md`](../../docs/product/discovery-template.md)).
3. Refresh `discovery.md` § Agent context map (current phase + read-first docs).
4. Review `discovery.md` § Context inbox for untriaged rows before asking new grill questions.
5. Find existing docs — requirements, brief, design, spec, ADRs, `CONTEXT.md`. Read what exists.
6. If multiple sources **conflict**, summarize in a short table and grill the **blocking fork** first (usually section count/order).
7. If **Figma/design leads**, read `discovery.md` design links; defer visual-only items to design pass.

---

## Session phases (work in order; skip only if user defers)

| Phase                  | Focus                                                           |
| ---------------------- | --------------------------------------------------------------- |
| **1 — Structure**      | What exists, how many, order, default landing                   |
| **2 — Interaction**    | Tap vs swipe, bars, drawers, gestures                           |
| **3 — Platform**       | iOS / Android / web differences, URLs, back stack               |
| **4 — Migration**      | Existing users, coachmarks, tap-first                           |
| **5 — Hardening**      | Deep links, analytics intent, motion                            |
| **6 — Resilience**     | Offline, slow network, shell vs content, low-end                |
| **7 — Code cross-ref** | When codebase exists — reality check before "no open questions" |

After phases 1–3, offer to capture in **`discovery.md`** grill sections. Phases 5–7 may follow in same or later session.

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
2. Sharpen terms; update **`CONTEXT.md`** when a glossary term is resolved.
3. Offer **ADR** only when hard to reverse + surprising + real trade-off.
4. Append row to **`discovery.md`** § Resolved decisions or Open questions.
5. If user introduces a new raw input or idea that is not ready for a decision, append it to § Context inbox and route it later.
6. Move to next dependency.

---

## Research flags

Research is **auto-launched** and **PO-gated** — see [`letsmake-conventions.md`](../../docs/product/letsmake-conventions.md). When you cannot decide in session (needs desk/comparable/Figma/prototype) **or** the user shares a research-worthy idea/link:

1. Add an **`R-*`** row to `discovery.md` § Research backlog (`type`, `blocks`, draft `prompt`).
2. **Auto-launch `research-spike`** in parallel; notify "Started R-{id}: [question]". Unless the user chose **wait**, keep grilling other branches.
3. On completion, surface conclusions + verification + proposed changes; AskQuestion to adopt/reject/defer.

**User override:** **Defer — research** / **decide now** / stop → don't launch; log an OQ or decide in session.

**Epic-adjacent findings:** a related recommendation outside the `R-*` scope → add an **`EAR-*`** row to discovery § Epic-adjacent recommendations (not a silent Must); AskQuestion: adopt here · sibling feature · backlog · ignore.

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
- **Shell vs content split:** keep navigation chrome independent of feed/data load and network state — surface this split explicitly whenever a resilience or NFR row is in play.
- Keep Context inbox current; do not silently promote inbox items to requirements.

---

## Ending

When core branches are resolved, offer:

- **Continue** — pick N high-impact gaps (AskQuestion meta)
- **Stop** — ensure **`discovery.md`** grill sections updated

Do not claim "no open questions" until interaction, platform, resilience touched or **explicitly deferred** (with OQ-id or R-id).

Run a **grill eval** before stopping:

- [ ] Structural decisions captured or OQ-id assigned
- [ ] Context inbox reviewed
- [ ] New research/prototype needs routed
- [ ] No "resolved" item lacks PO answer

**Do not** write Consolidated `requirements.md` — that is **`gap-pass`**.

---

## After grilling

Tell user next steps:

1. **`discovery.md`** is the living capture (handoff.md optional legacy only)
2. Run **`gap-pass`** when ready for SSOT
3. Optional **`research-spike`** for remaining `R-*` rows

Full path: [LetsMake Product Workflow](../../docs/product/letsmake-product-workflow.md)

---

## Anti-patterns

Shared ones (silent merge, story sprawl, launching research without a prompt) live in [`letsmake-conventions.md`](../../docs/product/letsmake-conventions.md). Grill-specific:

- Skipping the structure phase for polish questions
- `CONTEXT.md` used as a spec (it's a glossary only)
- Context inbox ignored at session close
- Prototype signal treated as automatic PO approval
