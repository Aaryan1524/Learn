import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { AND_DATA, OR_DATA, XOR_DATA, predict, learn, train, boundary } from "../lib/perceptron.ts";
import { PYTHON_CODE } from "../lib/perceptron-code.ts";
import { checkNumeric, numericTasks } from "../lib/exercises.ts";
import { emptyProgress, parseProgress } from "../lib/progress.ts";
import { REVISION, lessons } from "../lib/course.ts";

test("bias-form scores preserve individual products and the equality convention", () => {
  assert.deepEqual(predict({ weights: [2, -1], bias: -.5 }, [1, 0]), { products: [2, -0], score: 1.5, prediction: 1 });
  assert.equal(predict({ weights: [2, -1], bias: -.5 }, [0, 1]).score, -1.5);
  assert.equal(predict({ weights: [1, 1], bias: -2 }, [1, 1]).prediction, 1);
  for (const [data, bias] of [[AND_DATA, -1.5], [OR_DATA, -.5]] as const) assert.deepEqual(data.map(e => predict({ weights: [1, 1], bias }, e.inputs).prediction), data.map(e => e.label));
});
test("one false alarm updates the matching weight and bias, without mutating old parameters", () => {
  const initial = { weights: [0, 0] as const, bias: 0 };
  const step = learn(initial, { inputs: [1, 0], label: 0 }, .5);
  assert.equal(step.error, -1);
  assert.deepEqual(step.next, { weights: [-.5, 0], bias: -.5 });
  assert.deepEqual(initial, { weights: [0, 0], bias: 0 });
  assert.equal(predict(step.next, [1, 0]).score, -1);
  assert.deepEqual(learn({ weights: [1, 1], bias: -1.5 }, { inputs: [1, 1], label: 1 }).next, { weights: [1, 1], bias: -1.5 });
});
test("the score-change derivation agrees with direct substitution", () => {
  for (const e of AND_DATA) {
    const p = { weights: [.2, -.3] as const, bias: .1 };
    const step = learn(p, e, .5);
    const actual = predict(step.next, e.inputs).score - step.score;
    const expected = .5 * step.error * (e.inputs[0] ** 2 + e.inputs[1] ** 2 + 1);
    assert.ok(Math.abs(actual - expected) < 1e-12);
  }
});
test("zero-start AND training reproduces all five epoch records", () => {
  const result = train(AND_DATA);
  assert.equal(result.converged, true);
  assert.deepEqual(result.history.map(r => [r.epoch, r.mistakes, [...r.parameters.weights], r.parameters.bias, r.predictions]), [
    [1, 2, [1, 1], 0, [1, 1, 1, 1]], [2, 3, [2, 1], -1, [0, 1, 1, 1]],
    [3, 3, [2, 1], -2, [0, 0, 1, 1]], [4, 2, [2, 2], -2, [0, 1, 1, 1]], [5, 1, [2, 1], -3, [0, 0, 0, 1]],
  ]);
  assert.deepEqual(train(OR_DATA).history.at(-1)!.predictions, [0, 1, 1, 1]);
  const capped = train(XOR_DATA, 20);
  assert.equal(capped.converged, false); assert.equal(capped.history.length, 20);
});
test("invalid model domains and stopping settings are rejected", () => {
  assert.throws(() => predict({ weights: [1, 1], bias: 0 }, [2, 0]), RangeError);
  for (const rate of [0, -1, NaN, Infinity]) assert.throws(() => train(AND_DATA, 10, rate), RangeError);
  assert.throws(() => train([], 10), RangeError);
  for (const cap of [0, .5, 10001]) assert.throws(() => train(AND_DATA, cap), RangeError);
});
test("boundary interpretation handles slopes, vertical lines, and constant classifiers", () => {
  assert.deepEqual(boundary([2, 1], -1), { kind: "line", slope: -2, intercept: 1 });
  assert.deepEqual(boundary([1, 0], -.5), { kind: "vertical", x: .5 });
  assert.deepEqual(boundary([0, 0], -1), { kind: "constant", prediction: 0, zeroEverywhere: false });
  assert.deepEqual(boundary([0, 0], 0), { kind: "constant", prediction: 1, zeroEverywhere: true });
});
test("the hidden OR/AND construction implements every XOR case", () => {
  for (const e of XOR_DATA) {
    const or = predict({ weights: [1, 1], bias: -.5 }, e.inputs).prediction;
    const and = predict({ weights: [1, 1], bias: -1.5 }, e.inputs).prediction;
    assert.equal(predict({ weights: [1, -2], bias: -.5 }, [or, and]).prediction, e.label);
  }
});
test("old progress preserves five completed lessons and resets the expanded checkpoint", () => {
  const oldIds = ["computation", "logic", "information", "imitation", "dartmouth"];
  const old = { ...emptyProgress(), revision: "foundations-1", completed: oldIds, opened: oldIds, lastLesson: "dartmouth", checkpointAttempted: true };
  const migrated = parseProgress(JSON.parse(JSON.stringify(old)));
  assert.deepEqual(migrated.completed, oldIds); assert.equal(migrated.lastLesson, "dartmouth");
  assert.equal(migrated.revision, REVISION); assert.equal(migrated.checkpointAttempted, false);
  assert.equal(lessons.length - migrated.completed.length, 3);
  assert.equal(parseProgress({ ...migrated, checkpointAttempted: true }).checkpointAttempted, true);
});
test("numeric practice accepts equivalent answers and the full valid bias intervals", () => {
  const and = numericTasks.find(t => t.id === "and-bias")!.fields[0];
  for (const n of ["-2", "-1.5", "−1.5", "-1.0001"]) assert.equal(checkNumeric(n, and), true);
  for (const n of ["-2.01", "-1", "", "Infinity", "NaN", "0x1", "1+2"]) assert.equal(checkNumeric(n, and), false);
  const or = numericTasks.find(t => t.id === "or-bias")!.fields[0];
  assert.equal(checkNumeric("-1", or), true); assert.equal(checkNumeric("0", or), false);
  assert.equal(checkNumeric("1.5e0", { label: "z", expected: 1.5 }), true);
  assert.equal(new Set(numericTasks.map(t => t.id)).size, 8);
  for (const task of numericTasks) assert.ok(lessons.some(l => l.id === task.lesson));
});
test("the displayed Python is the download, and its full training trace matches TypeScript", () => {
  assert.equal(readFileSync(new URL("../public/labs/perceptron.py", import.meta.url), "utf8"), PYTHON_CODE);
  const output = execFileSync("python3", ["-c", "import runpy,json; m=runpy.run_path('public/labs/perceptron.py'); print(json.dumps(m['train'](m['DATA'])[2]))"], { encoding: "utf8" });
  const expected = train(AND_DATA).history.map(r => [r.epoch, r.mistakes, [...r.parameters.weights], r.parameters.bias, r.predictions]);
  assert.deepEqual(JSON.parse(output), expected);
});
