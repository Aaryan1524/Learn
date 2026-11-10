# Era 1 coverage review

Reviewed against the user's proposed **The Birth of Artificial Intelligence (1943–1959)** outline on 2026-11-09. Source snapshot: `codex/reading-and-figures` at `1bafde8`, before the Ballet heading change. This is a coverage review, not a claim that the proposed curriculum has been implemented.

## Finding

The five current lessons provide useful historical and mathematical groundwork. They do **not** satisfy the proposed goal of independently implementing and training a perceptron. The largest missing unit is supervised learning: the error signal, parameter updates, repeated training, separability, and the conditions for convergence.

The existing course identifies Part 1 as Foundations, 1930s–1956. The proposed outline extends its core to 1959 and introduces material previously assigned broadly to Part 3. That is a coherent editorial change, but page dates, outcomes, navigation, assessments, source metadata, and progress handling must change together when the extension is implemented. Merely changing the era label would misrepresent the current coverage.

The latest user instruction explicitly postpones Anatomy. Eight reserved stages are not eight completed visualizations, and quiz interactivity does not satisfy the requested live mathematical interactions.

## Requirement-by-requirement map

| Proposed requirement | Current status and evidence | What remains |
| --- | --- | --- |
| 1943 McCulloch–Pitts context | Partial: `/eras/foundations/logic`, `components/lesson-content.tsx`, introduces idealized all-or-none units and logic. | Explain their assumptions and contribution more fully; distinguish the historical model from the modern weighted teaching model. Full original article review remains pending. |
| 1950 Turing and imitation game | Covered at an introductory level: `/eras/foundations/imitation` explains the operational framing and separates observed behavior from broader claims. | A more explicit walkthrough of the original game would strengthen the historical account; preserve the distinction from the invented 20-conversation example. |
| 1956 Dartmouth | Covered at an introductory level: `/eras/foundations/dartmouth`, with the 1955 proposal date explicitly separated from the 1956 project. | Deepen the source companion's contribution, limitations, and subsequent influence without treating the proposal as achieved results. |
| 1958 Rosenblatt | Missing: no Rosenblatt lesson or source entry in `lib/course.ts`. | Add the historical motivation and contrast learned parameters with hand-written decisions. Do not conflate a paper's publication date with the entire development history. |
| Symbolic and connectionist approaches | Partial: Dartmouth mentions coexisting neural and symbolic threads. | Define both approaches, contrast their representations and how they are programmed or trained, give one small example of each, and explain their influence. |
| `z = w1*x1 + w2*x2 + b` | Partial: logic defines weighted inputs and `s >= theta`, with an arithmetic example. There is no explicit bias parameter. | Introduce `b`, derive the bias convention from `b = -theta`, and explain prediction at `z = 0`. Include examples with genuinely different weights and biases. |
| AND | Partial: all four cases, a worked output, fixed-threshold Python, and a question are present. | Teach finding weights and bias, not only evaluating chosen values. Add a learner construction exercise and its worked solution. |
| OR | Partial: threshold 1 is explained; code and the downloadable script produce the outputs. | Add the explicit OR truth table, bias-form arithmetic, and a parameter-finding exercise. |
| Boolean alarm example | Missing: the current practical example is a badge-and-PIN door. | Add the requested alarm scenario, state its Boolean rule precisely, and connect it to the same neuron calculation. |
| Neuron diagram, sliders, live outputs | Deferred: `threshold-unit` is a reserved figure brief, not a working neuron playground. | Later implement weight, bias, and input controls with a shared numerical model and accessible text trace. |
| Error and weight-update rule | Missing: `lib/models.ts` has no learning rule. | Explain `error = label - prediction`, each weight update, the bias update, and why a zero input yields no update to its weight. |
| Learning rate and repeated training | Missing. | Define the learning rate and epoch, show a numerical mistake-driven update, and distinguish one corrected prediction from successful training over the whole dataset. |
| Convergence conditions | Missing. | State the data, separability/margin, update convention, sampling, and learning-rate assumptions before a guarantee. Put the later mathematical reference outside the 1943–1959 timeline. |
| Python perceptron from scratch | Missing: `public/labs/foundations.py` contains tape tracing, fixed threshold gates, and entropy; it does not update parameters. | Add a plain-Python predictor and trainer, a line-by-line explanation, a complete AND run, and all four final predictions. Include a bounded epoch limit for failure cases. |
| Linear decision boundary | Missing as an explanation: the XOR proof uses inequalities, but no 2D boundary is derived or plotted. | Derive `w1*x1 + w2*x2 + b = 0`; cover orientation, parallel bias shifts, `w2 = 0` vertical lines, and the degenerate all-zero-weight case. |
| XOR | Partial: there is a valid contradiction argument for one threshold unit. `xor-boundary` is reserved. | Add the XOR truth table, the four labelled points, a geometric explanation, and a concrete hidden-layer construction or clear preview. No interactive plot exists yet. |
| Interactive training and boundary graph | Deferred/missing: no training model or training-specific slot currently exists. | Add the mathematical teaching unit first, then model-driven training and boundary figures when Anatomy work begins. Use an ordinary 2D plot where it explains the geometry better. |
| Exercises and final checkpoint | Partial: five multiple-choice questions with staged hints, per-option explanations, and worked answers exist in `lib/questions.ts`. The checkpoint reuses those questions. | Add the eight requested skills: weighted sum, activation, finding AND and OR parameters, one update, Python training, boundary interpretation, and XOR reasoning. Include numeric/code/self-explanation work; five reused questions do not establish those outcomes. |
| Primary papers | Partial: McCulloch–Pitts, Turing 1950, and Dartmouth are indexed, alongside Turing 1936 and Shannon 1948. | Rosenblatt 1958 and the later Novikoff convergence reference are absent. Build per-paper companions covering problem, contribution, novelty, limitations, and influence, with verified source locations. |
| Final learner outcomes | Not met as a set. | A learner can inspect fixed computations and logical thresholds, but cannot learn the perceptron update, train it, or interpret a boundary from the current material alone. |

