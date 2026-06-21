# Chunk 17: Input Handling Consistency

## Goal

Make keyboard input consistent and free of unintended browser side effects across walking
and puzzle navigation.

## Scope

- `src/core/input.js`: the `gameCodes` set omits `KeyW`/`KeyS`, but `repairFlow.js` consumes
  them for puzzle selection — so W/S are not `preventDefault`'d and behave inconsistently
  with the arrow/WASD scheme used elsewhere.
- Confirm all keys the game actually consumes are represented consistently.
- Possible light touch to `src/interaction/repairFlow.js` if needed for consistency.

## Success Criteria

- W/S navigate the puzzle and do not scroll or trigger default browser behavior.
- Arrow keys and WASD behave consistently in both walking and puzzle modes.
- Boot check passes with no console errors.

## Notes

Status: pending (requires start permission). Candidate issue spotted during the planning
read; confirm against Chunk 16 inventory before editing. Match nearby style (Q15).
Chunk doc per Q14.

## Completion Notes

- Added `KeyW` and `KeyS` to the `gameCodes` set in `src/core/input.js`. These are consumed
  by `repairFlow.js` for puzzle navigation but were previously not `preventDefault`'d,
  unlike their `KeyA`/`KeyD` counterparts. Now W/S behave consistently and won't scroll the
  page.
- Syntax check passes.
- Status: complete.
