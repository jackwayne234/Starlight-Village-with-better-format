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
- Bell Rope Corner was upgraded to the Bakery Gutter quality format on `2026-06-23`: `assets/sprites/world/bell-rope-corner-painted.png` is now the main bell/rope/pulley landmark, random side cottages and loose ground gears/coils were removed, the generic repair marker is hidden, and the old canvas bell remains as a fallback; continue applying this format scene-by-scene.
- Full-route sprite production pass landed on `2026-06-23`: `chunks/70-full-route-sprite-backlog.md` lists all 100 route sprite needs, Chapters 1-10 now have generated `*-painted.png` landmark assets and source sheets in `assets/sprites/world/`, and `chunks/71-route-sprite-production-pass.md` records the asset pass. Most generated sprites still need renderer wiring in route order.
- Chapter 1 route sprite wiring continued on `2026-06-23`: Workshop Lift through Festival Square now use generated painted landmark sprites through a shared `paintedLandmark` renderer path, with random cottages, loose repair props, and generic repair markers removed. See `chunks/72-chapter-one-route-sprite-wiring.md`.
- Chapter 2 route sprite wiring started on `2026-06-23`: Glowfen Grove was reviewed and left on its existing hand-built/root-pump art for now, while Lantern Lily Pool and Bog Bridge now use generated painted sprites through the shared `paintedLandmark` path with loose repair props and generic markers removed. See `chunks/73-chapter-two-route-sprite-wiring.md`.
- Chapter 2 route sprite wiring continued on `2026-06-23`: Frogsong Lock now uses `frogsong-lock-painted.png` through the shared `paintedLandmark` path, with loose seed/coil props and the generic repair marker removed. Local preview and asset probes passed at `http://127.0.0.1:5241/?scene=chapter-two/frogsong-lock&preview=1`. See `chunks/73-chapter-two-route-sprite-wiring.md`.
- Chapter 2 route sprite wiring continued on `2026-06-23`: Sunken Signpost now uses `sunken-signpost-painted.png` through the shared `paintedLandmark` path, with loose branch/seed/gear props and the generic repair marker removed. Centered preview passed at `http://127.0.0.1:5242/?scene=chapter-two/sunken-signpost&x=1120&preview=1`. See `chunks/73-chapter-two-route-sprite-wiring.md`.
- Chapter 2 route sprite wiring continued on `2026-06-23`: Mist Pool now uses `mist-pool-painted.png` through the shared `paintedLandmark` path, with loose seed/coil props and the generic repair marker removed. Preview and asset probes passed at `http://127.0.0.1:5243/?scene=chapter-two/mist-pool&preview=1` and `http://127.0.0.1:5243/?scene=chapter-two/mist-pool&x=1160&preview=1`. See `chunks/73-chapter-two-route-sprite-wiring.md`.
- Chapter 2 route sprite wiring continued on `2026-06-23`: Moss Gate now uses `moss-gate-painted.png` through the shared `paintedLandmark` path, with loose seed/coil props and the generic repair marker removed. Preview and asset probes passed at `http://127.0.0.1:5244/?scene=chapter-two/moss-gate&preview=1` and `http://127.0.0.1:5244/?scene=chapter-two/moss-gate&x=1120&preview=1`. See `chunks/73-chapter-two-route-sprite-wiring.md`.
- Chapter 2 route sprite wiring continued on `2026-06-23`: Old Fen Shrine now uses `old-fen-shrine-painted.png` through the shared `paintedLandmark` path, with loose gear/coil props and the generic repair marker removed. Preview and asset probes passed at `http://127.0.0.1:5245/?scene=chapter-two/old-fen-shrine&preview=1` and `http://127.0.0.1:5245/?scene=chapter-two/old-fen-shrine&x=1120&preview=1`. See `chunks/73-chapter-two-route-sprite-wiring.md`.
- Chapter 2 route sprite wiring continued on `2026-06-23`: Glowfen Ferry now uses `glowfen-ferry-painted.png` through the shared `paintedLandmark` path, with loose coil/gear props and the generic repair marker removed. Preview and asset probes passed at `http://127.0.0.1:5246/?scene=chapter-two/glowfen-ferry&preview=1` and `http://127.0.0.1:5246/?scene=chapter-two/glowfen-ferry&x=1120&preview=1`. See `chunks/73-chapter-two-route-sprite-wiring.md`.
- Chapter 2 route sprite wiring finished on `2026-06-23`: Reedwatch Bank now uses `reedwatch-bank-painted.png` through the shared `paintedLandmark` path, with loose seed/coil/gear props and the generic repair marker removed. Preview and asset probes passed at `http://127.0.0.1:5247/?scene=chapter-two/reedwatch-bank&preview=1` and `http://127.0.0.1:5247/?scene=chapter-two/reedwatch-bank&x=1120&preview=1`. See `chunks/73-chapter-two-route-sprite-wiring.md`.
- Chapter 3 route sprite wiring started on `2026-06-23`: Mossline Switchyard now uses `mossline-switchyard-painted.png` through the shared `paintedLandmark` path after review, with the older hand-built switchyard renderer kept as fallback, the generic signpost hidden, and the generic repair marker removed. Local preview and asset probes passed at `http://127.0.0.1:5248/?scene=chapter-three/mossline-switchyard&preview=1`, `http://127.0.0.1:5248/?scene=chapter-three/mossline-switchyard&x=1120&preview=1`, and the painted asset URL. See `chunks/74-chapter-three-route-sprite-wiring.md`.
- Chapter 3 route sprite wiring continued on `2026-06-23`: Cargo Cart Turntable now uses `cargo-cart-turntable-painted.png` through the shared `paintedLandmark` path after review, with the older hand-built turntable/cart renderer kept as fallback, the generated green PNG background cleaned to transparency, loose gear/coil props and conduit-coil clutter removed, and the generic repair marker hidden. Local preview and asset probes passed at `http://127.0.0.1:5249/?scene=chapter-three/cargo-cart-turntable&x=1120&preview=1` and the painted asset URL. See `chunks/74-chapter-three-route-sprite-wiring.md`.
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
- Sparking Relay Shed became bespoke on `2026-06-22`: it now uses a painted PNG shed sprite derived from the existing workshop-shed art, with wet board, sparks, puddles, calmed/repaired power state, route checks, and a chunk note in `chunks/62-sparking-relay-shed-scene.md`.
- Robot direction polish on `2026-06-22`: the robot now has mirrored left-facing idle/scan sprites, follows the player's travel side, and uses a short lifted behind-the-player side-swap so it no longer cuts across in front of the player.
- Chapter repair label polish on `2026-06-22`: the top-left HUD now uses a warm V1-inspired two-line label driven by `fullGameCatalog.js`, showing chapter/region plus scene-local chapter progress like `Sparking Relay Shed - Repair 6 of 10`; see `chunks/63-chapter-repair-label.md`.
- Rain-Slick Rails became bespoke on `2026-06-22`: it now reads as a wooded rail cut with dense flanking pines, subdued painted rails, project sprites for the puddle and sand-valve wheels, plus low fence rails, warning lamps, Mossline utility silhouettes, wet rail shine, sand pipes, a visible sanded/repaired rail path, route checks, and a chunk note in `chunks/64-rain-slick-rails-scene.md`.
- Cross-scene tree density landed on `2026-06-22`: `src/scenes/treeDensity.js` adds deterministic extra background pines through `createScene()` so every non-opening route scene inherits the richer woods treatment without touching puzzle or route data; see `chunks/65-cross-scene-tree-density.md`.
- Bakery Gutter bakery sprite landed on `2026-06-22`: `assets/sprites/world/bakery-painted.png` is now the main bakery landmark, the extra cottages were removed from the Bakery Gutter scene, and the old canvas bakery remains as a renderer fallback; see `chunks/66-bakery-gutter-bakery-sprite.md`.
- Tunnel Mouth became bespoke on `2026-06-22`: it now has a wet stone tunnel portal, warning-lamp sequence, dense flanking woods, no placeholder prop clutter, safe green repaired state, route checks, and a chunk note in `chunks/67-tunnel-mouth-scene.md`.
- Clock Signal became bespoke on `2026-06-22`: it now has a wet station clock, pulse wires, rail signal lamps, dense flanking woods, synced green repaired state, route checks, and a chunk note in `chunks/68-clock-signal-scene.md`.
- Last Platform became bespoke on `2026-06-22`: it now has a final platform shelter, end-of-line track stop, hill-road lamp, dense flanking woods, lit/open repaired state, route checks, and a chunk note in `chunks/69-last-platform-scene.md`.
- Local preview verification used `http://127.0.0.1:5240/` most recently because earlier preview ports were occupied or unavailable.

## Suggested Next Step

Continue the route-order sprite wiring pass.

Next likely stop:

1. Continue route-order sprite wiring at `chapter-three/signal-arm-row`.
2. Review whether Signal Arm Row should keep its existing hand-built semaphore/rail art or swap to `signal-arm-row-painted.png`.
3. Keep the format rule: one strong landmark sprite, no random houses, no loose repair props, and no generic marker unless intentionally needed.
4. Preview each edited scene with `?scene=<scene-id>&preview=1`.
