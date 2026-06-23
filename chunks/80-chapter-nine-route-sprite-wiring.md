# Chunk 80: Chapter Nine Route Sprite Wiring

Status: complete

## Goal

Continue the full-route sprite integration pass through Chapter 9, preserving the route-sprite format: one strong side-view landmark, no random side cottages, no loose repair props, no broken-branch clutter, and no generic marker unless intentionally needed.

## Completed

- Reviewed the Chapter 9 generated sheet and individual generated assets:
  - `assets/sprites/world/under-village-painted.png`
  - `assets/sprites/world/echo-door-painted.png`
  - `assets/sprites/world/old-pipe-crossing-painted.png`
  - `assets/sprites/world/forgotten-machine-painted.png`
  - `assets/sprites/world/drain-locks-painted.png`
  - `assets/sprites/world/buried-murals-painted.png`
  - `assets/sprites/world/gear-room-painted.png`
  - `assets/sprites/world/underground-stream-painted.png`
  - `assets/sprites/world/sealed-workshop-painted.png`
  - `assets/sprites/world/heart-engine-painted.png`
- Chose bespoke side-view landmark treatments for all 10 Chapter 9 route scenes. The generated assets are useful visual references, but the sheet leans angled/three-quarter/isometric, so custom side-view underground landmarks fit the game camera better.
- Added `src/scenes/chapterNine/routeScenes.js` with 10 Chapter 9 route scenes:
  - `chapter-nine/under-village`
  - `chapter-nine/echo-door`
  - `chapter-nine/old-pipe-crossing`
  - `chapter-nine/forgotten-machine`
  - `chapter-nine/drain-locks`
  - `chapter-nine/buried-murals`
  - `chapter-nine/gear-room`
  - `chapter-nine/underground-stream`
  - `chapter-nine/sealed-workshop`
  - `chapter-nine/heart-engine`
- Registered the Chapter 9 scene factories in `src/scenes/sceneRegistry.js` so they replace the generic catalog fallback scenes.
- Added a shared `chapterNineLandmark` renderer path in `src/rendering/worldRenderer.js` for bespoke underground side-view landmarks.
- Preserved route flow from `chapter-nine/under-village` through `chapter-nine/heart-engine`, then onward to `chapter-ten/festival-return`.
- Updated `chunks/70-full-route-sprite-backlog.md` to mark Chapter 9 as reviewed/kept on bespoke side-view treatment.

## Verification

- Syntax checks passed for:
  - `src/scenes/chapterNine/routeScenes.js`
  - `src/scenes/sceneRegistry.js`
  - `src/rendering/worldRenderer.js`
- Static scene-data check confirms all 10 Chapter 9 scenes have `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Static scene-data check confirms all 10 Chapter 9 scenes use `chapterNineLandmark` types and no generic planned fallback.
- Chapter 9 route flow now walks `under-village` -> `echo-door` -> `old-pipe-crossing` -> `forgotten-machine` -> `drain-locks` -> `buried-murals` -> `gear-room` -> `underground-stream` -> `sealed-workshop` -> `heart-engine`, then continues to `chapter-ten/festival-return`.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`.
- Local preview server responded for each Chapter 9 scene at `http://127.0.0.1:5275/?scene=chapter-nine/<scene>&x=1120&preview=1`.
- Local asset probes confirmed the generated Chapter 9 reference assets respond from the preview server.
- Node render smoke with a stubbed canvas context passed for all 10 Chapter 9 scenes in both unrepaired and repaired power states.

## Next

Continue route-order sprite wiring at `chapter-ten/festival-return`.
