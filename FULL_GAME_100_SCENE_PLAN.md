# Full Game 100 Scene Plan

This is the planning ledger for growing Starlight Village from the current route into a 100-scene cozy rainy repair game.

The goal is not to build 100 scenes at once. The goal is to make 100 scenes imaginable, organized, and easy to build one at a time without losing the handmade feel.

## Build Rule

Each scene should have:

- One clear place.
- One visible problem caused by rain, age, storm, or village neglect.
- One playable repair or puzzle.
- One visible reward after completion.
- One emotional flavor.

Most scenes should be small. A scene can be charming because one thing changes clearly.

## Grouping

Use 10 chapters with 10 scenes each.

| Chapter | Region | Function |
| --- | --- | --- |
| 1 | Starlight Village Core | Establish the village, water, lights, and helper rhythm. |
| 2 | Glowfen Wetlands | Organic water, roots, glowing reeds, and mist puzzles. |
| 3 | Mossline Switchyard | Rails, switches, conductors, relays, and transit puzzles. |
| 4 | Stormedge Rise | Wind, height, storm gauges, cliff paths, and beacon approach. |
| 5 | Beacon Hill | Signal tower, keeper spaces, mirror arrays, and storm shutters. |
| 6 | Rainbarrel Row | Gutters, barrels, cisterns, alleys, and neighborhood water routing. |
| 7 | Old Orchard | Trees, cider machines, beehives, irrigation, and moonlit growth. |
| 8 | Glassworks Quarter | Prisms, lenses, furnaces, color, mirrors, and skylight puzzles. |
| 9 | Under-Village | Pipes, old machines, buried murals, drain locks, and ancient power. |
| 10 | Festival Night | Public celebration, memory, music, final circuits, and closure. |

## Architecture Direction

Keep the current source shape:

- Scene content lives under `src/scenes/chapterName/sceneName.js`.
- Shared defaults stay in `src/scenes/baseScene.js`.
- Scene registration stays in `src/scenes/sceneRegistry.js`.
- Rendering support grows through reusable layer data first, then special renderers only when a landmark needs charm.
- Puzzle behavior should reuse the existing repair flow until a scene truly needs a new puzzle type.

When the route becomes larger, consider adding chapter-level registry files so `sceneRegistry.js` imports chapters instead of every single scene directly.

Suggested future shape:

```text
src/scenes/
  sceneRegistry.js
  chapterOne/
    index.js
    starlightVillage.js
  chapterTwo/
    index.js
    glowfenFerry.js
```

Each chapter index can export a small list of `{ id, factory }` entries. The root registry can merge those lists.

## Chunk Strategy

Use one chunk per meaningful build pass.

- Planning chunks can cover 10-scene chapter outlines.
- Implementation chunks should usually add one scene at a time.
- Art chunks should polish one location family at a time.
- Testing chunks should verify a route segment, usually 5 to 10 scenes.

Each scene chunk should record:

- Scene id and title.
- Previous scene and next scene.
- Puzzle type.
- New assets, if any.
- Browser preview URL.
- Known visual or gameplay follow-ups.

## Scene Catalog

The current playable route already covers several of these ideas. Existing scenes should be treated as the first draft of their matching slots, not discarded.

### Chapter 1: Starlight Village Core

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 1 | `chapter-one/starlight-village` | Water Wheel Yard | Restore the village water wheel so the first lights wake up. |
| 2 | `chapter-one/bakery-gutter` | Bakery Gutter | Rotate gutter channels so rain stops pouring through the bakery awning. |
| 3 | `chapter-one/bell-rope-corner` | Bell Rope Corner | Re-thread a snapped bell rope through pulleys to ring a safe-clear signal. |
| 4 | `chapter-one/workshop-lift` | Workshop Lift | Balance a small crank lift so repair parts can reach the roof shelf. |
| 5 | `chapter-one/schoolhouse-lanterns` | Schoolhouse Lanterns | Connect three damp lantern posts in the right order. |
| 6 | `chapter-one/market-awnings` | Market Awnings | Set cloth awnings to shed rain into barrels instead of stalls. |
| 7 | `chapter-one/old-footbridge` | Old Footbridge | Lock bridge planks into place across a swollen stream. |
| 8 | `chapter-one/rain-drain-corner` | Rain Drain Corner | Clear a clogged drain maze before the lane floods. |
| 9 | `chapter-one/mayor-porch` | Mayor's Porch | Repair a porch signal chime that tells neighbors the route is safe. |
| 10 | `chapter-one/festival-square` | Festival Square | Power the square's first star lantern and open the path outward. |

