# Chunk 100: Chapter Two User Playtest

Status: complete

## Goal

Run a user-facing Chapter 2 playtest pass from the Chapter 1 handoff into the
wetland route, through Reedwatch Bank, and confirm the transition into Mossline
Switchyard.

## Ground Truth

- Chapter 2 is the new wetland biome: side-scroller, gentle puzzle tension, and
  a little harder than Chapter 1.
- Gameplay stays the same as Chapter 1: player arrives, walks right, robot
  detects the repair, puzzle opens, player solves it, small celebration, then
  Space, Enter, or E advances.
- Wetland Approach remains the transition scene between Festival Square and
  Glowfen Grove.
- Preserve the tuned Chunk 97 Chapter 2 puzzle layouts.
- Preserve the narrow Chunk 98 Glowfen Grove fix: no generic signpost and no
  generic repair marker.

## Scope

- Start from Festival Square or Wetland Approach.
- Play through Wetland Approach, Glowfen Grove, Lantern Lily Pool, Bog Bridge,
  Frogsong Lock, Sunken Signpost, Mist Pool, Moss Gate, Old Fen Shrine,
  Glowfen Ferry, and Reedwatch Bank.
- Confirm Reedwatch Bank advances into Mossline Switchyard.
- Document human-feel notes around puzzle difficulty, pacing, route clarity,
  and scene-to-scene variety.
- Make only tiny fixes if the playtest exposes a narrow issue.

## Verification

- Festival Square handoff points clearly into Wetland Approach.
- Each Chapter 2 repair opens, solves, celebrates, and reaches the continue
  prompt with no browser warnings or errors.
- Reedwatch Bank advances into Mossline Switchyard.
- Source/data checks still confirm the ordered route slice, one repair per
  scene, and tuned Chapter 2 puzzle layouts.

## Done When

Chapter 2 has a documented user-playtest result and any tiny issues found in
the pass are either fixed or called out as follow-up work.

## Completed

- Browser playtest ran on local port `5311`.
- Festival Square's completed repair flow showed the Chapter 1 completion card
  and the prompt to continue to Wetland Approach.
- Wetland Approach loaded as `Chapter 2: Glowfen`, `Repair 1 of 11`, preserving
  its transition role before Glowfen Grove.
- All eleven Chapter 2 repairs opened their puzzle overlays, solved through the
  live canvas controls, reached the small celebration/continue prompt, and
  produced no captured browser warnings or errors:
  - Wetland Approach
  - Glowfen Grove
  - Lantern Lily Pool
  - Bog Bridge
  - Frogsong Lock
  - Sunken Signpost
  - Mist Pool
  - Moss Gate
  - Old Fen Shrine
  - Glowfen Ferry
  - Reedwatch Bank
- Reedwatch Bank advanced into `chapter-three/mossline-switchyard`; the next
  screen showed `Chapter 3: Mossline` and `Mossline Switchyard - Repair 1 of
  10`.
- No code, art, puzzle, or gameplay fixes were needed during this chunk.

## Human-Feel Notes

- Puzzle difficulty feels like a gentle step up from Chapter 1 because the
  Chapter 2 boards keep the same rotate-path controls but ask for more reading:
  several boards use branches or multiple outputs, and Reedwatch Bank's compact
  4x3 finale reads like a small final exam without introducing punishment.
- Pacing stays calm. The repeated loop remains easy to understand: arrive at a
  wetland scene, trigger the repair, solve, get a short celebration, and press
  Space, Enter, or E to continue.
- Route clarity is strongest at the boundaries. Festival Square explicitly
  points to Wetland Approach, Wetland Approach reads as the first Glowfen scene,
  and Reedwatch Bank cleanly hands off to Mossline Switchyard.
- Scene-to-scene variety is acceptable for this pass. The shared wetland
  background keeps Chapter 2 cohesive, while foreground landmarks, puzzle names,
  and repaired-state effects distinguish the route stops enough for a complete
  user playtest.
- No human-feel blocker was found. Future polish could still add more
  moment-to-moment contrast in dialogue/audio/weather, but that belongs in a
  later broader polish chunk.

## Verification Notes

- Browser pass: local port `5311`, no captured `warn` or `error` logs across
  Festival Square, the eleven Chapter 2 repairs, Reedwatch Bank's continue
  prompt, and the Mossline Switchyard landing screen.
- Source/data check passed: 101 full-route scenes; ordered slice from Festival
  Square through Wetland Approach, all Chapter 2 scenes, Reedwatch Bank, and
  Mossline Switchyard; one repair per scene.
- Source/data check confirmed `chapter-two/reedwatch-bank` routes to
  `chapter-three/mossline-switchyard`.
- Source/data check confirmed the ten tuned post-transition Chapter 2 layouts
  still use `ch2-*` layout ids, still start incomplete, and Reedwatch Bank
  remains the compact 3-row by 4-column finale.
