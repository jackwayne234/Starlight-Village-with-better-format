# Chunk 37: Large Door Beacon Sprite

Status: complete

## Goal

Replace the Beacon Hill tower art with a beacon sprite designed around a kid-scale entrance.

## Completed

- Generated a new painted beacon tower sprite with a large arched door.
- Removed the chroma-key background to produce `assets/sprites/world/beacon-tower-large-door.png`.
- Added the new sprite to the world sprite catalog.
- Updated Beacon Hill to use the new large-door beacon sprite.
- Raised its in-scene render height after browser review so the beacon still reads as a tower.
- Made the door/body opaque after review so the scene background no longer shows through the entrance.
- Added `preview=1` playtest mode so a scene can open directly without title screen or repair puzzle triggers.
- Added foreground brush/reeds around the beacon's left base to hide the hard placement edge.
- Removed the Beacon Hill painted cable/flag decorations from the scene.
- Removed the arrow signpost globally because scene advancement is handled by the continue keys.
- Kept the old cleaned beacon sprite available as `beaconTower`.
- Bumped browser module and asset version tags.

## Prompt

Create a painterly fantasy beacon/lighthouse game sprite on a flat chroma-key background, matching the rainy village style, with a large teal arched door designed to read as a usable kid-scale entrance.
