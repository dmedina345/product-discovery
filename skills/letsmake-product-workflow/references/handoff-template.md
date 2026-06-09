# Handoff template (post discovery-grill session)

> **Revision (Jun 2026):** Prefer capturing grill output in **`discovery.md`** ([discovery-template.md](./discovery-template.md) § Grill capture). Use this template only for legacy `handoff.md` or when explicitly requested.

**Purpose:** Capture discovery output after discovery-grill. **Contract draft** — not dev SSOT. Consolidate into `requirements.md` during gap pass.

**How to use**

1. Copy everything below the line `--- TEMPLATE START ---` into  
   `docs/epics/{epic}/features/{feature}/handoff.md`
2. Fill every `[bracket]`; delete optional sections marked `(optional)` if N/A
3. Run the [LetsMake Product Workflow](./letsmake-product-workflow.md) gap pass before marking dev-ready
4. Do **not** maintain `handoff.md` as SSOT after consolidation—archive or add header: `Status: Superseded by requirements.md`

**Ready for gap pass?** All Must bullets have clear outcomes; open questions are listed (not hidden); platform matrix is filled.

---

## TEMPLATE START

# Feature handoff: [Feature Name]

**App / product:** [e.g. Acme App]  
**Epic:** [epic-slug]  
**Feature:** [feature-slug]  
**Grill session date:** YYYY-MM-DD  
**Participants:** [names/roles]  
**Status:** Draft — post grill, pre gap pass  
**Next owner:** [BA/PO name] → gap pass → `requirements.md`

**Sources:** [links to workshop notes, Figma, prior specs, ADRs]

---

## Problem (user + business)

**User perspective (1–2 sentences):**  
[e.g. "I want the home screen to feel like the default place to land and reach my saved items without hidden gestures."]

**Business / product problems (numbered):**

1. [Problem 1 — measurable if possible]
2. [Problem 2]
3. [Problem 3]

---

## Solution summary

[3–6 sentences: what we are building, default behaviors, what we are explicitly *not* doing in v1.]

---

## Information architecture

### Spatial model

```text
[ASCII diagram: overlays, primary areas, adjacency]
```

### Section / area map

| Position / order | Name              | Type (primary / overlay / modal) | Default?         | Notes         |
| ---------------- | ----------------- | -------------------------------- | ---------------- | ------------- |
| [e.g. start]     | [Home]            | Primary                          | Yes (cold start) |               |
| [e.g. right]     | [Content Library] | Primary                          | No               |               |
| —                | [Account]         | Overlay drawer                   | —                | Not on canvas |

### Adjacency (navigation)

| From        | Action A                      | Action B                          |
| ----------- | ----------------------------- | --------------------------------- |
| [Section A] | → [Section B] via [swipe/tap] | → [Overlay] via [gesture/control] |

### Boundaries & non-goals (IA)

- [e.g. Two primary sections only; no wrap]
- [e.g. Bottom tab bar replaced—not dual navigation]

---

## Interaction design

### [Area 1 — e.g. Top bar]

- [Bullet requirements]

### [Area 2 — e.g. Account drawer]

| Property  | Requirement                                       |
| --------- | ------------------------------------------------- |
| [Width]   | [~80%]                                            |
| [Open]    | [hamburger + in-content swipe; not iOS left edge] |
| [Dismiss] | [backdrop tap, swipe closed]                      |

### Gestures (if applicable)

- [Snap paging, disambiguation rules, end behavior]

### Migration / discovery (if applicable)

- [Coachmark copy, dismiss rules, tap-first principle]

---

## Platform behavior

| Platform | [Capability 1] | [Capability 2]                 | URLs / notes |
| -------- | -------------- | ------------------------------ | ------------ |
| iOS      | [Yes/No]       | [Yes/No]                       | [N/A]        |
| Android  | [Yes/No]       | [Back stack order if relevant] |              |
| Web      | [Yes/No]       | [Keyboard shortcuts]           | [`/path`]    |

**Parity statement:** [Same mental model / order / defaults; list intentional differences]

---

## Stories (draft — bullet form)

Use **short titles + outcome bullets** in the grill session. Convert to Gherkin in `requirements.md` during gap pass.

### Must Have

**[Category]: [Story title]**

- [Outcome bullet — observable]
- [Outcome bullet]

**[Category]: [Story title]**

- [Outcome bullet]

### Should Have

**[Story title]**

- [Outcome bullet]

### Won't Have (v1)

- [Explicit exclusion]
- [Explicit exclusion]

---

## Resolved decisions (this session)

| #   | Topic   | Decision   | Rationale (optional) |
| --- | ------- | ---------- | -------------------- |
| 1   | [Topic] | [Decision] |                      |
| 2   | [Topic] | [Decision] |                      |

---

## Open questions (needs gap pass / stakeholder)

| Topic              | Question                                   | Owner     | Target date |
| ------------------ | ------------------------------------------ | --------- | ----------- |
| [e.g. Analytics]   | [Event list for v1?]                       | [PO/Data] |             |
| [e.g. Performance] | [Cancel in-flight fetch on section leave?] | [Eng]     |             |

---

## Terminology (inline)

| Term              | Meaning      |
| ----------------- | ------------ |
| [Primary section] | [Definition] |
| [Canvas]          | [Definition] |

_(optional)_ Program glossary: `CONTEXT.md` at the repo/program root, or equivalent.

---

## UX principles (guardrails)

- [e.g. Gestures supplement tap—they never replace visible targets]
- [e.g. Users always know which primary section is active]
- [e.g. Shell navigation never blocks on section content loading]

---

## Dependencies & assumptions (draft)

**Assumptions**

- [e.g. Home feed module exists or ships with this feature]

**Dependencies**

- [Team / system / feature]

---

## Handoff checklist (BA — before gap pass)

- [ ] Problem and solution align with epic `brief.md` (or brief updated)
- [ ] IA diagram matches stakeholder walkthrough
- [ ] Platform matrix covers iOS, Android, web (or documents N/A)
- [ ] Every Must story has at least one **observable** outcome bullet
- [ ] Won't Have lists prevent known scope creep
- [ ] Open questions are **named**, not deferred silently
- [ ] No duplicate SSOT (if a PRD exists elsewhere, note "exploratory only")

## Gap pass preview (what happens next)

| Handoff section    | Becomes in `requirements.md`                           |
| ------------------ | ------------------------------------------------------ |
| Stories (bullets)  | Gherkin + Definition of Done per Must                  |
| Open questions     | Resolved table or escalated                            |
| Platform matrix    | Same + NFR / resilience tables                         |
| Resolved decisions | Merged + dated gap-pass row                            |
| —                  | Add: Analytics intent, NFRs, Dependencies, Assumptions |

**Dev handoff gate:** `requirements.md` approved + `design.md` aligned + open questions closed or explicitly deferred to `spec.md` only.

---

## TEMPLATE END
