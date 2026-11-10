import type { LessonId } from "./course";

// Editorial briefs only. Artwork, models, and interactive controls will be added separately.
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
    id: "xor-boundary", lesson: "logic", number: "02.2", title: "The limit of one decision boundary",
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
    id: "entropy-distribution", lesson: "information", number: "03.2", title: "The same outcomes, less uncertainty",
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
} as const satisfies Record<string, { id: string; lesson: LessonId; number: string; title: string; question: string; caption: string; subject: string; rung: number; scenarios: readonly string[]; alternative: string }>;

export type FigureId = keyof typeof figures;
export const primaryFigures: Record<LessonId, FigureId> = {
  computation: "tape-machine", logic: "threshold-unit", information: "message-space", imitation: "conversation-test", dartmouth: "research-threads",
};
