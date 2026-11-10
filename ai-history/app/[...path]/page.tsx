import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EraOverview, EraRows, LessonPage, Pager, SourceEntry } from "@/components/editorial";
import { ProgressPage } from "@/components/book-shell";
import { Checkpoint, Question } from "@/components/learning";
import { questions } from "@/lib/questions";
import { eras, glossary, lessonPath, lessons, sources, type LessonId } from "@/lib/course";
import type { Metadata } from "next";

type Props = { params: Promise<{ path: string[] }>; searchParams: Promise<Record<string, string | string[] | undefined>> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { path } = await params;
  const last = path.at(-1)!;
  const title = lessons.find(l => l.id === last)?.title || eras.find(e => e.slug === last)?.title || ({ papers: "Papers", about: "About", glossary: "Glossary", prerequisites: "Notation refresher", checkpoint: "Checkpoint", progress: "Progress", eras: "All parts" } as Record<string, string>)[last] || "Page not found";
  return { title };
}

const termId = (term: string) => term.toLowerCase().replaceAll(" ", "-");

export default async function Page({ params, searchParams }: Props) {
  const { path } = await params;
  const route = path.join("/");
  if (route === "progress") return <ProgressPage />;
  if (path.length === 2 && path[0] === "eras" && eras.some(e => e.slug === path[1])) return <EraOverview slug={path[1]} />;
  if (path.length === 3 && path[0] === "eras" && path[1] === "foundations" && lessons.some(l => l.id === path[2])) return <LessonPage id={path[2] as LessonId} />;

  if (route === "eras/foundations/checkpoint") return <>
    <nav className="crumbs" aria-label="Breadcrumb"><Link href="/eras/foundations">Part 1</Link><span>/</span><span aria-current="page">Checkpoint</span></nav>
    <h1 className="title">Checkpoint <span>· Part 1</span></h1>
    <p className="statement">One question per lesson. No timer, nothing locked.</p>
    <Checkpoint />
    <Pager back={{ href: lessonPath("dartmouth"), label: lessons[4].short }} on={{ href: "/eras/symbolic-ai", label: "Part 2: Symbolic AI", small: "Planned" }} />
  </>;

  if (route === "eras") return <>
    <h1 className="title">All parts <span>· 1930s to today</span></h1>
    <p className="statement">Nine parts, one story. Part 1 is written; the rest are planned.</p>
    <section><h2>Roadmap</h2><EraRows /></section>
  </>;

  if (route === "papers") return <>
    <h1 className="title">Papers <span>· the originals behind Part 1</span></h1>
    <p className="statement">Read what the authors claimed, how they argued, and what they left open.</p>
    <section>
      <h2>Part 1 sources</h2>
      <div className="source-library">{sources.map(source => <SourceEntry key={source.id} source={source} />)}</div>
      <p className="small" style={{ marginTop: 12 }}>Links go to original documents or institutional copies; publisher access varies. The McCulloch–Pitts summary is based on the abstract; full-text review is pending. Summaries reviewed 9 November 2026.</p>
    </section>
  </>;

  if (route === "glossary") return <>
    <h1 className="title">Glossary <span>· Part 1</span></h1>
    <p className="statement">Precise words for the ideas in the foundations.</p>
    <dl className="defs">{glossary.map(([term, definition]) => <Fragment key={term}><dt id={termId(term)}>{term}</dt><dd>{definition}</dd></Fragment>)}</dl>
  </>;

  if (route === "prerequisites") {
    const query = await searchParams;
    const from = typeof query.return === "string" && lessons.some(l => query.return === `/eras/foundations/${l.id}`) ? query.return : "/eras/foundations";
    return <>
      <h1 className="title">Notation refresher <span>· ordinary arithmetic is enough</span></h1>
      <p className="statement">The symbols are shorthand. Here is what each one means.</p>
      <section id="binary"><h2>Binary values and indexed names</h2><p>A binary value is 0 or 1, often standing for false and true. The subscript in <code>x₁</code> names the first input; it doesn’t multiply. With <code>x₁ = 1</code> and <code>x₂ = 0</code>, <code>x₁ + x₂ = 1</code>.</p></section>
      <section id="functions"><h2>Functions</h2><p>If <code>f(x) = x + 2</code>, then <code>f(3) = 5</code>. The parentheses hold the input. A function can also take a structured state, such as a tape plus a head position.</p></section>
      <section id="sums"><h2>Sums</h2><p>Σ means add. “Sum pᵢ from i = 1 to 3” is <code>p₁ + p₂ + p₃</code>. With 1/2, 1/4 and 1/4, the sum is 1. The index <code>i</code> says which entry you’re on.</p></section>
      <section id="logarithms"><h2>Logarithms</h2><p>A logarithm undoes a power. Since <code>2³ = 8</code>, <code>log₂ 8 = 3</code>. Since <code>2⁻² = 1/4</code>, <code>log₂(1/4) = −2</code>.</p><p>So an event with probability 1/4 carries <code>−log₂(1/4) = 2</code> bits of surprise. The minus sign makes the value nonnegative.</p></section>
      <section id="probability"><h2>Probability</h2><p>Each probability is between 0 and 1. For outcomes that can’t both happen and together cover everything, the probabilities sum to 1. A fair coin is 1/2 and 1/2; a certain outcome is 1.</p><p>A weighted average counts each value by how often it occurs: 2 and 6 with probabilities 3/4 and 1/4 average to <code>(3/4 × 2) + (1/4 × 6) = 3</code>, not 4.</p>
        <Question question={{ ...questions[1], id: "notation-check", prompt: "If f(x) = x + 2 and x = 3, what is f(x)?", options: ["5, because the rule adds 2 to the input", "6, because the parentheses multiply", "3, because functions leave the input unchanged"], answer: 0, explanations: ["Yes. Replace x with 3, then compute 3 + 2 = 5.", "Here f(x) names a function value. It is not a product f × x.", "This function adds 2; the output need not equal the input."], hints: ["Replace x with the given input.", "Add 2 to 3."], review: "computation" }} />
      </section>
      <div className="actions"><Link className="btn" href={from === "/eras/foundations" ? from : `${from}#worked-example`}>Back to your lesson</Link></div>
    </>;
  }

  if (route === "about") return <>
    <h1 className="title">About <span>· why this exists</span></h1>
    <p className="statement">I’m Aaryan. This is where I share what I’m learning about the ideas behind AI, and try to make them easier to understand.</p>
    <section><h2>The approach</h2><p>AI history is usually told as a list of breakthroughs. This tells it through the questions: what problem people were solving, what the math actually did, and what it left unanswered.</p><p>Each lesson pairs history with a mechanism, a worked example, practice, and the original source.</p></section>
    <section><h2>Status</h2><p>Part 1 is a first edition. Parts 2–9 are planned. Interactive figures are being built separately; each lesson has a full text version in the meantime.</p><p className="muted">Independent learner review and full accessibility testing are still to come.</p></section>
    <section><h2>Open by design</h2><p>No accounts, no paid access. Progress stays on your device and can be exported or reset. Answers are never uploaded or graded by AI.</p><p>Code and lessons are MIT licensed. The design is inspired by <a href="https://skills.wheresryan.sh/anatomy" target="_blank" rel="noreferrer">Anatomy by Ryan</a>; none of its artwork or code is copied. Type is Inter and EB Garamond, self-hosted under their font licenses.</p><p><a href="https://github.com/Aaryan1524/Learn" target="_blank" rel="noreferrer">Read the source and contribute</a></p></section>
  </>;
  notFound();
}
