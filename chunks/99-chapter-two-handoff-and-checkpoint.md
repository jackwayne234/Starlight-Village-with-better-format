# Chunk 99: Chapter Two Handoff and Checkpoint

Status: complete

## Goal

Document the completed Chapter 2 work and checkpoint the result after implementation and QA.

## Ground Truth

- The user wants durable `.md` handoffs and chunk notes.
- After a large integrated change, checkpoint before starting fresh testing.
- This chunk should happen only after the implementation and QA chunks are complete.

## Scope

- Summarize what changed.
- List new sprites and where they live.
- List scene and puzzle updates.
- Record verification results.
- Note remaining issues or next steps.
- Make a checkpoint commit/push only if the user asks for that during implementation.

## Likely Files

- `HANDOFF.md`
- `ground-truth.md`
- `chunks/99-chapter-two-handoff-and-checkpoint.md`

## Verification

- Handoff accurately reflects the final state.
- User can resume from the docs without losing context.

## Done When

Chapter 2 has a clear final handoff and checkpoint plan.

## Completed

Chapter 2 is now documented as a completed wetland-biome overhaul through the
Chunk 98 QA pass. The active route is:

`chapter-two/wetland-approach` -> `chapter-two/glowfen-grove` ->
`chapter-two/lantern-lily-pool` -> `chapter-two/bog-bridge` ->
`chapter-two/frogsong-lock` -> `chapter-two/sunken-signpost` ->
`chapter-two/mist-pool` -> `chapter-two/moss-gate` ->
`chapter-two/old-fen-shrine` -> `chapter-two/glowfen-ferry` ->
`chapter-two/reedwatch-bank` -> `chapter-three/mossline-switchyard`

Wetland Approach remains the Chapter 1-to-Chapter 2 transition scene before the
first full wetland repair at Glowfen Grove.

## Asset Checkpoint

New Chapter 2 art lives under `assets/sprites/chapter-two/`:

- `backgrounds/wetland-background.png` provides the shared wetland backdrop.
- `paths/boardwalk-stepping-path.png` provides the shared boardwalk/stepping
  path treatment.
- `landmarks/` contains the isolated foreground repair landmarks and source
  images for Glowfen Grove through Reedwatch Bank.
- `puzzles/` contains reusable wetland puzzle UI sprites, including tile bases,
  conduit strokes, start/output nodes, selection frame, completion spark, and
  the review contact sheet.

The sprite registry exposes these through `sprites.chapterTwo.backgrounds`,
`sprites.chapterTwo.paths`, `sprites.chapterTwo.landmarks`, and
`sprites.chapterTwo.puzzles`.

## Scene Checkpoint

- Chapter 2 scenes use the shared wetland background/path direction with one
  foreground repair landmark per scene.
- The route preserves the same Chapter 1 gameplay loop: arrive, walk right,
  robot detects the repair, puzzle opens, solve, small celebration, then Space,
  Enter, or E advances.
- The Chapter 2 visual rules are now consistent across the active wetland route:
  no random cottages, no loose repair-prop clutter, and no generic repair
  marker/signpost where those would fight the foreground landmark direction.
- The narrow Chunk 98 fix is preserved: Glowfen Grove hides the generic right
  signpost and generic repair marker.

## Puzzle Checkpoint

- Wetland Approach stays on the gentler transition repair.
- The ten post-transition Chapter 2 repairs from Glowfen Grove through
  Reedwatch Bank use tuned `ch2-*` rotate-path layouts.
- The tuned layouts add longer paths, branches, more outputs, and a compact 4x3
  Reedwatch Bank finale while preserving the same rotate-path rules as Chapter
  1.
- No hazards, timers, fail states, punishment, or new puzzle type were added.

## Verification Notes

- Chunk 98 source/data QA confirmed 101 full-route scenes, the ordered Chapter 2
  slice from Wetland Approach through Reedwatch Bank, one repair per active
  Chapter 2 scene, and Reedwatch Bank routing into Mossline Switchyard.
- Browser preview screenshots passed on port `5310` for Wetland Approach, all
  ten active post-transition Chapter 2 scenes, and Mossline Switchyard with no
  captured warnings or errors.
- Reedwatch Bank normal repair flow opened the 4x3 `Reedwatch Marker Grid`
  overlay in-browser with no captured warnings or errors.
- Automated solvability checks passed for all ten tuned Chapter 2 layouts, and
  none start complete.

## Remaining Caveats

- Chapter 2 is ready for user playtesting as a complete wetland-biome pass, but
  it still needs human feel testing for pacing, puzzle difficulty, and whether
  the new shared biome reads clearly scene-to-scene.
- Audio/weather polish and broader full-game polish remain later work.
- Larger issues found during user playtesting should become a new chunk instead
  of being folded into this checkpoint.

## Next Likely User Step

Start a user playtest from Festival Square or Wetland Approach, continue through
Reedwatch Bank, and confirm whether Chapter 2 feels like a cohesive wetland
chapter that is a little harder than Chapter 1 without changing the core game
flow.
