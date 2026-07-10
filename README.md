# LetsMake Product Skills

**LetsMake Product Workflow** — Cursor Agent Skills for BA/PO feature work: intake → discovery → grill → **auto research** → gap pass → consolidated requirements → dev handoff.

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

This creates `docs/product/`, `docs/research/canvas-index.md`, `.cursor/letsmake.config.json`, and `scripts/youtube-transcript.{sh,ps1}`.

### 3. Prerequisites

| Tool                                | Required for                                                             |
| ----------------------------------- | ------------------------------------------------------------------------ |
| **Cursor** with Agent + AskQuestion | Full workflow                                                            |
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
| `gap-pass`                  | PO question loop → consolidated `requirements.md`                 |
| `increment-requirements`    | Change control on a Consolidated `requirements.md` (PDRs)         |
| `scenario-hardening`        | Agent-readiness edge-case pass before dev handoff                 |
| `dev-handoff`               | Verify Definition of Ready; handoff note + `spec.md` stub for eng |
| `wiki-lint`                 | Doc/link/ID health; flag contradictions for the PO                |
| `small-change-requirements` | Narrow changes without full grill                                 |

> **Credits:** `grill-me` builds on Matt Pocock's [`grilling`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grilling/SKILL.md) skill — the relentless, one-question-at-a-time interview with a recommended answer per question — adapted to product discovery: fog-first branch ordering, facts-vs-decisions lookup rules, capture-as-you-go into `discovery.md`, and auto-launched parallel research. If you also have the original installed, uninstall one to avoid ambiguous triggering.

## Memory and recall

Product decisions live in the repo as **PDRs** (`decisions.md`, append-only, supersede on reversal); research findings live in `discovery.md`. Skills check that record before re-researching or re-deciding. If your workspace has a **memory MCP** (a cross-session recall layer such as a knowledge-base server), skills query it first — see `letsmake-conventions.md` § Recall before rework. The pack itself stays memory-system-agnostic.

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
├── README.md
└── INSTALL.md
```

The shared templates and playbooks live **only** in `skills/letsmake-product-workflow/references/`. Other skills link to them via relative paths, and `install-letsmake.sh` copies them into the consumer's `docs/product/`.

## Consumer workspace layout (after bootstrap)

```text
your-product-repo/
├── .cursor/letsmake.config.json
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
- **[examples/saved-collections/](./examples/saved-collections/README.md)** — a complete worked run (discovery → research → gap pass → requirements → PDRs → dev handoff) on a fictional feature

## License

MIT — see [LICENSE](./LICENSE).
