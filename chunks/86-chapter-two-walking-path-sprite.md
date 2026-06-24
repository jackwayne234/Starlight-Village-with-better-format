# Chunk 86: Chapter Two Walking Path Sprite

Status: complete

## Goal

Create the shared Chapter 2 walking path sprite.

## Ground Truth

- The player walkway should feel like a stable wooden boardwalk mixed with stepping stones over shallow water.
- Chapter 2 foreground puzzle areas should commonly use wooden walkways, stepping stones, reeds, and shallow water.
- Gameplay stays the same as Chapter 1; the path should support the same walk-right repair loop.

## Scope

- Create or generate the walking path sprite.
- Include boardwalk pieces, stepping stones, reeds, and shallow water edges.
- Save the sprite in the Chapter 2 path folder.
- Keep it visually compatible with the shared wetland background.

## Likely Files

- `assets/sprites/chapter-two/paths/`
- `assets/sprites/chapter-two/README.md`

## Verification

- Sprite reads clearly as a side-view/side-scroller walkable path.
- It does not look like a top-down map tile.
- It has enough transparent/edge treatment to layer into scenes cleanly.

## Completed

- Generated the shared Chapter 2 walking path sprite using the built-in image generation tool.
- Generated on a flat magenta chroma-key background because the sprite contains green reeds and marsh plants.
- Removed the chroma-key background with the local image-generation helper.
- Saved the final project sprite at `assets/sprites/chapter-two/paths/boardwalk-stepping-path.png`.
- Confirmed the final sprite is a transparent RGBA PNG at `1836x857`.
- Alpha validation confirmed transparent corners, transparent background coverage, and partially transparent antialiasing at edges.
- Visual check confirmed:
  - side-view boardwalk and stepping-stone path
  - shallow water edges, reeds, cattails, and marsh plants
  - stable walkable read for the existing walk-right repair loop
  - not top-down, angled, or isometric
- Did not wire the path into the game; renderer wiring belongs to later chunks.

## Prompt Summary

Reusable Chapter 2 wetland foreground path sprite for a side-scroller game; damp wooden boardwalk planks, flat stepping stones, shallow water edge shapes, reeds, cattails, and marsh grasses, isolated on a flat magenta chroma-key background for removal. Avoid top-down/isometric view, unsafe broken planks, fantasy glow, characters, text, UI, logos, and magenta in the subject.

## Done When

The Chapter 2 walking path sprite exists and can be reused across Chapter 2 scenes.
