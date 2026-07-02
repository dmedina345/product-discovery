# Spec: Saved collections

**Epic:** library  
**Feature:** saved-collections  
**Status:** Stub — awaiting engineering  
**Last updated:** 2026-07-02  
**Requirements (SSOT):** [requirements.md](./requirements.md) — Consolidated r2  
**Dev handoff note:** [dev-handoff.md](./dev-handoff.md)  
**Design:** design.md (design pass pending)  
**ADR:** none

**Conflict rule:** `requirements.md` wins on product behavior. This file wins on implementation approach.

---

## Product summary (prefilled — do not edit here)

**In one sentence:** Private collections on top of the existing one-tap save so saved recipes get cooked.

**Must stories:** Collections CRUD · Add/remove a save · Saved tab revamp · Migration (TBC: coachmark copy — Design owns, default provided).

**Won't Have (v1):** sharing (PDR-LIB-001) · smart collections · manual reordering · web create/edit.

**Open TBC items affecting implementation:** OQ-03 collection limits — **spec must state them** with an acceptance note (PO log #2).

---

## Codebase map `[ENG]`

## Navigation / state model `[ENG]`

## Public contracts & integration points `[ENG]`

## Routes, deep links & entry `[ENG]`

_(Product decision: web `/saved`, `/saved/collections/{id}` read-only; no new push/deep-link entries — PO log #7.)_

## Data & persistence `[ENG]`

_(Product constraints: many-to-many save↔collection; delete collection keeps saves; coachmark dismissal persisted across cold starts; collection names retained account lifetime — PR-1.)_

## File / module touch list `[ENG]`

## Test plan `[ENG]`

| Must story | Acceptance criteria (from requirements) | Unit | Integration | E2E / manual |
| ---------- | --------------------------------------- | ---- | ----------- | ------------ |

## Implementation plan `[ENG]`

## Out of scope for implementation

Sharing, smart collections, reordering, web create/edit (requirements § Won't Have).

## Clarifications needed from BA/PO `[ENG]`

| # | Question | Blocking? | Answer (dated) |
| - | -------- | --------- | -------------- |
