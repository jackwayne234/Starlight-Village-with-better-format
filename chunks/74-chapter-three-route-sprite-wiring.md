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

Continue route-order sprite wiring at `chapter-three/tunnel-mouth`.
