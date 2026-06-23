# Chunk 76: Chapter Five Route Sprite Wiring

Status: complete

## Goal

Continue the full-route sprite integration pass into Chapter 5, preserving the route-sprite format: one strong landmark, no random side cottages, no loose repair props, and no generic marker unless intentionally needed.

## Completed

- Reviewed `chapter-five/beacon-hill` against the Chapter 5 backlog target.
- Confirmed `assets/sprites/world/beacon-hill-painted.png` is not present in the workspace; the current Beacon Hill selected art is `assets/sprites/world/beacon-tower-large-door.png`.
- Chose to keep the existing large-door beacon treatment because it is a strong side-view/front-facing route landmark, preserves the kid-scale entrance pass, and already matches the rainy tower identity better than the older smaller-door beacon sprite.
- Kept `beacon-tower-trimmed.png` available as the older fallback sprite, but left Beacon Hill on `beaconTowerLargeDoor`.
- Preserved the one-landmark Beacon Hill format: no random cottages, no loose repair props, no broken-branch clutter, and no cable/flag decoration clutter.
- Hid the generic repair marker for Beacon Hill so the beacon tower itself carries the repair beat.
- Updated old route text that still pointed toward Rainbarrel Row so the scene now routes and speaks onward to Keeper's Cottage.
- Reviewed `chapter-five/keeper-cottage` against `assets/sprites/world/keeper-cottage-painted.png`.
- Chose a bespoke side-view Keeper's Cottage treatment because the generated cottage reads as a three-quarter object rather than the game's side-view camera.
- Added the Keeper's Cottage route scene with a single side-view cottage/chimney landmark, no random cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Reviewed `chapter-five/lens-room` against `assets/sprites/world/lens-room-painted.png`.
- Chose a bespoke side-view Lens Room treatment because the generated lens platform reads as an angled/isometric object rather than a side-view beacon room.
- Added the Lens Room route scene with a single side-view glass/lens-room landmark, no random cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Reviewed `chapter-five/fuel-shed` against `assets/sprites/world/fuel-shed-painted.png`.
- Chose a bespoke side-view Fuel Shed treatment because the generated shed reads as a three-quarter object and does not match the route camera.
- Added the Fuel Shed route scene with a single side-view shed/valve landmark, no random cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Reviewed `chapter-five/mirror-array` against `assets/sprites/world/mirror-array-painted.png`.
- Chose a bespoke side-view Mirror Array treatment because the generated mirrors sit in a three-quarter/isometric staging rather than a side-view route composition.
- Added the Mirror Array route scene with one strong mirror landmark, no loose mirror clutter, no random cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Reviewed `chapter-five/bell-platform` against `assets/sprites/world/bell-platform-painted.png`.
- Chose a bespoke side-view Bell Platform treatment because the generated platform reads as an angled/isometric deck.
- Added the Bell Platform route scene with a single side-view bell platform/striker landmark, no loose bell or rope clutter, no random cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Reviewed `chapter-five/old-flag-room` against `assets/sprites/world/old-flag-room-painted.png`.
- Chose a bespoke side-view Old Flag Room treatment because the generated flag box is an angled object, and this scene needs folded storm flags as memory objects rather than hanging clutter.
- Added the Old Flag Room route scene with a single side-view room/flag-memory landmark, no random cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Reviewed `chapter-five/storm-shutters` against `assets/sprites/world/storm-shutters-painted.png`.
- Chose a bespoke side-view Storm Shutters treatment because the generated shutter block reads as an angled/isometric object.
- Added the Storm Shutters route scene with a single side-view shutter wall landmark, no shutter debris clutter, no random cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Reviewed `chapter-five/relay-balcony` against `assets/sprites/world/relay-balcony-painted.png`.
- Chose a bespoke side-view Relay Balcony treatment because the generated balcony reads as a three-quarter/isometric rail object.
- Added the Relay Balcony route scene with a single side-view balcony/relay landmark, no loose cable clutter, no random cottages, no loose repair props, no broken-branch clutter, and no generic marker.
- Reviewed `chapter-five/hill-descent` against `assets/sprites/world/hill-descent-painted.png`.
- Chose a bespoke side-view Hill Descent treatment because the generated stair/path asset reads as an angled object rather than the side-view descent path needed for the route.
- Added the Hill Descent route scene with a single side-view downhill lamp/path landmark, no random cottages, no loose repair props, no broken-branch clutter, no generic marker, and route flow onward to `chapter-six/rainbarrel-row`.
- Registered all nine new Chapter 5 scene ids in `src/scenes/sceneRegistry.js`.
- Added a shared `chapterFiveLandmark` renderer path in `src/rendering/worldRenderer.js` for the bespoke Chapter 5 side-view landmarks.

