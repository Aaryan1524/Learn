import test from "node:test";
import assert from "node:assert/strict";
import { binaryEntropy, tapeStep, threshold, type TapeState } from "../lib/models.ts";
import { emptyProgress, parseProgress } from "../lib/progress.ts";
import { eras, lessons, sources } from "../lib/course.ts";
import { questions } from "../lib/questions.ts";
import { figures, primaryFigures } from "../lib/figures.ts";

test("tape execution preserves the input and exposes the separate halt transition", () => {
  const input: TapeState = { tape: "101", head: 0, halted: false, steps: 0 };
  const trace = [input];
  while (!trace.at(-1)!.halted) trace.push(tapeStep(trace.at(-1)!));
  assert.deepEqual(trace.map(s => [s.tape, s.head, s.halted]), [["101", 0, false], ["001", 1, false], ["011", 2, false], ["010", 3, false], ["010", 3, true]]);
  assert.equal(input.tape, "101");
  assert.equal(trace.at(-1)!.steps, 4);
  assert.deepEqual(tapeStep(trace.at(-1)!), trace.at(-1));
});
test("empty input halts on the first blank-reading transition", () => {
  assert.deepEqual(tapeStep({ tape: "", head: 0, halted: false, steps: 0 }), { tape: "", head: 0, halted: true, steps: 1 });
});
test("threshold boundaries reproduce AND, OR, and always-off", () => {
  const pairs = [[0, 0], [0, 1], [1, 0], [1, 1]];
  assert.deepEqual(pairs.map(([a, b]) => threshold(a, b, 2)), [0, 0, 0, 1]);
  assert.deepEqual(pairs.map(([a, b]) => threshold(a, b, 1)), [0, 1, 1, 1]);
  assert.deepEqual(pairs.map(([a, b]) => threshold(a, b, 3)), [0, 0, 0, 0]);
});
test("entropy is finite at certainty, symmetric, and maximal at a fair coin", () => {
  assert.equal(binaryEntropy(0), 0); assert.equal(binaryEntropy(1), 0); assert.equal(binaryEntropy(.5), 1);
  assert.ok(Math.abs(binaryEntropy(.75) - .8112781244591328) < 1e-12);
  for (let i = 0; i <= 100; i++) { const p = i / 100; assert.ok(binaryEntropy(p) <= 1); assert.ok(Math.abs(binaryEntropy(p) - binaryEntropy(1 - p)) < 1e-12); }
  for (const invalid of [-1, 1.1, NaN, Infinity]) assert.throws(() => binaryEntropy(invalid), RangeError);
});
test("progress survives JSON export/import while opened and completed remain distinct", () => {
  const original = { ...emptyProgress(), opened: ["computation"], completed: [], lastLesson: "computation" };
  assert.deepEqual(parseProgress(JSON.parse(JSON.stringify(original))), original);
  assert.deepEqual(parseProgress({ ...original, completed: ["logic", "logic"] }).completed, ["logic"]);
});
test("malformed and incompatible progress imports are rejected", () => {
  for (const raw of [null, {}, { ...emptyProgress(), version: 2 }, { ...emptyProgress(), revision: "old" }, { ...emptyProgress(), completed: ["fake"] }, { ...emptyProgress(), opened: "all" }, { ...emptyProgress(), checkpointAttempted: "yes" }, { ...emptyProgress(), lastLesson: "fake" }]) assert.throws(() => parseProgress(raw));
});
test("published lessons and exercises reference real, unique content", () => {
  assert.equal(new Set(lessons.map(l => l.id)).size, 5);
  assert.equal(new Set(eras.map(e => e.slug)).size, 9);
  assert.equal(questions.length, lessons.length);
  for (const lesson of lessons) assert.ok(sources.some(s => s.id === lesson.source));
  for (const q of questions) { assert.ok(lessons.some(l => l.id === q.review)); assert.equal(q.options.length, q.explanations.length); assert.ok(q.answer >= 0 && q.answer < q.options.length); assert.ok(q.hints.length >= 2); }
});

test("future figure briefs have distinct identifiers, valid lessons, and text equivalents", () => {
  const briefs = Object.values(figures);
  assert.equal(new Set(briefs.map(f => f.id)).size, briefs.length);
  assert.equal(new Set(briefs.map(f => f.number)).size, briefs.length);
  for (const f of briefs) {
    assert.ok(lessons.some(l => l.id === f.lesson));
    assert.ok(f.question && f.alternative && f.subject && f.scenarios.length);
  }
  for (const lesson of lessons) assert.equal(figures[primaryFigures[lesson.id]].lesson, lesson.id);
});
