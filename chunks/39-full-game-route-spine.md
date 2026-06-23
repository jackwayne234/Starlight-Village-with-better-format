# Chunk 39: Full Game Route Spine

Status: complete

## Goal

Turn the 100-scene plan into a playable route spine without hand-copying 100 separate scene files.

## Completed

- Added `src/scenes/fullGameCatalog.js` with all 100 planned scene ids, titles, regions, premises, puzzle themes, and route order.
- Added `src/scenes/plannedSceneFactory.js` to build catalog scenes from shared layer, repair, dialogue, and puzzle patterns.
- Updated `src/scenes/sceneRegistry.js` so every catalog id can create a playable scene.
- Kept the hand-built scenes for the opener, Glowfen Grove, Mossline Switchyard, Stormedge Rise, Beacon Hill, and Rainbarrel Row as polished landmark slots in the 100-scene route.
- Updated the opening Water Wheel Yard so it advances to `chapter-one/bakery-gutter`.
- Updated landmark scene ids and next-scene links to fit the 100-scene order.
- Updated the title subtitle to describe the 100-repair route.

## Verification

- Source syntax check passed for:
  - `src/scenes/fullGameCatalog.js`
  - `src/scenes/plannedSceneFactory.js`
  - `src/scenes/sceneRegistry.js`
- Route walk passed from `chapter-one/starlight-village` through all 100 scenes to `chapter-ten/celebration-square`.
- Served-file smoke check passed on local preview port `5202` for the HTML page and new scene modules.

## Known Follow-Ups

- The catalog scenes are playable first drafts, not final bespoke art passes.
- Many scenes reuse the existing rotate-path puzzle layouts; future chunks should add more puzzle types and route them by scene.
- Future polish should happen one scene or one region at a time.
- Port `5201` appeared occupied but unhealthy during this pass, so verification used `http://127.0.0.1:5202/`.

## Next Chunk

Chunk 40 should begin the first real one-scene polish pass on `chapter-one/bakery-gutter`.

Suggested scope:

1. Give Bakery Gutter a bespoke visual landmark.
2. Add a puzzle/reward that visually stops water from spilling through the awning.
3. Browser-preview the scene with `?scene=chapter-one/bakery-gutter&preview=1`.
4. Leave `chapter-one/bell-rope-corner` as the next route stop.
