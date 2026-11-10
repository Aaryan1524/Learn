export const REVISION = "foundations-2";
export const lessonPath = (slug: string) => `/eras/foundations/${slug}`;
export const lessons = [
  { id: "computation", number: "01", title: "A machine that follows rules", short: "Computation & state", year: "1936", description: "A 1936 prelude: before we ask a machine to think, we need to say what it means to compute.", outcomes: ["Separate a program from its execution", "Trace the complete state of a small machine", "Distinguish computability from efficiency"], source: "turing-1936" },
  { id: "logic", number: "02", title: "From logic to a thinking circuit", short: "Logic & early neurons", year: "1943", description: "How a few yes-or-no decisions become something we can calculate with.", outcomes: ["Derive a weighted score and apply its threshold", "Choose weights and bias for AND and OR", "Explain why a single threshold cannot express XOR"], source: "mcculloch-pitts" },
  { id: "information", number: "03", title: "Putting a number on uncertainty", short: "Information & uncertainty", year: "1948", description: "A message matters because, before it arrives, something is still unknown.", outcomes: ["Work with a small probability distribution", "Calculate surprise and average information", "Separate information from meaning"], source: "shannon" },
  { id: "imitation", number: "04", title: "Can machines think?", short: "Turing’s question", year: "1950", description: "A philosophical question becomes an experiment—and the distinction matters.", outcomes: ["Describe an operational test", "Separate observed behavior from an explanation", "Design a better-controlled evaluation"], source: "turing-1950" },
  { id: "dartmouth", number: "05", title: "A field gets its name", short: "The Dartmouth proposal", year: "1955–56", description: "An ambitious research proposal brings several threads under one name.", outcomes: ["Distinguish a proposal from demonstrated results", "Recognize overlapping research traditions", "Connect the foundations to symbolic problem solving"], source: "dartmouth" },
  { id: "perceptron", number: "06", title: "A neuron learns from mistakes", short: "The perceptron learns", year: "1958", description: "A decision rule becomes a learning algorithm when examples can change its weights.", outcomes: ["Calculate an error and a parameter update", "Explain learning rate and repeated training", "State when convergence is guaranteed"], source: "rosenblatt-1958" },
  { id: "build-perceptron", number: "07", title: "Build a perceptron from scratch", short: "Train it in Python", year: "1958 model", description: "Turn the arithmetic into a small Python program, then teach it the AND truth table.", outcomes: ["Implement prediction and mistake-driven updates", "Trace a reproducible training run", "Test every input and recognize a stopping limit"], source: "rosenblatt-1958" },
  { id: "decision-boundaries", number: "08", title: "What a line can separate", short: "Boundaries & XOR", year: "1958 model", description: "See what the weights and bias mean geometrically—and why one perceptron cannot learn XOR.", outcomes: ["Derive and interpret a straight decision boundary", "Explain XOR algebraically and geometrically", "Construct XOR with hidden threshold units"], source: "novikoff" },
] as const;
export type LessonId = typeof lessons[number]["id"];
export const lessonSections = [
  ["why-this-idea", "The idea"], ["the-figure", "The mechanism"], ["worked-example", "Worked example"], ["check-understanding", "Check yourself"], ["where-it-fails", "Limits"], ["original-source", "Source"],
] as const;
export const eras = [
  { number: "01", slug: "foundations", title: "Foundations", range: "1943–1959", question: "How did machines become capable of learning from examples?", description: "The birth of AI: artificial neurons, machine intelligence, and the perceptron. Includes a 1936 computation prelude." },
  { number: "02", slug: "symbolic-ai", title: "Symbolic AI", range: "1956–1980s", question: "Can intelligence be written as rules?", description: "Search, knowledge, and the challenge of representing the world." },
  { number: "03", slug: "learning-from-data", title: "Learning from data", range: "1950s–2012", question: "What if we learned the rules instead?", description: "Statistical models, neural networks, and fitting a model to evidence." },
  { number: "04", slug: "deep-learning", title: "Deep learning", range: "2012–2017", question: "What changes when learning goes deep?", description: "Learned representations, vision, and the practical ingredients of scale." },
  { number: "05", slug: "sequences-and-attention", title: "Sequences & attention", range: "2013–2019", question: "How does a model use context?", description: "Sequence models, attention, and learning to generate." },
  { number: "06", slug: "foundation-models", title: "Foundation models", range: "2018–2023", question: "Can one model become a foundation for many tasks?", description: "Transformers, pretraining, adaptation, and evaluation." },
  { number: "07", slug: "ai-systems", title: "AI becomes a system", range: "2023–2024", question: "What happens beyond the model?", description: "Retrieval, memory, tools, and the systems around a prediction." },
  { number: "08", slug: "reasoning-and-agents", title: "Reasoning & agents", range: "2024–2026", question: "How can a system plan, act, and check its work?", description: "Verification, test-time computation, and sequential action." },
  { number: "09", slug: "frontier", title: "The open frontier", range: "Ongoing", question: "How do we understand and control what we build?", description: "Interpretability, reliability, and questions still being investigated." },
] as const;
export const sources = [
  { id: "turing-1936", author: "Alan M. Turing", year: "1936", title: "On Computable Numbers, with an Application to the Entscheidungsproblem", url: "https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf", location: "§§1–2: computing machines; §§8–11: limits", note: "Original paper · institutional PDF" },
  { id: "mcculloch-pitts", author: "Warren S. McCulloch & Walter Pitts", year: "1943", title: "A Logical Calculus of the Ideas Immanent in Nervous Activity", url: "https://jontalle.web.engr.illinois.edu/uploads/410-NS.F22/McCulloch-Pitts-1943-neural-networks.pdf", location: "Introduction and formal assumptions; original article pp. 115–133", note: "Original paper · institutional scan; formal assumptions differ from our modern teaching unit" },
  { id: "shannon", author: "Claude E. Shannon", year: "1948", title: "A Mathematical Theory of Communication", url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf", location: "Introduction; Part I, §6: choice, uncertainty, and entropy", note: "Original paper, corrected reprint · institutional PDF" },
  { id: "turing-1950", author: "Alan M. Turing", year: "1950", title: "Computing Machinery and Intelligence", url: "https://doi.org/10.1093/mind/LIX.236.433", location: "§1: the imitation game; §6: contrary views; §7: learning machines", note: "Original journal article · Mind 59, 433–460" },
  { id: "dartmouth", author: "John McCarthy, Marvin Minsky, Nathaniel Rochester & Claude Shannon", year: "1955", title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence", url: "https://www-formal.stanford.edu/jmc/history/dartmouth/dartmouth.html", location: "Dated August 31, 1955; opening proposal and research topics", note: "Primary document · proposal for the 1956 summer project" },
  { id: "rosenblatt-1958", author: "Frank Rosenblatt", year: "1958", title: "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain", url: "https://web.stanford.edu/class/psych209a/ReadingsByDate/01_30/Rosenblatt58Perceptron.pdf", location: "Psychological Review 65(6), 386–408; opening questions, model, and reinforcement discussion", note: "Original paper · institutional scan; our two-input trainer is a simplified modern teaching model" },
  { id: "novikoff", author: "A. B. J. Novikoff", year: "1962 symposium", title: "On Convergence Proofs on Perceptrons", url: "https://cs.uwaterloo.ca/~y328yu/classics/novikoff.pdf", location: "Symposium on the Mathematical Theory of Automata, pp. 615–622", note: "Later mathematical reference, outside 1943–1959; citation follows Freund & Schapire (1999)" },
] as const;
export const glossary = [
  ["Algorithm", "A finite description of precise steps for a task. A particular execution can still fail to halt."],
  ["Computation", "The execution of rules that transform a represented state."],
  ["State", "The information needed, together with fixed rules, to determine the next step."],
  ["Transition", "One permitted change from a current state to a next state."],
  ["Threshold unit", "A unit that outputs 1 when a weighted sum meets a chosen threshold, and 0 otherwise."],
  ["Probability", "A number from 0 to 1 assigned to an outcome; the probabilities of all mutually exclusive, exhaustive outcomes sum to 1."],
  ["Bit", "A unit of information using base-two logarithms. One fair binary choice carries one bit."],
  ["Entropy", "The probability-weighted average surprise of an outcome, for a specified distribution."],
  ["Operational test", "A procedure that specifies what is observed, under which conditions, and how it is scored."],
  ["Computability", "Whether an effective procedure exists, distinct from how much time or memory it needs."],
  ["Bias", "A constant added to the weighted input score. It moves a threshold without depending on a particular input."],
  ["Label", "The target output attached to a training example, such as 0 or 1."],
  ["Learning rate", "A positive scalar that sets the size of a parameter update."],
  ["Epoch", "One pass through all examples in a training dataset."],
  ["Linear separability", "The existence of a linear score that places the two classes on opposite sides of a decision boundary."],
  ["Margin", "A positive separation between labelled examples and a boundary, measured with a stated normalization."],
] as const;
