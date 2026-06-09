---
name: research-spike
description: >-
  Run desk, comparable, technical, Figma annotation, prototype, or YouTube/video
  research in a parallel background agent. Auto-launches when grill, gap pass, or
  intake flags an R-* row or a gap/idea would benefit from research (no PO launch
  approval). Auto-fetches YouTube captions when a video URL is provided. Verifies
  claims against sources, writes findings + proposed changes to discovery.md and
  optional canvas. Never edits requirements.md. Use when R-* is queued, user shares
  a research-worthy idea, or Figma dev comments need a dedicated pass.
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace. Run `install-letsmake.sh` if config is missing.

# Research spike

Execute a **research row** from `discovery.md` (or ad-hoc user request). **Default: parallel** — launch background agent unless user says wait, sequential, or blocking.

**Before any canvas:** read the Cursor **`canvas`** skill (by name) + [`canvas-authoring.md`](../letsmake-product-workflow/references/canvas-authoring.md) — invalid `Table`/`CardHeader` props render empty; map rows to `headers` + `rows[][]`.

**Playbooks:** [`figma-parity-playbook.md`](../letsmake-product-workflow/references/figma-parity-playbook.md) (`type: figma`) · [`research-deliverables-playbook.md`](../letsmake-product-workflow/references/research-deliverables-playbook.md) (indexing, closeout, deep mode).

---

## When to use

- Grill, gap pass, or intake adds/updates **`R-*`** — **launch immediately** (parallel default) unless user said wait/sequential/defer research
- User shares an idea, link, or gap that would benefit from desk/comparable/technical/video research — **launch without asking to approve the spike**
- User says "research this", "compare vendors", "Figma annotation pass", "desk research"
- Parity blocked on dev comments → `R-FIGMA-*`

## When NOT to use

- User explicitly said **no research**, **decide now**, or **defer research** for this topic in the current turn
- Small change path → `small-change-requirements`

## PO boundary (non-negotiable)

Research **may** auto-launch, gather evidence, verify sources, and **propose** changes.

Research **must not**:

- Edit **`requirements.md`** or set Consolidated status
- Add Must/Won't stories to SSOT without gap pass + PO AskQuestion
- Treat its recommendation as an approved product decision

Product adoption of proposals → **AskQuestion** in grill or gap pass after findings land.

---

## Research packet (required before launch)

