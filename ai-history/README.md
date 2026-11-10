# A History of AI

A free learning website about the ideas that made artificial intelligence. This first authored edition covers Part 1, Foundations (1930s–1956), with five lessons, worked examples, guided practice, original sources, and a checkpoint. Parts 2–9 are clearly marked as planned. Interactive visualizations are deliberately reserved for the author to add later.

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
npm run build
```

## Editing guide

- `lib/course.ts`: lesson, era, source, and glossary metadata.
- `components/lesson-content.tsx`: server-rendered lesson explanations.
- `lib/questions.ts`: questions, hints, solutions, and feedback.
- `components/editorial.tsx`: homepage, overview, lesson layout, and reserved figure frames.
- `components/book-shell.tsx`: navigation, search, theme, reading depth, and progress.
- `lib/models.ts`: pure teaching models, separate from the view.
- `app/book.css`: semantic theme tokens, typography, and responsive layout.
- `docs/visualizations.md`: handoff for the future interactive figures.
- `docs/PROGRESS.md`: actual verification evidence and remaining limits.

The app uses React, TypeScript, and the supplied Vinext/Vite Sites integration. Content renders on the server; optional activities run in small client components. This first release uses Worker hosting, not a Next.js static export. No database or connector is needed. The core course has no account system or analytics. Hosted preview access is controlled separately by Sites and currently remains owner-private.

Progress is versioned and local to the visitor's browser. Reading completion is self-reported. The progress page supports validated JSON export/import and reset. No learner code or answers are sent to an AI grader.

Original code and lessons: MIT, Copyright 2026 Aaryan. Third-party notices are in `THIRD_PARTY_NOTICES.md`. Fonts are self-hosted with license copies. Visual direction inspired by Anatomy by Ryan; no Anatomy artwork or code is copied.
