# Chunk 96: Chapter Two Scene Rewire: Back Half

Status: complete

## Goal

Wire the new Chapter 2 biome treatment into the back half of Chapter 2.

## Ground Truth

- All Chapter 2 scenes should be brought to the new wetland standard.
- Existing generated landmark sprites may be used only if they fit the side-scroller wetland direction.
- Chapter 2 ends with the wetland path restored and the way opened to Chapter 3.

## Scope

- Apply the new wetland background/path system to the remaining Chapter 2 route scenes.
- Wire matching landmarks where ready.
- Preserve the Chapter 2-to-Chapter 3 transition.

## Likely Scenes

- `chapter-two/sunken-signpost`
- `chapter-two/mist-pool`
- `chapter-two/moss-gate`
- `chapter-two/old-fen-shrine`
- `chapter-two/glowfen-ferry`
- `chapter-two/reedwatch-bank`

## Likely Files

- `src/scenes/chapterTwo/*.js`
- `src/rendering/worldRenderer.js`
- `src/rendering/sprites.js`

## Verification

- Back-half Chapter 2 scenes render with the new biome.
- `chapter-two/reedwatch-bank` still routes to `chapter-three/mossline-switchyard`.
- Browser previews have no console warnings or errors.

## Done When

The full Chapter 2 route visually matches the new wetland standard and still flows into Chapter 3.

## Completed

- Rewired the remaining active Chapter 2 route scenes onto the shared wetland sprite direction:
  - `chapter-two/sunken-signpost`
  - `chapter-two/mist-pool`
  - `chapter-two/moss-gate`
  - `chapter-two/old-fen-shrine`
  - `chapter-two/glowfen-ferry`
  - `chapter-two/reedwatch-bank`
- Added `source: "chapterTwoLandmarks"` painted-landmark entries for the matching isolated landmark sprites:
  - `sunkenRouteMarker`
  - `mistVentStones`
  - `mossGate`
  - `rainBowlMarker`
  - `glowfenFerry`
  - `reedwatchMarkers`
- Preserved the existing repair loop, repair text, puzzle themes, puzzle layouts, and scene-to-scene route data.
- Preserved the Chapter 2 exit from `chapter-two/reedwatch-bank` into `chapter-three/mossline-switchyard`.
- Left puzzle difficulty tuning for Chunk 97.

## Verification Notes

- Source/data check passed with 101 full-route scenes.
- Confirmed Chapter 2 route flow from Wetland Approach through Reedwatch Bank and onward to Mossline Switchyard.
- Confirmed all ten active post-transition Chapter 2 scenes now use `source: "chapterTwoLandmarks"` painted landmarks.
- Confirmed every referenced Chapter 2 landmark sprite file exists under `assets/sprites/chapter-two/landmarks/`.
- Confirmed active Chapter 2 route scenes have no cottages, loose repair parts, broken-branch clutter, or generic repair markers.
- In-app browser previews passed on port `5296` for all six back-half scenes with no captured warnings or errors; screenshots confirmed the shared wetland background/path and isolated foreground landmark treatment rendered.
