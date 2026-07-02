# Discovery: Saved collections

**Epic:** library  
**Feature:** saved-collections  
**Status:** Ready for gap pass  
**Last updated:** 2026-07-02  
**Track:** Standard

**Figma:** none yet  
**Design:** design.md (not started)

**Research index (workspace):** `docs/research/canvas-index.md` (workspace path — this example sits flat)

---

## Agent context map

**Current phase:** Gap pass (grill complete 2026-07-02)

**Read first**

1. `discovery.md` (§ Grill capture, § Research findings)
2. `docs/lessons-learned.md`

**Authority**

| Artifact          | Role                             | Authority                     |
| ----------------- | -------------------------------- | ----------------------------- |
| `requirements.md` | Consolidated SSOT after gap pass | Wins for dev handoff          |
| `discovery.md`    | Living capture                   | Historical after Consolidated |
| `gap-analysis.md` | Audit + PO log                   | Explains decisions; not SSOT  |

**Ignore unless asked:** none

---

## Context inbox

| ID    | Source                          | Why it matters                                | Related area | Status      | Next action                              |
| ----- | ------------------------------- | ---------------------------------------------- | ------------ | ----------- | ---------------------------------------- |
| CI-01 | Marketing Slack note (PO paste) | Shareable collections could be a growth loop   | scope        | triaged     | → OQ-02 → decided in grill (D6): Won't v1 candidate — confirm at gap pass |
| CI-02 | PO mention: Pinterest boards video (no URL) | Comparable pattern for collections | R-01         | synthesized | folded into R-01 (done)                  |

---

## Research canvases — quick open

| ID   | Title                       | Outcome | Canvas                                              |
| ---- | --------------------------- | ------- | ---------------------------------------------------- |
| R-01 | Save/collection comparables | done    | none — [digest](./research/R-01-save-collection-comparables.md) |

---

## Brief summary (Layer 0.5)

**What & why:** Saved recipes are a flat reverse-chron list; 40% of saves are never revisited and users screenshot recipes instead. Add collections and revamp the Saved tab so saved recipes get cooked.

**Target users:** Home cooks who save 10+ recipes (core weekly-active segment).

**MoSCoW (titles only)**

| Must                                   | Should                     | Won't (v1)                          |
| -------------------------------------- | -------------------------- | ----------------------------------- |
| Create / rename / delete collections   | Suggested collection names | Shareable/collaborative collections |
| Add / remove a save to collections     | Collection cover images    | Smart/auto collections              |
| Revamped Saved tab (collections first) |                            | Collection reordering (manual sort) |

**Goals & success (draft)**

| Goal                        | Metric / observable                    | Target (draft)  |
| --------------------------- | --------------------------------------- | --------------- |
| Saved recipes get revisited | % of saves opened again within 30 days  | 40% → 55%       |
| Collections adopted         | % of saving users with ≥1 collection    | ≥ 30% by day 60 |
| Save flow not degraded      | Saves per WAU                           | no decline >5%  |

**References:** PO brief paste (2026-07-02); marketing Slack note (CI-01)

---

## Lessons applied

- [2026-07-02] File is the starter template — no team lessons yet.

---

## Research backlog

| ID   | Question                                                                 | Type       | Prompt / context                                     | Blocks           | Owner | Status | Deliverable        | Depth    |
| ---- | ------------------------------------------------------------------------ | ---------- | ----------------------------------------------------- | ---------------- | ----- | ------ | ------------------ | -------- |
| R-01 | How do leading apps structure saving + collections?                      | comparable | Compare Pinterest / Instagram / YouTube: default "all saves" vs folders-only, multi-membership, private vs shared. | OQ-01, OQ-02, IA | PO    | done   | discovery + digest | standard |

---

## Research findings

### R-01 — Save/collection comparables

