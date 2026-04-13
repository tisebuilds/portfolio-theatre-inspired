import Image from "next/image";
import type { StandardWorkCaseStudyProps } from "@/components/StandardWorkCaseStudy";
import { secondaryLinkClass } from "@/components/StandardWorkCaseStudy";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";

const creditsColumns: StandardWorkCaseStudyProps["creditsColumns"] = [
  [
    {
      name: "Chris Rinker",
      role: "Design Manager",
      href: "https://www.linkedin.com/in/chris-rinker/",
    },
    {
      name: "Samantha Chang",
      role: "Design Mentor",
      href: "https://www.linkedin.com/in/samantha-chang-15965174/",
    },
    {
      name: "Mitch Johnson",
      role: "Designer",
      href: "https://www.linkedin.com/in/mitchell-johnson-60187622/",
    },
    {
      name: "Adam Grandy",
      role: "Product Manager",
      href: "https://www.linkedin.com/in/adamgrandy/",
    },
    {
      name: "Jamie Vanderwall",
      role: "Designer",
      href: "https://www.linkedin.com/in/jamievanderwall/",
    },
    {
      name: "Melissa Rawlins",
      role: "Communications Specialist",
      href: "https://www.linkedin.com/in/melissa-rawlins/",
    },
  ],
  [
    {
      name: "John Solaro",
      role: "VP of Design",
      href: "https://www.linkedin.com/in/johnsolaro/",
    },
    {
      name: "Anibal Koliren",
      role: "Motion designer",
      href: "https://www.linkedin.com/in/anibal-koliren/",
    },
    { name: "Kahu Foster", role: "Design Systems" },
    {
      name: "Jason White",
      role: "UX engineer",
      href: "https://www.linkedin.com/in/jaydoubleyoo/",
    },
    {
      name: "Michael Rawlins",
      role: "Head of Enterprise Design",
      href: "https://www.linkedin.com/in/rawlins/",
    },
    {
      name: "Ximena Jaramillo",
      role: "Designer",
      href: "https://www.linkedin.com/in/ximenajaramillo/",
    },
  ],
  [
    {
      name: "Gadi",
      role: "Executive Director, Concept Development",
      href: "https://www.linkedin.com/in/gadirouache/",
    },
    {
      name: "Angie Hennessy",
      role: "UX Researcher",
      href: "https://www.linkedin.com/in/angie-hennessy/",
    },
    {
      name: "Michelle Phillips",
      role: "UX Researcher",
      href: "https://www.linkedin.com/in/michellephil/",
    },
    {
      name: "Deia Green",
      role: "Designer",
      href: "https://www.linkedin.com/in/deiacgreen/",
    },
    { name: "Jeremy J. Marusek", role: "Designer" },
    {
      name: "Tagu Kato",
      role: "VP of Design",
      href: "https://www.linkedin.com/in/tagukato/",
    },
  ],
];

export const disneyCaseStudyContent: StandardWorkCaseStudyProps = {
  idPrefix: "disney",
  title: "Disney Media and Entertainment Distribution Technology",
  dateRange: "Summer 2021",
  meta: (
    <>
      <span>Undergrad UX Intern, Streaming fleet</span>
      <MetaDot />
      <span>OTT &amp; mobile</span>
      <MetaDot />
      <span
        className="inline-flex items-center gap-1"
        role="img"
        aria-label="Figma, FigJam, Notion, Slack, Keynote"
      >
        <Image
          src="/images/figma-app-icon.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          sizes="20px"
        />
        <Image
          src="/images/figjam-app-icon.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          sizes="20px"
        />
        <Image
          src="/images/notion-app-icon.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          sizes="20px"
        />
        <Image
          src="/images/slack-app-icon.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          sizes="20px"
        />
        <Image
          src="/images/keynote-app-icon.png"
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          sizes="20px"
        />
      </span>
      <MetaDot />
      <a
        href="https://jobs.disneycareers.com/our-work"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-inherit transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        Disney Media Distribution
        <ExternalLinkIcon className="opacity-70" />
      </a>
    </>
  ),
  hero: {
    src: "/images/disney-streaming-cross-platform-hero.png",
    alt: "Minimal illustration of a phone and TV, representing streaming across mobile and living-room screens.",
    caption:
      "UX design intern bringing people together through Disney streaming",
    priority: true,
  },
  learningsLayout: "stacked",
  overview: (
    <p>
      I designed a paired OTT and mobile user experience to enhance virtual
      co-viewing for the streaming fleet. I also participated in a user
      research audience project about Disney guests.{" "}
      <strong className="font-semibold">
        Please contact me for case study.
      </strong>
    </p>
  ),
  learnings: [
    {
      title: "Visual Design",
      content:
        "My project was end to end, prioritizing the core experience for both sport and entertainment platforms. However, I wished I did more visual design ranging from final polishes, animated emoticons and even fullscreen reactions.",
    },
    {
      title: "Proactivity",
      content:
        "Looking back, I wish I reached out to more interns, spoke up more in critique, asked for more projects and learned motion design from Anibal.",
    },
    {
      title: "Visual Storytelling",
      content:
        "Initially, I struggled with controlling the conversation when I started presenting during my internship. Regardless of whether I use a deck, I improved focus and pacing for presentations.",
    },
    {
      title: "Coffee Chats >>>",
      content: (
        <>
          Week 1, I set a goal for 100 coffee chats. It&apos;s Week 12 and I
          only finished 58 unique coffee chats. But, I&apos;m happy I
          didn&apos;t meet my goal because I coffee chatted some amazing people
          multiple times. I&apos;m especially grateful for recurring chats
          with my design manager,{" "}
          <a
            href="https://www.linkedin.com/in/chris-rinker/"
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryLinkClass}
          >
            Chris Rinker
          </a>
          , and my design mentor,{" "}
          <a
            href="https://www.linkedin.com/in/samantha-chang-15965174/"
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryLinkClass}
          >
            Samantha Chang
          </a>
          .
        </>
      ),
    },
  ],
  creditsIntro:
    "Thank you to the amazing creators for showing me how Disney makes magic and adding delight to design…",
  creditsColumns,
};
