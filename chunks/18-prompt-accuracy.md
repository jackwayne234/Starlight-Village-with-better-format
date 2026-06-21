# Chunk 18: Prompt and Message Accuracy

## Goal

Ensure on-screen prompts and instructions accurately describe the input the game actually
accepts.

## Scope

- `src/ui/hud.js`: the continue prompt reads "Press Space Bar to continue to the next scene",
  but `consumeRepairInput` also accepts Enter and E.
- Cross-check other prompt/instruction strings against the controls described in
  `index.html` (screen-reader instructions) and `README.md`.
- Adjust copy so prompts match real controls.

## Success Criteria

- Continue/advance prompt reflects all accepted keys (Space, Enter, E) or is worded to not
  mislead.
- No prompt contradicts `index.html` / README controls.
- Boot check passes; prompts read correctly during the reward state.

## Notes

Status: pending (requires start permission). Low-risk copy/polish (Q23). Confirm against
Chunk 16 inventory. Update README/HANDOFF only if controls wording changes (Q22).

## Completion Notes

_(to be filled in when the chunk runs)_
