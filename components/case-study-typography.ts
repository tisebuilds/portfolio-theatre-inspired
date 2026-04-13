/**
 * Four-tier type scale for case studies: headline, body, bodySecondary, muted.
 * Use `mutedLabel` for uppercase section rails and role labels (same tier as `muted`).
 */
export const caseStudyType = {
  headline:
    "text-2xl font-bold tracking-normal text-neutral-200 md:text-3xl",
  body: "text-base leading-relaxed text-neutral-200",
  /** Supporting paragraphs (e.g. learnings copy, credits intro). */
  bodySecondary: "text-base leading-relaxed text-white/70",
  muted: "text-sm font-medium text-white/55",
  mutedLabel: "text-sm font-medium uppercase tracking-[0.2em] text-white/55",
} as const;
