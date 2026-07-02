# Grill playbook — navigation / IA decision order

Disclosed reference for the **`grill-me`** skill — read only on the **navigation- or IA-heavy** branch, where this finer-grained order matters. General phase ordering, AskQuestion mechanics, and session anti-patterns live in the skill itself.

## Decision order (navigation / IA features)

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

When a step needs desk research or comparables before deciding, flag **`R-*`** in `discovery.md` and invoke **`research-spike`** (parallel by default).

---

_Originally distilled from early navigation/IA-heavy grill sessions (Jun 2026). The general lessons — AskQuestion shape, root-dependency-first, shell vs content split, sparse ADRs, SSOT/no-silent-merge discipline — are now built directly into `grill-me/SKILL.md`._
