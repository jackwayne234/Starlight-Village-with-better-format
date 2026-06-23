# Chunk 73: Chapter Two Route Sprite Wiring

Status: in progress

## Goal

Continue the full-route sprite integration pass into Chapter 2, preserving the Bakery Gutter format: one strong landmark sprite, no random side cottages, no loose repair props, and no generic marker unless intentionally needed.

## Completed

- Reviewed `chapter-two/glowfen-grove` and kept the existing hand-built root-pump landmark for now because it already has focused root-pump art, no cottages, no repair parts, and a dedicated root-channel puzzle identity.
- Wired `chapter-two/lantern-lily-pool` to use `assets/sprites/world/lantern-lily-pool-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose seed/coil repair props from Lantern Lily Pool.
- Turned off the generic repair marker for Lantern Lily Pool.
- Kept the older canvas lily-pool renderer as a fallback if the painted sprite does not load.
- Wired `chapter-two/bog-bridge` to use `assets/sprites/world/bog-bridge-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose broken branch and seed/gear repair props from Bog Bridge.
- Turned off the generic repair marker for Bog Bridge.
- Kept the older canvas bog-bridge renderer as a fallback if the painted sprite does not load.
- Wired `chapter-two/frogsong-lock` to use `assets/sprites/world/frogsong-lock-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose seed/coil repair props from Frogsong Lock.
- Turned off the generic repair marker for Frogsong Lock.
- Kept the older canvas frogsong-lock renderer as a fallback if the painted sprite does not load.
- Wired `chapter-two/sunken-signpost` to use `assets/sprites/world/sunken-signpost-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose broken branch and seed/gear repair props from Sunken Signpost.
- Turned off the generic repair marker for Sunken Signpost.
- Kept the older canvas sunken-signpost renderer as a fallback if the painted sprite does not load.

## Verification

- Static scene-data check confirms:
  - `chapter-two/glowfen-grove` remains hand-built with no `paintedLandmark`, `0` cottages, `0` repair parts, and the root-pump repair intact.
  - `chapter-two/lantern-lily-pool` has `paintedLandmark.sprite: "lanternLilyPool"`, `0` cottages, `0` repair parts, and `showMarker: false`.
  - `chapter-two/bog-bridge` has `paintedLandmark.sprite: "bogBridge"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/frogsong-lock` has `paintedLandmark.sprite: "frogsongLock"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/sunken-signpost` has `paintedLandmark.sprite: "sunkenSignpost"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - The full route still instantiates all 100 scenes.
- Route walk confirmed `chapter-two/bog-bridge` remains route stop 13 and still advances to `chapter-two/frogsong-lock`.
- Route check confirmed `chapter-two/frogsong-lock` still advances to `chapter-two/sunken-signpost`.
- Route check confirmed `chapter-two/sunken-signpost` still advances to `chapter-two/mist-pool`.
- Local preview server responded at:
  - `http://127.0.0.1:5238/?scene=chapter-two/lantern-lily-pool&preview=1`
  - `http://127.0.0.1:5240/?scene=chapter-two/bog-bridge&preview=1`
  - `http://127.0.0.1:5241/?scene=chapter-two/frogsong-lock&preview=1`
  - `http://127.0.0.1:5242/?scene=chapter-two/sunken-signpost&preview=1`
  - `http://127.0.0.1:5242/?scene=chapter-two/sunken-signpost&x=1120&preview=1`
- Painted sprite asset responded at:
  - `http://127.0.0.1:5238/assets/sprites/world/lantern-lily-pool-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5240/assets/sprites/world/bog-bridge-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5241/assets/sprites/world/frogsong-lock-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5242/assets/sprites/world/sunken-signpost-painted.png?v=painted-route-ch2`
- Source checks passed for `src/scenes/chapterTwo/bogBridge.js`, `src/scenes/chapterTwo/frogsongLock.js`, and `src/rendering/sprites.js`.
- Source checks passed for `src/scenes/chapterTwo/sunkenSignpost.js` and `src/rendering/sprites.js`.
- In-app browser preview for Sunken Signpost rendered the painted landmark with no console errors.
- Automated browser smoke was attempted, but this environment has the Playwright package without its Chromium browser binary installed.

## Next

Continue route-order sprite wiring at `chapter-two/mist-pool`.
