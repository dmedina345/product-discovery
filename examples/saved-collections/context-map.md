# Context map — Platewise

_The workspace `AGENTS.md` points every new session here._

**Read order (any agent, before acting):** this file → feature `rules/` → feature `decisions.md` (only for the _why_) → the relevant `requirements.md` section.

**Authority order (on conflict):** `requirements.md` (SSOT) > `decisions.md` (PDR) > `rules/` > `discovery.md` / chat.

---

## Per-feature state

### saved-collections (epic: library)

- **Phase:** dev handoff (Consolidated r2, 2026-07-02)
- **SSOT:** `docs/epics/library/features/saved-collections/requirements.md` (r2)
- **Active rules:** `…/saved-collections/rules/feature.md` (RULE-LIB-001, -002)
- **Open decisions / TBC:** OQ-03 limits (spec, eng lead) · coachmark copy (design)
- **Do-not-drift list:** save is always one tap; delete collection ≠ delete saves; no share entry points (RULE-LIB-002); picker search at > 8 (PDR-LIB-003)
- **Watch:** design pass pending; spec stub with engineering

---

## Hot cache (recent context — refreshed at session end)

> Last refreshed: 2026-07-02.

- Gap pass done in one session; caught web routes, offline policy, limits (grill had missed them)
- Increment r2: picker threshold 6→8 (PDR-LIB-003); cover-images Must reversed same day (LIB-004→LIB-005)
- PDR-OPS-001: Jun analytics counts shifted by support backfill re-run — caveat any Jun save metrics
- Next: engineering fills spec `[ENG]` sections; design pass for coachmark copy
