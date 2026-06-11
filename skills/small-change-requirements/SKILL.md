---
name: small-change-requirements
description: >-
  Documents narrow product changes without full grill or gap pass—patch
  requirements.md or docs/changes with Gherkin acceptance. Use for copy tweaks,
  single-surface behavior, config, bug clarification, or when user says small
  change, quick requirements, or minor scope.
metadata:
  author: letsmake
  version: 1.0.0
---

**Paths:** Read [paths.md](../letsmake-product-workflow/references/paths.md) and `.cursor/letsmake.config.json` in the consumer workspace. Run the install script (`install-letsmake.sh` / `.ps1`) if config is missing.  
**AskQuestion fallback:** if the AskQuestion tool is unavailable in this mode/agent, ask the same single question in plain chat and wait.

# Small change requirements

Lightweight BA path when the full [LetsMake Product Workflow](../letsmake-product-workflow/references/letsmake-product-workflow.md) is unnecessary.

## When to use

User requests small/narrow change: copy, one control, single API field, bug clarification, NFR tweak.

## When not to use (escalate to `letsmake-product-workflow`)

Stop and switch if **any** are true:

- New IA or navigation model (sections, shell, global chrome pattern)
- New Must-level capability across modules
- Platform matrix change (new gesture, route paradigm per platform)
- Migration coachmark / analytics taxonomy change (beyond copy on existing event)
- Conflicts with existing **Won't Have**
- Multiple open product questions after 5-minute scope check

## Canonical reference

Read: [`small-change-process.md`](../letsmake-product-workflow/references/small-change-process.md) (consumer copy: `{docsProductRoot}/small-change-process.md`)

## Procedure

### 1 — Scope check (mandatory)

Confirm **all** small-change criteria in the process doc. If any fail → tell user to use **`letsmake-product-workflow`** (LetsMake Product Workflow).

### 2 — Choose artifact location

| Situation             | Write to                                                     |
| --------------------- | ------------------------------------------------------------ |
| Feature folder exists | Patch `docs/epics/{epic}/features/{feature}/requirements.md` |
| No feature folder     | `docs/changes/YYYY-MM-DD-{slug}.md`                          |
| User prefers tracker  | Paste change record in ticket; link from repo if possible    |

**Do not create:** `handoff.md`, narrative PRD, or second SSOT.

### 3 — Write change record

Use the **change-record block** in [`small-change-process.md`](../letsmake-product-workflow/references/small-change-process.md) (title, date, type, affects, SSOT updated, summary, observable Gherkin acceptance, non-goals, platforms, analytics/migration, DoD). Acceptance must be **observable/pass-fail** — same bar as requirements Must stories.

### 4 — Patch existing requirements (preferred)

- Amend the **relevant story** GIVEN/WHEN/THEN — do not duplicate entire story
- Add dated row to **Resolved decisions** or **Notes** if needed
- Bump `Last updated` in requirements header
- If **Won't Have** changes → require explicit PO approval (scope change → escalate)

### 5 — Handoff to engineering

State clearly:

- **"No spec.md update"** OR **"Append to spec §X"**
- Engineering may ship via its lightweight/quick-fix path if the change stays within a few files

## Outputs

| Output                     | Path                            |
| -------------------------- | ------------------------------- |
| Patched SSOT or change doc | See step 2                      |
| User message               | Escalation reason if applicable |

## Anti-patterns

- Running discovery-grill or full handoff template for copy change
- Creating exploratory PRD
- Silent change without SSOT patch ("ticket only" without linking)
