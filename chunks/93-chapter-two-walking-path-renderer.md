# Chunk 93: Chapter Two Walking Path Renderer

Status: complete

## Goal

Wire the Chapter 2 boardwalk/stepping-stone path into the playable foreground.

## Ground Truth

- The Chapter 2 path should be stable wooden boardwalk mixed with stepping stones over shallow water.
- Scene variety should mostly come from foreground puzzle area, repair object, and local wetland details.
- Gameplay movement should stay the same as Chapter 1.

## Scope

- Add a Chapter 2 foreground path renderer or scene flag.
- Layer the path with shallow water, reeds, and local wetland detail.
- Make sure the player and robot remain readable on the path.

## Likely Files

- `src/rendering/worldRenderer.js`
- `src/rendering/sprites.js`
- Chapter 2 scene files

## Verification

- Player and robot stand clearly on the path.
- Path reads as side-view, not top-down.
- Repair trigger loop is unchanged.

## Done When

Chapter 2 scenes can share the new boardwalk/stepping-stone path treatment.

## Completed

- Added a Chapter 2-only shared wetland ground/path renderer in `src/rendering/worldRenderer.js`.
- Chapter 2 scenes now use `sprites.chapterTwo.paths.boardwalkSteppingPath` for the foreground boardwalk/stepping-stone path layer.
- Added a shallow water band behind the path so the sprite reads as a stable wetland crossing over water.
- Added a light contact-shadow pass over the lower foreground so the player and robot remain grounded/readable.
- Added a canvas fallback path made of simple boardwalk planks and stepping stones if the sprite is not ready.
- Kept non-Chapter-2 scenes on the existing ground/path renderer.
- Did not change scene files, repair trigger positions, puzzle mechanics, route data, or transition behavior in this chunk.

## Renderer Behavior

- `scene.id` values beginning with `chapter-two/` use `drawChapterTwoWetlandGround()`.
- The shared path sprite is drawn as a horizontally repeating foreground band near the actor feet.
- The path is filtered slightly darker/desaturated so it sits inside the rainy wetland scene instead of becoming a bright UI-like strip.
- If `boardwalk-stepping-path.png` is unavailable, the fallback still draws a side-view boardwalk/stone crossing rather than reverting to the village cobble path.
- Festival Square and all non-Chapter-2 scenes keep their previous ground/path code paths.

## Verification Notes

- Imported `src/rendering/worldRenderer.js` with a browser-like `Image` shim and canvas spy.
- Confirmed a `chapter-two/moss-gate` scene draw selects `assets/sprites/chapter-two/paths/boardwalk-stepping-path.png`.
- Confirmed the same Chapter 2 draw does not use the generic `assets/sprites/world/path-tile.png`.
- Confirmed a `chapter-one/festival-square` scene still uses the generic `assets/sprites/world/path-tile.png` and does not draw the Chapter 2 boardwalk sprite.
- Confirmed `sprites.chapterTwo.paths.boardwalkSteppingPath` exists and points to an existing file.
- Confirmed the source path image is `1836x857`.
- Confirmed `src/scenes/fullGameCatalog.js` still imports with 100 route scenes and 10 Chapter 2 scenes.
