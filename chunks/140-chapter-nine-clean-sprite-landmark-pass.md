# Chunk 140: Chapter Nine Clean Sprite Landmark Pass

Status: complete

## Goal

Bring the active Chapter 9 Under-Village route up from canvas fallback landmarks
to clean sprite-backed landmarks, then verify the handoff into Festival Return
still works.

## Completed

- Added clean world sprite registry entries for all ten Chapter 9 stops:
  - Under-Village Door
  - Echo Door
  - Old Pipe Crossing
  - Forgotten Machine
  - Drain Locks
  - Buried Murals
  - Gear Room
  - Underground Stream
  - Sealed Workshop
  - Ancient Heart Engine
- Wired the ten scenes through `scene.spriteLandmark` while leaving the older
  `chapterNineLandmark` canvas drawings available as fallback.
- Kept the Chapter 9 route rules intact: no random cottages, no loose repair
  props, no broken-branch clutter, and no generic repair markers.
- Added an `Under-Village Restored` chapter-complete card to Ancient Heart
  Engine before it continues into Festival Return.
- Bumped browser cache tags through the main/render path so the new sprite
  registry loads reliably.

## Verification

- Syntax checks passed for the changed main, game, renderer, sprite, registry,
  and Chapter 9 scene modules.
- Route probe walked `101` scenes from `chapter-one/starlight-village` through
  `chapter-ten/celebration-square`.
- Chapter 9 route probe confirmed all ten Chapter 9 scenes remain ordered from
  Under-Village Door through Ancient Heart Engine, then continue to
  `chapter-ten/festival-return`.
- Static scene checks confirmed all ten Chapter 9 scenes have sprite landmarks,
  no cottages, no loose repair parts, no broken branches, and
  `showMarker: false`.
- Zero-painted check still found `0` painted raster files under `assets/` and no
  active source paths to painted raster image files.
- `git diff --check` passed.
- Browser sweep loaded the Chapter 9 route plus Festival Return on port `5364`
  with `1280x720` canvases.
- Server output confirmed the ten Chapter 9 sprite assets loaded with `200`
  responses.
- Browser preview confirmed the `Under-Village Restored` chapter card is legible
  and contained.
- Visual contact sheet:
  `/private/tmp/starlight-chunk140-ch9-sweep-final/contact-sheet.png`

## Next

Continue the same route-lane cleanup into Chapter 10. The first pass should
compare the Festival route scenes against the clean world sprite assets, replace
any blocky canvas fallback landmarks that now have better clean sprites, and
preserve the final Celebration Square completion flow.
