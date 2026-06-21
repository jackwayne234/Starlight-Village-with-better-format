# Update 1 — What We Can Reuse From the First Iteration

Source repo: https://github.com/jackwayne234/Stormlight-Village (the first build, "A cozy puzzle game").
Current repo: Starlight-Village-with-better-format (V2, what we're working in now).

The current V2 game draws the apprentice and robot as **canvas shapes** and has **no audio at all**. The first build already has finished character art and a working sound system. We do NOT need to redo these.

---

## ✅ Strong reuse — grab these

### 1. Character art (real painted PNGs) — biggest "prettier" win
Finished, lovely art that can replace the canvas stick-figures.
- **Apprentice** (boy in teal raincoat with satchel): idle/rain-ready, walk-1, walk-2, plus a "schematic" pose.
- **Robot** (cute floating brass robot with glowing face): idle, and a "scan" pose with a light beam.
- Walk-1 + walk-2 + idle = a simple walk animation. Robot idle + scan = nice repair states.
- Each pose has 3 versions: `-source` (raw), `-alpha` (background removed), `-trimmed` (ready to use). **We use `-trimmed`.**
- Files live under `assets/sprites/characters/`.
- Note: files are large (~0.8–1MB each trimmed). Fine to start; we can shrink them later for faster loading.

### 2. Audio system (complete, self-contained) — covers our "full audio" goal
A clean 3-file sound engine plus one real sound file:
- `src/audio/audioManager.js` — plays sounds, handles volume, browser unlock-on-first-click.
- `src/audio/soundCatalog.js` — the list of sounds.
- `src/audio/weatherAudio.js` — ties thunder to lightning flashes.
- `assets/audio/weather/rolling-thunder-pixabay.mp3` — real rolling-thunder sound (free Pixabay license, credited).
- **Built-in sounds (made by code, no extra files needed):** steady rain loop, thunder rumble, robot chirp, repair-success chime, puzzle tile click.
- This basically delivers the "full audio" item from the north star almost for free. Main work is wiring it to V2's events (walk, rotate tile, repair done, lightning).

---

## 🟡 Reference / maybe reuse

### 3. Old per-scene canvas art renderers
`src/sceneRenderers/` (beacon hill, switchyard, stormridge, rainbarrel row, bridge) — older canvas drawings of each location.
- V2 already has its own newer, bigger `worldRenderer.js`. So these are a **look reference / idea source**, not a drop-in. Good to borrow nice details from.

### 4. Storm/weather controller
`src/storm/stormController.js` (small) and weather bits — reference for richer rain/lightning, but V2 has its own weather renderer. Borrow ideas, not code.

---

## ❌ Not reusable / skip
- No background/environment PNG art exists (both builds paint backgrounds with canvas code) — so scene backgrounds still get the canvas-polish treatment, no shortcut there.
- `-source` and `-alpha` sprite versions are working files; we only ship `-trimmed`.

---

## Suggested plan from this
1. **Drop in the audio system** — copy the 3 audio files + the thunder mp3, wire to V2 events. Big payoff, low risk.
2. **Swap canvas characters for the PNG sprites** — apprentice walk cycle + robot idle/scan. Biggest visual upgrade.
3. **Keep canvas-painting the backgrounds** (no asset shortcut), using old scene renderers as inspiration.
4. Optimize sprite file sizes later if load feels slow.

Everything above matches the Update 1 north star (prettier first, full audio, cozy, keep the 6 locations).
