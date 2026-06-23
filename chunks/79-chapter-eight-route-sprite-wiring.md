# Chunk 79: Chapter Eight Route Sprite Wiring

Status: complete

## Goal

Continue the full-route sprite integration pass through Chapter 8, preserving the route-sprite format: one strong side-view landmark, no random side cottages, no loose repair props, no broken-branch clutter, and no generic marker unless intentionally needed.

## Completed

- Reviewed the Chapter 8 generated sheet and individual generated assets:
  - `assets/sprites/world/glassworks-quarter-painted.png`
  - `assets/sprites/world/prism-lamp-row-painted.png`
  - `assets/sprites/world/cracked-skylights-painted.png`
  - `assets/sprites/world/furnace-bellows-painted.png`
  - `assets/sprites/world/color-filter-hall-painted.png`
  - `assets/sprites/world/mirror-maze-painted.png`
  - `assets/sprites/world/stained-glass-path-painted.png`
  - `assets/sprites/world/cooling-pipes-painted.png`
  - `assets/sprites/world/lens-grinder-painted.png`
  - `assets/sprites/world/rainbow-tower-painted.png`
- Chose bespoke side-view landmark treatments for all 10 Chapter 8 route scenes. The generated assets are useful visual references, but the sheet leans angled/three-quarter/isometric, so a custom side-view glassworks renderer fits the game camera better.
- Added `src/scenes/chapterEight/routeScenes.js` with 10 Chapter 8 route scenes:
  - `chapter-eight/glassworks-quarter`
  - `chapter-eight/prism-lamp-row`
  - `chapter-eight/cracked-skylights`
  - `chapter-eight/furnace-bellows`
  - `chapter-eight/color-filter-hall`
  - `chapter-eight/mirror-maze`
  - `chapter-eight/stained-glass-path`
  - `chapter-eight/cooling-pipes`
  - `chapter-eight/lens-grinder`
  - `chapter-eight/rainbow-tower`
- Registered the Chapter 8 scene factories in `src/scenes/sceneRegistry.js` so they replace the generic catalog fallback scenes.
- Added a shared `chapterEightLandmark` renderer path in `src/rendering/worldRenderer.js` for bespoke glassworks-side landmarks.
- Preserved route flow from `chapter-eight/glassworks-quarter` through `chapter-eight/rainbow-tower`, then onward to `chapter-nine/under-village`.
- Updated `chunks/70-full-route-sprite-backlog.md` to mark Chapter 8 as reviewed/kept on bespoke side-view treatment.

## Verification

- Syntax checks passed for:
  - `src/scenes/chapterEight/routeScenes.js`
  - `src/scenes/sceneRegistry.js`
  - `src/rendering/worldRenderer.js`
- Static scene-data check confirms all 10 Chapter 8 scenes have `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Static scene-data check confirms all 10 Chapter 8 scenes use `chapterEightLandmark` types and no generic planned fallback.
- Chapter 8 route flow now walks `glassworks-quarter` -> `prism-lamp-row` -> `cracked-skylights` -> `furnace-bellows` -> `color-filter-hall` -> `mirror-maze` -> `stained-glass-path` -> `cooling-pipes` -> `lens-grinder` -> `rainbow-tower`, then continues to `chapter-nine/under-village`.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`.
- Local preview server responded at:
  - `http://127.0.0.1:5274/?scene=chapter-eight/glassworks-quarter&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/prism-lamp-row&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/cracked-skylights&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/furnace-bellows&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/color-filter-hall&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/mirror-maze&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/stained-glass-path&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/cooling-pipes&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/lens-grinder&x=1120&preview=1`
  - `http://127.0.0.1:5274/?scene=chapter-eight/rainbow-tower&x=1120&preview=1`
- Local asset probes confirmed the generated Chapter 8 reference assets respond from the preview server.
- Browser screenshot tooling was not exposed in this thread, so verification used source checks, route simulation, and local HTTP probes.

## Next

Continue route-order sprite wiring at `chapter-nine/under-village`.
