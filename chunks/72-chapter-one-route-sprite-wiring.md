# Chunk 72: Chapter One Route Sprite Wiring

Status: complete

## Goal

Continue the full-route sprite integration pass in route order, using the Bakery Gutter and Bell Rope Corner format: one strong landmark sprite, no random side cottages, no loose repair props, and no generic marker unless intentionally needed.

## Completed

- Added shared painted-landmark rendering support in `src/rendering/worldRenderer.js`.
- Wired the generated Chapter 1 landmark sprites for:
  - Workshop Lift
  - Schoolhouse Lanterns
  - Market Awnings
  - Old Footbridge
  - Rain Drain Corner
  - Mayor's Porch
  - Festival Square
- Removed random side cottages from those seven scenes.
- Removed loose ground repair parts from those seven scenes.
- Removed loose broken-branch clutter from Old Footbridge and Rain Drain Corner.
- Turned off the generic repair marker for those seven sprite-led scenes.
- Kept each old bespoke canvas renderer as a fallback if the painted sprite does not load.

## Verification

- Local preview served successfully on `http://127.0.0.1:5237/`.
- Browser smoke loaded each edited scene with `preview=1`.
- All seven scenes produced a `1280x720` canvas screenshot.
- Browser console check found no errors for the edited scenes.
- Static scene-data check confirmed all seven scenes have `paintedLandmark`, `cottages: []`, `repairParts: []`, and `showMarker: false`.

## Next

Continue route-order sprite wiring at `chapter-two/glowfen-grove` or, if preserving existing hand-built landmark art there, start with `chapter-two/lantern-lily-pool`.
