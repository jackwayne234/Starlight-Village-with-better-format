# Chunk 87: Chapter Two Landmark Sprite Plan

Status: complete

## Goal

Plan the Chapter 2 landmark sprite set before producing individual landmark sprites.

## Ground Truth

- All Chapter 2 scenes should be brought to the new wetland standard.
- Landmarks should support the big wetland background and mood, not overpower it.
- Repair jobs should focus on practical wetland crossings and navigation systems: pumps, gates, bridges, ferries, and markers.
- Existing generated sprites may be used only if they fit the side-scroller wetland direction.

## Scope

- Inventory every Chapter 2 scene and decide the needed landmark sprite for each.
- Mark existing sprites as keep, revise, or replace.
- Write simple production notes for each landmark.

## Likely Files

- `assets/sprites/chapter-two/README.md`
- `chunks/87-chapter-two-landmark-sprite-plan.md`
- Existing scene files only for reference, no code changes in this chunk.

## Verification

- Every Chapter 2 scene has a planned landmark sprite or an explicit reuse decision.
- No planned landmark violates the side-scroller, natural wetland, or practical repair rules.

## Completed

- Inventoried the active full-game Chapter 2 route from `src/scenes/fullGameCatalog.js`.
- Reviewed current Chapter 2 scene landmark fields and existing world assets.
- Added a landmark sprite plan to `assets/sprites/chapter-two/README.md`.
- Gave every active Chapter 2 route scene a planned landmark sprite filename and production note.
- Marked existing assets as revise/split, replace, or defer.
- Documented legacy/inactive Chapter 2 scene factories separately so they do not silently drive the active wetland pass.
- Kept this chunk planning-only; no new image generation, sprite production, scene wiring, or gameplay changes were made.

## Active Route Landmark Plan

| Scene | Planned landmark sprite | Decision |
|-------|-------------------------|----------|
| `chapter-two/glowfen-grove` | `landmarks/root-pump.png` | Revise/split from existing full-scene reference. |
| `chapter-two/lantern-lily-pool` | `landmarks/lantern-lily-crossing.png` | Revise/split from existing side-scene reference. |
| `chapter-two/bog-bridge` | `landmarks/bog-bridge.png` | Replace old generated painted asset. |
| `chapter-two/frogsong-lock` | `landmarks/frogsong-lock.png` | Replace old generated painted asset. |
| `chapter-two/sunken-signpost` | `landmarks/sunken-route-marker.png` | Replace old generated painted asset. |
| `chapter-two/mist-pool` | `landmarks/mist-vent-stones.png` | Replace old generated painted asset. |
| `chapter-two/moss-gate` | `landmarks/moss-gate.png` | Replace old generated painted asset. |
| `chapter-two/old-fen-shrine` | `landmarks/rain-bowl-marker.png` | Replace/reframe as practical wetland guide object. |
| `chapter-two/glowfen-ferry` | `landmarks/glowfen-ferry.png` | Replace old generated painted asset. |
| `chapter-two/reedwatch-bank` | `landmarks/reedwatch-markers.png` | Replace old generated painted asset. |

## Legacy/Inactive Scene Decisions

| Scene | Decision |
|-------|----------|
| `chapter-two/lantern-market` | Defer unless reintroduced; old market concept conflicts with wetland-first direction. |
| `chapter-two/glassrail-crossing` | Defer unless reintroduced; rail-crossing concept fits Mossline more than the new wetland biome. |
| `chapter-two/old-observatory` | Defer unless reintroduced; avoid large observatory dominance in the wetland pass. |

## Done When

There is a complete list of Chapter 2 landmark sprites to create, keep, or replace.
