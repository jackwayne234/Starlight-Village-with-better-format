# Chunk 64: Rain-Slick Rails Scene

Status: complete

## Goal

Turn `chapter-three/rain-slick-rails` from a catalog placeholder into a bespoke Mossline Switchyard scene with readable wet rail danger, sand valves, and a clearer repaired route.

## Completed

- Added a hand-built `chapter-three/rain-slick-rails` scene with rain-slick rails, valve fixtures, sand-routing repair copy, and Mossline yard layering.
- Registered the scene so it replaces the planned catalog version while preserving the full route ledger and warm chapter/repair HUD label.
- Added a bespoke renderer pass for wet track shine, sand valves, sand pipes, track ties, a repaired sand coating, and a clear rail path indicator.
- Added project sprites for the slick rail bed and puddle:
  - `assets/sprites/world/rain-slick-rails-side-sprite.png`
  - `assets/sprites/world/rain-slick-puddle-sprite.png`
- Added a painted sand-valve wheel sprite at `assets/sprites/world/rain-slick-sand-valve-sprite.png`.
- Wired the Rain-Slick Rails renderer to use those sprites, with canvas fallback and repaired-state sand overlays. The original top-down rail sprite remains in the asset folder but is no longer used by this scene.
- Added a rail-crossing context pass with wet crossing planks, low fence rails, small warning lamps, and Mossline utility silhouettes so the track sits better against the rainy landscape backdrop.
- Added a grounding pass for the side-view rail sprite: palette tint, wet shadow, lower placement, and foreground moss/mud cover to keep the sprite from reading as pasted on top.
- Shifted the scene toward a wooded rail cut with dense flanking pines and undergrowth on both sides of the rails, making the trees and rainy crossing the scene identity instead of relying on a prominent rail sprite.
- Added completion and saved-progress restore hooks so repaired rails stay visibly sanded after route completion or reload.
- Kept the route flowing to `chapter-three/tunnel-mouth`.

## Verification

- Syntax checks passed for the new scene, registry import chain, renderer, progress restore, and repair flow hooks.
- Route walk confirms `chapter-three/rain-slick-rails` routes to `chapter-three/tunnel-mouth`.
- Preview target:
  - `http://127.0.0.1:5218/?v=rain-slick-rails&scene=chapter-three/rain-slick-rails&x=1120&preview=1`

## Next Chunk

Chunk 65 should polish `chapter-three/tunnel-mouth`.

Suggested scope:

1. Add bespoke tunnel-mouth warning lamps and a wet stone portal.
2. Make completion visibly clear or sequence the lamps so the tunnel reads safe.
3. Keep `chapter-three/clock-signal` as the next route stop.
