# Update 1 — Progress Log

## ✅ Done: Reused art + audio from the first iteration

### Audio system (full audio goal — first pass)
- Copied the old build's sound engine into V2: `src/audio/audioManager.js`, `src/audio/soundCatalog.js`.
- Added `src/audio/gameAudio.js` — one shared audio manager + simple cues.
- Copied the real thunder sound: `assets/audio/weather/rolling-thunder-pixabay.mp3` (+ credits).
- Wired sounds into the game:
  - Rain loop + entrance thunder start on the first key/click (browsers require a first interaction before audio).
  - Robot chirp when the robot starts scanning a repair.
  - Tile-click when rotating a puzzle tile.
  - Success chime when a repair is solved.
  - Soft thunder when moving between locations.
- Built-in (code-made) sounds available: rain loop, thunder, robot chirp, success chime, tile click.

### Character art (prettier goal — biggest visual win)
- Copied the painted sprites into V2 (`assets/sprites/characters/...`): apprentice idle + 2 walk frames, robot idle + scan.
- Added `src/rendering/sprites.js` to load them.
- Rewrote `src/rendering/actorRenderer.js` to draw the painted apprentice and robot.
  - Apprentice faces the way he walks; walk frames alternate for a simple walk cycle.
  - Robot shows the idle pose normally and the scan/beam pose while working; soft glow kept behind it.
  - The old canvas-drawn characters remain as an automatic fallback until images load.

### Verification
- `node --check` passes on all JS files.
- Served locally; every module + asset returns HTTP 200.
- Headless browser render confirms the scene draws with the new sprites and no JS errors.

### Notes / to fine-tune during playtest
- Character/robot on-screen sizes are set in `actorRenderer.js` (`PLAYER_HEIGHT`, `ROBOT_WIDTH`) and the robot's vertical anchor — easy to nudge once Chris plays it.
- Audio couldn't be *heard* in the headless check (no interaction/speakers); wiring is in place and the sound files load. Confirm by playing.
- Sprite PNGs are large (~0.8–1MB each); fine for now, can shrink later if load feels slow.

## ✅ Done: Title / start screen

- New `src/ui/titleScreen.js` draws a cozy title over a live, dimmed rainy backdrop of the first scene.
  - Big glowing "Starlight Village" title, subtitle "Chapter One — a cozy rainy repair tale".
  - Twinkling starlight, warm glow, a pulsing "Press Space to Begin" prompt, and a controls hint.
- `src/core/game.js` now holds a title state: the player is frozen and the HUD hidden until the player presses Space / Enter / E; then the title fades out and play begins (which also turns on audio).
- `src/rendering/renderPipeline.js` can skip the HUD (`{ hud: false }`) so the title screen stays clean.
- Verified: all JS passes `node --check`; headless browser render shows the title screen correctly with no errors.

## ✅ Done: Audio + polish fixes (round 2)

- Thunder now uses the real `rolling-thunder-pixabay.mp3` (33.6s distant roll) for every thunder cue; removed the synthesized "gunshot" clap. Plays directly at full volume; softened synth kept only as a silent-ish fallback.
- Fixed thunder cutting off while walking: audio "unlock" (which reloads all sound elements) now runs only once instead of on every key press.
- Sound starts on the first interaction of any kind (click/key/touch) on the welcome screen, and stays on.
- Robot resized to a small companion (`ROBOT_WIDTH = 56`), glow tied to its size. Confirmed good by Chris.
- Removed the bottom "walk to find the broken item" instructions on all six scenes and the "The lane glows ahead." line.

## ✅ Done: Painted world art pass (session 2026-06-21, afternoon)

Big "make it prettier" push — replaced the code-drawn world shapes with real
painted images that Chris generated in ChatGPT (cozy storybook style, matching
the existing character sprites). All on-model and committed.

### Pipeline (reusable)
- Chris generates each object in ChatGPT on a plain white background and saves
  to `~/Downloads`. Agent copies into `assets/sprites/world/` and runs
  `node tools/sprite-cutout.mjs <in> <out>-trimmed.png [threshold] [mode]`.
- `tools/sprite-cutout.mjs` (new) cuts the white background to transparent,
  feathers the rim, and trims to content. Two modes:
  - default (edge flood-fill) — keeps pale detail inside the art.
  - `global` — removes ALL near-white, including sky trapped in enclosed gaps
    (used for the tree and the water wheel spokes). Use threshold ~238–244.
- Built because the box has no PIL/pip/ImageMagick; Node 22 is available.

### Art added & wired (all with code-drawn fallbacks via `imageReady`)
- `src/rendering/sprites.js` — new `world.*` and `title.*` image groups.
- World props in `src/rendering/worldRenderer.js`: water wheel (sits in a new
  teal mill pond), cottage, tree, lamp, glow-plant, puddle, broken-branch,
  signpost (new exit marker), and the three repair parts (gear/coil/seed).
- Hero props per scene: root pump (Glowfen), switchyard box (Mossline), storm
  gauge (Stormedge), beacon tower + previously-undrawn shed (Beacon Hill),
  rain barrel (Rainbarrel), footbridge (Glowfen).
- `warmGlow` helper blooms lights as `powerLevel`/lit flags rise, preserving the
  "lights come back on" beat. Generic repair marker reduced to a soft highlight
  so it doesn't overlap the landmark art.
- Title screen (`src/ui/titleScreen.js`) now shows a painted cover (boy + robot,
  on-model) behind the veil.
- Painted misty-forest parallax background (`src/rendering/backdropRenderer.js`),
  drifting behind every scene, replacing the code-drawn hills when loaded.

### Playtest fixes this session
- Water wheel: white in the spoke gaps removed (global cutout).
- Tree: white in branch gaps removed (global cutout).
- Repair parts (gear/coil/seed): no longer bob/spin — they rest on the ground.
- Boy: removed the constant idle float; kept the celebration hop.
- Starlight Village: spaced trees/cottages so a house no longer sits inside a
  tree canopy near the wheel.
- Water wheel: added a mill pond so it sits in water, not on dry grass.

### Verification
- `node --check` clean on every touched JS file each step.
- Local `python3 -m http.server 5200` boot check; index + every new asset 200.
- Chris play-tested live and signed off ("overall it looks pretty good").

### Not done yet (still on the Update 1 list)
- Scenes 2–6 NOT re-checked for cottage/tree overlaps (only Starlight Village
  was fixed) — likely a few more "house in a tree" spots to space out.
- Weather richness (puddles/lightning), pacing slow-down, puzzle difficulty
  ramp, ending screen polish, dialogue polish.
- Optional art: distant village silhouettes, Chapter-1 ending picture.
- Save/load is still write-only (refresh restarts at Starlight Village) — left
  intentionally; Chris said "we can do it later."
