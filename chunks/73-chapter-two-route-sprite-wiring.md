# Chunk 73: Chapter Two Route Sprite Wiring

Status: complete

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
- Wired `chapter-two/mist-pool` to use `assets/sprites/world/mist-pool-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose seed/coil repair props from Mist Pool.
- Turned off the generic repair marker for Mist Pool.
- Kept the older canvas mist-pool renderer as a fallback if the painted sprite does not load.
- Wired `chapter-two/moss-gate` to use `assets/sprites/world/moss-gate-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose seed/coil repair props from Moss Gate.
- Turned off the generic repair marker for Moss Gate.
- Kept the older canvas moss-gate renderer as a fallback if the painted sprite does not load.
- Wired `chapter-two/old-fen-shrine` to use `assets/sprites/world/old-fen-shrine-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose gear/coil repair props from Old Fen Shrine.
- Turned off the generic repair marker for Old Fen Shrine.
- Kept the older canvas old-fen-shrine renderer as a fallback if the painted sprite does not load.
- Wired `chapter-two/glowfen-ferry` to use `assets/sprites/world/glowfen-ferry-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose coil/gear repair props from Glowfen Ferry.
- Turned off the generic repair marker for Glowfen Ferry.
- Kept the older canvas glowfen-ferry renderer as a fallback if the painted sprite does not load.
- Wired `chapter-two/reedwatch-bank` to use `assets/sprites/world/reedwatch-bank-painted.png` through the shared `paintedLandmark` renderer path.
- Removed the loose seed/coil/gear repair props from Reedwatch Bank.
- Turned off the generic repair marker for Reedwatch Bank.
- Kept the older canvas reedwatch-bank renderer as a fallback if the painted sprite does not load.

## Verification

- Static scene-data check confirms:
  - `chapter-two/glowfen-grove` remains hand-built with no `paintedLandmark`, `0` cottages, `0` repair parts, and the root-pump repair intact.
  - `chapter-two/lantern-lily-pool` has `paintedLandmark.sprite: "lanternLilyPool"`, `0` cottages, `0` repair parts, and `showMarker: false`.
  - `chapter-two/bog-bridge` has `paintedLandmark.sprite: "bogBridge"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/frogsong-lock` has `paintedLandmark.sprite: "frogsongLock"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/sunken-signpost` has `paintedLandmark.sprite: "sunkenSignpost"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/mist-pool` has `paintedLandmark.sprite: "mistPool"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/moss-gate` has `paintedLandmark.sprite: "mossGate"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/old-fen-shrine` has `paintedLandmark.sprite: "oldFenShrine"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/glowfen-ferry` has `paintedLandmark.sprite: "glowfenFerry"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - `chapter-two/reedwatch-bank` has `paintedLandmark.sprite: "reedwatchBank"`, `0` cottages, `0` repair parts, `0` broken branches, and `showMarker: false`.
  - The full route still instantiates all 100 scenes.
- Route walk confirmed `chapter-two/bog-bridge` remains route stop 13 and still advances to `chapter-two/frogsong-lock`.
- Route check confirmed `chapter-two/frogsong-lock` still advances to `chapter-two/sunken-signpost`.
- Route check confirmed `chapter-two/sunken-signpost` still advances to `chapter-two/mist-pool`.
- Route check confirmed `chapter-two/mist-pool` remains route stop 16 and still advances to `chapter-two/moss-gate`.
- Route check confirmed `chapter-two/moss-gate` remains route stop 17 and still advances to `chapter-two/old-fen-shrine`.
- Route check confirmed `chapter-two/old-fen-shrine` remains route stop 18 and still advances to `chapter-two/glowfen-ferry`.
- Route check confirmed `chapter-two/glowfen-ferry` remains route stop 19 and still advances to `chapter-two/reedwatch-bank`.
- Route check confirmed `chapter-two/reedwatch-bank` remains route stop 20 and still advances to `chapter-three/mossline-switchyard`.
- Local preview server responded at:
  - `http://127.0.0.1:5238/?scene=chapter-two/lantern-lily-pool&preview=1`
  - `http://127.0.0.1:5240/?scene=chapter-two/bog-bridge&preview=1`
  - `http://127.0.0.1:5241/?scene=chapter-two/frogsong-lock&preview=1`
  - `http://127.0.0.1:5242/?scene=chapter-two/sunken-signpost&preview=1`
  - `http://127.0.0.1:5242/?scene=chapter-two/sunken-signpost&x=1120&preview=1`
  - `http://127.0.0.1:5243/?scene=chapter-two/mist-pool&preview=1`
  - `http://127.0.0.1:5243/?scene=chapter-two/mist-pool&x=1160&preview=1`
  - `http://127.0.0.1:5244/?scene=chapter-two/moss-gate&preview=1`
  - `http://127.0.0.1:5244/?scene=chapter-two/moss-gate&x=1120&preview=1`
  - `http://127.0.0.1:5245/?scene=chapter-two/old-fen-shrine&preview=1`
  - `http://127.0.0.1:5245/?scene=chapter-two/old-fen-shrine&x=1120&preview=1`
  - `http://127.0.0.1:5246/?scene=chapter-two/glowfen-ferry&preview=1`
  - `http://127.0.0.1:5246/?scene=chapter-two/glowfen-ferry&x=1120&preview=1`
  - `http://127.0.0.1:5247/?scene=chapter-two/reedwatch-bank&preview=1`
  - `http://127.0.0.1:5247/?scene=chapter-two/reedwatch-bank&x=1120&preview=1`
