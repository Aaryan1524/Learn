# Visualization handoff

The user explicitly requested reserved spaces, rather than completed visualizations. `FigureSlot` in `components/editorial.tsx` establishes a 16:9 frame (`.fig-stage`), figure number, title, caption, and a stable `data-figure-slot` hook.

| Lesson | Slot | Learning question | Existing text alternative |
| --- | --- | --- | --- |
| Computation | 01 | What changes in one transition? | Program table and full computed trace |
| Logic | 02 | How does a threshold change a logical decision? | Four-case truth table and XOR argument |
| Information | 03 | How do probabilities change average uncertainty? | Finite outcomes, substituted numbers, and boundary cases |
| Imitation | 04 | What does a behavioral test establish? | Worked protocol, baseline, and observation/interpretation distinction |
| Dartmouth | 05 | Which research threads did the proposal connect? | Claim/evidence table and source-reading prompt |

Replace the reserved canvas inside a slot, keeping its frame and caption if appropriate. `lib/models.ts` contains the initial pure models; `tests/foundations.test.ts` verifies their numbers. Read the installed Anatomy skill before drawing any Anatomy figure. Each final figure needs the brief, controls, nonvisual equivalent, reset, reduced-motion behavior, and verification described in root `Reference.md` §5.

Home and the Part 1 overview no longer show a figure slot; only lesson pages do. There are no fake sliders, replay buttons, or implied working visualizations.
