# Chunk 28 - Old Observatory Asset Pack

## Goal

Replace the reused Beacon Hill/lighthouse look in Old Observatory with a dedicated observatory grounds asset set.

## Scope

- Add a generated observatory sprite pack.
- Cut the pack into transparent project sprites.
- Wire Old Observatory to use an observatory tower, archive lens machine, keeper hut, stone foundations, path edge, and rock/reed clusters.
- Keep the repair target on the archive lens machine.

## Criteria

- Old Observatory should no longer read as a lighthouse standing in water.
- The scene should use dedicated `scene.observatory` data instead of `scene.beaconHill`.
- The existing Chapter 2 route and archive lens puzzle still load.

## Completion Notes

- Added six new active world sprites plus the source asset sheet.
- Added observatory sprite loading and a dedicated renderer path.
- Moved the archive lens repair target to the lens machine.
- Verified the full route still resolves through Old Observatory.
