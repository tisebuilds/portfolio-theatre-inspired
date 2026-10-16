import { CursorToolIcon } from "@/components/ramp/CursorToolIcon";
import { FigmaToolIcon } from "@/components/ramp/FigmaToolIcon";
import { SlackToolIcon } from "@/components/ramp/SlackToolIcon";
import { VercelToolIcon } from "@/components/ramp/VercelToolIcon";
import type { RampEpisode } from "./ramp-types";

const tools = (
  <>
    <FigmaToolIcon />
    <SlackToolIcon />
    <VercelToolIcon />
    <CursorToolIcon />
  </>
);

export const rampSpendEpisodes: RampEpisode[] = [
  {
    title: "Employee onboarding",
    pillSub: "From invite to first swipe while simplifying setup",
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
    onePagerHref: "/media/ramp/spend/cardholder-creation-one-pager.pdf",
    hero: {
      aspect: "web",
      src: "/media/ramp/spend/cardholder-creation-hero.png",
      alt:
        "Jobs-to-be-done hero: employee at a desk with floating Gmail, Okta, and Slack-style UI around Ramp onboarding",
    },
    outcomeRich: (
      <>
        <p>
          Led redesign of onboarding for Ramp&apos;s largest growing user role.
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
        label: "SUPPORT TICKETS PER USER IN FIRST 30 DAYS",
      },
    ],
    stuffBullets: [
      "Rewrote the invite email for employees.",
      "Updated UI, copy, and assets to match the new design system and language changes for employee onboarding.",
      "Changed order of screens to enhance user education of Ramp product and increase feature engagement.",
    ],
    screenGrid: {
      layout: "phases",
      cells: [
        {
          aspect: "r16-9",
          step: "01",
          caption: "Email invite",
          span: 3,
          src: "/media/ramp/spend/cardholder-creation-invite-email-before.png",
          srcAfter: "/media/ramp/spend/cardholder-creation-invite-email-after.png",
          alt: "Gmail inbox showing the previous employee invite email from Ramp QA",
          altAfter:
            "Gmail inbox showing the redesigned employee invite email: Set up your Ramp account with updated copy and CTA",
          placeholderLabel: "Screen 1",
        },
        {
          aspect: "r16-9",
          step: "02",
          caption: "Create account",
          span: 3,
          src: "/media/ramp/spend/cardholder-onboarding-before-02-create-account.png",
          srcAfter: "/media/ramp/spend/cardholder-onboarding-after-02-create-account.png",
          alt: "Before: employee account creation with Google sign-in, testimonial card, and legal footer",
          altAfter:
            "After: streamlined invite copy, Continue with Google, and co-branded card visual",
          placeholderLabel: "Screen 2",
        },
        {
          aspect: "r16-9",
          step: "03",
          caption: "Card details",
          span: 6,
          src: "/media/ramp/spend/cardholder-onboarding-before-03-welcome.png",
          srcAfter: "/media/ramp/spend/cardholder-onboarding-after-03-spend-overview.png",
          alt: "Before: welcome step with numbered tips and lifestyle imagery",
          altAfter:
            "After: spend overview with stipends, virtual cards, and Ramp card mockup",
          placeholderLabel: "Screen 3",
        },
        {
          aspect: "r16-9",
          step: "04",
          caption: "Sign policy",
          span: 3,
          src: "/media/ramp/spend/cardholder-onboarding-before-04-expense-policy.png",
          srcAfter: "/media/ramp/spend/cardholder-onboarding-after-04-expense-policy.png",
          alt: "Before: read and sign company expense policy with document viewer",
          altAfter:
            "After: review and sign with legal name field and inline policy preview",
          placeholderLabel: "Screen 4",
        },
        {
          aspect: "r16-9",
          step: "05",
          caption: "Mail card",
          span: 3,
          src: "/media/ramp/spend/cardholder-onboarding-before-05-mailing-address.png",
          srcAfter: "/media/ramp/spend/cardholder-onboarding-after-05-mail-card.png",
          alt: "Before: add mailing address for physical card delivery",
          altAfter:
            "After: mail your Ramp card with live address preview on envelope graphic",
          placeholderLabel: "Screen 5",
        },
        {
          aspect: "r16-9",
          step: "06",
          caption: "Verify phone",
          span: 2,
          src: "/media/ramp/spend/cardholder-onboarding-before-07-verify-phone.png",
          srcAfter: "/media/ramp/spend/cardholder-onboarding-after-07-verify-phone.png",
          alt: "Before: verify phone with SMS option and phone mockup",
          altAfter:
            "After: verify phone number with refined copy and richer SMS thread mockup",
          placeholderLabel: "Screen 6",
        },
        {
          aspect: "r16-9",
          step: "07",
          caption: "Authenticator",
          span: 2,
          src: "/media/ramp/spend/cardholder-onboarding-before-08-authenticator.png",
          srcAfter: "/media/ramp/spend/cardholder-onboarding-after-08-authenticator.png",
          alt: "Before: set up authenticator app step with phone mockup",
          altAfter:
            "After: authenticator setup with laptop dashboard graphic and Okta-style overlay",
          placeholderLabel: "Screen 7",
        },
        {
          aspect: "r16-9",
          step: "08",
          caption: "Add to wallet",
          span: 2,
          src: "/media/ramp/spend/cardholder-onboarding-before-09-setup-guide.png",
          srcAfter: "/media/ramp/spend/cardholder-onboarding-after-09-mobile-wallet.png",
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
    title: "Wallet drawer",
    pillSub:
      "One place to see how you can spend without opening three drawers",
    status: "past",
    yearLabel: "2025",
    employment: "Full-time",
    metaYear: "H2 2025",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline: "A lesson in caring ruthlessly about the details",
    onePagerHref: "/media/ramp/spend/unified-wallet-one-pager.pdf",
    hideLearnings: true,
    hero: {
      aspect: "web",
      media: "video",
      src: "/media/ramp/spend/wallet-drawer-demo.mp4",
      alt: "Wallet Drawer demo: unified wallet drawer interaction",
      enlarged: true,
    },
    outcomeRich: (
      <p>
        Pitched, designed, and led rollout to SuperGA for a re-design that had
        zero customer disruption or negative feedback (zero tickets from CX)
        on a high traffic surface.
      </p>
    ),
    stuffBullets: [
      "Reduced design debt with visual design, fewer states, and more consistent interactions",
      "Reduced tech debt via consolidation and refactor of repetitive content",
      "Improved mental model for how cards and funds relate within Ramp",
      "Decreased clicks for common actions (e.g., linking funds, termination)",
    ],
    screenGrid: {
      layout: "tabs",
      cells: [
        {
          aspect: "intrinsic",
          src: "/media/ramp/spend/unified-wallet-before-primary.png",
          alt:
            "My funds drawer (before): virtual card with show details, lock, and replace; search and fund list with progress bars",
          srcAfter: "/media/ramp/spend/unified-wallet-after-primary.png",
          altAfter:
            "Unified Wallet drawer on the Funds tab (after): grouped limits, virtual cards, and reimbursement-only funds",
          placeholderLabel: "WEB — Primary view",
          caption: "My funds",
        },
        {
          aspect: "intrinsic",
          src: "/media/ramp/spend/unified-wallet-before-web-detail.png",
          alt:
            "My Ramp Card Overview (before): card details, Spending from with Switch, and Other available funds list",
          srcAfter: "/media/ramp/spend/unified-wallet-after-web-detail.png",
          altAfter:
            "My wallet Ramp Card tab (after): card actions, expanded Design tooling fund with progress, and transactions",
          placeholderLabel: "Web detail",
          caption: "My Ramp Card",
        },
        {
          aspect: "intrinsic",
          src: "/media/ramp/spend/unified-wallet-before-mobile.png",
          alt:
            "Wallet drawer on mobile web (before): My Ramp Card overview with card details, auto-match funds callout, and funds on this card",
          srcAfter: "/media/ramp/spend/unified-wallet-after-mobile.png",
          altAfter:
            "Wallet drawer on mobile web (after): unified layout, Ramp Card, auto-matching, and empty transactions state",
          placeholderLabel: "Mobile web",
          caption: "Auto-match funds",
        },
        {
          aspect: "intrinsic",
          src: "/media/ramp/spend/unified-wallet-before-screen-detail.png",
          alt:
            "Switch funds: auto-match funds unselected, manual fund selected (Vercel V0), and disabled save",
          srcAfter: "/media/ramp/spend/unified-wallet-after-screen-detail.png",
          altAfter:
            "My wallet Ramp Card: Auto-matching expanded with auto-match funds selected, manual fund options, and save changes",
          placeholderLabel: "Screen detail",
          caption: "Switching funds",
        },
      ],
    },
    learnings: [
      "Drawers work when they answer one primary question and defer the rest gracefully.",
      "Density is not the enemy; ambiguity is.",
      "Animation should communicate spatial continuity, not decoration.",
    ],
    credits: [
      {
        role: "ENGINEER",
        name: "Kiran Kunigiri",
        linkedInUrl: "https://www.linkedin.com/in/kirankunigiri/",
      },
      {
        role: "PRODUCT OPERATIONS",
        name: "Sherry",
        linkedInUrl: "https://www.linkedin.com/in/sherryywang/",
      },
      {
        role: "DESIGN SYSTEMS & ENGINEER",
        name: "Caroline",
        linkedInUrl: "https://www.linkedin.com/in/curiouschaos/",
      },
      {
        role: "ENGINEER",
        name: "Jerry",
        linkedInUrl: "https://www.linkedin.com/in/jerrytsui/",
      },
      {
        role: "DESIGN MANAGER",
        name: "Jason Li",
        linkedInUrl: "https://www.linkedin.com/in/jasonzli/",
      },
      {
        role: "LEAD DESIGNER",
        name: "Catherine Wang",
        linkedInUrl: "https://www.linkedin.com/in/bathren/",
      },
      {
        role: "DESIGNER",
        name: "Ariya Zheng",
        linkedInUrl: "https://www.linkedin.com/in/ariyazheng/",
      },
    ],
  },
  {
    title: "Akuma Improvements",
    pillSub: "2025 Ramp Hacks project",
    status: "past",
    yearLabel: "1 week",
    titleTimingBadge: "2025",
    employment: "Full-time",
    metaYear: "2025 • 1 week",
    tools,
    externalHref: "https://ramp.com",
    externalLabel: "ramp.com",
    logline: "A lesson in you can just build things",
    onePagerHref: "/media/ramp/spend/akuma-updates-one-pager.pdf",
    hero: {
      aspect: "web",
      alt:
        "Akuma tooling: visual search, email preview, analytics, and in-line editing",
      media: "video",
      enlarged: true,
      videoVariants: [
        {
          label: "Visual search",
          src: "/media/ramp/spend/akuma-updates-video-primary.mp4",
        },
        {
          label: "Preview",
          src: "/media/ramp/spend/akuma-updates-video-web-detail.mp4",
        },
        {
          label: "Analytics",
          src: "/media/ramp/spend/akuma-updates-video-mobile.mp4",
        },
        {
          label: "In-line editing",
          src: "/media/ramp/spend/akuma-updates-video-screen-detail.mp4",
        },
      ],
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
    credits: [
      {
        role: "ENGINEER",
        name: "Gab Miranda",
        linkedInUrl: "https://www.linkedin.com/in/gabriel-miranda/",
      },
    ],
  },
];
