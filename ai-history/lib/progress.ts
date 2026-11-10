import { lessons, REVISION } from "./course.ts";
export type Progress = { version: 1; revision: string; opened: string[]; completed: string[]; checkpointAttempted: boolean; lastLesson: string | null };
export const emptyProgress = (): Progress => ({ version: 1, revision: REVISION, opened: [], completed: [], checkpointAttempted: false, lastLesson: null });
export const PROGRESS_KEY = "history-of-ai:progress:v1";
const validIds = new Set(lessons.map(l => l.id));
export function parseProgress(raw: unknown): Progress {
  if (!raw || typeof raw !== "object" || !("version" in raw) || raw.version !== 1) throw new Error("This file uses an unsupported progress format.");
  const p = raw as Record<string, unknown>;
  if (p.revision !== REVISION && p.revision !== "foundations-1") throw new Error("This progress file belongs to a different content revision.");
  for (const key of ["opened", "completed"]) if (!Array.isArray(p[key]) || !(p[key] as unknown[]).every(id => typeof id === "string" && validIds.has(id as never))) throw new Error("This file contains invalid lesson records.");
  if (typeof p.checkpointAttempted !== "boolean" || !(p.lastLesson === null || typeof p.lastLesson === "string" && validIds.has(p.lastLesson as never))) throw new Error("This file contains invalid progress settings.");
  return { version: 1, revision: REVISION, opened: [...new Set(p.opened as string[])], completed: [...new Set(p.completed as string[])], checkpointAttempted: p.revision === REVISION ? p.checkpointAttempted : false, lastLesson: p.lastLesson as string | null };
}
