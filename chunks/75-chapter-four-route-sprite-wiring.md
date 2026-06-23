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
- Reviewed `chapter-four/weather-vane-roof` against `assets/sprites/world/weather-vane-roof-painted.png`.
- Chose to keep Weather Vane Roof on a bespoke side-view treatment because the generated painted asset reads as a three-quarter roof/object, still shows a green-screen field in direct review, and includes a clipped neighboring fragment at the right edge.
- Added a hand-built Weather Vane Roof scene and renderer with a side-view wet roofline, central vane mast, wind-channel louvers, warm repaired glints, ridge mist, and no random side cottages.
- Hid the generic repair marker for Weather Vane Roof.
- Removed loose repair props and broken-branch clutter from Weather Vane Roof.
- Preserved the Stormedge rainy ridge mood, storm-gauge puzzle theme, route text, and route to Cliff Rope Lift.

## Verification

- Static scene-data check confirms `chapter-four/stormedge-rise` remains custom with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset review confirmed `assets/sprites/world/stormedge-rise-painted.png` is `359x360` with transparent edge pixels, but it was not wired because its three-quarter base does not match the side-view camera rule.
- Syntax checks passed for `src/scenes/chapterOne/stormedgeRise.js`, `src/rendering/worldRenderer.js`, and `src/rendering/sprites.js` using the bundled Node runtime.
- Local preview server responded at:
  - `http://127.0.0.1:5258/?scene=chapter-four/stormedge-rise&x=1120&preview=1`
- Local probes confirmed the Stormedge Rise scene module, `assets/sprites/world/stormedge-rise-painted.png`, and `assets/sprites/world/storm-gauge-trimmed.png` respond from the preview server.
- Static scene-data check confirms `chapter-four/weather-vane-roof` remains custom with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, `showMarker: false`, and route flow to `chapter-four/cliff-rope-lift`.
- Asset review confirmed `assets/sprites/world/weather-vane-roof-painted.png` is `396x368` RGBA with transparent corner pixels and an opaque landmark center, but it was not wired because its three-quarter roof framing, direct green-screen read, and clipped neighboring fragment do not match the side-view camera rule.
- Syntax checks passed for `src/scenes/chapterFour/weatherVaneRoof.js`, `src/scenes/sceneRegistry.js`, and `src/rendering/worldRenderer.js` using the bundled Node runtime.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`, and includes `chapter-four/weather-vane-roof`.
- Local preview server responded at:
  - `http://127.0.0.1:5260/?scene=chapter-four/weather-vane-roof&x=1120&preview=1`
- Local probes confirmed the Weather Vane Roof scene module and `assets/sprites/world/weather-vane-roof-painted.png` respond from the preview server.

## Next

Continue route-order sprite wiring at `chapter-four/cliff-rope-lift`.
