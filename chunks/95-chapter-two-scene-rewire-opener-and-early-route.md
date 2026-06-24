# Chunk 95: Chapter Two Scene Rewire: Opener and Early Route

Status: complete

## Goal

Wire the new Chapter 2 biome treatment into the early Chapter 2 scenes.

## Ground Truth

- All Chapter 2 scenes should be brought to the new wetland standard.
- Gameplay loop stays the same: arrive, walk right, robot scans, puzzle opens, solve, small celebration, Space/E transition.
- Background and path should be shared; foreground repair area changes per scene.

## Scope

- Apply the new wetland background/path system to the opener and early route scenes.
- Wire matching landmarks where ready.
- Keep puzzle mechanics unchanged in this chunk.

## Likely Scenes

- `chapter-two/glowfen-grove`
- `chapter-two/lantern-lily-pool`
- `chapter-two/bog-bridge`
- `chapter-two/frogsong-lock`

## Likely Files

- `src/scenes/chapterTwo/*.js`
- `src/rendering/worldRenderer.js`
- `src/rendering/sprites.js`

## Verification

- Each early Chapter 2 scene renders with the new biome.
- Route links still work through the early Chapter 2 sequence.
- No cottages, loose repair props, broken-branch clutter, or generic markers unless intentionally added.

## Done When

The early Chapter 2 route uses the new wetland background/path and matching foreground repair landmarks.

## Completed

- Rewired the early active Chapter 2 route scenes onto the shared Chapter 2 wetland sprite direction:
  - `chapter-two/glowfen-grove`
  - `chapter-two/lantern-lily-pool`
  - `chapter-two/bog-bridge`
  - `chapter-two/frogsong-lock`
- Added a small painted-landmark resolver so the shared renderer can draw isolated `sprites.chapterTwo.landmarks` assets as foreground repair landmarks.
- Swapped Glowfen Grove from its older full-scene side sprite to the new isolated `root-pump.png` landmark.
- Swapped Lantern Lily Pool from the older full-context side sprite plus bottom-water underlay to the new isolated `lantern-lily-crossing.png` landmark.
- Added Chapter 2 landmark-sprite wiring for Bog Bridge and Frogsong Lock using `bog-bridge.png` and `frogsong-lock.png`.
- Preserved Wetland Approach as the transition scene between Festival Square and Glowfen Grove.
- Left puzzle mechanics, puzzle difficulty tuning, repair loop behavior, and the Chunk 96 back-half scenes unchanged.

## Verification Notes

- Source/data check passed with 101 full-route scenes.
- Confirmed route flow: Festival Square -> Wetland Approach -> Glowfen Grove -> Lantern Lily Pool -> Bog Bridge -> Frogsong Lock -> Sunken Signpost.
- Confirmed all four edited early Chapter 2 scenes use `source: "chapterTwoLandmarks"` painted landmarks.
- Confirmed edited scenes have no cottages, loose repair parts, broken-branch clutter, or generic repair markers.
- `worldRenderer.js` imports successfully with a local image stub after the Chapter 2 landmark resolver change.
- Local HTTP `preview=1` probing was attempted on port `5295`, but this managed shell blocked its own localhost connection with `EPERM`.
