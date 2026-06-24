# Chunk 92: Chapter Two Shared Background Renderer

Status: complete

## Goal

Add the shared Chapter 2 wetland background rendering path.

## Ground Truth

- Chapter 2 should use one shared wetland background system.
- The background should be the main visual identity for the chapter.
- It should support the same side-scroller gameplay and walk-right repair loop.

## Scope

- Add a renderer path for the shared Chapter 2 background.
- Keep it side-scroller framed and compatible with the existing camera.
- Preserve existing Chapter 1 and later chapter rendering behavior.

## Likely Files

- `src/rendering/backdropRenderer.js`
- `src/rendering/worldRenderer.js`
- `src/rendering/sprites.js`
- Chapter 2 scene files for background flags/config

## Verification

- Chapter 2 scene preview shows the shared wetland background.
- Non-Chapter-2 scenes still render their existing backgrounds.
- No browser console warnings or errors.

## Done When

Chapter 2 can render the shared wetland background behind its scenes.

## Completed

- Added a Chapter 2-only shared wetland backdrop path in `src/rendering/backdropRenderer.js`.
- The renderer now checks `scene.id` for `chapter-two/` and draws `sprites.chapterTwo.backgrounds.wetlandBackground` as the painted parallax scenery.
- Kept the existing sky and cloud overlay behavior.
- Kept the existing generic painted scenery and code-drawn hills as fallback paths for non-Chapter-2 scenes.
- Avoided scene-file rewiring in this chunk; Chapter 2 scenes opt into the shared background by id.
- Did not alter gameplay, repair flow, puzzle flow, foreground path rendering, landmark rendering, or puzzle difficulty.

## Renderer Behavior

- Chapter 2 scenes draw the shared wetland background before world layers, actors, weather, and HUD.
- The wetland background is scaled to cover the viewport, bottom-aligned, and repeated horizontally with gentle parallax so it remains compatible with the existing side-scroller camera.
- If the wetland image is not ready, rendering falls back to the existing generic painted scenery/hills path rather than failing.
- Non-Chapter-2 scenes still use the existing title-background painted scenery or code-drawn fallback hills.

## Verification Notes

- Imported `src/rendering/backdropRenderer.js` with a browser-like `Image` shim and canvas spy.
- Confirmed a `chapter-two/moss-gate` scene draw selects `assets/sprites/chapter-two/backgrounds/wetland-background.png`.
- Confirmed the same Chapter 2 draw does not fall through to `assets/title/background-hills.png`.
- Confirmed a `chapter-one/festival-square` scene still draws `assets/title/background-hills.png` and does not draw the wetland background.
- Confirmed the registered wetland background file exists and is available through `sprites.chapterTwo.backgrounds.wetlandBackground`.
- Confirmed the source image is `1774x887`.
- Confirmed `src/scenes/fullGameCatalog.js` still imports with 100 route scenes and 10 Chapter 2 scenes.
- Attempted local HTTP preview probes on ports `5292` and `5293`; the server processes started, but sibling shell commands could not connect in this managed environment, so no browser console check was available in this chunk.
