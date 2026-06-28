# Chunk 137: Chapter Six Clean Sprite Landmark Pass

Status: complete

## Goal

Bring the active Chapter 6 Rainbarrel Row route up from canvas fallback
landmarks to clean sprite-backed landmarks, then verify the handoff into Chapter
7 still works.

## Completed

- Added clean world sprite registry entries for the nine post-Rainbarrel-Row
  Chapter 6 stops:
  - Rooftop Channels
  - Flooded Cellar
  - Laundry Lines
  - Pump Alley
  - Overflow Garden
  - Neighborhood Fountain
  - Cistern House
  - Gutter Bell
  - Stormwater Gate
- Wired those nine scenes through `scene.spriteLandmark` while leaving the older
  `chapterSixLandmark` canvas drawings available as fallback.
- Kept Rainbarrel Row on its existing custom barrel/drain renderer.
- Kept the Chapter 6 route rules intact: no random cottages, no loose repair
  props, no broken-branch clutter, and no generic repair markers.
- Added a `Rainbarrel Row Restored` chapter-complete card to Stormwater Gate
  before it continues into Old Orchard.
- Bumped browser cache tags through the main/render path so the new sprite
  registry loads reliably.

## Verification

- Syntax checks passed for the changed main, game, renderer, sprite, registry,
  and Chapter 6 scene modules.
- Route probe walked `101` scenes from `chapter-one/starlight-village` through
  `chapter-ten/celebration-square`.
- Chapter 6 route probe confirmed all ten Chapter 6 scenes remain ordered from
  Rainbarrel Row through Stormwater Gate, then continue to
  `chapter-seven/old-orchard`.
- Static scene checks confirmed all ten Chapter 6 scenes have no cottages, no
  loose repair parts, no broken branches, and `showMarker: false`.
- Zero-painted check still found `0` painted raster files under `assets/` and no
  active source paths to painted raster image files.
- `git diff --check` passed.
- Browser sweep loaded the Chapter 6 route plus Old Orchard on port `5364` with
  `1280x720` canvases and no warnings or errors.
- Browser preview confirmed the `Rainbarrel Row Restored` chapter card is
  legible.

## Next

Continue the same route-lane cleanup into Chapter 7. The first pass should
compare the existing Old Orchard route scenes against the clean world sprite
assets, replace any blocky canvas fallback landmarks that now have better clean
sprites, and add a chapter-complete handoff into Glassworks Quarter.
