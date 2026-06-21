# Chunk 10: Old Build Landmarks and Effects

## Goal

Bring over the old build's scene-specific landmarks and visible repair effects.

## Scope

- Glowfen bridge.
- Mossline switchyard poles, boxes, and gate.
- Stormedge gauge and ridge posts.
- Beacon Hill tower, shed, flags, and cables.
- Rainbarrel drains, channels, barrels, and gutters.
- Repair-complete visual state changes.

## Success Criteria

- Each scene is visually recognizable from the old build.
- Repair completion visibly changes the scene.
- Landmark drawing stays in rendering helpers.

## Notes

Prefer readable canvas-drawn landmarks before final sprite/assets work.

## Completion Notes

- Added optional landmark data for Glowfen bridge, Mossline Switchyard, Stormedge Rise, Beacon Hill, and Rainbarrel Row.
- Added renderer helpers for each migrated landmark family.
- Added generic repair marker fallback for active repairs without bespoke art.
- Added repair-complete effects for bridge glow, switchyard lights, ridge gauge, beacon tower, and rainbarrel drain.
- Added progress restore for migrated repair effects.
- Verified syntax and full six-scene render/repair smoke path.
