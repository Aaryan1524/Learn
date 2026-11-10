# Contributing

Start with `docs/Reference.md` (a copy of the repository root specification), `docs/BUILD_PLAN.md`, and `docs/PROGRESS.md`. Work on Part 1 before writing later-era lessons.

For an explanation or historical correction, identify the learning outcome, exact claim, primary source and section, and what the source establishes. Preserve publication dates separately from later uses. Test worked numerical examples.

For a UI change, explain the changed learner behavior, check the relevant model and type checks, and verify keyboard, phone, and both-theme behavior when browser tools are available. Record unavailable checks honestly.

For a figure, start with `docs/visualizations.md`. Keep numerical models independent from presentation and preserve nonvisual equivalents.

Run `npm test`, `npm run typecheck`, `python3 public/labs/foundations.py`, and `npm run build` inside `ai-history/`. Core reading must not require an account, payment, or API key. Keep learner answers on their device.
