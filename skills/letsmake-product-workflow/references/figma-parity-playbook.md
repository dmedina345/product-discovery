# Figma parity playbook

How to pull **design truth** into product docs when Figma leads or co-evolves with requirements. Addresses dev-comment access gaps from Messenger 4.0 parity work (Jun 2026).

**Related:** [`figma-parity-summary.md`](../messenger-4.0/figma-parity-summary.md) · gap pass design rows · [`research-spike`](../../skills/research-spike/SKILL.md) type `figma`

---

## Preflight

- [ ] Figma MCP plugin **authenticated** (Cursor Settings → MCP / `/add-plugin figma`)
- [ ] User has **view or edit** access to the file (view-only is enough for parity read)
- [ ] **Dev seat** on org plan for full MCP read surface (team setup)
- [ ] Record in `discovery.md`: file key, frame URLs, node IDs, review date
- [ ] Read [`CONTEXT.md`](../../CONTEXT.md) before renaming product terms

---

## Tool choice (critical)

| Need                               | Tool                                                        | Dev annotations?       |
| ---------------------------------- | ----------------------------------------------------------- | ---------------------- |
| Layout, components, text, tokens   | `get_design_context`, `get_screenshot`, `get_metadata`      | **Unreliable**         |
| **Designer dev comments** on nodes | `use_figma` + **`node.annotations`** on **listed node IDs** | **Yes** (when present) |
| Variable definitions               | `get_variable_defs`                                         | N/A                    |
| Stuck / MCP partial                | User screenshot with **Dev Mode comments visible**          | Fallback               |

**Do not** assume `get_design_context` includes dev comments. Record which tool confirmed each requirement note.

---

## Parity workflow

1. **Inventory frames** — list sections (For You, Library, Profile, Menu, Chat, Search…) with node IDs in `discovery.md` or `figma-parity-summary.md`.
2. **Layout pass** — `get_design_context` + screenshot per major frame.
3. **Annotation pass** — for each frame with known product rules in dev comments, run annotation scan on explicit nodes (e.g. Menu `632:23104`, Search `632:23116`).
4. **Gap register** — rows: Requirement area | Figma shows | Req says | Status (match / delta / missing annotation).
5. **PO decisions** — log in **`gap-analysis.md`** PO decisions log; merge resolved facts into **clean requirements prose** at gap pass.
6. **Do not** use `[FIGMA Δ]` diff blocks in `requirements.md`. Open items → **`## Missing info & clarifications`** with **TBC** markers. Historical diffs → `parity-resolution-archive.md` (program) or gap-analysis notes only.

---

## Annotation pass procedure

When annotations are required:

1. Collect node IDs from metadata or user-provided URLs (`node-id=` → `:` in API).
2. Invoke **`research-spike`** with `type: figma`, prompt listing nodes + questions, **parallel** unless user waits.
3. Log in findings:
   - Node ID
   - Annotation text (quote)
   - Requirement story / gap row affected
4. If **no annotations found** on a node, mark **MISSING** — do not infer "no rule."

**Known gap:** Profile frames had **no** dev annotations via traversal (Jun 2026) — behavior inferred from layout; flag for design/PO.

---

## Design-first track

When client iterates in Figma before reqs lock:

- `discovery.md` **Status:** Design-led
- Requirements stay **Draft** until gap pass after parity + PO loop
- Gap pass adds matrix rows: design vs discovery vs prior SSOT
- Visual-only unknowns → **defer to design**; behavior unknowns → **AskQuestion** or **TBC** story

---

## Failure modes & fixes

| Symptom                                      | Likely cause              | Fix                            |
| -------------------------------------------- | ------------------------- | ------------------------------ |
| MCP tools missing                            | Plugin not auth           | `mcp_auth` / reconnect plugin  |
| Empty design context                         | Wrong node or permissions | Verify URL; check seat/plan    |
| Comments in Figma UI but not in agent output | Used wrong tool           | `use_figma` annotation scan    |
| Web variant missing                          | Frame not exported        | Ask for screenshot or node URL |
| Blank screenshot export                      | Export bug                | Re-export; try different frame |

---

## Output locations

| Artifact                       | Contents                                                         |
| ------------------------------ | ---------------------------------------------------------------- |
| `discovery.md`                 | Links, node IDs, research `R-FIGMA-*` rows                       |
| `figma-parity-summary.md`      | Coverage matrix (high level)                                     |
| `gap-analysis.md`              | PO decisions log, coverage matrix, scope drops, parity conflicts |
| `requirements-audit.md`        | Program-level decision/sync logs (Messenger 4.0)                 |
| `parity-resolution-archive.md` | Historical inline diff blocks (reference only)                   |
| `requirements.md`              | **Clean** Consolidated SSOT — Overview, stories, Missing info    |
| **Canvas**                     | Optional shareable parity/decision digest (large reviews)        |
