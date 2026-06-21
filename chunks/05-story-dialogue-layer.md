# Chunk 5: Story and Dialogue Layer

## Goal

Add lightweight character and story texture without burying the game under text.

## Scope

- Robot callouts.
- Apprentice flavor lines.
- Discovery text.
- Optional dialogue bubble presentation.
- Scene-specific story beats.

## Success Criteria

- Dialogue clarifies intent and adds warmth.
- Text appears at the right moments and does not interrupt movement too often.
- Story content lives in scene data or a focused story/dialogue module.
- The repair loop remains the center of the interaction.

## Notes

Short lines will probably work better than long conversations at this stage.

## Completion Notes

- Added lightweight dialogue state to scenes.
- Added short scene-specific robot and apprentice lines for scan, puzzle, reward, and handoff beats.
- Added timed dialogue triggers in the repair flow.
- Added HUD dialogue bubbles anchored to the player or robot by world position.
- Kept instructional HUD messages separate from flavor dialogue.
- Verified dialogue triggers and render smoke.
