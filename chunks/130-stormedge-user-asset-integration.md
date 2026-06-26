# Chunk 130: Stormedge User Asset Integration

Status: complete

## Goal

Integrate the Chapter 4 assets supplied in the replacement project folder and
make the active Stormedge renderer load them cleanly.

## Completed

- Sliced `assets/sprites/chapter-four/landmarks/chapter-four-landmark-sheet-source.png`
  into the ten individual Chapter 4 landmark PNGs expected by
  `sprites.chapterFour.landmarks`.
- Removed the green-screen background from the landmark crops and refreshed the
  matching `*-source.png` files.
- Restored the expected Chapter 4 path filenames:
  - `assets/sprites/chapter-four/paths/rocky-walk-path.png`
  - `assets/sprites/chapter-four/paths/ridge-stone-path.png`
- Cleaned the path sprite's black matte so it layers over the shared Stormedge
  background without a dark horizontal band.
- Restored `assets/sprites/chapter-four/environment/stormedge-mist-band.png`
  so the existing mist renderer has a valid sprite to draw.

## Verification

- `git diff --check` passed.
- Route/import probe confirmed the ten Chapter 4 route entries.
- Scene data probe confirmed all ten Chapter 4 scenes use
  `source: "chapterFourLandmarks"`, keep `showMarker: false`, and have no
  cottages, loose repair parts, or broken branches.
- Asset existence and dimension checks passed for the refreshed background,
  foreground, path, mist, and landmark sprites.
- In-app browser sweep loaded all ten Chapter 4 preview URLs on port `5361`
  with a 1280x720 canvas and no captured warnings or errors.

## Next

Do a human-feel playtest through Chapter 4 and decide whether the new landmark
sprites need scale or placement adjustments scene by scene.
