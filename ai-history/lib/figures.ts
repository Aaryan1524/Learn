import type { LessonId } from "./course";

// Editorial briefs only. Artwork and interactive controls will be added separately.
// Tested arithmetic and training models already live in models.ts and perceptron.ts.
// IDs stay stable when a reserved stage is replaced by an Anatomy figure.
export const figures = {
  "tape-machine": {
    id: "tape-machine", lesson: "computation", number: "01.1", title: "A tape, a head, a rule",
    question: "What changes in one step of a computation?",
    caption: "Follow the scanned symbol, the write operation, and the head as the machine applies one rule at a time.",
    subject: "The tape, head, and finite control of the teaching machine.", rung: 2,
    scenarios: ["A binary input", "An empty tape", "The transition into halt"],
    alternative: "The program table and complete execution trace in the worked example.",
  },
  "machine-state": {
    id: "machine-state", lesson: "computation", number: "01.2", title: "What the tape doesn’t tell you",
    question: "Can the same tape lead to different next steps?",
    caption: "Compare configurations with the same tape but a different head position or control state. The configuration includes all three.",
    subject: "Two configurations of the same tape machine.", rung: 2,
    scenarios: ["Move the head", "Change the control state"],
    alternative: "The configuration definition and the final two rows of the trace above.",
  },
  "threshold-unit": {
    id: "threshold-unit", lesson: "logic", number: "02.1", title: "When a sum becomes a decision",
    question: "Which inputs are enough to reach the threshold?",
    caption: "Bring two binary inputs into a weighted sum, then compare that sum with a threshold. Follow the same values in the truth table.",
    subject: "Binary inputs, weighted contributions, sum, comparison, and binary output.", rung: 2,
    scenarios: ["AND", "OR", "Always off"],
    alternative: "The weighted-sum calculation and all four rows of the truth table.",
  },
  "xor-boundary": {
    id: "xor-boundary", lesson: "logic", number: "02.6", title: "The limit of one decision boundary",
    question: "Why can’t a single threshold express XOR?",
    caption: "Compare the four binary input cases with the contradictory requirements for a single linear threshold. A later figure will make those constraints visible.",
    subject: "The four binary input pairs and a linear threshold boundary.", rung: 2,
    scenarios: ["AND is separable", "XOR creates a contradiction"],
    alternative: "The four-step inequality argument above.",
  },
  "message-space": {
    id: "message-space", lesson: "information", number: "03.1", title: "Four possibilities, two answers",
    question: "How many binary answers identify one of four equally likely messages?",
    caption: "Start with A, B, C, and D. One answer chooses a pair; the next identifies the message within it.",
    subject: "Four possible messages and two successive binary partitions.", rung: 2,
    scenarios: ["Four equally likely messages", "Two equally likely messages"],
    alternative: "The binary-question example at the beginning of the worked explanation.",
  },
  "entropy-distribution": {
    id: "entropy-distribution", lesson: "information", number: "03.4", title: "The same outcomes, less uncertainty",
    question: "What happens to average surprise when one outcome becomes more likely?",
    caption: "Compare a fair coin, a biased coin, and a certain outcome. See how each probability weights its surprise before the contributions are added.",
    subject: "A finite probability distribution and its probability-weighted information terms.", rung: 2,
    scenarios: ["Fair: 1 bit", "Biased: about 0.811 bits", "Certain: 0 bits"],
    alternative: "The worked entropy calculation and boundary explanation above.",
  },
  "conversation-test": {
    id: "conversation-test", lesson: "imitation", number: "04.1", title: "A result depends on the test",
    question: "What does a conversation score actually establish?",
    caption: "Inspect a toy evaluation protocol: the participants, conversations, judge, labels, and score. Keep the observation separate from its interpretation.",
    subject: "The defined elements of the original teaching evaluation, not a reconstruction of Turing’s game.", rung: 2,
    scenarios: ["Balanced conversations", "A constant-label baseline", "New judges and conversations"],
    alternative: "The 20-conversation protocol, baseline, and evidence distinctions in the worked example.",
  },
  "research-threads": {
    id: "research-threads", lesson: "dartmouth", number: "05.1", title: "Several threads, one research agenda",
    question: "Which questions did the Dartmouth proposal bring together?",
    caption: "Place computation, logic, information, and behavioral testing alongside the proposed research agenda. The proposal’s ambitions remain distinct from demonstrated results.",
    subject: "The research topics and primary documents; choose a conventional source map if it explains them more clearly than isometric art.", rung: 2,
    scenarios: ["Earlier research threads", "The 1955 proposal for 1956"],
    alternative: "The proposal’s claim-evidence table and concluding synthesis.",
  },
  "program-execution": {"id": "program-execution", "lesson": "computation", "number": "01.3", "title": "A program and two executions", "question": "How can the same rules act on different inputs?", "caption": "Place the fixed rule table beside separate traces for 101 and 01.", "subject": "Fixed rules and two execution traces.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "weighted-inputs": {"id": "weighted-inputs", "lesson": "logic", "number": "02.2", "title": "Every multiplication has a role", "question": "Which input contributes to the score?", "caption": "Keep each input beside its weight, product, and contribution to the sum.", "subject": "Two features, two weights, and their products.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "bias-shift": {"id": "bias-shift", "lesson": "logic", "number": "02.3", "title": "The input-independent contribution", "question": "How does bias change a decision without changing the features?", "caption": "Compare z for the same inputs at several bias values, including an exact zero score.", "subject": "Weighted sum, bias, score, and threshold output.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "gate-comparison": {"id": "gate-comparison", "lesson": "logic", "number": "02.4", "title": "AND and OR, side by side", "question": "How can changing only the bias change the logical rule?", "caption": "Inspect all four input pairs for AND and OR, using the same weights.", "subject": "Two truth tables coupled to their threshold units.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "alarm-rule": {"id": "alarm-rule", "lesson": "logic", "number": "02.5", "title": "A Boolean alarm", "question": "When should the alarm turn on?", "caption": "Map armed and open inputs to a simple AND alarm. This is a teaching rule, not a complete security system.", "subject": "Two Boolean conditions and a binary alarm output.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "surprise-scale": {"id": "surprise-scale", "lesson": "information", "number": "03.2", "title": "Probability and surprise", "question": "Why does a rare event carry more surprise?", "caption": "Compare probabilities 1, 1/2, and 1/4 with surprises 0, 1, and 2 bits.", "subject": "Three outcomes and base-two information values.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "entropy-terms": {"id": "entropy-terms", "lesson": "information", "number": "03.3", "title": "An average built from its terms", "question": "Why must each surprise be weighted by its probability?", "caption": "Show the individual 0.311 and 0.500 bit contributions before adding them.", "subject": "Probability, surprise, product, and total.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "evidence-scope": {"id": "evidence-scope", "lesson": "imitation", "number": "04.2", "title": "Observation and interpretation", "question": "Which conclusion is actually supported by a test?", "caption": "Separate the measured score, its interpretation, and an unmeasured claim about consciousness.", "subject": "An evaluation record and distinct claims.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "two-approaches": {"id": "two-approaches", "lesson": "dartmouth", "number": "05.2", "title": "Rules and learned connections", "question": "Where is knowledge represented in each approach?", "caption": "Compare a written symbolic alarm rule with a threshold model whose parameters can be learned.", "subject": "Explicit predicates and weighted connections.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "learning-loop": {"id": "learning-loop", "lesson": "perceptron", "number": "06.1", "title": "A prediction meets a label", "question": "What changes when an example reveals a mistake?", "caption": "Follow features through prediction, comparison, and a parameter update.", "subject": "Input, parameters, score, prediction, label, error, and new parameters.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "error-direction": {"id": "error-direction", "lesson": "perceptron", "number": "06.2", "title": "The sign of a mistake", "question": "Why can the update be positive, negative, or zero?", "caption": "Compare a missed positive, a false alarm, and a correct prediction.", "subject": "Three labelled examples and their errors.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "parameter-update": {"id": "parameter-update", "lesson": "perceptron", "number": "06.3", "title": "One example, three updates", "question": "Why does a zero input leave its weight unchanged?", "caption": "Keep both weight increments and the bias increment visible beside the arithmetic.", "subject": "The three parameter update terms.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "training-epochs": {"id": "training-epochs", "lesson": "perceptron", "number": "06.4", "title": "Learning across passes", "question": "Why is one corrected example not enough?", "caption": "Inspect repeated passes through the four AND examples and test the whole table after each pass.", "subject": "Ordered examples, epochs, mistakes, and final predictions.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "margin-condition": {"id": "margin-condition", "lesson": "perceptron", "number": "06.5", "title": "The condition behind convergence", "question": "Which assumptions make the convergence statement possible?", "caption": "Separate a strict separating margin from an epoch cap and from generalization to unseen data.", "subject": "Augmented inputs, a separator, and a positive margin.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "python-prediction": {"id": "python-prediction", "lesson": "build-perceptron", "number": "07.1", "title": "From symbols to statements", "question": "Which Python line performs each mathematical operation?", "caption": "Align input lookup, multiplication, addition, bias, and threshold comparison with the source.", "subject": "Python statements and arithmetic values.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "python-training": {"id": "python-training", "lesson": "build-perceptron", "number": "07.2", "title": "A reproducible training trace", "question": "What changes during the first and final training passes?", "caption": "Match the deterministic Python output to the epoch table and inspect a full first pass.", "subject": "Program state and training rows.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "test-all-inputs": {"id": "test-all-inputs", "lesson": "build-perceptron", "number": "07.3", "title": "Four tests, not one", "question": "Does the final model classify every AND example correctly?", "caption": "Keep the four inputs, scores, predictions, and labels together.", "subject": "A final four-case evaluation table.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "linear-boundary": {"id": "linear-boundary", "lesson": "decision-boundaries", "number": "08.1", "title": "A score becomes a line", "question": "Which points lie on each side of z = 0?", "caption": "Plot the four binary inputs and the boundary 2x1 + x2 - 1 = 0.", "subject": "Labelled coordinates and a straight decision boundary.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "boundary-motion": {"id": "boundary-motion", "lesson": "decision-boundaries", "number": "08.2", "title": "Orientation and offset", "question": "How do weights and bias move the boundary?", "caption": "Compare a rotated boundary, a parallel bias shift, and a vertical-line case.", "subject": "A two-dimensional linear score with parameter comparisons.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "xor-points": {"id": "xor-points", "lesson": "decision-boundaries", "number": "08.3", "title": "The two diagonals of XOR", "question": "Can one line separate alternating corners?", "caption": "Place the positive pairs (0,1) and (1,0) opposite the negative pairs, then inspect the shared midpoint.", "subject": "Four labelled points, their segments, and midpoint.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
  "hidden-layer-xor": {"id": "hidden-layer-xor", "lesson": "decision-boundaries", "number": "08.4", "title": "Two hidden decisions and an output", "question": "What changes when multiple threshold decisions are composed?", "caption": "Show OR and AND hidden outputs feeding a final threshold; verify all four cases.", "subject": "Two hidden threshold units and one output unit.", "rung": 2, "scenarios": ["Worked example", "Changed assumption"], "alternative": "The adjacent explanation, arithmetic, and worked table provide the text equivalent."},
} as const satisfies Record<string, { id: string; lesson: LessonId; number: string; title: string; question: string; caption: string; subject: string; rung: number; scenarios: readonly string[]; alternative: string }>;

export type FigureId = keyof typeof figures;
export const primaryFigures: Record<LessonId, FigureId> = {
  computation: "tape-machine", logic: "threshold-unit", information: "message-space", imitation: "conversation-test", dartmouth: "research-threads", perceptron: "learning-loop", "build-perceptron": "python-prediction", "decision-boundaries": "linear-boundary",
};
