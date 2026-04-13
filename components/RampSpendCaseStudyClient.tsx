"use client";

import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import { rampSpendEpisodes } from "@/data/case-studies/ramp-spend";

export function RampSpendCaseStudyClient() {
  return (
    <RampCinemaCaseStudy episodes={rampSpendEpisodes} />
  );
}