### Chapter 2: Glowfen Wetlands

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 11 | `chapter-two/glowfen-grove` | Glowfen Grove | Restore the root pump so glowing water moves again. |
| 12 | `chapter-two/lantern-lily-pool` | Lantern Lily Pool | Rotate lily pads to carry light across the water. |
| 13 | `chapter-two/bog-bridge` | Bog Bridge | Raise stepping stones in a safe sequence. |
| 14 | `chapter-two/frogsong-lock` | Frogsong Lock | Match short call patterns to open a reed gate. |
| 15 | `chapter-two/sunken-signpost` | Sunken Signpost | Rebuild a half-submerged direction marker without using arrows. |
| 16 | `chapter-two/mist-pool` | Mist Pool | Tune warm vents to thin the mist. |
| 17 | `chapter-two/moss-gate` | Moss Gate | Feed water through root lines to open a mossy gate. |
| 18 | `chapter-two/old-fen-shrine` | Old Fen Shrine | Align rain bowls so drops ring the shrine stones. |
| 19 | `chapter-two/glowfen-ferry` | Glowfen Ferry | Repair the ferry pulley and cross the dark water. |
| 20 | `chapter-two/reedwatch-bank` | Reedwatch Bank | Light reed markers to show the way back to town. |

### Chapter 3: Mossline Switchyard

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 21 | `chapter-three/mossline-switchyard` | Mossline Switchyard | Restore the main junction line through a rotate-path relay. |
| 22 | `chapter-three/cargo-cart-turntable` | Cargo Cart Turntable | Rotate track pieces so a stuck cart can roll aside. |
| 23 | `chapter-three/signal-arm-row` | Signal Arm Row | Set semaphore arms to the correct storm-safe pattern. |
| 24 | `chapter-three/conductor-booth` | Conductor Booth | Reconnect the booth board so route lamps respond. |
| 25 | `chapter-three/crane-hook-yard` | Crane Hook Yard | Guide a crane hook around obstacles to lift a fallen beam. |
| 26 | `chapter-three/sparking-relay-shed` | Sparking Relay Shed | Route power away from puddles before closing the circuit. |
| 27 | `chapter-three/rain-slick-rails` | Rain-Slick Rails | Place sand valves to make the rails usable. |
| 28 | `chapter-three/tunnel-mouth` | Tunnel Mouth | Clear the tunnel warning lamps in the correct order. |
| 29 | `chapter-three/clock-signal` | Clock Signal | Sync a wet station clock with the rail signal pulses. |
| 30 | `chapter-three/last-platform` | Last Platform | Restore the final platform light and open the hill road. |

### Chapter 4: Stormedge Rise

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 31 | `chapter-four/stormedge-rise` | Stormedge Rise | Repair the storm gauge so the village can read the weather. |
| 32 | `chapter-four/weather-vane-roof` | Weather Vane Roof | Turn vanes so wind moves through safe channels. |
| 33 | `chapter-four/cliff-rope-lift` | Cliff Rope Lift | Balance pulleys to raise a small lift basket. |
| 34 | `chapter-four/wind-chime-pass` | Wind Chime Pass | Arrange chimes to calm a gusty path. |
| 35 | `chapter-four/lightning-rod-field` | Lightning Rod Field | Ground rods in a safe pattern before the next strike. |
| 36 | `chapter-four/lookout-post` | Lookout Post | Repair a lookout scope and spot the beacon tower. |
| 37 | `chapter-four/cracked-stair` | Cracked Stair | Lock stone braces under a rain-damaged stairway. |
| 38 | `chapter-four/cloud-harvester` | Cloud Harvester | Tune a strange old machine that condenses rain into clean water. |
| 39 | `chapter-four/summit-path` | Summit Path | Light path markers through the high mist. |
| 40 | `chapter-four/beacon-approach` | Beacon Approach | Open the final gate before Beacon Hill. |

