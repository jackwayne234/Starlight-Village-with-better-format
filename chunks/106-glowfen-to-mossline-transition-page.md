# Chunk 106: Glowfen to Mossline Transition Page

Status: complete

## Goal

Add the mostly visual transition page between Reedwatch Bank and the first real
Mossline Switchyard repair.

## Completed

- Added `assets/sprites/chapter-three/transitions/glowfen-to-mossline.png`.
- Added `sprites.chapterThree.transitions.glowfenToMossline`.
- Added a `visual-transition` flow mode that pauses on a full-screen transition
  image and continues on Space, Enter, or E.
- Wired Reedwatch Bank's completed repair to show the transition page before
  continuing into `chapter-three/mossline-switchyard`.
- Kept the transition visual-only: no extra threshold repair, no new mechanic,
  and no new route scene.
- Added preview-only URL support with `transition=glowfen-to-mossline` for
  visual QA.

## Verification

- `sips` confirmed `glowfen-to-mossline.png` is `1672x941`.
- Visual review confirmed the image shows the wetland boardwalk ending beside
  the first moss-covered rail line and signal light, with the boy and robot
  visible.
- Rejected an earlier generated transition image because it included an arrow
  signboard; the final workspace asset does not use that rejected version.
- In-app browser preview passed at
  `http://127.0.0.1:5330/?scene=chapter-two/reedwatch-bank&transition=glowfen-to-mossline&v=mossline106b`
  with no captured warnings or errors.
- Pressing Space from the visual page entered the normal travel fade and landed
  in `chapter-three/mossline-switchyard`.

## Next

Chunk 107: audit all Mossline foreground landmarks against the locked direction.
