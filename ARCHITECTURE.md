# Architecture Notes

V2 starts small on purpose. The goal is not to build a generic engine; it is to make Starlight Village easier to grow without losing its handmade feel.

## Shape

- `src/core` owns the game loop, input, camera, and app state.
- `src/scenes` owns scene data and scene-specific content.
- `src/scenes/baseScene.js` owns shared scene defaults.
- `src/scenes/sceneRegistry.js` owns scene lookup and the starting scene.
- `src/rendering` owns visual layers and drawing order.
- `src/entities` owns actor updates.
- `src/interaction` owns repair flow state.
- `src/ui` owns canvas UI overlays.

## Scene Convention

Scenes should export a `create...Scene()` function that starts from `createBaseScene()` and then fills in location-specific layers, actors, repair targets, and messages. New scenes should be registered in `sceneRegistry.js` instead of being imported directly by `main.js`.

## Render Order

1. Backdrop
2. World background
3. Ground and path
4. Interactables and repair props
5. Actors
6. Foreground weather
7. UI

## Design Rule

Scene data should stay expressive. Shared systems should do the repeatable work. One-off renderers are welcome when they carry charm.
