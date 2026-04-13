import { FigmaToolIcon } from "@/components/ramp/FigmaToolIcon";
import type { RampEpisode } from "./ramp-types";

const tools = <FigmaToolIcon />;

export const rampTreasuryEpisodes: RampEpisode[] = [
  {
    title: "Move Money",
    pillSub: "Making outbound treasury payments feel inevitable, not improvised.",
    status: "now",
    yearLabel: "2025",
    employment: "Full-time",
    metaYear: "2025 — Now Playing",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline:
      "A story of turning fragile, one-off money movement into something finance teams could trust every week.",
    onePagerHref: "/ramp/treasury/move-money-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/treasury/move-money-hero.png",
      alt: "Move Money hero",
    },
    outcome: {
      problem:
        "Customers still leaned on ad hoc workflows to pay vendors and move funds out of Treasury, which slowed teams down and created reconciliation risk.",
      outcome:
        "Shipped a guided Move Money experience that connects checks, vendors, and approvals in one surface so teams can initiate and track outbound payments without leaving Ramp.",
    },
    metrics: [
      { value: "—", label: "TIME TO SEND" },
      { value: "—", label: "MANUAL STEPS REMOVED" },
      { value: "—", label: "ADOPTION" },
    ],
    stuffBullets: [
      "Framed end-to-end flows for check and vendor payments, from initiation through confirmation and receipts.",
      "Partnered with engineering on states for holds, limits, and edge cases so the UI stayed honest under stress.",
      "Defined patterns for review and audit trails that matched how finance actually reconciles.",
    ],
    screenGrid: {
      layout: "mg2",
      cells: [
        {
          aspect: "wide",
          src: "/ramp/treasury/move-money-screen-a.png",
          placeholderLabel: "WIDE — Primary web view",
        },
        {
          aspect: "r16-9",
          src: "/ramp/treasury/move-money-screen-b.png",
          placeholderLabel: "Screen A",
        },
        {
          aspect: "r16-9",
          placeholderLabel: "Screen B",
        },
      ],
    },
    learnings: [
      "Money movement is mostly a clarity problem: if people cannot predict what happens next, they will not click send.",
      "The best finance UI sounds boring on paper and feels obvious in the product.",
      "Designing for exceptions early saves months of retrofitting later.",
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
    title: "RBA Cashback Redemption",
    pillSub: "Helping teams actually use the value they had already earned.",
    status: "past",
    yearLabel: "2025",
    employment: "Full-time",
    metaYear: "2025",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline:
      "A story of closing the gap between “you have rewards” and “you can deploy them today.”",
    onePagerHref: "/ramp/treasury/rba-cashback-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/treasury/rba-cashback-hero.png",
      alt: "RBA Cashback Redemption hero",
    },
    outcome: {
      problem:
        "Redeeming Reserve Business Account cashback was not legible enough for busy finance operators, which muted a meaningful Treasury benefit.",
      outcome:
        "Delivered a redemption path that surfaces eligibility, timing, and outcomes in plain language so teams can convert rewards into working cash with confidence.",
    },
    metrics: [
      { value: "—", label: "REDEMPTIONS" },
      { value: "—", label: "TIME TO COMPLETE" },
      { value: "—", label: "SUPPORT TICKETS" },
    ],
    stuffBullets: [
      "Mapped the redemption journey against policy and operational constraints so the UI could stay compliant without feeling gated.",
      "Designed progressive disclosure for balances, pending states, and confirmations.",
      "Worked closely with Treasury PMs to align language with how customers talk about yield and liquidity.",
    ],
    screenGrid: {
      layout: "mg2",
      cells: [
        {
          aspect: "wide",
          src: "/ramp/treasury/rba-cashback-screen-a.png",
          placeholderLabel: "WIDE — Primary web view",
        },
        {
          aspect: "r16-9",
          src: "/ramp/treasury/rba-cashback-screen-b.png",
          placeholderLabel: "Screen A",
        },
        {
          aspect: "r16-9",
          placeholderLabel: "Screen B",
        },
      ],
    },
    learnings: [
      "Rewards UX is emotional even in B2B: small copy choices change whether value feels real or theoretical.",
      "If the backend state machine is messy, the interface should still feel linear.",
      "Prototype the unhappy paths first; redemption flows live or die on edge cases.",
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
    title: "Quality of life updates",
    pillSub: "Small surfaces, compounding trust across Treasury.",
    status: "past",
    yearLabel: "2024–25",
    employment: "Full-time",
    metaYear: "2024 — 2025",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline:
      "A story of polish as strategy: the details that keep finance teams from second-guessing the product.",
    onePagerHref: "/ramp/treasury/qol-updates-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/treasury/qol-updates-hero.png",
      alt: "Quality of life updates hero",
    },
    outcome: {
      problem:
        "Treasury teams were hitting recurring friction in everyday tasks—extra clicks, ambiguous labels, and inconsistent patterns—that eroded confidence over time.",
      outcome:
        "Bundled a stream of targeted improvements to tables, filters, and confirmations so core workflows felt faster, calmer, and more predictable.",
    },
    metrics: [
      { value: "—", label: "TASKS COMPLETED FASTER" },
      { value: "—", label: "ERRORS PREVENTED" },
      { value: "—", label: "CSAT" },
    ],
    stuffBullets: [
      "Audited high-traffic Treasury screens for inconsistency and fixed the patterns that caused hesitation.",
      "Partnered with CS and PM to prioritize fixes that reduced repeat tickets.",
      "Shipped iterative UI refinements without destabilizing the underlying information architecture.",
    ],
    screenGrid: {
      layout: "mg2",
      cells: [
        { aspect: "wide", placeholderLabel: "WIDE — Primary web view" },
        { aspect: "r16-9", src: "/ramp/treasury/qol-updates-screen-a.png", placeholderLabel: "Screen A" },
        { aspect: "r16-9", src: "/ramp/treasury/qol-updates-screen-b.png", placeholderLabel: "Screen B" },
      ],
    },
    learnings: [
      "QoL work is invisible until it is missing; the goal is to make success feel quiet.",
      "Finance users reward consistency more than novelty.",
      "Batching small fixes beats waiting for a mythical big redesign.",
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
];
