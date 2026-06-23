# Chunk 41: Bell Rope Corner Scene

Status: complete

## Goal

Turn `chapter-one/bell-rope-corner` from a catalog placeholder into a bespoke scene with a visible rope-and-bell repair.

## Completed

- Added `src/scenes/chapterOne/bellRopeCorner.js`.
- Registered the scene in `src/scenes/sceneRegistry.js`.
- Added a bell-corner landmark renderer in `src/rendering/worldRenderer.js`.
- Added repair effect and progress restore support for the bell rope.
- Kept the route flowing to `chapter-one/workshop-lift`.
- Upgraded the scene to the newer Bakery Gutter quality format:
  - Added `assets/sprites/world/bell-rope-corner-painted.png` as the main landmark sprite.
  - Kept `assets/sprites/world/bell-rope-corner-painted-source.png` as the chroma-key source.
  - Removed the random side cottages.
  - Removed the loose gear/coil repair props from the ground.
  - Turned off the generic repair marker so the robot explanation and puzzle popup carry the repair beat.
  - Kept the old canvas-drawn bell corner as a renderer fallback.

## Verification

- Syntax checks passed for the new scene, renderer, and registry.
- Full route walk still reaches all 100 scenes.
- Local served-page smoke check passed at:
  - `http://127.0.0.1:5202/?v=bell-rope&scene=chapter-one/bell-rope-corner&x=1120&preview=1`
- Follow-up checks confirmed the scene now instantiates with `0` cottages, `0` repair parts, and `showMarker: false`.

## Next Chunk

Chunk 42 should polish `chapter-one/workshop-lift`.

Suggested scope:

1. Add a bespoke workshop lift landmark with crank, platform, and roof shelf.
2. Make completion visibly raise or stabilize the platform.
3. Keep `chapter-one/schoolhouse-lanterns` as the next route stop.
