# Chunk 26 - Chapter 2 Route Expansion

## Goal

Extend the playable route beyond the six-location Chapter 1 lane into a first Chapter 2 pass.

## Scope

- Add three Chapter 2 scenes: Lantern Market, Glassrail Crossing, and Old Observatory.
- Connect Rainbarrel Row into Chapter 2 instead of ending the route there.
- Add three new rotate-path puzzle themes for the Chapter 2 repairs.
- Update handoff and README route notes.

## Criteria

- Every new scene is registered through `sceneRegistry.js`.
- Every new repair uses the existing `path-puzzle` flow.
- Existing save format stays unchanged.
- All puzzle themes are mechanically solvable.

## Completion Notes

- Added `chapter-two/lantern-market`, `chapter-two/glassrail-crossing`, and `chapter-two/old-observatory`.
- Rainbarrel Row now advances to Lantern Market.
- Old Observatory shows the Chapter 2 completion summary.
- Verified all nine scene factories instantiate.
- Verified every puzzle theme has at least one solution by brute force.
