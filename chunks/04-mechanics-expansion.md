# Chunk 4: Mechanics Expansion

## Goal

Add the next tiny gameplay idea after the water wheel without overgrowing the prototype.

## Scope

- A second repair type.
- Robot scanning behavior.
- Optional tool or inventory seed if it earns its place.
- Progression from one repair to the next.
- Simple fail-soft feedback when the player is not in range or not ready.

## Success Criteria

- The second repair feels distinct from holding Space on the wheel.
- The mechanics remain understandable without tutorial walls.
- Interaction state stays in `src/interaction`.
- The slice remains playable from start to finish.

## Notes

One new mechanic is enough for this chunk.

## Completion Notes

- Added repair queue support around the existing water wheel.
- Kept water wheel as the hold-to-charge mechanic.
- Added a distinct timed-tap mechanic in the interaction layer for later repair targets.
- Kept Scene 1 focused on the water wheel only.
- Verified the water wheel repair can complete and hand off to the next step.
