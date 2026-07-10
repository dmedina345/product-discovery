# Small change process (BA/PO)

Lightweight path for **low-risk, narrow** product changes. Skips full grill-me and full gap pass when criteria below are met.

Use the [LetsMake Product Workflow](./letsmake-product-workflow.md) instead if any **escalation trigger** fires.

---

## When to use this process

**Use small-change when ALL are true:**

- [ ] No new information architecture (no new primary sections, routes tree, or global chrome pattern)
- [ ] Touches **one** user-facing surface or **one** API contract (or copy across existing surfaces with same behavior)
- [ ] No cross-platform contract change—or change is identical on all platforms and documented in one paragraph
- [ ] No migration / coachmark / analytics taxonomy change—or only copy tweak on existing event
- [ ] Engineering estimates **≤ few days** and ≤ ~5 production files (quick-fix scale)

**Examples**

- Coachmark copy change (dismiss rules unchanged)
- Wording on an existing drawer menu item
- Add one field to an existing API response (backward compatible)
- Adjust timeout threshold with existing NFR section updated
- Bug-fix behavior: expected behavior already documented; clarify one scenario

**Not small-change**

- New navigation pattern, new primary section, new global shell
- New analytics events or rollout thresholds
- Platform matrix row changes (e.g. web gets swipe when it did not before)
- "Small" UI that changes acceptance criteria for multiple Must stories

---

## Artifacts (minimal set)

Pick **one** tracking location:

| Option                    | Path / tool                                                   |
| ------------------------- | ------------------------------------------------------------- |
| A — Existing feature      | Patch `docs/epics/{epic}/features/{feature}/requirements.md`  |
| B — No feature folder yet | `docs/changes/YYYY-MM-DD-{slug}.md` (create folder if needed) |
| C — Tracker-only          | Ticket with embedded template below (link from PR)            |

**Do not create:** a narrative PRD or a parallel SSOT.

---

## Process (5 steps)

### 1 — Describe the change (2–5 sentences)

- **Current behavior:**
- **Desired behavior:**
- **Why now:**

### 2 — Scope check

Answer honestly:

| Question                                            | If "yes" → escalate to feature workflow |
| --------------------------------------------------- | --------------------------------------- |
| New IA or navigation model?                         |                                         |
| New Must-level user capability?                     |                                         |
| Conflicts with Won't Have in existing requirements? |                                         |
| Needs design pass for new components?               |                                         |

### 3 — Write the change record

Use this block (in requirements patch or `docs/changes/…md`):

```markdown
# Change: [short title]

**Date:** YYYY-MM-DD  
**Author:** [name]  
**Type:** Copy | Behavior | Config | Bug clarification | NFR tweak  
**Affects:** [feature slug or component area]  
**SSOT updated:** [path to requirements.md section] or N/A (tracker-only)

## Summary

[2–3 sentences]

## Acceptance

- GIVEN [context]
- WHEN [action]
- THEN [observable outcome]

## Non-goals (this change)

- [What we are not changing]

## Platforms

- [ ] iOS [ ] Android [ ] Web [ ] Backend only

## Analytics / migration

- [ ] No change
- [ ] Copy/event property only — describe
- [ ] **Escalate** — needs feature workflow

## Definition of Done

- [ ] SSOT requirements patched (or ticket accepted as SSOT for one-off)
- [ ] Design notified (if visual) / N/A
- [ ] Eng confirms no spec.md update needed OR one-paragraph spec patch linked
- [ ] QA scenario added to existing test plan or manual check listed
```

### 4 — Review

| Reviewer   | When                                        |
| ---------- | ------------------------------------------- |
| PO/BA self | Format complete; escalation triggers false  |
| Eng lead   | Behavior or API ambiguity                   |
| Design     | Visual/copy on branded UI                   |
| QA         | New edge case not covered by existing tests |

**SLA (suggested):** 1 async review round; no grill session.

### 5 — Handoff to engineering

**Package**

- Link to patched requirements section **or** change doc
- Single acceptance block (Gherkin above)
- Explicit: "No spec.md update" **or** "Append to spec §X"

**Engineering**

- May ship via its lightweight **quick-fix** path if no feature folder / ≤ file threshold
- Still runs lint/test per its normal workflow; BA does not own verification

---

## Patching an existing `requirements.md`

Prefer **surgical edits**:

1. Add a dated line under **Resolved decisions** or **Notes**
2. Amend the relevant story's GIVEN/WHEN/THEN—do not duplicate the whole story
3. If Won't Have changes, get explicit PO approval (that is a scope change)

**Header update:** bump `Last updated` and optional `Changelog` bullet.

---

## Escalation to full feature workflow

Stop small-change and open [letsmake-product-workflow.md](./letsmake-product-workflow.md) at Phase 1 or 2 if:

- Discovery reveals multiple open questions
- Change touches two+ features' contracts
- Stakeholders disagree on default behavior
- You need a platform matrix or migration plan

**Convert:** Create/update `discovery.md` → grill → gap pass (not handoff-only path).

---

## Comparison to engineering quick-fix

|               | Small-change (BA)               | Engineering quick-fix          |
| ------------- | ------------------------------- | ------------------------------ |
| **Focus**     | What to change, acceptance      | How to implement, verify       |
| **Artifacts** | Requirements patch / change doc | Code; optional lessons-learned |
| **Gate**      | BA scope checklist              | Lint/test in eng workflow      |

Both can apply to the same work: BA defines acceptance; engineering ships under its quick-fix path when no full feature process is needed.

---

## Related

- [letsmake-product-workflow.md](./letsmake-product-workflow.md)
- [README.md](./README.md)
