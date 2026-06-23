# Chunk 81: Chapter Ten Route Sprite Wiring

Status: complete

## Goal

Finish the full-route sprite integration pass through Chapter 10, preserving the route-sprite format: one strong side-view landmark, no random side cottages, no loose repair props, no broken-branch clutter, and no generic marker unless intentionally needed.

## Completed

- Reviewed the Chapter 10 generated sheet and individual generated assets:
  - `assets/sprites/world/festival-return-painted.png`
  - `assets/sprites/world/lantern-parade-painted.png`
  - `assets/sprites/world/music-stage-painted.png`
  - `assets/sprites/world/food-stalls-painted.png`
  - `assets/sprites/world/memory-wall-painted.png`
  - `assets/sprites/world/kite-rigging-painted.png`
  - `assets/sprites/world/fireworks-safety-painted.png`
  - `assets/sprites/world/star-map-painted.png`
  - `assets/sprites/world/town-clock-painted.png`
  - `assets/sprites/world/celebration-square-painted.png`
- Chose bespoke side-view Festival Night landmark treatments for all 10 Chapter 10 route scenes. The generated assets are useful visual references, but the sheet leans angled/three-quarter/isometric, so custom side-view festival landmarks fit the game camera better.
- Added `src/scenes/chapterTen/routeScenes.js` with 10 Chapter 10 route scenes:
  - `chapter-ten/festival-return`
  - `chapter-ten/lantern-parade`
  - `chapter-ten/music-stage`
  - `chapter-ten/food-stalls`
  - `chapter-ten/memory-wall`
  - `chapter-ten/kite-rigging`
  - `chapter-ten/fireworks-safety`
  - `chapter-ten/star-map`
  - `chapter-ten/town-clock`
  - `chapter-ten/celebration-square`
- Registered the Chapter 10 scene factories in `src/scenes/sceneRegistry.js` so they replace the generic catalog fallback scenes.
- Added a shared `chapterTenLandmark` renderer path in `src/rendering/worldRenderer.js` for bespoke side-view Festival Night landmarks.
- Preserved route flow from `chapter-ten/festival-return` through `chapter-ten/celebration-square`, with `Celebration Square` ending the route.
- Updated `chunks/70-full-route-sprite-backlog.md` to mark Chapter 10 as reviewed/kept on bespoke side-view treatment.

## Verification

- Syntax checks passed for:
  - `src/scenes/chapterTen/routeScenes.js`
  - `src/scenes/sceneRegistry.js`
  - `src/rendering/worldRenderer.js`
- Static scene-data check confirms all 10 Chapter 10 scenes have `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Static scene-data check confirms all 10 Chapter 10 scenes use `chapterTenLandmark` types and no generic planned fallback.
- Chapter 10 route flow now walks `festival-return` -> `lantern-parade` -> `music-stage` -> `food-stalls` -> `memory-wall` -> `kite-rigging` -> `fireworks-safety` -> `star-map` -> `town-clock` -> `celebration-square`.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`.
- Node render smoke with a stubbed canvas context passed for all 10 Chapter 10 scenes in both unrepaired and repaired power states.

## Next

The route-order sprite wiring pass now covers Chapters 1-10. Next likely work is a full-route visual QA pass, human playtesting of later puzzles, or broader polish such as audio/weather.
