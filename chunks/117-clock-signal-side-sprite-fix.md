# Chunk 117: Clock Signal Side Sprite Fix

Status: complete

## Goal

Respond to playtest feedback by replacing Clock Signal's bespoke canvas landmark with a sprite that complements the Chapter 3 side-scrolling Mossline art direction.

## Completed

- Added `assets/sprites/chapter-three/landmarks/clock-signal-side.png` as a transparent side-view/front-facing clock-signal sprite with a wet station clock, rail signal lamps, pulse wires, mossy brackets, and a horizontal rail/platform base.
- Added `sprites.chapterThree.landmarks.clockSignalSide`.
- Rewired `chapter-three/clock-signal` to draw the new sprite through `scene.paintedLandmark` with `source: "chapterThreeLandmarks"`.
- Kept the existing Clock Signal canvas renderer only as a fallback if the new sprite is not ready.
- Preserved the `ch3-clock-signal` puzzle layout, synced-clock repair state, route text, route flow to Last Platform, and the no-marker/no-clutter scene rules.

## Verification

- Syntax checks passed for the touched scene, renderer, sprite registry, scene registry, render pipeline, and main entry modules.
- Static scene check confirms `chapter-three/clock-signal` uses `paintedLandmark.source: "chapterThreeLandmarks"` and `paintedLandmark.sprite: "clockSignalSide"`, with `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset probe confirms `clock-signal-side.png` is `1448x1086` RGBA with transparent background pixels and opaque clock-signal pixels.
- In-app browser preview at `http://127.0.0.1:5331/?scene=chapter-three/clock-signal&x=1120&preview=1&v=clock-signal-sprite` rendered the side-view/front-facing clock-signal sprite with no captured warnings or errors.
