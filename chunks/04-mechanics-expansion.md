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

- Added a repair queue with the existing water wheel and a new lamp relay target.
- Kept water wheel as the hold-to-charge mechanic.
- Added a distinct timed-tap lamp relay mechanic with three successful taps required.
- Added fail-soft miss feedback for mistimed relay taps.
- Added a relay marker in the world and a timing meter in the HUD.
- Verified the full sequence from water wheel repair to relay repair completion.
