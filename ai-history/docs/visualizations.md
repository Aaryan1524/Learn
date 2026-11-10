# Visualization handoff

The current edition reserves **29 visual spaces** across eight lessons. No figure artwork or controls are generated in this pass. Each space can later hold an image, annotated diagram, conventional plot, or interactive Anatomy figure. The reading layout keeps prose at a maximum 640px and gives figures the wider available canvas; frames collapse to the viewport width on phones.

`components/figure-slot.tsx` renders the frame. `lib/figures.ts` owns stable IDs, numbers, learning questions, subjects, draft scenarios, captions, and text equivalents. Each lesson starts with links to its visual spaces. The primary figure links directly to the worked example; the stable `#the-figure` lesson anchor remains available. A reserved space is not a working visualization.

| Lesson | Number | Stable slot | Learning question |
| --- | --- | --- | --- |
| computation | 01.1 | tape-machine | What changes in one step of a computation? |
| computation | 01.2 | machine-state | Can the same tape lead to different next steps? |
| computation | 01.3 | program-execution | How can the same rules act on different inputs? |
| logic | 02.1 | threshold-unit | Which inputs are enough to reach the threshold? |
| logic | 02.2 | weighted-inputs | Which input contributes to the score? |
| logic | 02.3 | bias-shift | How does bias change a decision without changing the features? |
| logic | 02.4 | gate-comparison | How can changing only the bias change the logical rule? |
| logic | 02.5 | alarm-rule | When should the alarm turn on? |
| logic | 02.6 | xor-boundary | Why can’t a single threshold express XOR? |
| information | 03.1 | message-space | How many binary answers identify one of four equally likely messages? |
| information | 03.2 | surprise-scale | Why does a rare event carry more surprise? |
| information | 03.3 | entropy-terms | Why must each surprise be weighted by its probability? |
| information | 03.4 | entropy-distribution | What happens to average surprise when one outcome becomes more likely? |
| imitation | 04.1 | conversation-test | What does a conversation score actually establish? |
| imitation | 04.2 | evidence-scope | Which conclusion is actually supported by a test? |
| dartmouth | 05.1 | research-threads | Which questions did the Dartmouth proposal bring together? |
| dartmouth | 05.2 | two-approaches | Where is knowledge represented in each approach? |
| perceptron | 06.1 | learning-loop | What changes when an example reveals a mistake? |
| perceptron | 06.2 | error-direction | Why can the update be positive, negative, or zero? |
| perceptron | 06.3 | parameter-update | Why does a zero input leave its weight unchanged? |
| perceptron | 06.4 | training-epochs | Why is one corrected example not enough? |
| perceptron | 06.5 | margin-condition | Which assumptions make the convergence statement possible? |
| build-perceptron | 07.1 | python-prediction | Which Python line performs each mathematical operation? |
| build-perceptron | 07.2 | python-training | What changes during the first and final training passes? |
| build-perceptron | 07.3 | test-all-inputs | Does the final model classify every AND example correctly? |
| decision-boundaries | 08.1 | linear-boundary | Which points lie on each side of z = 0? |
| decision-boundaries | 08.2 | boundary-motion | How do weights and bias move the boundary? |
| decision-boundaries | 08.3 | xor-points | Can one line separate alternating corners? |
| decision-boundaries | 08.4 | hidden-layer-xor | What changes when multiple threshold decisions are composed? |

## Build one meaningful figure at a time

Read the installed Anatomy skill before authoring Anatomy figures. Its current location is `/Users/aaryan/.agents/skills/anatomy/SKILL.md`; this authoring location is not a runtime dependency. The user explicitly deferred that work. No kit or artwork was copied.

Use the concept's own elements: tape cells and state, weighted contributions, probability outcomes, evaluation records, parameter updates, and labelled points. Use an ordinary two-dimensional plot for decision geometry when it explains the idea better. The historical source map may also work better as a conventional diagram. Draft rung values and generic scenario labels are starting points, not finished object briefs.

For each finished figure, complete the brief in root Reference.md §5: inputs and shapes, valid ranges, scenarios, expected values, model invariants, controls, reset, keyboard/touch equivalents, nonvisual explanation, reduced motion, fallback, and precise source locations. The model must drive readouts and highlighted mathematics. Preserve the existing slot ID, title, caption, and nearby worked text when replacing a reserved stage.

## Arithmetic and training models are ready

- `lib/models.ts`: tape transitions, fixed threshold units, finite entropy.
- `lib/perceptron.ts`: individual weighted products, score, prediction, immutable error/update terms, deterministic training history, and line/vertical/constant boundary cases.
- `lib/perceptron-code.ts` and `public/labs/perceptron.py`: identical displayed/downloadable reference trainer, verified against the TypeScript model.

Prioritize visible input → multiplication → addition → bias → threshold traces, then one error/update step, followed by epoch-by-epoch training. For geometry, show the positive side, the equality convention, vertical and degenerate cases, XOR's shared midpoint, and the hidden-layer construction. Keep every operation connected to the same current parameters.

Current resting examples are reproducible: AND weights (1,1), bias −1.5; OR (1,1), bias −0.5; a mistaken update from zeros on input (1,0), label 0, rate 0.5; and a zero-start AND training run at rate 1 in order 00,01,10,11. That trainer succeeds after five passes at weights (2,1), bias −3. XOR is capped, and the text explains why a cap alone is not a nonseparability proof.

Keep static geometry server-side and pass it to an eventual client controller. Preserve the same resting pose at hydration and stable keys on server-built artwork. Scope figure CSS and avoid motion outside the figure. No inactive sliders, fabricated live readouts, or pretend run buttons appear in the current frames.