## Exercise audit

1. **Calculate a weighted sum:** one substituted example, but no separate learner calculation with varied weights/bias.
2. **Apply the activation:** present as one selected-response item using a fixed threshold.
3. **Find AND weights/bias:** missing as a construction task.
4. **Find OR weights/bias:** missing as a construction task.
5. **Perform an update:** missing.
6. **Train in Python:** missing.
7. **Draw/interpret a boundary:** missing.
8. **Explain XOR:** an authored algebraic proof exists; learner geometry and explanation tasks are missing.

All existing quiz hints and solutions remain useful infrastructure. Completion must be checked by the new outcomes, not by the existing five-lesson progress meter.

## Recommended extension

Keep the 1936 computation lesson as a clearly labelled prelude and the 1948 information lesson as relevant foundations/context. Retain the current historical lessons and extend the path with:

1. **Strengthen Logic & early neurons:** explicit bias, both truth tables, varied arithmetic examples, the alarm scenario, and the symbolic/connectionist comparison or a direct link to its historical explanation.
2. **A neuron learns from mistakes (1958):** Rosenblatt, labels and predictions, update arithmetic, learning rate, repeated passes, and an inspectable training trace.
3. **Build a perceptron:** a complete plain-Python implementation with line-by-line explanation and a reproducible AND training run.
4. **What a line can separate:** decision boundaries, degenerate cases, XOR, the scope of a single-layer limitation, and a carefully labelled later convergence note.
5. **Expanded practice and checkpoint:** sample each required outcome with hints, worked answers, and targeted review links.

The exact lesson count can change. Do not duplicate the entire training unit in Part 3 later; Part 3 should build on it.

Before updating the public progress denominator, replace hard-coded counts, validate new lesson IDs, and migrate the versioned progress schema without discarding completed existing lessons. Tests currently explicitly expect five lessons, and several UI components contain `5` or `05`.

## Figure handoff additions, for later

- Extend `threshold-unit` to expose bias and make every multiplication, addition, comparison, and resulting output inspectable.
- Extend `xor-boundary` with labelled input points and the decision boundary; a conventional 2D plot can accompany Anatomy art.
- Add a dedicated perceptron-update brief that connects error, each parameter increment, and the changed prediction.
- Add a training-run brief with step/run/reset, a fixed initial state and example order, epochs/mistakes, and an explicit stop condition.

Do not add inactive sliders or invented training results while the figures are deferred. The present truth tables and written calculations stay available.

## Source verification boundary

This review inspected repository lesson content, metadata, figures, questions, models, and the downloadable script. It establishes content coverage, not learner comprehension or the historical correctness of new unwritten lessons.

The proposed Rosenblatt source is [the 1958 Psychological Review paper, DOI 10.1037/h0042519](https://doi.org/10.1037/h0042519). Publisher access was blocked during this review, so no unseen paper text has been represented as reviewed. The proposed Novikoff paper was located at an [institutional scan](https://cs.uwaterloo.ca/~y328yu/classics/novikoff.pdf), but retrieval timed out. Verify its title and distinguish the symposium date from the proceedings publication date before publishing its bibliographic entry. In all cases it is a later mathematical reference relative to the proposed 1943–1959 era.

The existing McCulloch–Pitts source review is still abstract-only. Avoid importing the original period's biological claims without checking the formal assumptions and evidence.
