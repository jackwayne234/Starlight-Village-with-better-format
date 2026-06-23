# Chunk 74: Chapter Three Route Sprite Wiring

Status: in progress

## Goal

Continue the full-route sprite integration pass into Chapter 3, preserving the route-sprite format: one strong landmark sprite, no random side cottages, no loose repair props, and no generic marker unless intentionally needed.

## Completed

- Reviewed `chapter-three/mossline-switchyard` against its existing hand-built switchyard art.
- Chose to wire `assets/sprites/world/mossline-switchyard-painted.png` because the generated asset is a strong single junction landmark with transparent edges, while the older pole-and-box renderer remains available as a fallback if the painted sprite does not load.
- Wired Mossline Switchyard through the shared `paintedLandmark` renderer path with `paintedLandmark.sprite: "mosslineSwitchyard"`.
- Hid the generic signpost and repair marker for Mossline Switchyard.
- Kept the existing rainy forest layers, Mossline foliage, puddles, lamps, route text, and junction-line path puzzle.
- Reviewed `chapter-three/cargo-cart-turntable` against its existing hand-built turntable/cart art.
- Chose to wire `assets/sprites/world/cargo-cart-turntable-painted.png` because the generated asset is a stronger single turntable-and-cart landmark, while the older canvas turntable/cart renderer remains available as fallback if the painted sprite does not load.
- Cleaned the painted Cargo Cart Turntable PNG so the generated green background is transparent.
- Wired Cargo Cart Turntable through the shared `paintedLandmark` renderer path with `paintedLandmark.sprite: "cargoCartTurntable"`.
- Removed the loose gear/coil repair props and the foreground conduit-coil clutter from Cargo Cart Turntable.
- Hid the generic repair marker for Cargo Cart Turntable.
- Kept the existing rainy forest layers, Mossline lamps, puddles, route text, and rail-signal path puzzle.
- Reviewed `chapter-three/signal-arm-row` against its existing hand-built semaphore/rail art.
- Chose to wire `assets/sprites/world/signal-arm-row-painted.png` because the generated asset is a stronger single row-of-signals landmark, while the older canvas semaphore renderer remains available as fallback if the painted sprite does not load.
- Cleaned the painted Signal Arm Row PNG so the generated green background is transparent.
- Wired Signal Arm Row through the shared `paintedLandmark` renderer path with `paintedLandmark.sprite: "signalArmRow"`.
- Removed the loose gear/coil/seed repair props and the foreground conduit-coil clutter from Signal Arm Row.
- Hid the generic repair marker for Signal Arm Row.
- Kept the existing rainy forest layers, Mossline lamps, puddles, route text, semaphore state, and beacon-signal path puzzle.
- Reviewed `chapter-three/conductor-booth` against its existing hand-built booth/route-board art.
- Chose to keep the existing hand-built Conductor Booth renderer for now because it matches the game's side-view staging better than the generated `conductor-booth-painted.png`, which reads as a three-quarter angled/isometric object.
- Removed the loose coil/gear repair props and foreground conduit-coil clutter from Conductor Booth.
- Hid the generic repair marker for Conductor Booth.
- Kept the existing rainy forest layers, Mossline lamps, puddles, route text, lit-board state, and junction-line path puzzle.
- Reviewed `chapter-three/crane-hook-yard` against its existing hand-built crane/hook art.
- Chose to keep the existing hand-built Crane Hook Yard renderer for now because it matches the game's side-view staging and lifted-beam repair state better than the generated `crane-hook-yard-painted.png`, which reads as a three-quarter/isometric rail object despite having transparent edges.
- Removed the loose gear/coil repair props and foreground conduit-coil clutter from Crane Hook Yard.
- Hid the generic repair marker for Crane Hook Yard.
- Kept the existing rainy forest layers, Mossline lamps, puddles, route text, animated hook, lifted-beam state, and rail-signal path puzzle.
- Reviewed `chapter-three/sparking-relay-shed` against the route-sprite format.
- Chose to keep the existing Sparking Relay Shed renderer because it already uses `assets/sprites/world/sparking-relay-shed-painted.png` as a side-view/front-facing painted shed landmark while preserving the custom relay board, wet cables, sparks, puddle danger, and repaired glow overlays.
- Removed the loose coil/gear repair props and foreground conduit-coil clutter from Sparking Relay Shed.
- Hid the generic repair marker for Sparking Relay Shed.
- Kept the existing rainy forest layers, Mossline lamps, puddles, route text, calmed-sparks repair state, and storm-gauge path puzzle.
- Reviewed `chapter-three/rain-slick-rails` against its existing bespoke side-view rail treatment.
- Chose to keep the existing Rain-Slick Rails renderer because it already uses `assets/sprites/world/rain-slick-rails-side-sprite.png`, a side-view rail-crossing sprite that matches the game camera, while preserving custom sand valves, sand pipes, wet-rail shine, sanded repair state, forest cut, and warning-lamp overlays.
- Confirmed the older `assets/sprites/world/rain-slick-rails-sprite.png` reads top-down/angled and should remain unused for this scene.
- Confirmed `assets/sprites/world/rain-slick-rails-painted.png` is not present in the workspace, so the backlog now points at the actual side-view sprite.
- Removed foreground conduit-coil clutter from Rain-Slick Rails.
- Hid the generic repair marker for Rain-Slick Rails.
- Kept the existing rainy forest layers, Mossline lamps, puddles, route text, sand-valve repair state, and water-routing path puzzle.
- Reviewed `chapter-three/tunnel-mouth` against its existing bespoke side-view portal treatment.
- Chose to keep the existing Tunnel Mouth renderer because it already gives the scene a front-facing wet stone portal, warning-lamp sequence, rail threshold, forest walls, and repaired green-lamp state that match the side-view game camera.
- Confirmed `assets/sprites/world/tunnel-mouth-painted.png` has transparent edges but reads as an angled/three-quarter rail portal, so it should not be wired for this scene.
- Removed the remaining foreground conduit-coil clutter from Tunnel Mouth.
- Hid the generic repair marker for Tunnel Mouth.
- Kept the existing rainy forest layers, Mossline lamps, puddles, mist, route text, warning-lamp repair state, and archive-lens path puzzle.
- Reviewed `chapter-three/clock-signal` against its existing bespoke side-view station-clock treatment.
- Chose to keep the existing Clock Signal renderer because it already gives the scene a front-facing wet station clock, rail signal lamps, pulse wires, platform base, wooded rail edges, and repaired synced-green state that match the side-view game camera.
- Confirmed `assets/sprites/world/clock-signal-painted.png` has a strong front-facing clock but also still carries green-screen cleanup residue and a cropped neighboring rail fragment, so it should not be wired for this scene yet.
- Removed the remaining foreground conduit-coil clutter from Clock Signal.
- Kept the generic repair marker hidden for Clock Signal.
- Kept the existing rainy forest layers, Mossline lamps, puddles, mist, route text, clock/lamp pulse repair state, and rail-signal path puzzle.
- Reviewed `chapter-three/last-platform` against its existing bespoke side-view platform treatment.
- Chose to keep the existing Last Platform renderer because it already gives the scene a side-view final platform shelter, end-of-line track stop, hill-road marker, final lamp, and repaired green route glow that match the chapter-exit beat.
- Confirmed `assets/sprites/world/last-platform-painted.png` reads as a three-quarter/isometric platform, still shows bright generated green background, and includes the neighboring rail fragment called out during production, so it should not be wired for this scene yet.
- Removed the remaining foreground conduit-coil clutter from Last Platform.
- Kept the generic repair marker hidden for Last Platform.
- Kept the existing rainy forest layers, Mossline lamps, puddles, mist, route text, platform-lamp repair state, and market-lantern path puzzle.

