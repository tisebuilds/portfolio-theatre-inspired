"use client";

import { StandardWorkCaseStudy } from "@/components/StandardWorkCaseStudy";
import { figmaCaseStudyContent } from "@/data/case-studies/figma";

export function FigmaCaseStudyClient() {
  return <StandardWorkCaseStudy {...figmaCaseStudyContent} />;
}
