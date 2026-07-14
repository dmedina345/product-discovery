---
name: grill-me
description: >-
  Interview the user relentlessly, one question at a time, to turn a fuzzy
  product idea into explicit decisions and named unknowns. Use when the user
  wants to stress-test or pressure-test a concept or plan, or says "grill me".
metadata:
  author: letsmake
  version: 2.1.0
---

# Grill me

Interview the user relentlessly about their product idea until you reach shared understanding. Walk down each branch of the design tree, resolving dependencies between decisions one by one. Ask **one question at a time** (via AskQuestion where available; plain chat otherwise) and provide your recommended answer with every question.

The output of a grill session is not agreement — it is an explicit record: decisions made, questions still open, research still needed. Fog is allowed to remain; unnamed fog is not.

## Facts vs decisions

Every question is one or the other:

- **Facts** you look up, never ask: the codebase, existing docs (`discovery.md`, requirements, ADRs), prior decisions — or a parallel `research-spike` for external questions. Never present general knowledge as project truth.
- **Decisions** belong to the user: ask, recommend, wait. Never resolve a decision yourself, even when the answer seems obvious.

Unsure which one a question is? Treat it as a decision.

## Before you start

Read what exists: `discovery.md` (run `intake-synthesize` first if there is nothing), plus any brief, designs, or prior requirements in the feature folder. Confirm its `Authority mode: real | simulated-po`; label simulated answers evaluation-only. If two sources conflict, that conflict is your first question.

Then map the fog: sweep the whole space breadth-first — who it's for, what it is, what it is not, how it behaves, where it runs, what can go wrong — and rank the branches by how load-bearing and how fuzzy they are. If nothing is foggy (destination clear, open items already sharp, scope fits one session), say so and offer `gap-pass` or `small-change-requirements` instead of grilling for its own sake.

## Question craft

**Order by dependency, fuzziest load-bearing branch first.** Don't ask about interaction detail while structure is unsettled; don't ask about edge cases while scope is open. Later branches often dissolve when an earlier one is decided.

Each question should:

- **Attack an assumption, not collect a preference.** "You've been assuming X — is that decided, or inherited?"
- **Be concrete.** Stress-test with a specific scenario ("a returning user opens this on a slow connection — what do they see first?"), not a category ("what about errors?").
- **Force a choice.** Offer 3–5 real options, mark your recommendation and say why. Include defer options (open question · needs research · design decides · not in v1) when deferring is legitimate.
- **Follow the answer.** An answer that contradicts an earlier one → surface it immediately. A vague answer ("both", "later", "should be fine") → push back once with the cost of not deciding, then log it as open rather than nagging.

Flag scope creep as it happens: when an answer quietly adds a platform, a surface, or an integration, name it and ask whether it is in.

## Capture as you go

After each answer: confirm in one sentence, record it, move to the next dependency — don't batch capture to the end.

- Decision made → `discovery.md` § Resolved decisions
- Genuinely open → § Open questions (`OQ-*`)
- Needs external evidence → § Research backlog (`R-*`) and auto-launch `research-spike` in parallel; keep grilling other branches while it runs (findings are proposals — the user adopts them here or in gap pass)
- Beyond the destination → § Out of scope, with why

## Stopping

Stop when the load-bearing branches are resolved or explicitly parked — not when questions run out (they never do). Before stopping, verify: no decision recorded without an actual user answer; no fog left unnamed; every deferral has an `OQ-*`/`R-*` id. Then point at the next step: **`gap-pass`** consolidates discovery into `requirements.md` — never write requirements directly from a grill.

## Anti-patterns

- Two questions in one turn, or a question a file could have answered
- Working a fixed checklist top-down instead of following the fog
- Polish questions while structure is unresolved
- Accepting "both / later / TBD" without naming the cost once
- Ending with implicit agreements — anything not written down didn't happen

---

> Credit: the core interview stance — relentless, one question at a time, recommend an answer, facts are looked up while decisions belong to the user — is Matt Pocock's [grilling](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) skill. This version adapts it to product discovery and the LetsMake capture flow.
