# Chunk 66: Bakery Gutter Bakery Sprite

## Goal

Make Bakery Gutter read as one dedicated bakery location instead of a general village street with extra houses.

## Completed

- Generated a painted bakery building sprite with a large striped awning, warm bread display windows, wet roof, and gutter details.
- Removed the chroma-key background and saved the transparent game asset at `assets/sprites/world/bakery-painted.png`.
- Kept the keyed source image at `assets/sprites/world/bakery-painted-source.png`.
- Added the bakery sprite to the world sprite catalog.
- Updated Bakery Gutter to remove side cottages so the bakery is the only building in the scene.
- Updated the Bakery Gutter renderer to draw the painted bakery sprite first, while preserving the existing canvas-drawn bakery as a load fallback.
- Removed the loose gear/coil props from the shop base.
- Removed the extra canvas gutter/drip/barrel overlay from the painted bakery path.
- Turned off the generic repair marker for this scene so the robot explanation and puzzle popup carry the repair beat.
- Removed the foreground bottom-oval weather layer that was causing screen-space afterimages while walking.
- Preserved the scene's trees, lamps, puddles, route data, and path puzzle.

## Verification

- The bakery scene instantiates with `0` cottages and `10` trees.
- The bakery scene instantiates with `0` repair parts and `showMarker: false` for its repair.
- Syntax checks pass for the updated scene, sprite catalog, and world renderer.
- The transparent bakery PNG was visually inspected after chroma-key removal.

## Note

Live browser screenshot verification was blocked because the bundled Playwright package is present but the Chromium executable is not installed in this environment.
