"use client";

import type { ReactNode } from "react";
import styles from "@/components/ramp/ramp-cinema.module.css";

export type StandardLearningItem = {
  title: ReactNode;
  content: ReactNode;
};

export function LearningsFromStandard({
  items,
}: {
  items: StandardLearningItem[];
  learningsLayout?: "split" | "stacked";
  /** Kept so existing callers compile. Cards always stack the lead above the body. */
  presentation?: "definitionList" | "bodyCopy";
  /** Kept so existing callers compile. Cards do not insert an inline separator. */
  bodyCopyTitleSeparator?: string;
}) {
  const layoutClass =
    items.length === 4 ? styles.lessonCardsQuad : styles.lessonCardsStack;

  return (
    <div className={`${styles.lessonCards} ${layoutClass}`}>
      {items.map((item, index) => (
        <article key={`learning-${index}`} className={styles.lessonCard}>
          {item.title ? (
            <div className={styles.lessonLead}>{item.title}</div>
          ) : null}
          {item.content != null ? (
            <div className={styles.lessonBody}>{item.content}</div>
          ) : null}
        </article>
      ))}
    </div>
  );
}
