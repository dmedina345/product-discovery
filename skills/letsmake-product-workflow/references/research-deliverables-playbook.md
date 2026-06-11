# Research deliverables playbook

**Purpose:** Make research canvases and findings **easy to find and review** during grill, gap pass, and PO review — without hunting chat history or guessing file paths.

**Related:** `research-spike` skill · [`discovery-template.md`](./discovery-template.md)

---

## Why canvases are hard to find today

| Problem               | What happens                                                                                                                        |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Hidden location**   | Cursor only opens canvases from `~/.cursor/projects/{workspace}/canvases/*.canvas.tsx` — not from `docs/` or repo-root `canvases/`  |
| **Split paths**       | Some spikes write to a repo-root `canvases/` folder by mistake — those files **do not open in Glass** until copied to `{canvasDir}` |
| **Chat-only links**   | Links in chat scroll away; no single bookmark                                                                                       |
| **Mixed link styles** | Relative paths, wrong repo paths, and absolute paths mixed in `discovery.md`                                                        |

---

## Three-layer documentation (use all three)

Every completed research spike (`R-*` with canvas deliverable) must update **all three**:

### 1. Central index (repo SSOT for links)

**File:** `{researchIndexPath}` (default `docs/research/canvas-index.md`)

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

**Write only here:**

```text
{canvasDir}/{feature-slug}-research-{slug}.canvas.tsx
```

**Never write research canvases to:**

- A repo-root `canvases/` folder (**not IDE-visible**)
- `docs/**/canvases/`
- Subfolders under the Cursor `canvases/` directory

If a canvas was written to the wrong place, **copy** it to the canonical path and update the index.

---

## Link format (copy-paste)

Always use a **clickable absolute path** in markdown:

```markdown
[R-01 comparable products]({canvasDir}/{feature-slug}-research-comparable-products.canvas.tsx)
```

In chat, agents must include the same link when surfacing completed research.

**Open in Glass:** Click the link in the editor or ask the agent: _“Open the R-01 research canvas.”_ (uses `open_resource` on the `.canvas.tsx` path.)

---

## Discovery.md — pinned quick-open block

Keep near the top of `discovery.md` — the template places it right after § Context inbox. Update as rows complete:

```markdown
## Research canvases — quick open

| ID   | Title               | Canvas                                                                           |
| ---- | ------------------- | -------------------------------------------------------------------------------- |
| R-01 | Comparable products | [open](file:///Users/.../{feature-slug}-research-comparable-products.canvas.tsx) |
| R-03 | [topic]             | [open](file:///Users/.../{feature-slug}-research-{topic}.canvas.tsx)             |
```

Use the same absolute path as the central index.

---

## Agent closeout checklist (research-spike)

When a spike finishes:

1. [ ] Canvas at canonical path (or copy + delete wrong copy)
2. [ ] Row in the canvas index (`{researchIndexPath}`)
3. [ ] Pinned table + findings § in `discovery.md`
4. [ ] If `depth: deep` → `{feature}/research/R-{id}-*.md` digest
5. [ ] Chat message with **one link per canvas** + outcome + verification one-liner + proposed-changes count
6. [ ] Offer AskQuestion to **adopt/reject/defer proposals** (not to re-approve research)
7. [ ] If `type: video` → transcript saved under `{feature}/research/sources/` and linked in findings

---

## Video sources (YouTube)

**Script:** `youtube-transcript.sh` / `youtube-transcript.ps1` — resolve per [paths.md § YouTube transcript script](./paths.md) · **Prerequisite:** `yt-dlp` on PATH

**Per-feature path:**

```text
{feature}/research/sources/{upload-date}-{title-slug}.md
```

Example: `docs/epics/{epic}/features/{feature}/research/sources/2025-07-07-{video-title-slug}.md`

- Captions only — **no video/audio kept** (temp files deleted)
- Link transcript path + YouTube URL in `discovery.md` findings and optional `R-{id}-*.md` digest
- Treat transcript body like a desk/article source during analysis

### Limits & policy (v1)

