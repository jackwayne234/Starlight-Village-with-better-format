# Chunk 11: Old Build Repair Puzzles

## Goal

Migrate the old rotate-path repair puzzle into V2.

## Scope

- Puzzle data model.
- Scene-specific puzzle themes.
- Keyboard controls for selection and rotation.
- Canvas puzzle HUD.
- Completion handoff into repair flow.

## Success Criteria

- Repairs can use puzzle themes instead of only hold-charge.
- The puzzle logic stays in `src/interaction` or a focused puzzle module.
- HUD rendering stays in `src/ui`.

## Notes

Keep hold-charge repairs available for simple scenes and early tuning.

## Completion Notes

- Added a V2 repair puzzle model for old-style rotate-path repairs.
- Added path-puzzle support to the repair flow.
- Added keyboard controls: arrows or WASD select, Space/Enter/E rotates.
- Added a compact canvas puzzle board to the HUD.
- Migrated later-route repairs to old build puzzle themes.
- Kept Scene 1 as a single water wheel repair.
- Verified syntax, scene render smoke, and solvability for migrated puzzle layouts.
