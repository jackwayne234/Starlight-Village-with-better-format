# Chunk 146: Chapter Review Visual Environment Fixes

Status: complete

## Goal

Address the user playtest notes from the all-repairs review pass:

- Mossline rock-ring puddles did not match the chapter scenery.
- Chapter 4 Repair 3's Cliff Rope Lift landmark read as chopped off at the top.
- Chapter 5 Repair 10's Hill Descent stairs did not clearly lead anywhere.
- Chapters 7, 8, 9, and 10 needed their own background and pathway sprites for Orchard, Glassworks, Under-Village, and Festival settings.

## Changes

- Added `tools/generate-chapter-review-environment-sprites.py` so the new environment sprites can be rebuilt.
- Added the reference source sheet at `assets/sprites/reference/chapter-review-background-reference.png`.
- Generated new chapter environment sprites:
  - `assets/sprites/chapter-seven/backgrounds/orchard-background.png`
  - `assets/sprites/chapter-seven/paths/orchard-path.png`
  - `assets/sprites/chapter-eight/backgrounds/glassworks-background.png`
  - `assets/sprites/chapter-eight/paths/glassworks-path.png`
  - `assets/sprites/chapter-nine/backgrounds/under-village-background.png`
  - `assets/sprites/chapter-nine/paths/under-village-path.png`
  - `assets/sprites/chapter-ten/backgrounds/festival-background.png`
  - `assets/sprites/chapter-ten/paths/festival-path.png`
- Added `assets/sprites/chapter-four/landmarks/cliff-rope-lift-complete.png` with completed top hardware.
- Added `assets/sprites/world/hill-descent-road.png` so the stair sprite visibly continues into a road.
- Updated `drawBackdrop()` and `drawWorld()` so Chapters 7-10 use their own background and pathway sprite pairs.
- Updated Mossline puddle rendering so Chapter 3 scenes use `mossline-puddle-ground-trimmed.png` instead of the shared rock-ring puddle.
- Updated `treeDensity.js` and late-chapter scene layers so Chapters 7-10 do not receive generic pine trees, generic puddles, old foliage props, lamps, or horizontal mist bands over the new chapter art.
- Bumped browser cache tags to `chapter-review-visual-fixes-3`.

## Verification

- PNG dimension checks passed for the new backgrounds, paths, Cliff Rope Lift, Hill Descent, and reference source sheet.
- Syntax checks passed for the changed rendering files, scene files, `treeDensity.js`, and the generator script.
- Registry smoke test created all 104 scene ids and confirmed Chapters 7-10 have no injected trees or mist bands.
- In-app browser visual checks passed on port `5364` for:
  - `chapter-three/sparking-relay-shed`
  - `chapter-four/cliff-rope-lift`
  - `chapter-five/hill-descent`
  - `chapter-seven/old-orchard`
  - `chapter-eight/glassworks-quarter`
  - `chapter-nine/under-village`
  - `chapter-ten/celebration-square`
- Final browser checks reported a `1280x720` canvas and no warnings or errors.
