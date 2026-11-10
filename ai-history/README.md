# A History of AI

A free learning website about the ideas that made artificial intelligence. This first authored edition covers Part 1, Foundations (1943–1959, with a 1936 prelude), with eight lessons, worked examples, guided practice, original sources, and a checkpoint. Parts 2–9 are clearly marked as planned. Interactive visualizations are deliberately reserved for the author to add later.

## Run locally

Use Node 22.13 or later and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vinext, normally http://127.0.0.1:5173.

## Verify

```sh
npm run typecheck
npm test
python3 public/labs/foundations.py
python3 public/labs/perceptron.py
npm run build
```

## Editing guide

- `lib/course.ts`: lesson, era, source, and glossary metadata.
- `components/lesson-content.tsx` and `components/perceptron-lessons.tsx`: server-rendered lesson explanations.
- `lib/questions.ts` and `lib/exercises.ts`: eight conceptual questions and eight numeric/construction exercises, hints, solutions, and feedback.
- `components/editorial.tsx`: homepage, overview, lesson layout, and bibliographic sources.
- `components/figure-slot.tsx` and `lib/figures.ts`: 29 future figure frames and their learning briefs.
- `components/book-shell.tsx`: navigation, search, theme, reading depth, and progress.
- `lib/models.ts` and `lib/perceptron.ts`: pure teaching models, separate from the view.
- `lib/perceptron-code.ts` and `public/labs/perceptron.py`: the displayed and downloadable plain-Python trainer; tests keep them identical.
- `app/book.css`: semantic theme tokens, typography, and responsive layout.
- `docs/visualizations.md`: handoff for the future interactive figures.
- `docs/PROGRESS.md`: actual verification evidence and remaining limits.

The app uses React, TypeScript, and the supplied Vinext/Vite Sites integration. Content renders on the server; optional activities run in small client components. This first release uses Worker hosting, not a Next.js static export. No database or connector is needed. The core course has no account system or analytics. Hosted preview access is controlled separately by Sites and currently remains owner-private.

Progress is versioned and local to the visitor's browser. Existing five-lesson progress is migrated without losing reading records; the expanded checkpoint starts unattempted. Reading completion is self-reported. The progress page supports validated JSON export/import and reset. No learner code or answers are sent to an AI grader.

Original code and lessons: MIT, Copyright 2026 Aaryan. Third-party notices are in `THIRD_PARTY_NOTICES.md`. Fonts are self-hosted with license copies. Visual direction inspired by Anatomy by Ryan; no Anatomy artwork or code is copied.
