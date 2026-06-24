# Chunk 91: Chapter Two Sprite Registry Wiring

Status: complete

## Goal

Wire the new Chapter 2 sprite folders into the game sprite loading system.

## Ground Truth

- Chapter 2 should use newly created sprites for background, walking path, landmarks, and puzzles.
- Scene gameplay should remain the same.
- This chunk should make sprites available to renderers without changing the visible scene layout more than necessary.

## Scope

- Add Chapter 2 sprite references to the sprite registry/loader.
- Keep names clear and grouped by type.
- Add readiness/fallback behavior consistent with existing sprite patterns.

## Likely Files

- `src/rendering/sprites.js`
- `assets/sprites/chapter-two/`

## Verification

- Browser import/load check has no missing module errors.
- Sprite objects exist and images can load.
- Existing non-Chapter-2 scenes are unaffected.

## Done When

The game can load the new Chapter 2 sprite assets through the normal sprite system.

## Completed

- Added Chapter 2 sprite path constants to `src/rendering/sprites.js`.
- Added a grouped `sprites.chapterTwo` registry with:
  - `backgrounds` for the shared wetland background.
  - `paths` for the shared boardwalk/stepping-stone path.
  - `landmarks` for the 10 active Chapter 2 foreground repair landmarks.
  - `puzzles` for the 9 reusable wetland puzzle UI sprites.
- Kept the existing `loadImage()` and `imageReady()` readiness pattern.
- Kept existing `sprites.world` references intact for current renderers and fallbacks.
- Did not change scene code, puzzle mechanics, renderer layout, or visible Chapter 2 scene behavior.

## Registered Assets

### Backgrounds

| Key | File |
|-----|------|
| `sprites.chapterTwo.backgrounds.wetlandBackground` | `assets/sprites/chapter-two/backgrounds/wetland-background.png` |

### Paths

| Key | File |
|-----|------|
| `sprites.chapterTwo.paths.boardwalkSteppingPath` | `assets/sprites/chapter-two/paths/boardwalk-stepping-path.png` |

### Landmarks

| Key | File |
|-----|------|
| `sprites.chapterTwo.landmarks.rootPump` | `assets/sprites/chapter-two/landmarks/root-pump.png` |
| `sprites.chapterTwo.landmarks.lanternLilyCrossing` | `assets/sprites/chapter-two/landmarks/lantern-lily-crossing.png` |
| `sprites.chapterTwo.landmarks.bogBridge` | `assets/sprites/chapter-two/landmarks/bog-bridge.png` |
| `sprites.chapterTwo.landmarks.frogsongLock` | `assets/sprites/chapter-two/landmarks/frogsong-lock.png` |
| `sprites.chapterTwo.landmarks.sunkenRouteMarker` | `assets/sprites/chapter-two/landmarks/sunken-route-marker.png` |
| `sprites.chapterTwo.landmarks.mistVentStones` | `assets/sprites/chapter-two/landmarks/mist-vent-stones.png` |
| `sprites.chapterTwo.landmarks.mossGate` | `assets/sprites/chapter-two/landmarks/moss-gate.png` |
| `sprites.chapterTwo.landmarks.rainBowlMarker` | `assets/sprites/chapter-two/landmarks/rain-bowl-marker.png` |
| `sprites.chapterTwo.landmarks.glowfenFerry` | `assets/sprites/chapter-two/landmarks/glowfen-ferry.png` |
| `sprites.chapterTwo.landmarks.reedwatchMarkers` | `assets/sprites/chapter-two/landmarks/reedwatch-markers.png` |

### Puzzles

| Key | File |
|-----|------|
| `sprites.chapterTwo.puzzles.wetlandTileBase` | `assets/sprites/chapter-two/puzzles/wetland-tile-base.png` |
| `sprites.chapterTwo.puzzles.wetlandTileLit` | `assets/sprites/chapter-two/puzzles/wetland-tile-lit.png` |
| `sprites.chapterTwo.puzzles.boardwalkConduit` | `assets/sprites/chapter-two/puzzles/boardwalk-conduit.png` |
| `sprites.chapterTwo.puzzles.reedChannelConduit` | `assets/sprites/chapter-two/puzzles/reed-channel-conduit.png` |
| `sprites.chapterTwo.puzzles.shallowWaterConduit` | `assets/sprites/chapter-two/puzzles/shallow-water-conduit.png` |
| `sprites.chapterTwo.puzzles.wetlandStartNode` | `assets/sprites/chapter-two/puzzles/wetland-start-node.png` |
| `sprites.chapterTwo.puzzles.wetlandOutputNode` | `assets/sprites/chapter-two/puzzles/wetland-output-node.png` |
| `sprites.chapterTwo.puzzles.wetlandSelectionFrame` | `assets/sprites/chapter-two/puzzles/wetland-selection-frame.png` |
| `sprites.chapterTwo.puzzles.wetlandCompletionSpark` | `assets/sprites/chapter-two/puzzles/wetland-completion-spark.png` |

## Verification Notes

- Imported `src/rendering/sprites.js` with a browser-like `Image` shim using the bundled Node runtime.
- Confirmed `sprites.chapterTwo` exists.
- Confirmed registry counts: 1 background, 1 path, 10 landmarks, and 9 puzzle sprites.
- Confirmed every registered Chapter 2 asset path exists on disk.
- Confirmed `imageReady()` returns true for the loaded Chapter 2 image objects under the shim.
- Reviewed the source diff and confirmed this chunk only makes the new assets available; it does not consume them in scene or renderer code.
