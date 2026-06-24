# Chunk 79: Glowfen Grove Scene Rebuild

Status: complete

## Goal

Rebuild `chapter-two/glowfen-grove` so it feels like a true Chapter 2 wetland arrival instead of an older hand-built prop scene.

## Completed

- Generated a new side-scroller Glowfen Grove scene sprite with a clear root pump, bottom-edge pond/path, root channels, reeds, mossy stones, and a low root bridge.
- Saved the source at `assets/sprites/world/glowfen-grove-side-scene-source.png`.
- Removed the chroma-key background and saved the alpha sprite at `assets/sprites/world/glowfen-grove-side-scene.png`.
- Registered the sprite as `glowfenGroveSide` in `src/rendering/sprites.js`.
- Rebuilt `chapter-two/glowfen-grove` around the new sprite:
  - widened the scene to match the Chapter 2 route format,
  - moved the root-pump repair hotspot onto the new pump,
  - suppressed the older separate root-pump sprite to avoid double drawing,
  - removed most old loose foliage so the new scene reads as one coherent landmark.

## Verification

- Alpha check confirmed `glowfen-grove-side-scene.png` is an RGBA PNG.
- Visual preview confirmed the new scene reads side/front-facing rather than top-down or isometric.
- In-app preview passed at:
  - `http://127.0.0.1:5268/?scene=chapter-two/glowfen-grove&x=1220&preview=1&v=glowfen-new-scene-1`
  - `http://127.0.0.1:5268/?scene=chapter-two/glowfen-grove&preview=1&v=glowfen-new-scene-start`
- Browser console check showed no warnings or errors.

## Next

Continue playthrough from Glowfen Grove into Lantern Lily Pool and verify the repair trigger feels natural at the pump.