## Verification

- Static scene-data check confirms `chapter-three/mossline-switchyard` has `paintedLandmark.sprite: "mosslineSwitchyard"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset probe confirmed `assets/sprites/world/mossline-switchyard-painted.png` is `386x422` with transparent edge pixels.
- Static scene-data check confirms `chapter-three/cargo-cart-turntable` has `paintedLandmark.sprite: "cargoCartTurntable"`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Asset probe confirmed `assets/sprites/world/cargo-cart-turntable-painted.png` is `408x302` with transparent edge pixels and opaque center pixels.
- Static scene-data check confirms `chapter-three/signal-arm-row` has `paintedLandmark.sprite: "signalArmRow"`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Asset probe confirmed `assets/sprites/world/signal-arm-row-painted.png` is `421x390` with transparent corner pixels and opaque landmark pixels.
- Static scene-data check confirms `chapter-three/conductor-booth` remains hand-built with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Static scene-data check confirms `chapter-three/crane-hook-yard` remains hand-built with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Asset probe confirmed `assets/sprites/world/crane-hook-yard-painted.png` is `417x389` with transparent corner pixels and an opaque center, but the asset was not wired because its three-quarter rail framing does not match the side-view camera rule.
- Static scene-data check confirms `chapter-three/sparking-relay-shed` remains on its custom painted-shed renderer with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Asset probe confirmed `assets/sprites/world/sparking-relay-shed-painted.png` is `1095x1137` RGBA with alpha, and the asset stayed wired through the existing `sparkingRelayShed` renderer path.
- Static scene-data check confirms `chapter-three/rain-slick-rails` remains on its custom side-view rail renderer with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Asset probe confirmed `assets/sprites/world/rain-slick-rails-side-sprite.png` is `1832x367` RGBA with alpha, and the asset stayed wired through the existing `rainSlickRails` renderer path.
- Asset review confirmed `assets/sprites/world/rain-slick-rails-sprite.png` is the older top-down/angled rail sprite and was not wired.
- Static scene-data check confirms `chapter-three/tunnel-mouth` remains on its custom side-view tunnel renderer with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Asset review confirmed `assets/sprites/world/tunnel-mouth-painted.png` is `392x382` RGBA with transparent corner pixels, but it was not wired because its angled rail framing does not match the side-view camera rule.
- Static scene-data check confirms `chapter-three/clock-signal` remains on its custom side-view station-clock renderer with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Asset review confirmed `assets/sprites/world/clock-signal-painted.png` is `361x420` RGBA with transparent corner pixels, but it was not wired because the existing renderer better preserves the side-view clock/lamp/wire/platform repair state and the generated asset still includes cleanup residue/cropped neighboring art.
- Static scene-data check confirms `chapter-three/last-platform` remains on its custom side-view platform renderer with no `paintedLandmark`, `0` cottages, `0` repair parts, `0` broken branches, no foreground conduit-coil clutter, and `showMarker: false`.
- Asset review confirmed `assets/sprites/world/last-platform-painted.png` is `424x407` RGBA with alpha, but it was not wired because its three-quarter/isometric framing, bright generated green background, and cropped neighboring rail fragment do not match the side-view camera rule.
- Local preview server responded at:
  - `http://127.0.0.1:5257/?scene=chapter-three/last-platform&x=1120&preview=1`
