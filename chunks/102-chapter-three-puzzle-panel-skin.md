# Chunk 102: Chapter Three Puzzle Panel Skin

Status: complete

## Goal

Give Chapter 3's Mossline repair puzzles a rail/signal panel treatment without
changing the existing rotate-path mechanics, layouts, route flow, or scene art.

## Scope

- Keep all Chapter 3 puzzle mechanics and base layouts intact.
- Add Chapter 3-specific puzzle layout ids so Mossline repairs can use bespoke
  titles, instructions, objectives, and success messages.
- Draw Chapter 3 puzzle tiles with a procedural wet-rail signal style instead
  of the older generic circuit tiles.
- Preserve Chapter 2's wetland puzzle sprite skin.

## Completed

- Added `ch3-*` puzzle layout ids to all ten Mossline route repairs:
  Mossline Switchyard, Cargo Cart Turntable, Signal Arm Row, Conductor Booth,
  Crane Hook Yard, Sparking Relay Shed, Rain-Slick Rails, Tunnel Mouth, Clock
  Signal, and Last Platform.
- Added Mossline-specific puzzle titles and text in `src/interaction/repairPuzzle.js`.
- Added a Chapter 3 puzzle renderer branch in `src/ui/hud.js` with wet metal
  tile bases, sleeper marks, rail-current paths, signal nodes, selected-tile
  glow, and a small signal spark on completion.
- Updated browser cache tags through the main game/rendering/repair import path
  so local preview loads the new panel skin.

## Verification

- Syntax checks passed for the changed game, rendering, HUD, puzzle, repair
  flow, Mossline Switchyard, and Chapter 3 scene modules using the bundled Node
  runtime.
- Source check instantiated all ten Chapter 3 scenes through the scene registry
  and confirmed each repair now creates an incomplete 3x3 puzzle with its
  `ch3-*` layout id and Mossline-specific title.
- In-app browser preview passed at
  `http://127.0.0.1:5320/?scene=chapter-three/mossline-switchyard&x=1120`:
  the Mossline Junction Panel opened with the new rail/signal tile treatment and
  no captured browser warnings or errors.

## Notes

- This is a skin/readability pass only. It does not tune Chapter 3 difficulty,
  add new assets, or change the repair route.
