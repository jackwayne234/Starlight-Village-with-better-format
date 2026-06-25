# Chunk 125: Stormedge Scene Rewire and Repaired-State Pass

Status: complete

## Goal

Wire approved Stormedge landmark sprites into all ten Chapter 4 scenes and keep
their repaired states readable.

## Completed

- Updated every Chapter 4 scene to use `paintedLandmark` with
  `source: "chapterFourLandmarks"`.
- Added repaired-state hooks for Weather Vane Roof, Cliff Rope Lift, Wind Chime
  Pass, Lightning Rod Field, Lookout Post, Cracked Stair, Cloud Harvester,
  Summit Path, and Beacon Approach.
- Stormedge Rise continues to use the storm-gauge repair state through the
  ridge gauge object while now drawing the Chapter 4 storm gauge sprite.

## Notes

- All ten scenes stay free of random cottages, loose repair props, and generic
  repair markers.
- Beacon Hill remains a distant background destination until the Chapter 5 route.

