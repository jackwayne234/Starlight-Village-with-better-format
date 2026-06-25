# Chunk 121: Stormedge Shared Background and Ridge Path Renderer

Status: complete

## Goal

Wire the shared Stormedge background and Chapter 4 ridge path into all
`chapter-four/` scenes.

## Completed

- Registered `sprites.chapterFour.backgrounds.stormedgeBackground`.
- Registered `sprites.chapterFour.paths.ridgeStonePath`.
- Updated `drawBackdrop` so all Chapter 4 scenes use the shared Stormedge
  background.
- Updated `drawWorld` so all Chapter 4 scenes use the ridge path renderer
  instead of the generic village path or the Chapter 2 boardwalk path.

## Notes

- Non-Chapter-4 backdrop and ground rendering paths are unchanged.
- The ridge path reads as wet stones, grass tufts, rope posts, and safe ledges.

