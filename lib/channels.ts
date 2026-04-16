import type { Project } from "@/app/types";

/** 1-based channel number as shown in UI (CH 01 … CH 08) */
export type ChannelNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ChannelGroup = "work" | "side";

export type ChannelKind = "work" | "side-project";

/** Optional mobile resume row: cleaner titles, date override, tag pills. */
export type MobileResumeRow = {
  title?: string;
  /** When set, replaces `yearRange` on the small-screen resume only. */
  yearRange?: string;
  /** When set, replaces `role` on the small-screen resume only. */
  roleLine?: string;
  tags: string[];
};

export type TvChannel = {
  channel: ChannelNumber;
  group: ChannelGroup;
  kind: ChannelKind;
  /** Sidebar + OSD label */
  navLabel: string;
  /** Short name for OSD (uppercase style) */
  osdShort: string;
  workSlug?: string;
  /** Side project slug in projects.json */
  projectSlug?: string;
  role: string;
  yearRange: string;
  hasEpisodes: boolean;
  mobileResume?: MobileResumeRow;
};

export const TV_CHANNEL_COUNT = 8;

export const ACCENT_WORK = "#E299C0";
/** Same as work — single pink accent across the TV UI. */
export const ACCENT_SIDE = ACCENT_WORK;
export const TV_BG = "#0a0a0a";
export const TV_TEXT = "#f0f0f0";
export const TV_MUTED = "#888888";

/**
 * URL `?signal=lost` shows NO SIGNAL (Easter egg). Invalid `?ch=` also routes there.
 * Keyboard: Digit0 / Digit9 enters signal lost from TvShell.
 */
export const SIGNAL_LOST_PARAM = "signal";

export const TICKER_DEFAULT_TEXT =
  "Open to work (full time or contracting)";

export const CHANNELS: TvChannel[] = [
  {
    channel: 1,
    group: "work",
    kind: "work",
    navLabel: "Ramp Spend Management",
    osdShort: "SPEND MANAGEMENT",
    workSlug: "ramp-spend",
    role: "Head of Design",
    yearRange: "2023–2025",
    hasEpisodes: true,
    mobileResume: {
      title: "Ramp Spend Management",
      roleLine: "Full-time",
      tags: ["Employee onboarding", "Wallet drawer", "QoL for Akuma"],
    },
  },
  {
    channel: 2,
    group: "work",
    kind: "work",
    navLabel: "Ramp Treasury",
    osdShort: "TREASURY",
    workSlug: "ramp-treasury",
    role: "Head of Design",
    yearRange: "Now Playing",
    hasEpisodes: true,
    mobileResume: {
      title: "Ramp Treasury",
      yearRange: "2025–2026",
      roleLine: "Full-time",
      tags: ["Move money drawer", "RBA cashback redemption"],
    },
  },
  {
    channel: 3,
    group: "work",
    kind: "work",
    navLabel: "Figma",
    osdShort: "FIGMA",
    workSlug: "figma",
    role: "Design intern",
    yearRange: "Summer 2023",
    hasEpisodes: true,
    mobileResume: {
      roleLine: "Internship",
      tags: [],
    },
  },
  {
    channel: 4,
    group: "work",
    kind: "work",
    navLabel: "Meta",
    osdShort: "META",
    workSlug: "meta",
    role: "Product design intern",
    yearRange: "Summer 2022",
    hasEpisodes: true,
    mobileResume: {
      roleLine: "Internship",
      tags: [],
    },
  },
  {
    channel: 5,
    group: "work",
    kind: "work",
    navLabel: "Disney",
    osdShort: "DISNEY",
    workSlug: "disney",
    role: "Product design intern",
    yearRange: "Summer 2021",
    hasEpisodes: true,
    mobileResume: {
      roleLine: "Internship",
      tags: [],
    },
  },
  {
    channel: 6,
    group: "side",
    kind: "side-project",
    navLabel: "Letterboxd moodboard",
    osdShort: "LETTERBOXD MOODBOARD",
    projectSlug: "letterboxd-website-wall",
    role: "",
    yearRange: "2026",
    hasEpisodes: false,
  },
  {
    channel: 7,
    group: "side",
    kind: "side-project",
    navLabel: "iPod Concert Diary",
    osdShort: "IPOD CONCERT DIARY",
    projectSlug: "ipod-concert-diary",
    role: "",
    yearRange: "2026",
    hasEpisodes: false,
  },
  {
    channel: 8,
    group: "side",
    kind: "side-project",
    navLabel: "Dinner Party Seating Chart",
    osdShort: "DINNER PARTY SEATING CHART",
    projectSlug: "dinner-party-seating-chart",
    role: "",
    yearRange: "2026",
    hasEpisodes: false,
  },
];

export function channelByNumber(n: ChannelNumber): TvChannel {
  return CHANNELS[n - 1];
}

export function channelFromIndex(i: number): TvChannel | undefined {
  if (i < 0 || i > 7) return undefined;
  return CHANNELS[i];
}

export function isValidChannelDigit(n: number): n is ChannelNumber {
  return n >= 1 && n <= 8;
}

export function parseChannelFromSearchParams(
  params: URLSearchParams,
): { mode: "channel"; channel: ChannelNumber } | { mode: "signalLost" } {
  if (params.get(SIGNAL_LOST_PARAM) === "lost") {
    return { mode: "signalLost" };
  }
  const raw = params.get("ch");
  if (raw === null || raw === "") {
    return { mode: "channel", channel: 1 };
  }
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1 || n > 8) {
    return { mode: "signalLost" };
  }
  return { mode: "channel", channel: n as ChannelNumber };
}

export function projectForChannel(
  ch: TvChannel,
  projects: Project[],
): Project | undefined {
  if (!ch.projectSlug) return undefined;
  return projects.find((p) => p.slug === ch.projectSlug);
}
