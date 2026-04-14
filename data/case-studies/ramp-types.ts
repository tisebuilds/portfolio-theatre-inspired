import type { ReactNode } from "react";

export type RampCredit = {
  role: string;
  name: string;
  linkedInUrl?: string;
};

export type RampMetric = {
  value: string;
  /** Optional pill beside the value (e.g. change indicator). */
  valuePill?: string;
  label: string;
};

export type RampScreenAspect =
  | "r16-9"
  /** Matches 1024×817 product / onboarding captures in this portfolio */
  | "r1024-817"
  | "r4-3"
  | "r9-16"
  | "wide"
  | "wide3"
  /** Frame height follows the image; no fixed aspect crop (object-fit cover). */
  | "intrinsic";

export type RampScreenCell = {
  aspect: RampScreenAspect;
  /** Public path e.g. `/ramp/treasury/move-money-screen-a.png` */
  src?: string;
  alt?: string;
  /**
   * Second still for the same screen; when set with `src` (and not `media: "video"`),
   * a Before / After pill toggle is shown at the bottom of the cell.
   */
  srcAfter?: string;
  altAfter?: string;
  placeholderLabel?: string;
  /** When `"video"`, `src` is rendered as an HTML5 video (defaults to image). */
  media?: "image" | "video";
};

export type RampScreenGrid = {
  layout: "mg2" | "mg3" | "mg4" | "stack";
  cells: RampScreenCell[];
};

export type RampEpisode = {
  title: string;
  /** Italic line in the player pill */
  pillSub: string;
  status: "now" | "past";
  /** Shown in pill when status is past */
  yearLabel: string;
  /** Hero title timing badge; defaults to yearLabel when omitted */
  titleTimingBadge?: string;
  /** When set, replaces the employment / metaYear / tools / external link row */
  metaRowRich?: ReactNode;
  employment?: string;
  /** First meta line after employment (e.g. date range) */
  metaYear?: string;
  tools?: ReactNode;
  externalHref?: string;
  externalLabel?: string;
  logline: string;
  /** External journal / production notes (opens in new tab). */
  journalUrl?: string;
  journalLabel?: string;
  onePagerHref?: string;
  hero: {
    aspect: "web" | "mobile";
    src?: string;
    alt?: string;
    /** When `"video"`, `src` is rendered as an HTML5 video (defaults to image). */
    media?: "image" | "video";
  };
  /** Skip hero mockup frame (pages that only had showcase body, e.g. AppDev phone). */
  hideHeroFrame?: boolean;
  /** Omit the “STUFF I WORKED ON” chapter rail (e.g. AppDev phone-only showcase). */
  hideStuffChapterHeader?: boolean;
  /** Omit the “THINGS I LEARNED” chapter (learnings fields may stay in data). */
  hideLearnings?: boolean;
  /** Halve default `.chapter` top padding for dense showcases (e.g. phone mockup). */
  stuffChapterTightTop?: boolean;
  outcome?: {
    problem: string;
    outcome: string;
  };
  outcomeRich?: ReactNode;
  metrics?: RampMetric[];
  stuffBullets?: string[];
  screenGrid?: RampScreenGrid;
  stuffRich?: ReactNode;
  learnings?: string[];
  learningsRich?: ReactNode;
  creditsIntro?: ReactNode;
  credits?: RampCredit[];
};
