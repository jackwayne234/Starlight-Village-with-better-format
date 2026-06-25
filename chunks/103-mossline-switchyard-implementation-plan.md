# Chunk 103: Mossline Switchyard Implementation Plan

Status: complete

## Goal

Turn the locked Chapter 3 ground-truth answers into a buildable Mossline
Switchyard chunk list, then stop before any asset, code, gameplay, QA, or
visual implementation work.

## Source of Truth

- `ground-truth.md` > `Chapter 3 Ground Truth -- 25 Question Planning Pass`
- Official chapter name: **Mossline Switchyard**
- Feel: rainy rail-yard mystery with cozy repair tension
- Visual identity: wet rails, signal posts, old utility poles, moss, puddles,
  deep rainy greens, wet steel blues, and warm amber signal lights
- Camera rule: side-scrolling/side-view playable art only; no bird's-eye,
  top-down, angled, or isometric sprites
- Puzzle rule: keep the existing rotate-path puzzle type, make it a small step
  harder than Chapter 2 through branching paths, more outputs, and less obvious
  rotations
- First-pass exclusions: audio, heavy story rewrites, new puzzle types, and
  Chapter 4 transition work

## Existing Chapter 3 Context

- Chunk 74 already reviewed the ten route-order Chapter 3 scenes against the
  earlier route-sprite format. Some generated painted sprites were accepted,
  while several angled/isometric assets were rejected in favor of bespoke
  side-view renderers.
- Chunk 102 already gave all ten Mossline repair puzzles Chapter 3 panel text
  and a procedural wet-rail signal skin. That is a useful foundation, but it
  does not complete the locked difficulty-tuning requirement.
- Existing Chapter 3 art can be used as reference, but it should be replaced or
  upgraded when it does not fit the new shared-background Mossline direction.

## Implementation Chunk List

### 104: Mossline Shared Background Sprite Pack

Create the shared Mossline chapter background assets first. The target image
language is a rainy side-view rail line curving through mossy woods, with
utility poles, signal lights, puddle shine, mist, and enough open foreground
space for the boy, robot, repair landmarks, and puzzle interactions. This chunk
should produce reviewable sprite assets only, with no renderer or scene wiring.

Done enough: side-view assets exist for the shared rail/mossy-woods background
and any needed background support pieces; rejected drafts are noted if they read
top-down, bird's-eye, angled, or isometric.

### 105: Mossline Shared Background Renderer

Wire the shared background into all `chapter-three/` Mossline scenes while
preserving the existing route order and repair mechanics. Scene-to-scene variety
should come from foreground landmarks, local rail/signal details, and repaired
state effects, not ten unrelated backgrounds.

Done enough: every Chapter 3 scene uses the shared Mossline background path, the
background stays readable under rain/mist, non-Chapter-3 scenes are unaffected,
and route/data checks still pass.

### 106: Chapter 2 to Chapter 3 Transition Page

Add the mostly visual transition page between Reedwatch Bank and the first real
Mossline repair. The image should show the wetland boardwalk ending beside the
first moss-covered rail line and signal light, with the boy and robot visible.
It should feel like a handoff from Glowfen into Mossline, not only a title card
and not a playable threshold repair.

Done enough: Reedwatch Bank can flow into the transition page, the transition
continues into `chapter-three/mossline-switchyard`, and no extra repair or new
mechanic is added.

### 107: Mossline Foreground Landmark Audit and Asset Plan

Audit all ten Mossline scenes against the locked direction before producing new
landmarks: Mossline Switchyard, Cargo Cart Turntable, Signal Arm Row, Conductor
Booth, Crane Hook Yard, Sparking Relay Shed, Rain-Slick Rails, Tunnel Mouth,
Clock Signal, and Last Platform. For each scene, decide whether the existing
side-view treatment can stay, needs an upgraded foreground sprite, or should be
replaced.

Done enough: each scene has a documented one-landmark target, rejected
top-down/angled/isometric assets are called out, and no scene plan depends on
random cottages, loose repair clutter, or a generic repair marker.

### 108: Mossline Foreground Landmark Sprite Production

Produce or revise the foreground landmark sprites from the audit. Each scene
gets one strong side-view rail/signal repair landmark focused on rail signals,
switch boxes, turntables, relays, lamps, blocked rails, or supporting carts and
electrical details.

Done enough: reviewable landmark sprites exist for the scenes that need them,
with transparent edges where appropriate, side-view framing, and clear
unfinished/repaired-state potential.

### 109: Mossline Scene Rewire and Repaired-State Pass

Wire the approved landmarks into the ten Chapter 3 scenes over the shared
background. Preserve the side-scrolling camera, remove remaining placeholder
clutter, and make repaired-state effects read through warm signal lights, opened
paths, aligned rails, calmed relays, or restored platform lamps.

Done enough: all ten scenes fit the shared Mossline art direction, each scene
has one strong rail/signal landmark, and the route still advances from the
transition page through Last Platform.

### 110: Mossline Puzzle Difficulty Tuning

Keep the rotate-path puzzle type and the Chunk 102 rail/signal panel direction,
then tune the ten Chapter 3 layouts to be a small step harder than Chapter 2.
Use branching paths, more outputs, and less obvious rotations while avoiding
timers, hazards, punishment, oversized boards, or a new rail-switch mechanic.

Done enough: each Mossline repair has a solvable tuned layout, no layout starts
already complete, the puzzle text stays calm and readable, and the difficulty
feels like the next step after Chapter 2 rather than a spike.

### 111: Mossline Completion Summary and First-Pass Route QA

Add the Chapter 3 completion summary after Last Platform. The summary should
emphasize that all Mossline signals are restored and the road to the storm ridge
is open. Do not build the Chapter 4 transition page in this pass.

Done enough: the full Chapter 3 route can be played or probed from the Chapter
2 transition through the completion summary, it continues toward the existing
Chapter 4 route afterward, and documentation records any remaining polish items.

## Out of Scope for This Plan

- Audio, weather-sound, or music work
- Heavy story rewrites or long dialogue passes
- New puzzle mechanics or punitive puzzle rules
- Chapter 4 transition-page work
- Starting any asset generation, code changes, gameplay changes, QA pass, or
  visual implementation inside Chunk 103

## Verification

- Confirmed the plan is based on the locked 25-answer Chapter 3 ground truth.
- Confirmed the plan keeps the requested first-pass exclusions intact.
- Confirmed this chunk made documentation changes only.

## Next

Start Chunk 104: Mossline Shared Background Sprite Pack.
