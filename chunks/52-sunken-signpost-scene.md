# Chunk 52: Sunken Signpost Scene

Status: complete

## Goal

Turn `chapter-two/sunken-signpost` from a catalog placeholder into a bespoke Glowfen Wetlands marker scene without reintroducing the removed arrow signpost visual language.

## Completed

- Added `src/scenes/chapterTwo/sunkenSignpost.js`.
- Registered the scene in `src/scenes/sceneRegistry.js`.
- Added a sunken marker renderer in `src/rendering/worldRenderer.js`.
- Added repair effect and progress restore support for the raised-marker state.
- Used a carved glow marker and reed lights instead of an arrow signpost.
- Kept the route flowing to `chapter-two/mist-pool`.

## Verification

- Syntax checks passed for the new scene, renderer, registry, repair flow, and progress files.
- Full route walk still reaches all 100 scenes.
- Route walk confirms the sequence `chapter-two/frogsong-lock` -> `chapter-two/sunken-signpost` -> `chapter-two/mist-pool`.
- Local served-page smoke check passed at:
  - `http://127.0.0.1:5206/?v=sunken-signpost&scene=chapter-two/sunken-signpost&x=1120&preview=1`

## Next Chunk

Chunk 53 should polish `chapter-two/mist-pool`.

Suggested scope:

1. Add a bespoke mist pool landmark with vents or warm stones.
2. Make completion visibly thin the mist and reveal the path.
3. Keep `chapter-two/moss-gate` as the next route stop.
