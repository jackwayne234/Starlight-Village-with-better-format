# Chunk 89: Chapter Two Puzzle Sprite and Difficulty Plan

Status: complete

## Goal

Plan Chapter 2 puzzle sprites and the small difficulty increase before implementation.

## Ground Truth

- Gameplay stays the same as Chapter 1.
- Puzzles should use the same puzzle language, but be a little harder.
- Difficulty should come from more complex layouts, more tiles/steps, and fewer obvious solutions.
- No time pressure, hazards, punishment, or brand-new puzzle type.

## Scope

- Decide what puzzle sprites are needed for Chapter 2.
- Decide how puzzle themes should visually match the wetland biome.
- Define difficulty targets for each Chapter 2 puzzle.
- Do not change puzzle code in this chunk.

## Likely Files

- `assets/sprites/chapter-two/puzzles/`
- `src/interaction/repairPuzzle.js` for reference only
- Chapter 2 scene files for reference only

## Verification

- Puzzle-difficulty plan preserves existing gameplay.
- Every planned harder puzzle remains calm, readable, and solvable.

## Done When

There is a clear list of puzzle sprite needs and difficulty changes for Chapter 2.

## Baseline Puzzle Language

Chapter 2 keeps the existing Chapter 1 rotate-path repair puzzle language:

- The player rotates path tiles until glow/current/water can travel from a locked start tile to every locked output tile.
- Tile vocabulary stays the same: `start`, `output`, `blank`, `line`, `turn`, and `tee`.
- Inputs, completion behavior, overlay structure, robot hints, repair celebration, and Space/E scene advance stay unchanged.
- Existing puzzle themes remain the baseline: `root-pump`, `glow-bridge`, `junction-line`, `storm-gauge`, `beacon-signal`, `rail-signal`, and `market-lanterns`.

The Chapter 2 step up should be felt through puzzle readability and layout complexity, not through new rules. The player should still understand the task immediately if they completed Chapter 1.

## Puzzle Sprite Needs

Puzzle sprites belong in `assets/sprites/chapter-two/puzzles/`. Chunk 90 should produce a small reusable wetland puzzle sprite set rather than one full custom panel per scene.

| Sprite | Planned file | Purpose | Notes |
|--------|--------------|---------|-------|
| Wetland tile base | `wetland-tile-base.png` | Default unlit tile surface for Chapter 2 puzzle boards. | Dark wet stone or damp board inset. Must keep high contrast against conduits. |
| Wetland lit tile base | `wetland-tile-lit.png` | Lit/connected tile surface. | Slight green-blue lift, not a bright magic glow. |
| Boardwalk conduit | `boardwalk-conduit.png` | Wood/plank path strokes for bridge, ferry, marker, and lantern repairs. | Should read like the existing path-puzzle line/turn/tee language. |
| Reed channel conduit | `reed-channel-conduit.png` | Natural root/reed channel strokes for root pump, moss gate, frogsong, and mist repairs. | Organic edges are okay, but the connection directions must stay crisp. |
| Shallow-water conduit | `shallow-water-conduit.png` | Water-routing/glow-routing stroke for lily pool, bog bridge, and vent puzzles. | Use restrained blue-green highlights. |
| Start node | `wetland-start-node.png` | Locked source node. | Small repair-light seed, pump intake, or lamp source; same semantic role as Chapter 1 start. |
| Output node | `wetland-output-node.png` | Locked target node. | Small lamp, bowl, marker, gate socket, or pulley post; same semantic role as Chapter 1 output. |
| Selection frame | `wetland-selection-frame.png` | Player cursor/selected tile frame. | Clear at a glance over both lit and unlit tiles. |
| Completion spark | `wetland-completion-spark.png` | Optional success accent. | Small repair feedback only; no heavy fantasy particles. |

Production should keep these as UI-readable puzzle assets. Do not bake scene backgrounds, landmarks, timers, hazards, or extra puzzle mechanics into the sprites.

## Difficulty Targets

