# Independent evaluator contract

Use for fresh-agent artifact evaluation. Pass only the artifact(s), criteria, and paths needed for the review; do not leak the author's expected answer.

## Required output

```text
CONTRACT: 2.2

VERDICT: PASS | FAIL

BLOCKERS
- path:line — issue and violated criterion

NON-BLOCKERS
- path:line — improvement

CRITERIA EVIDENCE
- criterion/checklist row — artifact evidence or explicit N/A rationale

NEXT GATE
- eligible | not eligible — gate name and reason
```

An empty or malformed response is not a pass. The event records the `contract` version and SHA-256 `artifactHash`. Historical responses without a contract are interpreted under 2.1 (the four-section shape); never edit them to satisfy a newer contract.

## Controller behavior

1. Validate that `VERDICT`, `BLOCKERS`, `NON-BLOCKERS`, `CRITERIA EVIDENCE`, and `NEXT GATE` exist. The evaluator receives the canonical exit checklist and must cite evidence or an explicit N/A for every planning/readiness category; a verdict without criterion coverage is malformed.
2. Persist the raw response as `{feature}/reviews/gap-draft-review-N.md` before acting on it.
3. Append `draft-review-completed` to `workflow-events.jsonl`; a PASS event names the persisted artifact and uses `result: pass`.
4. Retry once with the missing output shape named explicitly.
5. If the retry fails, run the deterministic local validator and label the result `not independent`.
6. Never set M10, `Complete`, or `Accepted` from an empty evaluator response.

Line references are required for blockers when the artifact is a file. A PASS may use `BLOCKERS: none`.

The controller is the sole writer of lifecycle artifacts and closeout records. An evaluator returns its response; it never changes statuses, approvals, requirements, or the event log.

When there are multiple attempts, only the latest `draft-review-completed` before M10 controls eligibility, and it must be a persisted PASS.