### Chapter 5: Beacon Hill

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 41 | `chapter-five/beacon-hill` | Beacon Hill Signal Tower | Restore the tower beacon and send light across the storm. |
| 42 | `chapter-five/keeper-cottage` | Keeper's Cottage | Route chimney draft and stove sparks to warm the cottage. |
| 43 | `chapter-five/lens-room` | Lens Room | Align lenses so the beacon beam focuses. |
| 44 | `chapter-five/fuel-shed` | Fuel Shed | Sort fuel valves so the tower burns steadily. |
| 45 | `chapter-five/mirror-array` | Mirror Array | Turn mirrors to bounce light toward the village. |
| 46 | `chapter-five/bell-platform` | Bell Platform | Repair a bell striker that signals the lowlands. |
| 47 | `chapter-five/old-flag-room` | Old Flag Room | Restore folded storm flags as memory objects, not hanging clutter. |
| 48 | `chapter-five/storm-shutters` | Storm Shutters | Lock tower shutters in a wind-safe sequence. |
| 49 | `chapter-five/relay-balcony` | Relay Balcony | Connect balcony relays for a wider beacon sweep. |
| 50 | `chapter-five/hill-descent` | Hill Descent | Light the downward path toward Rainbarrel Row. |

### Chapter 6: Rainbarrel Row

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 51 | `chapter-six/rainbarrel-row` | Rainbarrel Row | Route stormwater through barrels and gutters. |
| 52 | `chapter-six/rooftop-channels` | Rooftop Channels | Turn roof channels to keep water out of homes. |
| 53 | `chapter-six/flooded-cellar` | Flooded Cellar | Pump water from a cellar by ordering valves correctly. |
| 54 | `chapter-six/laundry-lines` | Laundry Lines | Raise and lower lines to create a dry crossing. |
| 55 | `chapter-six/pump-alley` | Pump Alley | Restart a shared hand pump with pipe-routing. |
| 56 | `chapter-six/overflow-garden` | Overflow Garden | Redirect extra water into garden beds. |
| 57 | `chapter-six/neighborhood-fountain` | Neighborhood Fountain | Restore a tiny fountain that marks the district center. |
| 58 | `chapter-six/cistern-house` | Cistern House | Balance cistern levels across three tanks. |
| 59 | `chapter-six/gutter-bell` | Gutter Bell | Make a water bell ring when overflow is safe. |
| 60 | `chapter-six/stormwater-gate` | Stormwater Gate | Open the big drain gate toward the outer village. |

### Chapter 7: Old Orchard

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 61 | `chapter-seven/old-orchard` | Old Orchard | Wake the orchard's irrigation line under old roots. |
| 62 | `chapter-seven/windfallen-fruit` | Windfallen Fruit | Sort fallen fruit from blocked channels. |
| 63 | `chapter-seven/branch-bridge` | Branch Bridge | Move branch braces into a safe walking path. |
| 64 | `chapter-seven/bee-box-row` | Bee Box Row | Warm lanterns near bee boxes without startling them. |
| 65 | `chapter-seven/cider-press` | Cider Press | Repair gears in a little cider press. |
| 66 | `chapter-seven/scarecrow-wires` | Scarecrow Wires | Untangle signal wires around a rain-soaked scarecrow. |
| 67 | `chapter-seven/root-cellar` | Root Cellar | Open cellar vents to keep stored food dry. |
| 68 | `chapter-seven/moon-apple-tree` | Moon Apple Tree | Reflect moonlight onto a rare glowing tree. |
| 69 | `chapter-seven/birdhouse-lane` | Birdhouse Lane | Rehang birdhouses so they guide the route. |
| 70 | `chapter-seven/hollow-tree-door` | Hollow Tree Door | Unlock a hidden door in an old hollow tree. |

