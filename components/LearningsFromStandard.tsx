"use client";

import type { ReactNode } from "react";
import styles from "@/components/ramp/ramp-cinema.module.css";

export type StandardLearningItem = {
  title: ReactNode;
  content: ReactNode;
};

/** Leading emoji sequence (incl. ZWJ / FE0F), then whitespace. */
const LEADING_EMOJI =
  /^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)\s+/u;

export function splitLeadingEmoji(text: string): {
  emoji: string | null;
  rest: string;
} {
  const match = text.match(LEADING_EMOJI);
  if (!match) return { emoji: null, rest: text };
  return { emoji: match[1], rest: text.slice(match[0].length) };
}

function hasTitle(title: ReactNode): boolean {
  if (title == null || title === false) return false;
  if (typeof title === "string") return title.trim().length > 0;
  return true;
}

function hasBody(content: ReactNode): boolean {
  if (content == null || content === false) return false;
  if (typeof content === "string") return content.trim().length > 0;
  return true;
}

export function LearningsFromStandard({
  items,
}: {
  items: StandardLearningItem[];
}) {
  const contentOnly = items.every(
    (item) => !hasTitle(item.title) && hasBody(item.content),
  );

  if (contentOnly) {
    return (
      <div className={styles.lessonContentStack}>
        {items.map((item, index) => (
          <div key={`learning-${index}`}>{item.content}</div>
        ))}
      </div>
    );
  }

  const withDescriptions = items.every((item) => hasBody(item.content));
  const twoCol = withDescriptions && items.length >= 4;
  const listClass = twoCol
    ? `${styles.lessonList} ${styles.lessonListTwoCol}`
    : styles.lessonList;

  return (
    <ul className={listClass}>
      {items.map((item, index) => {
        const titleStr = typeof item.title === "string" ? item.title : null;
        const { emoji, rest } = titleStr
          ? splitLeadingEmoji(titleStr)
          : { emoji: null, rest: null };
        const titleNode = titleStr != null ? rest : item.title;
        const showBody = hasBody(item.content);
        const itemClass = emoji
          ? `${styles.lessonListItem} ${styles.lessonListItemHasEmoji}`
          : styles.lessonListItem;

        return (
          <li key={`learning-${index}`} className={itemClass}>
            {emoji ? (
              <span className={styles.lessonEmoji} aria-hidden>
                {emoji}
              </span>
            ) : null}
            {showBody ? (
              <div className={styles.lessonItemCopy}>
                {hasTitle(titleNode) ? (
                  <div className={styles.lessonTitle}>{titleNode}</div>
                ) : null}
                <div className={styles.lessonBody}>{item.content}</div>
              </div>
            ) : (
              <div className={styles.lessonTitle}>{titleNode}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
