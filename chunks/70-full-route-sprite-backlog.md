# Full Route Sprite Backlog

Purpose: convert every route scene to the Bakery Gutter format: one strong landmark sprite, no random houses, no loose repair props, no generic marker unless intentionally needed.

## Format Rule

- Each route scene should have one primary painted landmark sprite saved under `assets/sprites/world/`.
- Future generated sprites must use a side-view camera/framing that matches the game. Avoid bird's-eye views, top-down layouts, and angled/isometric views.
- Keep chroma-key or source images beside the final alpha PNG when useful, using `*-source.png`.
- Scene data should avoid generic cottages and loose gear/coil/seed props unless those are the actual landmark.
- The robot scan line and puzzle popup should carry the repair beat; generic repair markers should usually be hidden for sprite-led scenes.

## Backlog

| # | Scene | Landmark Sprite Need | Status | Asset Target |
|---:|-------|----------------------|--------|--------------|
| 1 | chapter-one/starlight-village | Water Wheel Yard: Restore the village water wheel so the first lights wake up. | exists/review | `assets/sprites/world/starlight-village-painted.png` |
| 2 | chapter-one/bakery-gutter | Bakery Gutter: Rotate gutter channels so rain stops pouring through the bakery awning. | exists/review | `assets/sprites/world/bakery-gutter-painted.png` |
| 3 | chapter-one/bell-rope-corner | Bell Rope Corner: Re-thread a snapped bell rope through pulleys to ring a safe-clear signal. | exists/review | `assets/sprites/world/bell-rope-corner-painted.png` |
| 4 | chapter-one/workshop-lift | Workshop Lift: Balance a small crank lift so repair parts can reach the roof shelf. | wired | `assets/sprites/world/workshop-lift-painted.png` |
| 5 | chapter-one/schoolhouse-lanterns | Schoolhouse Lanterns: Connect three damp lantern posts in the right order. | wired | `assets/sprites/world/schoolhouse-lanterns-painted.png` |
| 6 | chapter-one/market-awnings | Market Awnings: Set cloth awnings to shed rain into barrels instead of stalls. | wired | `assets/sprites/world/market-awnings-painted.png` |
| 7 | chapter-one/old-footbridge | Old Footbridge: Lock bridge planks into place across a swollen stream. | wired | `assets/sprites/world/old-footbridge-painted.png` |
| 8 | chapter-one/rain-drain-corner | Rain Drain Corner: Clear a clogged drain maze before the lane floods. | wired | `assets/sprites/world/rain-drain-corner-painted.png` |
| 9 | chapter-one/mayor-porch | Mayor's Porch: Repair a porch signal chime that tells neighbors the route is safe. | wired | `assets/sprites/world/mayor-porch-painted.png` |
| 10 | chapter-one/festival-square | Festival Square: Power the square's first star lantern and open the path outward. | wired | `assets/sprites/world/festival-square-painted.png` |
| 11 | chapter-two/glowfen-grove | Glowfen Grove: Restore the root pump so glowing water moves again. | reviewed/keep hand-built | `assets/sprites/world/glowfen-grove-painted.png` |
| 12 | chapter-two/lantern-lily-pool | Lantern Lily Pool: Rotate lily pads to carry light across the water. | wired | `assets/sprites/world/lantern-lily-pool-painted.png` |
| 13 | chapter-two/bog-bridge | Bog Bridge: Raise stepping stones in a safe sequence. | wired | `assets/sprites/world/bog-bridge-painted.png` |
| 14 | chapter-two/frogsong-lock | Frogsong Lock: Match short call patterns to open a reed gate. | wired | `assets/sprites/world/frogsong-lock-painted.png` |
| 15 | chapter-two/sunken-signpost | Sunken Signpost: Rebuild a half-submerged direction marker without using arrows. | wired | `assets/sprites/world/sunken-signpost-painted.png` |
| 16 | chapter-two/mist-pool | Mist Pool: Tune warm vents to thin the mist. | wired | `assets/sprites/world/mist-pool-painted.png` |
| 17 | chapter-two/moss-gate | Moss Gate: Feed water through root lines to open a mossy gate. | wired | `assets/sprites/world/moss-gate-painted.png` |
| 18 | chapter-two/old-fen-shrine | Old Fen Shrine: Align rain bowls so drops ring the shrine stones. | wired | `assets/sprites/world/old-fen-shrine-painted.png` |
| 19 | chapter-two/glowfen-ferry | Glowfen Ferry: Repair the ferry pulley and cross the dark water. | wired | `assets/sprites/world/glowfen-ferry-painted.png` |
| 20 | chapter-two/reedwatch-bank | Reedwatch Bank: Light reed markers to show the way back to town. | wired | `assets/sprites/world/reedwatch-bank-painted.png` |
| 21 | chapter-three/mossline-switchyard | Mossline Switchyard: Restore the main junction line through a rotate-path relay. | wired | `assets/sprites/world/mossline-switchyard-painted.png` |
| 22 | chapter-three/cargo-cart-turntable | Cargo Cart Turntable: Rotate track pieces so a stuck cart can roll aside. | wired | `assets/sprites/world/cargo-cart-turntable-painted.png` |
| 23 | chapter-three/signal-arm-row | Signal Arm Row: Set semaphore arms to the correct storm-safe pattern. | wired | `assets/sprites/world/signal-arm-row-painted.png` |
| 24 | chapter-three/conductor-booth | Conductor Booth: Reconnect the booth board so route lamps respond. | reviewed/keep hand-built | `assets/sprites/world/conductor-booth-painted.png` |
| 25 | chapter-three/crane-hook-yard | Crane Hook Yard: Guide a crane hook around obstacles to lift a fallen beam. | reviewed/keep hand-built | `assets/sprites/world/crane-hook-yard-painted.png` |
| 26 | chapter-three/sparking-relay-shed | Sparking Relay Shed: Route power away from puddles before closing the circuit. | reviewed/keep existing painted treatment | `assets/sprites/world/sparking-relay-shed-painted.png` |
| 27 | chapter-three/rain-slick-rails | Rain-Slick Rails: Place sand valves to make the rails usable. | reviewed/keep existing side-view treatment | `assets/sprites/world/rain-slick-rails-side-sprite.png` |
| 28 | chapter-three/tunnel-mouth | Tunnel Mouth: Clear the tunnel warning lamps in the correct order. | reviewed/keep existing side-view treatment | `assets/sprites/world/tunnel-mouth-painted.png` |
| 29 | chapter-three/clock-signal | Clock Signal: Sync a wet station clock with the rail signal pulses. | reviewed/keep existing side-view treatment | `assets/sprites/world/clock-signal-painted.png` |
| 30 | chapter-three/last-platform | Last Platform: Restore the final platform light and open the hill road. | reviewed/keep existing side-view treatment | `assets/sprites/world/last-platform-painted.png` |
| 31 | chapter-four/stormedge-rise | Stormedge Rise: Repair the storm gauge so the village can read the weather. | reviewed/keep existing side-view treatment | `assets/sprites/world/stormedge-rise-painted.png` |
| 32 | chapter-four/weather-vane-roof | Weather Vane Roof: Turn vanes so wind moves through safe channels. | reviewed/keep bespoke side-view treatment | `assets/sprites/world/weather-vane-roof-painted.png` |
| 33 | chapter-four/cliff-rope-lift | Cliff Rope Lift: Balance pulleys to raise a small lift basket. | reviewed/keep bespoke side-view treatment | `assets/sprites/world/cliff-rope-lift-painted.png` |
| 34 | chapter-four/wind-chime-pass | Wind Chime Pass: Arrange chimes to calm a gusty path. | generated | `assets/sprites/world/wind-chime-pass-painted.png` |
| 35 | chapter-four/lightning-rod-field | Lightning Rod Field: Ground rods in a safe pattern before the next strike. | generated | `assets/sprites/world/lightning-rod-field-painted.png` |
| 36 | chapter-four/lookout-post | Lookout Post: Repair a lookout scope and spot the beacon tower. | generated | `assets/sprites/world/lookout-post-painted.png` |
| 37 | chapter-four/cracked-stair | Cracked Stair: Lock stone braces under a rain-damaged stairway. | generated | `assets/sprites/world/cracked-stair-painted.png` |
| 38 | chapter-four/cloud-harvester | Cloud Harvester: Tune a strange old machine that condenses rain into clean water. | generated | `assets/sprites/world/cloud-harvester-painted.png` |
| 39 | chapter-four/summit-path | Summit Path: Light path markers through the high mist. | generated | `assets/sprites/world/summit-path-painted.png` |
| 40 | chapter-four/beacon-approach | Beacon Approach: Open the final gate before Beacon Hill. | generated | `assets/sprites/world/beacon-approach-painted.png` |
| 41 | chapter-five/beacon-hill | Beacon Hill Signal Tower: Restore the tower beacon and send light across the storm. | exists/review | `assets/sprites/world/beacon-hill-painted.png` |
| 42 | chapter-five/keeper-cottage | Keeper's Cottage: Route chimney draft and stove sparks to warm the cottage. | generated | `assets/sprites/world/keeper-cottage-painted.png` |
| 43 | chapter-five/lens-room | Lens Room: Align lenses so the beacon beam focuses. | generated | `assets/sprites/world/lens-room-painted.png` |
| 44 | chapter-five/fuel-shed | Fuel Shed: Sort fuel valves so the tower burns steadily. | generated | `assets/sprites/world/fuel-shed-painted.png` |
| 45 | chapter-five/mirror-array | Mirror Array: Turn mirrors to bounce light toward the village. | generated | `assets/sprites/world/mirror-array-painted.png` |
| 46 | chapter-five/bell-platform | Bell Platform: Repair a bell striker that signals the lowlands. | generated | `assets/sprites/world/bell-platform-painted.png` |
| 47 | chapter-five/old-flag-room | Old Flag Room: Restore folded storm flags as memory objects, not hanging clutter. | generated | `assets/sprites/world/old-flag-room-painted.png` |
| 48 | chapter-five/storm-shutters | Storm Shutters: Lock tower shutters in a wind-safe sequence. | generated | `assets/sprites/world/storm-shutters-painted.png` |
| 49 | chapter-five/relay-balcony | Relay Balcony: Connect balcony relays for a wider beacon sweep. | generated | `assets/sprites/world/relay-balcony-painted.png` |
| 50 | chapter-five/hill-descent | Hill Descent: Light the downward path toward Rainbarrel Row. | generated | `assets/sprites/world/hill-descent-painted.png` |
| 51 | chapter-six/rainbarrel-row | Rainbarrel Row: Route stormwater through barrels and gutters. | exists/review | `assets/sprites/world/rainbarrel-row-painted.png` |
| 52 | chapter-six/rooftop-channels | Rooftop Channels: Turn roof channels to keep water out of homes. | generated | `assets/sprites/world/rooftop-channels-painted.png` |
| 53 | chapter-six/flooded-cellar | Flooded Cellar: Pump water from a cellar by ordering valves correctly. | generated | `assets/sprites/world/flooded-cellar-painted.png` |
| 54 | chapter-six/laundry-lines | Laundry Lines: Raise and lower lines to create a dry crossing. | generated | `assets/sprites/world/laundry-lines-painted.png` |
| 55 | chapter-six/pump-alley | Pump Alley: Restart a shared hand pump with pipe-routing. | generated | `assets/sprites/world/pump-alley-painted.png` |
| 56 | chapter-six/overflow-garden | Overflow Garden: Redirect extra water into garden beds. | generated | `assets/sprites/world/overflow-garden-painted.png` |
| 57 | chapter-six/neighborhood-fountain | Neighborhood Fountain: Restore a tiny fountain that marks the district center. | generated | `assets/sprites/world/neighborhood-fountain-painted.png` |
| 58 | chapter-six/cistern-house | Cistern House: Balance cistern levels across three tanks. | generated | `assets/sprites/world/cistern-house-painted.png` |
| 59 | chapter-six/gutter-bell | Gutter Bell: Make a water bell ring when overflow is safe. | generated | `assets/sprites/world/gutter-bell-painted.png` |
| 60 | chapter-six/stormwater-gate | Stormwater Gate: Open the big drain gate toward the outer village. | generated | `assets/sprites/world/stormwater-gate-painted.png` |
| 61 | chapter-seven/old-orchard | Old Orchard: Wake the orchard's irrigation line under old roots. | generated | `assets/sprites/world/old-orchard-painted.png` |
| 62 | chapter-seven/windfallen-fruit | Windfallen Fruit: Sort fallen fruit from blocked channels. | generated | `assets/sprites/world/windfallen-fruit-painted.png` |
| 63 | chapter-seven/branch-bridge | Branch Bridge: Move branch braces into a safe walking path. | generated | `assets/sprites/world/branch-bridge-painted.png` |
| 64 | chapter-seven/bee-box-row | Bee Box Row: Warm lanterns near bee boxes without startling them. | generated | `assets/sprites/world/bee-box-row-painted.png` |
| 65 | chapter-seven/cider-press | Cider Press: Repair gears in a little cider press. | generated | `assets/sprites/world/cider-press-painted.png` |
| 66 | chapter-seven/scarecrow-wires | Scarecrow Wires: Untangle signal wires around a rain-soaked scarecrow. | generated | `assets/sprites/world/scarecrow-wires-painted.png` |
| 67 | chapter-seven/root-cellar | Root Cellar: Open cellar vents to keep stored food dry. | generated | `assets/sprites/world/root-cellar-painted.png` |
| 68 | chapter-seven/moon-apple-tree | Moon Apple Tree: Reflect moonlight onto a rare glowing tree. | generated | `assets/sprites/world/moon-apple-tree-painted.png` |
| 69 | chapter-seven/birdhouse-lane | Birdhouse Lane: Rehang birdhouses so they guide the route. | generated | `assets/sprites/world/birdhouse-lane-painted.png` |
| 70 | chapter-seven/hollow-tree-door | Hollow Tree Door: Unlock a hidden door in an old hollow tree. | generated | `assets/sprites/world/hollow-tree-door-painted.png` |
| 71 | chapter-eight/glassworks-quarter | Glassworks Quarter: Bring color back to the rainy glass district. | generated | `assets/sprites/world/glassworks-quarter-painted.png` |
| 72 | chapter-eight/prism-lamp-row | Prism Lamp Row: Rotate prisms to split light into path markers. | generated | `assets/sprites/world/prism-lamp-row-painted.png` |
| 73 | chapter-eight/cracked-skylights | Cracked Skylights: Patch skylight panes before water reaches the furnace. | generated | `assets/sprites/world/cracked-skylights-painted.png` |
| 74 | chapter-eight/furnace-bellows | Furnace Bellows: Time bellows valves to revive a warm furnace glow. | generated | `assets/sprites/world/furnace-bellows-painted.png` |
| 75 | chapter-eight/color-filter-hall | Color Filter Hall: Slide color filters into the correct signal order. | generated | `assets/sprites/world/color-filter-hall-painted.png` |
| 76 | chapter-eight/mirror-maze | Mirror Maze: Aim reflected light through a compact mirror puzzle. | generated | `assets/sprites/world/mirror-maze-painted.png` |
| 77 | chapter-eight/stained-glass-path | Stained Glass Path: Repair floor panes so the path lights underfoot. | generated | `assets/sprites/world/stained-glass-path-painted.png` |
| 78 | chapter-eight/cooling-pipes | Cooling Pipes: Route cooling water around fragile glass molds. | generated | `assets/sprites/world/cooling-pipes-painted.png` |
| 79 | chapter-eight/lens-grinder | Lens Grinder: Align gears that polish a beacon lens. | generated | `assets/sprites/world/lens-grinder-painted.png` |
| 80 | chapter-eight/rainbow-tower | Rainbow Tower: Restore the quarter's tall color signal. | generated | `assets/sprites/world/rainbow-tower-painted.png` |
| 81 | chapter-nine/under-village | Under-Village Door: Open the hidden service door beneath town. | generated | `assets/sprites/world/under-village-painted.png` |
| 82 | chapter-nine/echo-door | Echo Door: Match pipe tones to open a round stone door. | generated | `assets/sprites/world/echo-door-painted.png` |
| 83 | chapter-nine/old-pipe-crossing | Old Pipe Crossing: Rotate pipe bridges into a walkable crossing. | generated | `assets/sprites/world/old-pipe-crossing-painted.png` |
| 84 | chapter-nine/forgotten-machine | Forgotten Machine: Wake an old village machine one circuit at a time. | generated | `assets/sprites/world/forgotten-machine-painted.png` |
| 85 | chapter-nine/drain-locks | Drain Locks: Set water locks so pressure equalizes safely. | generated | `assets/sprites/world/drain-locks-painted.png` |
| 86 | chapter-nine/buried-murals | Buried Murals: Wash mud from murals by routing gentle water streams. | generated | `assets/sprites/world/buried-murals-painted.png` |
| 87 | chapter-nine/gear-room | Gear Room: Mesh large slow gears without jamming them. | generated | `assets/sprites/world/gear-room-painted.png` |
| 88 | chapter-nine/underground-stream | Underground Stream: Raise stepping stones in a current-lit cavern. | generated | `assets/sprites/world/underground-stream-painted.png` |
| 89 | chapter-nine/sealed-workshop | Sealed Workshop: Restore a sealed repair workshop left by earlier keepers. | generated | `assets/sprites/world/sealed-workshop-painted.png` |
| 90 | chapter-nine/heart-engine | Ancient Heart Engine: Repair the oldest machine that keeps rainwater moving. | generated | `assets/sprites/world/heart-engine-painted.png` |
| 91 | chapter-ten/festival-return | Festival Return: Come back to town as repaired lights begin to gather. | generated | `assets/sprites/world/festival-return-painted.png` |
| 92 | chapter-ten/lantern-parade | Lantern Parade: Arrange lantern carts into a safe parade route. | generated | `assets/sprites/world/lantern-parade-painted.png` |
| 93 | chapter-ten/music-stage | Music Stage: Repair stage lights and music-box timing. | generated | `assets/sprites/world/music-stage-painted.png` |
| 94 | chapter-ten/food-stalls | Food Stalls: Route warmth and water so stalls can reopen. | generated | `assets/sprites/world/food-stalls-painted.png` |
| 95 | chapter-ten/memory-wall | Memory Wall: Light small memory tiles from places visited. | generated | `assets/sprites/world/memory-wall-painted.png` |
| 96 | chapter-ten/kite-rigging | Kite Rigging: Tune festival kites to carry storm ribbons safely. | generated | `assets/sprites/world/kite-rigging-painted.png` |
| 97 | chapter-ten/fireworks-safety | Fireworks Safety: Check launch paths with a non-explosive signal puzzle. | generated | `assets/sprites/world/fireworks-safety-painted.png` |
| 98 | chapter-ten/star-map | Star Map: Connect all region constellations into one village map. | generated | `assets/sprites/world/star-map-painted.png` |
| 99 | chapter-ten/town-clock | Town Clock: Sync the clock with every restored district signal. | generated | `assets/sprites/world/town-clock-painted.png` |
| 100 | chapter-ten/celebration-square | Celebration Square: Final celebration scene where the village feels whole. | generated | `assets/sprites/world/celebration-square-painted.png` |
