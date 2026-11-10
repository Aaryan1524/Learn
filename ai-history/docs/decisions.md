# Decisions

## 2026-11-09 — Initial Part 1 slice

- Use the supplied Vinext starter with React, TypeScript, repository-owned lesson components, and semantic CSS. Preserve the Sites build integration. Structured TypeScript metadata and server-rendered articles keep five initial lessons simple; MDX can follow when authoring volume justifies it.
- Build the independent application in `ai-history/`, preserving the root reference and license. Part 1 consists of five lessons and a checkpoint; later parts are explicitly planned.
- Follow Anatomy’s editorial restraint and serif/sans hierarchy. No upstream artwork or kit is copied. The user explicitly defers visualizations; do not invoke Anatomy artwork generation in this pass.
- Use original toy models, tested separately from presentation. No arbitrary code execution, accounts, analytics, or external grader.
- Keep the existing repository MIT license for original code and lesson content. Third-party fonts retain their package licenses. Link primary papers rather than redistributing them.
- Use browser-native MathML with prose equivalents for the small initial equations. This avoids a math runtime and keeps notation available without JavaScript.
