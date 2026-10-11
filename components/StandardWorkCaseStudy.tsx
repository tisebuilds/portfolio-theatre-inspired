import type { ReactNode } from "react";

export type StandardWorkCaseStudyCredit = {
  name: string;
  role?: string;
  href?: string;
};

export type StandardWorkCaseStudyLearning = {
  title: ReactNode;
  content: ReactNode;
};

export type StandardWorkCaseStudyProps = {
  /** Prefix for stable section ids, e.g. `disney` → `disney-overview-heading`. */
  idPrefix: string;
  title: string;
  dateRange: string;
  meta: ReactNode;
  hero: {
    src: string;
    alt: string;
    caption: string;
    sizes?: string;
    priority?: boolean;
  };
  overview: ReactNode;
  /** `split` = title and body on one row; `stacked` = title above body (single column). */
  learningsLayout?: "split" | "stacked";
  /**
   * When learnings are shown as `presentation="bodyCopy"` (e.g. TV shell), inserted between
   * title and body when `content` is set. Defaults to a single space.
   */
  learningsBodyCopyTitleSeparator?: string;
  learnings: StandardWorkCaseStudyLearning[];
  creditsIntro: string;
  creditsColumns: StandardWorkCaseStudyCredit[][];
};

export const secondaryLinkClass =
  "text-neutral-400 underline decoration-neutral-400 underline-offset-[0.2em] transition-colors hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
