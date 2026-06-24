# Chunk 90: Chapter Two Puzzle Sprite Production

Status: complete

## Goal

Create the Chapter 2 puzzle sprites from the approved puzzle sprite plan.

## Ground Truth

- Puzzle visuals should match the wetland biome.
- Magic should be restrained and mostly used for repair effects and gameplay readability.
- Puzzles should remain the same type as Chapter 1, only a little harder.

## Scope

- Create/import puzzle sprites into `assets/sprites/chapter-two/puzzles/`.
- Keep sprites readable inside the existing puzzle UI.
- Do not alter puzzle mechanics in this chunk unless explicitly approved later.

## Likely Files

- `assets/sprites/chapter-two/puzzles/`
- `assets/sprites/chapter-two/README.md`

## Verification

- Puzzle sprites exist and match the Chapter 2 wetland art direction.
- Visual review confirms they are not too magical, noisy, or unclear.

## Done When

The Chapter 2 puzzle sprite set exists and is ready for UI/mechanic wiring.

## Completed

- Created the reusable Chapter 2 wetland puzzle sprite set in `assets/sprites/chapter-two/puzzles/`.
- Kept every production sprite as a transparent 256x256 PNG for later puzzle UI wiring.
- Used restrained wetland colors: damp green tile bases, muted boardwalk wood, reed/root channels, shallow-water conduit, warm repair nodes, and a clear gold/blue selection frame.
- Added `chapter-two-puzzle-sprites-contact-sheet.png` for quick visual review of the full set.
- Added `tools/generate-chapter-two-puzzle-sprites.py` so the set can be regenerated deterministically with the bundled Python/Pillow runtime.
- Did not change puzzle mechanics, scene code, renderer code, or registry wiring.

## Produced Sprites

| Sprite | File | Size | Notes |
|--------|------|------|-------|
| Wetland tile base | `assets/sprites/chapter-two/puzzles/wetland-tile-base.png` | 256x256 | Dark damp tile surface for unlit puzzle cells. |
| Wetland lit tile base | `assets/sprites/chapter-two/puzzles/wetland-tile-lit.png` | 256x256 | Connected tile surface with restrained green-blue lift. |
| Boardwalk conduit | `assets/sprites/chapter-two/puzzles/boardwalk-conduit.png` | 256x256 | Plank-like conduit stroke for bridge, ferry, marker, and lantern repairs. |
| Reed channel conduit | `assets/sprites/chapter-two/puzzles/reed-channel-conduit.png` | 256x256 | Root/reed stroke for pump, moss gate, frogsong, and mist repairs. |
| Shallow-water conduit | `assets/sprites/chapter-two/puzzles/shallow-water-conduit.png` | 256x256 | Blue-green water-channel stroke for lily, bog, mist, and rain-bowl puzzles. |
| Start node | `assets/sprites/chapter-two/puzzles/wetland-start-node.png` | 256x256 | Repair-light source node. |
| Output node | `assets/sprites/chapter-two/puzzles/wetland-output-node.png` | 256x256 | Lamp/marker/bowl/socket style output node. |
| Selection frame | `assets/sprites/chapter-two/puzzles/wetland-selection-frame.png` | 256x256 | High-contrast selected-tile frame. |
| Completion spark | `assets/sprites/chapter-two/puzzles/wetland-completion-spark.png` | 256x256 | Small success accent. |
| Contact sheet | `assets/sprites/chapter-two/puzzles/chapter-two-puzzle-sprites-contact-sheet.png` | 480x552 | Visual QA sheet, not intended as a gameplay sprite. |

## Verification Notes

- Confirmed every planned production sprite exists.
- Confirmed every production sprite is a 256x256 RGBA PNG.
- Confirmed every production sprite has transparent corners.
- Reviewed the contact sheet for readable silhouettes, restrained magic, clear node/cursor contrast, and wetland fit.
- No scene code, puzzle code, renderer code, or registry wiring changed in this chunk.
