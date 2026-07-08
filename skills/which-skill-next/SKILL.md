---
name: which-skill-next
description: >-
  Ask which LetsMake skill or workflow step fits your situation. A router over
  the product-discovery skill pack — use when you are unsure what to run next.
disable-model-invocation: true
metadata:
  author: letsmake
  version: 1.0.0
---

# Which skill next?

You do not remember every skill — ask.

**Canonical workflow:** [`letsmake-product-workflow.md`](../letsmake-product-workflow/references/letsmake-product-workflow.md) · **Cheat sheet:** [`cheat-sheet.md`](../letsmake-product-workflow/references/cheat-sheet.md)

## The main flow: idea → dev handoff

The route most medium/large product work travels:

```text
intake-synthesize → grill-me (+ parallel research-spike) → gap-pass → scenario-hardening → dev-handoff
```

Engineering then owns `spec.md` and build. Do **not** skip `gap-pass` on grill- or design-led features.

### Context hygiene

Keep intake → grill → gap pass in **one context window** when possible so synthesis builds on the same thinking. Start fresh sessions at natural phase breaks (after gap pass, before dev handoff) if the window is full.

---

## Pick your on-ramp

| Starting situation                                  | Skill / action                                                                                                                                                                                                                                                                    |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Chat paste, transcript, workshop notes, rough brief | **`intake-synthesize`**                                                                                                                                                                                                                                                           |
| "Grill me" / stress-test a plan                     | **`grill-me`**                                                                                                                                                                                                                                                                    |
| End of grill — capture to discovery                 | **`grill-to-handoff`**                                                                                                                                                                                                                                                            |
| Unsure which track (small vs standard vs spike)     | **`intake-synthesize`** or read [`small-change-process.md`](../letsmake-product-workflow/references/small-change-process.md)                                                                                                                                                      |
| Copy tweak, one surface, bug-level behavior         | **`small-change-requirements`**                                                                                                                                                                                                                                                   |
| Figma leads; parity before Consolidated             | **Design-first** path + [`figma-parity-playbook.md`](../letsmake-product-workflow/references/figma-parity-playbook.md)                                                                                                                                                            |
| Idea unvalidated                                    | **`research-spike`** first, then grill                                                                                                                                                                                                                                            |
| Huge / foggy effort — destination not visible yet   | **`intake-synthesize`** (name destination + sketch fog) → **`grill-me`** breadth-first; use `discovery.md` § Not yet specified / Out of scope; optional Linear map per [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md) § Linear sync |

### No-fog early exit

If intake or a breadth-first grill finds **no significant fog** — destination clear, scope fits one session, small-change escalation triggers false — route to **`small-change-requirements`** or short grill → **`gap-pass`**. AskQuestion; do not force full scaffolding.

---

## Mid-flow decisions

| Situation                                                         | Skill                           |
| ----------------------------------------------------------------- | ------------------------------- |
| Ready to consolidate discovery → SSOT                             | **`gap-pass`**                  |
| Consolidated `requirements.md` needs a PO wave (PDRs, rules, OQs) | **`increment-requirements`**    |
| Requirements Consolidated; agent-built or failure-path-heavy      | **`scenario-hardening`**        |
| Definition of Ready check + handoff package                       | **`dev-handoff`**               |
| Doc/link/ID health, contradiction flags                           | **`wiki-lint`**                 |
| Orchestrate the full path                                         | **`letsmake-product-workflow`** |

---

## Memory and prior decisions

**Do not guess.** Before re-researching or re-deciding, query **OKF Brain** via the `user-okf-brain` MCP:

1. **`ask`** — grounded answer with concept citations, or explicit `NOT_IN_BRAIN`
2. **`search`** — find concepts by text/type/tag when you know the topic but not the path
3. **`get_concept`** / **`get_related`** — follow a cited path or decision lineage

Cite what Brain returns. If `NOT_IN_BRAIN`, fall back to local SSOT read order: `context-map.md` → `rules/` → `decisions.md` → `requirements.md` → `discovery.md` research findings. Only then launch **`research-spike`** or AskQuestion.

Record new decisions via Brain **`log_decision`** (PDR) or through **`gap-pass`** / **`increment-requirements`** in the repo SSOT.

---

## Research

| Trigger                                                | Skill                                    |
| ------------------------------------------------------ | ---------------------------------------- |
| Desk / comparable / Figma / video / prototype research | **`research-spike`** (parallel default)  |
| YouTube / Loom URL                                     | **`research-spike`** + transcript script |
| "Did we already research X?"                           | **OKF Brain `ask`** first                |

Research **proposes**; PO **adopts** via AskQuestion in grill or gap pass. Research never edits `requirements.md`.

---

## Chat phrases

- _"Which skill next?"_ / _"Where do I start?"_
- _"LetsMake intake this into {feature}"_
- _"Grill me on {topic}"_
- _"Gap pass {feature} into requirements"_
- _"Did we already decide {topic}?"_ → OKF Brain
- _"Dev handoff {feature}"_
