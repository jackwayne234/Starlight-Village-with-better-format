# Chunk 145: Glowfen Repair 1 Sprite Waymark

Status: complete

## Goal

Replace the hand-drawn Wetland Approach waymark treatment in Glowfen Repair 1 with an existing Chapter 2 sprite so the scene no longer reads like painted pieces pasted over the game.

## Changes

- Confirmed `chapter-two/wetland-approach` is the HUD-facing `Chapter 2: Glowfen - Repair 1 of 11`.
- Wired Wetland Approach through `scene.spriteLandmark` using the transparent Chapter 2 `sunkenRouteMarker` landmark sprite.
- Kept the existing `wetlandApproach` state object so repair completion still lights the marker, lamps, and glow plants.
- Left the old canvas waymark renderer available as fallback if the sprite is not ready.
- Bumped the browser cache key for the main module and Wetland Approach import.

## Verification

- Source checks passed for `src/scenes/chapterTwo/wetlandApproach.js`, `src/scenes/sceneRegistry.js`, and `src/main.js`.
- Static scene check confirmed `chapter-two/wetland-approach` uses `scene.spriteLandmark` with `chapterTwoLandmarks.sunkenRouteMarker`, has no `paintedLandmark`, hides the generic repair marker, and still routes to `chapter-two/glowfen-grove`.
- Full route walk still reaches 101 scenes, with Wetland Approach at route stop 11 and Celebration Square as the final scene.
- In-app browser preview passed at `http://127.0.0.1:5364/?scene=chapter-two/wetland-approach&x=1120&preview=1&v=glowfen-r1-sprite-waymark` with a `1280x720` canvas and no browser warnings or errors.
