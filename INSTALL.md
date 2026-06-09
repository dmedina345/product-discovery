# Installation guide

## Who this is for

Product leads, BAs, and POs using **Cursor Agent** to run structured discovery, grilling, parallel research, and gap pass before engineering writes `spec.md`.

## Install paths

| Goal                | Steps                                              |
| ------------------- | -------------------------------------------------- |
| **Try in one repo** | Bootstrap workspace + `npx skills add`             |
| **Share with team** | Publish GitHub repo → same two steps per developer |
| **Global skills**   | `npx skills add … --all -a cursor -g -y`           |

## Step 1 — Clone or fetch this pack

```bash
git clone https://github.com/dmedina345/product-discovery.git
```

## Step 2 — Bootstrap your product repo

Run from the **root of the repo where you keep epics/features** (not inside this skills repo):

```bash
bash /path/to/product-discovery/scripts/install-letsmake.sh \
  --workspace /path/to/your-product-repo \
  --pack-dir /path/to/product-discovery
```

**Creates (if missing):**

| Path                            | Purpose                                |
| ------------------------------- | -------------------------------------- |
| `docs/product/*.md`             | Templates, playbooks, cheat sheet      |
| `docs/research/canvas-index.md` | Canvas bookmark index                  |
| `docs/lessons-learned.md`       | Team conventions (template)            |
| `scripts/youtube-transcript.sh` | YouTube caption fetch for research     |
| `.cursor/letsmake.config.json`  | Paths + `canvasDir` for this workspace |

Existing files are **not overwritten** (safe to re-run).

## Step 3 — Install Cursor skills

```bash
npx skills add dmedina345/product-discovery --all -a cursor -y
```

Install specific skills only:

```bash
npx skills add dmedina345/product-discovery \
  --skill letsmake-product-workflow \
  --skill discovery-grill \
  --skill research-spike \
  -a cursor -y
```

## Step 4 — Install yt-dlp (video research)

```bash
brew install yt-dlp   # macOS
# or: pip install yt-dlp / apt install yt-dlp
```

## Step 5 — Create first feature folder

```bash
mkdir -p docs/epics/my-program/features/my-feature/research/sources
cp docs/product/discovery-template.md docs/epics/my-program/features/my-feature/discovery.md
# Edit discovery.md header (epic, feature, status)
```

Optional: use make-harness `scaffold-feature` if your repo has it.

## Verify install

Run the doctor first — it validates config keys, resolved paths, a writable `canvasDir`, and `yt-dlp` without writing anything:

```bash
bash /path/to/product-discovery/scripts/install-letsmake.sh --check --workspace .
```

Exit `0` = healthy (warnings allowed); exit `1` = not bootstrapped or `canvasDir` unwritable. Then sanity-check in the agent:

1. Open product repo in Cursor.
2. In Agent chat: “Run intake on [paste brief]” — agent should load `intake-synthesize`.
3. Paste a YouTube URL during grill — research should fetch transcript via `scripts/youtube-transcript.sh` or skill-bundled script.

## Path resolution (for agents)

All skills read **[skills/letsmake-product-workflow/references/paths.md](./skills/letsmake-product-workflow/references/paths.md)** and **`.cursor/letsmake.config.json`**.

| Variable          | Source                                         |
| ----------------- | ---------------------------------------------- |
| Product playbooks | `{docsProductRoot}/` (default `docs/product/`) |
| Feature docs      | `{featureDocsRoot}/{epic}/features/{feature}/` |
| Research canvases | `{canvasDir}/` from config                     |
| YouTube script    | skill `scripts/` or workspace `scripts/`       |

## Troubleshooting

| Problem                                | Fix                                                                 |
| -------------------------------------- | ------------------------------------------------------------------- |
| Skills not found                       | Re-run `npx skills add … -a cursor`; restart Cursor                 |
| Canvas link does not open in Glass     | Canvas must be under `canvasDir` from config — not repo `canvases/` |
| YouTube transcript fails               | Install `yt-dlp`; video needs English captions                      |
| Agent asks for missing templates       | Re-run `install-letsmake.sh`                                        |
| Hardcoded paths in old discovery files | Update links to use `canvasDir` from your config                    |
| Unsure if setup is healthy             | Run `install-letsmake.sh --check` (doctor mode)                     |

## Updating

```bash
npx skills update
bash /path/to/product-discovery/scripts/install-letsmake.sh --workspace .
# Manually merge any changed templates in docs/product/ if you customized them
```

## Publishing this pack (maintainers)

1. Published at `https://github.com/dmedina345/product-discovery`.
2. Optional: list on [skills.sh](https://skills.sh/) via the skills CLI ecosystem.
3. Tag releases (`v1.0.0`) for teams to pin the bootstrap script URL.
