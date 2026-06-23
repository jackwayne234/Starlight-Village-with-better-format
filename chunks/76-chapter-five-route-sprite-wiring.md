# Chunk 76: Chapter Five Route Sprite Wiring

Status: in progress

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

## Verification

- Static scene-data check confirms `chapter-five/beacon-hill` remains custom with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, `showMarker: false`, and route flow to `chapter-five/keeper-cottage`.
- Asset review confirmed `assets/sprites/world/beacon-tower-large-door.png` is the active `beaconTowerLargeDoor` sprite and reads as the strongest side-view/front-facing Beacon Hill landmark currently available.
- Syntax checks passed for `src/scenes/chapterOne/beaconHill.js`, `src/scenes/sceneRegistry.js`, `src/rendering/worldRenderer.js`, and `src/rendering/sprites.js` using the bundled Node runtime.
- Local preview server responded at:
  - `http://127.0.0.1:5269/?scene=chapter-five/beacon-hill&x=1120&preview=1`
- Local probes confirmed the Beacon Hill scene module and `assets/sprites/world/beacon-tower-large-door.png` respond from the preview server.
- Local probe confirmed `assets/sprites/world/beacon-hill-painted.png` is absent, matching the review decision.
- Browser screenshot verification was not available in this thread because no callable browser-control tool was exposed.

## Next

Continue route-order sprite wiring at `chapter-five/keeper-cottage`.
