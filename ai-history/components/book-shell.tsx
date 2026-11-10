"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, ChevronDown, CircleHelp, Download, Menu, Moon, Search, Settings2, Sun, Upload, X } from "lucide-react";
import { eras, glossary, lessonPath, lessons, sources } from "@/lib/course";
import { emptyProgress, parseProgress, PROGRESS_KEY, type Progress } from "@/lib/progress";

type CourseContext = { progress: Progress; update: (f: (p: Progress) => Progress) => void; storageAvailable: boolean };
const Course = createContext<CourseContext>({ progress: emptyProgress(), update: () => {}, storageAvailable: true });
export const useCourse = () => useContext(Course);
const searchEntries = [
  ...lessons.map(l => ({ title: l.title, category: `PART 01 · LESSON ${l.number}`, description: l.description, href: lessonPath(l.id) })),
  ...glossary.map(([title, description]) => ({ title, category: "GLOSSARY", description, href: `/glossary#${title.toLowerCase().replaceAll(" ", "-")}` })),
  ...sources.map(s => ({ title: s.title, category: `ORIGINAL PAPER · ${s.year}`, description: s.author, href: `/papers#${s.id}` })),
  { title: "Reading the notation", category: "PREREQUISITE", description: "Binary values, functions, sums, logarithms, and probability.", href: "/prerequisites" },
];

