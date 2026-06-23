# Chunk 77: Chapter Six Route Sprite Wiring

Status: complete

## Goal

Continue the full-route sprite integration pass through Chapter 6, preserving the route-sprite format: one strong side-view landmark, no random side cottages, no loose repair props, no broken-branch clutter, and no generic marker unless intentionally needed.

## Completed

- Reviewed `chapter-six/rainbarrel-row` against the Chapter 6 backlog target.
- Confirmed `assets/sprites/world/rainbarrel-row-painted.png` is not present in the workspace.
- Chose to keep the existing hand-built Rainbarrel Row treatment because it already presents the drain, channels, barrels, and gutters in the game's side-view camera.
- Cleaned Rainbarrel Row into the current route format by removing random side cottages and hiding the generic repair marker while preserving the custom rainbarrel repair effect.
- Reviewed the Chapter 6 generated sheet and individual generated assets:
  - `assets/sprites/world/rooftop-channels-painted.png`
  - `assets/sprites/world/flooded-cellar-painted.png`
  - `assets/sprites/world/laundry-lines-painted.png`
  - `assets/sprites/world/pump-alley-painted.png`
  - `assets/sprites/world/overflow-garden-painted.png`
  - `assets/sprites/world/neighborhood-fountain-painted.png`
  - `assets/sprites/world/cistern-house-painted.png`
  - `assets/sprites/world/gutter-bell-painted.png`
  - `assets/sprites/world/stormwater-gate-painted.png`
- Chose bespoke side-view landmark treatments for Rooftop Channels through Stormwater Gate because the generated assets lean angled/three-quarter/isometric rather than matching the game's side-view route camera.
- Added `src/scenes/chapterSix/routeScenes.js` with nine new Chapter 6 route scenes:
  - `chapter-six/rooftop-channels`
  - `chapter-six/flooded-cellar`
  - `chapter-six/laundry-lines`
  - `chapter-six/pump-alley`
  - `chapter-six/overflow-garden`
  - `chapter-six/neighborhood-fountain`
  - `chapter-six/cistern-house`
  - `chapter-six/gutter-bell`
  - `chapter-six/stormwater-gate`
- Registered the new Chapter 6 scene factories in `src/scenes/sceneRegistry.js` so they replace the generic catalog fallback scenes.
- Added a shared `chapterSixLandmark` renderer path in `src/rendering/worldRenderer.js` for the bespoke Chapter 6 side-view landmarks.
- Preserved route flow from `chapter-six/rainbarrel-row` through `chapter-six/stormwater-gate`, then onward to `chapter-seven/old-orchard`.

## Verification

- Syntax checks passed for:
  - `src/scenes/chapterOne/rainbarrelRow.js`
  - `src/scenes/chapterSix/routeScenes.js`
  - `src/scenes/sceneRegistry.js`
  - `src/rendering/worldRenderer.js`
- Static scene-data check confirms all 10 Chapter 6 scenes have `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Static scene-data check confirms Rainbarrel Row remains custom with `rainbarrelRow` data and no generic planned fallback.
- Static scene-data check confirms Rooftop Channels through Stormwater Gate use `chapterSixLandmark` types and no generic planned fallback.
- Chapter 6 route flow now walks `rainbarrel-row` -> `rooftop-channels` -> `flooded-cellar` -> `laundry-lines` -> `pump-alley` -> `overflow-garden` -> `neighborhood-fountain` -> `cistern-house` -> `gutter-bell` -> `stormwater-gate`, then continues to `chapter-seven/old-orchard`.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`.
- Local preview server responded at:
  - `http://127.0.0.1:5272/?scene=chapter-six/rainbarrel-row&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/rooftop-channels&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/flooded-cellar&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/laundry-lines&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/pump-alley&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/overflow-garden&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/neighborhood-fountain&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/cistern-house&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/gutter-bell&x=1120&preview=1`
  - `http://127.0.0.1:5272/?scene=chapter-six/stormwater-gate&x=1120&preview=1`
- Local asset probes confirmed the generated reference assets and active rain barrel sprite respond from the preview server.
- Browser screenshot/canvas automation could not complete in this sandbox: Playwright's Chromium browser downloaded into `/private/tmp/ms-playwright`, but launch failed with a macOS Mach-port permission error.

## Next

Continue route-order sprite wiring at `chapter-seven/old-orchard`.