**Outcome:** proceed  
**Canvas:** none (no-Glass environment) — [digest](./research/R-01-save-collection-comparables.md)  
**Conclusion:** Two dominant models. **Instagram model:** every save lands in an automatic "All" pool; collections are optional, private-only organization on top — preserves one-tap save. **Pinterest model:** board-first — choosing a board is part of saving; boards are shareable/public-capable — higher save friction, stronger organization. A documented failure mode in both: the collection picker becomes an unusable long list as collections grow.  
**Recommendation:** Adopt the Instagram model (default "All saves" + optional collections) — it protects the existing one-tap save and matches "organize later" behavior; design the collection picker for scale (recents-first + search) from day one. Sharing is not required for the organization value.  
**Evidence:**
- Instagram saves land in a general "All" pool first, then optionally into named, private collections — [TNW](https://thenextweb.com/news/how-to-use-instagram-collections), [iPhoneLife](https://www.iphonelife.com/content/how-to-organize-your-saved-instagram-photos-pinterest-board)
- Pinterest saving is board-centric; boards livable in profile § Saved, public or secret — [Pinterest Create](https://create.pinterest.com/product-features/how-to-create-boards/)
- Long collection-picker lists are a known UX failure — [UX case study](https://medium.com/@somyakaushik0911/fixing-instagrams-saved-feature-a-ux-journey-33a3014fd9eb)

**Verification:** 3 claims checked against sources above. Removed as unverified: YouTube playlist default behavior (no primary source found this pass) — not load-bearing for the recommendation. Counter-evidence: Pinterest's board-first friction is *intentional* for their curation-led product; Platewise's save is utility-led, so the analogy favors Instagram's model.  
**Confidence:** medium-high — patterns confirmed by multiple sources; no first-party metrics.  
**Still needs PO AskQuestion:** adopt/reject proposals 1–4 below.  
**Eval:** pass — question answered, sources cited, one claim removed as unverified.

---

## Proposed changes from research

### From R-01

| #   | Target                | Proposal                                                                          | Rationale                        | Sources | PO disposition |
| --- | --------------------- | ---------------------------------------------------------------------------------- | -------------------------------- | ------- | -------------- |
| 1   | IA / discovery § Resolved | Default **"All saves"** pool + collections as optional layer (Instagram model) | Preserves one-tap save           | R-01    | **adopted** (D2) |
| 2   | Requirement candidate | A save can belong to **multiple** collections                                      | Standard across comparables      | R-01    | **adopted** (D3) |
| 3   | Requirement candidate | Collection picker: recents-first + search once > 6 collections                     | Known long-list failure mode     | R-01    | **adopted** (D4) |
| 4   | OQ-02                 | Collections **private-only in v1**; sharing is a separable later layer             | Organization value ≠ sharing     | R-01    | **adopted** (D6) — final confirm at gap pass |

---

## Epic-adjacent recommendations (from research)

| ID     | Source R-\* | Recommendation                                                        | Suggested home | PO disposition |
| ------ | ----------- | ---------------------------------------------------------------------- | -------------- | -------------- |
| EAR-01 | R-01        | Screenshot-detection "save this recipe?" prompt (screenshots signal intent) | sibling feature (capture) | pending — disposition at gap pass |

---

## Prototype / signal loop

_(none — grid density resolved in grill without prototype)_

---

## Artifact eval log

| Date       | Artifact  | Eval | Issues                                   | Next action |
| ---------- | --------- | ---- | ----------------------------------------- | ----------- |
| 2026-07-02 | discovery | pass | Won't Have empty until grill; OQs honest  | grill-me    |
| 2026-07-02 | research  | pass | 1 claim removed (unverified YouTube)      | adopt in grill |
| 2026-07-02 | discovery (grill capture) | pass | OQ-03 owner assigned; ready for gap pass | gap-pass |

---

## Grill capture (workshop / AskQuestion session)

**Session date:** 2026-07-02  
**Participants:** PO (Dani), agent

### Problem (user + business)

**User voice:** "I save recipes all week but when it's time to cook I can never find them — so I screenshot instead."

**Business problems:**

1. 40% of saves never revisited within 30 days (analytics, Jun 2026)
2. Screenshotting bypasses the app at the highest-intent moment (cook time)

### Solution summary

Keep one-tap save exactly as-is; every save lands in **All saves**. Add optional, private **collections** a save can belong to (0..n). Revamp the Saved tab: collections grid on top, All saves list beneath. Migration: existing saves simply become the All saves pool — no forced sorting. Sharing, smart collections, and manual reordering are explicitly out of v1.

### Information architecture

```text
Saved (tab)
├── Collections (grid, alphabetical; "+ New" tile first)
│   └── Collection detail (recipe list; add/remove; rename/delete in ⋯ menu)
└── All saves (reverse-chron list — the existing behavior, unchanged)
```

| Position | Name              | Type    | Default?              | Notes                                  |
| -------- | ----------------- | ------- | --------------------- | -------------------------------------- |
| top      | Collections grid  | primary | shown; empty-state row if none | "+ New" always first tile     |
| below    | All saves list    | primary | yes (scroll target)   | unchanged from today                   |
| overlay  | Collection picker | sheet   | —                     | recents-first; search appears at > 6   |

**Platform matrix**

| Platform | Collections CRUD | Picker sheet | Notes                                   |
| -------- | ---------------- | ------------ | ---------------------------------------- |
| iOS      | yes              | yes          | long-press save = quick-add to collection |
| Android  | yes              | yes          | same; system back closes sheet           |
| Web      | read + open      | no           | read-only in v1 (create/edit on mobile)  |

### Stories (draft — bullets only)

**Must — Collections: Create/rename/delete**

- User can create a collection from Saved tab and from the picker; rename/delete from collection detail
- Deleting a collection never deletes the saves in it

**Must — Collections: Add/remove a save**

- Post-save toast offers "Add to collection"; picker is recents-first with search at > 6 collections
- A save can belong to multiple collections; removing from a collection keeps it in All saves

**Must — Saved tab revamp**

- Collections grid above All saves; All saves behavior unchanged
- Empty state teaches collections without blocking the list

**Must — Migration**

- Existing saves appear in All saves untouched; no forced migration step; one-time dismissible coachmark

**Won't Have (v1)**

- Shareable / collaborative collections (CI-01 → OQ-02 → D6)
- Smart/auto collections (rule-based or AI grouping)
- Manual reordering of collections or items (alphabetical / recency only)
- Web create/edit (read-only web in v1)

### Resolved decisions (discovery)

| #  | Date       | Topic         | Decision                                                                 |
| -- | ---------- | ------------- | ------------------------------------------------------------------------ |
| D1 | 2026-07-02 | Save gesture  | One-tap heart save unchanged; collection assignment is always optional/afterward |
| D2 | 2026-07-02 | IA model      | Instagram model: automatic **All saves** + optional collections (adopts R-01 #1) |
| D3 | 2026-07-02 | Membership    | A save can live in 0..n collections (adopts R-01 #2)                     |
| D4 | 2026-07-02 | Picker        | Recents-first; search once > 6 collections (adopts R-01 #3)              |
| D5 | 2026-07-02 | Saved tab     | Collections grid on top, All saves beneath; no separate sub-tabs         |
| D6 | 2026-07-02 | Sharing       | Private-only in v1 (adopts R-01 #4); marketing ask deferred — revisit post-launch |
| D7 | 2026-07-02 | Migration     | No forced sorting; saves land in All saves; single dismissible coachmark |
| D8 | 2026-07-02 | Web           | Read-only (view collections + All saves); create/edit mobile-only in v1  |

### Open questions

| ID    | Topic     | Question                                                    | Owner  | Resolution path |
| ----- | --------- | ------------------------------------------------------------ | ------ | --------------- |
| OQ-03 | Limits    | Max collections per user / recipes per collection (abuse + perf) | Eng lead | defer to spec with acceptance note (gap pass to confirm) |
| OQ-04 | Analytics | Final event names for save→collection funnel                 | Data   | gap pass § Analytics |

### UX principles

- Saving never gets harder — organization is always optional and afterward
- Deleting containers never deletes content
- The old behavior (flat list) remains reachable in one scroll

### Dependencies & assumptions (draft)

- Assumes saves service supports many-to-many labels (eng to confirm at spec)
- No design file yet — design pass follows gap pass (visual polish only)

---

## Gap pass pointer

When ready: run **`gap-pass`** → `gap-analysis.md` (audit) → `requirements.md` (Consolidated).
