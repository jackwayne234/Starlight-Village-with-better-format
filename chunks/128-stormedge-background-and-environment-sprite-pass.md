# Chunk 128: Stormedge Background and Environment Sprite Pass

Status: complete

## Goal

Respond to the Chapter 4 playtest note that Stormedge needs a stronger chapter
background and that the remaining non-sprite environment pieces should become
sprites.

## Completed

- Added a new Chapter 4 Stormedge background sprite:
  `assets/sprites/chapter-four/backgrounds/stormedge-background-rocky-v1.png`.
- Added reusable Chapter 4 environment sprites:
  - `assets/sprites/chapter-four/environment/stormedge-ridge-foreground.png`
  - `assets/sprites/chapter-four/environment/stormedge-mist-band.png`
  - `assets/sprites/chapter-four/environment/stormedge-wind-streaks.png`
  - `assets/sprites/chapter-four/environment/stormedge-pine-reference-still.png`
  - `assets/sprites/chapter-four/environment/stormedge-lamp-sprite.png`
  - `assets/sprites/chapter-four/environment/stormedge-puddle-sprite.png`
- Added the Chapter 4 walk path sprite:
  `assets/sprites/chapter-four/paths/rocky-walk-path.png`.
- Updated `src/rendering/sprites.js` so Chapter 4 loads the new background and
  environment sprite set.
- Updated `src/rendering/worldRenderer.js` so Chapter 4 ground, ridge foreground,
  wind streaks, mist bands, trees, lamps, puddles, and walk path prefer sprite
  images instead of code-drawn shapes.
- Removed the leftover generic signpost from Stormedge Rise itself. The full
  Chapter 4 route now keeps the established rule: one strong landmark sprite,
  no random cottages, no loose repair props, no generic repair marker, and no
  generic signpost.

## Verification

- `git diff --check` passed.
- Route/import probe confirmed all ten Chapter 4 route entries.
- Scene data probe confirmed all ten Chapter 4 scenes use
  `source: "chapterFourLandmarks"` and have no cottages, broken branches, repair
  parts, generic signpost, or generic marker.
- Asset dimension probe confirmed the new background/environment sprites and the
  ten Chapter 4 landmark sprites exist.
- In-app browser sweep loaded all ten Chapter 4 preview URLs on port `5350` with
  a 1280x720 canvas and no captured warnings or errors.
- The browser tab was restored to the normal playable Chapter 4 URL:
  `http://127.0.0.1:5350/?scene=chapter-four/stormedge-rise&x=1120&preview=1&v=chapter4-user-path-v2`.
