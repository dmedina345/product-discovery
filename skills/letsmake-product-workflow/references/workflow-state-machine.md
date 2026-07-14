# Workflow state machine

Canonical lifecycle for medium/large feature work. Skills and templates summarize this file; this file wins on transition meaning.

## Feature lifecycle

```text
Exploring
  → Ready for gap pass
  → Gap analysis in progress
  → M9 approved
  → Requirements Draft
  → M10 approved
  → Requirements Consolidated
  → Scenario hardened
  → Handoff prepared
  → Handoff accepted
```

| Transition | Meaning | Required evidence | Who may approve |
| ---------- | ------- | ----------------- | --------------- |
| Exploring → Ready for gap pass | Load-bearing fog is resolved or ticketed | discovery capture; `OQ-*`/`R-*` for deferrals | PO |
| Ready → Gap in progress | Coverage, prior-doc decision, and atomic question queue started | `gap-analysis.md` | Agent |
| Gap in progress → M9 approved | PO authorizes writing a Draft SSOT | accepted `GP-APPROVAL-M9` | PO |
| M9 → Requirements Draft | Draft reflects all approved decisions; it is not yet SSOT | `requirements.md` Status `Draft` | Agent |
| Draft → M10 approved | PO approves scope, deferrals, and Draft content | accepted `GP-APPROVAL-M10` after review | PO |
| M10 → Consolidated | Requirements become product/acceptance SSOT | exit gate passes | Agent |
| Consolidated → Scenario hardened | Agent-readiness audit has no blocking rows | `scenario-matrix.md` Status `Complete` | PO for product changes |
| Hardened → Handoff prepared | Product package and untouched spec stub exist | `dev-handoff.md` Status `Prepared` | BA/PO |
| Prepared → Handoff accepted | Engineering acknowledges ownership and return asks | named/datestamped acknowledgment | Engineering |

**M9/M10 rule:** M9 permits a Draft. M10 permits Consolidated. Never require M10 before a Draft exists; never mark Consolidated from M9 alone.

## Readiness dimensions

Do not collapse these into one “blocked” flag:

| Dimension | Example blockers |
| --------- | ---------------- |
| Planning readiness | Missing product behavior, no measurable Must AC, no owner for a TBC |
| Implementation-start readiness | Required design pass, unacknowledged technical dependency |
| Production readiness | Legal retention decision, rollout approval, production credentials |

A production blocker may remain at handoff when it has an owner, date/trigger, and explicit release gate. A planning blocker may not.

## Artifact status enums

| Artifact | Allowed statuses |
| -------- | ---------------- |
| `discovery.md` | `Exploring` · `Ready for gap pass` · `Superseded` |
| `gap-analysis.md` | `In progress` · `Blocked — awaiting PO` · `PO approved` |
| `requirements.md` | `Draft` · `Consolidated` |
| `scenario-matrix.md` | `Draft` · `PO review` · `Complete` |
| `design.md` | `Not started` · `Product aligned` · `Design in progress` · `Ready` |
| `dev-handoff.md` | `Prepared` · `Accepted` · `Blocked` |
| `spec.md` | `Stub — awaiting engineering` · `In progress` · `Approved for build` |

Templates may add explanatory text after the enum separated by ` —`; the enum prefix must remain exact.

## Transition evidence

Every transition from M9 onward is appended to `workflow-events.jsonl`; see [workflow-events.md](./workflow-events.md). The validator derives state from artifact statuses and accepted gate rows, then cross-checks event chronology. Events do not override artifacts.

`Prepared` and `Accepted` require Planning readiness `pass`, Consolidated requirements, and a Complete scenario matrix. A spec may not exist before the handoff is Prepared. Research contracts must validate before M9: every done `R-*` has findings, verification, and its promised artifact; every proposal has an atomic `GP-RESEARCH-*` disposition.

## Authority modes

| Mode | Use | Approval validity |
| ---- | --- | ----------------- |
| `real` | Normal product work | Named stakeholder approval |
| `simulated-po` | Workflow evaluation/dry run | Evaluation only; never organizational approval |

Record the mode in `discovery.md`, `gap-analysis.md`, and `dev-handoff.md`.

In `simulated-po` mode:

- Label every synthetic product decision and M9/M10 answer.
- Allow state transitions to exercise the process, but state that approvals are evaluation-only.
- Never mark `dev-handoff.md` `Accepted` without a real Engineering acknowledgment.
- List assumptions requiring real customer, policy, design, or engineering validation.

## Reopening and change control

After Consolidated:

- one narrow clarification with no escalation trigger → `small-change-requirements`;
- several clarifications/decisions → `increment-requirements`;
- new Must capability, new IA, Won't reversal, or cross-feature scope change → reopen `gap-pass`.

Scenario hardening follows the same routes. A matrix row cannot move from `Add AC`/`Ask PO` to `Resolved` until the SSOT change is applied through the proper route, revision bumped, and validation passes.

Run deterministic validation at M10, scenario closeout, handoff preparation, and handoff acceptance; use JSON output in CI.
