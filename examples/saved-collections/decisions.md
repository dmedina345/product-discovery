# Decision Log — Saved collections (PDR)

**Purpose:** append-only record of product decisions for this feature. `requirements.md` holds _current truth_; this log holds _why / when / what it replaced_.

## Decision index

| ID          | Title                        | Status     | Date       | Decision (current truth)                                   | Supersedes / -by      | Owner | Links                     |
| ----------- | ---------------------------- | ---------- | ---------- | ----------------------------------------------------------- | --------------------- | ----- | ------------------------- |
| PDR-LIB-001 | Sharing out of v1            | accepted   | 2026-07-02 | Collections private-only in v1; revisit with adoption data | —                     | PO    | req § Won't Have · R-01   |
| PDR-LIB-002 | Offline CRUD policy          | accepted   | 2026-07-02 | Online-only collection CRUD; toast + retry; save never blocked | —                  | PO    | req § Resilience          |
| PDR-LIB-003 | Picker search threshold      | accepted   | 2026-07-02 | Search appears at **> 8** collections (was 6 — usability review) | —                 | PO    | req § Add/remove story    |
| PDR-LIB-004 | Cover images to Must         | superseded | 2026-07-02 | ~~Cover images promoted to Must~~                           | superseded-by LIB-005 | PO    | —                         |
| PDR-LIB-005 | Cover images back to Should  | accepted   | 2026-07-02 | Cover images stay **Should** (eng estimate ballooned)       | supersedes LIB-004    | PO    | req § Should Have         |
| PDR-OPS-001 | Manual saves backfill re-run | accepted   | 2026-07-02 | Support re-ran saves backfill for cohort affected by 6/28 sync bug — counts may shift in Jun analytics | — | Support (logged by PO) | analytics caveat |

## Expanded records (significant / irreversible only)

### PDR-LIB-001 — Sharing out of v1

- **Status:** accepted · **Date:** 2026-07-02 · **Deciders:** PO (marketing consulted)
- **Context:** Marketing asked for shareable collections as a growth loop (Slack note, routed through discovery). R-01 showed organization value is separable from sharing; sharing adds privacy surface + moderation scope.
- **Decision:** Collections are private-only in v1.
- **Alternatives considered:** Share-links read-only (still needs privacy review + web render work) · Full collaboration (out of proportion for v1).
- **Consequences:** No share entry points anywhere in v1 UI.
- **Re-evaluate if:** collection adoption ≥ 30% by day 60 (the goal) — then scope a sharing v2 with marketing.

### PDR-LIB-004 → PDR-LIB-005 — Cover images reversal

- LIB-004 (accepted 2026-07-02 am): promote collection cover images to Must per PO ask.
- LIB-005 (accepted 2026-07-02 pm, **supersedes LIB-004**): revert to Should — eng flagged image-pipeline work; PO chose scope safety. Requirements never shipped the Must version (same-day reversal caught at lint).
