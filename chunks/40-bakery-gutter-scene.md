# Chunk 40: Bakery Gutter Scene

Status: complete

## Goal

Turn `chapter-one/bakery-gutter` from a catalog placeholder into the first bespoke scene after the Water Wheel Yard.

## Completed

- Added `src/scenes/chapterOne/bakeryGutter.js`.
- Registered the scene in `src/scenes/sceneRegistry.js`.
- Added a bakery landmark renderer in `src/rendering/worldRenderer.js`.
- Added a bakery repair effect in `src/interaction/repairFlow.js` and progress restore support in `src/core/progress.js`.
- Kept the route flowing to `chapter-one/bell-rope-corner`.

## Verification

- Syntax checks passed for the new scene, renderer, repair flow, and progress files.
- Full route walk still reaches all 100 scenes.
- Local served-page smoke check passed at:
  - `http://127.0.0.1:5202/?v=bakery-gutter&scene=chapter-one/bakery-gutter&x=1120&preview=1`

## Next Chunk

Chunk 41 should polish `chapter-one/bell-rope-corner`.

Suggested scope:

1. Add a bell-corner landmark with rope, pulley, and small safe-clear bell.
2. Make completion visibly reconnect the rope and light the corner.
3. Keep `chapter-one/workshop-lift` as the next route stop.
