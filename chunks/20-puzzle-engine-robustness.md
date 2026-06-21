# Chunk 20: Puzzle Engine Robustness

## Goal

Harden the rotate-path puzzle engine against fragile assumptions while preserving current
puzzle behavior.

## Scope

- `src/interaction/repairPuzzle.js`: the BFS in `updateConnections` hard-starts at tile
  `[0][0]`, assuming the start node is always top-left. Consider keying the traversal off the
  actual `start` tile so layouts are not silently coupled to grid position.
- Confirm every layout in `layouts` is solvable from its initial rotations (ties to the
  Chunk 16 solvability script).
- Keep all changes behavior-preserving for existing puzzles.

## Success Criteria

- Connectivity is computed from the real start node, not a hardcoded coordinate.
- All seven puzzle layouts remain solvable; solvability script passes.
- Manual solve of at least two puzzles confirms unchanged behavior.

## Notes

Status: pending (requires start permission). Candidate issue from the planning read; confirm
against Chunk 16 first. Behavior-preserving refactor allowed under Q17.

## Completion Notes

- `updateConnections` in `src/interaction/repairPuzzle.js` now seeds its BFS from the actual
  `start` tile (new `findStartTile` helper) instead of the hardcoded `[0][0]` cell. Removes
  the silent coupling between connectivity and grid position. If no start tile exists, the
  queue is empty and the puzzle simply isn't completable (safe).
- Behavior-preserving: all layouts already place `start` at `[0][0]`.
- Verified two ways: (1) standalone solvability brute force still passes for all 7 layouts;
  (2) drove each of the 6 scene puzzles to a solving rotation set through the engine's own
  API (`rotateSelectedTile`) and confirmed `puzzle.completed` becomes true.
- Syntax check passes.
- Status: complete.
