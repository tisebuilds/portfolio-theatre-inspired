"use client";

import { StandardWorkCaseStudy } from "@/components/StandardWorkCaseStudy";
import { metaCaseStudyContent } from "@/data/case-studies/meta";

export function MetaCaseStudyClient() {
  return <StandardWorkCaseStudy {...metaCaseStudyContent} />;
}
