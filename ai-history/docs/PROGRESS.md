# Progress — Part 1

## Current expansion — 2026-11-09

Implemented the requested 1943–1959 curriculum in eight lessons, including an explicit 1936 prelude. The path now covers artificial-neuron arithmetic and bias, full AND/OR tables and an alarm rule, symbolic/connectionist approaches, Rosenblatt and the perceptron update, a complete plain-Python trainer and five-pass AND trace, convergence assumptions, linear decision boundaries, XOR's impossibility, and a hand-constructed hidden-layer solution. Historical dates and later mathematical references are distinguished.

There are 29 named, numbered visual spaces across the lessons: 3 computation, 6 logic, 4 information, 2 imitation, 2 Dartmouth, 5 learning, 3 Python, and 4 geometry/XOR. Each space has a learning question, caption, stable ID, brief, and adjacent text explanation. A per-lesson index links to them. Images, plots, Anatomy artwork, and live figure controls remain deferred by the author.

Eight conceptual questions and eight numeric/construction exercises include hints, worked solutions, and targeted review links. The final checkpoint includes all 16 plus a self-assessed Python implementation. Old five-lesson progress retains opened/completed/last lesson records; only the expanded checkpoint attempt resets. All completion counts derive from the current lesson list. Ballet remains the main-title family.

### Verification of this expansion

- 18 Node tests passed, including exact training history, threshold equality, AND/OR/XOR behavior, update arithmetic and immutability, degenerate boundaries, old progress migration, equivalent numeric answers, and displayed/downloadable Python parity.
- The tests execute the Python reference and compare its complete AND trace and final predictions with TypeScript. AND succeeds in five passes at weights (2,1), bias −3; the capped XOR run reports failure as expected.
- TypeScript type checking and the Sites/Vinext production build passed on the final application changes.
- 26 HTML routes passed local HTTP checks, including all eight lessons, all planned-era overviews, sources, checkpoint, and intended 404. Each has one h1 and main landmark, unique IDs, and valid same-page links. All 29 figure numbers follow reading order. Eight numeric forms and five required paper companions render.
- Both Python downloads and the local Ballet font were served successfully. Git whitespace validation passed.
- Reviewed the McCulloch–Pitts introduction/formal assumptions and Rosenblatt's institutional scan. Novikoff's direct scan remains unavailable; its citation and the modern convergence statement are supported by the linked Freund & Schapire paper. See qa/source-review.md.

### Remaining limits

Fresh browser inspection returned “browser access host is unavailable.” Desktop/mobile appearance, focus behavior, interactive form behavior in a browser, storage-denied behavior, and screen-reader use are not claimed as verified for this pass. Independent beginner review is still pending. Reserved figures do not satisfy the original live-visualization acceptance criteria. Part 2 remains planned.

Local preview remains available at http://127.0.0.1:5173. Hosted publication provenance is stored in the ignored .sites-runtime/last-deployment.json after a successful deployment.

## Earlier passes — historical record

### Initial edition — implemented

- Anatomy-inspired plain layout (see decisions.md, redesign): grayscale tokens, Inter + EB Garamond, sticky rail with per-lesson section index, top bar and Contents drawer on small screens, dark/light/system theme, visible focus, and reduced-motion support.
- Homepage, overview, five foundation lessons, checkpoint, eight planned-era overviews, reading room, glossary, notation bridge, about, progress, and 404 page.
- Worked tape trace, threshold truth tables and XOR argument, finite entropy examples, toy evaluation protocol, and proposal/source analysis.
- Per-option misconception feedback, staged hints, worked answers, outcome-level checkpoint feedback, and optional self-reflection.
- Published-content search, three reading depths, opened/completed/attempted distinctions, local resume, and validated progress export/import/reset.
- Numbered visualization slots deliberately left for the author; textual examples remain available.

### Initial edition — verification

- TypeScript type checking passed.
- Seven Node tests passed: state traces, blank input, threshold boundaries, entropy limits/symmetry, progress round trip, malformed imports, and reference integrity.
- Downloadable Python examples ran successfully with the same worked numbers.
- 24 local HTTP checks passed, including all reading routes, intended 404, and Python download. Verified one h1, main landmark, local section anchors, required lesson sections, original content, and entropy MathML.
- Sites/Vinext production build completed successfully. Final packaging records the exact source revision separately.

### Initial edition — remaining evidence at that time

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

## Ballet titles and proposed Era 1 scope review

Main page titles now use the self-hosted Ballet optical-size variable font at weight 400 and normal style. Main text, metadata, equations, and navigation retain their reading fonts. The font is pinned and its OFL notice is included.

The detailed coverage review is `docs/qa/era-1-coverage.md`. The existing Part 1 does not meet the newly supplied goal of training a perceptron from scratch: explicit bias, learning updates, training, geometric decision boundaries, the Rosenblatt source, the later convergence reference, and expanded exercises remain to be added. Eight figure placeholders do not count as completed interactive teaching. Anatomy remains deferred per the latest user instruction. The current era label and completion counts have not been changed to imply that the proposed expansion is implemented.

Verification for Ballet: TypeScript and the production build passed. The overview and logic lesson returned HTTP 200; the local variable WOFF2 and OFL notice were served successfully. The packaged font exactly matches the authored public asset. Fresh browser visual review remains unavailable, so calligraphic title wrapping and appearance on desktop/phone are not claimed as visually verified.
