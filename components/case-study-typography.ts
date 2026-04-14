/**
 * Case-study type scale: primary (`text-white`), one muted tier (`text-neutral-400`,
 * aligned with Ramp `--text-muted`), accent handled in Ramp CSS only.
 */
export const caseStudyType = {
  headline: "text-2xl font-bold tracking-normal text-white md:text-3xl",
  body: "text-base leading-relaxed text-white",
  /** Supporting paragraphs (e.g. learnings copy, credits intro). */
  bodySecondary: "text-base leading-relaxed text-neutral-400",
  /** Learnings title — weight carries hierarchy; same color as body. */
  learningTitle: "text-sm font-medium leading-[1.85] text-white",
  /** Learnings body — same muted tier as bodySecondary and labels. */
  learningBody: "text-sm leading-[1.85] text-neutral-400",
  /** Learnings `bodyCopy` list — Ramp `--text` (fallback white if var unset). */
  learningBodyCopy: "text-sm leading-[1.85] text-[var(--text,#ffffff)]",
  muted: "text-sm font-medium text-neutral-400",
  /** Credits role column, etc. — slightly wider track than section eyebrows. */
  mutedLabel: "text-sm font-medium uppercase tracking-[0.2em] text-neutral-400",
  /** Section eyebrows (Overview, Learnings, Credits row) — matches numbered chapter labels. */
  sectionLabel: "text-sm font-medium uppercase tracking-[0.12em] text-neutral-400",
} as const;
