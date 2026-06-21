# Chunk 19: Repair Flow and Entity Correctness

## Goal

Resolve logic and dead-parameter issues in the actor/flow layer so repair and scene-advance
cycles behave cleanly.

## Scope

- `src/core/game.js` calls `updateRobot(scene, dt, time)` but `src/entities/robot.js` ignores
  `time` (no time-based idle bob) — decide whether to use it or drop the argument.
- Confirm `scene.robot.pose` values set by `repairFlow.js` ("scan"/"route"/"celebrate"/"idle")
  are actually consumed by `src/rendering/actorRenderer.js`.
- Audit `advanceRepairTarget` and flow-mode resets across scene transitions for any mode left
  in a stale state.

## Success Criteria

- No unused/mismatched parameters between `game.js` and the entity updaters.
- Robot pose changes are reflected on screen (or confirmed intentionally unused).
- A full repair → reward → advance cycle runs with no console errors and no stuck state.

## Notes

Status: pending (requires start permission). Candidate issues from the planning read; confirm
against Chunk 16. Keep changes behavior-preserving; refactor only if it clearly helps (Q17).

## Completion Notes

_(to be filled in when the chunk runs)_
