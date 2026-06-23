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

- One rainy story route across 10 chapters and 100 scenes.
- The route starts at Water Wheel Yard and ends at Celebration Square.
- The current spine uses a catalog builder for first-draft scenes, with hand-built landmark scenes preserved for the opener, Glowfen Grove, Mossline Switchyard, Stormedge Rise, Beacon Hill, and Rainbarrel Row.
- Apprentice and floating robot companion.
- Left/right walking with a scrolling camera.
- Each scene currently has one repair target.
- Most first-draft scenes use rotate-path puzzles until bespoke puzzle chunks replace them.
- Final completion happens after the 100th scene.
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

- The 100-scene route is a playable spine, not 100 bespoke finished scenes.
- Catalog-built scenes are intentionally first drafts.
- Art is mixed: some scenes use bespoke sprites and tuned canvas layouts, while many catalog scenes use shared placeholder composition.
- Progress uses local browser storage only.
