# Atomic gap-pass decision records

Question presentation and audit granularity are separate concerns: a low-risk UI prompt may contain several items, but every capability gets one stable record.

## IDs

| ID | Use |
| -- | --- |
| `GP-DROP-001` | Scope-drop / Won't-Have decision |
| `GP-GAP-001` | Missing behavior, N/A, defer, downgrade, conflict |
| `GP-RESEARCH-001` | Disposition of one research proposal |
| `GP-APPROVAL-M9` | Authorize Draft SSOT |
| `GP-APPROVAL-M10` | Authorize Consolidated SSOT |

IDs are stable and never renumbered. If a decision reverses later, create a PDR and update current requirements; preserve the original gap record as session history.

## Record shape

```markdown
| ID | Date | Type | Capability / question | Options offered | PO answer | Source refs | Carried into | PDR |
| -- | ---- | ---- | --------------------- | --------------- | --------- | ----------- | ------------ | --- |
| GP-DROP-001 | YYYY-MM-DD | M1 | Public API in v1? | Must / later / Won't | Later epic | discovery §… | requirements Won't | PDR-XX-001 |
```

Rules:

- One capability per record; never “iOS/Android/API” in one row.
- One research proposal per `GP-RESEARCH-*` record.
- Reuse an existing accepted answer; do not ask again because another checklist category mentions it.
- Cite the stable ID from each Won't-Have bullet and resolved decision it governs.
- A batch prompt must materialize one record for each item, including items accepted “as recommended.”

## Question UX

Always present one at a time:

- shared/global UI or cross-feature dependencies;
- prior-SSOT Must omission;
- analytics/rollout reduction;
- accessibility, localization, or platform-parity downgrade;
- source conflicts and ambiguous product behavior.

May present in one low-risk batch:

- independent low-risk exclusions;
- clearly inapplicable N/A rows;
- product-neutral deferrals to spec/design.

Offer `Accept all as recommended`, but allow any item to be pulled out. Audit remains atomic either way.

For a low-risk batch, persist a JSON packet and materialize it with the CLI:

```json
{"date":"2026-07-13","items":[{"id":"GP-GAP-001","type":"M6","question":"Export in v1?","options":"Must / later","answer":"Later","sourceRefs":"discovery section Scope","carriedInto":"requirements Won't","pdr":"PDR-EX-001"}]}
```

```text
node scripts/letsmake-tools.mjs materialize-decisions --workspace . --feature docs/epics/EPIC/feature --input decisions-batch.json --write
```

Preview without `--write`. The command rejects duplicate IDs, missing fields, and invalid dates. Keep one capability in each item.

## Traceability invariants

- Every Won't-Have bullet cites one or more accepted `GP-DROP-*` IDs.
- Every scope-drop candidate has an accepted/rejected/deferred decision record.
- Every accepted `GP-DROP-*` appears in current requirements or says why it does not.
- Every significant/reversible decision has a PDR.
- `GP-APPROVAL-M9` precedes Draft creation; `GP-APPROVAL-M10` follows Draft review and precedes Consolidated.

Run `scripts/validate-workflow.ps1` or `.sh` to enforce these mechanically.
