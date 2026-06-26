# Chunk 134: Clean World Sprite Replacement Pass

Status: complete

## Goal

Use the supplied Desktop `assets/sprites/world/` sprite library to repopulate
the game with clean non-painted filenames after removing every old painted PNG.

## Completed

- Copied the supplied world sprite assets into `assets/sprites/world/` under
  clean names, replacing `*-painted.png` with `<name>.png` and
  `*-painted-source.png` with `<name>-source.png`.
- Restored active world sprite registry entries to clean filenames for the
  existing route sprite hooks:
  - Chapter 1: Bakery, Bell Rope Corner, Workshop Lift, Schoolhouse Lanterns,
    Market Awnings, Old Footbridge, Rain Drain Corner, Mayor Porch, and
    Festival Square.
  - Chapter 2 legacy hooks: Lantern Lily Pool, Bog Bridge, Frogsong Lock,
    Sunken Signpost, Mist Pool, Moss Gate, Old Fen Shrine, Glowfen Ferry, and
    Reedwatch Bank.
  - Chapter 3 legacy hooks: Mossline Switchyard, Cargo Cart Turntable, Signal
    Arm Row, and Sparking Relay Shed.
- Kept the zero-painted rule intact: clean filenames only, no `*painted*`
  raster files.

## Verification

- Asset search returned `0` painted raster files under `assets/`.
- Active source search returned `0` painted raster image references.
- Route data probe loaded `101` route entries and `10` Chapter 4 entries.
- `git diff --check` passed.
- Reloaded the preview on port `5363`; server logs confirmed clean replacement
  assets were requested with `200` responses.

## Next

Continue previewing the route and call out any scene whose imported clean sprite
needs scale, placement, or replacement.
