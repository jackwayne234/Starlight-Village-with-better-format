# Chunk 115: Rain-Slick Rails Side Sprite Fix

Status: complete

## Goal

Respond to playtest feedback by giving Rain-Slick Rails a fuller sprite landmark that complements the Chapter 3 side-scrolling Mossline view.

## Completed

- Added `assets/sprites/chapter-three/landmarks/rain-slick-rails-side.png` as a transparent side-view rail-sanding repair sprite with slick rails, sleepers, shallow puddle band, sand hoppers, valve wheels, sand pipes, low warning lamps, moss, weeds, and a visible sanded grip path.
- Added `sprites.chapterThree.landmarks.rainSlickRailsSide`.
- Rewired `chapter-three/rain-slick-rails` to draw the new sprite through `scene.paintedLandmark` with `source: "chapterThreeLandmarks"`.
- Kept the existing Rain-Slick Rails canvas renderer only as a fallback if the new sprite is not ready.
- Preserved the `ch3-rain-slick-rails` puzzle layout, repair state, route text, route flow to Tunnel Mouth, and the no-marker/no-clutter scene rules.

## Verification

- Syntax checks passed for the touched scene, renderer, sprite registry, scene registry, render pipeline, and main entry modules.
- Static scene check confirms `chapter-three/rain-slick-rails` uses `paintedLandmark.source: "chapterThreeLandmarks"` and `paintedLandmark.sprite: "rainSlickRailsSide"`, with `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset probe confirms `rain-slick-rails-side.png` is `1692x929` RGBA with transparent background pixels and opaque landmark pixels.
- In-app browser preview at `http://127.0.0.1:5331/?scene=chapter-three/rain-slick-rails&x=1120&preview=1&v=rain-slick-rails-sprite` rendered the side-view rail sprite with no captured warnings or errors.
