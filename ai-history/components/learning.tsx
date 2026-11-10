"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, CircleHelp, RotateCcw } from "lucide-react";
import { lessonPath } from "@/lib/course";
import { useCourse } from "./book-shell";

import type { QuestionData } from "@/lib/questions";
import { questions } from "@/lib/questions";

export function Question({ question, onAttempt }: { question: QuestionData; onAttempt?: (id: string, correct: boolean) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [hint, setHint] = useState(0);
  const [solution, setSolution] = useState(false);
  const correct = submitted && selected === question.answer;
  return <div className="question-card"><div className="question-heading"><span className="eyebrow">PAUSE & THINK</span><CircleHelp size={16} /></div><fieldset><legend>{question.prompt}</legend><div className="question-options">{question.options.map((option, i) => <label key={option} className={`${selected === i ? "chosen" : ""} ${submitted && selected === i ? correct ? "correct-choice" : "incorrect-choice" : ""}`}><input type="radio" name={question.id} checked={selected === i} onChange={() => { setSelected(i); setSubmitted(false); setSolution(false); }} /><span className="option-letter">{String.fromCharCode(65 + i)}</span><span>{option}</span>{submitted && i === selected && correct && <Check size={16} />}</label>)}</div></fieldset><div className="question-actions"><button className="small-primary" disabled={selected === null} onClick={() => { setSubmitted(true); onAttempt?.(question.id, selected === question.answer); }}>Check my thinking <ArrowRight size={13} /></button><button className="text-button" disabled={hint >= question.hints.length} onClick={() => setHint(h => h + 1)}>A little hint {hint > 0 && `(${hint}/${question.hints.length})`}</button></div>{hint > 0 && <div className="hint-block">{question.hints.slice(0, hint).map((h, i) => <p key={h}><strong>Hint {i + 1}.</strong> {h}</p>)}</div>}{submitted && selected !== null && <div className={`answer-feedback ${correct ? "correct" : "retry"}`} role="status"><strong>{correct ? "You’ve got the idea." : "Let’s work through that."}</strong><p>{question.explanations[selected]}</p>{!correct && <Link href={`${lessonPath(question.review)}#worked-example`}>Revisit the explanation →</Link>}</div>}<button className="solution-toggle text-button" onClick={() => setSolution(!solution)} aria-expanded={solution}>{solution ? "Hide worked answer" : "Reveal the worked answer"}</button>{solution && <p className="worked-answer">{question.explanations[question.answer]}</p>}</div>;
}

export function Checkpoint() {
  const { update } = useCourse();
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const attempted = Object.keys(answers).length;
  return <><div className="checkpoint-intro"><span className="eyebrow">A MOMENT TO CONNECT THE IDEAS</span><p>No timer. No locked chapters. Use this as a conversation with your understanding.</p></div>{questions.map(q => <section className="checkpoint-question" key={q.id}><p className="section-label">{q.objective}</p><Question question={q} onAttempt={(id, correct) => { setAnswers(a => ({ ...a, [id]: correct })); update(p => ({ ...p, checkpointAttempted: true })); }} /></section>)}<section id="reflection"><h2>What feels clear? What needs another look?</h2><p>This checkpoint samples the foundations; it does not certify mastery. Explain one answer aloud, then change an assumption and see whether your explanation still holds.</p><label className="reflection-label" htmlFor="reflection-note">A note to your future self (kept only while this page is open)</label><textarea id="reflection-note" placeholder="I can explain… I’d like to revisit…" rows={4} /><div className="checkpoint-results" aria-live="polite"><strong>{attempted} of 5 outcomes attempted</strong>{attempted > 0 && <ul>{questions.filter(q => q.id in answers).map(q => <li key={q.id}>{q.objective}: {answers[q.id] ? "ready for a new example" : <Link href={lessonPath(q.review)}>review the lesson</Link>}</li>)}</ul>}</div><details className="detail-panel"><summary>Try a second version</summary><p>Trace input 01 instead of 100; change the threshold from 2 to 1; use a fair coin instead of a certain one; propose a test using new judges; and name one result that would support the Dartmouth proposal.</p><p>Check: the tape becomes 10 then halts on the blank; inputs 1 and 0 now output 1; the fair coin has entropy 1 bit. The final two are self-assessed: specify a measured behavior, comparison, and a condition that could disconfirm your claim.</p></details></section></>;
}
