import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { eras, lessonPath, lessons, sources, type LessonId } from "@/lib/course";
import { ContinueLink, DepthSelector, LessonControls } from "./book-shell";
import { Question } from "./learning";
import { questions } from "@/lib/questions";
import { LessonBody, Limitations } from "./lesson-content";

export function FigureSlot({ number, title, description }: { number: string; title: string; description: string }) {
  return <figure className="fig" id={`figure-${number}`} data-figure-slot={number}><div className="fig-stage">Figure {number} · {title} · coming soon</div><figcaption>{description}</figcaption></figure>;
}

export function Pager({ back, on }: { back?: { href: string; label: string; small?: string }; on?: { href: string; label: string; small?: string } }) {
  return <nav className="pager" aria-label="Pagination">
    {back && <Link href={back.href}><small>{back.small || "Previous"}</small><strong>← {back.label}</strong></Link>}
    {on && <Link href={on.href} className="on"><small>{on.small || "Next"}</small><strong>{on.label} →</strong></Link>}
  </nav>;
}

export function LessonRows() {
  return <ol className="rows">
    {lessons.map(l => <li key={l.id}><Link className="row" href={lessonPath(l.id)}><span className="row-n">{l.number}</span><span className="row-t">{l.title}<span className="row-d">{l.short}</span></span><span className="row-m">{l.year}</span></Link></li>)}
    <li><Link className="row" href="/eras/foundations/checkpoint"><span className="row-n">✓</span><span className="row-t">Checkpoint<span className="row-d">Five questions across the part</span></span><span className="row-m">Quiz</span></Link></li>
  </ol>;
}

export function EraRows() {
  return <ol className="rows">{eras.map((e, i) => <li key={e.slug}><Link className={`row ${i ? "is-planned" : ""}`} href={`/eras/${e.slug}`}><span className="row-n">{e.number}</span><span className="row-t">{e.title}<span className="row-d">{e.question}</span></span><span className="row-m">{i ? e.range : "Live"}</span></Link></li>)}</ol>;
}

export function HomePage() {
  return <>
    <h1 className="title">A History of AI <span>· an open textbook</span></h1>
    <p className="statement">How we got from “what can a machine compute?” to today’s models, one idea at a time.</p>
    <ul className="meta">
      <li>Part 1 of 9 is live</li>
      <li>5 lessons</li>
      <li>Free, no account</li>
      <li><Link href="/prerequisites">Arithmetic is enough</Link></li>
    </ul>
    <div className="lede">
      <p>AI didn’t arrive all at once. It grew out of questions. <em>What can a machine compute? Can rules become reasoning? Can experience become knowledge?</em></p>
      <p>Each lesson takes one idea, works a small example by hand, checks your understanding, and links the original paper.</p>
    </div>
    <div className="actions"><ContinueLink /><Link className="text-btn" href="/eras/foundations">Part 1 overview</Link></div>
    <section id="beginning">
      <h2>Start here: Foundations, 1930s–1956</h2>
      <LessonRows />
    </section>
    <section id="the-journey">
      <h2>The nine parts</h2>
      <p className="muted">The dates overlap because the ideas do.</p>
      <EraRows />
    </section>
  </>;
}

export function EraOverview({ slug }: { slug: string }) {
  const index = eras.findIndex(e => e.slug === slug);
  const era = eras[index];
  const prev = eras[index - 1];
  const next = eras[index + 1];
  if (slug !== "foundations") return <>
    <nav className="crumbs" aria-label="Breadcrumb"><Link href="/eras">All parts</Link><span>/</span><span aria-current="page">Part {era.number}</span></nav>
    <h1 className="title">{era.title} <span>· Part {Number(era.number)}, {era.range}</span></h1>
    <p className="statement">{era.question}</p>
    <ul className="meta"><li>Planned</li><li>Not written yet</li></ul>
    <div className="lede"><p>{era.description}</p><p className="muted">This part is on the roadmap. Part 1 is the place to start.</p></div>
    <div className="actions"><Link className="btn" href="/eras/foundations">Go to Part 1</Link></div>
    <Pager back={{ href: `/eras/${prev.slug}`, label: prev.title }} on={next && { href: `/eras/${next.slug}`, label: next.title }} />
  </>;
  return <>
    <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span aria-current="page">Part 1</span></nav>
    <h1 className="title">Foundations <span>· Part 1, 1930s–1956</span></h1>
    <p className="statement">What can a machine compute, and how could anyone study intelligence scientifically?</p>
    <ul className="meta"><li>5 lessons</li><li>Self-paced</li><li><Link href="/prerequisites">Notation refresher</Link></li></ul>
    <div className="lede"><p>Before AI had a name, people were asking what it means to follow a rule, represent a decision, or measure uncertainty. These five lessons build those ideas, then show how they made machine intelligence something you could investigate.</p></div>
    <div className="actions"><ContinueLink /></div>
    <section id="lessons">
      <h2>Lessons</h2>
      <LessonRows />
    </section>
    <section id="outcomes">
      <h2>By the end you can</h2>
      <ul className="steps">
        <li>Trace a computation and name its complete state.</li>
        <li>Build a logical decision from a weighted sum.</li>
        <li>Calculate information in a simple probability model.</li>
        <li>Separate a behavioral test from a claim about intelligence.</li>
        <li>Read a research proposal as a proposal.</li>
      </ul>
    </section>
    <Pager back={{ href: "/", label: "Home" }} on={{ href: lessonPath("computation"), label: lessons[0].short, small: "Lesson 01" }} />
  </>;
}

