# Chunk 88: Chapter Two Landmark Sprite Production

Status: complete

## Goal

Create the Chapter 2 landmark sprites from the approved landmark sprite plan.

## Ground Truth

- Landmark sprites should match the wetland biome and support the shared background.
- Use practical wetland repair themes: pumps, gates, bridges, ferries, markers.
- Avoid top-down, angled, isometric, or overly magical sprites.

## Scope

- Create/import landmark sprites for all Chapter 2 scenes that need them.
- Save sprites in `assets/sprites/chapter-two/landmarks/`.
- Keep naming consistent and scene-readable.
- Do not wire scene code in this chunk unless explicitly approved later.

## Likely Files

- `assets/sprites/chapter-two/landmarks/`
- `assets/sprites/chapter-two/README.md`

## Verification

- Each expected landmark sprite exists.
- Visual check confirms side-view wetland fit.
- Existing generated sprites reused only if they pass the Chapter 2 art standard.

## Done When

The Chapter 2 landmark sprite set exists and is ready for renderer wiring.

## Completed

- Generated the full active Chapter 2 landmark set as isolated wetland repair objects.
- Saved transparent final PNG sprites in `assets/sprites/chapter-two/landmarks/`.
- Preserved matching `*-source.png` chroma-key originals beside the final sprites for future revision.
- Kept scene code untouched; renderer wiring remains in a later chunk.
- Updated `assets/sprites/chapter-two/README.md` with the produced landmark filenames, dimensions, and scene mapping.

## Produced Sprites

| Scene | Final sprite | Size |
|-------|--------------|------|
| `chapter-two/glowfen-grove` | `assets/sprites/chapter-two/landmarks/root-pump.png` | 1331x891 |
| `chapter-two/lantern-lily-pool` | `assets/sprites/chapter-two/landmarks/lantern-lily-crossing.png` | 1513x715 |
| `chapter-two/bog-bridge` | `assets/sprites/chapter-two/landmarks/bog-bridge.png` | 1684x615 |
| `chapter-two/frogsong-lock` | `assets/sprites/chapter-two/landmarks/frogsong-lock.png` | 1587x740 |
| `chapter-two/sunken-signpost` | `assets/sprites/chapter-two/landmarks/sunken-route-marker.png` | 886x957 |
| `chapter-two/mist-pool` | `assets/sprites/chapter-two/landmarks/mist-vent-stones.png` | 1633x546 |
| `chapter-two/moss-gate` | `assets/sprites/chapter-two/landmarks/moss-gate.png` | 1745x774 |
| `chapter-two/old-fen-shrine` | `assets/sprites/chapter-two/landmarks/rain-bowl-marker.png` | 785x746 |
| `chapter-two/glowfen-ferry` | `assets/sprites/chapter-two/landmarks/glowfen-ferry.png` | 1661x730 |
| `chapter-two/reedwatch-bank` | `assets/sprites/chapter-two/landmarks/reedwatch-markers.png` | 1441x785 |

## Verification Notes

- Confirmed all 10 expected final landmark sprites exist.
- Confirmed every final sprite has an alpha channel and transparent corners.
- Confirmed no obvious magenta chroma-key residue remained on visible sprite pixels.
- Reviewed a checkerboard contact sheet for side-view wetland fit.
- No scene wiring or gameplay changes were made in this chunk.
