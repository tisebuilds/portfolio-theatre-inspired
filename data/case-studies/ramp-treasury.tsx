import { CursorToolIcon } from "@/components/ramp/CursorToolIcon";
import { FigmaToolIcon } from "@/components/ramp/FigmaToolIcon";
import { MagicPatternsToolIcon } from "@/components/ramp/MagicPatternsToolIcon";
import { SlackToolIcon } from "@/components/ramp/SlackToolIcon";
import { VercelToolIcon } from "@/components/ramp/VercelToolIcon";
import type { RampCredit, RampEpisode } from "./ramp-types";

const tools = (
  <>
    <FigmaToolIcon />
    <VercelToolIcon />
    <MagicPatternsToolIcon />
    <CursorToolIcon />
  </>
);

const rbaCashbackTools = (
  <>
    <FigmaToolIcon />
    <SlackToolIcon />
  </>
);

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

/** RBA cashback credits omit several roles from the shared Treasury list (see episode). */
const rbaTreasuryCredits: RampCredit[] = [
  {
    role: "DESIGN LEAD",
    name: "George Visan",
    linkedInUrl: "https://www.linkedin.com/in/gvisan/",
  },
  fardeemMunirCredit,
  williamLooCredit,
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

export const rampTreasuryEpisodes: RampEpisode[] = [
  {
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
      {
        value: "$959,927.75",
        label: "SUCCESSFUL CHECK DEPOSITS",
      },
      { value: "$63.9M", label: "COMPLETED PAYMENT VOLUME" },
      { value: "1,106", label: "COMPLETED PAYMENTS" },
      { value: "222", label: "BUSINESSES WITH PAYMENTS" },
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
    title: "RBA cashback redemption",
    pillSub: "Redeem Ramp cashback directly into a bank account",
    status: "past",
    yearLabel: "2025",
    employment: "Full-time",
    metaYear: "H2 2025",
    tools: rbaCashbackTools,
    externalHref: "https://ramp.com/treasury",
    externalLabel: "ramp.com",
    logline: "A lesson in starting from the solution first",
    onePagerHref: "/ramp/treasury/rba-cashback-one-pager.pdf",
    hero: {
      aspect: "web",
      alt: "RBA cashback redemption — new vs existing customer",
      media: "video",
      videoVariants: [
        {
          label: "New customer",
          src: "/ramp/treasury/rba-cashback-new-customer.mp4",
        },
        {
          label: "Existing customer",
          src: "/ramp/treasury/rba-cashback-existing-customer.mp4",
        },
      ],
    },
    outcome: {
      problem: "",
      outcome:
        "Led design enabling customers to redeem cashback into Ramp Business Accounts and open new accounts using their rewards.",
    },
    metrics: [
      { value: "$6.4M", label: "CASHBACK REDEMPTIONS" },
      { value: "303", valuePill: "91% funded", label: "NEW RBA CUSTOMERS" },
      { value: "48%", label: "MoM FUNDED GROWTH" },
    ],
    hideStuffChapter: true,
    learnings: [
      {
        title: "Friction in onboarding for rewards can be beneficial",
        description:
          "Slowing down users filters more intentional users.",
      },
      {
        title: "Protect the existing set up for current customers",
        description:
          "Opening a new account should not disrupt established workflows businesses already rely on.",
      },
      {
        title: "Copy matters",
        description:
          "Clear, explicit wording and thoughtful labeling have a direct impact on user experience.",
      },
    ],
    credits: rbaTreasuryCredits,
  },
  {
    hidden: true,
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
