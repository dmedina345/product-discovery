# R-01 — Save/collection comparables

**Question:** How do leading apps structure saving + collections (default pool, multi-membership, sharing)?  
**Type:** comparable · **Depth:** standard · **Date:** 2026-07-02 · **Canvas:** none (no-Glass environment)

## Outcome: proceed — adopt the Instagram model

| Pattern axis         | Instagram collections            | Pinterest boards                  | Implication for Platewise                 |
| -------------------- | -------------------------------- | ---------------------------------- | ------------------------------------------ |
| Default pool         | Automatic "All" — save first, organize later | Board-first — choosing a board is part of saving | Keep one-tap save; auto "All saves" pool |
| Multi-membership     | Item can join multiple collections | Pin duplicated across boards      | Support 0..n membership on one save        |
| Visibility           | Private only                     | Public or secret; collaborative    | Private-only v1; sharing separable later   |
| Known failure mode   | Long collection-picker list      | Board sprawl                       | Recents-first picker + search at > 6       |

## Sources

- [How to use Instagram collections — TNW](https://thenextweb.com/news/how-to-use-instagram-collections)
- [Organize saved Instagram posts — iPhoneLife](https://www.iphonelife.com/content/how-to-organize-your-saved-instagram-photos-pinterest-board)
- [How to create boards — Pinterest Create](https://create.pinterest.com/product-features/how-to-create-boards/)
- [Fixing Instagram's Saved feature — UX case study](https://medium.com/@somyakaushik0911/fixing-instagrams-saved-feature-a-ux-journey-33a3014fd9eb)

## Verification

3 load-bearing claims cited above. **Removed:** YouTube playlist default behavior (no primary source found; not load-bearing). **Counter-evidence:** Pinterest's board-first friction is intentional for curation-led products — Platewise saves are utility-led, so the analogy favors Instagram's model.

**Confidence:** medium-high.

## Proposed changes → see discovery.md § Research findings (all four adopted D2–D4, D6)

## Adjacent (outside the R-01 question)

Screenshot-detection "save this?" prompt → suggested sibling feature (capture); PO dispositioned to epic backlog at gap pass.
