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

## Current V2 Slice

- One rainy Chapter 1 lane.
- Six Chapter 1 locations: Starlight Village, Glowfen Grove, Mossline Switchyard, Stormedge Rise, Beacon Hill, and Rainbarrel Row.
- Apprentice and floating robot companion.
- Left/right walking with a scrolling camera.
- Water wheel repair: hold Space, Enter, or E to route power.
- Root pump repair in Glowfen Grove: hold Space, Enter, or E to wake the grove.
- One repair target in each later location, using the current V2 hold-repair flow.
- Short character dialogue bubbles.
- Progress saved in browser storage.

## Controls

- Move: Left/Right arrows or A/D.
- Repair: Space, Enter, or E.
- Reset saved progress: R.

## Architecture Shape

- `src/core`: game loop, input, camera, progress.
- `src/scenes`: scene defaults, registry, and chapter scene data.
- `src/interaction`: repair flow and puzzle state.
- `src/rendering`: backdrop, world, actors, weather, and render order.
- `src/entities`: player and robot updates.
- `src/ui`: HUD, prompts, and dialogue bubbles.

## Known Limits

- This is still a small V2 slice, not the full Chapter 1 remake.
- Art is canvas-drawn placeholder/polish art, not final bitmap assets.
- Progress uses local browser storage only.
