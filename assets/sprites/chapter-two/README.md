# Chapter Two Sprites

This folder holds the custom Chapter 2 wetland biome sprites.

## Ground Rules

- Keep all Chapter 2 sprites side-scroller friendly.
- Avoid top-down, angled, or isometric views.
- Keep the biome mostly natural: deep marsh pools, reeds, mist, shallow water, boardwalks, and stepping stones.
- Use restrained glow only where it helps repair feedback or puzzle readability.
- Prefer clear lowercase kebab-case names, such as `wetland-background.png` or `boardwalk-stepping-path.png`.

## Folders

- `backgrounds/` — shared Chapter 2 wetland background sprites.
- `paths/` — boardwalk, stepping-stone, shallow-water, and foreground walking path sprites.
- `landmarks/` — scene repair landmarks such as pumps, gates, bridges, ferries, and markers.
- `puzzles/` — Chapter 2 puzzle UI/repair sprites that match the wetland biome.

## Current Assets

### Backgrounds

- `backgrounds/wetland-background.png` — shared Chapter 2 rainy wetland background, 1774x887 PNG. It is a side-view marsh scene with deep water, reeds, mist, restrained glowing plants, and open lower foreground room for later path and gameplay layers.

### Paths

- `paths/boardwalk-stepping-path.png` — shared Chapter 2 foreground walking path, 1836x857 transparent PNG. It mixes stable wooden boardwalk planks, stepping stones, shallow water edges, reeds, cattails, and small marsh plants for side-view gameplay layering.

### Landmarks

Transparent landmark PNGs live in `landmarks/`, with matching `*-source.png` chroma-key originals preserved beside them for future edits.

| Scene | Landmark sprite | Size | Notes |
|-------|-----------------|------|-------|
| `chapter-two/glowfen-grove` | `landmarks/root-pump.png` | 1331x891 | Root-fed marsh pump with practical pipe/reed details and restrained repair light. |
| `chapter-two/lantern-lily-pool` | `landmarks/lantern-lily-crossing.png` | 1513x715 | Low lily-pad crossing marker with lantern lilies and boardwalk nubs. |
| `chapter-two/bog-bridge` | `landmarks/bog-bridge.png` | 1684x615 | Low plank-and-stone bog bridge object for the shared path layer. |
| `chapter-two/frogsong-lock` | `landmarks/frogsong-lock.png` | 1587x740 | Reed gate and call-stone lock with practical hinge/repair details. |
| `chapter-two/sunken-signpost` | `landmarks/sunken-route-marker.png` | 886x957 | Modest sunken wetland route marker with no arrow or readable text. |
| `chapter-two/mist-pool` | `landmarks/mist-vent-stones.png` | 1633x546 | Low vent-stone cluster with minimal contained mist cues. |
| `chapter-two/moss-gate` | `landmarks/moss-gate.png` | 1745x774 | Side-view moss/root crossing gate with two practical gate halves. |
| `chapter-two/old-fen-shrine` | `landmarks/rain-bowl-marker.png` | 785x746 | Practical rain-bowl guide marker, not a large shrine. |
| `chapter-two/glowfen-ferry` | `landmarks/glowfen-ferry.png` | 1661x730 | Small ferry platform with dock posts, rope pulley, and lamps. |
| `chapter-two/reedwatch-bank` | `landmarks/reedwatch-markers.png` | 1441x785 | Row of reed guide markers and small lamps for the route out. |

## Art Direction

### Chapter Mood

Chapter 2 is a new wetland biome for the same cozy rainy side-scroller. It should feel mysterious and a little more puzzle-tense than Chapter 1, but not scary, action-heavy, or punishing. The player should feel like they are leaving the village path and entering a damp marsh route that can be repaired.

### Shared Background Composition

The shared Chapter 2 background should be the strongest visual signal of the chapter. It should read as a horizontal side-scroller wetland, with:

- Deep marsh pools and shallow water bands.
- Dense reeds and marsh grasses.
- Low mist drifting close to the water.
- A rainy night atmosphere that still matches the existing cozy game.
- A few restrained glowing water plants only where they help the wetland identity.
- Enough open lower-foreground space for the player, robot, path sprite, repair landmark, puzzle trigger, celebration, and continue prompt.

The background should support foreground variation across scenes instead of changing completely per scene.

### Foreground Path Style

The Chapter 2 walking path should feel stable and playable, not dangerous. Use a mix of:

- Wooden boardwalk planks.
- Stepping stones.
- Shallow water edges.
- Reeds and small marsh plants around the path.

The path must read as side-view walkable ground, not a top-down map path. It should support the same gameplay loop as Chapter 1: arrive, walk right, robot scans, puzzle opens, solve, small celebration, then Space or E transitions.

### Landmark Style

Landmarks should support the big wetland background rather than overpower it. They should be practical wetland crossing or navigation repairs:

- Pumps.
- Gates.
- Bridges.
- Ferries.
- Route markers.

Landmarks should feel physical and useful. They can have small repair-light accents, but they should not become fantasy shrines, floating magic objects, or oversized decorative centerpieces. Existing Chapter 2 painted landmark sprites may be reused only if they fit this side-scroller wetland direction.

