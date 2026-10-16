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
  /** Legacy rich meta row; prefer productLabel / productHref for TV cinema. */
  meta?: ReactNode;
  hero: {
    src: string;
    alt: string;
    /** Role logline under the title (TV cinema hero). */
    caption: string;
    sizes?: string;
    priority?: boolean;
  };
  /** Replaces default OUTCOME chapter label (e.g. OVERVIEW / CONTEXT). */
  overviewHeading?: string;
  /** Product row label + link in the TIMELINE / PRODUCT meta stack. */
  productLabel?: string;
  productHref?: string;
  overview: ReactNode;
  /** Optional body for a chapter between outcome and learnings (e.g. Side projects). */
  sideProjects?: ReactNode;
  /** Replaces default STUFF I WORKED ON when sideProjects is set (e.g. SIDE PROJECTS). */
  sideProjectsHeading?: string;
  learnings: StandardWorkCaseStudyLearning[];
  creditsIntro: string;
  creditsColumns: StandardWorkCaseStudyCredit[][];
};

export const secondaryLinkClass =
  "text-neutral-400 underline decoration-neutral-400 underline-offset-[0.2em] transition-colors hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
