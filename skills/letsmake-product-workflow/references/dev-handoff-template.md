# Dev handoff — [Feature]

When this artifact becomes Prepared, append `handoff-prepared` with its revision to `workflow-events.jsonl`. Planning must be `pass`; Engineering acknowledgment later appends `handoff-accepted`.

**Status:** Prepared | Accepted | Blocked  
**Authority mode:** real | simulated-po  
**Prepared:** YYYY-MM-DD  
**Accepted by Engineering:** [name + YYYY-MM-DD, or pending]  
**SSOT:** [requirements.md](./requirements.md) — Consolidated  
**Conflict rule:** `requirements.md` wins on product behavior.

## Readiness

| Dimension | Result | Blocking items / owner / trigger |
| --------- | ------ | -------------------------------- |
| Planning | pass / fail | |
| Implementation start | pass / fail | |
| Production | pass / fail | |

## Package

- [requirements.md](./requirements.md)
- [design.md](./design.md)
- [scenario-matrix.md](./scenario-matrix.md)
- [decisions.md](./decisions.md)
- [spec.md](./spec.md) — untouched `[ENG]` sections
- ADR links: [or none]

## Ask from Engineering

- [ ] Acknowledge this package and `spec.md` ownership.
- [ ] Complete codebase map and all `[ENG]` sections.
- [ ] Produce implementation plan, rollout/rollback, and risks.
- [ ] Produce Must story → unit/integration/E2E test matrix mapped to AC + DoD.

## Deferred to spec only

- [Product-neutral technical unknowns with Engineering owner]

## Design pass only

- [Visual/motion items with Design owner]

## Acceptance

Set Status `Accepted` only after a named Engineering acknowledgment. In `simulated-po` mode, keep `Prepared` until a real Engineering owner responds.