Chapter 1 mostly uses compact 3x3 boards with one short path, obvious elbows, and one or two outputs. Chapter 2 should still fit the same overlay comfortably, but ask the player to read one extra relationship: branching, rerouting around blanks, or connecting multiple outputs with fewer obvious first moves.

| Scene | Current puzzle theme | Difficulty target | Layout guidance for later difficulty pass |
|-------|----------------------|-------------------|-------------------------------------------|
| `chapter-two/glowfen-grove` | `root-pump` | Easy bridge from Chapter 1 to Chapter 2. | Keep a 3x3 board, but require a longer root path with one misleading turn and one locked blank. |
| `chapter-two/lantern-lily-pool` | `glow-bridge` | Easy-medium. | Use two outputs or a longer crossing path so the player traces across the pool instead of solving a single elbow. |
| `chapter-two/bog-bridge` | `glow-bridge` | Medium. | Use stepping-stone style branching with a tee and one dead-end blank; no unsafe/hazard wording. |
| `chapter-two/frogsong-lock` | `root-pump` | Medium. | Use two call-stone outputs connected by a shared root line; require tee orientation to matter. |
| `chapter-two/sunken-signpost` | `junction-line` | Medium. | Use a marker-grid layout with two outputs and fewer locked guide pieces than Chapter 1. |
| `chapter-two/mist-pool` | `storm-gauge` | Medium. | Use a vent-routing layout where the solution bends through the center and avoids one blank pocket. |
| `chapter-two/moss-gate` | `root-pump` | Medium-hard for the chapter. | Use two gate-side outputs and a shared root trunk; require reading the full board before rotating. |
| `chapter-two/old-fen-shrine` | `beacon-signal` | Medium-hard but calm. | Reframe as rain bowls/tone stones; route signal to two or three bowls with a clear central branch. |
| `chapter-two/glowfen-ferry` | `rail-signal` | Medium-hard. | Use pulley-post outputs on opposite sides with one rail-like detour; keep it compact and readable. |
| `chapter-two/reedwatch-bank` | `market-lanterns` | Final Chapter 2 puzzle, hardest of the chapter. | Use three reed-marker outputs, a tee-heavy 3x3 or compact 4x3 layout if the overlay supports it without crowding. |

## Difficulty Rules

- Prefer one extra output, one extra required branch, or one less obvious starting move over bigger boards everywhere.
- Keep at least the first Chapter 2 puzzle solvable as a recognizable follow-up to Chapter 1.
- Use compact 3x3 layouts by default. Consider 4x3 only for the final Chapter 2 route puzzle if UI verification proves it still reads cleanly.
- Avoid hazards, fail states, countdowns, hidden information, punishment, or new input rules.
- Avoid making difficulty come from muddy visuals. Tile exits, selected state, connected state, start, and outputs must be easier to read than the decorative wetland detail.
- Robot/player hints should stay short and helpful. The robot should not become silent or withholding.

## Scene Theme Notes

- Root/pump scenes should use reed-channel or root-channel conduit sprites.
- Bridge/ferry/signpost scenes should lean on boardwalk conduit and marker-like output nodes.
- Lily, bog, mist, and rain-bowl scenes may use shallow-water conduit accents, but the path directions must remain crisp.
- Lantern/marker scenes can use warm repair lights as outputs, restrained enough to preserve the mostly natural wetland tone.

## Verification Notes

- Read `ground-truth.md` Q3, Q10, Q19, Q20, Q22, and Q23 to confirm the plan preserves the locked Chapter 2 constraints.
- Checked `src/interaction/repairPuzzle.js` for the existing rotate-path puzzle vocabulary and theme structure.
- Checked `src/scenes/fullGameCatalog.js` for the active Chapter 2 scene order and current puzzle theme IDs.
- Confirmed `assets/sprites/chapter-two/puzzles/` exists and currently only contains `.gitkeep`; sprite production remains for Chunk 90.
- No scene code, puzzle code, renderer code, or sprite files were changed for this chunk.
