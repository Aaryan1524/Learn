"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { lessonPath } from "@/lib/course";
import { useCourse } from "./book-shell";

import type { QuestionData } from "@/lib/questions";
import { questions } from "@/lib/questions";
import { numericTasks } from "@/lib/exercises";
import { NumericExercise } from "./numeric-exercise";

export function Question({ question, onAttempt }: { question: QuestionData; onAttempt?: (id: string, correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hint, setHint] = useState(0);
  const [solution, setSolution] = useState(false);
  const correct = submitted && selected === question.answer;
  return <div className="quiz">
    <fieldset>
      <legend>{question.prompt}</legend>
      {question.options.map((option, i) => <label key={option} className={`quiz-option ${selected === i ? "is-chosen" : ""}`}>
        <input type="radio" name={question.id} checked={selected === i} onChange={() => { setSelected(i); setSubmitted(false); setSolution(false); }} />
        <span className="letter">{String.fromCharCode(65 + i)}</span>
        <span>{option}</span>
        {submitted && i === selected ? (correct ? <Check aria-label="Correct" /> : <X aria-label="Incorrect" />) : <span />}
      </label>)}
    </fieldset>
    <div className="quiz-bar">
      <button className="btn" disabled={selected === null} onClick={() => { setSubmitted(true); onAttempt?.(question.id, selected === question.answer); }}>Check</button>
      <button className="text-btn" disabled={hint >= question.hints.length} onClick={() => setHint(h => h + 1)}>Hint{hint > 0 && ` ${hint}/${question.hints.length}`}</button>
      <button className="text-btn" onClick={() => setSolution(!solution)} aria-expanded={solution}>{solution ? "Hide answer" : "Show answer"}</button>
    </div>
    {hint > 0 && <div className="quiz-note">{question.hints.slice(0, hint).map((h, i) => <p key={h}><strong style={{ display: "inline" }}>Hint {i + 1}.</strong> {h}</p>)}</div>}
    {submitted && selected !== null && <div className="quiz-note" role="status">
      <strong>{correct ? <><Check aria-hidden="true" />Correct</> : <><X aria-hidden="true" />Not quite</>}</strong>
      <p>{question.explanations[selected]}</p>
      {!correct && <Link href={`${lessonPath(question.review)}#worked-example`}>Revisit the worked example →</Link>}
    </div>}
    {solution && <div className="quiz-note"><strong>Answer: {String.fromCharCode(65 + question.answer)}</strong><p>{question.explanations[question.answer]}</p></div>}
  </div>;
}

export function Checkpoint() {
  const { update } = useCourse();
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const attempted = Object.keys(answers).length;
  const total = questions.length + numericTasks.length;
  const outcomes = [...questions.map(q => ({ id: q.id, objective: q.objective, review: q.review })), ...numericTasks.map(t => ({ id: t.id, objective: t.objective, review: t.lesson }))];
  return <>
    {questions.map(q => <section className="checkpoint-question" key={q.id}>
      <p className="section-label">{q.objective}</p>
      <Question question={q} onAttempt={(id, correct) => { setAnswers(a => ({ ...a, [id]: correct })); update(p => ({ ...p, checkpointAttempted: true })); }} />
    </section>)}
    {numericTasks.map(task => <section className="checkpoint-question" key={task.id}><p className="section-label">{task.objective}</p><NumericExercise task={task} onAttempt={(id, correct) => { setAnswers(a => ({ ...a, [id]: correct })); update(p => ({ ...p, checkpointAttempted: true })); }} /></section>)}
    <section id="implementation-task"><h2>Build it without the listing.</h2><p>Write a predictor and a bounded training loop in plain Python. Train AND, print the final parameters, and test every row. Then change only the labels to OR, and finally XOR. This code task is self-assessed; the website does not execute or automatically grade your Python.</p><details className="detail-panel"><summary>Implementation rubric and reference<span>Self-assessment</span></summary><ul><li>Calculate both weighted products, add bias, and use the stated ≥ rule.</li><li>Compute label minus prediction and update each weight from its matching input.</li><li>Update bias separately and repeat complete passes.</li><li>Check all four final predictions, and report a capped run honestly.</li><li>Explain why a cap alone is not a proof that a dataset is nonseparable.</li></ul><p><Link href="/eras/foundations/build-perceptron#worked-example">Compare with the line-by-line reference</Link> or <a href="/labs/perceptron.py" download>download the complete solution</a>.</p></details></section>
    <section id="reflection">
      <h2>Reflect</h2>
      <div aria-live="polite">
        <p><strong>{attempted} of {total} checked tasks attempted.</strong></p>
        {attempted > 0 && <ul>{outcomes.filter(q => q.id in answers).map(q => <li key={q.id}>{q.objective}: {answers[q.id] ? "ready for a new example" : <Link href={lessonPath(q.review)}>review the lesson</Link>}</li>)}</ul>}
      </div>
      <p className="muted">This samples the foundations; it doesn’t certify mastery. Explain one answer aloud, then change an assumption and see if it still holds.</p>
      <label className="small" htmlFor="reflection-note">Note to self (not saved)</label>
      <textarea id="reflection-note" placeholder="I can explain… I’d like to revisit…" rows={4} />
      <details className="detail-panel">
        <summary>Try a second version<span>Practice</span></summary>
        <p>Also recalculate the score for inputs (0,1), change the learning-rate example from 0.5 to 1, derive a vertical boundary, and explain XOR using the shared midpoint. Trace input 01 instead of 100; change the threshold from 2 to 1; use a fair coin instead of a certain one; propose a test using new judges; and name one result that would support the Dartmouth proposal.</p>
        <p>Check: the tape becomes 10 then halts on the blank; inputs 1 and 0 now output 1; the fair coin has entropy 1 bit. For the new variants: the score for weights (2,−1), bias −0.5 at (0,1) is −1.5; the false-alarm update at rate 1 gives (−1,0), bias −1; a vertical boundary solves x1 = −b/w1. The historical explanations are self-assessed: name a measured behavior, a comparison, and a condition that could disconfirm your claim.</p>
      </details>
    </section>
  </>;
}
