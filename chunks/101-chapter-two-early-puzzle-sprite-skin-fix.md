# Chunk 101: Chapter Two Early Puzzle Sprite Skin Fix

Status: complete

## Goal

Respond to user playtest feedback that Lantern Lily Pool, or one of the first
Chapter 2 puzzles, still looked like it was not using the new sprite pass.

## Ground Truth

- Keep Chapter 2 gameplay and tuned puzzle layouts unchanged.
- Preserve Wetland Approach as the gentle transition repair.
- Preserve Lantern Lily Pool as an early Chapter 2 tuned rotate-path repair.
- Use the existing `assets/sprites/chapter-two/puzzles/` PNGs instead of adding
  new art or a new puzzle system.

## Scope

- Check Lantern Lily Pool landmark and puzzle rendering.
- Check the first Chapter 2 puzzle at Wetland Approach.
- Wire existing wetland puzzle sprites into Chapter 2 puzzle boards.
- Avoid broader Chapter 2 visual or gameplay changes.

## Completed

- Confirmed Lantern Lily Pool already used the Chapter 2 landmark sprite
  `assets/sprites/chapter-two/landmarks/lantern-lily-crossing.png`.
- Found the actual gap: the puzzle HUD had registered Chapter 2 puzzle sprites,
  but still rendered wetland rotate-path boards with canvas tile/conduit shapes.
- Updated `src/ui/hud.js` so `ch2-*` puzzle layouts draw the existing wetland
  tile, conduit, node, selection-frame, and completion-spark PNGs.
- Lantern Lily Pool now uses the shallow-water conduit sprite for its puzzle
  board.
- Wetland Approach now has `puzzleLayout: "ch2-wetland-approach"` so the first
  Chapter 2 transition repair gets the wetland sprite skin too, while still
  falling back to the same easy `beacon-signal` layout.
- Bumped module version query strings so browser refreshes pick up the new HUD,
  repair puzzle, scene registry, and Wetland Approach changes during playtest.

## Verification Notes

- Browser verification on local port `5312` showed the Lantern Lily Pool puzzle
  as `Lantern Lily Crossing` with wetland tile sprites and shallow-water conduit
  sprites. No captured browser warnings or errors.
- Browser verification on local port `5312` showed Wetland Approach as
  `Wetland Waymark Signal` with wetland tile sprites. No captured browser
  warnings or errors.
- Source check confirmed:
  - `chapter-two/wetland-approach` still routes to
    `chapter-two/glowfen-grove`.
  - `chapter-two/wetland-approach` still uses the gentle `beacon-signal`
    puzzle theme, now skinned by `ch2-wetland-approach`.
  - `chapter-two/lantern-lily-pool` still uses
    `ch2-lantern-lily-pool`.
  - Both checked puzzles still start incomplete.
