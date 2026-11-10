"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Check, Download, Search, Upload, X } from "lucide-react";
import { glossary, lessonPath, lessonSections, lessons, sources } from "@/lib/course";
import { emptyProgress, parseProgress, PROGRESS_KEY, type Progress } from "@/lib/progress";

type CourseContext = { progress: Progress; update: (f: (p: Progress) => Progress) => void; storageAvailable: boolean };
const Course = createContext<CourseContext>({ progress: emptyProgress(), update: () => {}, storageAvailable: true });
export const useCourse = () => useContext(Course);

const searchEntries = [
  ...lessons.map(l => ({ title: l.title, category: `Lesson ${l.number} · ${l.year}`, description: l.description, href: lessonPath(l.id) })),
  ...glossary.map(([title, description]) => ({ title, category: "Glossary", description, href: `/glossary#${title.toLowerCase().replaceAll(" ", "-")}` })),
  ...sources.map(s => ({ title: s.title, category: `Paper · ${s.year}`, description: s.author, href: `/papers#${s.id}` })),
  { title: "Reading the notation", category: "Refresher", description: "Binary values, functions, sums, logarithms, and probability.", href: "/prerequisites" },
];

function Rail({ pathname, progress, active, theme, onTheme, onSearch }: { pathname: string; progress: Progress; active: string; theme: string; onTheme: () => void; onSearch: () => void }) {
  const here = (href: string) => (pathname === href ? "page" : undefined);
  return <div className="rail-body">
    <Link href="/" className="brand">A History of AI</Link>
    <nav aria-label="Site">
      <ul className="nav-list">
        <li><Link href="/" aria-current={here("/")}>Home</Link></li>
        <li><Link href="/papers" aria-current={here("/papers")}>Papers</Link></li>
        <li><Link href="/glossary" aria-current={here("/glossary")}>Glossary</Link></li>
        <li><Link href="/about" aria-current={here("/about")}>About</Link></li>
      </ul>
    </nav>
    <nav aria-label="Part 1 lessons">
      <Link href="/eras/foundations" className="rail-label">Part 1 · Foundations</Link>
      <ol className="nav-list">
        {lessons.map(l => {
          const current = pathname === lessonPath(l.id);
          return <li key={l.id}>
            <Link href={lessonPath(l.id)} aria-current={current ? "page" : undefined}>{l.short}{progress.completed.includes(l.id) && <Check size={12} aria-label="Complete" />}</Link>
            {current && <ul className="toc-sub" aria-label="On this page">{lessonSections.map(([id, label]) => <li key={id}><a href={`#${id}`} className={active === id ? "is-active" : ""} aria-current={active === id ? "location" : undefined}>{label}</a></li>)}</ul>}
          </li>;
        })}
        <li><Link href="/eras/foundations/checkpoint" aria-current={here("/eras/foundations/checkpoint")}>Checkpoint{progress.checkpointAttempted && <Check size={12} aria-label="Attempted" />}</Link></li>
      </ol>
    </nav>
    <ul className="nav-list">
      <li><Link href="/eras" aria-current={pathname === "/eras" || (pathname.startsWith("/eras/") && !pathname.startsWith("/eras/foundations")) ? "page" : undefined}>Parts 2–9 <span>planned</span></Link></li>
    </ul>
    <div className="rail-tools">
      <button onClick={onSearch}>Search <kbd>⌘K</kbd></button>
      <button onClick={onTheme} aria-label={`Theme: ${theme}. Change theme`}>Theme <span>{theme}</span></button>
      <Link href="/progress" aria-current={here("/progress")}>Progress <span>{progress.completed.length}/5</span></Link>
      <span className="meter" aria-hidden="true"><span style={{ width: `${progress.completed.length * 20}%` }} /></span>
    </div>
  </div>;
}

