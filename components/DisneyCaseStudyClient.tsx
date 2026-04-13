"use client";

import Image from "next/image";
import { CaseStudyPageShell } from "@/components/CaseStudyPageShell";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex w-full items-center gap-4">
      <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-xs">
        {children}
      </p>
      <div
        className="h-px min-w-0 flex-1 bg-white/[0.08]"
        aria-hidden
      />
    </div>
  );
}

type CreditEntry = {
  name: string;
  /** e.g. Engineering, Data, Product — replace `[Role]` when known. */
  role: string;
  href?: string;
};

/** Column groupings for layout only (names per portfolio spread). Add `href` when ready. */
const creditsColumns: CreditEntry[][] = [
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

function CreditNameLine({ name, href }: { name: string; href?: string }) {
  const baseClass =
    "inline-flex items-baseline gap-1.5 text-sm font-normal text-white transition-colors";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group ${baseClass} no-underline underline-offset-[0.35em] decoration-white/70 hover:underline hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:underline focus-visible:decoration-white focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black`}
      >
        {name}
        <ExternalLinkIcon
          className="shrink-0 translate-y-px text-white/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden
        />
      </a>
    );
  }

  return (
    <span className={`${baseClass} no-underline`}>
      {name}
    </span>
  );
}

export function DisneyCaseStudyClient() {
  return (
    <CaseStudyPageShell
      title="Disney Media and Entertainment Distribution Technology"
      dateRange="Summer 2021"
      meta={
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
            className="inline-flex items-center gap-1 text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Disney Media Distribution
            <ExternalLinkIcon className="opacity-70" />
          </a>
        </>
      }
    >
      <div className="flex w-full max-w-4xl flex-col items-stretch gap-11 sm:gap-14 sm:px-0">
        <div className="flex w-full justify-center">
          <figure className="relative m-0 mx-auto w-full max-w-3xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-white/[0.08] bg-black">
              <Image
                src="/images/disney-streaming-cross-platform-hero.png"
                alt="Minimal illustration of a phone and TV, representing streaming across mobile and living-room screens."
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
            <figcaption className="mt-3 max-w-2xl px-1 text-center font-serif text-sm font-normal italic leading-snug tracking-normal text-white/55 sm:mx-auto sm:text-[15px] sm:leading-relaxed">
              UX design intern bringing people together through Disney streaming
            </figcaption>
          </figure>
        </div>

        <section aria-labelledby="disney-overview-heading">
          <SectionLabel>Overview</SectionLabel>
          <h3 id="disney-overview-heading" className="sr-only">
            Overview
          </h3>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-neutral-200 sm:text-base sm:leading-relaxed">
            I designed a paired OTT and mobile user experience to enhance
            virtual co-viewing for the streaming fleet. I also participated in
            a user research audience project about Disney guests.{" "}
            <strong className="font-semibold text-white">
              Please contact me for case study.
            </strong>
          </p>
        </section>

        <section aria-labelledby="disney-learnings-heading">
          <SectionLabel>Learnings</SectionLabel>
          <h3 id="disney-learnings-heading" className="sr-only">
            Learnings
          </h3>
          <dl className="mt-6 space-y-8 sm:space-y-9">
            <div className="grid gap-2">
              <dt className="text-sm font-semibold text-white">
                Visual Design
              </dt>
              <dd className="text-sm leading-relaxed text-white/70">
                My project was end to end, prioritizing the core experience for
                both sport and entertainment platforms. However, I wished I did
                more visual design ranging from final polishes, animated
                emoticons and even fullscreen reactions.
              </dd>
            </div>
            <div className="grid gap-2">
              <dt className="text-sm font-semibold text-white">
                Proactivity
              </dt>
              <dd className="text-sm leading-relaxed text-white/70">
                Looking back, I wish I reached out to more interns, spoke up more
                in critique, asked for more projects and learned motion design
                from Anibal.
              </dd>
            </div>
            <div className="grid gap-2">
              <dt className="text-sm font-semibold text-white">
                Visual Storytelling
              </dt>
              <dd className="text-sm leading-relaxed text-white/70">
                Initially, I struggled with controlling the conversation when I
                started presenting during my internship. Regardless of whether I
                use a deck, I improved focus and pacing for presentations.
              </dd>
            </div>
            <div className="grid gap-2">
              <dt className="text-sm font-semibold text-white">
                Coffee Chats &gt;&gt;&gt;
              </dt>
              <dd className="text-sm leading-relaxed text-white/70">
                Week 1, I set a goal for 100 coffee chats. It&apos;s Week 12 and
                I only finished 58 unique coffee chats. But, I&apos;m happy I
                didn&apos;t meet my goal because I coffee chatted some amazing
                people multiple times. I&apos;m especially grateful for recurring
                chats with my design manager,{" "}
                <a
                  href="https://www.linkedin.com/in/chris-rinker/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 underline decoration-white/25 underline-offset-[0.2em] transition-colors hover:text-white hover:decoration-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Chris Rinker
                </a>
                , and my design mentor,{" "}
                <a
                  href="https://www.linkedin.com/in/samantha-chang-15965174/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/85 underline decoration-white/25 underline-offset-[0.2em] transition-colors hover:text-white hover:decoration-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  Samantha Chang
                </a>
                .
              </dd>
            </div>
          </dl>
        </section>

        <section aria-labelledby="disney-credits-heading">
          <SectionLabel>Credits</SectionLabel>
          <h3 id="disney-credits-heading" className="sr-only">
            Credits
          </h3>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-[15px]">
            Thank you to the amazing creators for showing me how Disney makes
            magic and adding delight to design…
          </p>
          <div className="mt-7 grid grid-cols-1 gap-x-8 gap-y-9 sm:mt-8 sm:grid-cols-2 md:grid-cols-3 md:gap-y-11">
            {creditsColumns.map((col, i) => (
              <ul
                key={i}
                className="m-0 flex min-w-0 list-none flex-col gap-4 p-0"
              >
                {col.map((entry) => (
                  <li key={entry.name} className="flex flex-col gap-1.5">
                    {entry.role !== "[Role]" ? (
                      <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[11px]">
                        {entry.role}
                      </p>
                    ) : null}
                    <CreditNameLine name={entry.name} href={entry.href} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </div>
    </CaseStudyPageShell>
  );
}
