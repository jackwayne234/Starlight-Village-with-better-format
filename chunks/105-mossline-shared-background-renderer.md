# Chunk 105: Mossline Shared Background Renderer

Status: complete

## Goal

Wire the shared Mossline background into all Chapter 3 scenes while preserving
route order, repair mechanics, and non-Chapter-3 behavior.

## Completed

- Added `sprites.chapterThree.backgrounds.mosslineBackground`.
- Updated `drawBackdrop()` so `chapter-three/` scenes draw the shared Mossline
  background before the generic painted scenery fallback.
- The Chapter 3 backdrop uses a single oversized panned image instead of
  repeating the asset, avoiding visible seams from a non-tiling generated
  background.
- Skipped the extra code-drawn cloud bands for Chapter 3 because the painted
  background already includes rainy sky and mist.
- Left Chapter 2 wetland and other chapter background behavior intact.

## Verification

- Syntax checks passed for `src/rendering/sprites.js` and
  `src/rendering/backdropRenderer.js`.
- In-app browser preview passed at
  `http://127.0.0.1:5330/?scene=chapter-three/mossline-switchyard&x=1120&preview=1&v=mossline104`
  with no captured warnings or errors.
- Visual preview confirmed the shared background renders without the earlier
  seam/repeated-edge issue.

## Next

Chunk 106: add the mostly visual Chapter 2-to-3 transition page.
