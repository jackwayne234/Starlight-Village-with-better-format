# Chunk 16: Full Issue Inventory

## Goal

Read every source file end to end and produce the authoritative, categorized backlog of
issues that the fix chunks (17+) will draw from and be re-scoped against.

## Scope

- Read all of `src/**`, including all six `src/scenes/chapterOne/*.js` files and every
  renderer in `src/rendering`.
- Categorize findings: functional bugs / behavior / hygiene / low-risk polish.
- Optional throwaway Node script to load each puzzle layout from `repairPuzzle.js` and verify
  every Chapter-1 puzzle is solvable from its starting rotations (deterministic check, beats
  manual rotation).
- No source edits in this chunk.

## Success Criteria

- A written issue inventory exists, grouped by category, each item tied to file/line.
- If used, the solvability script confirms all seven puzzle layouts are solvable.
- The fix chunks (17+) are confirmed or re-scoped against this inventory.

## Notes

Status: pending (requires start permission). Discovery-only chunk. Any helper script is a
throwaway sanity check, not committed to the repo unless it proves reusable. There is no
existing test harness to reuse — repo has no package.json, linter, or test runner.

## Completion Notes

_(to be filled in when the chunk runs)_
