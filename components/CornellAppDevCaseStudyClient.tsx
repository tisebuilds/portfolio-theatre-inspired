"use client";

import Image from "next/image";
import { SITE_MEDIA } from "@/lib/site-media";
import { AppDevPhoneMockup } from "@/components/appdev/AppDevPhoneMockup";
import { ExternalLinkIcon, MetaDot } from "@/components/case-study-icons";
import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import type { RampEpisode } from "@/data/case-studies/ramp-types";

const appdevEpisode: RampEpisode = {
  title: "Cornell AppDev",
  pillSub: "",
  status: "past",
  yearLabel: "2020 — 2022",
  metaRowRich: (
    <>
      <span>Designer</span>
      <MetaDot />
      <span>iOS, Android & Web</span>
      <MetaDot />
      <span className="inline-flex items-center gap-[5px]">
        <Image
          src={SITE_MEDIA.toolIcons.figma}
          alt="Figma"
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          sizes="20px"
        />
        <Image
          src={SITE_MEDIA.toolIcons.notion}
          alt="Notion"
          width={20}
          height={20}
          className="h-5 w-5 shrink-0 object-contain"
          sizes="20px"
        />
      </span>
      <MetaDot />
      <a
        href="https://www.cornellappdev.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-white/45 transition-colors hover:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        cornellappdev.com
        <ExternalLinkIcon className="opacity-70" />
      </a>
    </>
  ),
  logline: "",
  hideHeroFrame: true,
  hideStuffChapterHeader: true,
  stuffChapterTightTop: true,
  hero: { aspect: "mobile" },
  stuffRich: (
    <AppDevPhoneMockup
      journalUrl="https://www.flipsnack.com/FFC8EDCC5A8/appdev/full-view.html"
      journalLabel="Journal"
      dpdCourseUrl="https://www.cornellappdev.com/courses/dpd"
      dpdCourseLabel="DPD"
    />
  ),
};

export function CornellAppDevCaseStudyClient() {
  return (
    <RampCinemaCaseStudy episodes={[appdevEpisode]} showPlayer={false} />
  );
}
