import type { ChannelNumber } from "@/lib/channels";

export type AboutPhilosophyBackLink = {
  label: string;
  channel: ChannelNumber;
  /** Visible episode index (matches sidebar case list after filtering hidden). */
  episodeIndex: number;
};

export type AboutPhilosophyNavItem =
  | {
      philosophyTitle: string;
      body: string;
      /** Flip reveals these case-study links (no auto-navigation). */
      backLinks: AboutPhilosophyBackLink[];
    }
  | {
      philosophyTitle: string;
      body: string;
      episodeLabel: string;
      channel: ChannelNumber;
      episodeIndex: number;
    };

export function isOutcomePickCard(
  item: AboutPhilosophyNavItem,
): item is AboutPhilosophyNavItem & { backLinks: AboutPhilosophyBackLink[] } {
  return "backLinks" in item;
}

/**
 * About → TV case study deep links. Spend = CH 01, Treasury = CH 02.
 * Treasury ep must stay 0–1 (third episode is hidden in data).
 */
export const ABOUT_PHILOSOPHY_NAV: AboutPhilosophyNavItem[] = [
  {
    philosophyTitle: "Outcome-first",
    body: "Users don't interact with case studies, they only see what we ship.",
    backLinks: [
      { label: "Employee onboarding", channel: 1, episodeIndex: 0 },
      { label: "Wallet drawer", channel: 1, episodeIndex: 1 },
    ],
  },
  {
    philosophyTitle: "Feedback driven",
    episodeLabel: "Move money drawer",
    body: "I use prototypes and AI to drive alignment and clarity fast.",
    channel: 2,
    episodeIndex: 0,
  },
  {
    philosophyTitle: "My process",
    episodeLabel: "RBA cashback redemption",
    body: "I am not the right hire if you are looking for somone who's practice is based on process.",
    channel: 2,
    episodeIndex: 1,
  },
  {
    philosophyTitle: "Bias to action",
    episodeLabel: "Quality of life updates for Akuma",
    body: "Sometimes I move before every requirement is perfectly defined, but when I believe something should exist, I build it.",
    channel: 1,
    episodeIndex: 2,
  },
];
