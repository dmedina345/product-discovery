---
name: research-spike
description: >-
  Run desk, comparable, technical, video, or Figma research as a parallel
  background spike. Auto-launches (no approval) when grill, gap pass, or intake
  flags an R-* row or the user shares a research-worthy idea, link, or video;
  proposes changes but never edits requirements.md. Use when an R-* is queued,
  the user says research / compare vendors / Figma annotation pass, or shares a
  video to analyze.
metadata:
  author: letsmake
  version: 1.2.0
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json`; after bootstrap prefer the `{docsProductRoot}` copies (default `docs/product/`).  
**AskQuestion fallback:** if the AskQuestion tool is unavailable in this mode/agent, ask the same single question in plain chat and wait.

# Research spike

Execute a **research row** from `discovery.md` (or an ad-hoc user request) as a **parallel background spike** — launch a background agent unless the user says wait / sequential / blocking.

**Shared rules:** [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md) — research is **PO-gated** (propose, never merge) and **auto-launched** (no approval when context is sufficient).

## When to use

- Grill, gap pass, or intake adds/updates an **`R-*`** → launch immediately (parallel).
- User shares an idea, link, or video that would benefit from research → launch without asking to approve.
- "research this", "compare vendors", "Figma annotation pass", "desk research".
- Parity blocked on dev comments → `R-FIGMA-*`.

## When NOT to use

- User said **no research** / **decide now** / **defer research** this turn.
- Small change path → `small-change-requirements`.

## PO boundary

Research may auto-launch, gather evidence, verify sources, and **propose** changes. It must **not** edit `requirements.md`, set Consolidated, or treat its recommendation as an approved decision. Adoption → AskQuestion in grill or gap pass. (Full rule: [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md).)

## Research packet (required before launch)

| Field                | Required                     | Notes                                                                                                    |
| -------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------- |
| `id`                 | Yes                          | `R-12`, `R-FIGMA-01`                                                                                     |
| `question`           | Yes                          | One sentence                                                                                             |
| `type`               | Yes                          | `desk` · `comparable` · `user` · `technical` · `prototype` · `figma` · `video` (→ findings-templates.md) |
| `prompt` / `context` | **Yes to launch**            | User paste preferred; agent may draft from grill context                                                 |
| `blocks`             | If known                     | Story id, gap row, OQ-id                                                                                 |
| `deliverable`        | Default `canvas` + discovery | `canvas` · `discovery` · `both`                                                                          |
| `depth`              | Default `standard`           | `quick` · `standard` · `deep` → research-depth.md                                                        |
| `parallel`           | Default true                 | false only if user said wait/sequential                                                                  |

### Recall first

Before drafting the packet, run **`memory-recall`** on the question — if a done `R-*`, PDR, or rule already answers it, cite that instead of launching (or narrow the question to the uncovered part).

### Prompt gate (the only blocker to launch)

If `prompt` / `context` is missing or insufficient (no scope, no success criteria, no links for figma/desk): **one AskQuestion** to collect prompt, success criteria, links, deliverable, wait-vs-parallel → update the backlog row → **launch immediately** (no separate "approve spike" step). If context is sufficient, **launch without AskQuestion**.

## Launch

Launch a **background subagent** (parallel default). Full prompt + parallel/sync modes + closeout: **[`launch-prompt.md`](./launch-prompt.md)**. Set the backlog row `Status: running` and notify the user.

## Reference (read on demand)

| Read                                               | When                                                             |
| -------------------------------------------------- | ---------------------------------------------------------------- |
| [`video-research.md`](./video-research.md)         | Source is a YouTube/Loom URL (`type: video`)                     |
| [`research-depth.md`](./research-depth.md)         | Choosing or running `quick` / `standard` / `deep`                |
| [`launch-prompt.md`](./launch-prompt.md)           | Composing the background Task; sync mode; closeout               |
| [`findings-templates.md`](./findings-templates.md) | Writing findings / proposed-changes; canvas path; type behaviors |

**Playbooks:** [`figma-parity-playbook.md`](../letsmake-product-workflow/references/figma-parity-playbook.md) (`type: figma`) · [`research-deliverables-playbook.md`](../letsmake-product-workflow/references/research-deliverables-playbook.md) (canvas indexing). Before any `.canvas.tsx`: read the Cursor **`canvas`** skill (by name) + [`canvas-authoring.md`](../letsmake-product-workflow/references/canvas-authoring.md) (Table = `headers` + `rows[][]`; `CardHeader` children, not `title=`).

## Anti-patterns

- Asking the PO to **approve launching** research when context is sufficient.
- Launching on a **thin prompt** (one AskQuestion first).
- Findings without a **Verification** section, or uncited factual claims.
- Treating a recommendation/proposal as a PO decision (see conventions).
- Empty canvas, invented Table/`CardHeader` API, or canvas outside the Cursor `canvases/` dir.
- Downloading video/audio for a transcript (captions only, via the script).
