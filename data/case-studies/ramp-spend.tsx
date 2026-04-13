import { FigmaToolIcon } from "@/components/ramp/FigmaToolIcon";
import type { RampEpisode } from "./ramp-types";

const tools = <FigmaToolIcon />;

export const rampSpendEpisodes: RampEpisode[] = [
  {
    title: "Cardholder Account Creation",
    pillSub: "From invite to first swipe without losing people in setup.",
    status: "now",
    yearLabel: "2025",
    employment: "Full-time",
    metaYear: "2025 — Now Playing",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline:
      "A story of reducing activation anxiety for people who just need a card that works.",
    onePagerHref: "/ramp/spend/cardholder-creation-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/spend/cardholder-creation-hero.png",
      alt: "Cardholder Account Creation hero",
    },
    outcome: {
      problem:
        "New cardholders were dropping off during account creation because the setup path felt long, opaque, or misaligned with how admins expected invites to work.",
      outcome:
        "Shipped a clearer creation flow with better progress signaling and recovery paths so more invited users finish setup and start spending with less support load.",
    },
    metrics: [
      { value: "—", label: "COMPLETION RATE" },
      { value: "—", label: "TIME TO FIRST CARD" },
      { value: "—", label: "SUPPORT CONTACTS" },
    ],
    stuffBullets: [
      "Rebuilt the invite-to-active journey around explicit milestones and human-readable errors.",
      "Collaborated with engineering on validation order so users see the next unblocker, not a wall of fields.",
      "Aligned admin and cardholder views so expectations match on both sides of an invite.",
    ],
    screenGrid: {
      layout: "mg2",
      cells: [
        {
          aspect: "wide",
          src: "/ramp/spend/cardholder-creation-screen-a.png",
          placeholderLabel: "WIDE — Primary web view",
        },
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-creation-screen-b.png",
          placeholderLabel: "Screen A",
        },
        { aspect: "r16-9", placeholderLabel: "Screen B" },
      ],
    },
    learnings: [
      "Activation is a trust curve: every unexplained pause looks like a bug.",
      "Copy is infrastructure in onboarding; treat it like engineering reliability.",
      "Admins and cardholders need paired mental models, not two different stories.",
    ],
    credits: [
      {
        role: "ENGINEERING",
        name: "Ramp",
        linkedInUrl: "https://www.linkedin.com/company/ramp/",
      },
      {
        role: "DATA",
        name: "Ramp",
        linkedInUrl: "https://www.linkedin.com/company/ramp/",
      },
      {
        role: "PRODUCT",
        name: "Ramp",
        linkedInUrl: "https://www.linkedin.com/company/ramp/",
      },
    ],
  },
  {
    title: "Unified Wallet Drawer",
    pillSub: "One place to see spend power without opening five tabs.",
    status: "past",
    yearLabel: "2025",
    employment: "Full-time",
    metaYear: "2025",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline:
      "A story of compressing complexity into a drawer people actually want to open.",
    onePagerHref: "/ramp/spend/unified-wallet-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/spend/unified-wallet-hero.png",
      alt: "Unified Wallet Drawer hero",
    },
    outcome: {
      problem:
        "Spend limits, balances, and program details were fragmented across views, which made quick decisions harder for admins and power users.",
      outcome:
        "Introduced a unified wallet drawer that surfaces the most decision-relevant information first, with clear drill-downs for the rest.",
    },
    metrics: [
      { value: "—", label: "DRAWER OPENS" },
      { value: "—", label: "TIME TO ANSWER" },
      { value: "—", label: "NAVIGATION DEPTH" },
    ],
    stuffBullets: [
      "Information-architected the drawer around questions admins ask in reviews, not internal data models.",
      "Designed responsive behavior so the same structure works beside tables and detail pages.",
      "Worked with engineering on motion and focus management so the drawer felt lightweight, not modal-heavy.",
    ],
    screenGrid: {
      layout: "mg3",
      cells: [
        {
          aspect: "wide3",
          src: "/ramp/spend/unified-wallet-screen-a.png",
          placeholderLabel: "WEB — Primary view",
        },
        { aspect: "r4-3", placeholderLabel: "Web detail" },
        { aspect: "r9-16", placeholderLabel: "Mobile web" },
        { aspect: "r4-3", src: "/ramp/spend/unified-wallet-screen-b.png", placeholderLabel: "Screen detail" },
      ],
    },
    learnings: [
      "Drawers work when they answer one primary question and defer the rest gracefully.",
      "Density is not the enemy; ambiguity is.",
      "Animation should communicate spatial continuity, not decoration.",
    ],
    credits: [
      {
        role: "ENGINEERING",
        name: "Ramp",
        linkedInUrl: "https://www.linkedin.com/company/ramp/",
      },
      {
        role: "DATA",
        name: "Ramp",
        linkedInUrl: "https://www.linkedin.com/company/ramp/",
      },
      {
        role: "PRODUCT",
        name: "Ramp",
        linkedInUrl: "https://www.linkedin.com/company/ramp/",
      },
    ],
  },
  {
    title: "Quality of life updates for Akuma",
    pillSub: "2025 Ramp Hacks project",
    status: "past",
    yearLabel: "1 week",
    titleTimingBadge: "2025",
    employment: "Full-time",
    metaYear: "1 week",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline: "",
    onePagerHref: "/ramp/spend/akuma-updates-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/spend/akuma-updates-hero.png",
      alt:
        "Akuma tooling: email preview, template analytics, communication templates list, and visual search for similar templates",
    },
    outcomeRich: (
      <p>
        Won runner-up in Ramp Hacks for adding AI features to the email design
        system &ldquo;Akuma&rdquo; internal tooling.
      </p>
    ),
    stuffBullets: [
      "Shipped Email previews so builders could flip through emails via the table without having to open a new page.",
      "Shipped Analytics so builders can see how emails perform without having to click and log in to Datadog.",
      "Shipped Visual Search so builders can identify Akuma IDs for email screenshots from Slack threads.",
      "Shipped inline editing so builders could make and preview text edits before opening a pull request on GitHub.",
    ],
    screenGrid: {
      layout: "mg2",
      cells: [
        {
          aspect: "r16-9",
          media: "video",
          src: "/ramp/spend/akuma-updates-video-primary.mp4",
          alt: "Akuma tooling — primary web view",
          placeholderLabel: "WEB — Primary view",
        },
        {
          aspect: "r16-9",
          media: "video",
          src: "/ramp/spend/akuma-updates-video-web-detail.mp4",
          alt: "Akuma tooling — web detail",
          placeholderLabel: "Web detail",
        },
        {
          aspect: "r16-9",
          media: "video",
          src: "/ramp/spend/akuma-updates-video-mobile.mp4",
          alt: "Akuma tooling — mobile web",
          placeholderLabel: "Mobile web",
        },
        {
          aspect: "r16-9",
          media: "video",
          src: "/ramp/spend/akuma-updates-video-screen-detail.mp4",
          alt: "Akuma tooling — screen detail",
          placeholderLabel: "Screen detail",
        },
      ],
    },
    credits: [
      {
        role: "ENGINEERING",
        name: "Gab Miranda",
        linkedInUrl: "https://www.linkedin.com/in/gabriel-miranda/",
      },
    ],
  },
];
