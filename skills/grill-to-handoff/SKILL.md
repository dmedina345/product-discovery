---
name: grill-to-handoff
description: >-
  Captures grill-me session output into discovery.md (primary). Optionally
  updates legacy handoff.md. Use when grill session ends and user wants
  documentation capture before gap pass.
metadata:
  author: letsmake
  version: 1.2.0
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`).  
**AskQuestion fallback:** if the AskQuestion tool is unavailable in this mode/agent, ask the same single question in plain chat and wait.

# Grill to discovery capture

Update **`discovery.md`** grill sections after a grill-me session. This is a **contract draft**, not dev SSOT (`requirements.md` comes at gap pass).

**Primary template:** [`discovery-template.md`](../letsmake-product-workflow/references/discovery-template.md) § Grill capture  
**Legacy optional:** [`handoff-template.md`](../letsmake-product-workflow/references/handoff-template.md) → `handoff.md` (only if folder already uses it or user asks)

## When to use

- Grill session done; user wants capture before gap pass
- **Do not use** for live grilling → **`grill-me`**
- **Do not use** for small changes → **`small-change-requirements`**
- **Do not use** for Consolidated requirements → **`gap-pass`**

## Inputs

| Input                                        | Required                        |
| -------------------------------------------- | ------------------------------- |
| Epic + feature slug                          | Yes                             |
| Path `docs/epics/{epic}/features/{feature}/` | Yes                             |
| Session date, participants                   | Yes                             |
| `discovery.md`                               | Create from template if missing |
| `brief.md`                                   | Align if present                |

Scaffold the feature folder if missing ([paths.md § Feature folder layout](../letsmake-product-workflow/references/paths.md)).

## Procedure

1. Read/update **`discovery.md`** — fill **Grill capture** sections:
   - Problem, solution summary, IA, platform matrix
   - Draft stories (bullets only — no Gherkin)
   - Resolved decisions + open questions (OQ-ids)
   - UX principles, dependencies
2. Update **Agent context map** with current phase, read-first docs, and authority order.
3. Review **Context inbox** and route each row to resolved decision, `OQ-*`, `R-*`, `EAR-*`, requirement candidate, or archive.
4. Merge any new **`R-*`** research rows and `P-*` prototype/signal rows from session.
5. Run grill/discovery **artifact eval** and append result to `discovery.md` § Artifact eval log.
6. Set discovery **Status:** `Ready for gap pass` only when checklist below passes.
7. **Optional:** If `handoff.md` already exists or user requests legacy file, sync same content to `handoff.md` with status `Draft — superseded by discovery.md for new work`.

## Quality bar

- [ ] IA diagram + section map in discovery
- [ ] At least one **Won't Have**
- [ ] Every Must bullet **observable**
- [ ] Open questions named — not silently resolved
- [ ] Research rows have prompt or flagged for AskQuestion before spike
- [ ] Context inbox has no untriaged blocker
- [ ] Prototype/signal rows have next action
- [ ] Artifact eval is `pass` or only `needs PO` items are explicitly OQ/R/TBC

## Outputs

| File           | Action                              |
| -------------- | ----------------------------------- |
| `discovery.md` | Update grill + open/resolved tables |
| `handoff.md`   | Optional legacy sync                |
| `brief.md`     | Update only if intent changed       |

## Next step

Run **`gap-pass`** → `gap-analysis.md` + AskQuestion → `requirements.md`. Do not silent-merge.

## Anti-patterns

Shared ones (story sprawl, PRD-as-SSOT, closing open questions by guessing) live in [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md). Capture-specific:

- `spec.md` or production file paths in discovery
- Marking ready for gap pass with untriaged context-inbox rows