export function BookShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [theme, setTheme] = useState("system");
  const [query, setQuery] = useState("");
  const searchDialog = useRef<HTMLDialogElement>(null);
  const menuDialog = useRef<HTMLDialogElement>(null);

  const update = (f: (p: Progress) => Progress) => setProgress(p => {
    const next = f(p);
    try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(next)); } catch { setStorageAvailable(false); }
    return next;
  });
  useEffect(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (raw) setProgress(parseProgress(JSON.parse(raw)));
    } catch { setStorageAvailable(false); }
    const savedTheme = (() => { try { return localStorage.getItem("history-of-ai:theme") || "system"; } catch { return "system"; } })();
    setTheme(savedTheme); setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    const id = lessons.find(l => pathname === lessonPath(l.id))?.id;
    if (id) update(p => ({ ...p, lastLesson: id, opened: [...new Set([...p.opened, id])] }));
    menuDialog.current?.close(); searchDialog.current?.close();
  }, [pathname, ready]);
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => document.documentElement.setAttribute("data-theme", theme === "system" ? (media.matches ? "dark" : "light") : theme);
    apply(); media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme]);
  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); searchDialog.current?.showModal(); }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  const cycleTheme = () => {
    const next = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next); try { localStorage.setItem("history-of-ai:theme", next); } catch {}
  };
  const results = searchEntries.filter(r => `${r.title} ${r.description}`.toLowerCase().includes(query.toLowerCase().trim())).slice(0, query ? 12 : 5);
  const sidebar = <>
    <Link href="/" className={`sidebar-home ${pathname === "/" ? "selected" : ""}`}><BookOpen size={15} /> The introduction <ArrowUpRight size={13} /></Link>
    <p className="nav-eyebrow">THE JOURNEY <span>9 PARTS</span></p>
    <nav aria-label="Course chapters" className="course-navigation">
      {eras.map((era, i) => <div key={era.slug} className={`era-nav ${i === 0 ? "is-published" : ""}`}>
        <Link className={`era-link ${pathname.startsWith(`/eras/${era.slug}`) ? "active-era" : ""}`} href={`/eras/${era.slug}`}><span className="era-number">{era.number}</span><span>{era.title}</span>{i === 0 ? <ChevronDown size={12} /> : <span className="planned-dot" aria-label="Planned" />}</Link>
        {i === 0 && <div className="lesson-navigation">
          <Link href="/eras/foundations" className={pathname === "/eras/foundations" ? "active" : ""}>Overview</Link>
          {lessons.map(l => <Link key={l.id} className={pathname === lessonPath(l.id) ? "active" : ""} href={lessonPath(l.id)}>{l.short}{progress.completed.includes(l.id) && <Check size={12} aria-label="Complete" />}</Link>)}
          <Link href="/eras/foundations/checkpoint" className={pathname.endsWith("checkpoint") ? "active" : ""}>The checkpoint {progress.checkpointAttempted && <Check size={12} aria-label="Attempted" />}</Link>
        </div>}
      </div>)}
    </nav>
    <div className="sidebar-resources"><Link href="/glossary">Glossary <ArrowUpRight size={12} /></Link><Link href="/papers">The reading room <ArrowUpRight size={12} /></Link><Link href="/about">About this project <ArrowUpRight size={12} /></Link></div>
    <Link href="/progress" className="sidebar-progress"><div><span>Your journey</span><span>{progress.completed.length} / 5</span></div><span className="progress-track"><span style={{ width: `${progress.completed.length * 20}%` }} /></span><small>Saved on this device <ArrowUpRight size={11} /></small></Link>
  </>;
  return <Course.Provider value={{ progress, update, storageAvailable }}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="A History of AI home"><span className="brand-symbol" aria-hidden="true">✳</span><span>A History of <i>AI</i><small>IDEAS THAT MADE INTELLIGENCE</small></span></Link>
      <nav className="header-links" aria-label="Main navigation"><Link className={pathname === "/" || pathname.startsWith("/eras") ? "current" : ""} href="/">The course</Link><Link className={pathname === "/papers" ? "current" : ""} href="/papers">Reading room</Link><Link className={pathname === "/about" ? "current" : ""} href="/about">About</Link></nav>
      <div className="header-actions"><button className="search-trigger" onClick={() => searchDialog.current?.showModal()}><Search size={15} /><span>Find an idea</span><kbd>⌘ K</kbd></button><span className="header-divider" /><button className="icon-button theme-button" onClick={cycleTheme} aria-label={`Theme: ${theme}. Switch to ${theme === "system" ? "light" : theme === "light" ? "dark" : "system"}`} title={`Theme: ${theme}`}>{theme === "dark" ? <Moon size={17} /> : theme === "system" ? <Settings2 size={17} /> : <Sun size={17} />}</button><button className="icon-button mobile-menu" onClick={() => menuDialog.current?.showModal()} aria-label="Open course navigation"><Menu size={20} /></button></div>
    </header>
    <div className="site-layout"><aside className="desktop-sidebar">{sidebar}</aside><div className="reading-surface"><main id="main-content" tabIndex={-1}>{children}</main><footer className="site-footer"><Link href="/">A History of AI <span>·</span> An open learning project by Aaryan.</Link><a href="https://github.com/Aaryan1524/Learn" target="_blank" rel="noreferrer">Made to be shared <ArrowUpRight size={12} /></a></footer></div></div>
    <dialog ref={searchDialog} className="search-dialog" onClick={e => { if (e.target === e.currentTarget) searchDialog.current?.close(); }} aria-label="Search the course"><div className="search-input-row"><Search size={20} /><input aria-label="Search lessons, terms, and papers" placeholder="What are you curious about?" value={query} onChange={e => setQuery(e.target.value)} /><button className="icon-button" onClick={() => searchDialog.current?.close()} aria-label="Close search"><X size={18} /></button></div><div className="search-results"><p className="eyebrow">{query ? `${results.length} RESULTS` : "START EXPLORING"}</p>{results.length ? results.map(r => <Link href={r.href} key={r.href + r.title} onClick={() => searchDialog.current?.close()}><small>{r.category}</small><strong>{r.title}</strong><p>{r.description}</p><ArrowUpRight size={16} /></Link>) : <div className="no-results"><p>No published idea matches “{query}”.</p><span>Try “state”, “logic”, “probability”, or “Turing”.</span></div>}</div><div className="search-footer">Lessons, definitions & original papers <kbd>esc to close</kbd></div></dialog>
    <dialog ref={menuDialog} className="menu-dialog" onClick={e => { if ((e.target as Element).closest("a")) menuDialog.current?.close(); }} aria-label="Course navigation"><div className="mobile-menu-title"><span>Explore the course</span><button className="icon-button" onClick={() => menuDialog.current?.close()} aria-label="Close navigation"><X size={20} /></button></div>{sidebar}</dialog>
    <noscript><div className="noscript-note">Reading works without JavaScript. Search, quizzes, theme, and progress need JavaScript. <a href="/eras">View all parts</a> · <a href="/eras/foundations">Part 1 lessons</a></div></noscript>
  </Course.Provider>;
}

export function ContinueLink({ className = "primary-button" }: { className?: string }) {
  const { progress } = useCourse();
  return <Link className={className} href={lessonPath(progress.lastLesson || "computation")}>{progress.lastLesson ? "Continue your reading" : "Begin with Part 1"}<ArrowRight size={16} /></Link>;
}

export function LessonControls({ id }: { id: string }) {
  const { progress, update } = useCourse();
  const complete = progress.completed.includes(id);
  return <button className={`complete-button ${complete ? "is-complete" : ""}`} aria-pressed={complete} onClick={() => update(p => ({ ...p, completed: complete ? p.completed.filter(x => x !== id) : [...p.completed, id] }))}>{complete ? <Check size={16} /> : <span className="empty-circle" />}{complete ? "Marked as complete" : "Mark lesson complete"}</button>;
}

