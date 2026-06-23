# Chunk 78: Chapter Seven Route Sprite Wiring

Status: complete

## Goal

Continue the full-route sprite integration pass through Chapter 7, preserving the route-sprite format: one strong side-view landmark, no random side cottages, no loose repair props, no broken-branch clutter, and no generic marker unless intentionally needed.

## Completed

- Reviewed the Chapter 7 generated sheet and individual generated assets:
  - `assets/sprites/world/old-orchard-painted.png`
  - `assets/sprites/world/windfallen-fruit-painted.png`
  - `assets/sprites/world/branch-bridge-painted.png`
  - `assets/sprites/world/bee-box-row-painted.png`
  - `assets/sprites/world/cider-press-painted.png`
  - `assets/sprites/world/scarecrow-wires-painted.png`
  - `assets/sprites/world/root-cellar-painted.png`
  - `assets/sprites/world/moon-apple-tree-painted.png`
  - `assets/sprites/world/birdhouse-lane-painted.png`
  - `assets/sprites/world/hollow-tree-door-painted.png`
- Chose bespoke side-view landmark treatments for all 10 Chapter 7 route scenes. The generated assets are useful visual references, but the sheet leans angled/three-quarter/isometric in enough scenes that the chapter now uses one consistent side-view orchard renderer path.
- Added `src/scenes/chapterSeven/routeScenes.js` with 10 new Chapter 7 route scenes:
  - `chapter-seven/old-orchard`
  - `chapter-seven/windfallen-fruit`
  - `chapter-seven/branch-bridge`
  - `chapter-seven/bee-box-row`
  - `chapter-seven/cider-press`
  - `chapter-seven/scarecrow-wires`
  - `chapter-seven/root-cellar`
  - `chapter-seven/moon-apple-tree`
  - `chapter-seven/birdhouse-lane`
  - `chapter-seven/hollow-tree-door`
- Registered the new Chapter 7 scene factories in `src/scenes/sceneRegistry.js` so they replace the generic catalog fallback scenes.
- Added a shared `chapterSevenLandmark` renderer path in `src/rendering/worldRenderer.js` for the bespoke orchard-side landmarks.
- Preserved route flow from `chapter-seven/old-orchard` through `chapter-seven/hollow-tree-door`, then onward to `chapter-eight/glassworks-quarter`.

## Verification

- Syntax checks passed for:
  - `src/scenes/chapterSeven/routeScenes.js`
  - `src/scenes/sceneRegistry.js`
  - `src/rendering/worldRenderer.js`
- Static scene-data check confirms all 10 Chapter 7 scenes have `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Static scene-data check confirms all 10 Chapter 7 scenes use `chapterSevenLandmark` types and no generic planned fallback.
- Chapter 7 route flow now walks `old-orchard` -> `windfallen-fruit` -> `branch-bridge` -> `bee-box-row` -> `cider-press` -> `scarecrow-wires` -> `root-cellar` -> `moon-apple-tree` -> `birdhouse-lane` -> `hollow-tree-door`, then continues to `chapter-eight/glassworks-quarter`.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`.
- Local preview server responded at:
  - `http://127.0.0.1:5273/?scene=chapter-seven/old-orchard&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/windfallen-fruit&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/branch-bridge&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/bee-box-row&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/cider-press&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/scarecrow-wires&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/root-cellar&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/moon-apple-tree&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/birdhouse-lane&x=1120&preview=1`
  - `http://127.0.0.1:5273/?scene=chapter-seven/hollow-tree-door&x=1120&preview=1`
- Local asset probes confirmed the generated Chapter 7 reference assets and `*-source.png` files respond from the preview server.
- In-app browser screenshot tooling was not exposed in this thread, so verification used source checks, route simulation, and local HTTP probes.

## Next

Continue route-order sprite wiring at `chapter-eight/glassworks-quarter`.
