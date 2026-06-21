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

_(to be filled in when the chunk runs)_
