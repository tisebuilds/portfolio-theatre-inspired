import type { StandardWorkCaseStudyProps } from "@/components/StandardWorkCaseStudy";
import workData from "@/data/work.json";
import type { WorkExperience } from "@/app/types";
import { caseStudyType } from "@/components/case-study-typography";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";

const experiences = workData as WorkExperience[];
const figmaExp = experiences.find((e) => e.slug === "figma");
if (!figmaExp?.poster) {
  throw new Error("Figma work entry needs a poster image path.");
}

const creditsColumns: StandardWorkCaseStudyProps["creditsColumns"] = [
  [
    { name: "Soundharya Muthukrishnan" },
    { name: "Caro Choi" },
    { name: "Ry Reid" },
    { name: "Abby Jetmundsen" },
  ],
  [
    { name: "Miah Sanchez" },
    { name: "Tamisha Lubin" },
    { name: "Peter Liang" },
    { name: "Cai Charniga" },
    { name: "Oscar Dumlao" },
  ],
  [
    { name: "Helena Jaramillo" },
    { name: "Jordan Hsu" },
    { name: "Kylie To" },
    { name: "Joel Miller" },
    { name: "Daniel Woodling" },
  ],
];

export const figmaCaseStudyContent: StandardWorkCaseStudyProps = {
  idPrefix: "figma",
  title: figmaExp.title,
  dateRange: figmaExp.dateRange,
  meta: (
    <>
      <span>Growth design intern</span>
      <MetaDot />
      <span>Driving upgrades for Figma products</span>
      <MetaDot />
      <a
        href="https://www.figma.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-inherit transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        Figma
        <ExternalLinkIcon className="opacity-70" />
      </a>
    </>
  ),
  hero: {
    src: figmaExp.poster,
    alt: "Figma internship — hero visual from work poster.",
    caption: "Driving upgrades for Figma products",
    priority: true,
  },
  overview: (
    <div className="flex flex-col gap-6">
      <p className={caseStudyType.bodySecondary}>
        <span className="font-semibold text-neutral-200">Role:</span> Product
        Design Intern, Growth-Monetization.{" "}
        <span className="font-semibold text-neutral-200">Team:</span> 1 Design
        Mentor, 8 Product Designers, 1 Software Engineer, 1 Product Manager, 1
        UX Writer.{" "}
        <span className="font-semibold text-neutral-200">Timeline:</span> June
        to Sep 2023 (16 weeks).{" "}
        <span className="font-semibold text-neutral-200">Tools:</span> Figma,
        FigJam, Dropbox Paper, Slack, Loom.{" "}
        <span className="font-semibold text-neutral-200">Skills:</span> Visual
        Design, Interaction Design, Copy writing, Strategy, Experimentation,
        Animation, Storytelling.
      </p>
      <p>
        Before Figma, I only knew how to design or &apos;push pixels.&apos;
        With this internship, I learned how to do the job of a Product Designer.
        I crafted experiences to increase Starter to Pro upgrades for Figma
        products on the Growth Team. The Growth team exposed me to onboarding
        patterns, how to encourage upgrades within the UI and practices for
        minimizing churn.
      </p>
      <p>
        For my side projects, I re-designed materials for the Early Career team.
        I also built a critique asset library to improve crit culture.
      </p>
      <p>
        My experiences taught me how to manage expectations, incorporate
        feedback and become a self-sufficient designer.{" "}
        <strong className="font-semibold">
          Please contact me for case study.
        </strong>
      </p>
    </div>
  ),
  learnings: [
    { title: "👹 The Devil is in the Details", content: null },
    { title: "🤡 Communicating Design Blocks", content: null },
    { title: "✨ Riffing is Magical", content: null },
    { title: "💬 Balancing and incorporating feedback", content: null },
  ],
  creditsIntro:
    "Thank you to these amazing people supporting me during my internship!",
  creditsColumns,
};
