# Chunk 144: Puddle Matte Cleanup

Status: complete

## Goal

Remove the pale pasted-on border around the shared rock-ring puddle sprite.

## Completed

- Cleaned the white matte fringe from `assets/sprites/world/puddle-trimmed.png`.
- Kept the interior water highlights and stone reflections intact.
- Added a puddle-specific cache tag so browser reloads pull the cleaned sprite.

## Verification

- Compared the original and cleaned puddle sprite on a dark game-like
  background before applying it.
- In-browser scene previews should be reloaded with the `puddle-matte-cleanup`
  cache tag before visual approval.

## Next

If any other one-off puddle sprite still shows a pasted-on rim, inspect and
clean that asset separately.
