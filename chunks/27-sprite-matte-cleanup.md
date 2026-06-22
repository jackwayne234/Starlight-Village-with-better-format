# Chunk 27 - Sprite Matte Cleanup

## Goal

Remove leftover white matte/fringe pixels from active game sprites so they blend into the rainy night scenes.

## Scope

- Audit active `*-trimmed.png` sprites against a dark background.
- Clean boundary-connected near-white pixels from the rendered sprite set.
- Preserve interior highlights, lamps, robot body color, and warm glow details.

## Criteria

- Beacon tower/lighthouse base no longer shows a white perimeter in Old Observatory.
- Common world sprites no longer have obvious white cutout halos.
- Character sprites are only lightly touched where edge artifacts were detected.

## Completion Notes

- Cleaned all active world `*-trimmed.png` sprites.
- Lightly cleaned apprentice trimmed sprites where tiny edge pixels were detected.
- Rechecked the active sprite set on a dark contact sheet after cleanup.
- The raw non-trimmed source PNGs were left unchanged because the renderer uses the trimmed files.
