# Architecture Notes

V2 starts small on purpose. The goal is not to build a generic engine; it is to make Starlight Village easier to grow without losing its handmade feel.

## Shape

- `src/core` owns the game loop, input, camera, and app state.
- `src/scenes` owns scene data and scene-specific content.
- `src/scenes/baseScene.js` owns shared scene defaults.
- `src/scenes/sceneRegistry.js` owns scene lookup and the starting scene.
- `src/scenes/fullGameCatalog.js` owns the current 100-scene route ledger.
- `src/scenes/plannedSceneFactory.js` builds first-draft catalog scenes until a scene earns a bespoke file.
- `src/rendering` owns visual layers and drawing order.
- `src/entities` owns actor updates.
- `src/interaction` owns repair flow state.
- `src/ui` owns canvas UI overlays.

## Scene Convention

Scenes should export a `create...Scene()` function that starts from `createBaseScene()` and then fills in location-specific layers, actors, repair targets, and messages. New scenes should be registered in `sceneRegistry.js` instead of being imported directly by `main.js`.

Scene transitions are requested by scene/repair data with `nextSceneId`; the game loop owns creating the next scene through the registry. Rendering should not change scenes.

For the 100-scene plan, keep this convention while the route is still small enough to reason about. When direct imports in `sceneRegistry.js` become hard to scan, split scenes into chapter-level `index.js` files that export `{ id, factory }` entries and let the root registry merge them.

Future scene chunks should usually add one playable scene at a time. Each chunk should record the scene id, title, previous scene, next scene, puzzle type, new assets, preview URL, and follow-up notes.

The full route now starts from a catalog spine. A catalog scene is allowed to be a first draft. When a scene gets bespoke art, layout, dialogue, or puzzle logic, replace its catalog factory entry with a hand-built scene factory while keeping the same scene id and route position.

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
