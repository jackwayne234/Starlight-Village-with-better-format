# Chunk 75: Chapter Four Route Sprite Wiring

Status: in progress

## Goal

Continue the full-route sprite integration pass into Chapter 4, preserving the route-sprite format: one strong landmark, no random side cottages, no loose repair props, and no generic marker unless intentionally needed.

## Completed

- Reviewed `chapter-four/stormedge-rise` against `assets/sprites/world/stormedge-rise-painted.png`.
- Chose to keep the existing bespoke Stormedge Rise renderer because its side-view storm gauge and ridge posts match the game camera better than the generated painted asset.
- Confirmed `stormedge-rise-painted.png` has transparent edge pixels, but its three-quarter stone-base read does not match the side-view camera rule, so it remains unused for this scene.
- Removed the random side cottage from Stormedge Rise.
- Hid the generic repair marker for Stormedge Rise.
- Preserved the rainy ridge, tree line, lamps, mist bands, storm-gauge repair puzzle, and route to Weather Vane Roof.
- Improved the bespoke storm gauge treatment so its glow brightens when the repair is complete.

## Verification

- Static scene-data check confirms `chapter-four/stormedge-rise` remains custom with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset review confirmed `assets/sprites/world/stormedge-rise-painted.png` is `359x360` with transparent edge pixels, but it was not wired because its three-quarter base does not match the side-view camera rule.
- Syntax checks passed for `src/scenes/chapterOne/stormedgeRise.js`, `src/rendering/worldRenderer.js`, and `src/rendering/sprites.js` using the bundled Node runtime.
- Local preview server responded at:
  - `http://127.0.0.1:5258/?scene=chapter-four/stormedge-rise&x=1120&preview=1`
- Local probes confirmed the Stormedge Rise scene module, `assets/sprites/world/stormedge-rise-painted.png`, and `assets/sprites/world/storm-gauge-trimmed.png` respond from the preview server.

## Next

Continue route-order sprite wiring at `chapter-four/weather-vane-roof`.
