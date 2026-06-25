# Chunk 112: Cargo Cart Turntable Side Sprite Fix

Status: complete

## Goal

Respond to playtest feedback that Cargo Cart Turntable still read as a bird's-eye turntable. Replace that look with a side-view sprite that complements the Chapter 3 side-scrolling Mossline camera.

## Completed

- Added `assets/sprites/chapter-three/landmarks/cargo-cart-turntable-side.png` as a transparent side-view cargo cart, rail deck, signal-lamp, and turntable landmark sprite.
- Added `sprites.chapterThree.landmarks.cargoCartTurntableSide`.
- Taught the shared painted-landmark renderer to resolve `source: "chapterThreeLandmarks"`.
- Rewired `chapter-three/cargo-cart-turntable` to draw the new side-view sprite through `scene.paintedLandmark`, keeping the existing canvas turntable renderer only as a fallback if the sprite is not ready.
- Kept the scene's Mossline background, side-scrolling staging, puzzle layout, repair text, route flow, and no-marker/no-clutter rules intact.

## Verification

- Syntax checks passed for the touched scene, renderer, sprite registry, scene registry, render pipeline, and main entry modules.
- Static scene check confirms `chapter-three/cargo-cart-turntable` uses `paintedLandmark.source: "chapterThreeLandmarks"` and `paintedLandmark.sprite: "cargoCartTurntableSide"`, with `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
- Asset probe confirms `cargo-cart-turntable-side.png` is `1774x887` RGBA with transparent background pixels and opaque center landmark pixels.
- In-app browser preview at `http://127.0.0.1:5331/?scene=chapter-three/cargo-cart-turntable&x=1120&preview=1&v=side-turntable-sprite` rendered the side-view sprite with no captured warnings or errors.
