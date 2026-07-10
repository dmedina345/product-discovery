# Worked example — "Saved collections" (fictional Platewise recipe app)

A complete run of the LetsMake Product Workflow on one medium feature, produced by actually executing every skill in order (2026-07-02 dry run). Use it to see what each artifact looks like *filled in* — the shapes matter more than the fictional content.

**The feature:** saved recipes are a flat, unusable list; add private collections without making saving harder.

## Read in this order

| # | File | Produced by | What to notice |
| - | ---- | ----------- | -------------- |
| 1 | [discovery.md](./discovery.md) | `intake-synthesize` → `grill-me` | Destination named up front; a raw marketing ask routed to an OQ and then a decision (never straight to requirements); R-01 auto-launched; grill capture with resolved decisions D1–D8 and honest OQs |
| 2 | [research/R-01-…](./research/R-01-save-collection-comparables.md) | `research-spike` | Verification section (one claim removed as unverified); proposals — **not** merged into requirements; an adjacent idea routed to a sibling feature, not silently adopted |
| 3 | [gap-analysis.md](./gap-analysis.md) | `gap-pass` Phase A | Coverage matrix caught **three gaps the grill missed** (web routes, offline policy, limits); scope-drop register with one always-ask item + a low-risk batch; PO decisions log M1–M10 |
| 4 | [requirements.md](./requirements.md) | `gap-pass` Phase B + `increment-requirements` (r2) | Observable Gherkin + AC + DoD per Must; one `TBC` story with owner + default; Won't Have citing PO log rows + PDR; privacy note (PR-1); Changelog with revision bumps |
| 5 | [decisions.md](./decisions.md) | gap pass + `increment-requirements` | Append-only PDRs; a real **reversal chain** (LIB-004 → superseded by LIB-005); `PDR-OPS-001` logging a manual data intervention |
| 6 | [dev-handoff.md](./dev-handoff.md) + [spec.md](./spec.md) | `dev-handoff` | DoR verified; spec stub with product summary prefilled and `[ENG]` sections empty for engineering |

## Two moments worth studying

- **The checklist earning its keep:** the grill session felt thorough, yet gap-pass rows EN-2/EN-4 (deep links, web routing) and RS-2 (offline) were `MISSING` — each became a PO question and then a decision (PO log #7, #8). That is the silent-scope-loss failure mode being caught mechanically.
- **Lint catching real drift:** the r2 increment changed the picker-search threshold to 8 (PDR-LIB-003) but the Must story still said "more than 6". `wiki-lint`'s contradiction check found it; the fix cited the PDR. `discovery.md` still says 6 — correctly, because discovery is a historical capture and exempt once requirements is Consolidated.

In a real workspace these files live at `docs/epics/{epic}/features/{feature}/` (see [paths.md](../../skills/letsmake-product-workflow/references/paths.md)); they sit flat here only for browsing.
