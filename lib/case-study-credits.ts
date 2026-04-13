import type { StandardWorkCaseStudyCredit } from "@/components/StandardWorkCaseStudy";

/** Round-robin distribution for a balanced multi-column credits grid. */
export function splitCreditsIntoColumns(
  entries: StandardWorkCaseStudyCredit[],
  columnCount: number,
): StandardWorkCaseStudyCredit[][] {
  const cols: StandardWorkCaseStudyCredit[][] = Array.from(
    { length: columnCount },
    () => [],
  );
  entries.forEach((entry, i) => {
    cols[i % columnCount].push(entry);
  });
  return cols;
}
