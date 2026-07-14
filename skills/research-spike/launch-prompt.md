# Launch prompt + modes

## Parallel launch (default)

Launch a **background subagent** (Cursor: background subagent / Task tool; other agents: their equivalent background task tool). Prompt:

```text
Research spike {id} for {epic}/{feature}

Question: {question}
Type: {type}
Prompt/context: {full user or agent text}
Success criteria: {what decision this unblocks}
Read first: discovery.md, brief.md, lessons-learned.md, relevant requirements sections
Paths: {feature folder}

Video (if a YouTube/Loom URL is in prompt/context): see video-research.md —
  run scripts/youtube-transcript.sh (or .ps1 on Windows), read the .md, analyze for relevance, cite URL + path.

Source verification (mandatory before writing findings):
- Every factual claim cites a primary source (URL, doc, transcript path, codebase path)
- Downgrade/remove unverifiable claims; mark confidence high/medium/low per major claim
- Section: Verification — claims checked, counter-evidence, anything removed

Deliverables (single-writer contract):
0. Write only the owned markdown digest and/or canvas requested by the packet. Do not edit shared workflow artifacts.
1. Return discovery findings for {id} (outcome, recommendation, verification, proposed changes) in `DISCOVERY_PATCH` — template: findings-templates.md
2. Return the proposed-changes table for {id} inside `DISCOVERY_PATCH`
3. Adjacent recommendations (related to the epic but outside the {id} question) go in findings
   as clearly-marked proposals with a suggested home — never silent scope adds
4. Canvas (if deliverable includes one): ONLY at the canonical path in findings-templates.md;
   follow canvas + canvas-authoring.md; real data, no empty sections, no invented props
5. Return `INDEX_ROW` plus a pinned-artifact row for the controller to apply
6. figma type: follow figma-parity-playbook; record node IDs + annotation quotes + tool used
7. Return: summary, verification one-liner, proposed-changes list, AskQuestion options for ADOPTING proposals (not re-approving the spike)

Return contract:
- `VERDICT: complete | incomplete`
- verification counts and source classes
- artifact paths
- numbered proposed changes
- blocking gaps, or `none`
- `DISCOVERY_PATCH`: exact markdown for findings, proposal table, and backlog status
- `INDEX_ROW`: exact markdown row, or `none`

Do NOT edit discovery.md, docs/research/canvas-index.md, requirements.md, gap-analysis.md, or lifecycle statuses. The controller owns shared closeout writes. Proposals only.
```

Set backlog **Status:** `running`; notify the user research started in parallel. Continue the grill/gap AskQuestion loop on **product** questions unless the user chose to wait.

On completion: validate the return contract and owned artifacts. Empty/malformed → retry once; then run inline/fallback and label it not independent. The controller applies `DISCOVERY_PATCH` and `INDEX_ROW`, marks the backlog done, validates research contracts, then surfaces summary + verification + artifact links + proposals + adoption question.

**Closeout (mandatory):** follow [`research-deliverables-playbook.md`](../letsmake-product-workflow/references/research-deliverables-playbook.md) — index row, discovery pinned table, chat link with absolute path.

## Synchronous mode

Only when the user says **wait** / **blocking** / **sequential**: run inline (or Task `run_in_background: false`); complete findings before the next product AskQuestion on the blocked topic.
