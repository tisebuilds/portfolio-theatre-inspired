import type { ReactNode } from "react";
import { caseStudySpacing } from "@/components/case-study-spacing";

type CaseStudyPageShellProps = {
  title: string;
  dateRange: string;
  meta: ReactNode;
  /** Optional header typography overrides (full class strings replace defaults). */
  headerClassNames?: {
    h1?: string;
    metaRow?: string;
    dateRange?: string;
  };
  /** CSS `background` for the radial glow behind the showcase. Omit to disable. */
  glowBackground?: string;
  /**
   * `flush` drops the tall min-height and top-aligns content so the page bg does not
   * read as a large empty band around short showcases.
   */
  showcaseLayout?: "default" | "flush";
  children: ReactNode;
};

export function CaseStudyPageShell({
  title,
  dateRange,
  meta,
  headerClassNames,
  glowBackground,
  showcaseLayout = "default",
  children,
}: CaseStudyPageShellProps) {
  const h1Class =
    headerClassNames?.h1 ??
    "text-2xl font-bold tracking-normal text-neutral-200 md:text-3xl";
  const metaRowClass =
    headerClassNames?.metaRow ??
    "mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/45";
  const dateRangeClass =
    headerClassNames?.dateRange ??
    "inline-flex h-5 items-center rounded-sm bg-white/[0.06] px-2.5 text-xs font-medium tabular-nums tracking-tight text-white/55";
  const sectionClass =
    showcaseLayout === "flush"
      ? caseStudySpacing.showcaseSectionFlush
      : caseStudySpacing.showcaseSectionDefault;

  const showcaseInnerClass =
    showcaseLayout === "flush"
      ? "relative z-[1] flex w-full justify-center items-start"
      : "relative z-[1] flex items-center justify-center";

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col bg-black font-sans text-white">
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-20 pt-7 sm:px-8 sm:pb-24 sm:pt-8">
        <h1 className={h1Class}>
          {title}{" "}
          <span className="inline-flex shrink-0 items-center gap-x-3 align-middle whitespace-nowrap">
            <span className={dateRangeClass}>
              {dateRange}
            </span>
          </span>
        </h1>

        <div className={metaRowClass}>
          {meta}
        </div>

        <section className={sectionClass} aria-label="Product showcase">
          {glowBackground ? (
            <div
              className="pointer-events-none absolute inset-0 flex justify-center pt-[min(4vh,1.5rem)]"
              aria-hidden
            >
              <div
                className="h-[min(60vh,500px)] w-[min(92vw,520px)]"
                style={{ background: glowBackground }}
              />
            </div>
          ) : null}
          <div className={showcaseInnerClass}>{children}</div>
        </section>
      </main>
    </div>
  );
}
