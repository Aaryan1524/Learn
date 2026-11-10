"use client";
import { useState } from "react";
import Link from "next/link";
import { checkNumeric, type NumericTask } from "@/lib/exercises";
import { lessonPath } from "@/lib/course";

export function NumericExercise({ task, onAttempt }: { task: NumericTask; onAttempt?: (id: string, correct: boolean) => void }) {
  const [values, setValues] = useState<string[]>(task.fields.map(() => ""));
  const [checked, setChecked] = useState(false);
  const [hint, setHint] = useState(0);
  const [reveal, setReveal] = useState(false);
  const correct = task.fields.every((field, i) => checkNumeric(values[i], field));
  return <form className="numeric-exercise" onSubmit={e => { e.preventDefault(); setChecked(true); onAttempt?.(task.id, correct); }}>
    <fieldset><legend>{task.prompt}</legend><div className="numeric-fields">{task.fields.map((field, i) => <label key={field.label} htmlFor={`${task.id}-${i}`}><span>{field.label}</span><input id={`${task.id}-${i}`} inputMode="decimal" autoComplete="off" value={values[i]} aria-invalid={checked && !checkNumeric(values[i], field)} onChange={e => { setValues(old => old.map((v, j) => i === j ? e.target.value : v)); setChecked(false); }} /></label>)}</div></fieldset>
    <div className="actions"><button className="btn" type="submit">Check calculation</button><button type="button" className="text-btn" disabled={hint === task.hints.length} onClick={() => setHint(h => h + 1)}>Hint{hint > 0 && ` ${hint}/${task.hints.length}`}</button><button type="button" className="text-btn" aria-expanded={reveal} onClick={() => setReveal(!reveal)}>{reveal ? "Hide solution" : "Worked solution"}</button></div>
    {hint > 0 && <div className="quiz-note">{task.hints.slice(0, hint).map((h, i) => <p key={h}><strong>Hint {i + 1}.</strong> {h}</p>)}</div>}
    {checked && <div className="quiz-note" role="status"><strong>{correct ? "Correct calculation." : "Check the highlighted values."}</strong><p>{correct ? task.solution : "Use finite numbers; check the sign, the bias, and whether you entered a new value or an increment."}</p>{!correct && <Link href={`${lessonPath(task.lesson)}#worked-example`}>Review the worked example →</Link>}</div>}
    {reveal && <div className="quiz-note"><p>{task.solution}</p></div>}
  </form>;
}
