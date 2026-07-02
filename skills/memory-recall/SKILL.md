---
name: memory-recall
description: >-
  Search the project's memory — decisions.md PDRs, rules registry,
  requirements, discovery findings, research digests and transcripts,
  lessons-learned — before re-researching or re-deciding anything. Use when
  asked "did we decide/research/discuss X", before launching a research spike
  on a possibly-covered topic, or when context from a past session is missing.
metadata:
  author: letsmake
  version: 1.2.0
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`).

# Memory recall

Answer "what do we already know / what did we decide" **from the repo's memory, with citations** — instead of re-running research or inventing an answer. Full memory model: [`memory-system.md`](../letsmake-product-workflow/references/memory-system.md).

## When to use

- "Did we decide / research / discuss X?" · "Why is it like this?" · "Who changed X?"
- **Before launching `research-spike`** on a topic that may already be covered
- A new session needs context on a feature (read-first plus targeted search)
- Reconciling an external claim ("Slack says we agreed…") against the record

## When NOT to use

- Memory searched and empty → `research-spike` (new evidence) or AskQuestion (new decision)
- Making or changing a decision → `increment-requirements` / `gap-pass` (this skill is read-only)

## Search order (stop when answered, cite as you go)

| # | Where | What it answers |
| - | ----- | --------------- |
| 1 | `<project>/context-map.md` | current state, do-not-drift list, hot cache |
| 2 | `<project>/rules/*.md` | durable rules/preferences (`RULE-*`) |
| 3 | `<project>/decisions.md` (+ feature `decisions.md`) | decisions + why + supersede chain (`PDR-*`) |
| 4 | `{feature}/requirements.md` (§ Resolved decisions, § Missing info, Changelog) | current product truth |
| 5 | `{feature}/discovery.md` (§ Research findings, § Resolved decisions, § Context inbox, § EAR) | grill answers, research outcomes, routed raw inputs |
| 6 | `{feature}/gap-analysis.md` § PO decisions log | gap-pass session answers |
| 7 | `{feature}/research/R-*.md` + `research/sources/*` + `{researchIndexPath}` | research digests, transcripts, canvases |
| 8 | `docs/lessons-learned.md` · `CONTEXT.md` | conventions, terminology |

**Technique:** grep for IDs (`PDR-`, `RULE-`, `R-`, `OQ-`, `EAR-`) and topic keywords (+ synonyms and product terms from `CONTEXT.md`); glob feature folders under `{featureDocsRoot}`; check sibling features in the same epic. Use the workspace semantic search if available.

## Output contract

- **Found:** the answer + citations (`PDR-XX-004`, `rules/client.md RULE-CL-002`, `R-07 digest`, path + section). If superseded, say what replaced it and cite the chain.
- **Partially found:** what's known, what's missing, and the recommended next step (`research-spike` R-\* draft or AskQuestion).
- **Not in memory:** say so explicitly — "no PDR, rule, or research covers this" — then offer to launch `research-spike` or log an `OQ-*`. **Never present a guess as a recall result.**

## Anti-patterns

- Re-running research that a `done` R-\* already answered (cite it instead)
- Answering from general knowledge and presenting it as project memory
- Treating a **superseded** PDR as current (follow the chain)
- Trusting an external claim ("Slack said…") over the record without flagging the conflict for the PO
