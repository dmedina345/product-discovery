# AGENTS.md template (workspace read-first pointer)

**Purpose:** `AGENTS.md` at the workspace root is loaded automatically by Cursor (and other agents following the [AGENTS.md standard](https://agents.md/)) at every session start — it is what makes the memory read order survive new chats without anyone pasting context.

Copy everything below the `## TEMPLATE START` heading (strip the marker lines) to the **workspace root** as `AGENTS.md` (the install script seeds a stub). Keep it under a page — link out, don't inline.

---

## TEMPLATE START

# Agent instructions — {Project}

This repo runs the **LetsMake Product Workflow** (skills: `intake-synthesize`, `grill-me`, `grill-to-handoff`, `research-spike`, `memory-recall`, `gap-pass`, `increment-requirements`, `dev-handoff`, `small-change-requirements`, `wiki-lint`). Process docs: `docs/product/`.

## Read first (every session, before acting)

1. `{project}/context-map.md` — current phase per feature, hot cache, do-not-drift list
2. `{project}/rules/` — durable rules (constitution → product → client → feature). **Never re-derive a rule from Figma/defaults when one exists here.**
3. `{project}/decisions.md` — only when you need the _why_/history (PDRs, append-only)
4. The relevant `requirements.md` section

**Authority on conflict:** `requirements.md` (SSOT) > `decisions.md` > `rules/` > `discovery.md` / chat.

## Recall before rework

Before launching research, re-deciding a topic, or answering "did we already…": run **`memory-recall`** (search decisions, rules, requirements, research findings/transcripts, lessons-learned) and **cite what you find**. Only launch new research if memory has nothing.

## Capture before closing

- Decisions made in chat → `PDR-*` row in `decisions.md` (append-only; reversals supersede, never edit)
- Manual/operational interventions → `PDR-OPS-*` row (who, what, why, when)
- Raw inputs (links, notes, videos) → `CI-*` row in the feature's discovery § Context inbox
- Session end → refresh `context-map.md` § Hot cache (3–6 bullets)

## Boundaries

- **PO decides product direction** — agents propose via AskQuestion; no silent merges into `requirements.md` (see `docs/product/letsmake-conventions.md`)
- Research auto-launches in parallel but only ever **proposes** changes

## TEMPLATE END
