# Findings, proposed-changes, canvas, types

## Writing findings (`discovery.md`)

```markdown
### R-12 — [short title]

**Outcome:** proceed | pivot | kill | inconclusive
**Canvas:** [absolute path link to .canvas.tsx]
**Conclusion:** … (1–3 sentences — what we now believe)
**Recommendation:** … (what PO should consider — not an approved decision)
**Evidence:** … (bullets with source links/paths)
**Verification:** [N] claims checked; [M] downgraded/removed; counter-evidence: …
**Confidence:** high | medium | low — [limits, date, source gaps]
**Still needs PO AskQuestion:** [topic + options for adopting proposals]

**Adjacent (optional):** [recommendation outside the original question + suggested home] → PO disposition pending
```

Return this block inside `DISCOVERY_PATCH`; the controller applies it and sets backlog **Status:** `done` after validating artifacts.

## Proposed changes (`discovery.md` § `## Proposed changes from research`)

Proposals only — gap pass / PO adopt via AskQuestion.

```markdown
### From R-12

| #   | Target                | Proposal                                           | Rationale | Sources | PO disposition |
| --- | --------------------- | -------------------------------------------------- | --------- | ------- | -------------- |
| 1   | discovery § Resolved  | [draft decision text]                              | …         | [links] | pending        |
| 2   | OQ-03                 | Close as … / rewrite to …                          | …         | [links] | pending        |
| 3   | Requirement candidate | **PROPOSED** Must: [title] — Given/When/Then draft | …         | [links] | pending        |
```

Mark every row **PROPOSED** until PO adopts; never copy into `requirements.md`; requirement candidates are gap-pass drafts, not new Must stories. After the PO adopts/rejects/defers a proposal, the controller creates one atomic `GP-RESEARCH-*` row and replaces `pending` with the disposition plus that ID. No proposal remains pending at M9.

## Canvas naming & location

Write **only** to the Cursor project's canvases directory (derive the literal absolute path — see [`research-deliverables-playbook.md`](../letsmake-product-workflow/references/research-deliverables-playbook.md)):

`~/.cursor/projects/<workspace-slug>/canvases/{feature-slug}-research-{slug}.canvas.tsx`

`<workspace-slug>` = the absolute workspace path with separators → `-` (Windows: drive colon dropped, e.g. `C-Users-alice-repo`). Index: workspace `docs/research/canvas-index.md`. Link in chat + discovery with the full absolute path. Never write to the repo-root `canvases/` dir (invisible to Glass).

## Markdown digest fallback

Without a canvas renderer, write `{feature}/research/R-{id}-{slug}.md`, link it from discovery, and append a `digest` row to `docs/research/canvas-index.md` (legacy filename; it indexes all research artifacts). Do not create an empty canvas.

## Types

| Type         | Agent does                                                       |
| ------------ | ---------------------------------------------------------------- |
| `desk`       | Web search, best practices, standards, 3–5 comparables           |
| `comparable` | Feature matrix of competitors / analogues                        |
| `user`       | Research plan (interview questions) — does not run real users    |
| `technical`  | Codebase/docs exploration when repo exists                       |
| `prototype`  | Outline spike scope + success criteria — build only if user asks |
| `figma`      | MCP annotation pass on listed node IDs                           |
| `video`      | Fetch transcript (see video-research.md) → analyze relevance     |
