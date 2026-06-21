# Chunk 9: Old Build Route Migration

## Goal

Bring the full old Chapter 1 scene route into V2 as clean scene data.

## Scope

- Add Mossline Switchyard, Stormedge Rise, Beacon Hill, and Rainbarrel Row.
- Keep Starlight Village and Glowfen Grove in the route.
- Register all scenes in `sceneRegistry.js`.
- Connect repairs with `nextSceneId`.
- Use simple V2 repair markers for now.

## Success Criteria

- The player can move from Scene 1 through all six old Chapter 1 locations.
- Each scene has a distinct title, layout, repair target, and dialogue.
- Route logic stays in scene data and the game loop, not rendering.

## Notes

This chunk is about structure and continuity, not final landmark art.

## Completion Notes

- Added Mossline Switchyard, Stormedge Rise, Beacon Hill, and Rainbarrel Row as V2 scene files.
- Registered all six Chapter 1 scenes in `sceneRegistry.js`.
- Connected the route from Starlight Village through Rainbarrel Row.
- Added generic visible repair markers for scenes whose landmark art has not been migrated yet.
- Verified the automated route visits all six scenes and completes Rainbarrel Row.