export function BookShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [theme, setTheme] = useState("system");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("");
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
  // Highlight the lesson section currently being read.
  useEffect(() => {
    setActive("");
    if (!lessons.some(l => pathname === lessonPath(l.id))) return;
    const targets = lessonSections.map(([id]) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-15% 0px -70% 0px" });
    targets.forEach(t => observer.observe(t));
    return () => observer.disconnect();
  }, [pathname]);

  const cycleTheme = () => {
    const next = theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    setTheme(next); try { localStorage.setItem("history-of-ai:theme", next); } catch {}
  };
  const openSearch = () => { menuDialog.current?.close(); searchDialog.current?.showModal(); };
  const q = query.toLowerCase().trim();
  const results = searchEntries.filter(r => `${r.title} ${r.description}`.toLowerCase().includes(q)).slice(0, q ? 12 : 5);
  const rail = <Rail pathname={pathname} progress={progress} active={active} theme={theme} onTheme={cycleTheme} onSearch={openSearch} />;

  return <Course.Provider value={{ progress, update, storageAvailable }}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="frame">
      <aside className="rail" aria-label="Course navigation">{rail}</aside>
      <div className="read">
        <header className="topbar">
          <Link href="/" className="brand">A History of AI</Link>
          <div className="topbar-actions">
            <button onClick={openSearch}>Search</button>
            <button onClick={() => menuDialog.current?.showModal()} aria-label="Open course navigation">Contents</button>
          </div>
        </header>
        <main id="main-content" tabIndex={-1}>{children}</main>
        <footer className="colophon">
          <span>A History of AI · an open project by Aaryan</span>
          <a href="https://github.com/Aaryan1524/Learn" target="_blank" rel="noreferrer">Source on GitHub</a>
        </footer>
      </div>
    </div>
    <dialog ref={searchDialog} aria-label="Search the course" onClick={e => { if (e.target === e.currentTarget) searchDialog.current?.close(); }}>
      <div className="search-row">
        <Search size={15} />
        <input aria-label="Search lessons, terms, and papers" placeholder="Search lessons, terms, papers" value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={() => searchDialog.current?.close()} aria-label="Close search"><X size={16} /></button>
      </div>
      <div className="search-list">
        {results.length ? results.map(r => <Link className="search-hit" href={r.href} key={r.href + r.title} onClick={() => searchDialog.current?.close()}><small>{r.category}</small>{r.title}</Link>)
          : <p className="search-empty">Nothing matches “{query}”. Try “state”, “logic” or “Turing”.</p>}
      </div>
    </dialog>
    <dialog ref={menuDialog} className="menu-dialog" aria-label="Course navigation" onClick={e => { if (e.target === e.currentTarget || (e.target as Element).closest("a")) menuDialog.current?.close(); }}>
      <button className="menu-close" onClick={() => menuDialog.current?.close()} aria-label="Close navigation">Close</button>
      {rail}
    </dialog>
    <noscript><div className="noscript-note">Reading works without JavaScript; search, quizzes, theme and progress need it. <a href="/eras/foundations">Part 1 lessons</a></div></noscript>
  </Course.Provider>;
}

export function ContinueLink({ className = "btn" }: { className?: string }) {
  const { progress } = useCourse();
  const last = lessons.find(l => l.id === progress.lastLesson);
  return <Link className={className} href={lessonPath(last?.id || "computation")}>{last ? `Continue: ${last.short}` : "Start Part 1"}<ArrowRight className="go" size={14} /></Link>;
}

export function LessonControls({ id }: { id: string }) {
  const { progress, update } = useCourse();
  const complete = progress.completed.includes(id);
  return <button className="btn btn-quiet" aria-pressed={complete} onClick={() => update(p => ({ ...p, completed: complete ? p.completed.filter(x => x !== id) : [...p.completed, id] }))}>{complete && <Check size={14} />}{complete ? "Completed" : "Mark complete"}</button>;
}

