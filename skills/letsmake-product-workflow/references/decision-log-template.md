<!--
TEMPLATE — Decision Log (Product Decision Records / PDR)
Copy to <project>/decisions.md (project-level) or <project>/<feature>/decisions.md.
This is EPISODIC memory: append-only. Never edit a decided record to change its meaning —
supersede it with a new PDR and link the chain.
-->

# Decision Log — {Project} (PDR)

**Purpose:** the single, append-only record of product decisions for this project. Replaces inline `(PO YYYY-MM-DD)` prose and run-on status lines in `requirements.md`. The requirements doc holds _current truth_; this log holds _why / when / what it replaced_.

**Relationship to other artifacts:**

- `requirements.md` (SSOT) references PDR IDs instead of dated prose.
- `rules/*.md` (semantic) — durable rules cite the PDR that created them.
- `gap-analysis.md` historical `D-*` log is **frozen**; new decisions live here.
- Linear (if wired) — open PDRs / OQs sync **one-way** (docs → Linear).

## Conventions

- **ID:** `PDR-<SCOPE>-<nnn>` — scope = short codes you pick per product area (e.g. a product-wide code plus one per feature area), plus **`OPS`** for operational interventions. Zero-padded (`001`).
- **Status:** `proposed` · `accepted` · `superseded` · `rejected` · `deprecated`.
- **Append-only.** Once `accepted`/`rejected`, do not rewrite the decision. To change it, add a new PDR and set the old one's `status: superseded` + `superseded-by`.
- **One decision per PDR.** Keep routine ones to a single table row; give significant/irreversible ones an expanded block.
- **Owner-adjudicated contradictions.** The lint pass may _flag_ a contradiction; a human resolves it via a new PDR. Agents never silently overwrite a decided record.
- **Operational interventions count.** A manually updated stat, a config flipped, a workaround applied — log a one-row `PDR-OPS-*` (who, what, why, when). This is what answers "did someone change X?" months later, when nobody remembers.

## Decision index

| ID         | Title | Status   | Date       | Decision (current truth) | Supersedes / -by | Owner | Links                 |
| ---------- | ----- | -------- | ---------- | ------------------------ | ---------------- | ----- | --------------------- |
| PDR-XX-001 | …     | accepted | YYYY-MM-DD | one line                 | —                | PO    | req §… · OQ-… · Figma |

## Expanded records (significant / irreversible only)

### PDR-XX-001 — {title}

- **Status:** accepted · **Date:** YYYY-MM-DD · **Deciders:** PO / client / eng
- **Context:** what forced the decision.
- **Decision:** the current truth (1–3 lines).
- **Alternatives considered:** A (why not) · B (why not).
- **Consequences:** what this commits / rules it creates (`RULE-…`).
- **Supersedes / Superseded-by:** PDR links (the reversal chain).
- **Re-evaluate if:** trigger that should reopen this decision.
