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
- Reviewed `chapter-four/cliff-rope-lift` against `assets/sprites/world/cliff-rope-lift-painted.png`.
- Chose to keep Cliff Rope Lift on a bespoke side-view treatment because the generated painted asset reads as an angled/isometric basket and still carries a bright green-screen background.
- Added a hand-built Cliff Rope Lift scene and renderer with side-view cliff faces, rope span, twin pulleys, a lift basket, guide lamps, repaired glow, and no random side cottages.
- Hid the generic repair marker for Cliff Rope Lift.
- Removed loose repair props and broken-branch clutter from Cliff Rope Lift.
- Preserved the Stormedge rainy ridge mood, storm-gauge puzzle theme, route text, and route to Wind Chime Pass.
- Reviewed `chapter-four/wind-chime-pass` against `assets/sprites/world/wind-chime-pass-painted.png`.
- Chose to wire Wind Chime Pass through the shared `paintedLandmark` path because the generated chime arch reads as a side-view route landmark after cleanup.
- Cleaned the bright green-screen background and tiny neighboring crop fragment from `wind-chime-pass-painted.png`.
- Added a hand-built Wind Chime Pass scene with the painted chime arch as the one strong landmark, no random side cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Preserved the Stormedge rainy ridge mood, calm-gust repair theme, route text, and route to Lightning Rod Field.
- Reviewed `chapter-four/lightning-rod-field` against `assets/sprites/world/lightning-rod-field-painted.png`.
- Chose to wire Lightning Rod Field through the shared `paintedLandmark` path because the cleaned generated rods read as a strong side-view/front-facing ridge landmark rather than top-down or isometric.
- Cleaned the bright green-screen background from `lightning-rod-field-painted.png`.
- Added a hand-built Lightning Rod Field scene with the painted rod cluster as the one strong landmark, no random side cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Preserved the Stormedge rainy ridge mood, grounding repair theme, route text, and route to Lookout Post.
- Reviewed `chapter-four/lookout-post` against `assets/sprites/world/lookout-post-painted.png`.
- Chose to keep Lookout Post on a bespoke side-view treatment because the generated painted asset reads as a three-quarter/isometric deck and scope rather than the game's side-view route camera.
- Added a hand-built Lookout Post scene and renderer with a side-view ridge deck, telescope/scope landmark, distant beacon glimmer, repaired scope glow, and no random side cottages.
- Hid the generic repair marker for Lookout Post.
- Removed loose repair props and broken-branch clutter from Lookout Post.
- Preserved the Stormedge rainy ridge mood, archive-lens repair theme, route text, and route to Cracked Stair.

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
- Static scene-data check confirms `chapter-four/cliff-rope-lift` remains custom with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, `showMarker: false`, and route flow to `chapter-four/wind-chime-pass`.
- Asset review confirmed `assets/sprites/world/cliff-rope-lift-painted.png` is `397x359`, but it was not wired because its angled/isometric basket view and bright green-screen background do not match the side-view camera rule.
- Syntax/import checks passed for `src/scenes/chapterFour/cliffRopeLift.js`, `src/scenes/sceneRegistry.js`, and `src/rendering/worldRenderer.js` using the bundled Node runtime.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`, and includes `chapter-four/cliff-rope-lift` before `chapter-four/wind-chime-pass`.
- Local preview server responded at:
  - `http://127.0.0.1:5261/?scene=chapter-four/cliff-rope-lift&x=1120&preview=1`
- Local probes confirmed the Cliff Rope Lift scene module and `assets/sprites/world/cliff-rope-lift-painted.png` respond from the preview server.
- In-app browser preview rendered the bespoke Cliff Rope Lift scene at `1280x720` with no console errors.
- Static scene-data check confirms `chapter-four/wind-chime-pass` uses `paintedLandmark.sprite: "windChimePass"`, `0` cottages, `0` repair parts, `0` broken branches, `showMarker: false`, and route flow to `chapter-four/lightning-rod-field`.
- Asset review confirmed `assets/sprites/world/wind-chime-pass-painted.png` is `396x353` RGBA with `96104` fully transparent pixels after green-screen cleanup, and the chime arch reads as a side-view/front-facing landmark rather than angled or top-down.
- Syntax/import checks passed for `src/scenes/chapterFour/windChimePass.js`, `src/scenes/sceneRegistry.js`, and `src/rendering/sprites.js` using the bundled Node runtime.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`, and includes `chapter-four/wind-chime-pass` before `chapter-four/lightning-rod-field`.
- Local preview server responded at:
  - `http://127.0.0.1:5262/?scene=chapter-four/wind-chime-pass&x=1120&preview=1`
- Local probes confirmed the Wind Chime Pass scene module and `assets/sprites/world/wind-chime-pass-painted.png` respond from the preview server.
- Static scene-data check confirms `chapter-four/lightning-rod-field` uses `paintedLandmark.sprite: "lightningRodField"`, `0` cottages, `0` repair parts, `0` broken branches, `showMarker: false`, and route flow to `chapter-four/lookout-post`.
- Asset review confirmed `assets/sprites/world/lightning-rod-field-painted.png` is `356x381` RGBA with `98093` fully transparent pixels after green-screen cleanup, and the rod cluster reads as a side-view/front-facing landmark rather than top-down or isometric.
- Syntax/import checks passed for `src/scenes/chapterFour/lightningRodField.js`, `src/scenes/sceneRegistry.js`, and `src/rendering/sprites.js` using the bundled Node runtime.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`, and includes `chapter-four/lightning-rod-field` between `chapter-four/wind-chime-pass` and `chapter-four/lookout-post`.
- Local preview server responded at:
  - `http://127.0.0.1:5263/?scene=chapter-four/lightning-rod-field&x=1120&preview=1`
- Local probes confirmed the Lightning Rod Field scene module and `assets/sprites/world/lightning-rod-field-painted.png` respond from the preview server.
- Static scene-data check confirms `chapter-four/lookout-post` remains custom with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, `showMarker: false`, and route flow to `chapter-four/cracked-stair`.
- Asset review confirmed `assets/sprites/world/lookout-post-painted.png` is `363x357` RGBA, but it was not wired because its three-quarter/isometric deck and scope do not match the side-view camera rule.
- Syntax/import checks passed for `src/scenes/chapterFour/lookoutPost.js`, `src/scenes/sceneRegistry.js`, and `src/rendering/worldRenderer.js` using the bundled Node runtime.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`, and includes `chapter-four/lookout-post` between `chapter-four/lightning-rod-field` and `chapter-four/cracked-stair`.
- Local preview server responded at:
  - `http://127.0.0.1:5264/?scene=chapter-four/lookout-post&x=1120&preview=1`
- Local probes confirmed the Lookout Post scene module and `assets/sprites/world/lookout-post-painted.png` respond from the preview server.

## Next

Continue route-order sprite wiring at `chapter-four/cracked-stair`.
