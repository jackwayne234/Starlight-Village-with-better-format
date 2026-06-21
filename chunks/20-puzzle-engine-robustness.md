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

_(to be filled in when the chunk runs)_
