# Chunk 21: Scene Data Audit

## Goal

Verify each Chapter-1 scene's data matches what the repair-effect and progress-restore code
expects, so completed-repair effects apply cleanly with no errors or silent no-ops.

## Scope

- `src/scenes/chapterOne/*.js` (all six scenes) cross-checked against `applyRepairEffect` in
  `src/interaction/repairFlow.js` and `restoreRepairEffect`/`restoreWorldFlags` in
  `src/core/progress.js`.
- Confirm referenced structures exist where used: `scene.bridge`, `scene.switchyard`,
  `scene.ridge`, `scene.beaconHill`, `scene.rainbarrelRow`, and the `layers` arrays
  (`glowPlants`, `lamps`, `cottages`, etc.).
- Confirm each repair's `id`, `puzzleTheme`, `nextSceneId`, and `chapterComplete` data line up
  with the route in `HANDOFF.md`.

## Success Criteria

- Every scene's repair completion triggers its intended visual effect with no console errors.
- No effect references a structure the scene does not define.
- Scene route and chapter-complete flags match the documented Chapter-1 order.

## Notes

Status: pending (requires start permission). Confirm against Chunk 16 inventory. Preserve the
save schema (Q9) — additive only if anything must change.

## Completion Notes

Confirm-only — no code changes needed. Verified programmatically (throwaway
`/tmp/scene-audit.mjs`):

- Every repair's effect/restore target structure exists in its scene:
  - root-pump → `bridge`, `layers.glowPlants`, `layers.lamps`
  - switchyard-junction → `switchyard.poles/boxes`, `layers.lamps`
  - storm-gauge → `ridge.gauge`, `layers.lamps`
  - beacon-tower → `beaconHill.tower`, `layers.lamps`
  - rainbarrel-drain → `rainbarrelRow.drain/channels/barrels`, `layers.cottages/lamps`
  - water-wheel → `world`, `layers`
- All six scene factories build without throwing; every `nextSceneId` resolves in the
  registry.
- Repair chain matches the documented Chapter-1 route:
  water-wheel → root-pump → switchyard-junction → storm-gauge → beacon-tower →
  rainbarrel-drain → [chapter complete]. Initial scene = starlight-village.

Status: complete (no changes required).
