"use client";

import { RampCinemaCaseStudy } from "@/components/ramp/RampCinemaCaseStudy";
import { rampTreasuryEpisodes } from "@/data/case-studies/ramp-treasury";

export function RampTreasuryCaseStudyClient() {
  return (
    <RampCinemaCaseStudy episodes={rampTreasuryEpisodes} />
  );
}
