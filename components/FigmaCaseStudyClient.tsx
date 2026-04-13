"use client";

import { LearningsFromStandard } from "@/components/LearningsFromStandard";
import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import type { RampEpisode } from "@/data/case-studies/ramp-types";
import { figmaCaseStudyContent } from "@/data/case-studies/figma";
import { standardCreditsColumnsToRampCredits } from "@/lib/case-study-credits";

const figmaEpisode: RampEpisode = {
  title: figmaCaseStudyContent.title,
  pillSub: "",
  status: "past",
  yearLabel: figmaCaseStudyContent.dateRange,
  metaRowRich: figmaCaseStudyContent.meta,
  logline: figmaCaseStudyContent.hero.caption,
  hero: {
    aspect: "web",
    src: figmaCaseStudyContent.hero.src,
    alt: figmaCaseStudyContent.hero.alt,
  },
  outcomeRich: figmaCaseStudyContent.overview,
  learningsRich: (
    <LearningsFromStandard
      items={figmaCaseStudyContent.learnings}
      presentation="bodyCopy"
    />
  ),
  creditsIntro: figmaCaseStudyContent.creditsIntro,
  credits: standardCreditsColumnsToRampCredits(
    figmaCaseStudyContent.creditsColumns,
  ),
};

export function FigmaCaseStudyClient() {
  return <RampCinemaCaseStudy episodes={[figmaEpisode]} showPlayer={false} />;
}
