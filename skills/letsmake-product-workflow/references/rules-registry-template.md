<!--
TEMPLATE — Rules & Preferences Registry
This is SEMANTIC memory: durable rules/preferences, updated in place (overwrite, don't append history —
history lives in the Decision Log). Tiers: org constitution → project → client → feature.
Load policy borrows Kiro steering frontmatter.
-->

Each rules file starts with this frontmatter (at the very top of the file, no comment above it):

```yaml
---
inclusion: always # always | fileMatch | manual
scope: org | project | client | feature
---
```

# Rules & Preferences — {scope name}

**Read me before acting.** These are durable guardrails. Do **not** re-derive them from Figma, defaults, or chat history when a rule exists here. To change a rule, it must be retired via a superseding PDR — do not silently edit the statement away.

**Distinct from `CONTEXT.md`** (which is the _glossary_ — what words mean). This file is _what to do / not do_.

## Conventions

- **ID:** `RULE-<scope>-<nnn>` — scope = a short code you pick per tier/area (e.g. `ORG`, `CLIENT`, or a feature code). Zero-padded (`001`).
- **Status:** `active` · `retired` (retired rules stay listed with their superseding PDR for traceability).
- Every rule cites the **source PDR** that established it.

## Rules

| ID          | Rule (do / don't) | Rationale (1 line) | Source PDR | Status |
| ----------- | ----------------- | ------------------ | ---------- | ------ |
| RULE-XX-001 | …                 | …                  | PDR-XX-001 | active |

<!--
Tier guide (create the files you need; load `always` ones every session):
  docs/product/rules/constitution.md     org-wide non-negotiables        (always)
  <project>/rules/product.md             project rules                   (always)
  <project>/rules/client-preferences.md  client / brand prefs            (always)
  <project>/rules/<feature>.md           feature rules                   (fileMatch / feature-scoped)
-->
