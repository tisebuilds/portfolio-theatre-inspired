import { FigmaToolIcon } from "@/components/ramp/FigmaToolIcon";
import type { RampCredit, RampEpisode } from "./ramp-types";

const tools = <FigmaToolIcon />;

const treasuryCredits: RampCredit[] = [
  {
    role: "DESIGN MANAGER",
    name: "Jason Li",
    linkedInUrl: "https://www.linkedin.com/in/jasonzli/",
  },
  {
    role: "DESIGN LEAD",
    name: "George Visan",
    linkedInUrl: "https://www.linkedin.com/in/gvisan/",
  },
  {
    role: "ENGINEER",
    name: "Brian Schendt",
    linkedInUrl: "https://www.linkedin.com/in/brianschendt/",
  },
  {
    role: "ENGINEER",
    name: "Mark Skelton",
    linkedInUrl: "https://www.linkedin.com/in/mskelton0/",
  },
  {
    role: "ENGINEER",
    name: "Moritz Pail",
    linkedInUrl: "https://www.linkedin.com/in/moritz-pail/",
  },
  {
    role: "ENGINEER",
    name: "Max Buchan",
    linkedInUrl: "https://www.linkedin.com/in/max-buchan/",
  },
  {
    role: "ENGINEER",
    name: "Eric Zhu",
    linkedInUrl: "https://www.linkedin.com/in/eric-zhu-097435138/",
  },
  {
    role: "ENGINEER",
    name: "Arnab Dey",
    linkedInUrl: "https://www.linkedin.com/in/arnabdey29/",
  },
  {
    role: "PRODUCT MANAGER",
    name: "Karl Yang",
    linkedInUrl: "https://www.linkedin.com/in/karl-yang/",
  },
  {
    role: "PRODUCT OPERATIONS",
    name: "Christy Chung",
    linkedInUrl: "https://www.linkedin.com/in/christy-chung-443b3955/",
  },
  {
    role: "DATA",
    name: "James Coen",
    linkedInUrl: "https://www.linkedin.com/in/james-coen/",
  },
];

/** Fardeem & William credited on RBA cashback only (not Move money / QoL). */
const fardeemMunirCredit: RampCredit = {
  role: "ENGINEER",
  name: "Fardeem Munir",
  linkedInUrl: "https://www.linkedin.com/in/fardeem/",
};

const williamLooCredit: RampCredit = {
  role: "ENGINEER",
  name: "William Loo",
  linkedInUrl: "https://www.linkedin.com/in/williamlooo/",
};

/** After Moritz: Fardeem, William, then shared engineer tail (Max onward; index 5). */
const rbaTreasuryCredits: RampCredit[] = [
  ...treasuryCredits.slice(0, 5),
  fardeemMunirCredit,
  williamLooCredit,
  ...treasuryCredits.slice(5),
];

