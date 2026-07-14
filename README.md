# LetsMake Product Skills

**LetsMake Product Workflow v2.2** — Cursor Agent Skills for BA/PO work: intake → grill/research → M9 Draft → persisted review → M10 Consolidated → scenario hardening/change control → handoff Prepared → Engineering Accepted.

v2.2 adds append-only workflow events, `--explain-state`, persisted evaluator evidence, atomic batch-decision materialization, controller-only research closeout, and pre-M9 research contract validation.

Program-agnostic. Works in any product repo that bootstraps the doc layout.

## Quick start

### 1. Install skills (Cursor)

```bash
npx skills add dmedina345/product-discovery --all -a cursor -y
```

> Use `--all` (or at minimum include `letsmake-product-workflow`) — every other skill resolves its shared templates from `letsmake-product-workflow/references/`.

### 2. Bootstrap your product repo

From your **product documentation repo** root:

```bash
# macOS / Linux
git clone https://github.com/dmedina345/product-discovery.git /tmp/product-discovery
bash /tmp/product-discovery/scripts/install-letsmake.sh --workspace .
```

```powershell
# Windows (PowerShell)
git clone https://github.com/dmedina345/product-discovery.git $env:TEMP\product-discovery
powershell -ExecutionPolicy Bypass -File $env:TEMP\product-discovery\scripts\install-letsmake.ps1 -Workspace .
```

This creates product docs, research index, config/install manifests, transcript helpers, and cross-platform workflow validators.

### 3. Prerequisites

| Tool                                | Required for                                                             |
| ----------------------------------- | ------------------------------------------------------------------------ |
| **Cursor** with Agent + AskQuestion | Full workflow                                                            |
| **Node.js 18+**                     | Bootstrap, safe upgrades, deterministic validation                        |
| **yt-dlp**                          | YouTube/video research (`brew install yt-dlp` / `winget install yt-dlp`) |
| **Figma MCP** (optional)            | `type: figma` research spikes                                            |

### 4. Start a feature

```text
docs/epics/{epic}/features/{feature}/discovery.md
```

In Cursor Agent: paste context → **`intake-synthesize`** → **`grill-me`** (captures to discovery as it goes) → **`gap-pass`**.

Research runs **automatically** when gaps or ideas would benefit; findings include **source verification** and **proposed changes** — the PO adopts them in grill/gap pass. Research never edits `requirements.md` directly.

## Skills included

| Skill                       | Purpose                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| **`which-skill-next`**      | Router — which skill or phase fits your situation                 |
| `letsmake-product-workflow` | Orchestrate the full path                                         |
| `intake-synthesize`         | Chat/brief/transcript → `discovery.md` + track recommendation     |
| `grill-me`                  | Relentless one-question-at-a-time interview; captures as it goes  |
| `research-spike`            | Desk/comparable/video/Figma research (parallel default)           |
| `gap-pass`                  | Atomic decisions → M9 Draft → review → M10 Consolidated            |
| `increment-requirements`    | Change control on a Consolidated `requirements.md` (PDRs)         |
| `scenario-hardening`        | Agent-readiness edge-case pass before dev handoff                 |
| `dev-handoff`               | Prepare package/stub; Engineering acknowledgment accepts it        |
| `wiki-lint`                 | Deterministic workflow validation + contradiction review           |
| `small-change-requirements` | Narrow changes without full grill                                 |

> **Credits:** `grill-me` builds on Matt Pocock's [`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) skill — the relentless, one-question-at-a-time interview with a recommended answer per question — adapted to product discovery: fog-first branch ordering, facts-vs-decisions lookup rules, capture-as-you-go into `discovery.md`, and auto-launched parallel research. If you also have the original installed, uninstall one to avoid ambiguous triggering.

## Memory and recall

Product decisions live in the repo as **PDRs** (`decisions.md`, append-only, supersede on reversal); research findings live in `discovery.md`. Skills check that local record before re-researching or re-deciding.

If the workspace has a **memory MCP** (cross-session wiki/recall), skills may **query it for recall** — see `letsmake-conventions.md` § Recall before rework. Memory is **not** a discovery workflow phase or skill: the pack stays memory-system-agnostic, and **wiki writes belong to the memory system**, not to discovery skills.

## Repo layout (this pack)

```text
product-discovery/
├── skills/                    # Cursor-discoverable skills (npx skills add)
│   ├── letsmake-product-workflow/references/   # ← canonical templates + playbooks (single source of truth)
│   └── …
├── assets/research/canvas-index.stub.md   # Canvas index stub (bootstrap)
├── assets/lessons-learned.template.md     # Lessons-learned starter (bootstrap)
├── scripts/install-letsmake.sh            # Bootstrap (macOS/Linux): copies references/ → consumer docs/product/
├── scripts/install-letsmake.ps1           # Bootstrap (Windows) — same behavior
├── scripts/validate-workflow.{sh,ps1}      # State/event/trace/readiness/evidence gates
├── scripts/test-letsmake-tools.mjs          # Dependency-free install/validate/upgrade smoke suite
├── letsmake-pack.json                      # Pack/schema version + template hashes
├── CHANGELOG.md
├── README.md
└── INSTALL.md
```

The shared templates and playbooks live **only** in `skills/letsmake-product-workflow/references/`. Other skills link to them via relative paths, and `install-letsmake.sh` copies them into the consumer's `docs/product/`.

Maintainers can run the workflow smoke suite with `node scripts/test-letsmake-tools.mjs` (Node 18+).

## Consumer workspace layout (after bootstrap)

```text
your-product-repo/
├── .cursor/letsmake.config.json
├── .cursor/letsmake.install.json       # Installed hashes + upgrade state
├── docs/product/              # Templates + playbooks
├── docs/research/canvas-index.md
├── docs/lessons-learned.md
├── scripts/youtube-transcript.{sh,ps1}
└── docs/epics/{epic}/features/{feature}/
    ├── discovery.md
    ├── gap-analysis.md
    ├── requirements.md
    ├── decisions.md           # PDR log (or project-level)
    ├── scenario-matrix.md     # Phase 3.5
    └── dev-handoff.md + spec.md (at Phase 4)
```

Canvases live under `~/.cursor/projects/{workspace-slug}/canvases/` (see config).

## Documentation

- [INSTALL.md](./INSTALL.md) — detailed install + troubleshooting
- [cheat-sheet.md](./skills/letsmake-product-workflow/references/cheat-sheet.md) — one-page workflow reference
- [letsmake-product-workflow.md](./skills/letsmake-product-workflow/references/letsmake-product-workflow.md) — full process doc
- [workflow-state-machine.md](./skills/letsmake-product-workflow/references/workflow-state-machine.md) — canonical states, statuses, gates, authority modes
- [CHANGELOG.md](./CHANGELOG.md) — pack releases
- **[examples/saved-collections/](./examples/saved-collections/README.md)** — a complete worked run (discovery → research → gap pass → requirements → PDRs → dev handoff) on a fictional feature

## License

MIT — see [LICENSE](./LICENSE).
