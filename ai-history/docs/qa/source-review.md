# Part 1 source review — 2026-11-09

| Lesson | Source and location reviewed | Teaching boundary |
| --- | --- | --- |
| Computation | Turing 1936, institutional PDF, §§1–2 and introductory Church comparison | Binary flipper is an original toy; no universal efficiency claim |
| Logic | McCulloch & Pitts 1943, institutional full scan: introduction and the five formal assumptions under “Nets without circles” | Discrete timing, absolute inhibitory behavior, and fixed structure belong to the historical abstraction; weighted/bias arithmetic and XOR proofs are modern teaching derivations |
| Information | Shannon 1948 corrected reprint, introduction and finite entropy definition | No semantic or truth measure; original finite numerical examples |
| Imitation | Turing 1950, institutional PDF, §1, including the original participants and machine substitution | Original game distinguished from the invented 20-conversation evaluation example |
| Dartmouth | Stanford primary document, date, opening and research topics | 1955 proposal distinguished from 1956 summer project and achieved results |

No historical quote is reproduced verbatim. Dates are source dates, not invention-priority claims. Later-era descriptions are editorial roadmap summaries. Source URLs are recorded in `lib/course.ts`.

## Expansion source review

- **Rosenblatt (1958):** Stanford institutional scan, Psychological Review 65(6), pp. 386–408; opening research questions and association/response architecture, with reinforcement discussion later in the paper. The lesson separates that framework from the modern two-input mistake-driven teaching classifier. No historical machine is reconstructed.
- **Novikoff:** the Waterloo institutional scan timed out. Its bibliographic title and 1962 symposium date follow the references in Freund & Schapire (1999), not a claim of direct review. The original text's details remain unverified.
- **Convergence statement:** checked against Freund & Schapire (1999), “Large Margin Classification Using the Perceptron Algorithm,” §2–3.1, https://cseweb.ucsd.edu/~yfreund/papers/LargeMarginsUsingPerceptron.pdf. The lesson states finite bounded data, strict linear separation/positive margin, repeated presentation, fixed positive learning rate, the bias-as-extra-feature convention, and zero initialization. Training convergence is distinguished from generalization and a finite epoch cap.
- All five requested historical/mathematical references have companions explaining their question, contribution/novelty, limits, and influence. Novikoff is explicitly outside the era. Direct scans remain linked; no paper PDFs are bundled or copied into public assets.

The arithmetic, AND/OR bias intervals, learning updates, geometric cases, XOR impossibility, and hidden-layer construction are independently derived and tested where executable. Paper summaries do not substitute for these numerical checks.
