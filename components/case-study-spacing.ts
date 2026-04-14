/**
 * Shared vertical rhythm for case study layouts (Tailwind class fragments).
 * Numeric comments are default rem→px at 16px root.
 *
 * Ramp cinema chapters use matching `--cs-*` variables in
 * `components/ramp/ramp-cinema.module.css` (`.root`).
 */

export const caseStudySpacing = {
  /** Major blocks (prototype, impact, overview sections): 56px */
  sectionStack: "gap-14",
  /** Primary page column — same as sectionStack */
  pageStack: "flex flex-col gap-14",
  /** After uppercase / section labels before body (Overview, Impact, Skills): 24px */
  labelToContent: "mt-6",
  /** Section label row: eyebrow + rule (StandardWorkCaseStudy SectionLabel has no extra margin below the rule) */
  sectionLabelClass: "flex w-full items-center gap-4",
  /** Learnings dl / similar stacks: 32px, 36px sm */
  learningsList: "space-y-8 sm:space-y-9",
  /** Ramp-style bodyCopy learning list: 24px, 28px sm */
  learningsBodyCopyList: "space-y-6 sm:space-y-7",
  /** CaseStudyPageShell — default showcase band below meta */
  showcaseSectionDefault:
    "relative mt-8 flex min-h-[min(52vh,480px)] justify-center pt-3 pb-8 sm:mt-10 sm:pt-4 sm:pb-12",
  /** CaseStudyPageShell — flush layout */
  showcaseSectionFlush:
    "relative mt-6 flex justify-center pt-0 pb-10 sm:mt-8 sm:pt-0 sm:pb-14",
  /** Credits column grid (margins depend on intro copy — apply in the component). */
  creditsColumnsGrid:
    "grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 md:grid-cols-3 md:gap-y-11",
  /** Impact metric cards grid */
  impactMetricsGrid: "grid grid-cols-1 gap-6 md:grid-cols-2",
  /** Shipped / project intro block */
  projectIntroStack: "flex flex-col gap-6 max-w-2xl",
  /** Figure: embed + caption */
  prototypeFigureStack: "flex flex-col gap-4",
  /** Figcaption inner */
  prototypeCaptionStack: "flex flex-col gap-1.5",
  /** Primary control below impact cards (DesignDecisionsDrawer trigger) */
  designDecisionsTrigger: "mt-6 inline-flex items-center gap-2 self-start text-left text-sm text-neutral-400 hover:text-neutral-200 underline-offset-2 hover:underline transition-colors",
} as const;

/** Uppercase section headings (Impact, Skills) — label spacing only; pair content with labelToContent on sibling. */
export const caseStudySectionHeadingClass =
  "text-sm font-medium uppercase tracking-[0.12em] text-neutral-500";