## Landmark Sprite Plan

The active Chapter 2 route uses the shared wetland background and shared walking path, so landmark sprites should be isolated foreground repair objects rather than full-scene backgrounds. Target files belong in `landmarks/`.

| Scene | Repair idea | Existing asset decision | Planned landmark sprite | Production notes |
|-------|-------------|-------------------------|--------------------------|------------------|
| `chapter-two/glowfen-grove` | Root pump | Revise/split. Existing `glowfen-grove-side-scene.png` is useful reference, but it is a full scene and should not become the shared landmark sprite. | `landmarks/root-pump.png` | Isolated wetland root pump with intake/output pipes or root channels. Practical pump, natural, restrained repair glow only. |
| `chapter-two/lantern-lily-pool` | Lily crossing | Revise/split. Existing side sprite is useful reference, but it includes scene/path context. | `landmarks/lantern-lily-crossing.png` | Small cluster of lily lanterns and low crossing markers that can sit over shallow water; not a full pool background. |
| `chapter-two/bog-bridge` | Bridge/stepping stones | Replace. Existing generated `bog-bridge-painted.png` reads too much like a standalone scene/old route asset. | `landmarks/bog-bridge.png` | Side-view low bog bridge repair object with raised stones or short plank rail, compatible with shared path. |
| `chapter-two/frogsong-lock` | Reed gate/call stones | Replace. Existing generated `frogsong-lock-painted.png` should not be reused unless rebuilt as an isolated side-view object. | `landmarks/frogsong-lock.png` | Reed gate with call stones at water edge; physical crossing lock, not magical shrine. |
| `chapter-two/sunken-signpost` | Route marker | Replace. Existing generated `sunken-signpost-painted.png` should not drive the new biome pass. | `landmarks/sunken-route-marker.png` | Non-arrow wetland route marker, partly raised from mud/water, readable but modest. |
| `chapter-two/mist-pool` | Warm vent stones | Replace. Existing generated `mist-pool-painted.png` is not the new isolated landmark target. | `landmarks/mist-vent-stones.png` | Low vent-stone cluster with subtle mist holes and shallow water edge; mostly natural. |
| `chapter-two/moss-gate` | Moss/root gate | Replace. Existing generated `moss-gate-painted.png` should be rebuilt for the shared background/path system. | `landmarks/moss-gate.png` | Side-view root-fed gate halves, broad enough to read but not oversized. |
| `chapter-two/old-fen-shrine` | Rain bowls/tone stones | Replace/reframe. Existing `old-fen-shrine-painted.png` risks pulling the chapter toward ruins/shrine fantasy. | `landmarks/rain-bowl-marker.png` | Keep it practical and small: rain bowls or tone stones used as a wetland guide, not a grand shrine. |
| `chapter-two/glowfen-ferry` | Ferry pulley | Replace. Existing generated `glowfen-ferry-painted.png` should be rebuilt as a foreground repair object. | `landmarks/glowfen-ferry.png` | Dock posts, pulley rope, and small ferry platform that fit over shared shallow-water/path layers. |
| `chapter-two/reedwatch-bank` | Reed markers | Replace. Existing generated `reedwatch-bank-painted.png` is not the new isolated marker target. | `landmarks/reedwatch-markers.png` | A row of practical reed guide markers and small lamps showing the route out of the wetland. |

### Legacy/Inactive Chapter 2 Scenes

These scene factories still exist in `src/scenes/chapterTwo/`, but they are not part of the current 100-scene full-game Chapter 2 route. Do not prioritize production unless they are reintroduced.

| Scene | Decision | Planned asset if reactivated |
|-------|----------|------------------------------|
| `chapter-two/lantern-market` | Defer. Old village-market concept conflicts with the new wetland-first Chapter 2 direction. | Reframe as a small wetland supply dock, not a house/stall market. |
| `chapter-two/glassrail-crossing` | Defer. Old rail-crossing concept belongs closer to Chapter 3/Mossline than the new wetland biome. | Reframe as a low boardwalk signal crossing if needed. |
| `chapter-two/old-observatory` | Defer. Old observatory/lens scene is not in the active Chapter 2 route. | Reuse only if later story needs a wetland lookout marker; avoid large tower dominance. |

### Puzzle Sprite Style

Puzzle sprites should match the wetland biome while preserving the existing Chapter 1 gameplay language. They should help make puzzles a little harder through layout complexity, not through visual confusion. Use restrained wetland motifs such as:

- Boardwalk connectors.
- Reed channels.
- Shallow-water paths.
- Small repair-light nodes.
- Natural stone or wood tile edges.

Puzzle sprites should stay readable inside the existing puzzle UI and should not add time pressure, hazards, or a new puzzle type.

## Puzzle Sprite and Difficulty Plan

Chapter 2 puzzle sprites are a reusable wetland UI set for the existing rotate-path repair puzzle, not a new gameplay system. Produced files in `puzzles/` are:

