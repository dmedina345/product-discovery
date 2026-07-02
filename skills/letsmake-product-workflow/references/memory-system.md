# Memory system (project knowledge that survives sessions)

**Problem this solves:** agents lose track across chat sessions, re-run research that already exists, invent answers instead of finding them, and decisions get lost in Slack/email/heads. The fix is a small, layered, git-tracked memory with an enforced read order and a **recall-before-rework** rule.

**Templates:** [decision-log-template.md](./decision-log-template.md) · [rules-registry-template.md](./rules-registry-template.md) · [context-map-template.md](./context-map-template.md) · [agents-md-template.md](./agents-md-template.md)

**Where `<project>` files live:** single-product workspace → `context-map.md` at the **workspace root** (next to `AGENTS.md`); `decisions.md` + `rules/` either project-wide at the root or **feature-scoped inside the feature folder** (fine to start feature-scoped and promote cross-feature decisions later). Multi-product workspace → one folder per project.

---

## Four memory types

| Type           | Artifact                                            | Update rule                            |
| -------------- | --------------------------------------------------- | -------------------------------------- |
| **Procedural** | LetsMake skills (how to work)                       | versioned skills                       |
| **Semantic**   | `rules/` registry + `CONTEXT.md` glossary           | overwrite/update in place              |
| **Episodic**   | `decisions.md` (PDRs) + `requirements.md` changelog | **append-only; supersede, never edit** |
| **Working**    | `<project>/context-map.md` (read-first + hot cache) | rewritten each session                 |

**Read order (any agent, before acting):** `AGENTS.md` → `context-map.md` → `rules/` (constitution → product → client → feature) → `decisions.md` (only for the _why_/history) → the relevant `requirements.md` section.

**Authority on conflict:** `requirements.md` (SSOT) > `decisions.md` (PDR) > `rules/` > `discovery.md` / chat. **Do not re-derive a rule from Figma/defaults when one exists.**

---

## Session protocol (why new chats stop breaking things)

- **`AGENTS.md` at the workspace root is the enforcement hook** — Cursor (and other agents following the AGENTS.md standard) load it automatically at session start, so the read order above applies without anyone remembering to paste context. Seed it from [agents-md-template.md](./agents-md-template.md) (the install script creates a stub).
- **Session end:** refresh `context-map.md` § Hot cache (3–6 bullets of what just happened), update per-feature phase lines, and capture any decisions made in chat as PDRs **before closing** — a decision that only exists in chat history is lost.

## Recall before rework (the anti-reinvention rule)

Before launching research, re-deciding a topic, or answering "did we already…":

1. Run **`memory-recall`** — search `decisions.md`, `rules/`, `requirements.md`, `discovery.md` findings, `research/` digests + `sources/` transcripts, the canvas index, and `lessons-learned.md`.
2. **Cite what you find** (PDR/RULE/R-id + path). Only if memory has nothing does a new `research-spike` or AskQuestion launch.
3. A hit that is stale or superseded → say so explicitly (the supersede chain in `decisions.md` shows which answer is current).

## Capture at source (Slack, Miro, Figma, email, meetings)

Do **not** try to index external tools. The rule is: **if it mattered, it lands in the repo with an ID at the moment it matters.**

| It arrives as…                             | Capture as                                                          |
| ------------------------------------------ | ------------------------------------------------------------------- |
| Slack thread / email with a decision       | `PDR-*` in `decisions.md` (link the thread URL as source)           |
| Stakeholder note, article, video, Figma comment | `CI-*` row in discovery § Context inbox → routed (OQ/R/EAR/archive) |
| Meeting/workshop                           | `intake-synthesize` the transcript → discovery sections             |
| **Manual/operational intervention** (a stat updated by hand, a config flipped, a workaround applied) | `PDR-OPS-*` row in `decisions.md` — one line: who, what, why, when |
| Durable preference ("client never wants X") | `RULE-*` citing its source PDR                                      |

Live lookups in external tools stay ad hoc via MCP connectors (Slack, Figma, Linear) — memory is the curated record, not a mirror of every message.

## Multi-user (team / company-wide)

- The memory is **git-tracked markdown** — it scales to a team via normal PRs; every PDR has an owner and a date; conflicts surface as merge conflicts instead of silent overwrites.
- Agents never adjudicate contradictions between people — `wiki-lint` and `increment-requirements` **flag** them; a human resolves via a new PDR.
- Canvases stay per-machine (share via Cursor); everything decision-bearing lives in the repo.

## Retrieval scaling path

1. **Now:** grep/glob over the repo (what `memory-recall` does) + Cursor's built-in codebase indexing/semantic search. IDs (`PDR-*`, `RULE-*`, `R-*`, `OQ-*`) and consistent frontmatter make grep precise.
2. **If a project outgrows that** (hundreds of decisions, multi-repo): add a lightweight index doc per area, or wire a vector/semantic search MCP over `docs/`. Don't build this before grep hurts.

## Maintenance

- **`wiki-lint`** — run periodically or before handoff: broken links, malformed/duplicate IDs, rules citing missing PDRs, superseded chains that don't link, stale statuses.
- **Consolidation (periodic):** distill durable rules from `decisions.md` into `rules/` + `context-map.md`; retire superseded entries — keep the read-first layer small (see `increment-requirements` § Consolidation).
