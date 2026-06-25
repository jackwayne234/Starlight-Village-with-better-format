# Chunk 119: Stormedge Rise Implementation Plan

Status: complete

## Goal

Turn the locked Chapter 4 ground-truth answers into a buildable Stormedge Rise
chunk list, then stop before any asset, code, gameplay, QA, or visual
implementation work.

## Source of Truth

- `ground-truth.md` > `Chapter 4 Ground Truth -- 25 Question Planning Pass`
- Official chapter name: **Stormedge Rise**
- Feel: windy storm-ridge climb with cozy repair tension
- Shared background rule: Chapter 4 needs one new background used throughout
  the entire chapter
- Visual identity: rainy ridge path, cliffs, wind-bent grass, distant storm
  clouds, strong wind, steady rain, and Beacon Hill visible ahead as the route's
  pull forward
- Camera rule: side-scrolling/side-view playable art only; no bird's-eye,
  top-down, angled, or isometric sprites
- Landmark rule: one strong side-view storm-ridge landmark per scene, with
  scene variety coming from foreground repair landmarks and local ridge details
- Path rule: the foreground path should read as a narrow ridge trail with wet
  stones, grass tufts, rope posts, and safe ledges
- Puzzle rule: keep the existing rotate-path puzzle type, make it a small step
  harder than Mossline through branching paths, more outputs, and wind-themed
  detours while keeping boards readable and non-punishing
- Puzzle skin rule: wind channels and brass weather-instrument paths over
  storm-blue metal tiles
- First-pass exclusions: audio, heavy story rewrites, new puzzle types, and
  Chapter 5 / Beacon Hill changes

## Existing Chapter 4 Context

- Chunk 75 already reviewed the ten route-order Chapter 4 scenes against the
  earlier route-sprite format. Several generated painted sprites were rejected
  because they read angled, isometric, or green-screened; a few were accepted
  after cleanup where they fit the side-view landmark rule.
- Existing Chapter 4 scenes currently preserve a rainy ridge mood, remove random
  cottages and loose repair clutter, and hide generic repair markers. This is a
  useful baseline, but it does not meet the new locked requirement for a shared
  Stormedge background used across the chapter.
- Existing Chapter 4 art can be used as reference, but it should be replaced or
  upgraded when it does not fit the new shared-background Stormedge direction.

## Implementation Chunk List

### 120: Stormedge Shared Background Sprite Pack

Create the shared Stormedge chapter background assets first. The target image
language is a side-view rainy ridge path with cliffs, wind-bent grass, distant
storm clouds, and Beacon Hill visible ahead. The background should feel higher,
windier, and more open than Mossline while still belonging to the same rainy,
cozy game.

Done enough: reviewable shared-background assets exist for the storm-ridge
chapter, with enough open foreground space for the boy, robot, repair landmarks,
and puzzle interactions. Rejected drafts are noted if they read top-down,
bird's-eye, angled, isometric, too harsh, or too visually noisy.

### 121: Stormedge Shared Background and Ridge Path Renderer

Wire the shared background into all `chapter-four/` Stormedge scenes while
preserving route order and repair mechanics. Add or adapt the shared foreground
path language so the playable ground reads as wet ridge stones, grass tufts,
rope posts, and safe ledges rather than Chapter 2 boardwalks, Chapter 3 rails,
or rooftop/ladders space.

Done enough: every Chapter 4 scene uses the shared Stormedge background/path
direction, the weather stays readable under rain and wind, non-Chapter-4 scenes
are unaffected, and route/data checks still pass.

### 122: Chapter 3 to Chapter 4 Transition Page

Add the mostly visual transition page after Last Platform and before the first
Stormedge repair. The image should show Mossline rails ending as the boy and
robot step onto a windy ridge path with Beacon Hill visible ahead. It should
feel like a handoff from the rail-yard chapter into Stormedge, not a text-only
title card and not a playable threshold repair.

Done enough: Last Platform can flow into the transition page, the transition
continues into `chapter-four/stormedge-rise`, the boy and robot are visible in
the transition image, and no extra repair or new mechanic is added.

### 123: Stormedge Foreground Landmark Audit and Asset Plan

Audit all ten Stormedge scenes against the locked direction before producing new
landmarks: Stormedge Rise, Weather Vane Roof, Cliff Rope Lift, Wind Chime Pass,
Lightning Rod Field, Lookout Post, Cracked Stair, Cloud Harvester, Summit Path,
and Beacon Approach. For each scene, decide whether the existing side-view
treatment can stay, needs an upgraded foreground sprite, or should be replaced.

Done enough: each scene has a documented one-landmark target, rejected
top-down/angled/isometric assets are called out, and no scene plan depends on
random cottages, loose repair clutter, broken-branch filler, generic markers, or
weather effects replacing the landmark.

### 124: Stormedge Foreground Landmark Sprite Production

Produce or revise the foreground landmark sprites from the audit. Each scene
gets one strong side-view weather/ridge safety landmark focused on storm gauges,
weather vanes, rope lifts, wind chimes, lightning rods, lookout equipment, stair
braces, cloud/rain machinery, path markers, or beacon gates.

Done enough: reviewable landmark sprites exist for the scenes that need them,
with side-view framing, clear transparent edges where appropriate, and readable
unfinished/repaired-state potential.

### 125: Stormedge Scene Rewire and Repaired-State Pass

Wire the approved landmarks into the ten Chapter 4 scenes over the shared
background. Preserve the side-scrolling camera, keep scenes free of placeholder
clutter, and make repaired-state effects read through subtle repair glow, stable
weather machinery, safer ridge paths, aligned vanes, grounded rods, lit markers,
or opened gates.

Done enough: all ten scenes fit the shared Stormedge art direction, each scene
has one strong side-view storm-ridge landmark, Beacon Hill remains a visible
destination without dominating every scene, and the route still advances from
Stormedge Rise through Beacon Approach.

### 126: Stormedge Puzzle Skin and Difficulty Tuning

Keep the rotate-path puzzle type, then give Chapter 4 repairs storm/ridge panel
text, a wind-channel/brass-weather-instrument visual skin, and tuned layouts
that are a small step harder than Mossline. Use branching paths, more outputs,
and wind-themed detours while avoiding timers, punishment, hazards, hidden
information, oversized boards, or a new puzzle type.

Done enough: each Stormedge repair has a solvable tuned layout, no layout starts
already complete, the puzzle skin reads as storm/ridge equipment, and difficulty
feels like the next calm step after Mossline rather than a spike.

### 127: Stormedge Completion Summary and First-Pass Route QA

Add the Chapter 4 completion summary after Beacon Approach. The summary should
emphasize that the storm-ridge path is safe, the weather systems are restored,
and Beacon Hill is reachable. Do not change Chapter 5 / Beacon Hill in this
pass.

Done enough: the full Chapter 4 route can be played or probed from the Chapter
3 transition through the completion summary, it continues into the existing
Chapter 5 route afterward, and documentation records any remaining polish items.

## Out of Scope for This Plan

- Audio, weather-sound, or music work
- Heavy story rewrites or long dialogue passes
- New puzzle mechanics or punitive puzzle rules
- Chapter 5 / Beacon Hill art, route, puzzle, or story changes
- Starting any asset generation, code changes, gameplay changes, QA pass, or
  visual implementation inside Chunk 119

## Verification

- Confirmed the plan is based on the locked 25-answer Chapter 4 ground truth.
- Confirmed the plan keeps the requested first-pass exclusions intact.
- Confirmed this chunk made documentation changes only.

## Next

Start Chunk 120: Stormedge Shared Background Sprite Pack.
