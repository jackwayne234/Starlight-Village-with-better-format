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

- Removed the dead `time` argument from the `updateRobot(scene, dt, time)` call in
  `src/core/game.js` (now `updateRobot(scene, dt)`). `entities/robot.js` never used it; the
  robot's hover/bob is driven by `time` in the renderer, so behavior is unchanged. `time` is
  still used elsewhere in the loop (dt calc + `renderScene`).
- Verified `scene.robot.pose` values set by `repairFlow.js` ("scan"/"route"/"celebrate"/
  "idle") are consumed by `rendering/actorRenderer.js` (`drawRobot`) — no dead pose state.
- Audited `advanceRepairTarget` and flow-mode transitions: within-scene advance resets mode
  to "walking" with cleared timers; scene change builds a fresh scene via the registry
  (clean defaults); chapter-complete sets its own mode. No stale-state issues found.
- Syntax check passes.
- Status: complete.
