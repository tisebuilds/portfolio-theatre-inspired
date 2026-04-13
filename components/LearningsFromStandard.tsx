"use client";

import type { ReactNode } from "react";
import { caseStudyType } from "@/components/case-study-typography";

export type StandardLearningItem = {
  title: string;
  content: ReactNode;
};

export function LearningsFromStandard({
  items,
  learningsLayout = "split",
  presentation = "definitionList",
}: {
  items: StandardLearningItem[];
  learningsLayout?: "split" | "stacked";
  /** `bodyCopy` — uniform lesson paragraphs (e.g. title-only lines). */
  presentation?: "definitionList" | "bodyCopy";
}) {
  if (presentation === "bodyCopy") {
    return (
      <ul className="m-0 list-none space-y-6 p-0 sm:space-y-7">
        {items.map((item, index) => (
          <li key={`learning-${index}`} className={caseStudyType.learningBody}>
            {item.title}
            {item.content != null ? <> {item.content}</> : null}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <dl className="m-0 mt-0 space-y-8 p-0 sm:space-y-9">
      {items.map((item, index) => (
        <div
          key={`learning-${index}`}
          className={
            learningsLayout === "stacked"
              ? "flex flex-col gap-2 sm:gap-2.5"
              : "flex items-baseline gap-x-2 sm:gap-x-3"
          }
        >
          <dt
            className={`m-0 ${caseStudyType.learningTitle}${
              learningsLayout === "split" ? " shrink-0" : ""
            }`}
          >
            {item.title}
          </dt>
          <dd
            className={`m-0 ${caseStudyType.learningBody}${
              learningsLayout === "split" ? " min-w-0 flex-1" : ""
            }`}
          >
            {item.content}
          </dd>
        </div>
      ))}
    </dl>
  );
}
