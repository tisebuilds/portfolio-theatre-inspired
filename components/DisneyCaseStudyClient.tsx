"use client";

import { LearningsFromStandard } from "@/components/LearningsFromStandard";
import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import { disneyCaseStudyContent } from "@/data/case-studies/disney";
import type { RampEpisode } from "@/data/case-studies/ramp-types";
import { standardCreditsColumnsToRampCredits } from "@/lib/case-study-credits";

const disneyEpisode: RampEpisode = {
  title: disneyCaseStudyContent.title,
  pillSub: "",
  status: "past",
  yearLabel: disneyCaseStudyContent.dateRange,
  metaRowRich: disneyCaseStudyContent.meta,
  logline: disneyCaseStudyContent.hero.caption,
  hero: {
    aspect: "web",
    src: disneyCaseStudyContent.hero.src,
    alt: disneyCaseStudyContent.hero.alt,
  },
  outcomeRich: disneyCaseStudyContent.overview,
  learningsRich: (
    <LearningsFromStandard
      items={disneyCaseStudyContent.learnings}
      learningsLayout={disneyCaseStudyContent.learningsLayout}
    />
  ),
  creditsIntro: disneyCaseStudyContent.creditsIntro,
  credits: standardCreditsColumnsToRampCredits(
    disneyCaseStudyContent.creditsColumns,
  ),
};

export function DisneyCaseStudyClient() {
  return (
    <RampCinemaCaseStudy episodes={[disneyEpisode]} showPlayer={false} />
  );
}
