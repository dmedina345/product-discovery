# Grill session learnings

Distilled from past grill sessions on information-architecture-heavy features. Use when updating the **`discovery-grill`** skill or facilitating IA-heavy work. Examples below are illustrative — adapt them to your product's domain.

---

## What worked

1. **AskQuestion one-at-a-time** — crisp decisions; recommended answer in prompt + options shortens debate.
2. **Root dependency first** — section count/order before top bar, migration, polish. Skipping caused rework ("4 sections" vs "2 + overlay").
3. **Confirm → record → next** — one-sentence confirmation after each answer keeps the decision log honest.
4. **Terminology sharpening** — "center" → "default home"; "Account" vs "Profile/Menu overlay". Update `CONTEXT.md` inline when resolved.
5. **Explicit doc comparison** — conflict table across sources before merging avoids silent scope creep.
6. **Phased passes** — structure → interaction → platform → migration → hardening/resilience → code cross-ref.
7. **Shell vs content split** — navigation chrome independent of feed load/network; critical for NFR rows.
8. **Sparse ADRs** — only when hard to reverse, surprising, and a real trade-off.

---

## What hurt

1. **Multiple docs without SSOT** — three sources diverged; menu "out of scope" in one, fully designed in another.
2. **Stories before IA agreed** — encoded wrong section model early.
3. **"Open questions: none" too early** — blocked resilience/code passes.
4. **Code cross-ref skipped** — requirements may not match implementable reality; schedule explicit pass before Consolidated when code exists.
5. **Silent merge to requirements** — fixed by **gap-pass** + AskQuestion (General).

---

## Decision-tree order (navigation / IA features)

1. Section inventory and count (canvas vs overlay)
2. Left-to-right order and default landing
3. Tap affordances (top bar pattern)
4. Overlay/drawer patterns (not on canvas)
5. Gesture rules and platform exceptions
6. Migration for existing users
7. Deep links and URLs
8. Platform parity (web, Android back)
9. Resilience (mounting, offline, low-end)
10. Analytics and rollout metrics

When a step needs **desk research or comparables** before deciding, flag **`R-*`** in `discovery.md` and invoke **`research-spike`** (parallel by default).

---

## AskQuestion patterns

- Prefix blocking conflict: "Doc A says X, Doc B says Y…"
- Always include **"Something else — I'll explain"**
- Meta-question: Continue grilling / good enough / pick N high-impact gaps
- Defer options: **TBC** · open question · defer to design · defer to research (`R-*`)

---

## End of grill — capture

Update **`discovery.md`** grill sections (see [`discovery-template.md`](./discovery-template.md)). Optional legacy **`handoff.md`** only if a folder already uses it — prefer discovery.

Next: **`gap-pass`** when PO ready (not silent merge).
