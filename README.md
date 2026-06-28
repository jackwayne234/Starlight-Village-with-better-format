# Starlight Village

This is the clean rebuild workspace for the cozy rainy repair game prototype.

The older Chapter 1 build is the reference version. This repo is for rebuilding the same feeling with clearer architecture: scene data, layered rendering, focused interaction states, and room for future chapters.

## Run

```bash
python3 -m http.server 5200 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:5200/
```

## Current Route Spine

- One rainy story route across 10 chapters and 101 scenes.
- The route starts at Starlight Village and ends at Celebration Square.
- The current spine uses a catalog builder for remaining first-draft scenes, with hand-built or sprite-backed landmark scenes carrying the active route from the opener through the finale.
- Apprentice and floating robot companion.
- Left/right walking with a scrolling camera.
- Each scene currently has one repair target.
- Most first-draft scenes use rotate-path puzzles until bespoke puzzle chunks replace them.
- Final completion happens after the 101st scene.
- Short character dialogue bubbles.
- Progress saved in browser storage.

## Controls

- Move: Left/Right arrows or A/D.
- Repair or continue: Space, Enter, or E.
- Reset saved progress: R.

## Architecture Shape

- `src/core`: game loop, input, camera, progress.
- `src/scenes`: scene defaults, registry, and chapter scene data.
- `src/interaction`: repair flow and puzzle state.
- `src/rendering`: backdrop, world, actors, weather, and render order.
- `src/entities`: player and robot updates.
- `src/ui`: HUD, prompts, and dialogue bubbles.

## Known Limits

- The 101-scene route is a playable spine, but it still needs a true human playthrough for puzzle fatigue, pacing, and late-route feel.
- Some catalog-built support paths are intentionally first drafts.
- Art is mixed: many active route scenes now use bespoke or clean sprite-backed landmarks, while some supporting composition remains shared.
- Progress uses local browser storage only.