| Field                | Required                     | Notes                                                                          |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------ |
| `id`                 | Yes                          | e.g. `R-12`, `R-FIGMA-01`                                                      |
| `question`           | Yes                          | One sentence                                                                   |
| `type`               | Yes                          | `desk` · `comparable` · `user` · `technical` · `prototype` · `figma` · `video` |
| `prompt` / `context` | **Yes to launch**            | User paste preferred; agent may draft from grill context                       |
| `blocks`             | If known                     | Story id, gap row, OQ-id                                                       |
| `deliverable`        | Default `canvas` + discovery | `canvas` · `discovery` · `both`                                                |
| `depth`              | Default **`standard`**       | `quick` · `standard` · **`deep`** — see [Research depth](#research-depth)      |
| `parallel`           | Default **true**             | false only if user said wait/sequential                                        |

### Prompt gate (only blocker to launch)

If `prompt` / `context` is **missing or insufficient** (no scope, no success criteria, no links for figma/desk):

1. **One AskQuestion** to collect prompt, success criteria, links, deliverable, wait vs parallel.
2. Update discovery backlog row with answers.
3. **Launch immediately** after answers — no separate "approve spike" step.

If context is **sufficient** (grill/gap/inbox already has question + type + enough scope): **launch without AskQuestion**.

**Parent agents (discovery-grill, gap-pass, intake-synthesize):** On research-worthy gap or idea → add `R-*`, **invoke this skill in parallel**, notify user research started. Do **not** block on launch approval.

---

## YouTube / video sources

**Prerequisite:** `yt-dlp` installed (`brew install yt-dlp`). Script: YouTube script (see [paths.md](../letsmake-product-workflow/references/paths.md) § YouTube transcript script).

**Use `type: video`** when a YouTube URL/talk is the (or a) source. Parent agent before launch: auto-detect `youtube.com/watch`, `youtu.be/`, `/shorts/`, `/live/`; if the user names a talk without a URL, **one AskQuestion** for the link, then proceed.

### Transcript fetch (inside parallel subagent — do not block parent)

**First step** in the background research Task (before analysis):

```bash
bash "{youtube_script}" \
  --url "{youtube_url}" \
  --out-dir "{feature_folder}/research/sources"
```

Resolve `{youtube_script}` using [paths.md](../letsmake-product-workflow/references/paths.md) § YouTube transcript script (skill-bundled or workspace `scripts/youtube-transcript.sh`).

- **Output:** `{feature}/research/sources/{upload-date}-{title-slug}.md` (YAML frontmatter + plain transcript prose)
- **No video download** — captions only; temp files deleted on exit
- After the source exists, **analyze the transcript like a desk/article source** for relevance to the active feature/epic, then link its path in `discovery.md` findings (and the `R-{id}-{slug}.md` digest if written).

**Captions-first** is the v1 default; **single-video URLs only**. Caption fallback, playlists, duration limits, Whisper policy, and the analysis-section template → [`research-deliverables-playbook.md`](../letsmake-product-workflow/references/research-deliverables-playbook.md) § Video sources.

---

## Research depth

Depth is a skill convention — set on the backlog row or in the user’s prompt (no separate Cursor toggle).

| Depth          | When to use                                                                                       | Subagent                                                                                               | Typical effort                                                |
| -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| **`quick`**    | Narrow fact-check, single comparable, “is X industry standard?”                                   | `explore`, background OK                                                                               | 3–5 sources; discovery summary; canvas optional               |
| **`standard`** | Default grill/gap spikes                                                                          | `generalPurpose`, background OK                                                                        | 5–8 sources; canvas + discovery findings                      |
| **`deep`**     | Architecture, competitive landscape, regulatory, multi-vendor, “need to trust this before PO bet” | `generalPurpose` + **`model: gpt-5.5-high`** (or user-requested thinking model), **always background** | 10+ primary sources; canvas + discovery + **markdown digest** |

For **`deep`** spikes, append the extra prompt requirements (min 10 primary sources; Method / Findings / Counter-evidence / Confidence-rubric / Recommended-PO-options sections; mandatory markdown digest) from [`research-deliverables-playbook.md`](../letsmake-product-workflow/references/research-deliverables-playbook.md) § Deep mode.

**Phrases implying deep:** “deep research”, “thorough”, “don’t skim”, “high confidence”, “board-level”, “compare 8+”. **Implying quick:** “quick sanity check”, “one comparable”, “5-minute look”.

---

## Launch (parallel default)

Use **Task** tool (`generalPurpose` or `explore`, `run_in_background: true`) with prompt containing:

```text
Research spike {id} for {epic}/{feature}

Question: {question}
Type: {type}
Prompt/context: {full user or agent text}
Success criteria: {what decision this unblocks}
Read first: discovery.md, brief.md, lessons-learned.md, relevant requirements sections
Paths: {feature folder}

YouTube (if URL in prompt/context):
1. Run: {youtube_script} --url "{url}" --out-dir "{feature folder}/research/sources"
2. Read the returned .md file; analyze transcript like a desk/article source for feature relevance
3. Cite source URL + saved transcript path in findings

Source verification (mandatory before writing findings):
- Every factual claim must cite a primary source (URL, official doc, transcript path, codebase path)
- Downgrade or remove claims you cannot verify; mark confidence high/medium/low per major claim
- Section: Verification — claims checked vs sources; counter-evidence; anything removed as unverified

Deliverables:
1. discovery.md § Research findings for {id} — outcome, recommendation, verification (template: discovery-template.md § Research findings)
2. discovery.md § Proposed changes from research for {id} — PROPOSED rows only (template: discovery-template.md § Proposed changes from research)
3. Route by-products: EAR-* (epic-adjacent), CI-* (raw input), Artifact eval row (pass / needs PO / needs cleanup)
4. If canvas: write ONLY to {canvasDir}/{feature-slug}-research-{slug}.canvas.tsx — follow canvas-authoring.md; real data, no empty sections; never repo-root canvases/ or docs/
5. For figma type: follow figma-parity-playbook; record node IDs + annotation quotes + tool used
6. Run the research-deliverables-playbook § Closeout checklist (index row, pinned table, chat link)
7. Return: summary, verification one-liner, proposed-changes list, suggested AskQuestion options for adopting proposals (not for re-approving research)

Do NOT edit requirements.md (gap pass owns SSOT). Proposals only.
```

Update backlog row **Status:** `running` → notify user research started in parallel.

**Parent agent:** Continue grill/gap AskQuestion loop on **product** questions unless user chose to wait for research.

When background task completes, surface summary + verification + canvas link + **proposed changes** + AskQuestion to adopt/reject/defer each proposal (not to re-approve the spike).

**Closeout (mandatory):** Follow [`research-deliverables-playbook.md`](../letsmake-product-workflow/references/research-deliverables-playbook.md) checklist — index row, discovery pinned table, chat link with absolute path.

---

## Synchronous mode

Only when user explicitly says **wait**, **blocking**, or **sequential**:

- Run research inline (no Task) or Task with `run_in_background: false`
- Complete findings before next product AskQuestion on blocked topic

---

## Findings & proposed changes (discovery.md)

Use the templates in [`discovery-template.md`](../letsmake-product-workflow/references/discovery-template.md):

- **§ Research findings** — Outcome, Conclusion, Recommendation, Evidence (cited), **Verification** (claims checked/removed + counter-evidence), Confidence, Still-needs-PO. Set backlog **Status:** `done`.
- **§ Proposed changes from research** — table of rows targeting discovery / OQ / requirement candidates / gap-analysis / EAR. Mark every row **PROPOSED**; PO adopts via AskQuestion in grill/gap pass. **Never** copy into `requirements.md`.

## Canvas naming & location

Write only to `{canvasDir}/{feature-slug}-research-{slug}.canvas.tsx` (e.g. `checkout-research-comparable-products.canvas.tsx`), link by absolute path, and append a row to `{researchIndexPath}`. Full rules → research-deliverables-playbook.

---

## Types

| Type         | Agent does                                                               |
| ------------ | ------------------------------------------------------------------------ |
| `desk`       | Web search, best practices, standards, 3–5 comparables                   |
| `comparable` | Feature matrix competitors / analogues                                   |
| `user`       | Research plan (interview questions) — does not run real users            |
| `technical`  | Codebase/docs exploration when repo exists                               |
| `prototype`  | Outline spike scope, success criteria — implementation only if user asks |
| `figma`      | MCP annotation pass on listed node IDs                                   |
| `video`      | Fetch YouTube transcript (script) → analyze relevance for feature/epic   |

---

## Anti-patterns

- Asking PO to **approve launching** when context is sufficient (auto-launch); or launching with a thin prompt (one AskQuestion first)
- Editing `requirements.md`, or treating a proposal/recommendation as a PO decision without AskQuestion
- Findings without **Verification** or with uncited factual claims (hallucination risk)
- Invented Table API (`columns`, object `rows`) or `CardHeader title=`; empty canvas; canvas outside `{canvasDir}`; skipping the index update
- Downloading video/audio instead of captions; blocking the parent on transcript fetch
- Letting a video/article insight become scope without CI/OQ/R/EAR routing

---

## After research

Offer **AskQuestion** to adopt/reject/defer each **proposed change** (and EAR-\* rows). Link row to **TBC** story or open question if PO defers. Do **not** ask again whether research should have run.
