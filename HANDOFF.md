# Starlight Village V2 Handoff

## Current Direction

- V2 is the active codebase.
- The older Stormlight Village build is the Chapter 1 reference only.
- Keep the cleaner V2 architecture while bringing forward the old feel, mechanics, story, and pacing in chunks.
- Focus playtesting on core function first. Visual polish comes later.

## Current Route

The full route now has 100 scenes:

`chapter-one/starlight-village` -> `chapter-one/bakery-gutter` -> ... -> `chapter-ten/celebration-square`

The route ledger lives in `src/scenes/fullGameCatalog.js`. First-draft catalog scenes are built by `src/scenes/plannedSceneFactory.js`. The current hand-built landmark slots in the route are:

- `chapter-one/starlight-village`
- `chapter-two/glowfen-grove`
- `chapter-three/mossline-switchyard`
- `chapter-four/stormedge-rise`
- `chapter-five/beacon-hill`
- `chapter-six/rainbarrel-row`

## Current Playtest State

- Reset and refresh intentionally start at Starlight Village during playtesting.
- Scene advancement after a completed repair uses Space, Enter, or E.
- The full route has one repair target per scene.
- Most scenes currently use rotate-path puzzles. Holding Space is no longer a repair mechanic.
- The first scene has only one puzzle: the water wheel.
- Glowfen Grove root pump now uses a dedicated root-channel rotate puzzle.
- Later scene puzzles remain rotate-path repairs and need real playtesting.
- A separate scene transition overlay exists between locations.
- Speech/reaction bubbles are staggered so they do not all appear at once.
- The title screen now describes the 100-repair route.
- The final completion currently happens after `chapter-ten/celebration-square`.
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
- Browser smoke on `2026-06-22` confirmed the title screen and first playable scene render without console errors; the title screen now reflects the two-chapter route and all valid start keys.
- Comment bubbles were softened on `2026-06-22`: shorter win dialogue/reactions, translucent bubble fills, earlier continue prompt, and face-avoidance placement around the player and robot.
- Beacon Hill got a corrected depth/scale pass on `2026-06-22`: the signal tower is drawn behind nearer scene elements, enlarged with the actor scale pass so the doorway reads closer to a usable kid-scale entrance, its repair hotspot/cables follow the corrected placement, and the corrected view was checked in-browser.
- Beacon tower sprite matte was cleaned on `2026-06-22`: white fills in the upper handrail gaps and the pale base perimeter were removed from `beacon-tower-trimmed.png`.
- Shed handle matte was cleaned on `2026-06-22`: the white oval inside the Beacon Hill shack door handle was removed from `shed-trimmed.png`.
- Actor scale pass on `2026-06-22`: the apprentice is rendered smaller across scenes so entrances read closer to kid scale; robot scale/follow distance and bubble avoidance zones were adjusted with it.
- Large-door beacon sprite added on `2026-06-22`: Beacon Hill now uses `beacon-tower-large-door.png`, a new generated beacon art asset with a much larger arched entrance; the old cleaned beacon sprite remains available.
- Playtest URLs can use `preview=1` to skip the title screen and disable repair triggers while visually inspecting a scene.
- Beacon Hill has foreground brush/reeds around the large-door beacon's left base to soften the sprite placement edge.
- Arrow signposts were removed globally on `2026-06-22`; Beacon Hill's extra painted cable/flag decorations were removed too.
- Full-game planning started on `2026-06-22`: `FULL_GAME_100_SCENE_PLAN.md` now proposes 100 scenes grouped into 10 chapters, plus a one-scene-at-a-time chunk strategy for future sessions.
- Full-game route spine landed on `2026-06-22`: all 100 scene ids instantiate and route from Water Wheel Yard to Celebration Square. Catalog scenes are playable first drafts; polish should proceed one scene at a time.
- Bakery Gutter became the first bespoke post-water-wheel scene on `2026-06-22`: it now has a custom bakery/awning/gutter landmark, visible drip-to-barrel repair state, route checks, and a chunk note in `chunks/40-bakery-gutter-scene.md`.
- Bell Rope Corner became bespoke on `2026-06-22`: it now has a rope, pulley, bell, broken/repaired visual state, route checks, and a chunk note in `chunks/41-bell-rope-corner-scene.md`.
- Workshop Lift became bespoke on `2026-06-22`: it now has a crank, platform, roof shelf, raised/repaired visual state, route checks, and a chunk note in `chunks/42-workshop-lift-scene.md`.
- Schoolhouse Lanterns became bespoke on `2026-06-22`: it now has a schoolhouse facade, three lantern posts, dark/lit chain state, route checks, and a chunk note in `chunks/43-schoolhouse-lanterns-scene.md`.
- Market Awnings became bespoke on `2026-06-22`: it now has market stalls, colored awnings, dark/draining runoff state, route checks, and a chunk note in `chunks/44-market-awnings-scene.md`.
- Old Footbridge became bespoke on `2026-06-22`: it now has a swollen stream, loose/repaired plank state, route checks, and a chunk note in `chunks/45-old-footbridge-scene.md`.
- Rain Drain Corner became bespoke on `2026-06-22`: it now has a clogged drain, pooling water, runoff channels, cleared/repaired state, route checks, and a chunk note in `chunks/46-rain-drain-corner-scene.md`.
- Mayor's Porch became bespoke on `2026-06-22`: it now has a porch chime/signal, silent/ringing repaired state, route checks, and a chunk note in `chunks/47-mayor-porch-scene.md`.
- Festival Square became bespoke on `2026-06-22`: it now has a central star lantern, festival stalls, dark/lit square state, a verified transition into Glowfen Grove, and a chunk note in `chunks/48-festival-square-scene.md`.
- Lantern Lily Pool became bespoke on `2026-06-22`: it now has a glowing lily-pad crossing, dark/lit pool state, route checks, and a chunk note in `chunks/49-lantern-lily-pool-scene.md`.
- Bog Bridge became bespoke on `2026-06-22`: it now has raised stepping stones, dark/glowing crossing state, route checks, and a chunk note in `chunks/50-bog-bridge-scene.md`.
- Frogsong Lock became bespoke on `2026-06-22`: it now has a reed gate, call stones, closed/open repaired state, route checks, and a chunk note in `chunks/51-frogsong-lock-scene.md`.
- Sunken Signpost became bespoke on `2026-06-22`: it now has a non-arrow carved wetland marker, reed lights, sunk/raised repaired state, route checks, and a chunk note in `chunks/52-sunken-signpost-scene.md`.
- Mist Pool became bespoke on `2026-06-22`: it now has warm vent stones, thick/thinned mist state, route checks, and a chunk note in `chunks/53-mist-pool-scene.md`.
- Moss Gate became bespoke on `2026-06-22`: it now has root-fed gate halves, closed/open repaired state, route checks, and a chunk note in `chunks/54-moss-gate-scene.md`.
- Old Fen Shrine became bespoke on `2026-06-22`: it now has rain bowls, ringing stones, dark/aligned repaired state, route checks, and a chunk note in `chunks/55-old-fen-shrine-scene.md`.
- Glowfen Ferry became bespoke on `2026-06-22`: it now has pulley posts, rope, ferry platform, slack/docked repaired state, route checks, and a chunk note in `chunks/56-glowfen-ferry-scene.md`.
- Reedwatch Bank became bespoke on `2026-06-22`: it now has reed watch markers, dark/lit guide path state, route checks, and a chunk note in `chunks/57-reedwatch-bank-scene.md`.
- Cargo Cart Turntable became bespoke on `2026-06-22`: it now has wet rails, a round turntable, stuck/moved cargo cart state, route checks, and a chunk note in `chunks/58-cargo-cart-turntable-scene.md`.
- Signal Arm Row became bespoke on `2026-06-22`: it now has semaphore posts, wet rails, scrambled/aligned signal state, route checks, and a chunk note in `chunks/59-signal-arm-row-scene.md`.
- Conductor Booth became bespoke on `2026-06-22`: it now has a rail control shelter, dead/lit route board state, route checks, and a chunk note in `chunks/60-conductor-booth-scene.md`.
- Crane Hook Yard became bespoke on `2026-06-22`: it now has a crane frame, hanging hook, fallen/lifted beam state, route checks, and a chunk note in `chunks/61-crane-hook-yard-scene.md`.
- Local preview verification used `http://127.0.0.1:5208/` most recently because earlier preview ports were occupied or unavailable.

## Suggested Next Step

Continue the one-scene-at-a-time plan without stopping for approval between scenes.

Chunk 62 should continue Mossline Switchyard polish.

Polish `chapter-three/sparking-relay-shed`:

1. Add a bespoke relay shed with sparking relays, puddles, and a wet power board.
2. Make completion visibly calm the sparks and route power away from water.
3. Preview it with `?scene=chapter-three/sparking-relay-shed&preview=1`.
4. Leave `chapter-three/rain-slick-rails` as the next route stop.
