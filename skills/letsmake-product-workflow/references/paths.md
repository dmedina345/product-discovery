# LetsMake path resolution

Read **`.cursor/letsmake.config.json`** at the **consumer workspace root** before reading templates or writing canvases.

If missing, tell the user to run:

```bash
bash /path/to/product-discovery/scripts/install-letsmake.sh
```

(from their product repo root, or pass `--workspace /path/to/repo`)

To validate an existing setup (config keys, resolved paths, writable `canvasDir`, `yt-dlp`) without writing anything:

```bash
bash /path/to/product-discovery/scripts/install-letsmake.sh --check
```

---

## Config schema (v1)

```json
{
  "version": 1,
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

---

## Canvas directory (`canvasDir`)

Computed at install time:

```text
$HOME/.cursor/projects/{workspace-path-with-slashes-as-hyphens}/canvases/
```

Example: workspace `/Users/alice/acme-product` →  
`~/.cursor/projects/Users-alice-acme-product/canvases/`

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
├── brief.md          (optional)
└── research/
    ├── sources/      (YouTube transcripts)
    └── R-{id}-{slug}.md   (optional deep digest)
```

**Scaffold without make-harness:** create the folder tree above and seed `discovery.md` from [`discovery-template.md`](./discovery-template.md) or `{docsProductRoot}/discovery-template.md`.

---

## YouTube transcript script

Resolve in order:

1. `~/.cursor/skills/research-spike/scripts/youtube-transcript.sh` (global skills install)
2. `{workspace}/.cursor/skills/research-spike/scripts/youtube-transcript.sh` (project install)
3. `{workspace}/scripts/youtube-transcript.sh` (copied by `install-letsmake.sh`)

Requires **`yt-dlp`** on PATH (`brew install yt-dlp` or OS package manager).

---

## Bundled vs consumer docs

| Location                              | When to use                                                     |
| ------------------------------------- | --------------------------------------------------------------- |
| Skill `references/` or `assets/`      | Skill pack copy (works when skills live in `~/.cursor/skills/`) |
| `{docsProductRoot}/` in consumer repo | **Preferred** after bootstrap — team edits, git-tracked         |

After bootstrap, prefer **`{docsProductRoot}/`** paths in the consumer workspace. Fall back to skill `references/` only if bootstrap was skipped.
