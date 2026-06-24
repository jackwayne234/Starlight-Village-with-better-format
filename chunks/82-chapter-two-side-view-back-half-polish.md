# Chunk 82: Chapter Two Side-View Back-Half Polish

Status: complete

## Goal

Continue Chapter 2 visual playthrough polish from `chapter-two/frogsong-lock`, keeping the Glowfen route side/front-facing instead of top-down, angled, or isometric.

## Completed

- Removed the generated painted-landmark override from the Chapter 2 back half:
  - `chapter-two/frogsong-lock`
  - `chapter-two/sunken-signpost`
  - `chapter-two/mist-pool`
  - `chapter-two/moss-gate`
  - `chapter-two/old-fen-shrine`
  - `chapter-two/glowfen-ferry`
  - `chapter-two/reedwatch-bank`
- Restored those scenes to their bespoke side-view canvas landmarks while preserving their repair state, puzzle copy, route links, no-cottage cleanup, no loose repair props, and hidden generic markers.
- Strengthened unfinished-state contrast for the shared Glowfen back-half renderers so wetland landmarks remain readable before repair:
  - Frogsong Lock reed gate and call stones
  - Sunken Signpost water and marker lights
  - Mist Pool vent stones and mist veil
  - Moss Gate halves and root glow points
  - Old Fen Shrine ground silhouette
  - Glowfen Ferry posts, rope, dock, boat, and water bed
  - Reedwatch Bank guide markers and path line

## Verification

- Route/data check confirmed all 100 full-game scenes still instantiate.
- Chapter 2 route check confirmed:
  - `chapter-two/glowfen-grove` -> `chapter-two/lantern-lily-pool`
  - `chapter-two/lantern-lily-pool` -> `chapter-two/bog-bridge`
  - `chapter-two/bog-bridge` -> `chapter-two/frogsong-lock`
  - `chapter-two/frogsong-lock` -> `chapter-two/sunken-signpost`
  - `chapter-two/sunken-signpost` -> `chapter-two/mist-pool`
  - `chapter-two/mist-pool` -> `chapter-two/moss-gate`
  - `chapter-two/moss-gate` -> `chapter-two/old-fen-shrine`
  - `chapter-two/old-fen-shrine` -> `chapter-two/glowfen-ferry`
  - `chapter-two/glowfen-ferry` -> `chapter-two/reedwatch-bank`
  - `chapter-two/reedwatch-bank` -> `chapter-three/mossline-switchyard`
- Static scene-data check confirmed every Chapter 2 route scene has `0` cottages, `0` loose repair parts, and `0` broken branches.
- Browser preview passed with no warnings or errors on:
  - `http://127.0.0.1:5280/?scene=chapter-two/frogsong-lock&x=1120&preview=1&v=side-view-contrast`
  - `http://127.0.0.1:5280/?scene=chapter-two/sunken-signpost&x=1120&preview=1&v=side-view-contrast`
  - `http://127.0.0.1:5280/?scene=chapter-two/mist-pool&x=1120&preview=1&v=side-view-contrast`
  - `http://127.0.0.1:5280/?scene=chapter-two/moss-gate&x=1120&preview=1&v=side-view-contrast`
  - `http://127.0.0.1:5280/?scene=chapter-two/old-fen-shrine&x=1120&preview=1&v=side-view-contrast`
  - `http://127.0.0.1:5280/?scene=chapter-two/glowfen-ferry&x=1120&preview=1&v=side-view-contrast`
  - `http://127.0.0.1:5280/?scene=chapter-two/reedwatch-bank&x=1120&preview=1&v=side-view-contrast`
- Screenshot spot-checks passed for Frogsong Lock, Mist Pool, Glowfen Ferry, and Reedwatch Bank.

## Next

Chapter 2's visual route is now back on side-view treatments from Glowfen Grove through Reedwatch Bank. Continue with full-route visual QA, or playtest Chapter 2's rotate-path puzzles in normal non-preview mode.
