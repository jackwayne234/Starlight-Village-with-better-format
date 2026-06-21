# Chunk 3: Scene Structure

## Goal

Make the current scene format clean enough to support more locations without turning into a tangle.

## Scope

- Scene data shape.
- Shared scene conventions.
- Interactable definitions.
- Renderer expectations.
- Chapter and location naming.
- Boundaries between scene content, entity logic, interaction flow, and rendering.

## Success Criteria

- Adding a second scene does not require rewriting the game loop.
- Scene-specific content stays in `src/scenes`.
- Shared behavior stays in focused core, entity, interaction, rendering, or UI modules.
- Naming consistently says Starlight for V2.

## Notes

Do not build a generic engine. Build just enough structure for the next scene.

## Completion Notes

- Added `src/scenes/baseScene.js` for shared scene defaults.
- Added `src/scenes/sceneRegistry.js` for scene lookup and initial scene creation.
- Refactored Starlight Village to keep location-specific data in its chapter scene file.
- Updated `main.js` to load the initial scene through the registry.
- Added guardrails so systems can tolerate future scenes without a repair target.
- Updated architecture notes with the scene convention.
- Verified scene registry creation, render smoke, and the existing repair flow.
