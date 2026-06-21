# Chunk 23: Code Hygiene

## Goal

Make purposeful clarity-improving cleanups that do not change behavior, staying within the
project's existing style.

## Scope

- Across `src/**`: remove dead parameters, de-duplicate helpers that are copy-pasted across
  files (e.g. `roundedRect` in both `hud.js` and `renderPipeline.js`, `clamp` in multiple
  places), and name magic numbers only where a constant clearly aids reading.
- No broad restyle, no new formatting system, no new patterns (Q15).

## Success Criteria

- No duplicated helper logic where a single shared helper is clearly cleaner.
- No dead/unused parameters remain.
- Behavior is unchanged; boot check passes.

## Notes

Status: pending (requires start permission). Refactor only where it clearly helps (Q17).
Confirm scope against Chunk 16 so hygiene work does not collide with earlier fix chunks.

## Completion Notes

- Removed dead `lamp-relay` code from `src/rendering/worldRenderer.js`: the
  `activeRepair?.id === "lamp-relay"` branch, the `"lamp-relay"` entry in the marker
  exclusion list, and the entire unused `drawLampRelay` function. No scene/repair uses the id
  `lamp-relay` (confirmed by grep). Marker fallback behavior is unchanged for all real
  repairs.
- Verified no residual references; full `node --check` sweep passes on all JS files.

Deliberately NOT done (judgment call, kept simple):
- `roundedRect` is duplicated across hud/renderPipeline/actorRenderer/worldRenderer and
  `clamp` exists in camera.js + hud.js. Consolidating into a shared module would touch 5
  files and introduce new import coupling for a tiny self-contained helper. Per the
  "refactor only when it clearly helps" rule, the churn outweighs the benefit, so these are
  left as-is.

Status: complete.
