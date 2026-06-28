# Chunk 138: Chapter Seven Clean Sprite Landmark Pass

Status: complete

## Goal

Bring the active Chapter 7 Old Orchard route up from canvas fallback landmarks
to clean sprite-backed landmarks, then verify the handoff into Chapter 8 still
works.

## Completed

- Added clean world sprite registry entries for all ten Chapter 7 stops:
  - Old Orchard
  - Windfallen Fruit
  - Branch Bridge
  - Bee Box Row
  - Cider Press
  - Scarecrow Wires
  - Root Cellar
  - Moon Apple Tree
  - Birdhouse Lane
  - Hollow Tree Door
- Wired the ten scenes through `scene.spriteLandmark` while leaving the older
  `chapterSevenLandmark` canvas drawings available as fallback.
- Kept the Chapter 7 route rules intact: no random cottages, no loose repair
  props, no broken-branch clutter, and no generic repair markers.
- Added an `Old Orchard Restored` chapter-complete card to Hollow Tree Door
  before it continues into Glassworks Quarter.
- Shortened the final checklist line after visual review so the completion card
  text stays inside the card.
- Bumped browser cache tags through the main/render path so the new sprite
  registry loads reliably.

## Verification

- Syntax checks passed for the changed main, game, renderer, sprite, registry,
  and Chapter 7 scene modules.
- Route probe walked `101` scenes from `chapter-one/starlight-village` through
  `chapter-ten/celebration-square`.
- Chapter 7 route probe confirmed all ten Chapter 7 scenes remain ordered from
  Old Orchard through Hollow Tree Door, then continue to
  `chapter-eight/glassworks-quarter`.
- Static scene checks confirmed all ten Chapter 7 scenes have no cottages, no
  loose repair parts, no broken branches, and `showMarker: false`.
- Zero-painted check still found `0` painted raster files under `assets/` and no
  active source paths to painted raster image files.
- `git diff --check` passed.
- Browser sweep loaded the Chapter 7 route plus Glassworks Quarter on port
  `5364` with `1280x720` canvases and no warnings or errors.
- Browser preview confirmed the corrected `Old Orchard Restored` chapter card is
  legible and contained.

## Next

Continue the same route-lane cleanup into Chapter 8. The first pass should
compare the existing Glassworks Quarter route scenes against the clean world
sprite assets, replace any blocky canvas fallback landmarks that now have better
clean sprites, and add a chapter-complete handoff into Under-Village.
