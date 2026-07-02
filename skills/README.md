# LetsMake Product Workflow skills

Cursor Agent Skills for the **LetsMake Product Workflow** (BA/PO). Canonical docs: [`letsmake-product-workflow/references/`](./letsmake-product-workflow/references/README.md) (bootstrap copies them to the consumer's `docs/product/`).

| Skill                                                                 | Use when                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------ |
| [intake-synthesize](./intake-synthesize/SKILL.md)                     | Chat/transcript/brief paste at kickoff                 |
| [grill-me](./grill-me/SKILL.md)                                       | Stress-test plan; "grill me" (flags research)          |
| [research-spike](./research-spike/SKILL.md)                           | Desk/Figma/video research (parallel default)           |
| [memory-recall](./memory-recall/SKILL.md)                             | "Did we decide/research X?" — search memory first      |
| [grill-to-handoff](./grill-to-handoff/SKILL.md)                       | Capture grill → `discovery.md`                         |
| [gap-pass](./gap-pass/SKILL.md)                                       | Gap analysis + AskQuestion → Consolidated requirements |
| [increment-requirements](./increment-requirements/SKILL.md)           | Refine a Consolidated `requirements.md` (PDRs + rules) |
| [dev-handoff](./dev-handoff/SKILL.md)                                 | DoR check + handoff note + `spec.md` stub              |
| [wiki-lint](./wiki-lint/SKILL.md)                                     | Doc/link/ID health; contradiction flags                |
| [**letsmake-product-workflow**](./letsmake-product-workflow/SKILL.md) | Orchestrate the full LetsMake path                     |
| [small-change-requirements](./small-change-requirements/SKILL.md)     | Narrow change; patch SSOT without full grill           |

**Install (recommended):** `npx skills add dmedina345/product-discovery --all -a cursor -y` — always include `letsmake-product-workflow` (it hosts the shared `references/` every other skill links to).

**Repo-as-workspace alternative:** symlink into `.cursor/skills/`:

```bash
mkdir -p .cursor/skills
for s in intake-synthesize grill-me research-spike memory-recall grill-to-handoff gap-pass increment-requirements dev-handoff wiki-lint letsmake-product-workflow small-change-requirements; do
  ln -sf "../../skills/$s" ".cursor/skills/$s"
done
```

Symlinks are **relative**, so they survive a clone on macOS/Linux. On Windows, enable symlink support (`git config core.symlinks true`) or re-run the loop above after cloning (Git Bash).

Path resolution: [letsmake-product-workflow/references/paths.md](./letsmake-product-workflow/references/paths.md)
