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

| Tool                                | Required for                                                   |
| ----------------------------------- | -------------------------------------------------------------- |
| **Cursor** with Agent + AskQuestion | Full workflow                                                          |
| **yt-dlp**                          | YouTube/video research (`brew install yt-dlp` / `winget install yt-dlp`) |
| **Figma MCP** (optional)            | `type: figma` research spikes                                          |

### 4. Start a feature

```text
docs/epics/{epic}/features/{feature}/discovery.md
```

In Cursor Agent: paste context → **`intake-synthesize`** → **`discovery-grill`** → **`gap-pass`**.

Research runs **automatically** when gaps or ideas would benefit; findings include **source verification** and **proposed changes** — PO adopts in grill/gap pass. Research never edits `requirements.md` directly.

## Skills included

| Skill                       | Purpose                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| `letsmake-product-workflow` | Orchestrate the full path                                           |
| `intake-synthesize`         | Chat/brief/transcript → `discovery.md`                              |
| `discovery-grill`           | Stress-test design; auto-launch research; capture grill → discovery |
| `research-spike`            | Desk/comparable/video/Figma research (parallel)                     |
| `gap-pass`                  | AskQuestion → consolidated `requirements.md`                        |
| `dev-handoff`               | Verify Definition of Ready; handoff note + `spec.md` stub for eng   |
| `small-change-requirements` | Narrow changes without full grill                                   |

> **Credits:** `discovery-grill` extends Matt Pocock's [`grill-me`](https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md) skill — the relentless, one-question-at-a-time interview — adding an AskQuestion loop, domain-adaptive phases, auto-launched research, and capture/closeout into `discovery.md`. It still triggers on "grill me" — if you also have the original `grill-me` installed, uninstall one or invoke this one explicitly as `/discovery-grill` to avoid ambiguous triggering.

## Repo layout (this pack)

```text
product-discovery/
├── skills/                    # Cursor-discoverable skills (npx skills add)
│   ├── letsmake-product-workflow/references/   # ← canonical templates + playbooks (single source of truth)
│   ├── research-spike/scripts/youtube-transcript.{sh,ps1}
│   ├── dev-handoff/
│   └── …
├── assets/research/canvas-index.stub.md   # Canvas index stub (bootstrap)
├── assets/lessons-learned.template.md     # Lessons-learned starter (bootstrap)
├── scripts/install-letsmake.sh            # Bootstrap (macOS/Linux): copies references/ → consumer docs/product/
├── scripts/install-letsmake.ps1           # Bootstrap (Windows) — same behavior
├── README.md
└── INSTALL.md
```

The shared templates and playbooks live **only** in `skills/letsmake-product-workflow/references/`. Other skills link to them via relative paths, and `install-letsmake.sh` copies them into the consumer's `docs/product/`. There is no duplicate `assets/product/` tree.

## Consumer workspace layout (after bootstrap)

```text
your-product-repo/
├── .cursor/letsmake.config.json
├── docs/product/              # Templates + playbooks
├── docs/research/canvas-index.md
├── docs/lessons-learned.md
├── scripts/youtube-transcript.sh
└── docs/epics/{epic}/features/{feature}/
    ├── discovery.md
    ├── gap-analysis.md
    └── requirements.md
```

Canvases live under `~/.cursor/projects/{workspace-slug}/canvases/` (see config).

## Documentation

- [INSTALL.md](./INSTALL.md) — detailed install + troubleshooting
- [cheat-sheet.md](./skills/letsmake-product-workflow/references/cheat-sheet.md) — one-page workflow reference
- [letsmake-product-workflow.md](./skills/letsmake-product-workflow/references/letsmake-product-workflow.md) — full process doc

## License

MIT — see [LICENSE](./LICENSE).
