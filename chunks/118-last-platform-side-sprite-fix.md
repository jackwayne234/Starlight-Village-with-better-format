# Chunk 118: Last Platform Side Sprite Fix

Status: complete

## Goal

Respond to playtest feedback by replacing Last Platform's bespoke canvas landmark with a sprite that complements the Chapter 3 side-scrolling Mossline art direction.

## Completed

- Added `assets/sprites/chapter-three/landmarks/last-platform-side.png` as a transparent side-view final-platform sprite with a wet canopy shelter, horizontal rails, end-of-line bumper, hill-road marker, and rail signal stack.
- Added `sprites.chapterThree.landmarks.lastPlatformSide`.
- Rewired `chapter-three/last-platform` to draw the new sprite through `scene.paintedLandmark` with `source: "chapterThreeLandmarks"`.
- Kept the existing Last Platform canvas renderer only as a fallback if the new sprite is not ready.
- Preserved the `ch3-last-platform` puzzle layout, chapter-complete summary, route flow toward Chapter 4, and the no-marker/no-clutter scene rules.

## Verification

- Syntax checks passed for the touched scene, renderer, sprite registry, scene registry, render pipeline, and main entry modules.
- Static scene check confirms `chapter-three/last-platform` uses `paintedLandmark.source: "chapterThreeLandmarks"` and `paintedLandmark.sprite: "lastPlatformSide"` with the existing Last Platform repair state.
- Asset probe confirms `last-platform-side.png` is `1536x1024`.
- In-app browser preview at `http://127.0.0.1:5331/?scene=chapter-three/last-platform&x=1120&preview=1&v=last-platform-sprite` rendered the side-view final-platform sprite in the Mossline scene.
