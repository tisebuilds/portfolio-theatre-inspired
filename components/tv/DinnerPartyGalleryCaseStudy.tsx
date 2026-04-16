"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import { LearningsFromStandard } from "@/components/LearningsFromStandard";
import { dinnerPartySeatingCaseStudyContent } from "@/data/case-studies/dinner-party-seating-chart";
import type { RampEpisode } from "@/data/case-studies/ramp-types";

const caseStudyFallback = (
  <div
    className="flex h-full min-h-[200px] items-center justify-center bg-black font-mono text-xs uppercase text-tv-muted"
    aria-hidden
  >
    Loading…
  </div>
);

const dinnerPartyEpisode: RampEpisode = {
  title: dinnerPartySeatingCaseStudyContent.title,
  pillSub: "",
  status: "past",
  yearLabel: dinnerPartySeatingCaseStudyContent.dateRange,
  learningsChapterHeading: "STUFF I WORKED ON",
  metaRowRich: dinnerPartySeatingCaseStudyContent.meta,
  logline: dinnerPartySeatingCaseStudyContent.hero.caption,
  hero: {
    aspect: "web",
    src: dinnerPartySeatingCaseStudyContent.hero.src,
    alt: dinnerPartySeatingCaseStudyContent.hero.alt,
  },
  outcomeRich: dinnerPartySeatingCaseStudyContent.overview,
  learningsRich: (
    <LearningsFromStandard
      items={dinnerPartySeatingCaseStudyContent.learnings}
      learningsLayout={dinnerPartySeatingCaseStudyContent.learningsLayout}
    />
  ),
  creditsIntro: dinnerPartySeatingCaseStudyContent.creditsIntro,
  credits: [],
};

type DinnerPartyGalleryCaseStudyProps = {
  channelNumber: number;
};

export function DinnerPartyGalleryCaseStudy({
  channelNumber,
}: DinnerPartyGalleryCaseStudyProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const backToDemo = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("ch", String(channelNumber));
    next.delete("view");
    next.delete("ep");
    router.replace(`/?${next.toString()}`, { scroll: false });
  };

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-black">
      <div className="flex h-[calc(theme(spacing.4)+2.5rem+theme(spacing.4)+1px)] shrink-0 items-center border-b border-white/[0.06] px-3">
        <button
          type="button"
          onClick={backToDemo}
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-tv-pink hover:underline"
        >
          Back to Demo
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        <Suspense fallback={caseStudyFallback}>
          <RampCinemaCaseStudy
            episodes={[dinnerPartyEpisode]}
            keyboardMode="tvShell"
            showPlayer={false}
            layoutMode="embedded"
          />
        </Suspense>
      </div>
    </div>
  );
}
