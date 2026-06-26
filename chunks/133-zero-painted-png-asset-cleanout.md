# Chunk 133: Zero Painted PNG Asset Cleanout

Status: complete

## Goal

Remove every old `painted` raster asset from the game and make sure the active
source no longer requests those files.

## Completed

- Deleted all `*painted*.png`, `*painted*.jpg`, and `*painted*.webp` files under
  `assets/`.
- Removed the old world sprite registrations that loaded `*-painted.png` files.
- Removed the Chapter 4 wind-streak and lamp sprites from the active Chapter 4
  environment sprite registry.
- Deleted the Chapter 4 `stormedge-wind-streaks.png` and
  `stormedge-lamp-sprite.png` assets.
- Removed the unused Chapter 4 wind and lamp helper renderers.
- Bumped browser cache tags to `zero-painted-assets` so preview reloads do not
  reuse the old module graph.

## Verification

- Asset search returned `0` painted raster files under `assets/`.
- Source search found no active source paths to painted raster files, Chapter 4
  wind-streak sprites, or Chapter 4 lamp sprites.
- `git diff --check` passed.
- Route/import probe still loaded `101` route entries and `10` Chapter 4 scenes.
- Reloaded the open Stormedge Rise preview on port `5363` with
  `v=zero-painted-assets-final`; the canvas loaded at 1280x720 with no browser
  warnings or errors.

## Next

Continue previewing Chapter 4 against the zero-painted asset rule and call out
any remaining visual style mismatch.
