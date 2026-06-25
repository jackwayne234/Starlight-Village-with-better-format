# Chunk 114: Crane Hook Yard Side Sprite Fix

Status: complete

## Goal

Respond to playtest feedback by replacing Crane Hook Yard's bespoke canvas landmark with a sprite that complements the Chapter 3 side-scrolling Mossline view.

## Completed

- Added `assets/sprites/chapter-three/landmarks/crane-hook-yard-side.png` as a transparent side-view gantry crane sprite with an overhead beam, hanging hook, lifted beam, signal lamps, control box, mossy wet metal, and horizontal rail/deck base.
- Added `sprites.chapterThree.landmarks.craneHookYardSide`.
- Rewired `chapter-three/crane-hook-yard` to draw the new sprite through `scene.paintedLandmark` with `source: "chapterThreeLandmarks"`.
- Kept the existing canvas Crane Hook Yard renderer only as a fallback if the new sprite is not ready.
- Preserved the `ch3-crane-hook-yard` puzzle layout, repair state, route text, route flow to Sparking Relay Shed, and the no-marker/no-clutter scene rules.

## Verification

- Syntax checks passed for the touched scene, renderer, sprite registry, scene registry, render pipeline, and main entry modules.
- Static scene check confirms `chapter-three/crane-hook-yard` uses `paintedLandmark.source: "chapterThreeLandmarks"` and `paintedLandmark.sprite: "craneHookYardSide"`, with `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset probe confirms `crane-hook-yard-side.png` is `1536x1024` RGBA with transparent background pixels and opaque landmark pixels.
- In-app browser preview at `http://127.0.0.1:5331/?scene=chapter-three/crane-hook-yard&x=1120&preview=1&v=crane-hook-yard-sprite` rendered the side-view crane sprite with no captured warnings or errors.
