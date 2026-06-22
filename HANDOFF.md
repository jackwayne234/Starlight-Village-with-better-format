# Starlight Village V2 Handoff

## Current Direction

- V2 is the active codebase.
- The older Stormlight Village build is the Chapter 1 reference only.
- Keep the cleaner V2 architecture while bringing forward the old feel, mechanics, story, and pacing in chunks.
- Focus playtesting on core function first. Visual polish comes later.

## Current Route

Starlight Village -> Glowfen Grove -> Mossline Switchyard -> Stormedge Rise -> Beacon Hill -> Rainbarrel Row -> Lantern Market -> Glassrail Crossing -> Old Observatory

## Current Playtest State

- Reset and refresh intentionally start at Starlight Village during playtesting.
- Scene advancement after a completed repair uses Space, Enter, or E.
- Chapter 1 has one repair target per scene.
- All Chapter 1 repairs are rotate-path puzzles. Holding Space is no longer a repair mechanic.
- The first scene has only one puzzle: the water wheel.
- Glowfen Grove root pump now uses a dedicated root-channel rotate puzzle.
- Later scene puzzles remain rotate-path repairs and need real playtesting.
- A separate scene transition overlay exists between locations.
- Speech/reaction bubbles are staggered so they do not all appear at once.
- Rainbarrel Row now continues into Chapter 2.
- Chapter 2 currently adds Lantern Market, Glassrail Crossing, and Old Observatory.
- Chapter 2 ending exists after Old Observatory.
- Glow/mushroom plants are temporarily hidden in the renderer because the current sprite has internal white cutout fills and feels too bright for the rainy night palette. Make a replacement sprite later before turning them back on.

## Known Caveats

- V2 still needs parity work against the older Chapter 1 reference build.
- Chapter 2 is a first playable expansion pass, not final full-game scope.
- Puzzle layouts are functional, but later route puzzles still need human playtesting.
- Landmarks are canvas approximations from the old build, not final sprite/art import.
- Audio has not been migrated yet.
- Weather/audio polish remains a later chunk.
- Comment bubbles are improved but may still need a deeper V1-style pass.
- Several location art passes have landed: Old Observatory has dedicated assets, Glowfen has foliage grounding, and Mossline has painted pole/line sprites. Continue in small scene-by-scene visual passes.

## Suggested Next Step

Continue playtesting the full route for core function only:

1. Start at Starlight Village.
2. Solve the water wheel.
3. Continue through Glowfen Grove, Mossline Switchyard, Stormedge Rise, Beacon Hill, Rainbarrel Row, Lantern Market, Glassrail Crossing, and Old Observatory.
4. Fix any confusing, boring, broken, or clunky core gameplay issue one at a time.

After core flow feels good, do a separate pass for art, layout, bubbles, weather, and audio.
