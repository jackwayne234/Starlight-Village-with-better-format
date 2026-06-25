# Chunk 113: Conductor Booth Side Sprite Fix

Status: complete

## Goal

Respond to playtest feedback that Conductor Booth should be replaced with a sprite. Use a side-view sprite that fits the Chapter 3 Mossline side-scrolling camera, rather than the older generated angled/isometric booth asset.

## Completed

- Added `assets/sprites/chapter-three/landmarks/conductor-booth-side.png` as a transparent side-view rail control booth sprite with a route board, signal lamps, wet wood, moss, cables, and a horizontal rail/deck base.
- Added `sprites.chapterThree.landmarks.conductorBoothSide`.
- Rewired `chapter-three/conductor-booth` to draw the new sprite through `scene.paintedLandmark` with `source: "chapterThreeLandmarks"`.
- Kept the existing canvas Conductor Booth renderer only as a fallback if the new sprite is not ready.
- Preserved the `ch3-conductor-booth` puzzle layout, route text, repair state, route flow to Crane Hook Yard, and the no-marker/no-clutter scene rules.

## Verification

- Syntax checks passed for the touched scene, renderer, sprite registry, scene registry, render pipeline, and main entry modules.
- Static scene check confirms `chapter-three/conductor-booth` uses `paintedLandmark.source: "chapterThreeLandmarks"` and `paintedLandmark.sprite: "conductorBoothSide"`, with `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset probe confirms `conductor-booth-side.png` is `1536x1024` RGBA with transparent background pixels and opaque center landmark pixels.
- In-app browser preview at `http://127.0.0.1:5331/?scene=chapter-three/conductor-booth&x=1120&preview=1&v=conductor-booth-sprite` rendered the side-view booth sprite with no captured warnings or errors.