- Painted sprite asset responded at:
  - `http://127.0.0.1:5238/assets/sprites/world/lantern-lily-pool-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5240/assets/sprites/world/bog-bridge-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5241/assets/sprites/world/frogsong-lock-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5242/assets/sprites/world/sunken-signpost-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5243/assets/sprites/world/mist-pool-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5244/assets/sprites/world/moss-gate-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5245/assets/sprites/world/old-fen-shrine-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5246/assets/sprites/world/glowfen-ferry-painted.png?v=painted-route-ch2`
  - `http://127.0.0.1:5247/assets/sprites/world/reedwatch-bank-painted.png?v=painted-route-ch2`
- Source checks passed for `src/scenes/chapterTwo/bogBridge.js`, `src/scenes/chapterTwo/frogsongLock.js`, and `src/rendering/sprites.js`.
- Source checks passed for `src/scenes/chapterTwo/sunkenSignpost.js` and `src/rendering/sprites.js`.
- Source checks passed for `src/scenes/chapterTwo/mistPool.js` and `src/rendering/sprites.js`.
- Source checks passed for `src/scenes/chapterTwo/mossGate.js` and `src/rendering/sprites.js`.
- Source checks passed for `src/scenes/chapterTwo/oldFenShrine.js` and `src/rendering/sprites.js`.
- Source checks passed for `src/scenes/chapterTwo/glowfenFerry.js` and `src/rendering/sprites.js`.
- Source checks passed for `src/scenes/chapterTwo/reedwatchBank.js` and `src/rendering/sprites.js`.
- Asset check confirmed `assets/sprites/world/moss-gate-painted.png` is `418x326`.
- Asset check confirmed `assets/sprites/world/old-fen-shrine-painted.png` is `408x360`.
- Asset check confirmed `assets/sprites/world/glowfen-ferry-painted.png` is `418x368`.
- Asset check confirmed `assets/sprites/world/reedwatch-bank-painted.png` is `408x290`.
- In-app browser preview for Sunken Signpost rendered the painted landmark with no console errors.
- Automated browser smoke was attempted, but this environment has the Playwright package without its Chromium browser binary installed.

## Next

Chapter 2 route sprite wiring is complete. Continue route-order sprite wiring at `chapter-three/mossline-switchyard`, keeping its existing hand-built switchyard identity unless the generated painted sprite is a clear improvement.
