"use client";

import { StandardWorkCaseStudy } from "@/components/StandardWorkCaseStudy";
import { disneyCaseStudyContent } from "@/data/case-studies/disney";

export function DisneyCaseStudyClient() {
  return <StandardWorkCaseStudy {...disneyCaseStudyContent} />;
}
