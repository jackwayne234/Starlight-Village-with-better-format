# Chunk 129: Stormedge Sprite Landmark Cleanup

Status: complete

## Goal

Finish the Chapter 4 art conversion so the chapter no longer depends on the
older painted-landmark route or old generated `*-painted` world assets.

## Completed

- Moved all ten Chapter 4 scenes from `scene.paintedLandmark` to
  `scene.spriteLandmark`.
- Added a Chapter 4-friendly `drawSpriteLandmark` path in
  `src/rendering/worldRenderer.js`, while keeping `drawPaintedLandmark` only as
  a compatibility wrapper for older chapters.
- Removed the old Chapter 4 `*-painted.png` and `*-painted-source.png` files
  from `assets/sprites/world/` after confirming active source no longer
  references them.
- Bumped Stormedge cache tags so the browser loads the sprite-landmark pass.

## Verification

- Source search confirmed no Chapter 4 scene file uses `paintedLandmark`.
- Source search confirmed the old Chapter 4 `*-painted` world assets are not
  referenced by active source.
- Scene data probe confirmed all ten Chapter 4 scenes use `spriteLandmark`,
  none use `paintedLandmark`, all ten point at `source: "chapterFourLandmarks"`,
  and none contain cottages, broken branches, loose repair parts, generic
  signposts, or generic repair markers.
- Asset search confirmed no old Chapter 4 `*-painted` files remain in
  `assets/sprites/world/`.
- In-app browser sweep loaded all ten Chapter 4 preview URLs on port `5340` with
  a 1280x720 canvas and no captured warnings or errors.
