# Chunk 6: Save, Progress, and Chapter Flow

## Goal

Track completed work and support clean Chapter 1 progression.

## Scope

- Completed repair tracking.
- Chapter or scene unlock state.
- Restart behavior.
- Save/load approach.
- Simple transition from one area to the next.

## Success Criteria

- Completed repairs persist if save support is added.
- Chapter flow is understandable from code and from play.
- Save data stays small and versionable.
- Progress logic does not leak into rendering.

## Notes

Local browser storage is likely enough until the game needs a larger save model.

## Completion Notes

- Added local browser storage progress support.
- Saved completed repair ids and active repair progress state only when repair state changes.
- Restored completed repairs on startup.
- Restored the active target to the first incomplete repair after reload.
- Added a simple `R` reset path for testing and restarting the slice.
- Verified save, load, all-complete, and clear behavior with mocked browser storage.
