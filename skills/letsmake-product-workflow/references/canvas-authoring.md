# Canvas authoring (LetsMake research deliverables)

**Problem:** Research canvases often render **empty blocks**, **clipped tables**, or **"Add at least one header"** placeholders.

**Root cause:** Agents invent APIs from other UI libraries (`columns={…}`, `CardHeader title=`, `rows={objects}`). The Cursor canvas runtime only supports exports from **`cursor/canvas`** — see `~/.cursor/skills-cursor/canvas/sdk/ui-primitives.d.ts`.

**Not a Glass clipping bug** in most cases — invalid props → empty component shells.

---

## Mandatory before writing any `.canvas.tsx`

1. Read [`canvas`](../../.cursor/skills-cursor/canvas/SKILL.md) skill (location, no fetch, no empty sections).
2. Read SDK typings for every component you use — **do not guess props**.
3. Run the [pre-delivery check](#pre-delivery-check) below.

---

## API cheat sheet (common mistakes)

### Table — use `headers` + `rows[][]`

```tsx
// WRONG — causes "Add at least one header"
<Table columns={[{ key: "a", header: "A" }]} rows={[{ a: "x" }]} />

// RIGHT
<Table
  headers={["Provider", "Commercial fit", "R-07 call"]}
  rows={[
    ["helloao", "Yes — commercial OK", "Best v1 default"],
    ["API.Bible", "Paid commercial", "Later phase"],
  ]}
  striped
/>
```

- `rows` is **`ReactNode[][]`** — map objects in the agent before writing the file.
- Prefer **`<H2>` + `<Table>`** directly; wrap in `Card` only when the card names an entity.

### CardHeader — children only

```tsx
// WRONG — title/subtitle props are ignored → empty header bar
<CardHeader title="Matrix" subtitle="Details" />

// RIGHT
<CardHeader>Provider comparison matrix</CardHeader>
// Subtitle goes in CardBody as Text, or use H2 above the card
```

### Stat / Pill tones

| Component | Valid `tone` values                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `Stat`    | `success` · `danger` · `warning` · `info` (omit for neutral)                                                           |
| `Pill`    | `neutral` · `success` · `warning` · `info` · `added` · `deleted` · `renamed` — use `active` for emphasis, not `accent` |

### Callout

```tsx
<Callout tone="info" title="Recommendation">
  <Text>Body here.</Text>
</Callout>
```

### Theme colors

Use `useHostTheme()` tokens only — no hardcoded hex.

---

## Layout guidance (research canvases)

| Do                                                | Don't                                     |
| ------------------------------------------------- | ----------------------------------------- |
| One `H1`, then stats strip, then 2–4 sections     | 10+ nested Cards with identical structure |
| Tables for matrices; `Callout` for recommendation | Empty `Card` shells "for later"           |
| Inline all data arrays in the file                | `fetch()` or placeholder rows             |
| Omit a section if no data                         | "TODO", "No data", zero-row tables        |

**Max width:** `Stack` with `padding: 24`, `maxWidth: 1200` — wide tables use `framed` + horizontal scroll (default).

---

## Pre-delivery check

Before closing a research spike with a canvas:

- [ ] Every `Table` has non-empty `headers` array and `rows` as array-of-arrays
- [ ] Every `CardHeader` has **text children** (not `title=` prop)
- [ ] No invented props on any `cursor/canvas` component
- [ ] No section renders without real content (canvas skill rule)
- [ ] File path: `~/.cursor/projects/{workspace}/canvases/{name}.canvas.tsx` only
- [ ] Row appended to [`canvas-index.md`](../research/canvas-index.md)

**Optional:** Open canvas in Glass once before marking spike `done`.

---

## When canvas is optional

For **quick** desk spikes, prefer `{feature}/research/R-{id}-*.md` digest only. Require canvas for **standard/deep** spikes or when PO needs charts/comparison matrices in Glass.
