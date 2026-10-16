import {
  secondaryLinkClass,
  type StandardWorkCaseStudyProps,
} from "@/components/StandardWorkCaseStudy";
import { SITE_MEDIA } from "@/lib/site-media";
import { SITE_EMAIL } from "@/lib/site";

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

const DISNEY_PRODUCT_HREF = "https://jobs.disneycareers.com/our-work";

export const disneyCaseStudyContent: StandardWorkCaseStudyProps = {
  idPrefix: "disney",
  title: "Disney Media and Entertainment Distribution Technology",
  dateRange: "Summer 2021",
  overviewHeading: "CONTEXT",
  productLabel: "Streaming",
  productHref: DISNEY_PRODUCT_HREF,
  hero: {
    src: SITE_MEDIA.caseStudyHeroes.disneyStreamingCrossPlatform,
    alt: "Living room scene with a wall-mounted TV showing a streaming home screen and a smartphone in the foreground open to a companion Greenroom tab with participants and chat actions.",
    caption: "UX design intern bringing people together",
    priority: true,
  },
  overview: (
    <p>
      I designed a paired OTT and mobile user experience to enhance virtual
      co-viewing for the streaming fleet. I also participated in a user
      research audience project about Disney guests.{" "}
      <a
        href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent(
          "Request for Disney internship case study",
        )}`}
        className={`font-semibold ${secondaryLinkClass}`}
      >
        Please contact me for case study.
      </a>
    </p>
  ),
  learnings: [
    {
      title: <strong className="font-semibold">Visual Design</strong>,
      content:
        "My project was end to end, prioritizing the core experience for both sport and entertainment platforms. However, I wished I did more visual design ranging from final polishes, animated emoticons and even fullscreen reactions.",
    },
    {
      title: <strong className="font-semibold">Proactivity</strong>,
      content:
        "Looking back, I wish I reached out to more interns, spoke up more in critique, asked for more projects and learned motion design from Anibal.",
    },
    {
      title: <strong className="font-semibold">Visual Storytelling</strong>,
      content:
        "Initially, I struggled with controlling the conversation when I started presenting during my internship. Regardless of whether I use a deck, I improved focus and pacing for presentations.",
    },
    {
      title: (
        <strong className="font-semibold">Coffee Chats {">>>"}</strong>
      ),
      content:
        "Week 1, I set a goal for 100 coffee chats. It's Week 12 and I only finished 58 unique coffee chats. But, I'm happy I didn't meet my goal because I coffee chatted some amazing people multiple times.",
    },
  ],
  creditsIntro: "",
  creditsColumns,
};
