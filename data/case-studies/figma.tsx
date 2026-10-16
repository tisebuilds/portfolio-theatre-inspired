import {
  secondaryLinkClass,
  type StandardWorkCaseStudyProps,
} from "@/components/StandardWorkCaseStudy";
import { SITE_MEDIA } from "@/lib/site-media";
import { SITE_EMAIL } from "@/lib/site";

const creditsColumns: StandardWorkCaseStudyProps["creditsColumns"] = [
  [
    {
      name: "Soundharya Muthukrishnan",
      role: "Design Manager",
      href: "https://www.linkedin.com/in/soundharya-muthukrishnan/",
    },
    {
      name: "Caro Choi",
      role: "Design Recruiter",
      href: "https://www.linkedin.com/in/carolynnchoi/",
    },
    {
      name: "Ry Reid",
      role: "Design Mentor",
      href: "https://www.linkedin.com/in/imryanreid/",
    },
    {
      name: "Abby Jetmundsen",
      role: "Designer",
      href: "https://www.linkedin.com/in/abbyjetmundsen/",
    },
  ],
  [
    {
      name: "Miah Sanchez",
      role: "Engineer Mentor",
      href: "https://www.linkedin.com/in/miahsanchez/",
    },
    { name: "Tamisha Lubin", role: "Office Manager" },
    {
      name: "Peter Liang",
      role: "Engineer",
      href: "https://www.linkedin.com/in/liang-peter/",
    },
    {
      name: "Cai Charniga",
      role: "Design Ops",
      href: "https://www.linkedin.com/in/ccharniga/",
    },
    {
      name: "Oscar Dumlao",
      role: "Designer",
      href: "https://www.linkedin.com/in/oscardumlao/",
    },
  ],
  [
    {
      name: "Helena Jaramillo",
      role: "Designer",
      href: "https://www.linkedin.com/in/helenajaramillo/",
    },
    {
      name: "Jordan Hsu",
      role: "Designer",
      href: "https://www.linkedin.com/in/jordanhsu/",
    },
    {
      name: "Kylie To",
      role: "Designer",
      href: "https://www.linkedin.com/in/kylie-t/",
    },
    {
      name: "Joel Miller",
      role: "Designer",
      href: "https://www.linkedin.com/in/jmillerli/",
    },
    {
      name: "Daniel Woodling",
      role: "Motion Designer",
      href: "https://www.linkedin.com/in/daniel-woodling-1b44641b/",
    },
  ],
];

export const figmaCaseStudyContent: StandardWorkCaseStudyProps = {
  idPrefix: "figma",
  title: "Figma",
  dateRange: "Summer 2023",
  overviewHeading: "CONTEXT",
  sideProjectsHeading: "SIDE PROJECTS",
  productLabel: "Growth—Monetization",
  productHref: "https://www.figma.com",
  hero: {
    src: SITE_MEDIA.caseStudyHeroes.figmaCaseStudy,
    alt: "Isometric illustration of layered Figma-style editor windows on a mint background.",
    caption: "Growth design intern driving upgrades",
    priority: true,
  },
  overview: (
    <div className="flex flex-col gap-6">
      <p>
        Before Figma, I only knew how to design or &apos;push pixels.&apos;
        With this internship, I learned how to do the job of a Product Designer.
        I crafted experiences to increase Starter to Pro upgrades for Figma
        products on the Growth Team. The Growth team exposed me to onboarding
        patterns, how to encourage upgrades within the UI and practices for
        minimizing churn.
      </p>
      <p>
        My experiences taught me how to manage expectations, incorporate
        feedback and become a self-sufficient designer.{" "}
        <a
          href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
            "Request for Figma internship case study",
          )}`}
          className={`font-semibold ${secondaryLinkClass}`}
        >
          Please contact me for case study.
        </a>
      </p>
    </div>
  ),
  sideProjects: (
    <p>
      I re-designed materials for the Early Career team. I also built a critique
      asset library to improve crit culture.
    </p>
  ),
  learnings: [
    { title: "😈 The Devil is in the Details", content: null },
    { title: "🤡 Communicating Design Blocks", content: null },
    { title: "✨ Riffing is Magical", content: null },
    { title: "💬 Balancing and incorporating feedback", content: null },
  ],
  creditsIntro: "",
  creditsColumns,
};
