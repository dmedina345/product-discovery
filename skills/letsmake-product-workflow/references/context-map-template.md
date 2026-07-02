<!--
TEMPLATE — Context Map (working memory, read-first)
This is the SMALLEST high-signal set an agent reads before acting on a feature.
Rewritten/refreshed each working session (the "hot cache"). Keep it short — link out, don't inline.
-->

# Context map — {Project}

_The workspace `AGENTS.md` (seeded from [agents-md-template.md](./agents-md-template.md)) points every new session here — keep this file current or new chats start cold._

**Read order (any agent, before acting):** this file → `rules/` (constitution → product → client → feature) → `decisions.md` (only if you need the _why_/history) → the relevant `requirements.md` section. Do **not** re-derive rules from Figma/defaults when a rule exists.

**Authority order (on conflict):** `requirements.md` (SSOT) > `decisions.md` (PDR) > `rules/` > `discovery.md` / chat.

---

## Per-feature state

### {Feature} — e.g. For You

- **Phase:** discover / grill / gap / **increment** / handoff
- **SSOT:** `<feature>/requirements.md` (rev rN)
- **Active rules:** `rules/<feature>.md` + `rules/client-preferences.md`
- **Open decisions / TBC:** PDR-FY-019, OQ-F22 (link `decisions.md`)
- **Do-not-drift list (most-violated guardrails):** e.g. text card 340/390, rounded buttons, static icons, Curate in right menu
- **Watch:** Figma node(s), research pending

---

## Hot cache (recent context — refreshed at session end)

> Last refreshed: YYYY-MM-DD. 3–6 bullets of what just happened so the next session opens warm — no recap needed.

- …
