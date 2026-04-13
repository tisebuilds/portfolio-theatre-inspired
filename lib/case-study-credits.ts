import type { StandardWorkCaseStudyCredit } from "@/components/StandardWorkCaseStudy";
import type { RampCredit } from "@/data/case-studies/ramp-types";

/** Flatten StandardWorkCaseStudy column layout to a single list (column order preserved). */
export function standardCreditsColumnsToRampCredits(
  columns: StandardWorkCaseStudyCredit[][],
): RampCredit[] {
  const out: RampCredit[] = [];
  for (const col of columns) {
    for (const e of col) {
      out.push({
        role: e.role?.trim() ?? "",
        name: e.name,
        linkedInUrl: e.href,
      });
    }
  }
  return out;
}

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
