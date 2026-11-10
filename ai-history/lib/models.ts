export type TapeState = { tape: string; head: number; halted: boolean; steps: number };
export function tapeStep(state: TapeState): TapeState {
  if (state.halted) return state;
  if (state.head >= state.tape.length) return { ...state, halted: true, steps: state.steps + 1 };
  return { tape: state.tape.slice(0, state.head) + (state.tape[state.head] === "1" ? "0" : "1") + state.tape.slice(state.head + 1), head: state.head + 1, halted: false, steps: state.steps + 1 };
}
export function threshold(a: number, b: number, theta: number): number { return a + b >= theta ? 1 : 0; }
export function binaryEntropy(p: number): number {
  if (!Number.isFinite(p) || p < 0 || p > 1) throw new RangeError("Probability must be between 0 and 1.");
  const term = (x: number) => x === 0 ? 0 : -x * Math.log2(x);
  return term(p) + term(1 - p);
}
