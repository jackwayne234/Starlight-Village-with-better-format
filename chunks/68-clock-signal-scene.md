# Chunk 68: Clock Signal Scene

Status: complete

## Goal

Turn `chapter-three/clock-signal` from a catalog placeholder into a bespoke Mossline Switchyard scene with one readable wet station-clock landmark, dense rainy woods, a clear robot explanation, and a visible synced repaired state.

## Completed

- Added a hand-built `chapter-three/clock-signal` scene with a wet station clock, rail signal lamps, pulse wires, wooded rail edges, puddles, mist, and Mossline foliage.
- Registered the scene so it replaces the planned catalog version while preserving the full route ledger.
- Added robot/player dialogue that explains the clock pulse is out of sync with the rail signal before the puzzle appears.
- Kept the scene quiet and focused: no cottages, no repair parts, no signpost, no generic marker, and no placeholder prop scatter.
- Added a bespoke renderer pass for the clock mast, clock face, side lamps, pulse wires, platform base, and repaired synchronized green signal.
- Added completion and saved-progress restore hooks so completed Clock Signal keeps its synced clock and lit lamps.
- Kept route flow to `chapter-three/last-platform`.

## Verification

- Syntax checks passed for the new scene, registry import chain, renderer, progress restore, and repair flow hooks.
- Route instantiation confirms `chapter-three/clock-signal` is hand-built and routes to `chapter-three/last-platform`.
- Scene data check confirms `0` cottages, `0` repair parts, `showMarker: false`, and a single `path-puzzle` repair.

## Next Chunk

Chunk 69 should polish `chapter-three/last-platform`.

Suggested scope:

1. Add a bespoke final platform landmark with a shelter, end-of-line lamp, and wet track stop.
2. Make completion visibly light the platform and open the hill road.
3. Keep `chapter-four/stormedge-rise` as the next route stop.
