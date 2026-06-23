# Chunk 33: Beacon Hill Depth Pass

Status: complete

## Goal

Make the Beacon Hill signal tower read as farther away so the entrance no longer looks strangely tiny beside the player.

## Completed

- Moved the beacon tower farther back in the scene by giving it a higher ground line.
- Reduced the tower sprite height for a more distant landmark read.
- Shifted the repair hotspot, cables, and reaction text to match the new tower position.
- Drew the tower before the nearby shed so the scene layers read with clearer depth.
- Bumped browser module version tags for the changed scene and renderer files.

## Correction

- The first depth pass overcorrected the tower placement. It has been pulled back toward the original staging with a subtler height and ground-line change.
- Added `scene=` and optional `x=` playtest query parameters so individual locations can be opened directly for visual checks without changing normal startup.
- Visually checked Beacon Hill in the browser after correction.
- Enlarged the beacon again after visual review so the player reads closer to the doorway scale.
- Enlarged the beacon structure again after the actor scale pass so the door reads closer to a usable entrance.
- Lowered/sank the tower slightly after review so the roof no longer clips while keeping the improved door scale.
