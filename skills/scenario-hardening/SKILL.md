---
name: scenario-hardening
description: >-
  Runs an agent-readiness pass on Consolidated requirements before dev handoff:
  stress-tests Must stories for silent agent assumptions, failure paths, feature
  interactions, security/privacy, localization, accessibility, and load. Use
  when the user says scenario hardening, edge-case pass, agent-ready spec,
  before dev handoff, or before pasting requirements into an agent.
metadata:
  author: letsmake
  version: 1.1.0
---

# Scenario hardening

Run after `requirements.md` is Consolidated and before `dev-handoff` / agent implementation. The goal is not to invent scope; it is to make silent assumptions explicit before an agent turns them into code.

**Template:** [`scenario-matrix-template.md`](./scenario-matrix-template.md)  
**Shared rule:** [`letsmake-conventions.md`](../letsmake-product-workflow/references/letsmake-conventions.md) § Agent-ready specs.

## Inputs

- `requirements.md` (SSOT)
- `gap-analysis.md` (open decisions / PO log)
- `decisions.md` when present
- `design.md`, Figma parity docs, or research notes only for context

## Pass order

For each Must story, run the categories in this order:

1. **User types** — roles, new/existing users, restricted users, account state.
2. **Contexts of use** — platform, locale, offline/slow network, cold start vs session.
3. **Unexpected inputs / failures** — missing data, mismatches, API/ranking/auth errors.
4. **User error** — fat-finger, rapid repeat, cancel/back, manual overrides.
5. **Feature interactions** — shared shell, adjacent features, state collisions.
6. **Load / volume** — rate, retries, large lists, slow devices; mark N/A if irrelevant.
7. **Security / privacy** — permissions, PII, legal/safety constraints, retention.
8. **Accessibility / localization** — keyboard/AT path, announcements, RTL/copy impact.

## Output

Create or update `scenario-matrix.md` next to `requirements.md` using the template.

Every row must include:

- **Scenario** — concrete trigger, not a category label.
- **Expected behavior** — halt / degrade / retry / notify / skip / queue / ask user.
- **If silent, agent may assume** — the plausible wrong implementation.
- **Status** — `Resolved`, `Add AC`, `Ask PO`, `Defer(spec)`, `N/A`.
- **Owner** — PO / Design / Eng / Legal / Data.

## Gate

- If a Must story has a user-visible failure path with no expected behavior, mark `Ask PO` or `Add AC`.
- If behavior is code-specific but product-neutral, mark `Defer(spec)` and name the engineering owner.
- If a scenario changes product scope, do **not** merge it silently. AskQuestion and record a PDR / OQ if accepted.
- Dev handoff can proceed only when every blocking row is `Resolved`, `Add AC` applied, `Defer(spec)` with owner, or explicitly accepted by PO.

## Anti-patterns

- Generic "think about edge cases" notes with no scenario rows.
- Treating `TBC` as implementation-ready for Must user-visible behavior.
- Letting the matrix become a parallel requirements doc; it is an audit aid that feeds ACs, OQs, PDRs, or spec deferrals.
- Asking engineering to infer halt/degrade/retry behavior from "something is wrong."
