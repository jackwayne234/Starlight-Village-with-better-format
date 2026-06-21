# Chunk 22: Rendering Polish and Safety

## Goal

Apply low-risk rendering correctness and feel fixes surfaced during discovery without
changing the art direction.

## Scope

- `src/rendering/*.js` and `src/ui/hud.js`: check for canvas state leaks (e.g. `globalAlpha`
  or transforms set without a matching `save`/`restore`), text-wrap edge cases, and any
  obviously wasteful off-screen drawing.
- Keep changes surgical and behavior/visual-preserving except where a fix removes an artifact.

## Success Criteria

- No canvas state left in a modified state between draws.
- Text wraps correctly in dialogue, message, and chapter-complete panels.
- Boot + visual click-through shows no console errors and no obvious artifacts.

## Notes

Status: pending (requires start permission). Low-risk polish (Q23); confirm against Chunk 16.
Match nearby style (Q15); shared helpers handled in Chunk 23.

## Completion Notes

Confirm-only — no code changes needed. Checked:

- `ctx.save()`/`ctx.restore()` are balanced in every render file (actorRenderer 3/3,
  renderPipeline 1/1, worldRenderer 17/17, hud 8/8; backdrop and weather use none).
- Every `globalAlpha` assignment sits inside a save/restore (and `drawTravelDots` resets it
  to 1 explicitly).
- `setLineDash` and `globalCompositeOperation = "screen"` are each scoped inside a
  save/restore and/or explicitly reset.
- Text wrapping (`wrapText`) is only ever called with real string inputs (flow.message,
  guarded dialogue text, chapterComplete copy, reaction text) — no null/undefined paths.

No leaks or artifacts found. Off-screen culling intentionally not added (scene sizes are
small; adding it would be unnecessary complexity for no benefit).

Status: complete (no changes required).
