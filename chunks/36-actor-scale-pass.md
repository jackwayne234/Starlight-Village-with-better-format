# Chunk 36: Actor Scale Pass

Status: complete

## Goal

Make the apprentice read as a kid beside doors and entrances instead of towering over them.

## Completed

- Added scene actor scale fields for the player and robot.
- Rendered the player at kid scale across the game.
- Tightened the scale further after Beacon Hill review so the beacon doorway reads usable.
- Slightly tightened robot scale and follow distance to match the smaller apprentice.
- Scaled character face avoidance zones for speech bubbles.
- Bumped browser module version tags for the actor renderer and affected HUD/game modules.

## Notes

- This uses the existing apprentice sprite at a better world scale. A future dedicated child sprite can replace it without changing scene layout again.
