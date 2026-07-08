# Scenario matrix — [Feature]

**SSOT:** `requirements.md`  
**Run date:** YYYY-MM-DD  
**Status:** Draft / PO review / Complete

Use this as a hardening audit before dev handoff. Do not duplicate full requirements; each row should either confirm behavior, create an AC edit, create an OQ/PDR, or defer a product-neutral technical detail to spec.

| ID     | Story / area | Category                   | Scenario | Expected behavior | If silent, agent may assume | Status | Owner | Follow-up |
| ------ | ------------ | -------------------------- | -------- | ----------------- | --------------------------- | ------ | ----- | --------- |
| SH-001 |              | unexpected input / failure |          |                   |                             | Ask PO | PO    |           |

## Categories

- User types
- Contexts of use
- Unexpected inputs / failures
- User error
- Feature interactions
- Load / volume
- Security / privacy
- Accessibility / localization

## Status values

- `Resolved` — expected behavior already exists in `requirements.md`.
- `Add AC` — edit an acceptance criterion / DoD in `requirements.md`.
- `Ask PO` — product behavior is missing or ambiguous.
- `Defer(spec)` — engineering-owned implementation detail, product behavior clear.
- `N/A` — explicitly not applicable.