export function DepthSelector() {
  const [depth, setDepth] = useState("understand");
  useEffect(() => { try { const saved = localStorage.getItem("history-of-ai:depth"); if (["explore", "understand", "build"].includes(saved || "")) setDepth(saved!); } catch {} }, []);
  useEffect(() => { document.documentElement.dataset.depth = depth; window.dispatchEvent(new CustomEvent("reading-depth", { detail: depth })); }, [depth]);
  return <div className="depth-control"><span>YOUR READING DEPTH</span><div role="group" aria-label="Reading depth">{[["explore", "Explore"], ["understand", "Understand"], ["build", "Build"]].map(([id, label]) => <button key={id} aria-pressed={depth === id} className={depth === id ? "selected" : ""} onClick={() => { setDepth(id); try { localStorage.setItem("history-of-ai:depth", id); } catch {} }}>{label}</button>)}</div><p>{depth === "explore" ? "The core ideas. Worked detail stays available below." : depth === "build" ? "The full explanation, plus code and investigation." : "The ideas, worked examples, and guided practice."}</p></div>;
}

export function GuidedDetail({ title, kind = "math", children }: { title: string; kind?: "math" | "build"; children: ReactNode }) {
  const [open, setOpen] = useState(kind === "math");
  useEffect(() => {
    const receive = (e: Event) => { const next = (e as CustomEvent<string>).detail; setOpen(kind === "math" ? next !== "explore" : next === "build"); };
    try { receive(new CustomEvent("reading-depth", { detail: localStorage.getItem("history-of-ai:depth") || "understand" })); } catch {}
    window.addEventListener("reading-depth", receive);
    return () => window.removeEventListener("reading-depth", receive);
  }, [kind]);
  return <details className={`detail-panel ${kind}-detail`} open={open} onToggle={e => setOpen(e.currentTarget.open)}><summary>{title}<span>{kind === "build" ? "BUILD & INVESTIGATE" : "STEP BY STEP"}</span></summary>{children}</details>;
}

export function ProgressPage() {
  const { progress, update, storageAvailable } = useCourse();
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);
  const exportProgress = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" }));
    const a = document.createElement("a"); a.href = url; a.download = "my-ai-history-progress.json"; a.click(); URL.revokeObjectURL(url);
    setMessage("Progress exported. Keep this file to continue on another device.");
  };
  return <><p className="page-kicker">YOUR LEARNING NOTEBOOK</p><h1>Your journey.</h1><p className="standfirst">There is no finish-line timer. Your progress belongs to you, and stays on your device.</p>{!storageAvailable && <p className="notice">Persistent storage is unavailable or an old progress record could not be read. You can still read and export your current progress.</p>}<div className="progress-summary"><strong>{progress.completed.length}<span> / 5</span></strong><p>lessons marked complete</p></div><div className="progress-list">{lessons.map(l => <div key={l.id}><Link href={lessonPath(l.id)}><span>{l.number}</span>{l.title}</Link><small>{progress.completed.includes(l.id) ? "Complete" : progress.opened.includes(l.id) ? "Opened" : "Not opened"}</small></div>)}</div><p className="body-small">Checkpoint: {progress.checkpointAttempted ? "attempted" : "not attempted"}. Completion is self-reported; opening a page does not mark it complete.</p><div className="button-row"><button className="secondary-button" onClick={exportProgress}><Download size={15} />Export progress</button><button className="secondary-button" onClick={() => importRef.current?.click()}><Upload size={15} />Import progress</button><button className="text-button" onClick={() => setConfirmReset(true)}>Reset progress</button></div><input ref={importRef} type="file" accept="application/json,.json" hidden aria-label="Import a progress file" onChange={async e => { const file = e.target.files?.[0]; if (!file) return; try { if (file.size > 100_000) throw new Error("Choose a progress file smaller than 100 KB."); const incoming = parseProgress(JSON.parse(await file.text())); update(() => incoming); setMessage("Progress imported successfully."); } catch (err) { setMessage(err instanceof Error ? err.message : "That file could not be read."); } e.target.value = ""; }} /><p role="status" className="feedback-message">{message}</p>{confirmReset && <div className="reset-confirm"><p>Clear the learning record on this device? Export it first if you want a backup.</p><button className="secondary-button" onClick={() => { update(() => emptyProgress()); setConfirmReset(false); setMessage("Your progress has been reset."); }}>Clear progress</button><button className="text-button" onClick={() => setConfirmReset(false)}>Keep my progress</button></div>}</>;
}
