# General repo — LetsMake Product Workflow skills

Cursor Agent Skills for the **LetsMake Product Workflow** (BA/PO). Canonical docs: [`docs/product/`](../docs/product/README.md) · **Cheat sheet:** [`cheat-sheet.md`](../docs/product/cheat-sheet.md)

| Skill                                                                 | Use when                                               |
| --------------------------------------------------------------------- | ------------------------------------------------------ |
| [intake-synthesize](./intake-synthesize/SKILL.md)                     | Chat/transcript/brief paste at kickoff                 |
| [grill-me](./grill-me/SKILL.md)                                       | Stress-test plan; "grill me" (flags research)          |
| [research-spike](./research-spike/SKILL.md)                           | Desk/Figma/video/YouTube research (parallel default)   |
| [grill-to-handoff](./grill-to-handoff/SKILL.md)                       | Capture grill → `discovery.md`                         |
| [gap-pass](./gap-pass/SKILL.md)                                       | Gap analysis + AskQuestion → Consolidated requirements |
| [increment-requirements](./increment-requirements/SKILL.md)           | Refine a Consolidated `requirements.md` (PDRs + rules) |
| [**letsmake-product-workflow**](./letsmake-product-workflow/SKILL.md) | Orchestrate full LetsMake path or dev handoff          |
| [small-change-requirements](./small-change-requirements/SKILL.md)     | Narrow change; patch SSOT without full grill           |

**Cursor discovery:** Symlink into `.cursor/skills/`:

```bash
mkdir -p .cursor/skills
for s in intake-synthesize grill-me research-spike grill-to-handoff gap-pass increment-requirements letsmake-product-workflow small-change-requirements; do
  ln -sf "../../skills/$s" ".cursor/skills/$s"
done
```

Symlinks are **relative**, so they survive a clone on macOS/Linux. On Windows, enable symlink support (`git config core.symlinks true`) or re-run the loop above after cloning.

See [`docs/product/letsmake-product-workflow.md`](../docs/product/letsmake-product-workflow.md).
