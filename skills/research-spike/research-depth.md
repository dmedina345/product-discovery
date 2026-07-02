# Research depth

Depth is a **skill convention** (no Cursor product toggle). Set it on the backlog row or in the user's prompt.

| Depth                | When                                                                                 | Subagent                                                        | Effort                                                    |
| -------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- | --------------------------------------------------------- |
| `quick`              | Narrow fact-check, single comparable, "is X standard?"                               | `explore`, background                                           | 3–5 sources; discovery summary; canvas optional           |
| `standard` (default) | Default grill/gap spikes                                                             | `generalPurpose`, background                                    | 5–8 sources; canvas + discovery findings                  |
| `deep`               | Architecture, competitive landscape, regulatory, multi-vendor, "trust before PO bet" | `generalPurpose` + `model: gpt-5.5-high`, **always background** | 10+ primary sources; canvas + discovery + markdown digest |

**Phrase cues:** deep → "thorough", "don't skim", "high confidence", "board-level", "compare 8+". quick → "sanity check", "one comparable", "5-minute look".

## Deep-mode prompt extras (append to the launch Task prompt)

```text
Depth: DEEP
Requirements:
- Min 10 primary sources (official docs, eng blogs, papers — not SEO listicles)
- Sections: Method (what/when/limits) · Findings (cited) · Counter-evidence · Confidence rubric (per claim) · Recommended PO options (2–4)
- If inconclusive: name what additional research would resolve it
Deliverables (deep), in addition to standard:
- Markdown digest: {feature}/research/R-{id}-{slug}.md (prose + canvas link at top)
- Row in docs/research/canvas-index.md; update discovery pinned "Research canvases" table
```
