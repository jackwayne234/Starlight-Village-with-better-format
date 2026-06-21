# Chunk 16: Full Issue Inventory

## Goal

Read every source file end to end and produce the authoritative, categorized backlog of
issues that the fix chunks (17+) will draw from and be re-scoped against.

## Scope

- Read all of `src/**`, including all six `src/scenes/chapterOne/*.js` files and every
  renderer in `src/rendering`.
- Categorize findings: functional bugs / behavior / hygiene / low-risk polish.
- Optional throwaway Node script to load each puzzle layout from `repairPuzzle.js` and verify
  every Chapter-1 puzzle is solvable from its starting rotations (deterministic check, beats
  manual rotation).
- No source edits in this chunk.

## Success Criteria

- A written issue inventory exists, grouped by category, each item tied to file/line.
- If used, the solvability script confirms all seven puzzle layouts are solvable.
- The fix chunks (17+) are confirmed or re-scoped against this inventory.

## Notes

Status: pending (requires start permission). Discovery-only chunk. Any helper script is a
throwaway sanity check, not committed to the repo unless it proves reusable. There is no
existing test harness to reuse — repo has no package.json, linter, or test runner.

## Completion Notes

Read every source file end to end. Puzzle solvability brute-forced via a throwaway Node
script (`/tmp/solvability.mjs`, not committed): all 7 layouts (water-wheel, root-pump,
junction-line, storm-gauge, beacon-signal, water-routing, glow-bridge) are SOLVABLE.

Issue inventory (each maps to a later chunk):

Functional / correctness:
- [C17] `core/input.js` `gameCodes` omits `KeyW`/`KeyS`, but `repairFlow.js` consumes them
  for puzzle navigation → W/S not `preventDefault`'d, inconsistent with KeyA/KeyD.
- [C19] `core/game.js` calls `updateRobot(scene, dt, time)`; `entities/robot.js` signature is
  `(scene, dt)` — `time` is a dead argument (robot bob is handled in the renderer instead).
- [C20] `interaction/repairPuzzle.js` BFS seeds connectivity from hardcoded cell `[0][0]`
  rather than the actual `start` tile. Works today (all layouts put start at `[0][0]`) but
  fragile.

Copy / UX:
- [C18] `ui/hud.js` continue prompt says "Press Space Bar to continue" but
  `consumeRepairInput` also accepts Enter and E.

Hygiene:
- [C23] `rendering/worldRenderer.js` `drawLampRelay` + the `lamp-relay` branch are dead — no
  scene/repair uses id `lamp-relay`.
- [C23] `roundedRect` is duplicated in 4 files (hud, renderPipeline, actorRenderer,
  worldRenderer); `clamp` exists in camera.js (exported) and re-declared in hud.js.

Rendering (C22): reviewed all canvas `save`/`restore` pairs and `globalAlpha`/composite-op
usage — balanced, no obvious state leaks. Expect little/no change.

Scene data (C21): every landmark reference used by `applyRepairEffect`/`restoreRepairEffect`
(`bridge`, `switchyard`, `ridge.gauge`, `beaconHill.tower`, `rainbarrelRow`) exists in its
scene; every `puzzleTheme` has a matching layout; route + chapterComplete data match HANDOFF.
Expect confirm-only.

Needs-decision (NOT auto-fixed): save is written but never loaded — `main.js` calls
`clearProgress()` on boot and never `loadProgress()`/`applyProgress()`. Intentional playtest
behavior per HANDOFF; left for user decision.

Status: complete.
