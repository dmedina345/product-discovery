# LetsMake conventions (shared)

Single source of truth for rules that several skills share. Skills keep a one-line **leading-word** reminder inline and point here for the full rule, so the rule lives in one place. Part of the [LetsMake Product Workflow](./letsmake-product-workflow.md).

## PO-gated (no silent merge)

The PO decides product direction; agents propose and capture.

- **`requirements.md` is the SSOT** and wins over `discovery.md`, grill capture, `handoff.md`, PRDs, and chat.
- Only **`gap-pass`** (greenfield) and **`increment-requirements`** (refining a Consolidated doc) write product content to `requirements.md`. **Research never edits it.**
- **Raw input never jumps straight into `requirements.md`** — it lands in `discovery.md` § Context inbox and is routed (decision / `OQ-*` / `R-*` / `EAR-*` / requirement candidate / archive).
- Every **Won't-Have / scope drop** cites a PO decision (a PDR or a `gap-analysis.md` PO-log row) — never silent.
- A proposal or research recommendation is **not** an approved decision until the PO confirms via **AskQuestion**.

## Recall before rework

Before launching research, re-deciding a topic, or answering "did we already...": query **OKF Brain** (`ask` on `user-okf-brain` MCP) and **cite concept paths** from the response. If Brain returns `NOT_IN_BRAIN`, read local SSOT (`decisions.md`, `rules/`, `requirements.md`, discovery findings, research digests/transcripts, `lessons-learned.md`) before launching new work. Re-running research that a done `R-*` already answered, or answering from general knowledge as if it were project memory, are both drift. Full model: [`memory-system.md`](./memory-system.md).

## Auto-launch research

- When grill, gap pass, intake, or context-inbox triage hits a gap or idea that desk/comparable/Figma/video research would resolve, **auto-launch `research-spike`** (parallel by default) — **do not** AskQuestion to approve the spike when the prompt/context is sufficient.
- **Exception:** the user chose **decide now**, **defer research**, or **wait** on this topic this turn.
- Thin prompt is the only blocker → one AskQuestion for the prompt, then launch.
- Research writes **proposed changes** to `discovery.md`; the PO adopts via AskQuestion in grill/gap. Research does not re-ask whether it should have run.

## Linear sync (optional, one-way docs → Linear)

After `gap-pass` or `increment-requirements` writes new/changed OQs to `requirements.md`, optionally mirror to Linear — **never the reverse** (docs are SSOT; Linear is a tracker mirror).

- **Gate:** only offer this if the Linear MCP is configured **and** the user opts in for this project. Skip silently (no nag) if Linear isn't set up.
- **Per-project mirror docs:** one Linear document per requirement/epic area (e.g. "`<Feature>` — open questions (mirror)"), a Markdown table of `ID | Topic | Status | Owner` synced from the _Still open_ table, stamped with a "Last synced" date.
- **★ = filed as an issue.** Mark a row ★ in the mirror doc only when it's also filed as a Linear issue — file new/unfiled blocking items as issues (title `OQ-<id> — <topic>`, body: Status/Owner line + SSOT pointer back to `requirements.md`); don't file every open question, just the ones blocking progress.
- **Reconciling an external open-questions list** (stakeholder doc, email, Slack) against Linear: classify each item first (already resolved/superseded · duplicate of an existing OQ · genuinely new) by reading `requirements.md` + `decisions.md` — don't trust the external framing or "Decision:" labels at face value. AskQuestion on real judgment calls (new PDRs, which new OQs to log, which to file) before writing.
- Update the Linear **project description** to point at the current SSOT path + mirror doc names whenever they change.

## Agent-ready specs

Specs written for agents need defined behavior for failure paths, not just happy-path acceptance. A human engineer may ask "what should happen here?"; an agent may silently choose a plausible default.

- Before dev handoff on medium/large, agent-built, integration-heavy, money/legal/safety-sensitive, or known-failure-path work, run **`scenario-hardening`** and create `scenario-matrix.md`.
- Every blocking scenario needs an expected behavior: **halt / degrade / retry / notify / skip / queue / ask user**. "Something is wrong", jokes, or vague TBCs are not implementation-ready.
- The matrix is an audit aid, not a parallel SSOT. Rows feed **AC edits**, **OQs**, **PDRs**, or **`Defer(spec)`** with owner.
- Dev handoff may skip the pass only when the change is small/low-risk and the PO accepts **N/A**.

## Shared anti-patterns

- **Dual SSOT** — `discovery.md` and `requirements.md` both "active for dev". (discovery is historical once Consolidated.)
- **Story sprawl** — 50+ "As a user" stories / a 77-story PRD parallel to requirements. Use a general Gherkin set + an edge-case appendix.
- **`spec.md` before Consolidated** — spec stays a stub until the dev-handoff gate.
- **Audit in the SSOT** — coverage matrices, `[FIGMA Δ]`, diff blockquotes belong in `gap-analysis.md`, not `requirements.md`.
- **Closing open questions by guessing** — name `OQ-*` / `TBC` with an owner instead.
- **Failure path by mood** — "something is wrong" / "figure out error handling" / emoji where halt/degrade/retry behavior belongs.
