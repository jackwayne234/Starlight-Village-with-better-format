# Chunk 147: Grounding Fixes From Review

Status: complete

## Goal

Address the user's follow-up visual review notes:

- Old Orchard Repair 3's Branch Bridge stairs led nowhere.
- Glassworks chapter sprites sat too high, hovering over guardrails/path ropes.
- Under-Village Repair 8's Underground Stream sprite looked out of place and too high above the path.

## Changes

- Added `assets/sprites/world/branch-bridge-road.png`, a rebuilt Branch Bridge sprite with a foreground landing and road connection beneath the bridge.
- Updated `tools/generate-chapter-review-environment-sprites.py` so the Branch Bridge road asset can be rebuilt with green-matte cleanup and muted edge greens.
- Wired Branch Bridge to the new connected sprite and lowered its scene grounding.
- Lowered the shared Chapter 8 Glassworks sprite grounding so all ten landmarks sit on the route instead of floating around the guardrails/ropes.
- Added a scene-specific Underground Stream placement that moves the stream lower, slightly right, and a little larger so it sits on the foreground path.
- Bumped browser cache tags to `chapter-grounding-fixes-1`.

## Verification

- Regenerated the chapter review environment sprite pack and new Branch Bridge road sprite.
- Confirmed `branch-bridge-road.png` has transparent corners and no bright green matte pixels matching the cleanup check.
- Syntax checks passed for the changed Chapter 7, Chapter 8, Chapter 9, sprite registry, main entry, and generator files.
- Scene-data checks confirmed the updated Branch Bridge, Glassworks Quarter, Rainbow Tower, and Underground Stream sprite positions.
- `git diff --check` passed.
- In-app browser previews passed on port `5364` for:
  - `chapter-seven/branch-bridge`
  - `chapter-eight/glassworks-quarter`
  - `chapter-eight/rainbow-tower`
  - `chapter-nine/underground-stream`
- Browser preview checks reported a `1280x720` canvas and no warnings or errors.
