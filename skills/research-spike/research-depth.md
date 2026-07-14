# Research depth

Depth is a **skill convention** (no Cursor product toggle). Set it on the backlog row or in the user's prompt.

| Depth                | When                                                                                 | Subagent                                                        | Effort                                                    |
| -------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- | --------------------------------------------------------- |
| `quick`              | Narrow fact-check, single comparable, "is X standard?"                               | Explore-style search subagent, background                       | 3–5 sources; discovery summary; digest optional                    |
| `standard` (default) | Default grill/gap spikes                                                             | General background subagent                                     | 5–8 sources; discovery + canvas when renderable, otherwise digest |
| `deep`               | Architecture, competitive landscape, regulatory, multi-vendor, "trust before PO bet" | General background subagent on a high-reasoning model (user's choice), **always background** | 10+ primary sources; discovery + markdown digest; canvas optional |

**Phrase cues:** deep → "thorough", "don't skim", "high confidence", "board-level", "compare 8+". quick → "sanity check", "one comparable", "5-minute look".

## Deep-mode prompt extras (append to the launch Task prompt)

```text
Depth: DEEP
Requirements:
- Min 10 primary sources (official docs, eng blogs, papers — not SEO listicles)
- Sections: Method (what/when/limits) · Findings (cited) · Counter-evidence · Confidence rubric (per claim) · Recommended PO options (2–4)
- If inconclusive: name what additional research would resolve it
Deliverables (deep), in addition to standard:
- Markdown digest: {feature}/research/R-{id}-{slug}.md (prose + canvas link at top when one exists)
- Row in docs/research/canvas-index.md; update discovery pinned "Research artifacts" table
```
