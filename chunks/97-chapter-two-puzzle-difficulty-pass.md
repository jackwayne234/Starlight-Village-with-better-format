# Chunk 97: Chapter Two Puzzle Difficulty Pass

Status: complete

## Goal

Make Chapter 2 puzzles a little harder while keeping Chapter 1 gameplay rules.

## Ground Truth

- Use the same puzzle type as Chapter 1.
- Increase difficulty with more tiles/steps and fewer obvious solutions.
- Keep calm pacing, clear robot guidance, and no punishment.
- Do not add time pressure, hazards, or a new puzzle type.

## Scope

- Review all Chapter 2 puzzle themes/layouts.
- Adjust layouts to create a small difficulty step up.
- Keep every puzzle solvable.
- Keep dialogue and hints concise.

## Likely Files

- `src/scenes/chapterTwo/*.js`
- `src/interaction/repairPuzzle.js` only if needed

## Verification

- Automated or manual solvability check passes for every Chapter 2 puzzle.
- Normal repair flow still works.
- Player guidance remains clear.

## Done When

Chapter 2 puzzles are slightly harder than Chapter 1 without changing the core gameplay.

## Completed

- Added optional per-repair puzzle layout support so Chapter 2 can tune difficulty without changing shared Chapter 1 theme layouts.
- Added ten active Chapter 2 puzzle layouts:
  - `ch2-glowfen-grove`
  - `ch2-lantern-lily-pool`
  - `ch2-bog-bridge`
  - `ch2-frogsong-lock`
  - `ch2-sunken-signpost`
  - `ch2-mist-pool`
  - `ch2-moss-gate`
  - `ch2-old-fen-shrine`
  - `ch2-glowfen-ferry`
  - `ch2-reedwatch-bank`
- Assigned those layouts to the active Chapter 2 route repairs from Glowfen Grove through Reedwatch Bank.
- Kept Wetland Approach on the gentler existing transition repair layout.
- Added wetland-specific puzzle panel titles, instructions, objectives, and success messages for the new Chapter 2 layouts.
- Preserved the same rotate-path tile vocabulary: `start`, `output`, `blank`, `line`, `turn`, and `tee`.
- Preserved calm pacing: no hazards, no timers, no fail states, no punishment, and no new puzzle type.

## Difficulty Shape

- Glowfen Grove stays the easiest Chapter 2 follow-up with one longer 3x3 root path.
- Lantern Lily Pool and Bog Bridge add two-output crossing layouts.
- Frogsong Lock, Moss Gate, and Old Fen Shrine use three-output shared-branch layouts.
- Mist Pool uses a center-bending two-output layout with a single valid solution.
- Glowfen Ferry uses a two-output pulley-post branch.
- Reedwatch Bank is the Chapter 2 finale with a compact 4x3 board and three reedwatch outputs.

## Verification Notes

- Automated solvability check passed for all ten tuned Chapter 2 layouts.
- Confirmed no tuned layout starts already complete.
- Confirmed Chapter 1 shared fallback layouts still use their original layout IDs and titles when no `puzzleLayout` is provided.
- Confirmed the full route still contains 101 scenes and Chapter 2 still flows into `chapter-three/mossline-switchyard`.
- In-app browser check passed for the Reedwatch Bank normal repair flow: start scene, trigger robot scan, open the 4x3 puzzle overlay, and capture the panel with no warnings or errors.
