# Research deliverables playbook

**Purpose:** Make research canvases and findings **easy to find and review** during grill, gap pass, and PO review — without hunting chat history or guessing file paths.

**Related:** [`research-spike`](../../skills/research-spike/SKILL.md) skill · [`discovery-template.md`](./discovery-template.md)

---

## Why canvases are hard to find today

| Problem               | What happens                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Hidden location**   | Cursor only opens canvases from `~/.cursor/projects/{workspace}/canvases/*.canvas.tsx` — not from `docs/` or repo-root `canvases/`    |
| **Split paths**       | Some spikes wrote to `General/canvases/` by mistake — those files **do not open in Glass** until copied to the Cursor projects folder |
| **Chat-only links**   | Links in chat scroll away; no single bookmark                                                                                         |
| **Mixed link styles** | Relative paths, wrong repo paths, and absolute paths mixed in `discovery.md`                                                          |

---

## Three-layer documentation (use all three)

Every completed research spike (`R-*` with canvas deliverable) must update **all three**:

### 1. Central index (repo SSOT for links)

**File:** [`docs/research/canvas-index.md`](../research/canvas-index.md)

- Git-tracked, searchable, one table for the whole workspace
- Agent **must append a row** when a canvas is created or moved
- PO opens this file first for “what research do we have?”

### 2. Feature discovery (context + outcome)

**File:** `{feature}/discovery.md`

- **Pin table at top** (below header): “Research canvases — quick open”
- Full write-up in **Research findings** § per `R-*`
- Use **absolute markdown links** to `.canvas.tsx` (see format below)

### 3. Optional markdown digest (review without Glass)

**File:** `{feature}/research/R-{id}-{slug}.md` (recommended for **deep** spikes)

- One-page summary: question, outcome, recommendation, confidence, sources
- Link to canvas at top
- PO can review in editor/GitHub without opening Glass

---

## Canonical canvas path (mandatory)

Write canvases **only** to the Cursor project's canvases directory (it lives outside the repo):

```text
~/.cursor/projects/<workspace-slug>/canvases/{feature-slug}-research-{slug}.canvas.tsx
```

`<workspace-slug>` is your **absolute workspace path with each `/` replaced by `-`** — e.g. workspace `/Users/you/Documents/General` → slug `Users-you-Documents-General`. Derive the **literal absolute path** for the current workspace and use it in markdown links so they stay clickable in Glass.

**Never write research canvases to:**

- `General/canvases/` (repo root — **not IDE-visible**)
- `docs/**/canvases/`
- Subfolders under the Cursor `canvases/` directory

If a canvas was written to the wrong place, **copy** it to the canonical path and update the index.

---

## Link format (copy-paste)

Always use a **clickable absolute path** in markdown:

```markdown
[for-you R-01 comparable feeds](file:///Users/<you>/.cursor/projects/<workspace-slug>/canvases/for-you-research-comparable-feeds.canvas.tsx)
```

In chat, agents must include the same link when surfacing completed research.

**Open in Glass:** Click the link in the editor or ask the agent: _“Open the R-01 research canvas.”_ (uses `open_resource` on the `.canvas.tsx` path.)

---

## Discovery.md — pinned quick-open block

Add immediately after the discovery header (update as rows complete):

```markdown
## Research canvases — quick open

| ID   | Title                        | Canvas                                                                 |
| ---- | ---------------------------- | ---------------------------------------------------------------------- |
| R-01 | Comparable anchor+pick feeds | [open](file:///Users/.../for-you-research-comparable-feeds.canvas.tsx) |
| R-03 | Same-day refresh             | [open](file:///Users/.../for-you-research-same-day-refresh.canvas.tsx) |
```

Use the same absolute path as the central index.

---

## Agent closeout checklist (research-spike)

When a spike finishes:

1. [ ] Canvas at canonical path (or copy + delete wrong copy)
2. [ ] Row in [`canvas-index.md`](../research/canvas-index.md)
3. [ ] Pinned table + findings § in `discovery.md`
4. [ ] If `depth: deep` → `{feature}/research/R-{id}-*.md` digest
5. [ ] Chat message with **one link per canvas** + outcome + verification one-liner + proposed-changes count
6. [ ] Offer AskQuestion to **adopt/reject/defer proposals** (not to re-approve research)
7. [ ] If `type: video` → transcript saved under `{feature}/research/sources/` and linked in findings

---

## Video sources (YouTube & Loom)

**Script:** [`scripts/youtube-transcript.sh`](../../scripts/youtube-transcript.sh) · **Prerequisite:** `brew install yt-dlp`

Supports **YouTube** (`watch`, `youtu.be`, `shorts`, `live`) and **Loom** (`share`, `embed`) URLs.

**Per-feature path:**

```text
{feature}/research/sources/{upload-date}-{title-slug}.md
```

Example: `docs/epics/primary-app/features/for-you/research/sources/2025-07-07-how-i-make-apps-feel-10x-better-5-design-secrets.md`

- Captions only — **no video/audio kept** (temp files deleted)
- Link transcript path + source URL in `discovery.md` findings and optional `R-{id}-*.md` digest
- Treat transcript body like a desk/article source during analysis
- Loom requires a public share/embed URL with transcription enabled

---

## Source verification & proposed changes

Every spike must include in `discovery.md`:

1. **Research findings** — Conclusion, Evidence (cited), **Verification** (claims checked / removed), Confidence
2. **Proposed changes from research** — table of PROPOSED rows (discovery, OQ, requirement candidates, gap-analysis notes, EAR-\*)

Research **must not** edit `requirements.md`. Gap pass merges only **PO-adopted** proposals.

---

| Reviewer goal                  | Start here                                                     |
| ------------------------------ | -------------------------------------------------------------- |
| All research across workspace  | [`docs/research/canvas-index.md`](../research/canvas-index.md) |
| Research for one feature       | `{feature}/discovery.md` → pinned table                        |
| Decision without opening Glass | `{feature}/research/R-*.md` digest                             |
| Full interactive charts/tables | Click canvas link → opens beside chat                          |

---

## Naming conventions

| Part                        | Pattern                                           | Example                                        |
| --------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| Canvas file                 | `{feature-slug}-research-{topic-slug}.canvas.tsx` | `for-you-research-comparable-feeds.canvas.tsx` |
| Digest                      | `R-{id}-{topic-slug}.md`                          | `R-01-comparable-feeds.md`                     |
| Gap / architecture canvases | `{program}-gap-analysis.canvas.tsx`               | `messenger-4-gap-analysis.canvas.tsx`          |

Non-research canvases (gap analysis, architecture) also belong in the **central index** with `Type: gap` or `Type: architecture`.

---

## Migrating misplaced canvases

Known repo-root copies (move to canonical path):

| File (wrong location)                                                | Canonical target                   |
| -------------------------------------------------------------------- | ---------------------------------- |
| `General/canvases/for-you-research-same-day-refresh.canvas.tsx`      | `~/.cursor/projects/.../canvases/` |
| `General/canvases/for-you-research-completion-thresholds.canvas.tsx` | same                               |

After copy: update links in `discovery.md` and `canvas-index.md`; optionally delete repo-root copies or replace with a stub README pointing to the index.
