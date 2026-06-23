# Chunk 71: Route Sprite Production Pass

Status: complete

## Goal

Review the full 100-scene route for missing landmark sprites, then generate a full sprite inventory so future scene upgrades can follow the Bakery Gutter format: one strong landmark sprite, no random houses, no loose ground repair props, and no generic repair marker unless deliberately needed.

## Completed

- Added `chunks/70-full-route-sprite-backlog.md` with a scene-by-scene sprite backlog for all 100 route scenes.
- Generated and extracted transparent landmark sprites for the remaining Chapter 1 scene landmarks:
  - Workshop Lift
  - Schoolhouse Lanterns
  - Market Awnings
  - Old Footbridge
  - Rain Drain Corner
  - Mayor's Porch
  - Festival Square
- Generated and extracted transparent landmark sprites for Chapters 2 through 10.
- Saved each generated chapter source sheet in `assets/sprites/world/` as `chapter-*-landmark-sheet-source.png`.
- Saved each cropped source cell as `*-painted-source.png`.
- Saved each final transparent game asset as `*-painted.png`.
- Upgraded Bell Rope Corner toward the new format with `bell-rope-corner-painted.png`, no random cottages, no loose gear/coil ground props, and no generic repair marker.

## Verification

- Validated `95` `*-painted.png` assets under `assets/sprites/world/`.
- All validated painted sprites are `RGBA`.
- All validated painted sprites include transparent pixels.
- The sprite backlog has all 100 route scenes accounted for with no remaining `needed` rows.

## Notes

- This pass produced the sprite assets, but most scenes are not yet wired to render their new landmark sprite.
- Future sprite generation should use side-view camera/framing only, matching the game's side-view scene composition. Do not use bird's-eye, top-down, or angled/isometric landmark views.
- Some generated assets should get visual QA during integration. Known first cleanup candidate: `last-platform-painted.png` includes a small neighboring rail fragment at the far left from the source sheet crop.
- Next implementation pass should wire the generated sprites into scene renderers in route order, using Bakery Gutter and Bell Rope Corner as the pattern.
