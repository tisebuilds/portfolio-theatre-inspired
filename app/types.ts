/** Item in the "what shipped" list: plain text or link to a shipped case study page */
export type WhatShippedItem =
  | string
  | { slug: string; label: string; quarter?: string; thumbnail?: string };

export type WorkExperience = {
  slug: string;
  title: string;
  dateRange: string;
  description?: string;
  /** Optional external case-study journal URL for this experience. */
  journalUrl?: string;
  /** Optional custom label for the journal link button. */
  journalLabel?: string;
  tagline?: string;
  /** Optional logo image URL; if missing, menu shows initial(s) */
  logo?: string;
  /** Logo variant shown on hover */
  logoHover?: string;
  image?: string;
  poster?: string;
  whatShipped?: WhatShippedItem[];
  lessons?: string[];
  cast?: { name: string; role?: string }[];
};

/** One impact metric card: large metric, title, and description */
export type ImpactCard = {
  metric: string;
  title: string;
  description: string;
};

/** One tab in a case study: problem copy + prototype image/embed (e.g. "Problem 1", "Problem 2") */
export type ShippedCaseStudyTab = {
  /** Challenge statement for this tab */
  problem: string;
  /** Image or embed URL for this tab's prototype */
  prototypeUrl: string;
  /** Browser tab label when rendered in browser frame (e.g. "Problem 1", "Problem 2") */
  tabTitle?: string;
  /** URL bar text in browser frame (e.g. "app.ramp.com/treasury", "app.ramp.com/expenses") */
  urlBarText?: string;
};

/** A "what's shipped" case study: prototype-focused page with description bullets */
export type ShippedCaseStudy = {
  workSlug: string;
  slug: string;
  title: string;
  /** Case study visibility: "coming-soon" renders placeholder variant. */
  status?: "published" | "coming-soon";
  /** Optional launch marker for coming soon variant, e.g. "Q2 2026". */
  expectedLaunch?: string;
  /** Optional custom copy for coming soon variant. */
  comingSoonNote?: string;
  /** Quarter this shipped (e.g. "2026Q1") – shown as a tag in the project header */
  shippedQuarter?: string;
  /** Figma embed URL, image URL, or other embeddable URL (used when tabs is empty) */
  prototypeUrl: string;
  /** "figma" | "image" | "embed" | "browser" – controls how prototype is rendered */
  prototypeType?: "figma" | "image" | "embed" | "browser";
  /** When set, multiple tabs are shown; each tab has its own problem + prototype. Otherwise single problem/prototype. */
  tabs?: ShippedCaseStudyTab[];
  /** Challenge statement (used when tabs is not set) */
  problem?: string;
  /** Browser tab label when prototypeType is "browser" (e.g. "Problem 1", "Reserve account") */
  tabTitle?: string;
  /** URL bar text in browser frame when prototypeType is "browser" */
  urlBarText?: string;
  /** When set, used as project section body (title + this); impact cards use impact[] */
  projectDescription?: string;
  /** Impact metrics shown as cards when set; otherwise bullets are used for all content */
  impact?: ImpactCard[];
  bullets: string[];
  /** Optional skills used or demonstrated in this case study */
  skills?: string[];
};

export type Project = {
  slug: string;
  title: string;
  dateRange?: string;
  description?: string;
  tagline?: string;
  image?: string;
  poster?: string;
  /** YouTube or embeddable video URL shown on the CRT TV screen */
  video?: string;
  /** Website URL to render in an iframe on the CRT TV screen (preferred over `video` when set). */
  tvEmbedUrl?: string;
  /** When true, local MP4 is not muted so audio can play (browser may still gate autoplay). */
  videoSound?: boolean;
  /** External link shown on the TV controls (App Store, case study, etc.) */
  externalUrl?: string;
  /** Button label — defaults to "Visit" when omitted */
  externalLinkLabel?: string;
  whatShipped?: string[];
  lessons?: string[];
  cast?: { name: string; role?: string }[];
};

export type Award = {
  name: string;
  issuer: string;
  year: string;
  image?: string;
};

export type Pin = {
  label: string;
  /** Optional image path for your illustration (e.g. in public/) */
  image?: string;
  /** Optional URL (e.g. Letterboxd profile for Film) */
  href?: string;
};

export type Mentor = {
  name: string;
  role?: string;
  /** Image path (e.g. in public/) for profile photo */
  image?: string;
};

export type AboutData = {
  awards: Award[];
  pins: Pin[];
  credits: string;
  mentors: Mentor[];
};