const depths = [["explore", "Explore", "Core ideas only. Worked detail stays collapsed."], ["understand", "Understand", "Ideas, worked examples and practice."], ["build", "Build", "Everything, plus code to run."]] as const;
export function DepthSelector() {
  const [depth, setDepth] = useState("understand");
  useEffect(() => { try { const saved = localStorage.getItem("history-of-ai:depth"); if (["explore", "understand", "build"].includes(saved || "")) setDepth(saved!); } catch {} }, []);
  useEffect(() => { document.documentElement.dataset.depth = depth; window.dispatchEvent(new CustomEvent("reading-depth", { detail: depth })); }, [depth]);
  return <div className="depth"><span id="depth-label">Read</span><div className="seg" role="group" aria-labelledby="depth-label">{depths.map(([id, label, hint]) => <button key={id} title={hint} aria-pressed={depth === id} onClick={() => { setDepth(id); try { localStorage.setItem("history-of-ai:depth", id); } catch {} }}>{label}</button>)}</div></div>;
}

export function GuidedDetail({ title, kind = "math", children }: { title: string; kind?: "math" | "build"; children: ReactNode }) {
  const [open, setOpen] = useState(kind === "math");
  useEffect(() => {
    const receive = (e: Event) => { const next = (e as CustomEvent<string>).detail; setOpen(kind === "math" ? next !== "explore" : next === "build"); };
    try { receive(new CustomEvent("reading-depth", { detail: localStorage.getItem("history-of-ai:depth") || "understand" })); } catch {}
    window.addEventListener("reading-depth", receive);
    return () => window.removeEventListener("reading-depth", receive);
  }, [kind]);
  return <details className={`detail-panel ${kind}-detail`} open={open} onToggle={e => setOpen(e.currentTarget.open)}><summary>{title}<span>{kind === "build" ? "Code" : "Step by step"}</span></summary>{children}</details>;
}

export function ProgressPage() {
  const { progress, update, storageAvailable } = useCourse();
  const [message, setMessage] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);
  const exportProgress = () => {
    const url = URL.createObjectURL(new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" }));
    const a = document.createElement("a"); a.href = url; a.download = "my-ai-history-progress.json"; a.click(); URL.revokeObjectURL(url);
    setMessage("Exported. Import this file to continue on another device.");
  };
  return <>
    <h1 className="title">Progress <span>· saved on this device</span></h1>
    <p className="statement">{progress.completed.length} of 5 lessons complete. Checkpoint {progress.checkpointAttempted ? "attempted" : "not attempted"}.</p>
    {!storageAvailable && <p className="notice">Storage is unavailable, or an old record couldn’t be read. You can still export what’s here.</p>}
    <section>
      <h2>Lessons</h2>
      <ol className="rows">{lessons.map(l => <li key={l.id}><Link className="row" href={lessonPath(l.id)}><span className="row-n">{l.number}</span><span className="row-t">{l.short}</span><span className="row-m">{progress.completed.includes(l.id) ? "Complete" : progress.opened.includes(l.id) ? "Opened" : "—"}</span></Link></li>)}</ol>
      <p className="small" style={{ marginTop: 12 }}>You mark lessons complete yourself. Nothing is uploaded.</p>
      <div className="actions">
        <button className="btn btn-quiet" onClick={exportProgress}><Download size={14} />Export</button>
        <button className="btn btn-quiet" onClick={() => importRef.current?.click()}><Upload size={14} />Import</button>
        <button className="text-btn" onClick={() => setConfirmReset(true)}>Reset</button>
      </div>
      <input ref={importRef} type="file" accept="application/json,.json" hidden aria-label="Import a progress file" onChange={async e => { const file = e.target.files?.[0]; if (!file) return; try { if (file.size > 100_000) throw new Error("Choose a progress file smaller than 100 KB."); const incoming = parseProgress(JSON.parse(await file.text())); update(() => incoming); setMessage("Progress imported."); } catch (err) { setMessage(err instanceof Error ? err.message : "That file could not be read."); } e.target.value = ""; }} />
      <p role="status" className="small" style={{ marginTop: 12 }}>{message}</p>
      {confirmReset && <div className="notice"><p>Clear progress on this device? Export first if you want a backup.</p><div className="actions" style={{ marginTop: 8 }}><button className="btn" onClick={() => { update(() => emptyProgress()); setConfirmReset(false); setMessage("Progress reset."); }}>Clear progress</button><button className="text-btn" onClick={() => setConfirmReset(false)}>Cancel</button></div></div>}
    </section>
  </>;
}
