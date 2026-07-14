# Gap pass — PO review checklist

Use **after** the agent drafts `gap-analysis.md` and **before** you accept `requirements.md` as Consolidated. You can run this yourself or ask the agent: _“Run gap-pass PO review on [feature].”_

**Full process:** [gap-pass-checklist.md](./gap-pass-checklist.md) · **Agent skill:** `gap-pass`

---

## When to use

- Agent finished gap analysis and wants to write or update `requirements.md`
- You are unsure whether scope drops (Coach, banners, deeplinks, etc.) were your call
- You skipped regression against a sibling feature folder

---

## Quick red flags (stop if any are true)

- [ ] **`gap-analysis.md` says “PO approved”** but you were not asked via AskQuestion for each scope drop
- [ ] **`Won't Have` includes any capability** without an accepted, stable `GP-DROP-*` record
- [ ] **Prior doc excluded** without you explicitly choosing “skip regression”
- [ ] **Brief Must** item has no matching story and no documented Won't Have change you agreed to
- [ ] Agent wrote `requirements.md` before you saw a **scope drop summary**

If any red flag is set → send back to **`gap-pass` Phase A** (questions only).

---

## Scope drops you must have been asked about

For each item in `requirements.md` **Won't Have**, confirm one atomic `GP-DROP-*` record captures your answer. Low-risk items may have appeared in one batch prompt; the audit still separates them.

| Check                                                     | Question you should have seen                    |
| --------------------------------------------------------- | ------------------------------------------------ |
| Global / shared UI (Coach, tab bar, banners)              | “In v1 Must, Won't Have v1, or later epic?”      |
| Feature named in **brief** but absent in stories          | “Omit, defer, or add Must story?”                |
| Prior SSOT **Must** not carried forward                   | “Carry, drop, or defer?” (if regression was run) |
| **Should → Won’t** or **Must → Should** downgrade         | “Accept downgrade?”                              |
| **N/A** on analytics rollout / offline banner / lifecycle | “Intentionally out of v1?”                       |

**Handoff text alone does not count as your answer.** Handoff is a draft until gap pass confirms.

---

## Regression decision

You should have been asked:

> “Compare requirements against discovered prior doc(s): [list paths]. Recommended: Yes if same product area.”

| Your answer         | What should be in gap-analysis                                      |
| ------------------- | ------------------------------------------------------------------- |
| **Yes, compare**    | Regression table with `REG-*` rows + PO decision per prior Must gap |
| **No, independent** | Stable `GP-GAP-*` record documenting skip + reason                  |

Skipping regression is valid for workflow tests — but must be **your** explicit choice.

---

## Coverage spot-check (5 minutes)

Skim these sections in `requirements.md`:

1. **Goals & success** — metrics/thresholds or N/A you agreed to
2. **Must stories** — observable Gherkin THEN/AND; **Acceptance criteria (summary)**; **Definition of Done** (pass/fail, not subjective)
3. **Platform table** — iOS / Android / web each filled or N/A with reason
4. **Entry** — cold start, deeplinks/notifications, web URLs if applicable
5. **Drawer / overlay** — open, dismiss, blocks interaction behind it
6. **Resilience** — offline, slow network, rapid actions
7. **Accessibility** — non-gesture path, reduced motion, web keyboard if web in scope
8. **Won't Have** — every line you did not expect
9. **Epic-adjacent recommendations** in `discovery.md` — each dispositioned or explicitly ignored

Missing row → ask agent to add `DOM-*` gap + AskQuestion.

---

## Final approval (you)

M9 authorizes the Draft. Only after reviewing that Draft and clearing red flags, answer M10:

- [ ] Every Won't-Have bullet cites accepted `GP-DROP-*` IDs
- [ ] I accept Won't Have list for v1
- [ ] I accept deferrals to design / spec
- [ ] Record accepted `GP-APPROVAL-M10` and proceed to Consolidated

Agent may then set `gap-analysis.md` **Status: PO approved** and update requirements header.

---

## Optional: second-pass review

For high-impact features, run a **review-only** gap pass:

```text
Use gap-pass in review-only mode on discovery/my-feature.
Do not edit requirements.md — list blocking AskQuestion items only.
```

(See `gap-pass` skill — **Review-only mode**.)
