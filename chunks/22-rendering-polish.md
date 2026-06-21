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

_(to be filled in when the chunk runs)_
