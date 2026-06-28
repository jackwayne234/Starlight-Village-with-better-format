# Chunk 136: Chapter Five Clean Sprite Landmark Pass

Status: complete

## Goal

Bring the active Chapter 5 Beacon Hill route up from blocky canvas fallback
landmarks to clean sprite-backed landmarks, then verify the handoff into Chapter
6 still works.

## Completed

- Added clean world sprite registry entries for the nine post-Beacon-Hill
  Chapter 5 stops:
  - Keeper's Cottage
  - Lens Room
  - Fuel Shed
  - Mirror Array
  - Bell Platform
  - Old Flag Room
  - Storm Shutters
  - Relay Balcony
  - Hill Descent
- Wired those nine scenes through `scene.spriteLandmark` while leaving the older
  `chapterFiveLandmark` canvas drawings available as fallback.
- Kept the Chapter 5 route rules intact: no random cottages, no loose repair
  props, no broken-branch clutter, and no generic repair markers.
- Added a `Beacon Hill Restored` chapter-complete card to Hill Descent before it
  continues into Rainbarrel Row.
- Bumped browser cache tags through the main/render path so the new sprite
  registry loads reliably.

## Verification

- Syntax checks passed for the changed main, game, renderer, sprite, registry,
  and Chapter 5 scene modules.
- Route probe walked `101` scenes from `chapter-one/starlight-village` through
  `chapter-ten/celebration-square`.
- Chapter 5 route probe confirmed all ten Chapter 5 scenes remain ordered from
  Beacon Hill through Hill Descent, then continue to `chapter-six/rainbarrel-row`.
- Static scene checks confirmed all ten Chapter 5 scenes have no cottages, no
  loose repair parts, no broken branches, and `showMarker: false`.
- Zero-painted check still found `0` painted raster files under `assets/` and no
  active source paths to painted raster image files.
- `git diff --check` passed.
- Browser sweep loaded the Chapter 5 route plus Rainbarrel Row on port `5364`
  with `1280x720` canvases and no warnings or errors.
- Browser preview confirmed the `Beacon Hill Restored` chapter card is legible.

## Next

Continue the same route-lane cleanup into Chapter 6. The first pass should
compare the existing Rainbarrel Row route scenes against the clean world sprite
assets, replace any blocky canvas fallback landmarks that now have better clean
sprites, and add a chapter-complete handoff into Old Orchard.
