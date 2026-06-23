# Chunk 43: Schoolhouse Lanterns Scene

Status: complete

## Goal

Turn `chapter-one/schoolhouse-lanterns` from a catalog placeholder into a bespoke scene with a visible three-lantern repair.

## Completed

- Added `src/scenes/chapterOne/schoolhouseLanterns.js`.
- Registered the scene in `src/scenes/sceneRegistry.js`.
- Added a schoolhouse landmark renderer in `src/rendering/worldRenderer.js`.
- Added repair effect and progress restore support for the lantern chain.
- Kept the route flowing to `chapter-one/market-awnings`.

## Verification

- Syntax checks passed for the new scene, renderer, registry, repair flow, and progress files.
- Full route walk still reaches all 100 scenes.
- Local served-page smoke check passed at:
  - `http://127.0.0.1:5203/?v=schoolhouse-lanterns&scene=chapter-one/schoolhouse-lanterns&x=1120&preview=1`

## Next Chunk

Chunk 44 should polish `chapter-one/market-awnings`.

Suggested scope:

1. Add a bespoke market awnings landmark with cloth panels and rain runoff.
2. Make completion visibly tilt or drain the awnings into barrels.
3. Keep `chapter-one/old-footbridge` as the next route stop.