- Local probes confirmed the Last Platform scene module and `assets/sprites/world/last-platform-painted.png` respond from the preview server.
- Local preview server responded at:
  - `http://127.0.0.1:5256/?scene=chapter-three/clock-signal&x=1120&preview=1`
- Local probes confirmed the Clock Signal scene module and `assets/sprites/world/clock-signal-painted.png` respond from the preview server.
- Local preview server responded at:
  - `http://127.0.0.1:5255/?scene=chapter-three/tunnel-mouth&x=1120&preview=1`
- Local probes confirmed the Tunnel Mouth scene module and `assets/sprites/world/tunnel-mouth-painted.png` respond from the preview server.
- Local preview server responded at:
  - `http://127.0.0.1:5253/?scene=chapter-three/rain-slick-rails&x=1120&preview=1`
- Local probes confirmed the Rain-Slick Rails scene module and side-view rail sprite respond from the preview server.
- Full route walk still reaches all 100 scenes from `chapter-one/starlight-village` to `chapter-ten/celebration-square`.
- Local preview server responded at:
  - `http://127.0.0.1:5252/?scene=chapter-three/crane-hook-yard&x=1120&preview=1`
- Local probe confirmed `assets/sprites/world/crane-hook-yard-painted.png` responds from the preview server.
- Local preview server responded at:
  - `http://127.0.0.1:5251/?scene=chapter-three/conductor-booth&x=1120&preview=1`
- Local probes confirmed the Conductor Booth scene module and `assets/sprites/world/conductor-booth-painted.png` respond from the preview server.
- Local preview server responded at:
  - `http://127.0.0.1:5249/?scene=chapter-three/cargo-cart-turntable&x=1120&preview=1`
- Local preview server responded at:
  - `http://127.0.0.1:5250/?scene=chapter-three/signal-arm-row&x=1120&preview=1`
- Painted sprite asset responded at `http://127.0.0.1:5249/assets/sprites/world/cargo-cart-turntable-painted.png?v=painted-route-ch3`.
- Painted sprite asset responded at `http://127.0.0.1:5250/assets/sprites/world/signal-arm-row-painted.png?v=painted-route-ch3`.
- In-app browser preview rendered the painted Cargo Cart Turntable landmark with no console errors in the centered view.
- In-app browser preview rendered the painted Signal Arm Row landmark with no console errors in the centered view.
- Local preview server responded at:
  - `http://127.0.0.1:5248/?scene=chapter-three/mossline-switchyard&preview=1`
  - `http://127.0.0.1:5248/?scene=chapter-three/mossline-switchyard&x=1120&preview=1`
- Painted sprite asset responded at `http://127.0.0.1:5248/assets/sprites/world/mossline-switchyard-painted.png?v=painted-route-ch3`.
- In-app browser preview rendered the painted Mossline landmark with no console errors in default and centered views.

## Next

Continue route-order sprite wiring at `chapter-four/stormedge-rise`.
