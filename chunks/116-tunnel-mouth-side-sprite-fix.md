# Chunk 116: Tunnel Mouth Side Sprite Fix

Status: complete

## Goal

Respond to playtest feedback by replacing Tunnel Mouth's bespoke canvas landmark with a sprite that complements the Chapter 3 side-scrolling Mossline art direction.

## Completed

- Added `assets/sprites/chapter-three/landmarks/tunnel-mouth-side.png` as a transparent side-view/front-facing tunnel portal sprite with wet stone blocks, a dark arched tunnel opening, warning lamps, moss, puddle shine, and a horizontal rail threshold.
- Added `sprites.chapterThree.landmarks.tunnelMouthSide`.
- Rewired `chapter-three/tunnel-mouth` to draw the new sprite through `scene.paintedLandmark` with `source: "chapterThreeLandmarks"`.
- Kept the existing Tunnel Mouth canvas renderer only as a fallback if the new sprite is not ready.
- Preserved the `ch3-tunnel-mouth` puzzle layout, warning-lamp repair state, route text, route flow to Clock Signal, and the no-marker/no-clutter scene rules.

## Verification

- Syntax checks passed for the touched scene, renderer, sprite registry, scene registry, render pipeline, and main entry modules.
- Static scene check confirms `chapter-three/tunnel-mouth` uses `paintedLandmark.source: "chapterThreeLandmarks"` and `paintedLandmark.sprite: "tunnelMouthSide"`, with `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset probe confirms `tunnel-mouth-side.png` is `1536x1024` RGBA with transparent background pixels and opaque center portal pixels.
- In-app browser preview at `http://127.0.0.1:5331/?scene=chapter-three/tunnel-mouth&x=1120&preview=1&v=tunnel-mouth-sprite` rendered the side-view tunnel sprite with no captured warnings or errors.