- `wetland-tile-base.png` — unlit damp stone or board tile surface.
- `wetland-tile-lit.png` — connected/lit tile surface with restrained green-blue lift.
- `boardwalk-conduit.png` — crisp plank-like conduit strokes.
- `reed-channel-conduit.png` — readable root/reed conduit strokes.
- `shallow-water-conduit.png` — readable blue-green water-channel conduit strokes.
- `wetland-start-node.png` — repair-light source node.
- `wetland-output-node.png` — lamp, marker, bowl, socket, or pulley output node.
- `wetland-selection-frame.png` — high-contrast selected-tile frame.
- `wetland-completion-spark.png` — small optional success accent.

Difficulty should increase gently from Chapter 1 by asking for longer paths, more branches, and more outputs while keeping calm pacing and clear readability. Use 3x3 boards by default, with a compact 4x3 board reserved only for the final Chapter 2 puzzle if it verifies cleanly in the overlay.

| Scene | Theme | Target difficulty | Notes |
|-------|-------|-------------------|-------|
| `chapter-two/glowfen-grove` | `root-pump` | Easy | Longer root path with one misleading turn. |
| `chapter-two/lantern-lily-pool` | `glow-bridge` | Easy-medium | Longer crossing or two outputs. |
| `chapter-two/bog-bridge` | `glow-bridge` | Medium | Tee branch plus one dead-end blank. |
| `chapter-two/frogsong-lock` | `root-pump` | Medium | Two call-stone outputs sharing one route. |
| `chapter-two/sunken-signpost` | `junction-line` | Medium | Two marker outputs, fewer locked guide pieces. |
| `chapter-two/mist-pool` | `storm-gauge` | Medium | Center-bending vent route around a blank pocket. |
| `chapter-two/moss-gate` | `root-pump` | Medium-hard | Two gate outputs from one shared trunk. |
| `chapter-two/old-fen-shrine` | `beacon-signal` | Medium-hard | Rain-bowl/tone-stone outputs with central branch. |
| `chapter-two/glowfen-ferry` | `rail-signal` | Medium-hard | Opposite pulley-post outputs with a readable detour. |
| `chapter-two/reedwatch-bank` | `market-lanterns` | Hardest in Chapter 2 | Three reed-marker outputs; consider compact 4x3 only after UI verification. |

### Puzzle Sprites

Transparent puzzle PNGs live in `puzzles/`. These are reusable UI sprites for later puzzle renderer/registry wiring.

| Sprite | File | Size | Notes |
|--------|------|------|-------|
| Wetland tile base | `puzzles/wetland-tile-base.png` | 256x256 | Dark damp tile surface for unlit puzzle cells. |
| Wetland lit tile base | `puzzles/wetland-tile-lit.png` | 256x256 | Connected tile surface with restrained green-blue lift. |
| Boardwalk conduit | `puzzles/boardwalk-conduit.png` | 256x256 | Plank-like conduit stroke for bridge, ferry, marker, and lantern repairs. |
| Reed channel conduit | `puzzles/reed-channel-conduit.png` | 256x256 | Root/reed stroke for pump, moss gate, frogsong, and mist repairs. |
| Shallow-water conduit | `puzzles/shallow-water-conduit.png` | 256x256 | Blue-green water-channel stroke for lily, bog, mist, and rain-bowl puzzles. |
| Start node | `puzzles/wetland-start-node.png` | 256x256 | Repair-light source node. |
| Output node | `puzzles/wetland-output-node.png` | 256x256 | Lamp/marker/bowl/socket style output node. |
| Selection frame | `puzzles/wetland-selection-frame.png` | 256x256 | High-contrast selected-tile frame. |
| Completion spark | `puzzles/wetland-completion-spark.png` | 256x256 | Small success accent. |
| Contact sheet | `puzzles/chapter-two-puzzle-sprites-contact-sheet.png` | 480x552 | Visual QA sheet, not a gameplay sprite. |

The set can be regenerated with `tools/generate-chapter-two-puzzle-sprites.py` using the bundled Python/Pillow runtime.

### Palette and Lighting

Use a natural rainy wetland palette:

- Deep blue-green water.
- Wet dark greens.
- Muted brown boardwalk wood.
- Grey-blue mist.
- Soft warm repair lights only where needed.

Avoid turning the whole chapter into a bright fantasy glow scene. Glow is for repair feedback, puzzle readability, and a few small wetland plants.

### Avoid

- Top-down, angled, or isometric views.
- Busy decoration that fights the player path or repair object.
- Scary swamp horror mood.
- Large village houses as the main visual language.
- Heavy magic, spirits, floating fantasy lights, or neon color.
- Foreground paths that look unsafe, broken, or hard to read.
- Landmark sprites that visually contradict the shared wetland background.

## Current Status

Folder scaffold, art direction, shared wetland background sprite, shared walking path sprite, landmark sprite plan, landmark sprite production, puzzle sprite/difficulty planning, puzzle sprite production, sprite registry wiring, shared background renderer support, walking path renderer support, the short Wetland Approach transition scene, Chapter 2 scene rewiring, and the Chapter 2 puzzle difficulty pass are complete. Route QA and visual polish starts in Chunk 98.
