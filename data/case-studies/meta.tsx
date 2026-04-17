import {
  secondaryLinkClass,
  type StandardWorkCaseStudyProps,
} from "@/components/StandardWorkCaseStudy";
import { SITE_MEDIA } from "@/lib/site-media";
import { SITE_EMAIL } from "@/lib/site";
import workData from "@/data/work.json";
import type { WorkExperience } from "@/app/types";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";
import { CaseStudyToolLogoStrip } from "@/components/case-study-tool-logos";

const experiences = workData as WorkExperience[];
const metaExp = experiences.find((e) => e.slug === "meta");
if (!metaExp?.poster) {
  throw new Error("Meta work entry needs a poster image path.");
}

const creditsColumns: StandardWorkCaseStudyProps["creditsColumns"] = [
  [
    {
      name: "Wilson",
      role: "Design Manager",
      href: "https://www.linkedin.com/in/xiaohangwilsonzhang/",
    },
    {
      name: "Christina",
      role: "Design Mentor",
      href: "https://www.linkedin.com/in/christina-weng/",
    },
    {
      name: "Sam",
      role: "Designer",
      href: "https://www.linkedin.com/in/sdmurray93/",
    },
    {
      name: "Kolbe",
      role: "Engineer Mentor",
      href: "https://www.linkedin.com/in/kolbebowring/",
    },
    { name: "Rebecca", role: "Content Designer" },
    {
      name: "Elizabeth",
      role: "Design Team Manager",
      href: "https://www.linkedin.com/in/melizabethclarke/",
    },
  ],
  [
    {
      name: "Christabel",
      role: "Designer",
      href: "https://www.linkedin.com/in/christabel-agbugba/",
    },
    {
      name: "Anthony",
      role: "Designer",
      href: "https://www.linkedin.com/in/anthonygrant/",
    },
    {
      name: "Stephanie",
      role: "Designer",
      href: "https://www.linkedin.com/in/stephanie-freund/",
    },
    {
      name: "Clara",
      role: "Designer",
      href: "https://www.linkedin.com/in/clarahjnam/",
    },
    {
      name: "Shannon",
      role: "Designer",
      href: "https://www.linkedin.com/in/shannoncarmody/",
    },
    {
      name: "Maxine",
      role: "Designer",
      href: "https://www.linkedin.com/in/maxinekho/",
    },
  ],
  [
    {
      name: "Femi",
      role: "Designer",
      href: "https://www.linkedin.com/in/babafemi-badero-007bba170/",
    },
    {
      name: "Kristy",
      role: "Designer",
      href: "https://www.linkedin.com/in/kristyokada/",
    },
    {
      name: "Jesse",
      role: "Designer",
      href: "https://www.linkedin.com/in/jesseprague/",
    },
    {
      name: "Samantha",
      role: "Designer",
      href: "https://www.linkedin.com/in/samantha-chang-15965174/",
    },
    {
      name: "Gerardo",
      role: "Designer",
      href: "https://www.linkedin.com/in/gmcreative/",
    },
    {
      name: "Sacha",
      role: "Designer",
      href: "https://www.linkedin.com/in/sacha-hurley-2bb75947/",
    },
  ],
];

export const metaCaseStudyContent: StandardWorkCaseStudyProps = {
  idPrefix: "meta",
  title: metaExp.title,
  dateRange: metaExp.dateRange,
  meta: (
    <>
      <span>Product Design Intern, Flex Platform</span>
      <MetaDot />
      <span>Web</span>
      <MetaDot />
      <CaseStudyToolLogoStrip />
      <MetaDot />
      <a
        href="https://www.facebook.com/business/tools/ads-manager?content_id=fi8QbwKUHA4M85r&ref=sem_smb&utm_term=meta%20ads%20manager&gclid=CjwKCAjwhe3OBhABEiwA6392zJUmY1gdPqGAt9UTFzkVEMscUHDervvuFgVTkJnl4_PnLTa0kRwqXBoCrgEQAvD_BwE&gad_source=1&gad_campaignid=21440510836&gbraid=0AAAAACr-yC89V710_PsOee_AmVxRz-h6-"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-inherit transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        Meta Ads Manager
        <ExternalLinkIcon className="opacity-70" />
      </a>
    </>
  ),
  hero: {
    src: SITE_MEDIA.caseStudyHeroes.metaInternship,
    alt: "Meta internship — hero visual from work poster.",
    caption:
      "Product design intern streamlining workflows for Ads Manager",
    priority: true,
  },
  overview: (
    <div className="flex flex-col gap-6">
      <p>
        At Meta, I learned how to rapidly prototype for a large established
        product and design. I enabled Ads Manager users to better monitor
        campaign performance by updating existing features on the FLEX Team.
      </p>
      <p>
        For side projects, I also built Critique and Low-Fidelity Templates for
        the AXP Design Team. I submitted logos for the AXP context and organized
        weekly intern lunches for my office. My team won Design After School:
        Intern Edition for strong craft and polish.{" "}
        <a
          href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
            "Request for Meta internship case study",
          )}`}
          className={`font-semibold ${secondaryLinkClass}`}
        >
          Please contact me for case study.
        </a>
      </p>
    </div>
  ),
  learnings: [
    {
      title: "1.",
      content: "I learned to define before I design",
    },
    {
      title: "2.",
      content: "I grew in how to apply product thinking",
    },
    {
      title: "3.",
      content: "I grew in adding craft and polish",
    },
    {
      title: "4.",
      content: "I got the chance to work cross-functionally across teams",
    },
  ],
  creditsIntro: "",
  creditsColumns,
};
