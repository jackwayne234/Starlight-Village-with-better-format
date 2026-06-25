# Chunk 126: Stormedge Puzzle Skin and Difficulty Tuning

Status: complete

## Goal

Keep the rotate-path puzzle type while making Chapter 4 feel like a gentle step
harder than Mossline.

## Completed

- Added Chapter 4 puzzle sprite assets under
  `assets/sprites/chapter-four/puzzles/`.
- Registered the puzzle sprites in `src/rendering/sprites.js`.
- Updated the HUD to draw Stormedge puzzles with sprite-backed storm-blue metal
  tiles, brass wind channels, instrument nodes, selection frame, and completion
  spark.
- Added ten `ch4-*` tuned puzzle layouts.
- Added Stormedge-specific panel titles, instructions, objectives, and success
  text.

## Verification

- Automated layout probe confirmed all ten Chapter 4 puzzle layouts are
  solvable.
- Automated layout probe confirmed no Chapter 4 tuned layout starts already
  complete.

