export type Pair = readonly [number, number];
export type Parameters = { weights: Pair; bias: number };
export type Example = { inputs: Pair; label: 0 | 1 };
export const AND_DATA: readonly Example[] = [
  { inputs: [0, 0], label: 0 }, { inputs: [0, 1], label: 0 },
  { inputs: [1, 0], label: 0 }, { inputs: [1, 1], label: 1 },
];
export const OR_DATA = AND_DATA.map(e => ({ ...e, label: Number(e.inputs[0] + e.inputs[1] > 0) as 0 | 1 }));
export const XOR_DATA = AND_DATA.map(e => ({ ...e, label: Number(e.inputs[0] !== e.inputs[1]) as 0 | 1 }));
function validate(parameters: Parameters, inputs: Pair) {
  if (![...parameters.weights, parameters.bias, ...inputs].every(Number.isFinite)) throw new RangeError("Use finite values.");
  if (inputs.some(x => x !== 0 && x !== 1)) throw new RangeError("This teaching model accepts binary inputs.");
}
export function predict(parameters: Parameters, inputs: Pair) {
  validate(parameters, inputs);
  const products: Pair = [parameters.weights[0] * inputs[0], parameters.weights[1] * inputs[1]];
  const score = products[0] + products[1] + parameters.bias;
  return { products, score, prediction: (score >= 0 ? 1 : 0) as 0 | 1 };
}
export function learn(parameters: Parameters, example: Example, rate = 1) {
  if (!Number.isFinite(rate) || rate <= 0) throw new RangeError("Use a finite positive learning rate.");
  if (example.label !== 0 && example.label !== 1) throw new RangeError("Use a binary label.");
  const before = predict(parameters, example.inputs);
  const error = example.label - before.prediction;
  const delta: Parameters = { weights: [rate * error * example.inputs[0], rate * error * example.inputs[1]], bias: rate * error };
  const next: Parameters = { weights: [parameters.weights[0] + delta.weights[0], parameters.weights[1] + delta.weights[1]], bias: parameters.bias + delta.bias };
  return { ...before, error, delta, next };
}
export function train(data: readonly Example[], maxEpochs = 100, rate = 1, initial: Parameters = { weights: [0, 0], bias: 0 }) {
  if (!data.length || !Number.isInteger(maxEpochs) || maxEpochs < 1 || maxEpochs > 10000) throw new RangeError("Use data and an epoch cap from 1 to 10000.");
  if (!Number.isFinite(rate) || rate <= 0) throw new RangeError("Use a finite positive learning rate.");
  data.forEach(e => { validate(initial, e.inputs); if (e.label !== 0 && e.label !== 1) throw new RangeError("Use binary labels."); });
  let parameters: Parameters = { weights: [...initial.weights] as [number, number], bias: initial.bias };
  const history: { epoch: number; mistakes: number; parameters: Parameters; predictions: number[] }[] = [];
  for (let epoch = 1; epoch <= maxEpochs; epoch++) {
    let mistakes = 0;
    for (const example of data) { const step = learn(parameters, example, rate); mistakes += Number(step.error !== 0); parameters = step.next; }
    const predictions = data.map(e => predict(parameters, e.inputs).prediction);
    history.push({ epoch, mistakes, parameters, predictions });
    if (data.every((e, i) => predictions[i] === e.label)) return { parameters, history, converged: true };
  }
  return { parameters, history, converged: false };
}
export function boundary(weights: Pair, bias: number) {
  if (![...weights, bias].every(Number.isFinite)) throw new RangeError("Use finite parameters.");
  const [w1, w2] = weights;
  if (w2 !== 0) return { kind: "line" as const, slope: -w1 / w2, intercept: -bias / w2 };
  if (w1 !== 0) return { kind: "vertical" as const, x: -bias / w1 };
  return { kind: "constant" as const, prediction: (bias >= 0 ? 1 : 0) as 0 | 1, zeroEverywhere: bias === 0 };
}
