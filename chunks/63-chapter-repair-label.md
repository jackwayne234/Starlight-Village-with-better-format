# Chunk 63: Chapter Repair Label

Status: complete

## Goal

Replace the single scene-name HUD badge with a warmer V1-inspired label that shows chapter-local progress across the full 100-scene route.

## Completed

- Updated the top-left HUD label in `src/ui/hud.js` to use a warm lantern-lit backing and cream text.
- Changed the label to show chapter and region on the first line.
- Added a second line with the current scene title and chapter-local repair count.
- Wired the label to `src/scenes/fullGameCatalog.js` so it reflects the actual route ledger instead of hard-coded counts.
- Expanded the label avoidance rectangle so dialogue and reaction bubbles keep clear of the larger two-line label.

## Current Example

For `chapter-three/sparking-relay-shed`, the HUD now reads:

- `Chapter 3: Mossline`
- `Sparking Relay Shed - Repair 6 of 10`

## Verification

- Syntax checks passed for the HUD and cache-busted import chain.
- Route-label calculation confirmed Sparking Relay Shed resolves to Chapter 3 and Repair 6 of 10.
- Browser preview loaded with no console errors at:
  - `http://127.0.0.1:5218/?v=chapter-repair-label&scene=chapter-three/sparking-relay-shed&x=1120&preview=1`

## Next Chunk

Chunk 64 should polish `chapter-three/rain-slick-rails`.

Suggested scope:

1. Add bespoke rain-slick rails with sand valves, wet track shine, and a clear rail path.
2. Make completion visibly sand or dry the rails so they read usable.
3. Keep `chapter-three/tunnel-mouth` as the next route stop.