export const rampTreasuryEpisodes: RampEpisode[] = [
  {
    hideLearnings: true,
    title: "Move money drawer",
    pillSub: "Enabling businesses to move money in and out of their bank accounts",
    status: "now",
    yearLabel: "2025-2026",
    employment: "Full-time",
    metaYear: "2025-2026",
    tools,
    externalHref: "https://ramp.com/treasury",
    externalLabel: "ramp.com",
    logline: "A lesson in operating on intuition",
    onePagerHref: "/ramp/treasury/move-money-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/treasury/move-money-drawer.mp4",
      alt: "Move money drawer hero",
      media: "video",
    },
    outcomeRich: (
      <>
        <p>
          Customers have a faster, more convenient way to add funds to their RBA
          without needing to visit physical banks, increasing deposit volume and
          account stickiness for Ramp's treasury product.
        </p>
        <p>
          Customers can also send money to any recipient with minimal friction.
        </p>
      </>
    ),
    metrics: [
      { value: "$63.9M", label: "COMPLETED PAYMENT VOLUME" },
      { value: "1,106", label: "COMPLETED PAYMENTS" },
      { value: "222", label: "BUSINESSES WITH PAYMENTS" },
      {
        value: "$959,927.75",
        label: "SUCCESSFUL CHECK DEPOSITS",
      },
    ],
    stuffBullets: [
      "Added arrival date input box to increase clarity on when transfers and deposits would settle in an RBA.",
      "Led design that enabled customers to deposit checks into Ramp Business Accounts (critical capability as ~26% of businesses still operate with check).",
      "Led design for invoice-free vendor payments enabling lightweight flows for one-off vendors.",
    ],
    screenGrid: {
      layout: "mg4",
      cells: [
        {
          aspect: "r9-16",
          src: "/ramp/treasury/move-money-arrival-date.mp4",
          alt: "Arrival date — primary web view",
          placeholderLabel: "Primary web view",
          media: "video",
        },
        {
          aspect: "r9-16",
          src: "/ramp/treasury/move-money-check-deposits.mp4",
          alt: "Check deposits",
          placeholderLabel: "Check deposits",
          media: "video",
        },
        {
          aspect: "r9-16",
          src: "/ramp/treasury/move-money-send-money-1.mp4",
          alt: "Send money — web",
          placeholderLabel: "Send money",
          media: "video",
        },
        {
          aspect: "r9-16",
          src: "/ramp/treasury/move-money-send-money-2-mobile.mp4",
          alt: "Send money — mobile",
          placeholderLabel: "Send money — mobile",
          media: "video",
        },
      ],
    },
    learnings: [
      "Money movement is mostly a clarity problem: if people cannot predict what happens next, they will not click send.",
      "The best finance UI sounds boring on paper and feels obvious in the product.",
      "Designing for exceptions early saves months of retrofitting later.",
    ],
    credits: treasuryCredits,
  },
  {
    hideLearnings: true,
    title: "RBA cashback redemption",
    pillSub: "Helping teams actually use the value they had already earned.",
    status: "past",
    yearLabel: "2025",
    employment: "Full-time",
    metaYear: "H2 2025",
    tools,
    externalHref: "https://ramp.com/treasury",
    externalLabel: "ramp.com",
    logline: "A lesson in starting from the solution first",
    onePagerHref: "/ramp/treasury/rba-cashback-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/treasury/rba-cashback-hero.png",
      alt: "RBA cashback redemption hero",
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
      layout: "mg4",
      cells: [
        {
          aspect: "r1-1",
          src: "/ramp/treasury/rba-cashback-screen-a.png",
          placeholderLabel: "Primary web view",
        },
        {
          aspect: "r1-1",
          src: "/ramp/treasury/rba-cashback-screen-b.png",
          placeholderLabel: "Screen A",
        },
        {
          aspect: "r1-1",
          placeholderLabel: "Screen B",
        },
        {
          aspect: "r1-1",
          placeholderLabel: "Screen C",
        },
      ],
    },
    learnings: [
      "Rewards UX is emotional even in B2B: small copy choices change whether value feels real or theoretical.",
      "If the backend state machine is messy, the interface should still feel linear.",
      "Prototype the unhappy paths first; redemption flows live or die on edge cases.",
    ],
    credits: rbaTreasuryCredits,
  },
  {
    hideLearnings: true,
    title: "Quality of life updates",
    pillSub: "Small surfaces, compounding trust across Treasury.",
    status: "past",
    yearLabel: "2025-2026",
    employment: "Full-time",
    metaYear: "2025 - 2026",
    tools,
    externalHref: "https://ramp.com/treasury",
    externalLabel: "ramp.com",
    logline: "A lesson in skipping steps and making them up",
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
      layout: "mg4",
      cells: [
        { aspect: "r1-1", placeholderLabel: "Primary web view" },
        {
          aspect: "r1-1",
          src: "/ramp/treasury/qol-updates-screen-a.png",
          placeholderLabel: "Screen A",
        },
        {
          aspect: "r1-1",
          src: "/ramp/treasury/qol-updates-screen-b.png",
          placeholderLabel: "Screen B",
        },
        { aspect: "r1-1", placeholderLabel: "Screen C" },
      ],
    },
    learnings: [
      "QoL work is invisible until it is missing; the goal is to make success feel quiet.",
      "Finance users reward consistency more than novelty.",
      "Batching small fixes beats waiting for a mythical big redesign.",
    ],
    credits: treasuryCredits,
  },
];
