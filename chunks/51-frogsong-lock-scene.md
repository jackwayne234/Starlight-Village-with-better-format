# Chunk 51: Frogsong Lock Scene

Status: complete

## Goal

Turn `chapter-two/frogsong-lock` from a catalog placeholder into a bespoke Glowfen Wetlands scene with a visible reed gate and call-stone repair.

## Completed

- Added `src/scenes/chapterTwo/frogsongLock.js`.
- Registered the scene in `src/scenes/sceneRegistry.js`.
- Added a frogsong lock renderer in `src/rendering/worldRenderer.js`.
- Added repair effect and progress restore support for the gate-open state.
- Kept the route flowing to `chapter-two/sunken-signpost`.

## Verification

- Syntax checks passed for the new scene, renderer, registry, repair flow, and progress files.
- Full route walk still reaches all 100 scenes.
- Route walk confirms the sequence `chapter-two/bog-bridge` -> `chapter-two/frogsong-lock` -> `chapter-two/sunken-signpost`.
- Local served-page smoke check passed at:
  - `http://127.0.0.1:5206/?v=frogsong-lock&scene=chapter-two/frogsong-lock&x=1120&preview=1`

## Next Chunk

Chunk 52 should polish `chapter-two/sunken-signpost`.

Suggested scope:

1. Add a bespoke half-submerged signpost or marker landmark without using the removed arrow signpost language.
2. Make completion visibly lift/restore the marker and light nearby reeds.
3. Keep `chapter-two/mist-pool` as the next route stop.
