# Chunk 139: Chapter Eight Clean Sprite Landmark Pass

Status: complete

## Goal

Bring the active Chapter 8 Glassworks route up from canvas fallback landmarks to
clean sprite-backed landmarks, then verify the handoff into Under-Village still
works.

## Completed

- Added clean world sprite registry entries for all ten Chapter 8 stops:
  - Glassworks Quarter
  - Prism Lamp Row
  - Cracked Skylights
  - Furnace Bellows
  - Color Filter Hall
  - Mirror Maze
  - Stained Glass Path
  - Cooling Pipes
  - Lens Grinder
  - Rainbow Tower
- Wired the ten scenes through `scene.spriteLandmark` while leaving the older
  `chapterEightLandmark` canvas drawings available as fallback.
- Kept the Chapter 8 route rules intact: no random cottages, no loose repair
  props, no broken-branch clutter, and no generic repair markers.
- Added a `Glassworks Quarter Restored` chapter-complete card to Rainbow Tower
  before it continues into Under-Village.
- Bumped browser cache tags through the main/render path so the new sprite
  registry loads reliably.

## Verification

- Syntax checks passed for the changed main, game, renderer, sprite, registry,
  and Chapter 8 scene modules.
- Route probe walked `101` scenes from `chapter-one/starlight-village` through
  `chapter-ten/celebration-square`.
- Chapter 8 route probe confirmed all ten Chapter 8 scenes remain ordered from
  Glassworks Quarter through Rainbow Tower, then continue to
  `chapter-nine/under-village`.
- Static scene checks confirmed all ten Chapter 8 scenes have sprite landmarks,
  no cottages, no loose repair parts, no broken branches, and
  `showMarker: false`.
- Zero-painted check still found `0` painted raster files under `assets/` and no
  active source paths to painted raster image files.
- `git diff --check` passed.
- Browser sweep loaded the Chapter 8 route plus Under-Village on port `5364`
  with `1280x720` canvases.
- Server output confirmed the ten Chapter 8 sprite assets loaded with `200`
  responses.
- Browser preview confirmed the `Glassworks Quarter Restored` chapter card is
  legible and contained.
- Visual contact sheet:
  `/private/tmp/starlight-chunk139-ch8-sweep-final/contact-sheet.png`

## Next

Continue the same route-lane cleanup into Chapter 9. The first pass should
compare the existing Under-Village route scenes against the clean world sprite
assets, replace any blocky canvas fallback landmarks that now have better clean
sprites, and add a chapter-complete handoff into Festival Return.
