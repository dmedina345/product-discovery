---
name: intake-synthesize
description: >-
  Turn a brief, chat paste, transcript, or workshop notes into discovery.md
  sections and recommend a workflow track. Use at feature kickoff, before grill,
  or when the user dumps a pile of context.
metadata:
  author: letsmake
  version: 2.1.0
---

**Paths:** [paths.md](../letsmake-product-workflow/references/paths.md) + `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`). Ask via AskQuestion where available, plain chat otherwise.

# Intake synthesize

Bootstrap `discovery.md` from unstructured input — a rough brief, chat export, transcript, or workshop notes — and recommend which track the work should take. Synthesize honestly: unknowns become open questions, not confident-sounding filler. Do **not** write requirements; that is `gap-pass`.

**Template:** [discovery-template.md](../letsmake-product-workflow/references/discovery-template.md)

## When to use

- User pastes a chat export, transcript, workshop notes, or rough brief
- New feature kickoff before grill; "where do I start?" with a pile of context

**Not for:** consolidating requirements (`gap-pass`) · live grilling (`grill-me`) · an already-scoped narrow change (`small-change-requirements`).

## Procedure

1. **Name the destination and authority.** Write the destination plus `Authority mode: real | simulated-po`. Use `simulated-po` only for explicit evaluations/dry runs; its approvals are evaluation-only and never synthesize Engineering acceptance.
2. **Read prior work.** Scan the epic for existing requirements or discovery docs and read `docs/lessons-learned.md` — don't re-invent context that already exists in the repo.
3. **Confirm the epic/feature slug** and scaffold the feature folder ([paths.md § Feature folder layout](../letsmake-product-workflow/references/paths.md)) if missing.
4. **Fill discovery from the template**, honestly:
   - **Brief summary** — what & why, target users, MoSCoW titles, draft goals
   - **Problem / solution draft** where inferable from the input
   - **Open questions** (`OQ-*`) — name what you don't know; an empty table on a fuzzy input is a red flag
   - **Not yet specified** — in-scope fog too dim to ticket yet · **Out of scope** — ruled out, with why
   - **Research backlog** — obvious `R-*` rows; auto-launch `research-spike` when the prompt is sufficient (one question to sharpen it if thin)
5. **Recommend a track** and say why:

| Track            | When                                                                             |
| ---------------- | -------------------------------------------------------------------------------- |
| **Small change** | Narrow input, all [small-change-process.md](../letsmake-product-workflow/references/small-change-process.md) escalation triggers false |
| **Design-first** | Figma/mockups lead; note design links, point at the parity playbook              |
| **Standard**     | Brief → `grill-me` → `gap-pass`                                                  |
| **Spike-only**   | Idea unvalidated; research first, grill when findings land                       |

6. **Next step, stated explicitly:** `grill-me` (standard) · `research-spike` already running (spike-only) · `gap-pass` (design-led with a requirements draft) · `small-change-requirements` (no-fog exit — confirm with one question).

Ask at most one clarifying question before writing (missing slug, or genuinely can't pick a track); otherwise write first and flag doubts as open questions.

## Anti-patterns

- Writing `requirements.md` from intake — nothing skips the gap pass on grill/design-led work
- Skipping the Destination line (scope drift follows)
- An empty open-questions table because unknowns were silently guessed
- Ignoring prior SSOT in the same epic
