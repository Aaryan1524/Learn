# Decisions

## 2026-11-09 — Initial Part 1 slice

- Use the supplied Vinext starter with React, TypeScript, repository-owned lesson components, and semantic CSS. Preserve the Sites build integration. Structured TypeScript metadata and server-rendered articles keep five initial lessons simple; MDX can follow when authoring volume justifies it.
- Build the independent application in `ai-history/`, preserving the root reference and license. Part 1 consists of five lessons and a checkpoint; later parts are explicitly planned.
- Follow Anatomy’s editorial restraint and serif/sans hierarchy. No upstream artwork or kit is copied. The user explicitly defers visualizations; do not invoke Anatomy artwork generation in this pass.
- Use original toy models, tested separately from presentation. No arbitrary code execution, accounts, analytics, or external grader.
- Keep the existing repository MIT license for original code and lesson content. Third-party fonts retain their package licenses. Link primary papers rather than redistributing them.
- Use browser-native MathML with prose equivalents for the small initial equations. This avoids a math runtime and keeps notation available without JavaScript.

## 2026-11-09 — Redesign toward Anatomy's plain, consistent layout

- Replace the warm-paper, rust-accent editorial look with a grayscale system: one 14px Inter body, EB Garamond only for `em`, pull quotes and italic section numbers, hairline rules, and a 560px reading column with a sticky left rail.
- Every page uses one pattern: breadcrumb, a small bold title with a muted subtitle, one statement line, a meta row, then numbered sections with rules. Lists are thin-ruled rows. Pages end with a previous/next pager and a one-line colophon.
- Navigation lives in the rail on desktop (site links, Part 1 lessons, the current lesson's sections with scroll-spy, Parts 2–9 as one "planned" link, then search/theme/progress). Below 1120px it becomes a top bar with Search and Contents.
- Chrome copy was cut hard (kickers, standfirsts, margin notes, closing note). Lesson prose and its accuracy hedges are unchanged; lesson-content.tsx is restyled through CSS only.
- Switch DM Sans to Inter (variable) so the 450/550 weights exist. Dark theme is original; the reference has none. Quiz correctness uses an icon and text, not colour alone.
- The new stylesheet is written from scratch with its own class names; no Anatomy CSS was copied.

## 2026-11-09 — Reading and future figures, branch codex/reading-and-figures

- Build from `redesign` on a separate branch; preserve its monochrome identity, Inter/EB Garamond pairing, course navigation, and learning behavior.
- Separate prose measure (640px maximum) from figure width (the larger available content canvas). Reading remains comfortable while later mechanisms have room. Notes use the right margin only where it fits; otherwise they stay inline.
- Give titles, section headings, body, and metadata distinct sizes. Replace the repeated ruled outcomes with a compact learning summary, and group reading depth with prerequisite access.
- Place eight named figure briefs near the reasoning: a primary mechanism per lesson and a companion in the first three technical lessons. Artwork is explicitly deferred. Follow Anatomy’s framing and object-selection guidance when each is built.
- Use bibliographic source entries rather than navigation rows, visible active navigation markers, and subdued but readable secondary text. No new animation or image dependency.

## 2026-11-09 — Ballet titles and proposed Era 1 coverage review

- Use the requested Ballet family (optical sizing auto, weight 400, normal style) for main page titles. Serve the optical-size variable font locally from the pinned Fontsource package; retain its full OFL notice. Metadata, body text, mathematical notation, and navigation keep their reading fonts.
- Review the proposed 1943–1959 scope against the current five lessons in `docs/qa/era-1-coverage.md`. The new goal of independently training a perceptron is not met by the existing fixed-threshold lesson. Record the missing content explicitly rather than changing completion claims or dates.
- Preserve the user's latest instruction to do Anatomy later. Existing frames remain reserved; this pass does not claim that sliders, live mathematical traces, or perceptron training figures exist.

## 2026-11-09 — Era 1 curriculum expansion

- Extend Foundations to 1943–1959, retaining computation (1936) as an explicitly labelled prelude and information theory as relevant context. Keep all five existing lesson URLs and append learning, Python implementation, and geometric separability/XOR lessons. Part 2 remains planned.
- Derive bias and threshold decisions from scalar arithmetic, use the alarm rule and full AND/OR tables, and separate the historical McCulloch–Pitts/Rosenblatt models from our modern teaching simplifications.
- Use one pure TypeScript perceptron model for authored tables and future controls. Keep a complete plain-Python reference download, exact five-pass AND trace, final four-case evaluation, and bounded XOR run. Tests compare the displayed code, download, and both implementations.
- Add eight numeric/construction exercises alongside eight conceptual questions. The final checkpoint has 16 checked tasks plus a self-assessed Python implementation. Quiz completion is not mastery certification.
- Increment content revision to foundations-2; retain the progress format and key because their shape is unchanged. Migrate opened/completed/last lesson from foundations-1 and reset its checkpoint attempt, since assessment scope changed. Derive every completion denominator from lesson metadata.
- Reserve 29 concept-specific visual spaces, including arithmetic steps, learning updates, training traces, boundaries, and XOR. Each has stable IDs and a brief; the figure index follows reading order. Images, diagrams, Anatomy drawings, and live controls are deferred by the user.
- Link primary papers rather than redistributing scans. Review the McCulloch–Pitts assumptions and Rosenblatt paper directly; state Novikoff as a later reference and use Freund & Schapire (1999) for the checked modern convergence statement while the original scan is unavailable.
