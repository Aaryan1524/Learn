# Visualization handoff

The current pass reserves eight figures and does not generate artwork. The reading layout keeps prose at a maximum 640px and gives figures the wider available canvas. They collapse to the viewport width on phones.

`components/figure-slot.tsx` is the server-rendered frame. `lib/figures.ts` contains stable IDs, learning questions, subjects, draft scenarios, captions, and text equivalents. Each placeholder has a figure number, title, reserved stage, and caption. Primary figures link straight to their worked example so readers can skip the empty space.

| Lesson | Number | Stable slot | What it should explain |
| --- | --- | --- | --- |
| Computation | 01.1 | tape-machine | Scanned symbol, write, move, and control transition |
| Computation | 01.2 | machine-state | Why tape contents alone do not determine the next step |
| Logic | 02.1 | threshold-unit | Weighted inputs, sum, threshold, and binary output |
| Logic | 02.2 | xor-boundary | The contradictory requirements for XOR in one linear threshold unit |
| Information | 03.1 | message-space | Four equally likely messages identified by two binary answers |
| Information | 03.2 | entropy-distribution | Fair, biased, and certain distributions and their weighted surprise |
| Imitation | 04.1 | conversation-test | A specified evaluation protocol and the limits of its score |
| Dartmouth | 05.1 | research-threads | Research questions and documents converging into a proposal |

Primary figures sit between motivation and the worked explanation, with the stable `#the-figure` anchor preserved. The first three lessons also have a companion figure beside the reasoning it explains. Home and overview stay lightweight.

## Before creating artwork

Read the installed Anatomy skill, then the closest example. The current reference is `/Users/aaryan/Documents/Projects/Anatomy/SKILL.md`; this is an authoring location, not an application dependency. The `test-rig/figure.tsx` frame and `references/react.md` informed the placeholder structure. No kit or drawing code is copied.

Use the concept’s own elements: tape cells and state, weighted contributions, probability outcomes, and evaluation records. The historical source map may be better as a conventional visualization; do not force an isometric metaphor onto it. The draft rung values in metadata are editorial starting points, not finalized object briefs.

For every finished figure, complete the brief in root Reference.md §5: inputs and shapes, valid ranges, scenarios, expected values, model invariants, controls, reset, keyboard/touch equivalents, nonvisual explanation, reduced motion, fallback, and precise source locations. The model must drive readouts and highlighted mathematics. Existing numerical models live in `lib/models.ts` and have meaningful tests.

Keep static geometry server-side and pass it to the eventual client controller. Preserve the same resting pose at hydration and stable keys on server-built artwork. Keep the existing `data-figure-slot`, figure title ID, and caption when replacing a stage. Scope figure CSS and avoid animations outside the figure.

There are no pretend sliders, live values, or run buttons in the current reserved spaces.