### Chapter 8: Glassworks Quarter

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 71 | `chapter-eight/glassworks-quarter` | Glassworks Quarter | Bring color back to the rainy glass district. |
| 72 | `chapter-eight/prism-lamp-row` | Prism Lamp Row | Rotate prisms to split light into path markers. |
| 73 | `chapter-eight/cracked-skylights` | Cracked Skylights | Patch skylight panes before water reaches the furnace. |
| 74 | `chapter-eight/furnace-bellows` | Furnace Bellows | Time bellows valves to revive a warm furnace glow. |
| 75 | `chapter-eight/color-filter-hall` | Color Filter Hall | Slide color filters into the correct signal order. |
| 76 | `chapter-eight/mirror-maze` | Mirror Maze | Aim reflected light through a compact mirror puzzle. |
| 77 | `chapter-eight/stained-glass-path` | Stained Glass Path | Repair floor panes so the path lights underfoot. |
| 78 | `chapter-eight/cooling-pipes` | Cooling Pipes | Route cooling water around fragile glass molds. |
| 79 | `chapter-eight/lens-grinder` | Lens Grinder | Align gears that polish a beacon lens. |
| 80 | `chapter-eight/rainbow-tower` | Rainbow Tower | Restore the quarter's tall color signal. |

### Chapter 9: Under-Village

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 81 | `chapter-nine/under-village` | Under-Village Door | Open the hidden service door beneath town. |
| 82 | `chapter-nine/echo-door` | Echo Door | Match pipe tones to open a round stone door. |
| 83 | `chapter-nine/old-pipe-crossing` | Old Pipe Crossing | Rotate pipe bridges into a walkable crossing. |
| 84 | `chapter-nine/forgotten-machine` | Forgotten Machine | Wake an old village machine one circuit at a time. |
| 85 | `chapter-nine/drain-locks` | Drain Locks | Set water locks so pressure equalizes safely. |
| 86 | `chapter-nine/buried-murals` | Buried Murals | Wash mud from murals by routing gentle water streams. |
| 87 | `chapter-nine/gear-room` | Gear Room | Mesh large slow gears without jamming them. |
| 88 | `chapter-nine/underground-stream` | Underground Stream | Raise stepping stones in a current-lit cavern. |
| 89 | `chapter-nine/sealed-workshop` | Sealed Workshop | Restore a sealed repair workshop left by earlier keepers. |
| 90 | `chapter-nine/heart-engine` | Ancient Heart Engine | Repair the oldest machine that keeps rainwater moving. |

### Chapter 10: Festival Night

| # | Scene id | Title | Core idea |
| --- | --- | --- | --- |
| 91 | `chapter-ten/festival-return` | Festival Return | Come back to town as repaired lights begin to gather. |
| 92 | `chapter-ten/lantern-parade` | Lantern Parade | Arrange lantern carts into a safe parade route. |
| 93 | `chapter-ten/music-stage` | Music Stage | Repair stage lights and music-box timing. |
| 94 | `chapter-ten/food-stalls` | Food Stalls | Route warmth and water so stalls can reopen. |
| 95 | `chapter-ten/memory-wall` | Memory Wall | Light small memory tiles from places visited. |
| 96 | `chapter-ten/kite-rigging` | Kite Rigging | Tune festival kites to carry storm ribbons safely. |
| 97 | `chapter-ten/fireworks-safety` | Fireworks Safety | Check launch paths with a non-explosive signal puzzle. |
| 98 | `chapter-ten/star-map` | Star Map | Connect all region constellations into one village map. |
| 99 | `chapter-ten/town-clock` | Town Clock | Sync the clock with every restored district signal. |
| 100 | `chapter-ten/celebration-square` | Celebration Square | Final celebration scene where the village feels whole. |

## Review Passes

Before implementing beyond the current playable slice, review the catalog for:

- Repeated puzzle verbs.
- Scenes that sound too similar visually.
- Scenes that need a special renderer or asset pack.
- Scenes that should become optional side scenes.
- Any chapter that feels too long, too dark, or too mechanical.

This plan is allowed to change. Its job is to give future sessions a shared map.
