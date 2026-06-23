# Chunk 44: Market Awnings Scene

Status: complete

## Goal

Turn `chapter-one/market-awnings` from a catalog placeholder into a bespoke scene with visible cloth awnings and rain runoff.

## Completed

- Added `src/scenes/chapterOne/marketAwnings.js`.
- Registered the scene in `src/scenes/sceneRegistry.js`.
- Added a market awnings landmark renderer in `src/rendering/worldRenderer.js`.
- Added repair effect and progress restore support for the awnings.
- Kept the route flowing to `chapter-one/old-footbridge`.

## Verification

- Syntax checks passed for the new scene, renderer, registry, repair flow, and progress files.
- Full route walk still reaches all 100 scenes.
- Local served-page smoke check passed at:
  - `http://127.0.0.1:5204/?v=market-awnings&scene=chapter-one/market-awnings&x=1120&preview=1`

## Next Chunk

Chunk 45 should polish `chapter-one/old-footbridge`.

Suggested scope:

1. Add a bespoke old footbridge landmark over a swollen stream.
2. Make completion visibly lock the planks into a safer crossing.
3. Keep `chapter-one/rain-drain-corner` as the next route stop.
