# LetsMake path resolution

Read **`.cursor/letsmake.config.json`** at the **consumer workspace root** before reading templates or writing canvases.

If missing, tell the user to run (from their product repo root, or pass the workspace flag):

```bash
bash /path/to/product-discovery/scripts/install-letsmake.sh            # macOS / Linux
```

```powershell
powershell -ExecutionPolicy Bypass -File C:\path\to\product-discovery\scripts\install-letsmake.ps1   # Windows
```

To validate an existing setup (config keys, resolved paths, writable `canvasDir`, `yt-dlp`) without writing anything, add `--check` (bash) / `-Check` (PowerShell).

---

## Config schema (v2)

```json
{
  "version": 2,
  "installedPackVersion": "2.2.0",
  "docsProductRoot": "docs/product",
  "featureDocsRoot": "docs/epics",
  "researchIndexPath": "docs/research/canvas-index.md",
  "lessonsLearnedPath": "docs/lessons-learned.md",
  "canvasDir": "/absolute/path/to/.cursor/projects/.../canvases"
}
```

| Key                  | Default                         | Use                                                    |
| -------------------- | ------------------------------- | ------------------------------------------------------ |
| `docsProductRoot`    | `docs/product`                  | Templates, playbooks, cheat sheet in **consumer repo** |
| `featureDocsRoot`    | `docs/epics`                    | `{featureDocsRoot}/{epic}/features/{feature}/`         |
| `researchIndexPath`  | `docs/research/canvas-index.md` | Git-tracked canvas bookmark table                      |
| `lessonsLearnedPath` | `docs/lessons-learned.md`       | Team conventions log                                   |
| `canvasDir`          | auto at install                 | **Only** place Cursor Glass opens `.canvas.tsx` files  |

The installer also writes `.cursor/letsmake.install.json` plus a base snapshot under `.cursor/letsmake/base/`. Use `-CheckUpgrade` / `--check-upgrade` before upgrading customized consumer templates; conflicts produce base/current/incoming inputs without overwriting current files.

---

## Canvas directory (`canvasDir`)

Computed at install time:

```text
$HOME/.cursor/projects/{workspace-path-with-separators-as-hyphens}/canvases/
```

Examples:

| OS            | Workspace                   | canvasDir                                                                           |
| ------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| macOS / Linux | `/Users/alice/acme-product` | `~/.cursor/projects/Users-alice-acme-product/canvases/`                             |
| Windows       | `C:\Users\alice\acme`       | `%USERPROFILE%\.cursor\projects\C-Users-alice-acme\canvases\` (drive colon dropped) |

**Research canvas file pattern:**

```text
{canvasDir}/{feature-slug}-research-{topic-slug}.canvas.tsx
```

Create `canvasDir` if missing. Never write research canvases to repo-root `canvases/` or `docs/` — they will not open in Glass.

---

## Feature folder layout

Default:

```text
{featureDocsRoot}/{epic}/features/{feature}/
├── discovery.md
├── gap-analysis.md
├── requirements.md
├── design.md
├── decisions.md      (feature-scoped PDRs — or use a project-level decisions.md)
├── scenario-matrix.md (Phase 3.5 — scenario-hardening skill)
├── dev-handoff.md    (Phase 4 — dev-handoff skill)
├── spec.md           (stub at handoff; engineering completes)
├── workflow-events.jsonl (append-only transition evidence)
├── reviews/          (persisted independent evaluator responses)
├── brief.md          (optional)
└── research/
    ├── sources/      (YouTube/Loom transcripts)
    └── R-{id}-{slug}.md   (optional deep digest)
```

`decisions.md` may live project-wide at the workspace root instead of per feature — start feature-scoped and promote cross-feature decisions later.

**Scaffold:** create the folder tree above and seed `discovery.md` from [`discovery-template.md`](./discovery-template.md) or `{docsProductRoot}/discovery-template.md`.

---

## Transcript script (YouTube / Loom)

Two equivalent implementations ship: `youtube-transcript.sh` (bash — macOS/Linux/Git Bash) and `youtube-transcript.ps1` (PowerShell — Windows). Both live in the **workspace `scripts/`** folder (copied by the install script) — single canonical location, no skill-bundled copies.

Requires **`yt-dlp`** on PATH (`brew install yt-dlp` · `winget install yt-dlp` · OS package manager).

---

## Bundled vs consumer docs

| Location                              | When to use                                                     |
| ------------------------------------- | --------------------------------------------------------------- |
| Skill `references/` or `assets/`      | Skill pack copy (works when skills live in `~/.cursor/skills/`) |
| `{docsProductRoot}/` in consumer repo | **Preferred** after bootstrap — team edits, git-tracked         |

After bootstrap, prefer **`{docsProductRoot}/`** paths in the consumer workspace. Fall back to skill `references/` only if bootstrap was skipped.
