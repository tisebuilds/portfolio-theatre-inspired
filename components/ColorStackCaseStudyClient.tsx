"use client";

import Image from "next/image";
import { SITE_MEDIA } from "@/lib/site-media";
import { ColorStackShowcase } from "@/components/colorstack/ColorStackShowcase";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";
import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import type { RampEpisode } from "@/data/case-studies/ramp-types";

const colorstackEpisode: RampEpisode = {
  title: "ColorStack",
  pillSub: "",
  status: "past",
  yearLabel: "2020 — 2021",
  metaRowRich: (
    <>
      <span>Contract Graphic Designer</span>
      <MetaDot />
      <span>Social Media</span>
      <MetaDot />
      <span className="inline-flex items-center gap-1.5">
        <Image
          src={SITE_MEDIA.toolIcons.figma}
          alt="Figma"
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          sizes="20px"
        />
        <Image
          src={SITE_MEDIA.toolIcons.keynote}
          alt="Keynote"
          width={16}
          height={16}
          className="h-4 w-4 shrink-0 object-contain"
          sizes="16px"
        />
      </span>
      <MetaDot />
      <a
        href="https://www.colorstack.org/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        colorstack.org
        <ExternalLinkIcon className="opacity-70" />
      </a>
    </>
  ),
  logline: "",
  hideHeroFrame: true,
  hideStuffChapterHeader: true,
  stuffChapterTightTop: true,
  hero: { aspect: "mobile" },
  stuffRich: <ColorStackShowcase />,
};

export function ColorStackCaseStudyClient() {
  return (
    <RampCinemaCaseStudy episodes={[colorstackEpisode]} showPlayer={false} />
  );
}
