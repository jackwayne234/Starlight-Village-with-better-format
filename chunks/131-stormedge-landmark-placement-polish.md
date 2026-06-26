# Chunk 131: Stormedge Landmark Placement Polish

Status: complete

## Goal

Tune the user-provided Chapter 4 landmark sprites so each repair scene keeps one
clear landmark without crowding the player, robot, or playable path.

## Completed

- Adjusted `cliff-rope-lift` left and smaller so the player stands beside the
  lift instead of inside the basket.
- Adjusted `lookout-post` right and smaller so the platform reads as a lookout
  landmark without swallowing the player.
- Reduced and nudged `cracked-stair`, `cloud-harvester`, and
  `beacon-approach` so the new sprites feel grounded but not oversized.
- Reduced `summit-path` and centered it around the repair area so its marker
  chain reads as the scene landmark instead of a distant side prop.

## Verification

- Built visual boards of all ten Chapter 4 preview scenes before and after the
  tuning pass.
- In-app browser sweep loaded all ten Chapter 4 preview URLs on port `5362`
  with a 1280x720 canvas and no captured warnings or errors.
- Route/data probe confirmed all ten Chapter 4 scenes still use
  `source: "chapterFourLandmarks"`, keep generic repair markers hidden, and
  preserve route order through Beacon Approach.

## Next

Play through Chapter 4 from Last Platform to Beacon Hill and tune any puzzle or
dialogue beats that feel out of step with the new art.