## Verification

- Static scene-data check confirms `chapter-five/beacon-hill` remains custom with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, `showMarker: false`, and route flow to `chapter-five/keeper-cottage`.
- Asset review confirmed `assets/sprites/world/beacon-tower-large-door.png` is the active `beaconTowerLargeDoor` sprite and reads as the strongest side-view/front-facing Beacon Hill landmark currently available.
- Syntax checks passed for `src/scenes/chapterOne/beaconHill.js`, `src/scenes/sceneRegistry.js`, `src/rendering/worldRenderer.js`, and `src/rendering/sprites.js` using the bundled Node runtime.
- Local preview server responded at:
  - `http://127.0.0.1:5269/?scene=chapter-five/beacon-hill&x=1120&preview=1`
- Local probes confirmed the Beacon Hill scene module and `assets/sprites/world/beacon-tower-large-door.png` respond from the preview server.
- Local probe confirmed `assets/sprites/world/beacon-hill-painted.png` is absent, matching the review decision.
- Browser screenshot verification was not available in this thread because no callable browser-control tool was exposed.
- Asset review confirmed the Chapter 5 generated sheet and individual generated assets exist for Keeper's Cottage through Hill Descent, but the selected gameplay treatment is bespoke side-view because the generated sprites lean angled/three-quarter/isometric.
- Syntax checks passed for `src/scenes/chapterFive/routeScenes.js`, `src/scenes/sceneRegistry.js`, and `src/rendering/worldRenderer.js` using the bundled Node runtime.
- Static scene-data check confirms all nine new Chapter 5 scenes have `0` cottages, `0` repair parts, `0` broken branches, `showMarker: false`, and a `chapterFiveLandmark` type.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`.
- Chapter 5 route flow now walks `beacon-hill` -> `keeper-cottage` -> `lens-room` -> `fuel-shed` -> `mirror-array` -> `bell-platform` -> `old-flag-room` -> `storm-shutters` -> `relay-balcony` -> `hill-descent`, then continues to `chapter-six/rainbarrel-row`.
- Local preview server responded at:
  - `http://127.0.0.1:5271/?scene=chapter-five/keeper-cottage&x=1120&preview=1`
  - `http://127.0.0.1:5271/?scene=chapter-five/lens-room&x=1120&preview=1`
  - `http://127.0.0.1:5271/?scene=chapter-five/fuel-shed&x=1120&preview=1`
  - `http://127.0.0.1:5271/?scene=chapter-five/mirror-array&x=1120&preview=1`
  - `http://127.0.0.1:5271/?scene=chapter-five/bell-platform&x=1120&preview=1`
  - `http://127.0.0.1:5271/?scene=chapter-five/old-flag-room&x=1120&preview=1`
  - `http://127.0.0.1:5271/?scene=chapter-five/storm-shutters&x=1120&preview=1`
  - `http://127.0.0.1:5271/?scene=chapter-five/relay-balcony&x=1120&preview=1`
  - `http://127.0.0.1:5271/?scene=chapter-five/hill-descent&x=1120&preview=1`
- Local asset probes confirmed the generated reference assets respond at:
  - `assets/sprites/world/keeper-cottage-painted.png`
  - `assets/sprites/world/lens-room-painted.png`
  - `assets/sprites/world/fuel-shed-painted.png`
  - `assets/sprites/world/mirror-array-painted.png`
  - `assets/sprites/world/bell-platform-painted.png`
  - `assets/sprites/world/old-flag-room-painted.png`
  - `assets/sprites/world/storm-shutters-painted.png`
  - `assets/sprites/world/relay-balcony-painted.png`
  - `assets/sprites/world/hill-descent-painted.png`
- In-app browser verification loaded each new Chapter 5 preview at `1280x720` with a visible canvas and no console errors.

## Next

Continue route-order sprite wiring at `chapter-six/rainbarrel-row`.
