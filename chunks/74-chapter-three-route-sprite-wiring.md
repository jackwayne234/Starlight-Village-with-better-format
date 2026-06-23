# Chunk 74: Chapter Three Route Sprite Wiring

Status: in progress

## Goal

Continue the full-route sprite integration pass into Chapter 3, preserving the route-sprite format: one strong landmark sprite, no random side cottages, no loose repair props, and no generic marker unless intentionally needed.

## Completed

- Reviewed `chapter-three/mossline-switchyard` against its existing hand-built switchyard art.
- Chose to wire `assets/sprites/world/mossline-switchyard-painted.png` because the generated asset is a strong single junction landmark with transparent edges, while the older pole-and-box renderer remains available as a fallback if the painted sprite does not load.
- Wired Mossline Switchyard through the shared `paintedLandmark` renderer path with `paintedLandmark.sprite: "mosslineSwitchyard"`.
- Hid the generic signpost and repair marker for Mossline Switchyard.
- Kept the existing rainy forest layers, Mossline foliage, puddles, lamps, route text, and junction-line path puzzle.

## Verification

- Static scene-data check confirms `chapter-three/mossline-switchyard` has `paintedLandmark.sprite: "mosslineSwitchyard"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset probe confirmed `assets/sprites/world/mossline-switchyard-painted.png` is `386x422` with transparent edge pixels.
- Local preview server responded at:
  - `http://127.0.0.1:5248/?scene=chapter-three/mossline-switchyard&preview=1`
  - `http://127.0.0.1:5248/?scene=chapter-three/mossline-switchyard&x=1120&preview=1`
- Painted sprite asset responded at `http://127.0.0.1:5248/assets/sprites/world/mossline-switchyard-painted.png?v=painted-route-ch3`.
- In-app browser preview rendered the painted Mossline landmark with no console errors in default and centered views.

## Next

Continue route-order sprite wiring at `chapter-three/cargo-cart-turntable`.
