# Workflow event log

Each feature keeps an append-only `workflow-events.jsonl` beside `requirements.md`. Artifacts remain the source of truth; events provide chronology and point to the evidence used for each transition.

## Record shape

One JSON object per line:

```json
{"at":"2026-07-13T14:30:00Z","event":"draft-review-completed","actor":"independent-evaluator","result":"pass","artifact":"reviews/gap-draft-review-1.md","revision":"r1"}
```

- `at` and `event` are required. Timestamps are ISO-8601 and nondecreasing; event names are kebab-case.
- `actor`, `ref`, `result`, `artifact`, `revision`, `note`, `contract`, `artifactHash`, `subjectHash`, and `scenarioHash` are evidence fields. Contract 2.2+ evaluator events require their version, artifact SHA-256, reviewed requirements SHA-256, and revision; increment/handoff reviews also require the reviewed scenario SHA-256.
- Never rewrite or reorder prior lines. Correct a bad event by appending a clarifying event and fixing the authoritative artifact.
- Paths in `artifact` are relative to the feature directory.

Use the CLI so writes are consistently shaped:

```text
node scripts/letsmake-tools.mjs record-event --workspace . --feature docs/epics/EPIC/feature --event m9-approved --actor PO --ref GP-APPROVAL-M9
```

## Canonical transitions

| Event | Required when | Minimum evidence |
| ----- | ------------- | ---------------- |
| `m9-approved` | M9 is accepted | `ref: GP-APPROVAL-M9` |
| `requirements-draft-created` | Draft is written | `revision` |
| `draft-review-completed` | M10 is requested | `result`; a PASS also requires persisted `artifact` |
| `m10-approved` | M10 is accepted | `ref: GP-APPROVAL-M10` |
| `requirements-consolidated` | requirements become Consolidated | `revision` |
| `scenario-hardened` | matrix becomes Complete | `revision` |
| `handoff-prepared` | handoff becomes Prepared | `revision` |
| `handoff-accepted` | Engineering accepts | named actor and acknowledgment ref/note |

The required order is the table order. Extra diagnostic events are allowed.

## Reopen and controlled increment

After Consolidated or handoff, preserve prior history and append:

| Event | Evidence |
| ----- | -------- |
| `handoff-audit-completed` | `result`, persisted `artifact`, `revision` |
| `workflow-reopened` | target `revision`, triggering `artifact`, and `note` |
| `requirements-incremented` | target `revision` and accepted `PDR-*` ref |
| `increment-review-completed` | `result`, persisted `artifact`, and `revision` |

Then repeat `scenario-hardened` and `handoff-prepared` for the new revision. `workflow-reopened` resets event-sequence validation; a backward lifecycle event without it is invalid. Use a full M9/M10 cycle only when the change-control routing rules reopen gap pass rather than a controlled increment.

## Persisted evaluator responses

Save every draft, increment, and handoff-audit response under `{feature}/reviews/`, unchanged. Its `*-review-completed` or `*-audit-completed` event points to it and records the evaluator-contract version plus artifact SHA-256. Every PASS/FAIL artifact must satisfy the versioned `evaluation-contract.md`; an empty, malformed, missing, or hash-mismatched response cannot authorize a gate. Missing version means legacy 2.1 and must not be retroactively upgraded by editing the artifact.

If review is retried, append another `draft-review-completed` event. The latest review before `m10-approved` must be `result: pass`; an earlier PASS cannot mask a later FAIL.

Run validation with `--explain-state` to see derived state, next gate, eligibility, and blocker codes.
