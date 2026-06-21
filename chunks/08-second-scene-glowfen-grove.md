# Chunk 8: Second Scene - Glowfen Grove

## Goal

Add a small second playable location that proves the V2 scene architecture can grow beyond the first lane.

## Scope

- Add Glowfen Grove scene data.
- Register the scene in the scene registry.
- Transition from Starlight Village after the water wheel repair is complete.
- Add one grove repair target.
- Keep visuals canvas-drawn and architecture boundaries clean.

## Success Criteria

- The player can complete the first lane and continue into Glowfen Grove.
- Glowfen Grove has a distinct mood and readable repair target.
- Progress can restore into the current scene.
- Scene transition logic stays out of rendering.

## Notes

This should be a small second scene, not a full Chapter 1 expansion yet.

## Completion Notes

- Added Glowfen Grove as a second Chapter 1 scene.
- Registered Glowfen Grove in the scene registry.
- Added transition from Starlight Village to Glowfen Grove after the water wheel repair.
- Added a root pump hold-charge repair with scene-specific dialogue.
- Added a simple root pump world visual.
- Updated progress startup so saved progress can restore into the saved scene.
- Verified the automated path from Starlight Village through Glowfen Grove repair completion.