const readingPrompt: Record<LessonId, string> = {
  computation: "Find the tape, scanned symbol, and machine configuration in §§1–2. How does our toy machine simplify the formal model?",
  logic: "Which biological features does the formal model simplify? Read the abstract and separate a model from a physiological claim.",
  information: "Read the introduction and §6. Which problem does the measure answer, and which question about meaning does it leave aside?",
  imitation: "Compare the original setup in §1 with today’s shorthand for the Turing test. What changes in the telling?",
  dartmouth: "Find one conjecture, one proposed task, and one result the document does not yet establish.",
};
const bridge: Record<LessonId, string> = {
  computation: "A machine needs a state and rules. What if those rules represented a logical decision?",
  logic: "We can calculate with yes and no. Next: how much does a yes or no tell us?",
  information: "We can measure uncertainty. Measuring intelligent behavior needs a different kind of definition.",
  imitation: "A test turns an ambition into a procedure. A research community turns many of them into a field.",
  dartmouth: "The foundations give us precise pieces. Next comes representing and solving problems.",
};
const credit: Record<LessonId, string> = { computation: "Turing, 1936", logic: "McCulloch & Pitts, 1943", information: "Shannon, 1948", imitation: "Turing, 1950", dartmouth: "McCarthy et al., 1955" };
const figureNote: Record<LessonId, string> = {
  computation: "A tape-machine stepper will go here. The full text trace is above.",
  logic: "A threshold-logic builder will go here. Every input case is in the table above.",
  information: "An uncertainty experiment will go here. The worked probabilities are above.",
  imitation: "An explorer for test design and interpretation will go here.",
  dartmouth: "A map of the research threads that met at Dartmouth will go here.",
};

export function LessonPage({ id }: { id: LessonId }) {
  const lesson = lessons.find(l => l.id === id)!;
  const index = lessons.findIndex(l => l.id === id);
  const source = sources.find(s => s.id === lesson.source)!;
  const prev = lessons[index - 1];
  const next = lessons[index + 1];
  return <div className="lesson-page">
    <nav className="crumbs" aria-label="Breadcrumb"><Link href="/eras/foundations">Part 1</Link><span>/</span><span aria-current="page">Lesson {lesson.number} of 05</span></nav>
    <h1 className="title">{lesson.title} <span>· {lesson.year}</span></h1>
    <p className="statement">{lesson.description}</p>
    <ul className="meta"><li>{lesson.short}</li><li>{credit[id]}</li><li><Link href={`/prerequisites?return=${lessonPath(id)}`}>Notation refresher</Link></li></ul>
    <ul className="steps" aria-label="You will learn to">{lesson.outcomes.map(x => <li key={x}>{x}</li>)}</ul>
    <DepthSelector />
    <LessonBody id={id} />
    <section id="the-figure"><h2>Figure</h2><FigureSlot number={lesson.number} title={lesson.short} description={figureNote[id]} /></section>
    <section id="check-understanding"><h2>Check yourself</h2><Question question={questions[index]} /></section>
    <section id="where-it-fails"><h2>Limits</h2><Limitations id={id} /></section>
    <section id="original-source">
      <h2>Source</h2>
      <ul className="rows"><li><a className="row" href={source.url} target="_blank" rel="noreferrer"><span className="row-n">↗</span><span className="row-t">{source.title}<span className="row-d">{source.author} · {source.location}</span></span><span className="row-m">{source.year}</span></a></li></ul>
      <p className="small" style={{ marginTop: 12 }}>Reading prompt: {readingPrompt[id]}</p>
    </section>
    <div className="next-up"><p>{bridge[id]}</p><LessonControls id={id} /></div>
    <Pager
      back={prev ? { href: lessonPath(prev.id), label: prev.short } : { href: "/eras/foundations", label: "Part 1 overview" }}
      on={next ? { href: lessonPath(next.id), label: next.short } : { href: "/eras/foundations/checkpoint", label: "Checkpoint" }} />
    <p className="small" style={{ marginTop: 20 }}>Something didn’t click? <a href={`https://github.com/Aaryan1524/Learn/issues/new?template=confusion.yml&title=${encodeURIComponent(`Lesson: ${lesson.title}`)}`} target="_blank" rel="noreferrer">Tell me <ArrowUpRight size={11} style={{ verticalAlign: "-1px" }} /></a></p>
  </div>;
}