| Topic       | Rule                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| Captions    | **Captions-first** — fast, free, good for talks/tutorials. English manual captions preferred over auto.             |
| No captions | Report in findings; suggest pasting a transcript or a different source. (Whisper transcription is not in v1.)       |
| Playlists   | **Single video URLs only** — playlist-only links fail with a clear message. `&list=` + `v=` fetches that one video. |
| Duration    | Warn if > 1h; still proceed.                                                                                        |
| Whisper     | Only add if you routinely hit no-caption videos (needs audio download + compute; delete audio after).               |

### Analysis sections (treat transcript like an article)

| Section in findings | Content                                           |
| ------------------- | ------------------------------------------------- |
| Relevance           | High / medium / low for the current feature — why |
| Key ideas           | Bullets tied to the discovery problem/solution    |
| Applicable patterns | What to adopt, adapt, or reject                   |
| EAR-\*              | Epic-adjacent ideas outside current scope         |
| Source link         | YouTube URL + path to saved transcript file       |

---

## Deep mode (append to the research Task prompt)

When a spike's `depth` is **`deep`** (architecture, competitive landscape, regulatory, multi-vendor, "must trust before a PO bet"), append:

```text
Depth: DEEP

Requirements:
- Minimum 10 primary sources (official docs, engineering blogs, papers — not SEO listicles alone)
- Section: Method (what you searched, date, limits)
- Section: Findings (structured, cited)
- Section: Counter-evidence / disagreements
- Section: Confidence rubric (high/medium/low per claim)
- Section: Recommended PO options (2–4 concrete choices)
- If inconclusive after first pass: note what additional research would resolve it

Deliverables (deep, in addition to standard):
1. Canvas at the canonical path (required unless user said discovery-only)
2. Markdown digest: {feature}/research/R-{id}-{slug}.md (full prose summary + canvas link at top)
```

Run `deep` spikes **always in background**, typically on a high-reasoning/thinking model when the user requests one (use whatever model the user prefers — do not hardcode a model id).

---

## Source verification & proposed changes

Every spike must include in `discovery.md`:

1. **Research findings** — Conclusion, Evidence (cited), **Verification** (claims checked / removed), Confidence
2. **Proposed changes from research** — table of PROPOSED rows (discovery, OQ, requirement candidates, gap-analysis notes, EAR-\*)

Research **must not** edit `requirements.md`. Gap pass merges only **PO-adopted** proposals.

---

| Reviewer goal                  | Start here                                                     |
| ------------------------------ | -------------------------------------------------------------- |
| All research across workspace  | `{researchIndexPath}` (default `docs/research/canvas-index.md`) |
| Research for one feature       | `{feature}/discovery.md` → pinned table                        |
| Decision without opening Glass | `{feature}/research/R-*.md` digest                             |
| Full interactive charts/tables | Click canvas link → opens beside chat                          |

---

## Naming conventions

| Part                        | Pattern                                           | Example                                            |
| --------------------------- | ------------------------------------------------- | -------------------------------------------------- |
| Canvas file                 | `{feature-slug}-research-{topic-slug}.canvas.tsx` | `checkout-research-comparable-products.canvas.tsx` |
| Digest                      | `R-{id}-{topic-slug}.md`                          | `R-01-comparable-products.md`                      |
| Gap / architecture canvases | `{program}-gap-analysis.canvas.tsx`               | `{program}-gap-analysis.canvas.tsx`                |

Non-research canvases (gap analysis, architecture) also belong in the **central index** with `Type: gap` or `Type: architecture`.

---

## Migrating misplaced canvases

If a canvas was written outside `{canvasDir}` (e.g. a repo-root `canvases/` folder or under `docs/`), it will **not** open in Glass. Move it to the canonical path:

| File (wrong location)                | Canonical target                |
| ------------------------------------ | ------------------------------- |
| `<repo>/canvases/{name}.canvas.tsx`  | `{canvasDir}/{name}.canvas.tsx` |
| `docs/**/canvases/{name}.canvas.tsx` | `{canvasDir}/{name}.canvas.tsx` |

After moving: update links in `discovery.md` and `canvas-index.md`; optionally delete the misplaced copies or replace with a stub README pointing to the index.
