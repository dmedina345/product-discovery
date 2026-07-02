# Launch prompt + modes

## Parallel launch (default)

Use the **Task** tool (`generalPurpose` or `explore`, `run_in_background: true`). Prompt:

```text
Research spike {id} for {epic}/{feature}

Question: {question}
Type: {type}
Prompt/context: {full user or agent text}
Success criteria: {what decision this unblocks}
Read first: discovery.md, brief.md, lessons-learned.md, relevant requirements sections
Paths: {feature folder}

Video (if a YouTube/Loom URL is in prompt/context): see video-research.md —
  run scripts/youtube-transcript.sh, read the .md, analyze for relevance, cite URL + path.

Source verification (mandatory before writing findings):
- Every factual claim cites a primary source (URL, doc, transcript path, codebase path)
- Downgrade/remove unverifiable claims; mark confidence high/medium/low per major claim
- Section: Verification — claims checked, counter-evidence, anything removed

Deliverables:
1. discovery.md § Research findings for {id} (outcome, recommendation, verification, proposed changes) — template: findings-templates.md
2. discovery.md § Proposed changes from research for {id} — template: findings-templates.md
3. EAR-* row if related-but-out-of-scope; CI-* row if a raw input needs later triage
4. discovery.md § Artifact eval log: pass / needs PO / needs cleanup
5. Canvas (if deliverable includes one): ONLY at the canonical path in findings-templates.md;
   follow canvas + canvas-authoring.md; real data, no empty sections, no invented props
6. Append row to docs/research/canvas-index.md; update discovery pinned table
7. figma type: follow figma-parity-playbook; record node IDs + annotation quotes + tool used
8. Return: summary, verification one-liner, proposed-changes list, AskQuestion options for ADOPTING proposals (not re-approving the spike)

Do NOT edit requirements.md (gap pass owns SSOT). Proposals only.
```

Set backlog **Status:** `running`; notify the user research started in parallel. Continue the grill/gap AskQuestion loop on **product** questions unless the user chose to wait.

On completion: surface summary + verification + canvas link + **proposed changes** + AskQuestion to adopt/reject/defer each (not to re-approve the spike).

**Closeout (mandatory):** follow [`research-deliverables-playbook.md`](../../docs/product/research-deliverables-playbook.md) — index row, discovery pinned table, chat link with absolute path.

## Synchronous mode

Only when the user says **wait** / **blocking** / **sequential**: run inline (or Task `run_in_background: false`); complete findings before the next product AskQuestion on the blocked topic.
