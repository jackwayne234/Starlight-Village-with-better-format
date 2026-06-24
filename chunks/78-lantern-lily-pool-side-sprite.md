# Chunk 78: Lantern Lily Pool Side Sprite

Status: complete

## Goal

Replace the quiet canvas fallback in `chapter-two/lantern-lily-pool` with a proper side-scroller sprite while avoiding the earlier top-down/isometric lily-pool read.

## Completed

- Generated a new Lantern Lily Pool sprite source with an explicit side-scroller/front-facing prompt.
- Saved the source at `assets/sprites/world/lantern-lily-pool-side-sprite-source.png`.
- Removed the chroma-key background and saved the alpha sprite at `assets/sprites/world/lantern-lily-pool-side-sprite.png`.
- Registered the sprite as `lanternLilyPoolSide` in `src/rendering/sprites.js`.
- Wired `chapter-two/lantern-lily-pool` to use the new sprite through the shared `paintedLandmark` path.
- Kept the existing canvas lily-pool renderer as fallback if the sprite does not load.
- Added a wetland blend pass for the sprite so the pond sits into the path layer instead of reading like a hard cutout pasted on top.

## Verification

- Alpha check confirmed `lantern-lily-pool-side-sprite.png` is an RGBA PNG.
- Visual inspection confirmed the sprite reads as a side-scroller landmark with upright lily lanterns, a horizontal water crossing, reeds, and side/front staging.
- In-app preview passed at `http://127.0.0.1:5267/?scene=chapter-two/lantern-lily-pool&x=1120&preview=1&v=side-sprite`.
- Browser console check showed no warnings or errors.

## Prompt

Generated with the built-in image generation tool using a side-scroller sprite prompt: wide horizontal wetland pool crossing, upright glowing lantern-lily flowers, flat chroma-key background, no characters, no UI, and explicit avoidance of top-down, bird's-eye, isometric, or three-quarter overhead views.

## Next

Continue playthrough QA from Lantern Lily Pool into Bog Bridge, watching for repair-trigger placement and whether the new sprite's walkable crossing aligns with player expectations.
