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
};

export type Award = {
  name: string;
  issuer: string;
  year: string;
  image?: string;
  /** Optional external article or official page */
  href?: string;
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
