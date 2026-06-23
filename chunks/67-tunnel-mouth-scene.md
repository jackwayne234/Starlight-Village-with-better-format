# Chunk 67: Tunnel Mouth Scene

Status: complete

## Goal

Turn `chapter-three/tunnel-mouth` from a catalog placeholder into a bespoke Mossline Switchyard scene that meets the Bakery Gutter quality bar: one clear landmark, dense rainy forest mood, quiet prop set, robot issue explanation, visible puzzle, and clear repaired state.

## Completed

- Added a hand-built `chapter-three/tunnel-mouth` scene with a wet stone tunnel portal, warning lamps, rail threshold, dense flanking pines, Mossline foliage, puddles, and mist.
- Registered the scene so it replaces the planned catalog version while preserving the full route ledger.
- Added robot/player dialogue that explains the unsafe warning-lamp sequence before opening the puzzle.
- Kept the scene uncluttered: no cottages, no loose repair parts, no generic repair marker, and no placeholder prop scatter.
- Added a bespoke renderer pass for the stone portal, dark tunnel interior, lamp sequence, track threshold, forest walls, and repaired green-lamp state.
- Added completion and saved-progress restore hooks so completed Tunnel Mouth keeps its safe warning lamps and lit environment.
- Kept route flow to `chapter-three/clock-signal`.

## Verification

- Syntax checks passed for the new scene, registry import chain, renderer, progress restore, and repair flow hooks.
- Route instantiation confirms `chapter-three/tunnel-mouth` is hand-built and routes to `chapter-three/clock-signal`.
- Scene data check confirms `0` cottages, `0` repair parts, `showMarker: false`, and a single `path-puzzle` repair.

## Next Chunk

Chunk 68 should polish `chapter-three/clock-signal`.

Suggested scope:

1. Add a bespoke wet station clock landmark and pulse/signal readout.
2. Make completion visibly sync the clock face and rail signal lights.
3. Keep `chapter-three/last-platform` as the next route stop.
