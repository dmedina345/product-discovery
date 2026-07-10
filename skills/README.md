# LetsMake Product Workflow skills

Cursor Agent Skills for the **LetsMake Product Workflow** (BA/PO). Canonical docs: [`letsmake-product-workflow/references/`](./letsmake-product-workflow/references/README.md) (bootstrap copies them to the consumer's `docs/product/`).

| Skill                                                                 | Use when                                                |
| --------------------------------------------------------------------- | ------------------------------------------------------- |
| [**which-skill-next**](./which-skill-next/SKILL.md)                   | Unsure which skill or phase to run                      |
| [intake-synthesize](./intake-synthesize/SKILL.md)                     | Chat/transcript/brief paste at kickoff                  |
| [grill-me](./grill-me/SKILL.md)                                       | Stress-test a concept; "grill me" — captures as it goes |
| [research-spike](./research-spike/SKILL.md)                           | Desk/Figma/video research (parallel default)            |
| [gap-pass](./gap-pass/SKILL.md)                                       | PO question loop → Consolidated requirements            |
| [increment-requirements](./increment-requirements/SKILL.md)           | Change control on a Consolidated `requirements.md`      |
| [scenario-hardening](./scenario-hardening/SKILL.md)                   | Agent-readiness edge-case pass before dev handoff       |
| [dev-handoff](./dev-handoff/SKILL.md)                                 | DoR check + handoff note + `spec.md` stub               |
| [wiki-lint](./wiki-lint/SKILL.md)                                     | Doc/link/ID health; contradiction flags                 |
| [**letsmake-product-workflow**](./letsmake-product-workflow/SKILL.md) | Orchestrate the full LetsMake path                      |
| [small-change-requirements](./small-change-requirements/SKILL.md)     | Narrow change; patch SSOT without full grill            |

**Install (recommended):** `npx skills add dmedina345/product-discovery --all -a cursor -y` — always include `letsmake-product-workflow` (it hosts the shared `references/` every other skill links to).

**Repo-as-workspace alternative:** symlink into `.cursor/skills/`:

```bash
mkdir -p .cursor/skills
for s in which-skill-next intake-synthesize grill-me research-spike gap-pass increment-requirements scenario-hardening dev-handoff wiki-lint letsmake-product-workflow small-change-requirements; do
  ln -sf "../../product-discovery/skills/$s" ".cursor/skills/$s"
done
```

Symlinks are **relative**, so they survive a clone on macOS/Linux. On Windows, enable symlink support (`git config core.symlinks true`) or re-run the loop above after cloning (Git Bash).

Path resolution: [letsmake-product-workflow/references/paths.md](./letsmake-product-workflow/references/paths.md)
