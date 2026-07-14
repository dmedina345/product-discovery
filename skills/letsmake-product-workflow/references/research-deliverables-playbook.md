# Research deliverables playbook

**Purpose:** Make research canvases and findings **easy to find and review** during grill, gap pass, and PO review — without hunting chat history or guessing file paths.

**Related:** `research-spike` skill · [`discovery-template.md`](./discovery-template.md)

---

## Why canvases are hard to find today

| Problem               | What happens                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Hidden location**   | Cursor only opens canvases from `~/.cursor/projects/{workspace}/canvases/*.canvas.tsx` — not from `docs/` or repo-root `canvases/`    |
| **Split paths**       | Some spikes write to a repo-root `canvases/` folder by mistake — those files **do not open in Glass** until copied to the Cursor projects folder |
| **Chat-only links**   | Links in chat scroll away; no single bookmark                                                                                         |
| **Mixed link styles** | Relative paths, wrong repo paths, and absolute paths mixed in `discovery.md`                                                          |

---

## Capability-based documentation

Every completed spike updates discovery and the central index. Add a canvas only when the environment can render it; deep research always adds a digest. The research worker writes only the owned digest/canvas and returns `DISCOVERY_PATCH` plus `INDEX_ROW`; the controller validates and applies shared-file closeout writes.

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

### 3. Markdown digest (fallback or deep research)

**File:** `{feature}/research/R-{id}-{slug}.md` (recommended for **deep** spikes)

- One-page summary: question, outcome, recommendation, confidence, sources
- Link to canvas at top when one exists; digest-only is valid
- PO can review in editor/GitHub without opening Glass

---

## Canonical canvas path (mandatory)

Write canvases **only** to the Cursor project's canvases directory (it lives outside the repo):

```text
~/.cursor/projects/<workspace-slug>/canvases/{feature-slug}-research-{slug}.canvas.tsx
```

`<workspace-slug>` is your **absolute workspace path with each separator replaced by `-`** (Windows: drive colon dropped) — e.g. `/Users/you/acme-product` → `Users-you-acme-product`; `C:\Users\you\acme` → `C-Users-you-acme`. Derive the **literal absolute path** for the current workspace and use it in markdown links so they stay clickable in Glass.

**Never write research canvases to:**

- A repo-root `canvases/` folder (**not IDE-visible**)
- `docs/**/canvases/`
- Subfolders under the Cursor `canvases/` directory

If a canvas was written to the wrong place, **copy** it to the canonical path and update the index.

---

## Link format (copy-paste)

Always use a **clickable absolute path** in markdown:

```markdown
[{feature} R-01 {topic}](file:///Users/<you>/.cursor/projects/<workspace-slug>/canvases/{feature-slug}-research-{topic-slug}.canvas.tsx)
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
| R-01 | [short title]                | [open](file:///.../{feature-slug}-research-{topic-slug}.canvas.tsx)    |
| R-03 | [topic]                      | [open](file:///.../{feature-slug}-research-{topic-slug}.canvas.tsx)    |
```

Use the same absolute path as the central index.

---

## Agent closeout checklist (research-spike)

When a spike finishes, the controller performs closeout:

1. [ ] Canvas at canonical path (or copy + delete wrong copy) — digest-only spikes skip this
2. [ ] Row in the index (`{researchIndexPath}`) — digest-only spikes link the digest in the Canvas column
3. [ ] Pinned table + findings § in `discovery.md`
4. [ ] If `depth: deep` → `{feature}/research/R-{id}-*.md` digest
5. [ ] Chat message with **one link per canvas** + outcome + verification one-liner + proposed-changes count
6. [ ] Offer AskQuestion to **adopt/reject/defer proposals** (not to re-approve research)
7. [ ] If `type: video` → transcript saved under `{feature}/research/sources/` and linked in findings

---

## Video sources (YouTube & Loom)

**Script:** workspace `scripts/youtube-transcript.sh` (bash) / `youtube-transcript.ps1` (Windows) · **Prerequisite:** `yt-dlp` on PATH

Supports **YouTube** (`watch`, `youtu.be`, `shorts`, `live`) and **Loom** (`share`, `embed`) URLs.

**Per-feature path:**

```text
{feature}/research/sources/{upload-date}-{title-slug}.md
```

Example: `docs/epics/{epic}/features/{feature}/research/sources/2025-07-07-{video-title-slug}.md`

- Captions only — **no video/audio kept** (temp files deleted)
- Link transcript path + source URL in `discovery.md` findings and optional `R-{id}-*.md` digest
- Treat transcript body like a desk/article source during analysis
- Loom requires a public share/embed URL with transcription enabled

---

## Source verification & proposed changes

Every spike must include in `discovery.md`:

1. **Research findings** — Conclusion, Evidence (cited), **Verification** (claims checked / removed), Confidence
2. **Proposed changes from research** — table of PROPOSED rows (discovery, OQ, requirement candidates, adjacent recommendations)

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

| Part                        | Pattern                                           | Example                                        |
| --------------------------- | ------------------------------------------------- | ---------------------------------------------- |
| Canvas file                 | `{feature-slug}-research-{topic-slug}.canvas.tsx` | `checkout-research-comparable-products.canvas.tsx` |
| Digest                      | `R-{id}-{topic-slug}.md`                          | `R-01-comparable-products.md`                      |
| Gap / architecture canvases | `{program}-gap-analysis.canvas.tsx`               | `acme-2.0-gap-analysis.canvas.tsx`             |

Non-research canvases (gap analysis, architecture) also belong in the **central index** with `Type: gap` or `Type: architecture`.

---

## Migrating misplaced canvases

If a canvas was written outside `{canvasDir}` (e.g. a repo-root `canvases/` folder or under `docs/`), it will **not** open in Glass. Move it to the canonical path:

| File (wrong location)                | Canonical target                |
| ------------------------------------ | ------------------------------- |
| `<repo>/canvases/{name}.canvas.tsx`  | `{canvasDir}/{name}.canvas.tsx` |
| `docs/**/canvases/{name}.canvas.tsx` | `{canvasDir}/{name}.canvas.tsx` |

After moving: update links in `discovery.md` and the canvas index; optionally delete the misplaced copies or replace with a stub README pointing to the index.
