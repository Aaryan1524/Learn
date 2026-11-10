# Progress — Part 1, first authored edition

## Implemented

- Anatomy-inspired plain layout (see decisions.md, redesign): grayscale tokens, Inter + EB Garamond, sticky rail with per-lesson section index, top bar and Contents drawer on small screens, dark/light/system theme, visible focus, and reduced-motion support.
- Homepage, overview, five foundation lessons, checkpoint, eight planned-era overviews, reading room, glossary, notation bridge, about, progress, and 404 page.
- Worked tape trace, threshold truth tables and XOR argument, finite entropy examples, toy evaluation protocol, and proposal/source analysis.
- Per-option misconception feedback, staged hints, worked answers, outcome-level checkpoint feedback, and optional self-reflection.
- Published-content search, three reading depths, opened/completed/attempted distinctions, local resume, and validated progress export/import/reset.
- Numbered visualization slots deliberately left for the author; textual examples remain available.

## Verification observed

- TypeScript type checking passed.
- Seven Node tests passed: state traces, blank input, threshold boundaries, entropy limits/symmetry, progress round trip, malformed imports, and reference integrity.
- Downloadable Python examples ran successfully with the same worked numbers.
- 24 local HTTP checks passed, including all reading routes, intended 404, and Python download. Verified one h1, main landmark, local section anchors, required lesson sections, original content, and entropy MathML.
- Sites/Vinext production build completed successfully. Final packaging records the exact source revision separately.

## Remaining release evidence

- Redesign checked in a headless browser: desktop (1440) and mobile (390) layouts, dark theme, quiz feedback, no console errors, no horizontal overflow. Live focus behavior, storage-denied behavior, and screen-reader verification are still unverified. No claim of WCAG conformance.
- Independent learner review has not occurred.
- McCulloch–Pitts publisher abstract reviewed; full primary article review remains pending.
- Final interactive visualizations are deferred by the user, not counted as complete.
- Numerical reading-time and browser performance claims are intentionally omitted; no measurements were fabricated.

Part 1 is implemented as a reviewable first edition. It has not met the reference’s full final-era acceptance gate. Do not begin full Part 2 production until the remaining relevant evidence is resolved or the maintainer adjusts that scope.

## Reading and future-figure pass — codex/reading-and-figures

Implemented a 640px prose measure inside a wider canvas, stronger title/body hierarchy, shorter lesson setup, contextual notes, bibliographic sources, explicit active navigation markers, and eight reserved figure stages. The main mechanism now appears between motivation and the worked example. Existing lesson section anchors, reading depths, practice, and progress are retained.

New verification: all eight Node tests passed, including brief/reference integrity; type checking passed. Sixteen HTTP checks passed for redesigned pages and the intended 404, with unique IDs, valid same-page links, correct figure counts, and the intended reading order. The production build completed successfully.

Browser access returned unavailable. Native browser access was attempted, but the user was actively changing the browser and the action was rejected; no unrelated page was changed. Fresh desktop/phone screenshots, reflow, theme appearance, and browser interaction checks remain unverified for this pass. The previous redesign's browser evidence does not validate these new layout changes. Independent learner and screen-reader review remain pending. Figure art and controls are deferred by the user.
