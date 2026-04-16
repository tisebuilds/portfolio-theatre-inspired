"use client";

import type { ReactNode } from "react";
import { caseStudySpacing } from "@/components/case-study-spacing";
import { caseStudyType } from "@/components/case-study-typography";

export type StandardLearningItem = {
  title: ReactNode;
  content: ReactNode;
};

export function LearningsFromStandard({
  items,
  learningsLayout = "split",
  presentation = "definitionList",
  bodyCopyTitleSeparator,
}: {
  items: StandardLearningItem[];
  learningsLayout?: "split" | "stacked";
  /** `bodyCopy` — uniform lesson paragraphs (e.g. title-only lines). */
  presentation?: "definitionList" | "bodyCopy";
  /** Between title and body in `bodyCopy` mode when `content` is set. Default: one space. */
  bodyCopyTitleSeparator?: string;
}) {
  if (presentation === "bodyCopy") {
    const join = bodyCopyTitleSeparator ?? " ";
    /** Colon + space as a small DOM subtree so it always serializes in the DOM. */
    const titleBodyGlue =
      join === ": " ? (
        <>
          <span>:</span>{" "}
        </>
      ) : (
        join
      );
    return (
      <ul
        className={`m-0 list-none p-0 ${caseStudySpacing.learningsBodyCopyList}`}
      >
        {items.map((item, index) => (
          <li key={`learning-${index}`} className={caseStudyType.learningBodyCopy}>
            {item.title}
            {item.content != null ? (
              <>
                {titleBodyGlue}
                {item.content}
              </>
            ) : null}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <dl className={`m-0 mt-0 p-0 ${caseStudySpacing.learningsList}`}>
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
