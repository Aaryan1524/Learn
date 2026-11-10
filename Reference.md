# Reference.md — An Interactive History of AI

> Master teaching and product specification for a new open-source learning website.
> Prepared November 9, 2026. Research snapshot: November 9, 2026.
> Intended readers: maintainers, educators, designers, Codex CLI, and Claude Code.

**Navigation:** [Teaching method](#3-the-teaching-method-and-its-visible-website-behavior) · [Website experience](#4-website-experience-and-design-direction) · [Anatomy](#5-anatomy-integration-and-visualization-standards) · [Nine-era map](#6-flexible-nine-era-curriculum) · [Practice](#7-practice-feedback-and-mastery) · [Experiments](#8-runnable-experiments-and-reproducibility) · [Research library](#9-research-sources-and-paper-reading-policy) · [Architecture](#10-suggested-technical-architecture) · [Implementation phases](#11-phased-implementation-one-part-at-a-time) · [Agent handoff](#12-coding-agent-handoff) · [QA and completion](#13-qa-and-definition-of-done).

## 1. How to use this document

Put this file at the root of the new repository as `Reference.md`. Read it before planning or implementing a part of the course. Its primary purpose is to preserve **how the course should teach**, and to make those teaching principles visible in the website.

The nine-era curriculum below is a flexible editorial map. Suggested topics, papers, experiments, and visualizations are starting points. They are not a fixed script, a required lesson count, or an instruction to implement every example. Authors may split, combine, replace, or deepen lessons when doing so improves understanding. Record significant scope changes in `docs/decisions.md`.

The teaching standards, accessibility requirements, scientific accuracy requirements, and completion gates are acceptance criteria. A visually polished page does not compensate for a mathematical explanation that a learner cannot follow.

**Build and finish Part 1 before beginning full production of Part 2, then repeat through Part 9.** Build only the shared platform needed for the current part. A roadmap for a later era may exist before its lessons do, provided its status is clear.

### Continuity with the earlier course

The originating conversation is *Teach AI Technically*. The learner understood the broad ideas but found the mathematics after Part 3 too compressed. The website should solve that problem through patient explanations, visible intermediate steps, connected representations, and practice.

The retrieved conversation explicitly identifies Era 7 as AI systems, Era 8 as reasoning and agents, and Era 9 as frontier research. Full earlier-era lessons were not available in the retrieved material. The names and boundaries proposed here for Eras 1–6 are an editorial reconstruction, not a claim to reproduce missing lessons verbatim.

### Requirement language

- **Must:** required for acceptance.
- **Should:** the default; explain a material deviation.
- **Could / suggested:** an option to consider, not a mandatory content item.

When a specific example conflicts with a general teaching principle, preserve the principle and improve the example.

## 2. Purpose, audience, and learning outcomes

Create a free, public, interactive textbook that explains how AI developed, why each major approach mattered, how its mathematics works, and what its limitations revealed. History should provide a reason to learn the next concept rather than function as a separate list of dates.

The core technical pathway targets a motivated learner with Calculus II, introductory linear algebra, and basic differential equations. Do not assume this learner already knows probability, statistical inference, multivariable gradients, optimization, information theory, or reinforcement learning. Teach those prerequisites where needed.

Readers with less mathematics should still be able to follow the conceptual pathway and receive a clear route into the prerequisites. Readers with more experience should be able to move directly to derivations, code, and original papers. Do not promise that one presentation guarantees complete understanding for everyone; design ways to detect confusion and help the reader recover.

By the end, a learner should be able to:

1. Explain the major shifts in AI research and connect each shift to a problem that earlier methods struggled with.
2. Read a central equation, define its symbols, check its dimensions, and explain the computation in ordinary language.
3. Derive important results with stated assumptions and implement small working versions.
4. Use experiments to test claims, compare baselines, and recognize misleading measurements.
5. Distinguish a model from the larger system that retrieves information, uses tools, remembers state, and evaluates results.
6. Explain the difference between behavioral evidence, representation analysis, and a causal intervention.
7. Read a research paper critically and identify what its evidence supports, what it leaves uncertain, and what would test the claim next.

### Product priorities

1. Comprehension and correctness.
2. Accessible, dependable interactions.
3. Useful examples, practice, and feedback.
4. Clear navigation and continuity.
5. Visual craft and performance.

These priorities work together. If a drawing conceals the calculation or makes a simple relationship harder to see, redesign it.

## 3. The teaching method and its visible website behavior

### 3.1 The recurring learning sequence

Use the following rhythm throughout the course, adapting it to the subject. A historical reading does not need artificial equations; a mathematical mechanism deserves a complete derivation.

| Teaching principle | What the learner should see on the website | Authoring requirement |
| --- | --- | --- |
| Start with a need | A short question, failure, or task that the lesson will resolve | Explain why the idea was needed before naming its machinery |
| Establish intuition | A plain-language account with a concrete example | Introduce vocabulary in context; identify an analogy's limits |
| Ask for a prediction | A small prompt before an interaction runs | Give the learner something specific to notice |
| Let the learner investigate | Controls, named scenarios, a reset, and visible results | Controls must change meaningful quantities in the actual model |
| Develop the mathematics gradually | Expandable steps, a symbol glossary, shapes, and worked numbers | Explain each transformation and its assumptions |
| Connect representations | A shared state reflected in the figure, equation, table, and code trace | Use one source of numerical truth |
| Implement the idea | A short executable example and an explanation of its output | Start from the algorithm before introducing framework conveniences |
| Practice with support | Questions, staged hints, worked solutions, and another attempt | Feedback explains the misconception and offers a next step |
| Return to the original question | A concise explanation of what the method now makes possible | Include a case where it fails or its assumptions break |
| Prepare the next idea | A short transition and prerequisite links | Explain why the next approach becomes useful |

Teach the same central idea through words, a visual, mathematics, and implementation. Do not write four disconnected explanations that happen to share a heading.

### 3.2 Progressive depth without fragmented courses

Use three reader-selectable levels of detail within a shared lesson:

- **Explore:** the motivation, main mechanism, a meaningful interaction, and a conceptual check.
- **Understand:** the full explanation, worked mathematics, and guided exercises. This is the default technical pathway.
- **Build and investigate:** implementation, paper reading, ablations, and open-ended extensions.

These are display preferences and reading aids, not judgments of ability. Preserve URLs when the reader changes depth. Give collapsed sections descriptive names such as “Show the chain-rule steps.” Keep the core reasoning visible; do not hide all explanations behind repeated clicks. Search and direct links must still reach expanded material.

### 3.3 The mathematics contract

For every central equation, authors must provide:

1. The question the equation answers.
2. The meaning of every new symbol, including indices and notation such as an expectation.
3. The type and shape of its quantities: scalar, vector, matrix, probability, sequence, or function.
4. Assumptions and valid domains, including relevant boundary cases.
5. A derivation in small justified steps. Name the algebraic or calculus rule when it is new.
6. A small numerical example with enough intermediate values to reproduce it by hand.
7. A connection to the corresponding interaction and implementation.
8. A reasonableness check: dimensions, probability sums, limiting behavior, or a numerical gradient check.
9. At least one likely mistake and an explanation of why it is wrong.

“By the chain rule,” “it can be shown,” and “after some algebra” are insufficient when they conceal the lesson's central difficulty. Those phrases may introduce a step only if the missing work is available immediately beside it.

Define scalar derivatives before partial derivatives, partial derivatives before gradients, and vector–Jacobian products before relying on them in backpropagation. Teach conditional probability and expectation before objectives that use them. Present a finite sum before an integral when that makes the idea easier to understand.

Keep a consistent default convention: individual feature vectors are columns; batched examples may be rows when the displayed matrix operations say so explicitly. Show shape annotations at the point of use. Do not silently switch conventions between lessons.

Differential equations are a helpful bridge for continuous dynamics and optional diffusion material. They are not a reason to assume familiarity with stochastic calculus. Advanced topics need their own short prerequisite bridge and an optional deeper treatment.

### 3.4 An example of the expected explanatory depth

This example establishes a style standard. It is not required lesson copy.

**Question:** How should a one-parameter predictor change when it predicts too little?

For one example, let the input be `x = 2`, the target `y = 6`, and the prediction `ŷ = wx`. Start with `w = 1`, so `ŷ = 2`.

Choose the squared-error loss:

\[
L=\tfrac12(\hat y-y)^2.
\]

The factor `1/2` makes the derivative simpler; it does not change the minimizing weight. Define the intermediate error `e = ŷ − y = −4`, so the initial loss is `8`.

Now differentiate one operation at a time:

\[
\frac{\partial L}{\partial e}=e,
\qquad
\frac{\partial e}{\partial\hat y}=1,
\qquad
\frac{\partial\hat y}{\partial w}=x.
\]

Multiplying along this dependency gives:

\[
\frac{\partial L}{\partial w}
=\frac{\partial L}{\partial e}
\frac{\partial e}{\partial\hat y}
\frac{\partial\hat y}{\partial w}
=(-4)(1)(2)=-8.
\]

A small positive change in `w` therefore lowers the loss near this point. With learning rate `η = 0.1`, the update is `w_new = w − η ∂L/∂w = 1.8`. The new prediction is `3.6` and the new loss is `2.88`.

On the website, the same state should update the plotted prediction, the loss, the substituted equation, and the code trace. Ask the learner to predict the direction first. Then let them increase the step size and discover that larger steps need not improve the loss. A second example and an exercise should follow before introducing a multilayer network.

The lesson author must reproduce these numbers in a model test. A screenshot showing a plausible downward arrow is not verification.

### 3.5 Prerequisite support

Create a small, searchable prerequisite library. Add a bridge when an active lesson needs it; do not delay Part 1 to build an entire mathematics textbook.

Suggested bridges include:

| Bridge | Purpose and later connections |
| --- | --- |
| Functions, notation, sums, and logarithms | Read objectives, count operations, and understand log probabilities |
| Vectors, dot products, norms, and matrix multiplication | Understand linear predictors, embeddings, and attention |
| Derivatives, partial derivatives, and the chain rule | Follow optimization and backpropagation |
| Probability, conditional probability, Bayes' rule, and expectation | Understand uncertainty, maximum likelihood, and RL |
| Likelihood, cross-entropy, entropy, and KL divergence | Connect predictive training, generative models, and alignment objectives |
| Eigenvectors, projections, rank, and least squares | Understand representations, low-rank adapters, and feature directions |
| Optimization, constraints, and regularization | Understand training behavior and tradeoffs |
| Sampling, variance, confidence intervals, and experimental controls | Interpret evaluations and avoid overclaiming |
| Markov processes and returns | Prepare for sequential decision-making and world models |
| Continuous dynamics and numerical integration | Optional bridge to ODE views and continuous-time generative models |

Each bridge needs an intuitive explanation, one worked example, a quick diagnostic, and a return link to the originating lesson. A learner should not lose their reading position after taking a detour.

### 3.6 Historical and scientific teaching rules

- Present eras as overlapping research threads. A method's placement is a teaching choice, not its invention date.
- Separate the original publication date, later revisions, and the period of widespread application.
- Explain the roles of data, computing, evaluation, institutions, and competing approaches without reducing history to a single inventor or a smooth march of progress.
- Describe limitations precisely. For example, a limitation of a single-layer linear classifier is not a proof that all neural networks fail.
- Pair a paper's contribution with the assumptions, task, and evidence that support it.
- Distinguish a theorem, an empirical observation, an interpretation, a disputed claim, and an open question.
- Credit relevant earlier work; avoid unsupported claims that a particular paper was the first or that one event alone caused an AI winter.
- Explain a toy experiment's simplifications before drawing conclusions about a larger system.

## 4. Website experience and design direction

### 4.1 Reference and what to take from it

Use [Anatomy](https://skills.wheresryan.sh/anatomy) as visual and editorial inspiration. The inspected page uses numbered sections, a persistent section index, generous spacing, restrained typography, detailed interactive figures, and nearby explanation and readouts. Its published credits name Inter and EB Garamond.

Adapt those qualities to a learning textbook: a quiet reading surface, easy movement between sections, and figures that reward attention. The course needs its own identity, wording, educational components, and drawings. Reference the source and retain applicable attribution when reusing licensed kit code.

The following layout and behavior are product proposals for this website, rather than claims about features on the reference site.

### 4.2 Information architecture

Suggested routes:

```text
/
/start
/eras
/eras/[era]
/eras/[era]/[lesson]
/prerequisites/[topic]
/glossary
/papers
/labs/[lab]
/about
/contribute
```

The homepage should explain the promise, show the nine-era journey, offer a clear first lesson, and let returning readers resume. Avoid putting nine expensive animations on the homepage.

An era overview should show its driving question, historical context, learning outcomes, prerequisites, lesson sequence, expected effort as a tested estimate, checkpoint, and publication status.

A lesson page should provide:

- A breadcrumb, era and lesson title, outcomes, prerequisites, and an estimated effort range.
- A readable article column with the learning sequence from Section 3.
- On desktop, an era/lesson navigation rail and an on-page contents index when space permits.
- On mobile, accessible navigation drawers and a compact contents control that leave the reading area usable.
- Stable section anchors, previous/next links, and a visible route back to the era overview.
- Local learning progress and an explicit way to mark a lesson complete.
- Sources attached to the claims or sections they support.
- A way to report a confusing explanation or factual error, preferably linking to a repository issue template.

Suggested lesson section names include “Why this idea,” “Try it,” “Work through the math,” “Build it,” “Check your understanding,” “Where it fails,” and “Read the paper.” Adapt the names where a different phrasing teaches better.

### 4.3 Visual system

- Use a warm, restrained light theme and a carefully tested dark theme, with system preference and a persistent manual override.
- Choose a highly readable prose face and a clear interface face; self-host licensed fonts when practical. The reference's serif/sans pairing is inspiration, not a dependency.
- Aim for roughly 60–75 characters per line, comfortable line height, clear heading hierarchy, and generous separation between reasoning steps.
- Use monospace selectively for code, shapes, controls, and numerical readouts.
- Make equations and code readable at phone widths. Local horizontal scrolling is acceptable for intrinsically wide expressions; the whole page must not overflow.
- Reserve accent color for selected concepts, changes, and linked states. Pair color with labels, shapes, or text.
- Prefer calm, purposeful motion and small state changes. Avoid scroll hijacking and decorative motion that competes with reading.
- Keep controls and explanations outside dense Anatomy drawings. Ordinary charts may use conventional axes and labels.
- Design empty, loading, error, reset, and unavailable-content states as deliberately as successful states.

Define semantic tokens for surfaces, text, borders, focus, math highlights, scenarios, and feedback. Do not scatter unexplained color values across components.

### 4.4 Navigation, search, and progress

Search should cover published lessons, prerequisites, glossary terms, and papers. Results should reveal the era, section, and a useful excerpt. Unpublished lessons must not appear as finished results.

Store progress locally in the first release. Distinguish “opened,” “marked complete,” and “checkpoint attempted”; scrolling to the bottom is not proof of understanding. Offer export, import, and reset. Version stored data so content changes do not silently corrupt progress. Handle unavailable storage gracefully.

Checkpoints should recommend readiness and explain weak areas. Readers must remain free to browse later material. The development gate between eras is separate from any learner progress indicator.

No account, payment, API key, or language-model access should be required to read the core course or complete its basic interactions.

## 5. Anatomy integration and visualization standards

### 5.1 Skill location and invocation

The user supplied an installed skill at:

```text
/Users/aaryan/Documents/Projects/Anatomy/SKILL.md
```

That is a machine-specific reference, not a path to hardcode in the new application. Coding agents should discover the installed Anatomy skill in their environment, read its `SKILL.md`, and locate its kit, references, and examples. In Codex, request `$anatomy`; in an environment exposing slash skills, `/anatomy` may be the appropriate invocation. Confirm availability locally instead of assuming a command installs or activates it everywhere.

The public [Anatomy source](https://github.com/wheresryan22/anatomy) and [website](https://skills.wheresryan.sh/anatomy) are portability references. Record the actual upstream revision and license when copying the kit. The supplied skill identifies an MIT license; preserve the license and notices for the exact files used.

### 5.2 What Anatomy should do in this course

Use Anatomy for selected mechanisms that benefit from a crafted, interactive isometric explanation. Use a conventional plot, table, matrix, or code trace when that representation better answers the learner's question.

For an abstract AI concept, start with its own mathematical elements: token positions, matrix entries, graph nodes, feature vectors, or computational operations. If the drawing gives them physical form, clearly explain the representation. It must not suggest that an abstract feature is literally a physical neuron or that geometry proves a model's interpretation.

Apply the skill's object-selection ladder:

1. Draw the real subject if it is physical.
2. Otherwise build the concept's own established elements as tangible parts.
3. Use an analogy only when the first two choices do not explain it well; document a one-to-one mapping and where it breaks.

Every moving part must have an educational meaning. Supporting craft details may make the instrument legible, but must not look like additional algorithmic variables. Distinguish the mechanism from its frame and controls in the accompanying description.

### 5.3 Required figure brief

Before drawing, write a short specification beside the figure:

```text
Learning question:
What the learner should predict or notice:
Subject and object-selection rung:
Concept-to-part mapping, if needed:
Model inputs, state, outputs, shapes, and valid ranges:
What motion means in the concept's language:
Two or three meaningfully different scenarios:
Expected numerical results and invariants:
Keyboard controls and equivalent nonvisual explanation:
Reduced-motion and no-WebGL behavior:
Simplifications and claims the figure does not establish:
Source papers / sections:
```

Do not require exactly three scenarios when the concept has fewer meaningful states. Prefer a change of behavior, a limit, or a failure mode over three arbitrary values of one slider.

### 5.4 Numerical truth and interaction

- Implement the mechanism as a pure, testable model before writing geometry.
- Drive the figure, equation substitutions, readout, accessible summary, and scenario feedback from that model.
- Keep explanatory interpolation separate from the algorithm's actual discrete state. Easing a marker must not change the reported loss, search step, or probability.
- If showing recorded model outputs, label the interaction as a replay. List the source run and parameters. A replay must not imply fresh training or fresh inference.
- Provide predict → run → inspect → explain interactions, including reset and a way to compare cases.
- Keep related numerical highlights consistent across the figure and mathematics.
- Ensure keyboard and touch users can reach every learning outcome available through dragging or hovering.
- Debounce announcements of changing values; screen readers must not receive a new message every animation frame.

### 5.5 Craft and performance

Follow the installed skill for geometry, painter's order, four-tone shading, resolved line endings, and verification. A typical Anatomy Figure is a detailed 40–80-part mechanism; this is a craft guideline for that figure, not a reason to fill ordinary charts with extra objects. Use Figure scale by default. A larger Hero needs a clear learning benefit. An Epic is outside the default production scope.

Read the closest shipped example before starting. Read the relevant craft, motion, React, and verification references. Read WebGL or 3D references before using those optional features.

Precompute static geometry. Keep animation work on refs or equivalent imperative handles, pause when offscreen, respect reduced motion, and avoid a React render on every frame. Keep the default resting pose consistent between server output and the first client render. Preserve stable keys in server-built element props as instructed by the skill's React guidance.

Use WebGL only when it explains something SVG cannot express well. Provide an SVG/static fallback. Optional effects must not be required to understand an algorithm. Treat true 3D as an enhancement that must justify its complexity.

### 5.6 Suggested visualization families

These are examples to select from, not a mandatory asset inventory.

| Family | Possible mechanism | Questions and useful states |
| --- | --- | --- |
| Computation | A tape, head, finite state, and transition display | What changes in one step? Does this machine halt on this input? |
| Search | A search tree or graph with frontier and visited state | Why does a heuristic change exploration? What breaks an optimality guarantee? |
| Learning | A predictor coupled to its data, residuals, loss, and parameter updates | Why does this gradient point this way? What happens with a large step? |
| Backpropagation | An explicit small computation graph and local derivatives | Which paths contribute to a gradient? Where are contributions added? |
| Vision | Image patches, a kernel, feature maps, and shared weights | What changes with stride, padding, or an edge detector? |
| Sequence and attention | Token positions, Q/K/V values, scores, masks, and weighted values | Which positions can contribute? How does a changed key affect weights? |
| Generation | A distribution, latent variables, or denoising states | What changes with uncertainty, temperature, noise, or a sampling step? |
| Retrieval and tools | Actual retrieved items, scores, context, schema validation, and tool state | Is the right source retrieved? Does a plausible tool call satisfy its contract? |
| Reasoning and verification | Candidate solutions, verifier scores, selection, and a compute budget | When does extra sampling help? When does the verifier choose a wrong answer? |
| Interpretability | Activation coordinates, dictionary features, reconstruction, and interventions | Does a feature correlate with behavior? Does changing it causally change the result? |
| World models | Observed state, predicted next state, rollout, and measured error | When does one-step accuracy fail to support long-horizon planning? |

For each selected figure, show the exact small case it represents. A six-token attention view must not secretly compute an unrelated, larger sequence.

## 6. Flexible nine-era curriculum

### 6.1 How to interpret the map

Use the following scope to maintain continuity and coverage, then let learning needs determine the actual lessons. Each era should answer a driving question, teach a coherent mechanism, connect it to the history, and end with a meaningful checkpoint. The topics below may become several lessons or a smaller number of carefully staged lessons.

Dates overlap deliberately. Later eras often teach methods first published earlier, because that is where their role in the larger system becomes clear. All paper dates in the bibliography refer to their own publication or first-publication history, not the era label.

| Part | Proposed title | Historical emphasis | Main transition |
| --- | --- | --- | --- |
| 1 | Foundations: What would it mean for a machine to think? | 1930s–1956 | From informal questions to computation and testable tasks |
| 2 | Symbolic AI: Search, rules, and knowledge | 1956–1980s, with later connections | From executing instructions to representing and solving problems |
| 3 | Learning from data: Statistical models and neural networks | 1950s–2012 | From hand-written rules to fitted representations and objectives |
| 4 | Deep learning becomes practical | 2012–2017 | From small learned models to deep representations and learned control |
| 5 | Sequences, attention, and generative learning | 2013–2019 | From fixed inputs to contextual sequences and learned distributions |
| 6 | Transformers and foundation models | 2018–2023 | From task-specific training to reusable pretrained models |
| 7 | AI becomes a system | 2023–2024 | From a model's output to retrieval, tools, adaptation, and evaluation |
| 8 | Reasoning, verification, and agentic execution | 2024–2026 | From a single response to compute allocation and sequential action |
| 9 | Understanding, testing, and controlling advanced AI | Ongoing research through November 9, 2026 | From capability to causal understanding, reliability, and open inquiry |

### Part 1 — Foundations

**Driving question:** What can a machine compute, and how could we study intelligence scientifically?

**Suggested scope:** Computation and state; the distinction between a program and its execution; logic and simple threshold units; information and uncertainty; Turing's framing of machine intelligence; the Dartmouth proposal and the emergence of an organized field. Give the learner a sense of the research questions without requiring a tour of every historical machine.

**Teaching emphasis:** Make an invisible computation visible one step at a time. Separate formal computability, practical resource limits, behavior on a task, and broad philosophical claims.

**Math progression:** Start with truth tables, finite transitions, and small weighted sums. Introduce probability and information with explicit small outcomes before compact notation. Proofs about undecidability can be optional depth; do not require them to understand the site's main pathway.

**Possible exploration:** A tape-machine stepper or a threshold-logic construction, with a trace the learner can reproduce on paper. A historical source-reading exercise can compare an original research proposal with what it actually establishes.

**Checkpoint evidence:** The learner can trace a small computation, explain what changes state, and distinguish an operational test from a universal definition of intelligence.

**Suggested source anchors:** [P01](#p01), [P02](#p02), [P04](#p04), [P05](#p05). Use [P03](#p03) for information-theory context and [P06](#p06) as a bridge into problem solving.

### Part 2 — Symbolic AI

**Driving question:** If we can represent a problem explicitly, how can we search for a solution or derive one?

**Suggested scope:** State spaces and search; breadth-first, uniform-cost, and heuristic search; logic, inference, and knowledge representation; planning with preconditions and effects; early language programs and expert systems; combinatorial growth and the brittleness of hand-specified knowledge. Explain historical optimism and setbacks with sourced context rather than a single-cause story.

**Teaching emphasis:** Always identify the state, allowed operations, goal test, and cost before explaining the algorithm. Distinguish the representation of a problem from the procedure that searches it.

**Math progression:** Move from a tiny explicit graph to path cost and heuristic estimates. State the assumptions needed for claims about completeness or optimality. When teaching A*, distinguish admissibility, consistency, and whether the implementation reopens visited states.

**Possible exploration:** Compare search strategies on the same small graph, then introduce a misleading heuristic. Alternatively, let the learner change a planning precondition and inspect why a previously valid plan fails.

**Checkpoint evidence:** The learner can justify a search step, compare resource costs, and identify a case where incomplete knowledge or an invalid assumption defeats the method.

**Suggested source anchors:** [P07](#p07), [P10](#p10), [P11](#p11). Optional historical readings include [P08](#p08), [P09](#p09), [P12](#p12), and [P13](#p13).

### Part 3 — Learning from data

**Driving question:** How can a system improve its predictions when writing more rules becomes impractical?

**Suggested scope:** Data and targets; training, validation, and test splits; linear and logistic models; likelihood and loss; gradient descent; perceptrons and multilayer networks; backpropagation; overfitting and regularization; representative alternatives such as trees, kernels, and probabilistic models. Select contrasts that make the central ideas clearer rather than surveying every algorithm equally.

**Teaching emphasis:** This part is the principal mathematical bridge. Give derivatives, shapes, objectives, and generalization enough space. Do not compress several unfamiliar ideas into the first neural-network equation.

**Math progression:** One scalar predictor → one numerical derivative → several parameters → a gradient → a small computation graph → chain-rule backpropagation → a batched implementation. Teach probability before logistic likelihood, and explain the connection between negative log-likelihood and cross-entropy. Introduce expectation with finite weighted sums. Add an optional matrix derivation after the scalar version is understood.

**Possible exploration:** A loss-and-update lab connected to a small data set; a computation-graph gradient inspector; or a comparison of linear, tree, and nonlinear decision boundaries. The implementation should include a finite-difference check away from nondifferentiable points.

**Checkpoint evidence:** The learner can calculate an update, derive a small gradient, implement a predictor, diagnose overfitting, and explain why training accuracy alone is inadequate.

**Suggested source anchors:** [P14](#p14), [P18](#p18), [P20](#p20). Choose supporting contrasts from [P15](#p15)–[P17](#p17), [P21](#p21), and [P23](#p23).

### Part 4 — Practical deep learning

**Driving question:** What made deep representations useful at larger scales, and what new training problems appeared?

**Suggested scope:** Convolution and shared weights; learned visual features; optimization and initialization; regularization; normalization; residual connections; data and hardware; introductory reinforcement learning and deep value learning. Keep supervised learning and sequential decision-making conceptually distinct before connecting them.

**Teaching emphasis:** Connect an architectural choice to a concrete constraint. For example, parameter sharing changes both the computation and the assumptions about useful structure in images. Explain a technique's operation before repeating its historical motivation as a settled causal explanation.

**Math progression:** Explicit small convolution sums and output shapes; activation derivatives; residual-path gradients; conditional expectation and discounted returns; a small Bellman backup before a deep Q-learning objective. Revisit minibatch statistics and the distinction between training and evaluation behavior.

**Possible exploration:** A kernel/feature-map inspector, a residual-versus-plain training comparison, or a tiny gridworld with value updates. One well-explained experiment is preferable to several expensive training demos.

**Checkpoint evidence:** The learner can follow a convolution numerically, explain a training intervention, and distinguish the target in supervised learning from a bootstrapped value target.

**Suggested source anchors:** [P24](#p24), [P28](#p28), [P29](#p29). Supporting papers include [P19](#p19), [P25](#p25)–[P27](#p27), [P31](#p31), and [P32](#p32).

### Part 5 — Sequences, attention, and generative learning

**Driving question:** How can learned models handle context, variable-length sequences, and uncertainty about possible outputs?

**Suggested scope:** Embeddings and sequence models; recurrence and long-range dependencies; encoder–decoder learning; alignment and attention; autoregressive factorization; latent-variable generation; variational and adversarial approaches. These are connected threads, not a claim that every generative model evolved from a sequence model.

**Teaching emphasis:** Explain how information can move or be compressed, which quantities are learned, and where sampling enters. Distinguish a vector's coordinates from a human interpretation of what it represents.

**Math progression:** Conditional probability and sequence factorization → a small recurrent update → weighted attention → queries, keys, and values. For latent-variable models, explain marginalization, approximate inference, and KL divergence before an ELBO. Derive a simple case rather than presenting the final objective alone. For adversarial learning, separate the objectives and updates of the two models.

**Possible exploration:** Change a token and inspect attention scores, trace the information bottleneck of a small sequence model, or compare simple generated distributions and failure modes. Mark low-dimensional toy distributions as such.

**Checkpoint evidence:** The learner can explain a weighted contextual representation, track the shapes in a sequence computation, and compare generative objectives without assuming every attractive sample implies a good distribution model.

**Suggested source anchors:** [P34](#p34)–[P38](#p38). Use [P22](#p22), [P33](#p33), and [P39](#p39) where they support the chosen sequence pathway.

### Part 6 — Transformers and foundation models

**Driving question:** How can one pretrained model become useful across many tasks and modalities?

**Suggested scope:** The Transformer block; tokenization and embeddings; masked and causal objectives; positional information; pretraining and adaptation; model/data/compute tradeoffs; contrastive image–text learning; diffusion; instruction tuning and preference-based post-training. Explain both continuity with earlier methods and the new engineering consequences of scale.

**Teaching emphasis:** Build from a small complete computation. A learner should understand the path from tokens to logits and a training loss before encountering large-model claims. A small decoder implementation can become a reusable reference in later eras.

**Math progression:** Dot products → stable softmax → scaled dot-product attention with explicit shapes → a causal mask → multihead combination and residual transformations → next-token cross-entropy. Connect scaling laws to fitted empirical relationships and their assumptions. For diffusion, separate forward noising, a learned denoising objective, and a reverse sampling procedure; provide an optional continuous-time bridge.

**Possible exploration:** A small attention/decoder inspector, temperature and sampling controls, a compute-allocation comparison, or a low-dimensional diffusion lab. Clearly distinguish training a tiny model from replaying outputs of a larger pretrained one.

**Checkpoint evidence:** The learner can follow one decoder step, explain the training target and mask, compare objectives, and describe why pretraining success does not guarantee factuality or instruction following.

**Suggested source anchors:** [P36](#p36), [P40](#p40), [P42](#p42), [P44](#p44), [P48](#p48), and [P50](#p50). Additional directions appear in [P41](#p41), [P43](#p43), [P45](#p45)–[P47](#p47), [P49](#p49), and [P51](#p51).

### Part 7 — AI becomes a system

**Driving question:** What must surround a language model for it to retrieve useful evidence and perform dependable operations?

**Suggested scope:** Embeddings and retrieval; chunking, ranking, and context selection; retrieval-augmented generation; retrieval and answer evaluation; structured outputs and tool contracts; LoRA and QLoRA; multimodal input; orchestration and state; indirect prompt injection and trust boundaries. Explain which methods predate this era and why they became important together.

**Teaching emphasis:** Separate component quality from system quality. A retrieved document can be relevant but insufficient; a valid JSON object can still propose an incorrect operation; fine-tuning changes different things from retrieval.

**Math progression:** Dot product and cosine similarity → retrieval metrics and labeled relevance → a simple retrieval-conditioned model. Explain low-rank factorization and adapter parameter counts before quantized adaptation. Show how the evaluation metric connects to the user's task. Distinguish Recall@k, reciprocal rank, and answer correctness rather than using them interchangeably.

**Possible exploration:** A small public-document retrieval lab with distractors and missing answers; a mock tool with schema and authorization checks; or an adapter-rank comparison. Use fixtures for external operations so the core course stays runnable without accounts.

**Checkpoint evidence:** The learner can locate a failure in the retrieval/generation/action chain, choose a useful evaluation, and explain why retrieved text should not automatically become an instruction.

**Suggested source anchors:** [P54](#p54)–[P61](#p61). Supporting readings include [P62](#p62)–[P64](#p64).

### Part 8 — Reasoning, verification, and agents

**Driving question:** When does additional computation or interaction improve an answer, and how can we tell?

**Suggested scope:** Reasoning-oriented training; test-time sampling and search; outcome and process supervision; reinforcement learning with verifiable rewards; policy optimization; reward models and verifiers; tool-using coding agents; memory, recovery, and long-horizon reliability. Keep training-time improvements separate from inference-time strategies.

**Teaching emphasis:** Longer output is not evidence of correctness. Compare methods at a stated token, time, or monetary budget. A verifier is a model or program with its own failure modes. An agent's success depends on the environment, tools, stopping criteria, and evaluation as well as its language model.

**Math progression:** Return and policy gradients → importance ratios → a PPO-style clipped objective → group-relative advantages as one later approach. Explain baseline subtraction and what normalization changes. Distinguish a simplified teaching objective from a paper's full token-level estimator. Derive simple independent-sampling success probabilities, then show why correlated errors and imperfect selection violate the naive model.

**Possible exploration:** A candidate-selection lab with a fallible verifier and a fixed budget; a small policy-update calculation; or a local mock-agent task that requires observation, action, testing, and recovery. Track attempts and tool calls rather than displaying only a successful trace.

**Checkpoint evidence:** The learner can compare equal-budget approaches, identify reward or verifier failures, and explain how to evaluate an agent over repeated tasks rather than a single demonstration.

**Suggested source anchors:** [P65](#p65)–[P69](#p69), [P71](#p71), and [P74](#p74). Use [P30](#p30), [P52](#p52), [P53](#p53), [P70](#p70), [P72](#p72), [P73](#p73), and [P75](#p75) as appropriate. [P101](#p101) is an optional recent critique exercise, not a general verdict about RL.

### Part 9 — Frontier research

**Driving question:** How can we understand, test, and improve systems whose behavior is only partly understood?

**Suggested scope:** Behavioral analysis; representation probes; mechanistic interpretability; circuits and superposition; sparse autoencoders; activation patching and other interventions; alignment objectives and reward misspecification; adversarial robustness; learned world models and planning; agent reliability; and open experimental questions.

**Teaching emphasis:** Differentiate observation, a decoded representation, a causal intervention, and a general explanation. A feature label is a hypothesis. A successful patch on one prompt is evidence about that intervention, not a complete proof of a circuit. A world model's plausible prediction does not establish reliable planning or causal understanding.

**Math progression:** Revisit vector directions and projections → overcomplete dictionaries and reconstruction → sparsity penalties or TopK selection → reconstruction/behavior tradeoffs → a patching experiment with explicit baseline and metric. Connect adversarial perturbation constraints to an optimization problem. Build world-model learning from conditional next-state prediction before multi-step rollouts, latent-state objectives, and planning. Put advanced variants behind prerequisite bridges.

**Possible exploration:** A synthetic sparse-representation lab, a clean/corrupted/patched run comparison, a toy adversarial example with a measured perturbation budget, or a tiny learned-dynamics planner tested under distribution shift. Use held-out examples and negative controls. Offer substantial model experiments as downloadable notebooks when browser execution is unsuitable.

**Checkpoint evidence:** The learner can formulate a falsifiable hypothesis, design controls, report uncertain results, and identify limitations of an interpretability or agentic-system claim.

**Suggested source anchors:** [P76](#p76)–[P86](#p86), [P87](#p87)–[P96](#p96). The 2026 readings [P97](#p97)–[P101](#p101) are selected research extensions with explicit evidence-status labels. [P102](#p102) extends circuit analysis to attention interactions.

### 6.2 Open-problem teaching

The final era should include a changing research agenda. Good candidate questions include:

- Do recovered features remain stable across data, seeds, model sizes, and dictionary choices?
- When does an intervention isolate a mechanism, and when does it create an unusual state?
- What evidence distinguishes a helpful explanation from a faithful explanation?
- How can evaluations detect contamination, distribution shift, or failures hidden by aggregate scores?
- When do verifiers, rewards, or simulated environments reward the wrong behavior?
- How does error compound across a world-model rollout or a long sequence of tool calls?
- What improves reliability at a fixed compute budget, and does it generalize to new tasks?

Teach these as research questions with possible experiments, competing explanations, and bounded claims. Update them as the evidence changes. Do not frame the course as having solved alignment, robustness, interpretability, or general intelligence.

## 7. Practice, feedback, and mastery

### 7.1 Exercise design

Build a progression within each substantial technical unit:

1. **Recognize:** identify the concept and what its quantities mean.
2. **Predict:** state what should happen before changing a control.
3. **Calculate:** work a small numerical case.
4. **Explain:** justify the outcome in words.
5. **Implement:** complete or repair a small algorithm.
6. **Transfer:** apply the idea to a new case or a failed assumption.
7. **Investigate:** propose or run a controlled extension when appropriate.

Do not mandate that every short lesson contains all seven. An era's collection should develop these abilities through practice distributed over time.

Quizzes should test reasoning and misconceptions. Dates and names may support historical context, but memorizing them is not a substitute for understanding. Use selected-response items where useful, alongside numerical answers, code tasks, short explanations, and experiment interpretation.

### 7.2 Feedback behavior

- Offer staged hints: a conceptual prompt, a suggested next operation, then a partial worked step.
- Let the learner request a full solution after making an attempt or choosing to reveal it.
- Explain why a distractor is tempting and what assumption it gets wrong.
- Use numerical tolerances and accepted equivalent forms where needed.
- Avoid grading mathematical expressions with unrestricted `eval` or brittle string comparison.
- After a correct answer, give a short explanation and a related transfer question when useful.
- After an incorrect answer, identify a likely misconception and link to the relevant step or prerequisite.
- Preserve the learner's work when they inspect a hint, revisit an earlier section, or reset only a visualization.
- Keep self-explanation and open-ended research questions honestly self-assessed unless a reliable grading method is provided.

No external AI grader is needed for the core experience. If later introduced, disclose its role, allow review, and never treat its verdict as authoritative evidence of mathematical correctness.

### 7.3 Question-writing examples

These illustrate the kind of reasoning to assess; authors should adapt them to the actual lessons.

| Era | Example prompt | What a good answer demonstrates |
| --- | --- | --- |
| 1 | What is the complete state needed to predict the next step of this computation? | Separates state from a description of the final task |
| 2 | This heuristic never overestimates. What additional implementation details matter to your optimality claim? | Understands assumptions, visited states, and reopening behavior |
| 3 | Why does the sign of this gradient suggest increasing the weight? Will any positive step size work? | Connects a local derivative to an update and its limits |
| 4 | Which parameters are shared as this kernel moves, and how does that change the parameter count? | Understands convolution as a computation and an architectural assumption |
| 5 | Attention weights sum to one. Does that make an attention map a complete explanation of the prediction? | Distinguishes a weighted operation from a causal explanation |
| 6 | Which training tokens may influence this next-token prediction, and how is that enforced? | Understands causal masking and data leakage |
| 7 | The retrieved passages are relevant but the answer is unsupported. What should you measure next? | Separates retrieval relevance, evidence sufficiency, and answer faithfulness |
| 8 | More candidates were generated, but the selected answer got worse. How could that happen? | Accounts for correlated errors, selection quality, and compute budgets |
| 9 | A feature correlates with a behavior and steering changes one example. What controls and further tests are needed? | Distinguishes preliminary causal evidence from a general mechanism claim |

### 7.4 Era checkpoints

An era checkpoint should sample explanation, calculation where applicable, implementation or trace-reading, failure diagnosis, and transfer. Include worked solutions or an explicit rubric. Report readiness by outcome, not only an aggregate percentage.

Use confidence as a reflection prompt: ask what the learner is sure about and what still needs practice. Offer targeted review and a second version of the checkpoint. Do not use a timer by default. Do not prevent browsing later parts.

### 7.5 Final comprehensive checkpoint

Provide a capstone that connects the historical and technical threads. It may be completed through a small implementation or through a supplied run with full artifacts, so hardware access does not determine whether a learner can participate.

A suitable capstone asks the learner to:

1. Explain why a chosen approach became useful relative to an earlier one.
2. Derive or reconstruct one central calculation with symbol definitions and shapes.
3. Build or inspect a small working model or retrieval/tool system.
4. State an evaluation protocol, compare a baseline, and analyze failures.
5. Form an interpretability, robustness, or agent-reliability hypothesis and test it with controls.
6. Read primary evidence, distinguish supported findings from speculation, and propose the next experiment.

Suggested rubric: conceptual accuracy 20%, mathematical reasoning 20%, implementation or execution-trace understanding 20%, experimental design and evaluation 25%, and communication with limitations 15%. These weights are an initial editorial choice to validate with learners, not a scientifically established mastery scale.

The final submission should include the question, assumptions, data or fixtures, method, baseline, results, failure cases, reproducibility instructions, and limitations. A well-controlled negative result may be stronger work than an uncontrolled apparent improvement.

## 8. Runnable experiments and reproducibility

### 8.1 Three execution levels

| Level | Appropriate work | Delivery |
| --- | --- | --- |
| Immediate browser model | Small search, matrix operations, gradient steps, toy probability, recorded-run inspection | TypeScript model with accessible controls and deterministic tests |
| Browser Python | Small pure-Python or NumPy exercises that fit the supported runtime | Pyodide loaded on demand in a worker, with stop/reset and a tested package list |
| Notebook or local environment | PyTorch training, pretrained-model analysis, larger RL or world-model experiments | Downloadable notebook/script, locked dependencies, small default configuration, and saved example results |

Do not assume Pyodide supports an ordinary desktop PyTorch environment. Do not require a GPU for the main conceptual pathway. Provide a reduced CPU configuration, a recorded run, or both. A recorded run is evidence to inspect, not a claim that the browser performed that computation.

Start with a small browser experience and downloadable Python examples. Add an embedded Python editor only when its learning benefit justifies download size, execution management, and accessibility work.

### 8.2 Experiment contract

Every published experiment needs:

- A learning question, expected qualitative behavior, and an explanation of what would count against the hypothesis.
- Inputs, shapes, initial state, seed, and valid ranges.
- A simple baseline and one meaningful comparison or ablation.
- A small default configuration; documented measured runtime, memory, and hardware for that configuration.
- Data provenance, license, preparation, and split strategy; use synthetic or clearly licensed data where practical.
- A clear distinction between train, validation, and test use.
- Exact dependencies and commands or notebook steps, expected output shape, and representative results.
- Useful assertions or checks of mathematical invariants and implementation behavior.
- Stopping, reset, error, and timeout behavior.
- A limitations statement, especially when extrapolating from a toy system.

Use fixed seeds for repeatable teaching examples, and repeated seeds where the conclusion depends on variability. State that seeds alone do not guarantee bitwise reproducibility across hardware and library versions.

### 8.3 Example invariants worth checking

- Search returns a valid path and the claimed cost; under the stated assumptions, compare against a trusted tiny exhaustive baseline.
- Probability rows sum to one within tolerance; masked attention positions receive zero weight.
- Analytical gradients match finite differences on a suitable differentiable case.
- The visualized convolution matches a direct small-array calculation.
- A low-rank adapter's shapes and trainable-parameter count match the displayed expression.
- An SAE reconstructs the displayed activation from the displayed features; report reconstruction error and sparsity separately.
- A patch uses the stated activation, layer, and token position; the clean and corrupted baselines are available for comparison.
- A world-model evaluation separates one-step error, rollout error, and downstream planning performance.
- A mock agent obeys tool contracts and stopping conditions, and failures remain visible in the trace.

Test consequential numerical behavior and failure modes. Avoid tests that merely repeat a component's implementation or assert that a heading exists.

## 9. Research sources and paper-reading policy

### 9.1 How papers should appear in lessons

The bibliography is an extensive seed library, not a mandatory reading list. Select a small number of anchor papers for each unit; make further reading optional. A source should earn its place by supporting a historical claim, explaining a method, grounding an experiment, or revealing a limitation.

A paper card should give the title, authors, date, source type, original link, why it matters here, the relevant section or figure, and a guided reading question. Explain what the reader can understand now and what can wait. Do not require a beginner to read a dense paper in full before receiving the explanation that makes it accessible.

For a central paper, provide a short companion with:

1. The problem and prior limitation.
2. The central contribution and its actual evidence.
3. A translation of one important equation or experiment into the course's notation.
4. Assumptions, limitations, and an important failure case or unanswered question.
5. A connection to the course's implementation or interaction.

Keep original notation recognizable where possible and show a mapping when changing it. Recreate explanatory figures from a model or use licensed assets with attribution. A publicly accessible paper does not automatically grant permission to redistribute its figures or data.

### 9.2 Evidence and freshness

Research coverage is a selected snapshot through **November 9, 2026**, not an exhaustive survey or a claim to identify the universally best method. Historical sources below include original papers, proposals, reports, and one foundational monograph. Later entries include research papers, preprints, and clearly identified research-site publications.

Source discovery and accessible landing pages were consulted for this specification. Some historical publisher pages blocked automated access or only exposed metadata. Do not treat this document as evidence that every full text has been critically reviewed. Before publishing a lesson's claims, read the relevant full text, verify the equation and context, and record the exact section and version. Find an authorized author or institutional copy when access is restricted; do not infer paper contents from its title.

The 2026 entries are recent research readings. Where an entry is an arXiv preprint or research-site publication, do not imply established peer review or consensus. Do not promote one benchmark result into a broad claim about all models. Record peer-review status separately if subsequently verified.

For each source, maintain a registry with a stable ID, title, authors, first-publication date, venue or source type, canonical URL/DOI, pinned version where relevant, code/data links, access date, and verification status. At the claim level, record the supported claim, exact section/figure/equation, limitations, and reviewer. An arXiv landing page can change; pin the version used for an experiment.

Recheck current-research material before each new era release and maintain a dated changelog. Keep historical explanations stable unless an error or relevant historical evidence warrants revision. Link checks run separately from content review: an HTTP success response does not establish that a source supports a claim.

### 9.3 Primary-source seed bibliography

Dates below generally identify the first public paper/report; a later conference or journal version may have a different year. Follow the linked source for its version history. “Use” identifies a possible teaching role rather than endorsing every claim in the source.

#### Foundations and symbolic AI

| ID | Source | Use |
| --- | --- | --- |
| <a id="p01"></a>P01 | Turing (1936), [On Computable Numbers, with an Application to the Entscheidungsproblem](https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf). Original paper, institutional copy. | Computation, machine state, and limits |
| <a id="p02"></a>P02 | McCulloch & Pitts (1943), [A Logical Calculus of the Ideas Immanent in Nervous Activity](https://doi.org/10.1007/BF02478259). | Logic and idealized neural computation |
| <a id="p03"></a>P03 | Shannon (1948), [A Mathematical Theory of Communication](https://doi.org/10.1002/j.1538-7305.1948.tb01338.x). | Information and uncertainty; distinguish communication from intelligence |
| <a id="p04"></a>P04 | Turing (1950), [Computing Machinery and Intelligence](https://doi.org/10.1093/mind/LIX.236.433). | Operational framing and its limitations |
| <a id="p05"></a>P05 | McCarthy, Minsky, Rochester & Shannon (1955), [A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence](https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html). Proposal for the 1956 meeting. | Research aims versus demonstrated results |
| <a id="p06"></a>P06 | Newell & Simon (1956), [The Logic Theory Machine: A Complex Information Processing System](https://www.rand.org/pubs/papers/P868.html). RAND report. | Early symbolic problem solving |
| <a id="p07"></a>P07 | McCarthy (1959), [Programs with Common Sense](https://www-formal.stanford.edu/jmc/mcc59/mcc59.html). | Knowledge representation and inference |
| <a id="p08"></a>P08 | McCarthy (1960), [Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I](https://www-formal.stanford.edu/jmc/recursive/recursive.html). | Symbolic programs and representation |
| <a id="p09"></a>P09 | Samuel (1959), [Some Studies in Machine Learning Using the Game of Checkers](https://doi.org/10.1147/rd.33.0210). | Early learning alongside symbolic methods |
| <a id="p10"></a>P10 | Hart, Nilsson & Raphael (1968), [A Formal Basis for the Heuristic Determination of Minimum Cost Paths](https://doi.org/10.1109/TSSC.1968.300136). | A* and carefully stated guarantees |
| <a id="p11"></a>P11 | Fikes & Nilsson (1971), [STRIPS: A New Approach to the Application of Theorem Proving to Problem Solving](https://doi.org/10.1016/0004-3702(71)90010-5). | Planning representations and operators |
| <a id="p12"></a>P12 | Weizenbaum (1966), [ELIZA—A Computer Program for the Study of Natural Language Communication Between Man and Machine](https://doi.org/10.1145/365153.365168). | Language behavior and interpretation |
| <a id="p13"></a>P13 | Minsky & Papert (1969), [Perceptrons: An Introduction to Computational Geometry](https://mitpress.mit.edu/9780262130431/perceptrons/). Research monograph. | Specific representational limits; avoid overgeneralization |

#### Statistical learning and neural foundations

| ID | Source | Use |
| --- | --- | --- |
| <a id="p14"></a>P14 | Rosenblatt (1958), [The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain](https://doi.org/10.1037/h0042519). | Learned linear classification |
| <a id="p15"></a>P15 | Quinlan (1986), [Induction of Decision Trees](https://doi.org/10.1007/BF00116251). | A contrasting learned representation |
| <a id="p16"></a>P16 | Dempster, Laird & Rubin (1977), [Maximum Likelihood from Incomplete Data via the EM Algorithm](https://doi.org/10.1111/j.2517-6161.1977.tb01600.x). | Latent variables and iterative estimation |
| <a id="p17"></a>P17 | Rabiner (1989), [A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition](https://doi.org/10.1109/5.18626). Primary technical tutorial. | Probabilistic sequence modeling |
| <a id="p18"></a>P18 | Rumelhart, Hinton & Williams (1986), [Learning Representations by Back-Propagating Errors](https://doi.org/10.1038/323533a0). [Author-hosted copy](https://www.cs.toronto.edu/~hinton/absps/naturebp.pdf). | Backpropagation and learned internal representations |
| <a id="p19"></a>P19 | Watkins & Dayan (1992), [Q-learning](https://doi.org/10.1007/BF00992698). | Value learning and its assumptions |
| <a id="p20"></a>P20 | Cortes & Vapnik (1995), [Support-Vector Networks](https://doi.org/10.1007/BF00994018). | Margins and alternatives to neural models |
| <a id="p21"></a>P21 | Breiman (2001), [Random Forests](https://doi.org/10.1023/A:1010933404324). | Ensembles and comparison baselines |
| <a id="p22"></a>P22 | Hochreiter & Schmidhuber (1997), [Long Short-Term Memory](https://doi.org/10.1162/neco.1997.9.8.1735). | Recurrent memory and gradient problems |
| <a id="p23"></a>P23 | LeCun et al. (1998), [Gradient-Based Learning Applied to Document Recognition](https://doi.org/10.1109/5.726791). | Convolutional learning before the 2010s |

#### Practical deep learning

| ID | Source | Use |
| --- | --- | --- |
| <a id="p24"></a>P24 | Krizhevsky, Sutskever & Hinton (2012), [ImageNet Classification with Deep Convolutional Neural Networks](https://papers.nips.cc/paper_files/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html). | Deep vision, data, and compute |
| <a id="p25"></a>P25 | Srivastava et al. (2014), [Dropout: A Simple Way to Prevent Neural Networks from Overfitting](https://www.jmlr.org/papers/v15/srivastava14a.html). | Regularization and train/evaluation behavior |
| <a id="p26"></a>P26 | Kingma & Ba (2014), [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980). | Adaptive optimizer mechanics |
| <a id="p27"></a>P27 | Ioffe & Szegedy (2015), [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/abs/1502.03167). | Normalization; separate operation from proposed explanation |
| <a id="p28"></a>P28 | He et al. (2015), [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385). | Residual computation and deep optimization |
| <a id="p29"></a>P29 | Mnih et al. (2013), [Playing Atari with Deep Reinforcement Learning](https://arxiv.org/abs/1312.5602). | Deep value learning; earlier than the later Nature paper |
| <a id="p30"></a>P30 | Schulman et al. (2017), [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347). | Policy ratios, clipping, and practical updates |
| <a id="p31"></a>P31 | Hinton, Vinyals & Dean (2015), [Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531). | Teacher/student training and softened targets |
| <a id="p32"></a>P32 | Guo et al. (2017), [On Calibration of Modern Neural Networks](https://proceedings.mlr.press/v70/guo17a.html). | Confidence versus accuracy |

#### Sequences, attention, and early generative models

| ID | Source | Use |
| --- | --- | --- |
| <a id="p33"></a>P33 | Mikolov et al. (2013), [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781). | Embeddings and learned geometry |
| <a id="p34"></a>P34 | Sutskever, Vinyals & Le (2014), [Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215). | Encoder–decoder sequence learning |
| <a id="p35"></a>P35 | Bahdanau, Cho & Bengio (2014), [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473). | Learned alignment and attention |
| <a id="p36"></a>P36 | Vaswani et al. (2017), [Attention Is All You Need](https://arxiv.org/abs/1706.03762). | Transformer computations and shapes |
| <a id="p37"></a>P37 | Kingma & Welling (2013), [Auto-Encoding Variational Bayes](https://arxiv.org/abs/1312.6114). | Variational inference and reparameterization |
| <a id="p38"></a>P38 | Goodfellow et al. (2014), [Generative Adversarial Networks](https://arxiv.org/abs/1406.2661). Conference title: Generative Adversarial Nets. | Adversarial generative objectives |
| <a id="p39"></a>P39 | Cho et al. (2014), [Learning Phrase Representations using RNN Encoder–Decoder for Statistical Machine Translation](https://arxiv.org/abs/1406.1078). | Gated recurrence and sequence representations |

#### Foundation models and generative pretraining

| ID | Source | Use |
| --- | --- | --- |
| <a id="p40"></a>P40 | Devlin et al. (2018), [BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805). | Masked pretraining and adaptation |
| <a id="p41"></a>P41 | Radford et al. (2019), [Language Models are Unsupervised Multitask Learners](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf). Technical report. | GPT-2 and autoregressive transfer |
| <a id="p42"></a>P42 | Brown et al. (2020), [Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165). | In-context task demonstrations |
| <a id="p43"></a>P43 | Kaplan et al. (2020), [Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361). | Empirical scaling relationships |
| <a id="p44"></a>P44 | Hoffmann et al. (2022), [Training Compute-Optimal Large Language Models](https://arxiv.org/abs/2203.15556). | Data/model allocation under a compute budget |
| <a id="p45"></a>P45 | Radford et al. (2021), [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020). | Contrastive image–text learning |
| <a id="p46"></a>P46 | Dosovitskiy et al. (2020), [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929). | Patch-based vision Transformers |
| <a id="p47"></a>P47 | Caron et al. (2021), [Emerging Properties in Self-Supervised Vision Transformers](https://arxiv.org/abs/2104.14294). | Self-supervised visual representations |
| <a id="p48"></a>P48 | Ho, Jain & Abbeel (2020), [Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239). | Forward noise and denoising objectives |
| <a id="p49"></a>P49 | Song, Meng & Ermon (2020), [Denoising Diffusion Implicit Models](https://arxiv.org/abs/2010.02502). | Training/sampling distinctions |
| <a id="p50"></a>P50 | Ouyang et al. (2022), [Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155). | Supervised instruction tuning and RLHF |
| <a id="p51"></a>P51 | Bai et al. (2022), [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073). | AI feedback and alignment tradeoffs |
| <a id="p52"></a>P52 | Wei et al. (2022), [Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903). | Prompted intermediate solutions and evidence limits |
| <a id="p53"></a>P53 | Wang et al. (2022), [Self-Consistency Improves Chain of Thought Reasoning in Language Models](https://arxiv.org/abs/2203.11171). | Sampling and aggregation |

#### AI systems, retrieval, and tools

| ID | Source | Use |
| --- | --- | --- |
| <a id="p54"></a>P54 | Lewis et al. (2020), [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401). | Retrieval-conditioned generation; predates the systems era |
| <a id="p55"></a>P55 | Karpukhin et al. (2020), [Dense Passage Retrieval for Open-Domain Question Answering](https://arxiv.org/abs/2004.04906). | Learned retrieval and relevance |
| <a id="p56"></a>P56 | Reimers & Gurevych (2019), [Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks](https://arxiv.org/abs/1908.10084). | Sentence similarity representations |
| <a id="p57"></a>P57 | Hu et al. (2021), [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685). | Low-rank adaptation and parameter counts |
| <a id="p58"></a>P58 | Dettmers et al. (2023), [QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314). | Quantized adaptation and memory constraints |
| <a id="p59"></a>P59 | Yao et al. (2022), [ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629). | Model/tool interaction patterns |
| <a id="p60"></a>P60 | Schick et al. (2023), [Toolformer: Language Models Can Teach Themselves to Use Tools](https://arxiv.org/abs/2302.04761). | Learning tool-use decisions |
| <a id="p61"></a>P61 | Greshake et al. (2023), [Not what you've signed up for: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection](https://arxiv.org/abs/2302.12173). | Retrieved data and instruction trust boundaries |
| <a id="p62"></a>P62 | Liu et al. (2023), [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172). | Position sensitivity and evaluation design |
| <a id="p63"></a>P63 | Liu et al. (2023), [Visual Instruction Tuning](https://arxiv.org/abs/2304.08485). | Multimodal system construction |
| <a id="p64"></a>P64 | Liu et al. (2023), [AgentBench: Evaluating LLMs as Agents](https://arxiv.org/abs/2308.03688). | Task/environment-based agent evaluation |

#### Reasoning, verification, and agentic evaluation

| ID | Source | Use |
| --- | --- | --- |
| <a id="p65"></a>P65 | Shao et al. (2024), [DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300). | Group-relative policy optimization in context |
| <a id="p66"></a>P66 | DeepSeek-AI et al. (2025), [DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning](https://arxiv.org/abs/2501.12948). | Reasoning-oriented RL and staged training |
| <a id="p67"></a>P67 | Snell et al. (2024), [Scaling LLM Test-Time Compute Optimally can be More Effective than Scaling Model Parameters](https://arxiv.org/abs/2408.03314). | Budget allocation and task dependence |
| <a id="p68"></a>P68 | Lightman et al. (2023), [Let's Verify Step by Step](https://arxiv.org/abs/2305.20050). | Process supervision and verifier evaluation |
| <a id="p69"></a>P69 | Uesato et al. (2022), [Solving math word problems with process- and outcome-based feedback](https://arxiv.org/abs/2211.14275). | Comparing supervision signals |
| <a id="p70"></a>P70 | Rafailov et al. (2023), [Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290). | Preference optimization and objective assumptions |
| <a id="p71"></a>P71 | Jimenez et al. (2023), [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770). | Repository-level evaluation and its protocol |
| <a id="p72"></a>P72 | Yang et al. (2024), [SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering](https://arxiv.org/abs/2405.15793). | The role of an agent's interface |
| <a id="p73"></a>P73 | Zhou et al. (2023), [WebArena: A Realistic Web Environment for Building Autonomous Agents](https://arxiv.org/abs/2307.13854). | Multi-step web-task evaluation |
| <a id="p74"></a>P74 | Yao et al. (2024), [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045). | Repeated-task reliability and policy constraints |
| <a id="p75"></a>P75 | Lambert et al. (2024), [RewardBench: Evaluating Reward Models for Language Modeling](https://arxiv.org/abs/2403.13787). | Evaluation of selection and reward models |

#### Interpretability, safety, robustness, and world models

| ID | Source | Use |
| --- | --- | --- |
| <a id="p76"></a>P76 | Elhage et al. (2021), [A Mathematical Framework for Transformer Circuits](https://transformer-circuits.pub/2021/framework/index.html). Research-site publication. | Small-model circuit analysis |
| <a id="p77"></a>P77 | Elhage et al. (2022), [Toy Models of Superposition](https://transformer-circuits.pub/2022/toy_model/index.html). Research-site publication. | Sparsity, interference, and representation geometry |
| <a id="p78"></a>P78 | Bricken et al. (2023), [Towards Monosemanticity: Decomposing Language Models With Dictionary Learning](https://transformer-circuits.pub/2023/monosemantic-features/index.html). Research-site publication. | Dictionary learning and feature hypotheses |
| <a id="p79"></a>P79 | Templeton et al. (2024), [Scaling Monosemanticity: Extracting Interpretable Features from Claude 3 Sonnet](https://transformer-circuits.pub/2024/scaling-monosemanticity/index.html). Research-site publication. | Larger-model feature extraction and limits |
| <a id="p80"></a>P80 | Gao et al. (2024), [Scaling and evaluating sparse autoencoders](https://arxiv.org/abs/2406.04093). | SAE objectives, scale, and evaluation |
| <a id="p81"></a>P81 | Wang et al. (2022), [Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 small](https://arxiv.org/abs/2211.00593). | A concrete circuit investigation |
| <a id="p82"></a>P82 | Zhang & Nanda (2023), [Towards Best Practices of Activation Patching in Language Models: Metrics and Methods](https://arxiv.org/abs/2309.16042). | Patching design and metric sensitivity |
| <a id="p83"></a>P83 | Kramár et al. (2024), [AtP*: An efficient and scalable method for localizing LLM behaviour to components](https://arxiv.org/abs/2403.00745). | Approximate intervention screening and validation |
| <a id="p84"></a>P84 | Meng et al. (2022), [Locating and Editing Factual Associations in GPT](https://arxiv.org/abs/2202.05262). | Causal tracing and model editing |
| <a id="p85"></a>P85 | Ameisen et al. (2025), [Circuit Tracing: Revealing Computational Graphs in Language Models](https://transformer-circuits.pub/2025/attribution-graphs/methods.html). Research-site publication. | Replacement models and attribution graphs |
| <a id="p86"></a>P86 | Lindsey et al. (2025), [On the Biology of a Large Language Model](https://transformer-circuits.pub/2025/attribution-graphs/biology.html). Research-site publication. | Case studies, perturbations, and incomplete explanations |
| <a id="p87"></a>P87 | Goodfellow, Shlens & Szegedy (2014), [Explaining and Harnessing Adversarial Examples](https://arxiv.org/abs/1412.6572). | Perturbation-based failure and FGSM |
| <a id="p88"></a>P88 | Madry et al. (2017), [Towards Deep Learning Models Resistant to Adversarial Attacks](https://arxiv.org/abs/1706.06083). | Threat models and robust optimization |
| <a id="p89"></a>P89 | Athalye, Carlini & Wagner (2018), [Obfuscated Gradients Give a False Sense of Security: Circumventing Defenses to Adversarial Examples](https://arxiv.org/abs/1802.00420). | Evaluations that detect false robustness |
| <a id="p90"></a>P90 | Amodei et al. (2016), [Concrete Problems in AI Safety](https://arxiv.org/abs/1606.06565). | Operational safety problems and misspecification |
| <a id="p91"></a>P91 | Christiano et al. (2017), [Deep reinforcement learning from human preferences](https://arxiv.org/abs/1706.03741). | Preference learning and learned rewards |
| <a id="p92"></a>P92 | Ha & Schmidhuber (2018), [World Models](https://arxiv.org/abs/1803.10122). | Learned predictive representations and control |
| <a id="p93"></a>P93 | Schrittwieser et al. (2019), [Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model](https://arxiv.org/abs/1911.08265). | MuZero and task-relevant learned dynamics |
| <a id="p94"></a>P94 | Hafner et al. (2023), [Mastering Diverse Domains through World Models](https://arxiv.org/abs/2301.04104). | DreamerV3; pin the version used |
| <a id="p95"></a>P95 | Bruce et al. (2024), [Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391). | Action-conditioned generative environments |
| <a id="p96"></a>P96 | Assran et al. (2023), [Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://arxiv.org/abs/2301.08243). | Predictive representations; distinguish from a full planner |
| <a id="p102"></a>P102 | Kamath et al. (July 31, 2025), [Tracing Attention Computation Through Feature Interactions](https://transformer-circuits.pub/2025/attention-qk/index.html). Research-site publication. | Connect attention scores to feature interactions and attribution-graph limitations |

#### Selected 2026 research extensions

These are optional critical-reading candidates. Their recency alone does not make them more educationally useful or more reliable than earlier work.

| ID | Source and evidence status | Use and caution |
| --- | --- | --- |
| <a id="p97"></a>P97 | Fraser-Taliente et al. (May 7, 2026), [Natural Language Autoencoders Produce Unsupervised Explanations of LLM Activations](https://transformer-circuits.pub/2026/nla/index.html). Research-site publication. | Compare natural-language and vector-dictionary explanations; examine reconstruction and faithfulness separately |
| <a id="p98"></a>P98 | Gurnee et al. (July 6, 2026), [Verbalizable Representations Form a Global Workspace in Language Models](https://transformer-circuits.pub/2026/workspace/index.html). Research-site publication. | Examine operational evidence for reportable representations; do not infer consciousness from the title or analogy |
| <a id="p99"></a>P99 | Tan et al. (July 2026), [Interpretable GOHR Agents via Sparse Autoencoders](https://arxiv.org/abs/2607.25132). arXiv preprint. | Inspect feature recovery in a controlled rule-learning agent; test generalization beyond its narrow setting |
| <a id="p100"></a>P100 | Zhang et al. (June 2026), [Internalizing the Future: A Unified Agentic Training Paradigm for World Model Planning](https://arxiv.org/abs/2606.27483). arXiv preprint. | Examine predictive grounding versus a plausible planning format; require baseline and task scrutiny |
| <a id="p101"></a>P101 | Sagtani & Garg (November 5, 2026), [Measuring the Marginal Value of Verifier-Based RL Beyond Supervised Fine-Tuning](https://arxiv.org/abs/2611.07639). arXiv preprint. | Practice evaluating a narrow controlled comparison; avoid general conclusions about all RLVR training |

## 10. Suggested technical architecture

### 10.1 Default stack

Use a conventional, maintainable application rather than a large platform framework. The following is a recommended starting point, not a requirement to use every library named.

| Concern | Recommended starting point | Reason and boundary |
| --- | --- | --- |
| Application | Next.js, React, and TypeScript | Fits the Anatomy React integration; pre-render reading content and isolate live controls |
| Publishing model | Static export where practical | Keeps the core textbook host-portable; generate lesson routes at build time |
| Content | Repository-owned MDX with schema-validated metadata | Reviewable lessons with reusable teaching components |
| Mathematics | KaTeX through a tested Markdown/MDX math pipeline | Render at build time; include MathML output and textual explanation |
| Figures | Anatomy kit and small React/SVG components | Pure numerical models separated from art and animation |
| Standard plots | Simple SVG or a small plotting library selected for the actual chart needs | Keep axes, uncertainty, and labels legible |
| Styling | CSS tokens with CSS Modules or a small consistent utility setup | Themeable and easy to inspect; avoid multiple competing style systems |
| Python | Downloadable examples first; optional worker-based Pyodide | Keep heavy runtime loading out of ordinary lesson reading |
| Progress | Versioned local storage with export/import | No account infrastructure needed initially |
| Search | Build-generated local index of published content | No external search service needed for the first release |
| Verification | Vitest or equivalent for pure logic; Playwright for browser flows; an accessibility checker plus manual review | Check mathematics, behavior, accessibility, and rendering |
| CI | Repository CI with pinned dependency installation and explicit checks | Make a clean checkout reproducible |
| Hosting | Any compatible static host; a managed Next.js host if later server features are justified | Avoid requiring a particular vendor for the core course |

Verify compatibility when initializing the repository and pin the chosen versions and package manager in a lockfile. Use a supported Node LTS release satisfying all chosen dependencies; do not assume the Anatomy skill's minimum Node version is sufficient for every newer dependency.

Relevant official references: [Next.js static export](https://nextjs.org/docs/app/guides/static-exports), [Next.js MDX](https://nextjs.org/docs/app/guides/mdx), [KaTeX options](https://katex.org/docs/options), [Pyodide workers](https://pyodide.org/en/stable/usage/webworker.html), and [Playwright writing tests](https://playwright.dev/docs/writing-tests). Consult these at implementation time rather than assuming APIs never change.

### 10.2 Important boundaries

- With static export, enumerate content routes at build time and use client-side behavior for local progress and interactions. Do not quietly add server-only authentication, database calls, or runtime route handlers that the deployment cannot serve.
- Next.js server components may precompute static artwork during the build. Browser behavior belongs in small client components. Check the complete long lesson for hydration and streamed-element issues, not only isolated figure pages.
- Treat MDX as executable trusted repository content. Do not compile arbitrary learner text or external documents as MDX.
- Keep raw model calculations independent of React, SVG, and browser APIs.
- Keep heavy optional code, Python runtimes, and model assets behind explicit loading boundaries.
- Run learner code in a dedicated worker or isolated origin/iframe appropriate to the capability. A worker keeps the UI responsive but is not, by itself, a security boundary for hostile code; restrict access and provide termination. Do not expose secrets or privileged application APIs to examples.
- Tool-use demonstrations should use local fixtures by default. Adding real external actions is a separate product decision, not necessary for teaching the mechanism.

### 10.3 Reusable teaching components

Build only what the current era needs. Likely reusable components include:

- `LessonLayout`, `EraOverview`, and navigation components.
- `LearningGoals`, `PrerequisiteLink`, and `GlossaryTerm`.
- `Derivation` with individually linkable steps and optional shape annotations.
- `WorkedExample` with visible intermediate values.
- `InteractiveFigure` with prediction, controls, readout, caption, and fallback.
- `Experiment` with run status, reset, logs, limitations, and download.
- `Question` and `HintSequence` with accessible feedback.
- `PaperCard`, `SourceCitation`, and `Limitations`.
- `Checkpoint` and local progress controls.

Component names are illustrative. Prefer a few components with clear contracts over a domain-specific language for every paragraph. A component should make good teaching easier without forcing every topic into the same visual layout.

### 10.4 Content and data contracts

Validate these fields at build time; use stable identifiers rather than titles as keys.

| Record | Minimum useful fields |
| --- | --- |
| Era | ID, title, historical range label, driving question, outcomes, ordered lesson IDs, prerequisite IDs, status |
| Lesson | ID, era ID, slug, title, outcomes, prerequisite IDs, source IDs, status, revision, review date, optional tested effort estimate |
| Source | ID, bibliographic metadata, canonical URL, source type, version, access date, verification status |
| Claim/source mapping | Lesson and section, claim, source ID, exact location, limitations, review status |
| Figure | ID, model version, inputs/ranges, scenarios, expected values/invariants, controls, fallback, source IDs |
| Exercise | ID, objective, prompt, interaction type, answer/rubric, hints, misconception feedback, tolerance if applicable |
| Lab | ID, question, environment, data/license, seed/configuration, baseline, expected qualitative behavior, measured resources, limitations |
| Progress | Schema version, content revision, stable lesson/exercise IDs, completion/attempt state, user settings |

Validate missing references, duplicate IDs, broken internal links, invalid lesson order, and prerequisite cycles. Allow a deliberately optional advanced prerequisite only when it is clearly labeled and does not break the advertised core pathway.

Keep solutions separate from question prompts in source organization when that improves maintenance. On a static open-source site they remain discoverable; the pedagogical goal is useful self-study, not secrecy.

### 10.5 Suggested repository structure

```text
.
├── Reference.md
├── README.md
├── AGENTS.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
├── LICENSE-CONTENT
├── THIRD_PARTY_NOTICES.md
├── package.json
├── <package-manager-lockfile>
├── src/
│   ├── app/                    # Routes and pre-rendered pages
│   ├── components/
│   │   ├── learning/           # Derivations, questions, paper cards
│   │   ├── navigation/
│   │   └── iso/                # Vendored Anatomy kit and adapter
│   ├── figures/
│   │   └── <figure-id>/
│   │       ├── brief.md
│   │       ├── model.ts
│   │       ├── geometry.ts
│   │       ├── art.tsx
│   │       ├── live.tsx
│   │       └── scenarios.ts
│   ├── lib/                    # Content validation, quizzes, progress
│   └── styles/                 # Semantic tokens and global reading styles
├── content/
│   ├── eras/                   # Era manifests and authored lessons
│   ├── prerequisites/
│   ├── glossary/
│   └── sources/                # Bibliography and claim mappings
├── experiments/
│   └── <lab-id>/               # README, notebook/script, config, results
├── public/
│   ├── figures/                # Generated static fallbacks
│   └── downloads/              # Approved notebook/data bundles
├── scripts/                    # Content checks and figure tooling
├── tests/
│   ├── models/
│   ├── browser/
│   └── accessibility/
├── docs/
│   ├── BUILD_PLAN.md
│   ├── PROGRESS.md
│   ├── decisions.md
│   ├── TEACHING_GUIDE.md
│   ├── DESIGN.md
│   └── qa/
└── .github/
    ├── workflows/
    └── ISSUE_TEMPLATE/
```

Keep this a single repository and application initially. Add structure when responsibilities justify it. Do not create nine separate applications or introduce a monorepo solely because there are nine eras.

### 10.6 Project commands

The implementation should expose documented commands for development, production build, type checking, linting, model tests, browser tests, content validation, and figure verification. Suggested script names are `dev`, `build`, `typecheck`, `lint`, `test`, `test:e2e`, `check:content`, and `check:figures`.

These are requirements for future repository scripts, not commands that this Markdown file has already created. Document the exact clean-checkout setup and verify it on the chosen hosting output. Local install/build checks should not require API credentials.

## 11. Phased implementation: one part at a time

### Phase 0 — Establish the smallest useful foundation

Read this document and the available Anatomy skill. Record the selected stack, license approach, source policy, and a short implementation plan. Create the route/content skeleton, a simple reading layout, math rendering, navigation, theme controls, and only the interactive/quiz infrastructure needed for Part 1.

Create an honest nine-era roadmap. Future eras should say “Planned” and offer an overview; do not present placeholder prose as a published lesson. Choose a small Part 1 teaching unit as the first end-to-end example. Do not jump to Part 3 for a demonstration at the expense of the requested chronological build order.

**Exit evidence:** a clean production build, a working first lesson route, readable mobile and desktop layouts, correct math rendering, and a clear active-era plan. This phase should not grow into a platform project independent of the lessons.

### Phase 1 — Complete and refine Part 1

1. Decide the part's outcomes, prerequisite needs, and coherent lesson sequence.
2. Read and annotate the anchor sources supporting the planned claims.
3. Draft one complete unit using the full teaching method.
4. Implement its pure model, interaction, exercises, and sources.
5. Inspect the result with a learner's perspective and fix confusing transitions.
6. Extend the validated pattern across the rest of Part 1.
7. Complete its checkpoint, source review, accessibility review, and production verification.

When possible, observe readers with different backgrounds attempting the lesson without coaching. Ask them to explain the mechanism and work a new case; do not rely only on whether they enjoyed the page. If independent learner review has not happened, record that limitation instead of claiming user validation.

**Exit evidence:** Part 1 meets the era definition of done in Section 13, with no unresolved blocker. Record acceptance evidence in `docs/PROGRESS.md`. “Perfect” means meeting these reviewable standards and correcting observed problems; it is not an unlimited polishing loop.

### Phases 2–9 — Repeat for Parts 2 through 9

Complete the current part before beginning full lesson production of the next. Each part follows the same cycle: outcomes → sources → explanation → model → interaction → math/code connection → practice → checkpoint → review → fixes → recorded completion.

At the start of each part:

- Reassess its prerequisites against what the previous parts actually taught.
- Select the smallest useful set of new teaching components and visualization techniques.
- Revisit coverage and depth; do not copy an earlier lesson's length or number of figures mechanically.
- Update the source and research snapshot where the material is time-sensitive.

At the end of each part:

- Run required checks for the new work and relevant regressions.
- Recheck the continuous learner path from the preceding part.
- Record what is complete, known limitations, evidence, and the next part's proposed scope.
- If checks reveal a serious problem, fix it before advancing. Routine reversible fixes within the authorized scope do not require repeatedly asking the user for permission.

Shared fixes and brief planning notes for future eras are allowed throughout. Drafting entire later eras while the active one is unfinished defeats the requested workflow.

### Final integration and publication readiness

After the nine parts are complete, verify the end-to-end learning path, prerequisite graph, glossary consistency, paper index, search, progress migration, and final capstone. Revisit explanations where later lessons reveal a missing earlier bridge.

Prepare a reproducible release and contributor documentation. Public deployment, domain configuration, account creation, and changes to external services should follow the user's authorization for that later implementation task. Creating this specification does not itself deploy a website.

## 12. Coding-agent handoff

### 12.1 Agent working rules

An agent starting in the new repository must:

1. Read `Reference.md`, applicable `AGENTS.md`, `docs/BUILD_PLAN.md`, and `docs/PROGRESS.md` before editing.
2. Inspect existing work and preserve unrelated changes. Do not replace a partially built project with a fresh scaffold without understanding it.
3. Identify the active era and its next unfinished outcome. Work on that slice.
4. Treat the topic map, reading suggestions, and sample interactions as adaptable guidance. Do not turn every suggestion into a compulsory task.
5. Make the learning objective and model behavior clear before choosing an illustration.
6. Read the installed Anatomy skill and the closest appropriate example before building Anatomy art.
7. Verify primary sources for claims; never invent papers, results, citations, dates, or reported measurements.
8. Keep calculations testable and share them across visual, textual, and mathematical readouts.
9. Run the appropriate checks, inspect browser output, and record actual results. Never mark a check passed because it was planned.
10. Update the progress record with completed work, validation evidence, unresolved issues, and the next concrete action.

Do not rewrite all curriculum prose in one pass, add unnecessary accounts or services, or substitute a decorative animated mockup for a working educational mechanism. When blocked on information, continue independent work that is useful and state the specific missing fact.

### 12.2 Suggested initial prompt

```text
Read Reference.md and the applicable repository instructions. Build the
interactive AI-history learning site using its teaching and design principles.

Start with the minimal shared foundation and Part 1. Preserve the chronological
workflow: complete the current part to its definition of done before producing
the next part's full lessons.

The curriculum map is flexible. Choose an appropriate lesson sequence and
examples; prioritize patient explanations and a coherent learner journey over
implementing every suggested topic or visualization literally.

For central mathematics, define symbols and shapes, show intermediate steps,
include a numerical example, and connect the equation to the interaction and
code. Use the installed Anatomy skill where a crafted mechanism helps explain
the idea, and use ordinary charts or tables where they teach better.

Begin by inspecting the repository and writing a short build plan. Then implement
one complete Part 1 learning unit as the quality reference. Verify its model,
responsive layout, keyboard access, reduced-motion behavior, exercises, and
primary sources. Deepen and complete Part 1 before advancing.

Keep docs/PROGRESS.md current, recording actual verification results and any
remaining limitations. Do not claim completion for planned or untested work.
```

### 12.3 Suggested progress record

For each era, track:

```text
Era and current status:
Learning outcomes covered / still missing:
Published or review-ready lessons:
Source verification status:
Mathematics and model verification:
Interactive and accessible behavior:
Exercises and checkpoint:
Browser/visual/performance review:
Learner review and observed confusion:
Blocking issues / accepted limitations:
Completion evidence and date:
Next concrete action:
```

Recommended development states are `planned`, `draft`, `implemented`, `in-review`, and `complete`. Publication status should be separate, such as `unpublished` or `published`. A complete implementation is not automatically a public release.

## 13. QA and definition of done

### 13.1 Review matrix

| Area | Required evidence before an era is complete |
| --- | --- |
| Teaching | Each outcome has an explanation and a way for the learner to demonstrate it; transitions and prerequisites have been reviewed |
| Mathematics | Central equations meet the math contract; worked examples are independently recomputed; dimensions and assumptions are explicit |
| Scientific accuracy | Claims trace to reviewed primary-source locations; historical dates and evidence-status labels are accurate |
| Models | Numerical behavior and important edge cases pass meaningful tests against small independently computed cases |
| Interactions | Prediction, run/step, comparison where useful, reset, and feedback work; readouts agree with the model |
| Accessibility | Keyboard, focus, screen-reader description, contrast, motion, and touch alternatives have been manually checked in addition to automated checks |
| Visuals | Desktop and phone captures have been inspected; Anatomy figures pass applicable audits and both-theme close-up review |
| Experiments | Documented small configuration runs from a clean environment, or is honestly identified as a supplied replay with reproducible source artifacts |
| Assessment | Questions map to outcomes; solutions, hints, rubrics, and misconception feedback are correct and usable |
| Platform | Production build, route navigation, search, internal links, local progress, and relevant regressions pass |
| Performance | Measured on a documented device/profile; expensive optional assets are lazy-loaded; offscreen and reduced-motion behavior are correct |
| Documentation | Progress and decisions reflect the actual state; remaining limitations are explicit |

### 13.2 Accessibility acceptance criteria

Target [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) for published pages. A clean automated report is useful evidence but does not establish conformance by itself.

- Use semantic headings, landmarks, form labels, button names, and a skip link.
- Every interaction must work by keyboard with visible focus and without a keyboard trap. Scope shortcuts to focused figures; do not intercept normal page navigation or typing.
- Provide meaningful SVG titles/descriptions and a text or table alternative describing the information necessary to meet the learning objective.
- A drag action needs an equivalent button, slider, numeric input, or stepping mechanism. A hover-only fact needs a focus/tap alternative.
- Explain changes with text as well as color. Test the actual light and dark combinations, including disabled controls and highlighted mathematics.
- Respect reduced motion while allowing intentional state changes. Provide pause/stop where continuous motion would interfere with reading.
- Avoid screen-reader announcements on every frame. Announce settled values or meaningful user-driven changes.
- Check text zoom and reflow, including a 320 CSS-pixel-wide reading view. Test a representative 390-pixel phone viewport as well.
- Use comfortable touch targets; aim for at least 44 by 44 CSS pixels for primary controls as a product target, while meeting applicable WCAG target-size rules.
- Keep mathematical output available to assistive technology and explain the expression in prose. Test representative equations with an actual screen reader.
- Check quiz errors, hint reveals, loading states, and focus recovery after navigation or resetting an experiment.

### 13.3 Anatomy verification

For each Anatomy figure, use the installed skill's supported tooling and record the commands and results in the era's QA notes. Commands below illustrate the upstream workflow; adapt paths to the actual vendored kit and build layout.

```text
node <figure-build>.mjs --audit
node <anatomy>/scripts/lines.mjs <built-figure>.html --out <qa-image>.png
node <anatomy>/scripts/capture.mjs <built-figure>.html --width 390
node <anatomy>/scripts/drive.mjs <built-figure>.html --actions <scenario-actions>.json
```

Do not paste these placeholders into CI unchanged. Establish the real paths and wrapper scripts first.

Required review includes:

- Resting state, every meaningful scenario, keyboard input, and several moments during motion.
- Light and dark themes, desktop and phone, reduced motion, and no-WebGL behavior when applicable.
- Four-times close-ups of the subject and mechanism, including junctions, line endings, depth overlaps, and text clipping.
- The numerical readout checked against the pure model for each tested state.
- A zero-failure geometry audit when the figure uses the relevant recorded geometry, pipes, cables, or round parts, and the line-end check required by the skill. Do not suppress a failure with false recorded geometry or arbitrary depth biases.
- A documented reason for any genuinely inapplicable audit; “it looks fine” is not an exemption.
- The complete course page as well as isolated figures, to catch hydration, key, layout, and loading problems.

Open and inspect the captured images. Creating screenshots without looking at them is not visual QA. Passing geometry checks does not prove that a picture explains the concept well.

### 13.4 Performance and resilience

Set budgets before adding expensive features. Initial planning targets may include a readable core page within a small initial payload, no Python/model downloads before an explicit run action, and prompt feedback from ordinary controls. Establish concrete byte, load-time, and frame-time budgets using the first complete Part 1 lesson, then record the device, network profile, browser, and measurement method in `docs/qa/`.

Useful starting targets to validate are no whole-page horizontal overflow, stable layout while figures load, ordinary control feedback within approximately 100 ms, and smooth enough active animation to follow the mechanism on the tested phone profile. These are design targets, not measurements already achieved or universal guarantees. If a mechanism needs heavier computation, move it off the main thread or show progress and permit cancellation.

Test slow loading, failed optional asset requests, disabled/unavailable storage, interrupted experiments, malformed quiz input, and WebGL failure where relevant. Core prose, equations, navigation links, and static explanatory figures should remain available without running an experiment. With JavaScript disabled, explain which optional activities need it rather than leaving empty panels.

### 13.5 Lesson definition of done

A lesson is done when its outcomes are taught clearly, its central reasoning is complete, its sources support its claims, its examples are correct, and a learner can use its interaction and practice without encountering a missing explanation or broken flow. Required model, browser, accessibility, and visual checks must pass. Relevant limitations and optional dependencies must be visible.

A historical lesson may demonstrate understanding through source analysis and a trace rather than a training experiment. A mathematical lesson cannot satisfy this gate with only an intuitive summary and a final formula. Match the evidence to the objective.

### 13.6 Era definition of done

An era is done when:

- Its selected lessons form a coherent path through the stated outcomes.
- Every included lesson meets the lesson definition of done.
- Required prerequisite explanations exist and links return the reader to their place.
- Its checkpoint has useful feedback, correct solutions or rubrics, and targeted review links.
- Its historical narrative, terminology, notation, and source metadata are consistent.
- Its complete page set passes the applicable QA matrix and production build checks.
- No missing content, incorrect mathematics, broken main interaction, inaccessible learning outcome, or unsupported central claim remains as an unresolved blocker.
- Any remaining minor issue has a recorded scope and does not prevent the promised learning experience.
- Completion evidence is recorded, including whether independent learner review occurred.

The next era may begin once this evidence is recorded. A maintainer may request an additional review; absent such an instruction, do not invent a repeated permission ceremony for routine progress.

### 13.7 Whole-course definition of done

The course is ready for a complete release when all nine eras meet their gates; the final checkpoint works; the prerequisite and source indexes are consistent; the main pathway has been reviewed end to end; setup and contribution instructions work from a clean checkout; and known limitations are accurately stated.

Do not report “complete course” while later eras remain roadmap pages. Partial publication is acceptable when its scope and status are honest.

## 14. Open-source maintenance and editorial governance

Recommended licensing is MIT for original application code and a clearly chosen open content license, such as CC BY 4.0, for original lessons. The maintainer should select and document the content license before publication. Preserve third-party licenses separately; paper figures, data sets, fonts, and pretrained weights may have their own terms.

Provide contribution guidance for lessons, mathematics corrections, experiments, accessibility fixes, and source additions. A contribution template should ask for the learning outcome, evidence, changed behavior, and appropriate validation rather than a generic assertion that the page is improved.

Maintain a small editorial process:

1. A contributor proposes a change with its source or learning rationale.
2. Review verifies the reasoning, evidence, accessibility, and learner impact relevant to that change.
3. A correction updates the lesson revision and, where material, the course changelog.
4. Research updates preserve the earlier version's context and state what changed.

Keep visitor progress on the visitor's device by default. Add analytics only when there is a clear learning or maintenance purpose, describe what is collected, and minimize collection. Do not upload learner code or written answers as an incidental side effect of an experiment.

Separate content errors, usability issues, and new research suggestions in issue templates so contributors can provide the right evidence. Add a visible “Report confusion” route to lesson pages: confusion is useful feedback even when the mathematics is correct.

## 15. Scope discipline

### Build first

- A readable learning layout and a clear nine-era roadmap.
- The minimum shared math, source, interaction, and question components needed for Part 1.
- A complete, carefully explained Part 1 learning experience.
- Honest status, local progress, necessary prerequisite support, and usable feedback.
- The verification and documentation needed to finish that part confidently.

### Grow when the active era needs it

- Additional visualization families and more advanced mathematics components.
- Richer search, an embedded Python editor, downloadable lab bundles, and paper-reading companions.
- More demanding model experiments with small accessible alternatives.
- Deeper assessment and learner-review tooling.

### Defer unless separately justified

- Accounts, cloud progress sync, social features, leaderboards, and paid tiers.
- A live AI tutor or automated open-ended grader.
- Real external actions in tool-use demos.
- Large-model training or mandatory GPU use.
- Elaborate 3D scenes, an entire visualization gallery built in advance, or a platform rewrite.

The lasting standard is that a learner can see **why an idea exists, how it works, where the mathematics comes from, how to implement or inspect it, and how to test their own understanding**. Let that standard guide content choices throughout the nine eras.
