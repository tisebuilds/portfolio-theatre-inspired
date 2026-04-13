import { FigmaToolIcon } from "@/components/ramp/FigmaToolIcon";
import { GoogleDocsToolIcon } from "@/components/ramp/GoogleDocsToolIcon";
import type { RampEpisode } from "./ramp-types";

const tools = (
  <>
    <FigmaToolIcon />
    <GoogleDocsToolIcon />
  </>
);

export const rampSpendEpisodes: RampEpisode[] = [
  {
    title: "Employee onboarding",
    pillSub: "From invite to first swipe without losing people in setup.",
    status: "now",
    yearLabel: "'24 H2",
    titleTimingBadge: "2024",
    employment: "Full-time",
    metaYear: "H2 2024",
    tools,
    externalHref: "https://ramp.com/corporate-cards",
    externalLabel: "ramp.com",
    logline:
      "A lesson in doing something just for the sake of making people smile",
    onePagerHref: "/ramp/spend/cardholder-creation-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/spend/cardholder-creation-hero.png",
      alt:
        "Jobs-to-be-done hero: employee at a desk with floating Gmail, Okta, and Slack-style UI around Ramp onboarding",
    },
    outcomeRich: (
      <>
        <p>
          Led redesign of onboarding for Ramp&apos;s largest growing user role.
          Invited cardholders had been dropping off when account creation felt
          long, opaque, or misaligned with how admins expected invites to work.
        </p>
      </>
    ),
    metrics: [
      { value: "94%", label: "COMPLETION RATE" },
      {
        value: "2.4×",
        label: "MORE NEW USERS TRANSACTED IN FIRST 24 HOURS",
      },
      {
        value: "5 days",
        valuePill: "↑60%",
        label: "TIME TO FIRST TRANSACTION",
      },
      {
        value: "0",
        valuePill: "↓ from 0.032",
        label: "SUPPORT TICKETS / USER IN FIRST 30 DAYS",
      },
    ],
    stuffBullets: [
      "Rewrote the invite email for employees.",
      "Updated UI, copy, and assets to match the new design system and language changes for employee onboarding.",
    ],
    screenGrid: {
      layout: "mg2",
      cells: [
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-creation-invite-email-before.png",
          srcAfter: "/ramp/spend/cardholder-creation-invite-email-after.png",
          alt: "Gmail inbox showing the previous employee invite email from Ramp QA",
          altAfter:
            "Gmail inbox showing the redesigned employee invite email: Set up your Ramp account with updated copy and CTA",
          placeholderLabel: "Screen 1",
        },
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-onboarding-before-02-create-account.png",
          srcAfter: "/ramp/spend/cardholder-onboarding-after-02-create-account.png",
          alt: "Before: employee account creation with Google sign-in, testimonial card, and legal footer",
          altAfter:
            "After: streamlined invite copy, Continue with Google, and co-branded card visual",
          placeholderLabel: "Screen 2",
        },
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-onboarding-before-03-welcome.png",
          srcAfter: "/ramp/spend/cardholder-onboarding-after-03-spend-overview.png",
          alt: "Before: welcome step with numbered tips and lifestyle imagery",
          altAfter:
            "After: spend overview with stipends, virtual cards, and Ramp card mockup",
          placeholderLabel: "Screen 3",
        },
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-onboarding-before-04-expense-policy.png",
          srcAfter: "/ramp/spend/cardholder-onboarding-after-04-expense-policy.png",
          alt: "Before: read and sign company expense policy with document viewer",
          altAfter:
            "After: review and sign with legal name field and inline policy preview",
          placeholderLabel: "Screen 4",
        },
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-onboarding-before-05-mailing-address.png",
          srcAfter: "/ramp/spend/cardholder-onboarding-after-05-mail-card.png",
          alt: "Before: add mailing address for physical card delivery",
          altAfter:
            "After: mail your Ramp card with live address preview on envelope graphic",
          placeholderLabel: "Screen 5",
        },
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-onboarding-before-07-verify-phone.png",
          srcAfter: "/ramp/spend/cardholder-onboarding-after-07-verify-phone.png",
          alt: "Before: verify phone with SMS option and phone mockup",
          altAfter:
            "After: verify phone number with refined copy and richer SMS thread mockup",
          placeholderLabel: "Screen 6",
        },
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-onboarding-before-08-authenticator.png",
          srcAfter: "/ramp/spend/cardholder-onboarding-after-08-authenticator.png",
          alt: "Before: set up authenticator app step with phone mockup",
          altAfter:
            "After: authenticator setup with laptop dashboard graphic and Okta-style overlay",
          placeholderLabel: "Screen 7",
        },
        {
          aspect: "r16-9",
          src: "/ramp/spend/cardholder-onboarding-before-09-setup-guide.png",
          srcAfter: "/ramp/spend/cardholder-onboarding-after-09-mobile-wallet.png",
          alt: "Before: in-app setup guide checklist and search hint toast",
          altAfter:
            "After: add card to mobile wallet with QR, store links, and phone mockup",
          placeholderLabel: "Screen 8",
        },
      ],
    },
    credits: [
      {
        role: "ENGINEER",
        name: "Kishan",
        linkedInUrl: "https://www.linkedin.com/in/kishansripada/",
      },
      {
        role: "ENGINEER",
        name: "Kayla",
        linkedInUrl: "https://www.linkedin.com/in/kayla-s-lin/",
      },
      {
        role: "PRODUCT OPERATIONS",
        name: "Sherry",
        linkedInUrl: "https://www.linkedin.com/in/sherryywang/",
      },
      {
        role: "DESIGN MANAGER",
        name: "Catherine",
        linkedInUrl: "https://www.linkedin.com/in/bathren/",
      },
      {
        role: "LEAD DESIGNER",
        name: "Logan",
        linkedInUrl: "https://www.linkedin.com/in/loganwillmott/",
      },
    ],
  },
  {
    title: "Unified Wallet Drawer",
    pillSub: "One place to see spend power without opening five tabs.",
    status: "past",
    yearLabel: "2025",
    employment: "Full-time",
    metaYear: "H2 2025",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline: "A lesson in caring ruthlessly about the details",
    onePagerHref: "/ramp/spend/unified-wallet-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/ramp/spend/unified-wallet-hero.png",
      alt: "Unified Wallet Drawer hero",
    },
    outcomeRich: (
      <p>
        Pitched, designed, and led rollout to SuperGA for a project that
        consolidated three separate drawers—Physical Card, Funds, and Switch
        Funds—into one unified <strong>Wallet</strong> drawer with four states.
      </p>
    ),
    metrics: [
      { value: "0", label: "CX TICKETS (ROLLOUT)" },
      { value: "3→1", label: "DRAWERS CONSOLIDATED" },
      { value: "4", label: "WALLET STATES" },
    ],
    stuffBullets: [
      "Cut design and tech debt, improved the mental model for cards and funds, and reduced clicks to complete common actions.",
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
