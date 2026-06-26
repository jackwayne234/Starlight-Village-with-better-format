# Chunk 132: Stormedge Wind and Lamp Cleanup

Status: complete

## Goal

Remove the painted-looking wind streaks and repeated lamp props from Chapter 4
previews so the new Stormedge background, ridge path, and landmark sprites carry
the scene.

## Completed

- Stopped drawing Chapter 4 wind streak overlays in the shared Stormedge ground
  renderer.
- Stopped drawing Chapter 4 lamp props while preserving lamp rendering in other
  chapters.
- Kept the Chapter 4 scene data unchanged so the props can be restored or tuned
  later if needed.

## Verification

- Reloaded the Chapter 4 Stormedge Rise preview on port `5363`.
- Browser logs showed no warnings or errors after the renderer cleanup.

## Next

Continue previewing Chapter 4 and call out any remaining props or effects that
feel too painted or too busy.
