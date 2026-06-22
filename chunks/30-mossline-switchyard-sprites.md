# Chunk 30 - Mossline Switchyard Sprites

## Goal

Make Mossline Switchyard feel less like canvas/CSS linework and more like a painted, rainy repair location.

## Scope

- Add painted sprites for utility poles and power-line spans.
- Add small foliage and grounding props around switch box bases.
- Keep the existing junction puzzle and route unchanged.

## Criteria

- Power lines should render from sprite art instead of only canvas strokes.
- Switch boxes should have moss/foliage at their bases.
- Existing fallback line/pole drawing remains if sprites fail to load.

## Completion Notes

- Added six Mossline switchyard sprites plus the source asset sheet.
- Wired painted poles and sagging line spans into the switchyard renderer.
- Added switch foliage, conduit coils, and puddle ground patches to Mossline scene data.
