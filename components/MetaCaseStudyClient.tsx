"use client";

import { LearningsFromStandard } from "@/components/LearningsFromStandard";
import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import type { RampEpisode } from "@/data/case-studies/ramp-types";
import { metaCaseStudyContent } from "@/data/case-studies/meta";
import { standardCreditsColumnsToRampCredits } from "@/lib/case-study-credits";

const metaEpisode: RampEpisode = {
  title: metaCaseStudyContent.title,
  pillSub: "",
  status: "past",
  yearLabel: metaCaseStudyContent.dateRange,
  metaRowRich: metaCaseStudyContent.meta,
  logline: metaCaseStudyContent.hero.caption,
  hero: {
    aspect: "web",
    src: metaCaseStudyContent.hero.src,
    alt: metaCaseStudyContent.hero.alt,
  },
  outcomeRich: metaCaseStudyContent.overview,
  learningsRich: (
    <LearningsFromStandard
      items={metaCaseStudyContent.learnings}
      presentation="bodyCopy"
    />
  ),
  creditsIntro: metaCaseStudyContent.creditsIntro,
  credits: standardCreditsColumnsToRampCredits(
    metaCaseStudyContent.creditsColumns,
  ),
};

export function MetaCaseStudyClient() {
  return <RampCinemaCaseStudy episodes={[metaEpisode]} showPlayer={false} />;
}
