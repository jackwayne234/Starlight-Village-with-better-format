# Chunk 65: Cross-Scene Tree Density

## Goal

Carry the richer rainy-woods feeling from the latest tree pass into the rest of the route without hand-editing every scene.

## Completed

- Added a shared `addTreeDensity()` scene utility.
- Applied it through `createScene()` so both handcrafted scenes and catalog-generated scenes receive denser pine backgrounds.
- Left `chapter-one/starlight-village` unchanged because its tree treatment was already approved.
- Kept the added trees deterministic per scene so reloads do not reshuffle the woods.
- Verified all 100 route scenes instantiate; non-opening scenes now have at least 8 trees, usually 10 to 11 depending on world width.

## Notes

- This is a background-layer pass only. It does not alter puzzles, repairs, routing, dialogue, player/robot setup, landmarks, or completion states.
- Future scene-specific art passes can still override or add bespoke tree placement in the individual scene files.
