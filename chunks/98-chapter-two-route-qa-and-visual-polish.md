# Chunk 98: Chapter Two Route QA and Visual Polish

Status: complete

## Goal

Play through and visually QA the full Chapter 2 route after art and puzzle changes land.

## Ground Truth

- All Chapter 2 scenes should meet the new wetland standard.
- The gameplay loop should match Chapter 1.
- The wetland path should feel restored by the end and open the way to Chapter 3.

## Scope

- Preview every Chapter 2 scene.
- Check background, path, landmarks, player/robot readability, repair trigger positions, puzzle flow, celebration, and transition.
- Fix only small polish issues discovered in the QA pass.
- Defer larger rework into a new chunk if needed.

## Likely Files

- Chapter 2 scene files
- Rendering files touched by prior chunks
- `HANDOFF.md`

## Verification

- Browser previews pass for all Chapter 2 scenes.
- Full Chapter 2 route works from transition/opener to Chapter 3 handoff.
- No console warnings/errors.
- No unintended gameplay change from Chapter 1 flow.

## Done When

Chapter 2 is ready for user playtesting as a complete wetland-biome pass.

## Completed

- QA reviewed the active Chapter 2 route from `chapter-two/wetland-approach` through `chapter-two/reedwatch-bank`, plus the transition target `chapter-three/mossline-switchyard`.
- Kept the Chunk 97 puzzle tuning intact. The ten active post-transition Chapter 2 repairs still use their `ch2-*` tuned layouts, and Wetland Approach remains the gentler transition repair.
- Fixed one narrow visual consistency issue found during QA: `chapter-two/glowfen-grove` now hides the generic right-edge signpost and the generic repair marker, matching the rest of the Chapter 2 wetland landmark direction.
- Confirmed the Chapter 2 visual sequence uses the shared wetland background/path treatment, foreground landmark variation, restrained glow, and no random cottages, loose repair props, or broken-branch clutter.
- Confirmed `chapter-two/reedwatch-bank` still routes into `chapter-three/mossline-switchyard`.

## Verification Notes

- Source/data QA passed: 101 full-route scenes, ordered Chapter 2 slice from Wetland Approach through Reedwatch Bank, one repair per active Chapter 2 scene, and Reedwatch Bank routes into Mossline Switchyard.
- Browser preview screenshots passed on port `5310` for Wetland Approach, all ten active post-transition Chapter 2 scenes, and Mossline Switchyard with no captured warnings or errors.
- Reedwatch Bank normal repair flow opened the 4x3 `Reedwatch Marker Grid` overlay in-browser with no captured warnings or errors; title, instructions, board, status panel, and controls all fit/read cleanly.
- Automated solvability check passed for all ten tuned Chapter 2 layouts. None start complete; Reedwatch Bank remains a compact 4x3 final board.
