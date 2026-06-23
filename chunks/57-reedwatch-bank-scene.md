# Chunk 57: Reedwatch Bank Scene

Status: complete

## Goal

Turn `chapter-two/reedwatch-bank` from a catalog placeholder into a bespoke Glowfen Wetlands exit scene with visible reed marker lights.

## Completed

- Added `src/scenes/chapterTwo/reedwatchBank.js`.
- Registered the scene in `src/scenes/sceneRegistry.js`.
- Added a Reedwatch Bank renderer in `src/rendering/worldRenderer.js`.
- Added repair effect and progress restore support for the lit-marker state.
- Kept the route flowing to `chapter-three/mossline-switchyard`.

## Verification

- Syntax checks passed for the new scene, renderer, registry, repair flow, and progress files.
- Full route walk still reaches all 100 scenes.
- Route walk confirms `chapter-two/reedwatch-bank` routes to `chapter-three/mossline-switchyard`.
- Local served-page smoke check passed at:
  - `http://127.0.0.1:5208/?v=reedwatch-bank&scene=chapter-two/reedwatch-bank&x=1120&preview=1`

## Next Chunk

Chunk 58 should polish `chapter-three/cargo-cart-turntable`.

Suggested scope:

1. Add a bespoke rail turntable with a stuck cargo cart and wet track pieces.
2. Make completion visibly rotate/align the turntable and move the cart aside.
3. Keep `chapter-three/signal-arm-row` as the next route stop.
